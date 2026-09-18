# FEATURE SPECIFICATION: 04 - BOOKING ENGINE AND LEADS

**Feature Branch:** `feat/04-booking-engine-and-leads`  
**Status:** In Progress (Spec-Driven Development)  
**Mục tiêu:** Xây dựng cỗ máy tiếp nhận yêu cầu đặt phòng / giữ phòng trực tuyến (Booking Lead Engine) cho Mix Boutique Hotel với cơ chế bảo mật CSRF Nonce, chống bot spam honeypot + rate-limiting, lưu trữ CPT `booking_lead`, thông báo Telegram Bot thời gian thực, và chế độ Demo Sandbox chuyên nghiệp cho dự án clone kỹ thuật.

---

## 1. CLARIFICATIONS (GỠ BỎ ĐIỂM MƠ HỒ)

* **Q: Dự án là Technical Clone, việc tích hợp Zalo/Telegram xử lý thế nào?**
  * **A: Triển khai theo cơ chế Demo Sandbox:**
    1. Lead đặt phòng được lưu thật 100% vào WordPress Database (`booking_lead`).
    2. Nếu quản trị viên cung cấp Telegram Bot Token & Chat ID thật trong Settings: Hệ thống gửi thông báo Telegram thật đến lễ tân.
    3. Nếu chưa cấu hình Telegram thật: Hệ thống tự động kích hoạt **Demo Sandbox Alert Simulator**, ghi nhận nội dung tin nhắn mẫu vào nhật ký mô phỏng (`mixhotel_demo_telegram_log`), và trả về response thành công.
    4. Giao diện người dùng hiển thị thông báo giữ phòng tạm thời 15-20 phút (chuẩn nghiệp vụ khách sạn tình yêu), kèm mã đơn giữ phòng (`#LEAD-YYYYMMDD-XXXX`) và nhãn Demo Sandbox minh bạch.

* **Q: Form đặt phòng xuất hiện ở những đâu trên website?**
  * **A:** Xuất hiện ở 2 vị trí chính:
    1. **Hero Form trên Trang chủ** (`#hero-booking-form` trong `patterns/hero-booking.php`): Khách chọn Chi nhánh, Nhu cầu (Nghỉ giờ/Qua đêm/Sự kiện), nhập Tên, SĐT.
    2. **Form Trang Chi Tiết Phòng** (`#mixhotel-booking-form` trong `patterns/room-detail-content.php`): Điền ngày giờ nhận phòng, nhu cầu, ghi chú, gắn liền với ID và tên phòng cụ thể.

* **Q: Bảo mật Nonce và AJAX endpoint tuân thủ quy chuẩn nào?**
  * **A:** Tuân thủ tuyệt đối `AGENTS.md §3` và BUG-03 trong `.agents/skills/wordpress-bug-prevention/SKILL.md`:
    - Sử dụng `check_ajax_referer` hoặc `wp_verify_nonce` linh hoạt với các action `mixhotel_booking_nonce` và `mixhotel_submit_booking`.
    - Kết thúc 100% bằng `wp_send_json_success()` hoặc `wp_send_json_error()`, không bao giờ để WordPress trả về số `0`.
    - Honeypot chống bot: kiểm tra trường ẩn `website_url` và `mixhotel_hp_email`. Nếu bot tự điền → chặn request ngay.
    - Rate-limiting theo IP qua WordPress Transients (tối đa 5 lượt gửi trong 10 phút).

---

## 2. USER SCENARIOS & ACCEPTANCE CRITERIA

### US1 — Khách Gửi Yêu Cầu Giữ Phòng Từ Trang Chủ (Priority: P1)
* **Given:** Khách đang ở trang chủ, tại section Hero.
* **When:** Nhập Họ tên, Số điện thoại (chuẩn 10 chữ số VN: 03/05/07/08/09), chọn Chi nhánh và Nhu cầu, rồi bấm "GỬI YÊU CẦU GIỮ PHÒNG".
* **Then:**
  1. Nút submit chuyển sang trạng thái "Đang xử lý..." kèm spinner, vô hiệu hóa click lặp lại.
  2. Gửi request AJAX tới `admin-ajax.php` kèm Nonce Token.
  3. Dữ liệu được lưu vào CPT `booking_lead` trong DB với trạng thái `pending`.
  4. Hiển thị Popup xác nhận: Mã giữ phòng `#LEAD-YYYYMMDD-XXXX`, giữ phòng tạm thời 15 phút, kèm liên kết xác nhận nhanh qua Zalo/Hotline chi nhánh đã chọn.

### US2 — Khách Gửi Yêu Cầu Đặt Phòng Từ Trang Chi Tiết (Priority: P1)
* **Given:** Khách đang xem phòng cụ thể (VD: Karma - Chi nhánh Huỳnh Thúc Kháng).
* **When:** Cuộn xuống section "Form Giữ Phòng Online", điền thông tin + ngày giờ nhận phòng + ghi chú, bấm "Gửi yêu cầu giữ phòng".
* **Then:**
  1. AJAX gửi thành công, CPT `booking_lead` ghi nhận cả `_mixhotel_lead_room_id` và `_mixhotel_lead_room_name`.
  2. Form hiển thị thông báo thành công xanh nổi bật, xóa trắng form sau khi gửi.
  3. Mở Modal xác nhận chi tiết phòng đã giữ.

### US3 — Lễ Tân & Quản Trị Quản Lý Đơn Trong WP Admin (Priority: P1)
* **Given:** Quản trị viên đăng nhập WP Admin và vào menu "Đơn Giữ Phòng".
* **When:** Mở danh sách bài viết `booking_lead`.
* **Then:**
  1. Cột hiển thị rõ ràng: Mã đơn, Khách hàng (Tên + SĐT click gọi `tel:`), Chi nhánh & Phòng, Nhu cầu, Ngày giờ, Trạng thái (`pending`, `contacted`, `confirmed`, `cancelled`).
  2. Click vào đơn có Meta Box chi tiết thông tin khách, nút chuyển trạng thái nhanh, và ghi chú tiếp nhận của lễ tân.

### US4 — Thông Báo Telegram & Demo Sandbox (Priority: P2)
* **Given:** Có đơn đặt phòng mới được gửi.
* **When:**
  - Nếu đã cấu hình Telegram Bot Token & Chat ID: Bắn tin nhắn Markdown báo lễ tân.
  - Nếu ở chế độ Demo Sandbox: Lưu bản ghi mô phỏng tin nhắn vào option `mixhotel_demo_telegram_log` và `WP_DEBUG_LOG`.

---

## 3. NON-FUNCTIONAL REQUIREMENTS (NFR)

* **NFR-001 (Bảo mật):** 100% tham số đầu vào được lọc qua `sanitize_text_field` / `sanitize_textarea_field`, bảo vệ CSRF bằng Nonce.
* **NFR-002 (Hiệu năng):** File JS `booking-engine.js` dưới 10KB, viết bằng Vanilla JS thuần không phụ thuộc jQuery.
* **NFR-003 (Khả năng chịu tải & Chống spam):** Transients rate limiting 5 requests / 10 phút theo client IP.
