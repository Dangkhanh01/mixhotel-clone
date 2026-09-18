# IMPLEMENTATION PLAN: 04 - BOOKING ENGINE AND LEADS

**Feature:** `specs/04-booking-engine-and-leads`  
**Tuân thủ:** `playbook_disciplined_vibe_coding.md` & `AGENTS.md`  
**Trọng tâm:** AJAX Booking Handler, Nonce Security, Honeypot, CPT Lead Storage, Admin Lead Management, Telegram/Demo Alert Simulator, Frontend Booking Engine JS & Modal feedback.

---

## 1. ARCHITECTURE OVERVIEW

```
[Browser Form: Hero / Single Room]
         │ (POST admin-ajax.php)
         ▼
[MixHotel_Booking_Handler] ──> 1. Nonce Check (mixhotel_booking_nonce)
         │                   ──> 2. Honeypot Check (mixhotel_hp_email, website_url)
         │                   ──> 3. Rate Limiting Check (5 reqs / 10m per IP)
         │                   ──> 4. Input Sanitization & Validation (Phone regex VN)
         ▼
[WordPress DB: wp_posts & wp_postmeta]
         │ CPT: booking_lead (status: publish/pending)
         │ Title: #LEAD-YYYYMMDD-XXXX
         ▼
[Notification Engine]
  ├── If Telegram configured: wp_remote_post() to Telegram Bot API
  └── If Demo Sandbox: Record alert to `mixhotel_demo_telegram_log` & debug log
         ▼
[JSON Response] ──> wp_send_json_success() (BUG-03 Compliant)
         ▼
[Frontend: booking-engine.js]
  ├── Show Loading state (Spinner, disabled button)
  ├── Show Confirmation Modal (#mixhotel-booking-modal)
  │   - Mã giữ phòng #LEAD-...
  │   - Thông tin giữ phòng tạm thời 15 phút
  │   - Nút Xác nhận Zalo & Gọi Hotline
  │   - Badge Demo Sandbox minh bạch
  └── Auto-reset form state
```

---

## 2. PHASES OF EXECUTION

### Phase 1: Plugin — AJAX Booking Handler & Telegram/Sandbox Engine
- `wp-content/plugins/mixhotel-core/includes/class-booking-handler.php` (Mới)
  - Đăng ký actions `wp_ajax_nopriv_mixhotel_submit_booking` và `wp_ajax_mixhotel_submit_booking`
  - Nonce verification linh hoạt hỗ trợ cả `mixhotel_booking_nonce` và `mixhotel_submit_booking`
  - Honeypot check: `mixhotel_hp_email` hoặc `website_url`
  - Rate limiting theo IP qua `get_transient` / `set_transient`
  - Sanitize và format số điện thoại VN
  - Insert post `booking_lead` kèm đầy đủ post meta
  - Telegram alert sender / Demo alert simulator
  - Trả về JSON thành công bằng `wp_send_json_success`

### Phase 2: Plugin — Admin Lead Management & Settings
- `wp-content/plugins/mixhotel-core/includes/class-admin-leads.php` (Mới)
  - Quản lý danh sách đơn trong WP Admin: thêm custom columns (Mã đơn, Khách hàng, Chi nhánh & Phòng, Nhu cầu, Trạng thái, Ngày giờ)
  - Meta box chi tiết đơn giữ phòng trong màn hình edit: thông tin khách, nút gọi `tel:`, link Zalo, selector trạng thái (`pending`, `contacted`, `confirmed`, `cancelled`), ghi chú lễ tân.
- `wp-content/plugins/mixhotel-core/includes/class-settings.php` (Mới)
  - Trang cài đặt "Mix Hotel" trong WP Admin:
    - Bật/Tắt chế độ Demo Sandbox (mặc định BẬT)
    - Telegram Bot Token & Chat ID
    - Hotline mặc định
- Cập nhật `wp-content/plugins/mixhotel-core/mixhotel-core.php`:
  - Require 3 module mới và init hooks

### Phase 3: Theme — Frontend JavaScript Booking Engine & Confirmation Modal
- `wp-content/themes/mixhotel-theme/assets/js/booking-engine.js` (Mới)
  - Bắt submit event trên form Hero (`#hero-booking-form`) và form Chi tiết phòng (`#mixhotel-booking-form`)
  - Client-side validation: bắt buộc Tên, kiểm tra SĐT 10 số VN
  - Trạng thái loading: vô hiệu hóa nút submit, hiển thị icon xoay & chữ "Đang gửi..."
  - Gửi Fetch/XHR AJAX request tới `MixHotelData.ajaxUrl`
  - Render và kích hoạt Booking Confirmation Modal (`#mixhotel-booking-modal`) hiển thị mã đơn, thời gian giữ phòng 15 phút, hotline/Zalo chi nhánh, nhãn Demo Sandbox
  - Reset form sau khi gửi thành công
- `wp-content/themes/mixhotel-theme/parts/booking-modal.html` (Mới)
  - Template part FSE cho modal xác nhận đặt phòng
- Cập nhật `wp-content/themes/mixhotel-theme/functions.php`:
  - Enqueue `booking-engine.js`
  - Thêm dữ liệu `isDemo` và các text strings vào `MixHotelData`
  - Đăng ký template part `booking-modal`

### Phase 4: Theme — Styling cho Confirmation Modal
- Cập nhật `wp-content/themes/mixhotel-theme/assets/css/modal.css`:
  - Styles cho `#mixhotel-booking-modal`: card sang trọng Dark Luxury, badge đếm ngược 15 phút, demo banner, action buttons (Zalo & Hotline).

### Phase 5: Verification & Documentation
- Kiểm tra cú pháp PHP và JavaScript bằng linter
- Cập nhật `docs/changelog.md`
- Cập nhật `walkthrough.md`
