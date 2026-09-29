# API & DATA CONTRACTS: 08 — AUTOMATED BOOKING ENGINE

---

## CONTRACT 1: AJAX Booking Submission (Upgraded)

**Endpoint:** `POST /wp-admin/admin-ajax.php`  
**Action:** `mixhotel_submit_booking`  
**Handler:** `MixHotel_Booking_Handler::handle_booking_submission()`

### Request Body (FormData)

| Field | Type | Required | Thay đổi vs Feature 04 |
|:---|:---|:---|:---|
| `action` | string | ✅ | Không đổi |
| `mixhotel_booking_nonce` | string | ✅ | **Luôn inject từ JS** (fix BUG-17) |
| `customer_name` | string | ✅ | Không đổi |
| `customer_phone` | string | ✅ | Không đổi |
| `branch_id` | string/int | ✅ | Không đổi |
| `room_id` | int | Có (trang chi tiết) | Không đổi |
| `room_name` | string | Có | Không đổi |
| `booking_demand` | string | ✅ | Không đổi |
| `booking_date` | string (Y-m-d) | ✅ | Không đổi |
| `booking_time` | string (H:i) | ✅ | **BẮT BUỘC** (cần cho availability check) |
| `booking_note` | string | Không | Không đổi |
| `website_url` | string | Không | Honeypot (không đổi) |
| `mixhotel_hp_email` | string | Không | Honeypot (không đổi) |

### Response — Success (Auto-Confirm)

```json
{
  "success": true,
  "data": {
    "lead_id": 456,
    "lead_code": "#LEAD-20261005-001",
    "message": "Phòng đã được xác nhận tự động! Nhân viên sẽ liên hệ bạn ngay.",
    "status": "confirmed",
    "is_demo": false,
    "branch_name": "CS1: Mix Huỳnh Thúc Kháng (Mix Premium)",
    "branch_hotline": "038 310 4010",
    "branch_zalo": "https://zalo.me/+84383104010",
    "hold_minutes": 30,
    "check_in": "2026-10-05 14:00",
    "check_out": "2026-10-05 16:00"
  }
}
```

### Response — Error (Phòng đã kín)

```json
{
  "success": false,
  "data": {
    "code": "room_unavailable",
    "message": "Phòng đã hết trong khung giờ bạn chọn. Vui lòng chọn phòng khác hoặc liên hệ hotline!"
  }
}
```

### Response — Error (Nonce hết hạn — BUG-17 fixed)

```json
{
  "success": false,
  "data": {
    "code": "invalid_nonce",
    "message": "Phiên làm việc đã hết hạn. Vui lòng tải lại trang và thử lại."
  }
}
```

---

## CONTRACT 2: Availability Check Query (Internal)

**Function:** `MixHotel_Booking_Handler::check_room_availability($room_id, $check_in_dt, $check_out_dt)`  
**Returns:** `bool` (`true` = available, `false` = conflict)

### SQL Logic (Pseudocode)

```sql
SELECT COUNT(*) FROM wp_posts p
INNER JOIN wp_postmeta pm_room ON p.ID = pm_room.post_id 
    AND pm_room.meta_key = '_mixhotel_lead_room_id'
INNER JOIN wp_postmeta pm_status ON p.ID = pm_status.post_id 
    AND pm_status.meta_key = '_mixhotel_lead_status'
INNER JOIN wp_postmeta pm_checkin ON p.ID = pm_checkin.post_id 
    AND pm_checkin.meta_key = '_mixhotel_lead_check_in_datetime'
INNER JOIN wp_postmeta pm_checkout ON p.ID = pm_checkout.post_id 
    AND pm_checkout.meta_key = '_mixhotel_lead_check_out_datetime'
WHERE p.post_type = 'booking_lead'
  AND pm_room.meta_value = %d                             -- Cùng phòng
  AND pm_status.meta_value IN ('confirmed', 'checked_in') -- Đơn đang active
  AND pm_checkin.meta_value < %s                           -- check_in < new_check_out
  AND pm_checkout.meta_value > %s                          -- check_out > new_check_in
```

→ Nếu `COUNT > 0` → Phòng đã kín (overlap detected).

---

## CONTRACT 3: WP-Cron Expired Booking Cleanup

**Hook:** `mixhotel_check_expired_bookings`  
**Interval:** Mỗi 5 phút (`mixhotel_five_minutes`)  
**Function:** `MixHotel_Booking_Handler::cron_expire_bookings()`

### Logic:

```
1. Lấy option `mixhotel_hold_duration_minutes` (mặc định: 30)
2. Query: SELECT đơn WHERE status = 'confirmed' 
          AND confirmed_at < (NOW() - hold_duration)
          LIMIT 50
3. Với mỗi đơn:
   a. UPDATE status → 'expired'
   b. Ghi meta `_mixhotel_lead_expired_at` = NOW()
   c. (Tuỳ chọn) Bắn Telegram báo lễ tân
4. Log kết quả vào debug.log
```

---

## CONTRACT 4: Duration Calculation Map

**Function:** `MixHotel_Booking_Handler::calculate_checkout_time($check_in_dt, $demand_type)`  
**Returns:** `DateTime` (check-out time)

| `demand_type` | Logic | Ví dụ input → output |
|:---|:---|:---|
| `2h` | check_in + 2 hours | `2026-10-05 14:00` → `2026-10-05 16:00` |
| `rest-hourly` | check_in + 2 hours | Same as `2h` |
| `overnight` | Same day 22:00 → next day 12:00 | `2026-10-05 20:00` → `2026-10-06 12:00` |
| `allday` | Same day 14:00 → next day 12:00 | `2026-10-05 14:00` → `2026-10-06 12:00` |

> **Lưu ý:** Nếu khách chọn `overnight` và giờ check-in trước 22:00, hệ thống set check-in = 22:00 cùng ngày. Nếu giờ check-in ≥ 22:00, dùng giờ gốc.

---

## CONTRACT 5: Admin Quick Actions (Status Transitions)

**AJAX Actions (Admin-only):**

| Action | Transition | Permission |
|:---|:---|:---|
| `mixhotel_checkin_booking` | `confirmed` → `checked_in` | `edit_posts` |
| `mixhotel_complete_booking` | `checked_in` → `completed` | `edit_posts` |
| `mixhotel_cancel_booking` | `confirmed`/`checked_in` → `cancelled` | `edit_posts` |
| `mixhotel_noshow_booking` | `confirmed` → `no_show` | `edit_posts` |

---

## CONTRACT 6: Settings Page Additions

**Mở rộng `class-settings.php`:**

| Setting | Option Key | Type | Default | Location |
|:---|:---|:---|:---|:---|
| Bật Auto-Confirm | `mixhotel_auto_confirm_enabled` | checkbox | `1` | Section "Booking Engine" |
| Thời gian giữ phòng (phút) | `mixhotel_hold_duration_minutes` | number | `30` | Section "Booking Engine" |
