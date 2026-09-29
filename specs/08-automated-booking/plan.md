# PLAN: 08 — AUTOMATED BOOKING ENGINE

**Input:** `specs/08-automated-booking/spec.md` & `contracts/api-contracts.md`  
**Tuân thủ:** `playbook_disciplined_vibe_coding.md` & `AGENTS.md`

---

## TỔNG QUAN

Feature 08 chia thành **5 Phase**, ưu tiên sửa Bug-17 trước (Phase 0) để unblock toàn bộ booking flow, sau đó triển khai Auto-Confirm tuần tự.

---

## Phase 0: BUG FIX — Sửa Nonce Đóng Băng (BUG-17) [CRITICAL — ĐI TRƯỚC]

**Mục tiêu:** Form đặt phòng hoạt động lại ngay lập tức.

### Bước 0.1: Sửa JS — Luôn ghi đè nonce từ MixHotelData
**File:** `wp-content/themes/mixhotel-theme/assets/js/booking-engine.js`
- Thay `formData.append()` (chỉ thêm nếu chưa có) thành `formData.set()` (luôn ghi đè).
- Thống nhất field name gửi lên là `mixhotel_booking_nonce`.

### Bước 0.2: Sửa Hero Pattern — Xoá nonce cứng, thêm action hidden
**File:** `wp-content/themes/mixhotel-theme/patterns/hero-booking.php`
- Xoá `wp_nonce_field(...)` (nonce sẽ do JS inject).
- Thêm `<input type="hidden" name="action" value="mixhotel_submit_booking">`.

### Bước 0.3: Thống nhất Nonce Action
- Hero form, Room detail form, JS localize → tất cả dùng action `mixhotel_booking_nonce`.
- PHP handler → chỉ verify 1 action.

### Bước 0.4: Re-seed / Update trang chủ
- Chạy lại seed hoặc dùng WP-CLI/DB query để xoá nonce cũ khỏi post_content.

### Bước 0.5: Verification
- Truy cập localhost:8888, test gửi form Hero → confirm AJAX thành công.
- Kiểm tra `debug.log` có log booking mới.

---

## Phase 1: Backend — Availability Check & Auto-Confirm Logic

**Mục tiêu:** Bổ sung kiểm tra phòng trống time-range và auto-confirm.

### Bước 1.1: Duration Calculator
**File:** `wp-content/plugins/mixhotel-core/includes/class-booking-handler.php`
- Thêm static method `calculate_checkout_time($check_in_dt, $demand_type)`.
- Map: `2h` → +2h, `overnight` → 22:00–12:00 D+1, `allday` → 14:00–12:00 D+1.

### Bước 1.2: Availability Checker
**File:** `wp-content/plugins/mixhotel-core/includes/class-booking-handler.php`
- Thêm static method `check_room_availability($room_id, $check_in_dt, $check_out_dt)`.
- Query overlap theo Contract 2 trong `api-contracts.md`.
- Sử dụng `$wpdb->prepare()` (AGENTS.md §3).

### Bước 1.3: Upgrade `handle_booking_submission()`
**File:** `wp-content/plugins/mixhotel-core/includes/class-booking-handler.php`
- Sau validation input, gọi `calculate_checkout_time()`.
- Gọi `check_room_availability()`.
- Nếu unavailable → `wp_send_json_error(['code' => 'room_unavailable', ...])`.
- Nếu available → lưu thêm meta: `_mixhotel_lead_check_in_datetime`, `_mixhotel_lead_check_out_datetime`, `_mixhotel_lead_duration_type`, `_mixhotel_lead_confirmed_at`.
- Đặt `_mixhotel_lead_status` = `confirmed` (thay vì `pending`).
- Kiểm tra option `mixhotel_auto_confirm_enabled` — nếu tắt → vẫn lưu `pending` như cũ.

---

## Phase 2: Backend — WP-Cron TTL & Status Lifecycle

**Mục tiêu:** Tự động huỷ đơn hết hạn, mở rộng trạng thái đơn.

### Bước 2.1: Đăng ký Custom Cron Interval
**File:** `wp-content/plugins/mixhotel-core/includes/class-booking-handler.php`
- Filter `cron_schedules` → thêm `mixhotel_five_minutes` (300 seconds).
- Hook `mixhotel_check_expired_bookings` → `cron_expire_bookings()`.
- Đăng ký schedule trong `register_activation_hook`.

