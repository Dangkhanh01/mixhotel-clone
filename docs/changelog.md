# CHANGELOG: NHẬT KÝ PHÁT TRIỂN DỰ ÁN MIX HOTEL CLONE

Tất cả các thay đổi kiến trúc, tính năng và sửa lỗi của dự án đều được ghi chép tại đây theo chuẩn [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

### Added - 2026-09-17
- **Hoàn thành Feature 04: Booking Engine and Leads (`specs/04-booking-engine-and-leads/`):**
  - **Plugin — AJAX Handler & Lead Engine:**
    - `includes/class-booking-handler.php`: Xử lý AJAX endpoint `mixhotel_submit_booking` (cả nopriv và priv). Kiểm tra Nonce linh hoạt (`mixhotel_booking_nonce` / `mixhotel_booking_security`), Honeypot 2 lớp (`mixhotel_hp_email`, `website_url`), Rate-limiting theo IP (transient 5 requests / 10 phút). Chuẩn hóa SĐT VN (10 chữ số). Sinh mã đơn tự động dạng `#LEAD-YYYYMMDD-XXX`. Lưu đầy đủ meta vào CPT `booking_lead`. Tích hợp thông báo Telegram Bot thời gian thực kèm chế độ **Demo Sandbox Alert Simulator**. Tuân thủ tuyệt đối BUG-03 (luôn trả về `wp_send_json_success` / `wp_send_json_error`).
  - **Plugin — Admin Settings & Lead Management:**
    - `includes/class-settings.php`: Cung cấp trang cấu hình quản trị "Mix Hotel" trong WP Admin: Bật/Tắt chế độ Demo Sandbox (mặc định Bật), cấu hình Telegram Bot Token & Chat ID, Hotline mặc định, kèm trang "Nhật Ký Demo Sandbox" hiển thị 25 thông báo mô phỏng gần nhất và nút xóa sạch nhật ký.
    - `includes/class-admin-leads.php`: Tùy biến bảng quản lý danh sách `booking_lead` trong WP Admin: Custom columns (Mã đơn, Khách hàng kèm link `tel:` và Zalo, Chi nhánh & Phòng, Nhu cầu & Lịch hẹn, Trạng thái badge, Sandbox badge). Meta box chi tiết đơn trong màn hình edit với nút bấm gọi ngay, link Zalo, selector trạng thái và ghi chú tiếp nhận nội bộ của lễ tân.
    - Cập nhật `mixhotel-core.php`: Require và khởi tạo 3 module mới.
  - **Theme — Frontend JavaScript & FSE Template Parts:**
    - `assets/js/booking-engine.js`: Vanilla JS thuần (8.8KB, tuân thủ NFR-002 <= 10KB), bắt submit form tại Hero (`#hero-booking-form`) và Chi tiết phòng (`#mixhotel-booking-form`). Client validation SĐT và họ tên, hiển thị trạng thái loading spinner, gửi AJAX request tới `MixHotelData.ajaxUrl`. Xử lý mở Modal xác nhận và tự động reset form.
    - `parts/booking-modal.html`: Template part FSE popup xác nhận giữ phòng thành công: Mã giữ phòng `#LEAD-...`, chi nhánh tiếp nhận, đồng hồ giữ phòng 15 phút, banner Demo Sandbox minh bạch, các nút CTA hành động nhanh (Nhắn Zalo xác nhận, Gọi hotline chi nhánh, Đóng cửa sổ).
    - Cập nhật templates: Nhúng `booking-modal` vào `front-page.html`, `single-hotel_room.html`, và `archive-hotel_room.html`.
    - Cập nhật `functions.php`: Enqueue `booking-engine.js`, mở rộng `MixHotelData` với `isDemo` và localized data.
  - **Theme — Styling Dark Luxury:**
    - `assets/css/modal.css`: Thiết kế hoàn chỉnh cho `.mix-booking-modal`, icon check vàng gold, mã giữ phòng monospace, badge đếm ngược 15 phút kèm pulse dot xanh lá, banner Demo Sandbox, spinner animation `.mix-spinner`, và alert thông báo lỗi `.mix-form-error-alert`.

- **Hoàn thành Feature 03: Room Catalog and Detail (`specs/03-room-catalog-and-detail/`):**
  - **Plugin — Meta Boxes & Helpers:**
    - `includes/class-meta-boxes.php`: Meta boxes cho CPT `hotel_room` (Mã phòng, Chi nhánh selector, Bảng giá 4 mức, Gallery IDs với WP Media picker, YouTube Video ID, Featured flag) và `hotel_branch` (Địa chỉ, Hotline, Zalo, Messenger, SMS, Maps embed URL). Nonce verification + sanitize/escape đầy đủ.
    - `includes/class-helpers.php`: Helper class + global wrapper functions: `mixhotel_format_price()` (VNĐ format), `mixhotel_get_branch_data()`, `mixhotel_get_room_price()`, `mixhotel_get_room_gallery()`. Xử lý edge cases: giá rỗng → "Liên hệ", phòng chưa gán chi nhánh → "Liên hệ tổng đài".
    - Cập nhật `mixhotel-core.php`: Require + init 2 module mới.
  - **Theme — CSS Modules (Conditional Enqueue):**
    - `assets/css/room-detail.css`: 6 sections (Hero blurred bg, Gallery grid, Video embed, Concept perks, Pricing 4-tier cards, Booking form). Responsive mobile. Tuân thủ design tokens.
    - `assets/css/room-archive.css`: Filter bar, room card grid, empty state, archive hero. Horizontal scroll filter trên mobile.
    - `functions.php`: Conditional enqueue chỉ load CSS/JS trên trang `hotel_room` tương ứng.
  - **Theme — FSE Patterns & Templates:**
    - `patterns/room-detail-content.php`: Pattern PHP render 6 sections chi tiết phòng. Dùng MixHotel_Helpers + WP_Query + post meta. Honeypot field chống spam.
    - `patterns/room-archive-content.php`: Pattern PHP render filter bar (từ taxonomy `room_amenity`) + card grid. Featured rooms ưu tiên. Empty state khi chưa có phòng.
    - `templates/single-hotel_room.html`: FSE template chi tiết phòng.
    - `templates/archive-hotel_room.html`: FSE template danh mục phòng.
  - **Theme — Vanilla JS:**
    - `assets/js/room-gallery.js`: Click thumbnail → swap main image với fade transition + active state.
    - `assets/js/room-filter.js`: Click amenity tag → filter cards bằng `data-amenities` attribute, "Tất cả" reset.


- **Hoàn thành Feature 02: Homepage and Booking Modal (`specs/02-homepage-and-booking-modal/`):**
  - Đồng bộ đầy đủ 36 media assets từ `ui/public/images/` sang `wp-content/themes/mixhotel-theme/assets/images/`.
  - Khởi tạo `functions.php`: Enqueue 6 CSS modules và 4 JS files, đăng ký Block Pattern category `mixhotel` và template parts FSE.
  - Xây dựng 6 CSS modules chuyên biệt: `header.css`, `mobile-bar.css`, `desktop-contact-bar.css`, `modal.css`, `hero.css`, `sections.css` (tổng dung lượng CSS 54KB unminified, tuân thủ NFR-001 <= 80KB).
  - Triển khai 4 file Vanilla JS độc lập: `contact-modal.js`, `header-scroll.js`, `faq-accordion.js`, `youtube-lite.js` (tổng 12.9KB, tuân thủ NFR-002 <= 15KB).
  - Hoàn thiện 5 Template Parts FSE: `header.html`, `footer.html`, `mobile-action-bar.html`, `desktop-contact-bar.html`, `contact-modal.html`.
  - Triển khai 11 Block Patterns trang chủ trong `patterns/`: `hero-booking.php`, `real-photos-grid.php`, `video-showcase.php`, `concept-rooms.php`, `branches-list.php`, `why-choose-us.php`, `pricing-table.php`, `events-decoration.php`, `booking-steps.php`, `faq-accordion.php`, `final-cta.php`.
  - Lắp ráp hoàn chỉnh `templates/front-page.html` tuân thủ 100% thứ tự trong `patterns-manifest.contract.json`.
  - Kiểm thử toàn diện: Lint 100% PHP và JS không lỗi, kiểm tra HTTP 200 trên Docker local, WP_DEBUG_LOG hoàn toàn sạch (0 Warning, 0 Notice, 0 Fatal), kiểm thử tương tác và responsive qua browser subagent đạt chuẩn.

### Added - 2026-09-14
- **Hoàn thành Feature 01: Foundation and Theme Setup (`specs/01-foundation-and-theme/`):**
  - Khởi tạo Full Site Editing Block Theme `wp-content/themes/mixhotel-theme/`:
    - `style.css`: Khai báo metadata theme, CSS reset và keyframe animations (`bigshake_1`, `bigshake_2`, `latdat_2`, `pageUpAni`, `pulseAura`).
    - `theme.json`: Cấu hình Design Tokens chuẩn version 3, palette màu Dark Luxury (`#0f0f12`, `#17171c`, `#c5a880`, `#c92a2a`), font Questrial & Roboto, spacing scale.
    - `templates/index.html` & `templates/front-page.html`: Template FSE cơ sở.
    - `parts/header.html` & `parts/footer.html`: Template parts tái sử dụng.
  - Khởi tạo Custom Plugin nghiệp vụ `wp-content/plugins/mixhotel-core/`:
    - `mixhotel-core.php`: Bootstrap loader và activation/deactivation hooks flush rewrite rules an toàn.
    - `includes/class-taxonomies.php`: Đăng ký taxonomy `room_amenity` (Tiện nghi phòng) và `room_concept` (Concept phòng).
    - `includes/class-cpt-room.php`: Đăng ký Custom Post Types `hotel_room` (rewrite slug `khach-san-tinh-yeu`), `hotel_branch` (rewrite slug `chi-nhanh`), và `booking_lead` (Đơn giữ phòng nội bộ).
- **Thiết lập Bộ tài liệu 3 tầng theo chuẩn Disciplined Vibe Coding (SDD):**
  - Tầng 3: `AGENTS.md` và `.agents/skills/wordpress-bug-prevention/SKILL.md`.
  - Tầng 1: `docs/system-architecture.md`, `docs/database-schema.md`, `docs/design-tokens-spec.md`, `docs/roadmap.md`.
  - Tầng 2: `specs/01-foundation-and-theme/` (spec, plan, contracts, tasks).
