# CHANGELOG: NHẬT KÝ PHÁT TRIỂN DỰ ÁN MIX HOTEL CLONE

Tất cả các thay đổi kiến trúc, tính năng và sửa lỗi của dự án đều được ghi chép tại đây theo chuẩn [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

### Added - 2026-09-16
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
