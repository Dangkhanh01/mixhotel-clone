# TASKS: 04 - BOOKING ENGINE AND LEADS

**Input:** `specs/04-booking-engine-and-leads/spec.md` & `specs/04-booking-engine-and-leads/plan.md`  
**Tuân thủ:** `playbook_disciplined_vibe_coding.md` & `AGENTS.md`

---

## Phase 1: Plugin — AJAX Handler & Telegram/Sandbox Engine

- [x] **T001** Tạo file `wp-content/plugins/mixhotel-core/includes/class-booking-handler.php` — Đăng ký `wp_ajax_nopriv_mixhotel_submit_booking` và `wp_ajax_mixhotel_submit_booking`. Xử lý Nonce verification, Honeypot check, Rate limiting (transients), Sanitize input, Sinh mã đơn `#LEAD-YYYYMMDD-XXXX`, Lưu CPT `booking_lead` với đầy đủ meta, Gửi Telegram alert hoặc Demo Sandbox simulation, Trả về `wp_send_json_success()` / `wp_send_json_error()`.
- [x] **T002** Cập nhật `wp-content/plugins/mixhotel-core/includes/class-cpt-room.php` — Bổ sung filter / helper cho CPT `booking_lead` nếu cần.
- [x] **T003** Tạo file `wp-content/plugins/mixhotel-core/includes/class-settings.php` — Trang cấu hình "Mix Hotel" trong WP Admin: Toggle Demo Sandbox Mode (mặc định Bật), Telegram Bot Token, Telegram Chat ID, Hotline liên hệ mặc định.

---

## Phase 2: Plugin — Admin Lead Management

- [x] **T004** Tạo file `wp-content/plugins/mixhotel-core/includes/class-admin-leads.php` — Tùy biến bảng danh sách `booking_lead` trong WP Admin: custom columns (Mã đơn, Khách hàng + link `tel:`, Chi nhánh, Phòng, Nhu cầu, Trạng thái badge, Thời gian). Đăng ký Meta Box chi tiết đơn trong màn hình chỉnh sửa `booking_lead` (thông tin khách, nút chuyển trạng thái, ghi chú lễ tân, Demo Sandbox badge).
- [x] **T005** Cập nhật `wp-content/plugins/mixhotel-core/mixhotel-core.php` — Require và khởi tạo `MixHotel_Booking_Handler`, `MixHotel_Settings`, và `MixHotel_Admin_Leads`.

---

## Phase 3: Theme — Frontend Booking Engine JavaScript & Modal

- [x] **T006** Tạo file `wp-content/themes/mixhotel-theme/assets/js/booking-engine.js` — Vanilla JS xử lý submit cho cả `#hero-booking-form` và `#mixhotel-booking-form`: client validation SĐT Việt Nam, loading state spinner, fetch AJAX request tới `MixHotelData.ajaxUrl`, xử lý response và kích hoạt modal xác nhận giữ phòng `#mixhotel-booking-modal`.
- [x] **T007** Tạo template part `wp-content/themes/mixhotel-theme/parts/booking-modal.html` — FSE template part cho popup xác nhận giữ phòng thành công: hiển thị mã đơn, thời gian giữ 15 phút, hotline/Zalo chi nhánh, nhãn Demo Sandbox.
- [x] **T008** Cập nhật `wp-content/themes/mixhotel-theme/templates/front-page.html` và `wp-content/themes/mixhotel-theme/templates/single-hotel_room.html` — Nhúng template part `booking-modal` để sẵn sàng hiển thị.
- [x] **T009** Cập nhật `wp-content/themes/mixhotel-theme/functions.php` — Enqueue `booking-engine.js`, mở rộng `MixHotelData` với `isDemo`, `strings` cho i18n, đăng ký template part `booking-modal`.

---

## Phase 4: Theme — Styling cho Booking Confirmation Modal

- [x] **T010** Cập nhật `wp-content/themes/mixhotel-theme/assets/css/modal.css` — Thêm styles cho `#mixhotel-booking-modal`: card Dark Luxury, icon check vàng gold, mã giữ phòng nổi bật, badge đếm ngược 15 phút, banner Demo Sandbox minh bạch, các nút hành động (Nhắn Zalo xác nhận, Gọi điện, Đóng modal).

---

## Phase 5: Verification & Documentation

- [x] **T011** Kiểm tra cú pháp JavaScript và tính toàn vẹn cấu trúc file.
- [x] **T012** Cập nhật `docs/changelog.md` với đầy đủ thông tin Feature 04.
- [x] **T013** Cập nhật `walkthrough.md` tổng kết quá trình triển khai Feature 04.
