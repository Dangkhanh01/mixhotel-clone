# CHANGELOG: NHẬT KÝ PHÁT TRIỂN DỰ ÁN MIX HOTEL CLONE

Tất cả các thay đổi kiến trúc, tính năng và sửa lỗi của dự án đều được ghi chép tại đây theo chuẩn [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

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