### Bước 2.2: Implement Cron Job
**File:** `wp-content/plugins/mixhotel-core/includes/class-booking-handler.php`
- Static method `cron_expire_bookings()`.
- Query đơn `confirmed` quá `hold_duration_minutes`.
- Batch update tối đa 50 đơn/lần.
- Ghi log vào `debug.log`.

### Bước 2.3: Deregister Cron on Plugin Deactivation
**File:** `wp-content/plugins/mixhotel-core/mixhotel-core.php`
- `register_deactivation_hook` → `wp_clear_scheduled_hook('mixhotel_check_expired_bookings')`.

---

## Phase 3: Admin — Mở rộng Quản lý Đơn

**Mục tiêu:** Lễ tân quản lý vòng đời đơn đầy đủ.

### Bước 3.1: Cập nhật Status Badges & Columns
**File:** `wp-content/plugins/mixhotel-core/includes/class-admin-leads.php`
- Thêm badge cho trạng thái mới: `checked_in`, `expired`, `no_show`, `completed`.
- Thêm cột `Check-in/out` hiển thị datetime.

### Bước 3.2: Quick Action Buttons trong Meta Box
**File:** `wp-content/plugins/mixhotel-core/includes/class-admin-leads.php`
- Nút "Check-in" (confirmed → checked_in).
- Nút "Hoàn thành" (checked_in → completed).
- Nút "Khách không đến" (confirmed → no_show).
- Nút "Huỷ đơn" (confirmed/checked_in → cancelled).

### Bước 3.3: Filter theo trạng thái trên danh sách
**File:** `wp-content/plugins/mixhotel-core/includes/class-admin-leads.php`
- Dropdown filter: All / Confirmed / Checked-in / Expired / Completed / Cancelled.

### Bước 3.4: Cập nhật Settings Page
**File:** `wp-content/plugins/mixhotel-core/includes/class-settings.php`
- Thêm section "Booking Engine":
  - Toggle "Bật Auto-Confirm".
  - Input "Thời gian giữ phòng (phút)".

---

## Phase 4: Frontend — Cập nhật Form & UI

**Mục tiêu:** Form hiển thị tình trạng phòng và thông tin check-out.

### Bước 4.1: Cập nhật booking-engine.js
**File:** `wp-content/themes/mixhotel-theme/assets/js/booking-engine.js`
- Hiển thị thông tin check-in/check-out trong modal xác nhận.
- Hiển thị thời gian giữ phòng (`hold_minutes`) trong modal.
- Xử lý error code `room_unavailable` với UI thân thiện.

### Bước 4.2: Cập nhật Booking Modal
**File:** `wp-content/themes/mixhotel-theme/parts/booking-modal.html`
- Thêm vùng hiển thị check-in/check-out time.
- Thêm countdown timer giữ phòng (optional).

### Bước 4.3: (Optional) Hiển thị tình trạng phòng trước khi gửi
- API endpoint kiểm tra phòng trống real-time.
- Form hiển thị badge "✅ Còn trống" / "🔴 Đã kín" sau khi chọn ngày/giờ.

---

## Phase 5: Verification & Documentation

### Bước 5.1: Kiểm tra PHP Syntax
- `php -l` cho tất cả file PHP đã sửa/tạo mới.
- Kiểm tra `debug.log` không có Warning/Notice/Fatal Error.

### Bước 5.2: Functional Testing
- Test happy path: đặt phòng → auto-confirm → modal hiện mã đơn.
- Test overlap: đặt phòng cùng slot → báo lỗi "Phòng đã hết".
- Test cron: tạo đơn confirmed → chờ TTL → kiểm tra status = expired.
- Test admin: check-in, complete, cancel, no-show transitions.
- Test backward compat: tắt auto-confirm → đơn lưu pending.

### Bước 5.3: Cập nhật Documentation
- Cập nhật `docs/database-schema.md` với meta mới.
- Cập nhật `docs/changelog.md`.
- Ghi BUG-17 vào `.agents/skills/wordpress-bug-prevention/SKILL.md`.
