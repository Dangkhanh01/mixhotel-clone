# BÁO CÁO LỖI: FORM ĐẶT PHÒNG KHÔNG GỬI ĐƯỢC (BUG-17)

> **Phát hiện:** 2026-09-29  
> **Mức độ nghiêm trọng:** 🔴 CRITICAL (Block toàn bộ chức năng đặt phòng)  
> **Ảnh hưởng:** Cả 2 form đặt phòng (Hero trang chủ + Chi tiết phòng)  
> **Trạng thái:** 🟡 Đã phân tích xong Root Cause, chưa sửa

---

## 1. TRIỆU CHỨNG

Khi khách hàng điền đầy đủ thông tin hợp lệ (Họ tên, SĐT, chọn chi nhánh) trên form đặt phòng Hero trang chủ (`#hero-booking-form`) hoặc form trang chi tiết phòng (`#mixhotel-booking-form`) và bấm "GỬI YÊU CẦU GIỮ PHÒNG", form báo lỗi:

> **"Phiên làm việc đã hết hạn. Vui lòng tải lại trang và thử lại."**

Tải lại trang vẫn không sửa được lỗi. Form không gửi được trong mọi trường hợp.

---

## 2. ROOT CAUSE ANALYSIS (PHÂN TÍCH NGUYÊN NHÂN GỐC)

### 2.1. Chuỗi sự kiện gây lỗi

```
Seed-time (chạy 1 lần duy nhất khi tạo trang)
  └─> seed-pages.php dùng ob_start() + include() để render hero-booking.php
       └─> wp_nonce_field('mixhotel_submit_booking', 'mixhotel_booking_nonce') 
            chạy PHP tại thời điểm seed → sinh nonce "abc123xyz"
       └─> HTML chứa: <input name="mixhotel_booking_nonce" value="abc123xyz">
  └─> HTML chứa nonce cứng được lưu vào wp_posts.post_content (Database)

Request-time (mỗi khi khách truy cập trang chủ)
  └─> front-page.html dùng <!-- wp:post-content --> render HTML từ DB
       └─> HTML vẫn chứa: <input name="mixhotel_booking_nonce" value="abc123xyz"> (ĐÃ HẾT HẠN)
  └─> wp_localize_script() sinh MixHotelData.nonce = "fresh_nonce_456" (NONCE MỚI)
  └─> booking-engine.js kiểm tra:
       if (!formData.get('mixhotel_booking_nonce')) → FALSE (đã có nonce cũ từ HTML!)
       → JS KHÔNG append nonce mới
  └─> AJAX gửi nonce cũ "abc123xyz" lên server
  └─> PHP: wp_verify_nonce("abc123xyz", ...) → FALSE → Trả lỗi "invalid_nonce"
```

### 2.2. Chi tiết kỹ thuật

| Thành phần | File | Vấn đề |
|:---|:---|:---|
| **Seed script** | `inc/seed-pages.php:129-132` | `ob_start(); include($file); ob_get_clean()` — PHP chạy nonce 1 lần rồi bake kết quả vào DB |
| **Hero form HTML** | `patterns/hero-booking.php:101` | `wp_nonce_field('mixhotel_submit_booking', 'mixhotel_booking_nonce')` — sinh hidden input cứng |
| **JS fallback logic** | `assets/js/booking-engine.js:80-84` | `if (!formData.get('mixhotel_booking_nonce'))` — vì HTML đã có nonce cũ nên JS skip |
| **PHP verification** | `class-booking-handler.php:80-87` | Nhận nonce hết hạn → `wp_verify_nonce()` trả `false` |

### 2.3. Tại sao form từng hoạt động (Sep 17)?

Debug log ghi nhận 3 đơn thành công vào **17/09/2026** — đây là ngày seed page hoặc rất gần ngày seed. WordPress nonce có hiệu lực **24 giờ** (2 tick × 12 giờ). Sau 24h kể từ khi seed, nonce hết hạn vĩnh viễn.

---

## 3. CÁC LỖI PHỤ PHÁT HIỆN THÊM

### 3.1. Hero form thiếu hidden input `action`

**File:** `patterns/hero-booking.php`  
**Vấn đề:** Form không có `<input type="hidden" name="action" value="mixhotel_submit_booking">`. JS bù bằng `formData.append('action', ...)` (line 75-77), nhưng nên có trong HTML cho rõ ràng.

### 3.2. Nonce action không nhất quán giữa 2 form

| Form | File | Nonce Action | Field Name |
|:---|:---|:---|:---|
| Hero (trang chủ) | `hero-booking.php:101` | `mixhotel_submit_booking` | `mixhotel_booking_nonce` |
| Chi tiết phòng | `room-detail-content.php:308` | `mixhotel_booking_nonce` | `mixhotel_booking_security` |
| JS localize | `functions.php:181` | `mixhotel_booking_nonce` | N/A |

→ 3 nơi dùng 2 action khác nhau (`mixhotel_submit_booking` vs `mixhotel_booking_nonce`). PHP handler phải verify cả 2 action (line 86-87) — hoạt động nhưng mong manh, dễ gây confusion.

---

## 4. KẾ HOẠCH SỬA LỖI (REMEDIATION PLAN)

### Fix 1: Loại bỏ `wp_nonce_field()` khỏi seeded content

**Nguyên tắc:** Nonce KHÔNG BAO GIỜ được render trong content lưu vào DB. Nonce phải được inject tại request-time.

**Phương án:** Sửa `hero-booking.php` — xóa `wp_nonce_field(...)`, thay bằng hidden input trống có ID:
```html
<input type="hidden" id="hero-booking-nonce" name="mixhotel_booking_nonce" value="">
```

Sửa JS `booking-engine.js` — luôn **ghi đè** nonce từ `MixHotelData.nonce` vào form trước khi submit, bất kể form đã có nonce hay chưa:
```js
if (window.MixHotelData && window.MixHotelData.nonce) {
    formData.set('mixhotel_booking_nonce', window.MixHotelData.nonce);
}
```

### Fix 2: Thống nhất nonce action

Chọn 1 action duy nhất: `mixhotel_booking_nonce` (đã dùng ở JS localize và room detail form).
- Sửa `hero-booking.php` nonce action → `mixhotel_booking_nonce`
- Sửa PHP handler chỉ verify 1 action → giảm attack surface

### Fix 3: Re-seed trang chủ

Sau khi fix code, chạy lại seed hoặc update post content của trang chủ để loại bỏ nonce cũ khỏi DB.

---

## 5. PHÂN LOẠI BUG (Cần ghi vào SKILL.md)

**BUG-17: Nonce đóng băng trong Seeded Page Content (FSE + Seed Script)**

Cần bổ sung vào `.agents/skills/wordpress-bug-prevention/SKILL.md` sau khi sửa xong.
