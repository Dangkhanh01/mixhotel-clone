# TASKS: 01 - FOUNDATION AND THEME SETUP

**Input:** `specs/01-foundation-and-theme/spec.md`, `specs/01-foundation-and-theme/plan.md`, `contracts/`  
**Quy tắc:** Mỗi task gắn cứng đường dẫn file chính xác. Kiểm tra cú pháp PHP ngay sau khi hoàn thành.

---

## Phase 1: Foundational — Cấu Trúc Theme & Design Tokens
- [ ] **T001** [P] Tạo file metadata theme tại `wp-content/themes/mixhotel-theme/style.css`
- [ ] **T002** [P] Tạo cấu trúc thư mục template tại `wp-content/themes/mixhotel-theme/templates/` và `parts/`
- [ ] **T003** Tạo file `wp-content/themes/mixhotel-theme/theme.json` khớp 100% với `contracts/theme-tokens.contract.json` (Palette màu, typography Questrial/Roboto, spacing scale)
- [ ] **T004** Tạo file template cơ sở `wp-content/themes/mixhotel-theme/templates/index.html` và `templates/front-page.html`
- [ ] **T005** [P] Tạo template parts `wp-content/themes/mixhotel-theme/parts/header.html` và `parts/footer.html`

---

## Phase 2: Foundational — Plugin Nghiệp Vụ `mixhotel-core`
- [ ] **T006** Khởi tạo file bootstrap plugin tại `wp-content/plugins/mixhotel-core/mixhotel-core.php`
- [ ] **T007** [P] Triển khai đăng ký Taxonomy `room_amenity` tại `wp-content/plugins/mixhotel-core/includes/class-taxonomies.php`
- [ ] **T008** [P] Triển khai đăng ký CPT `hotel_room` và `hotel_branch` tại `wp-content/plugins/mixhotel-core/includes/class-cpt-room.php`
- [ ] **T009** Cấu hình `register_activation_hook` để flush rewrite rules an toàn theo quy tắc `BUG-02` trong `wordpress-bug-prevention/SKILL.md`

---

## Phase 3: Verification & Fast Loop (Kiểm Chứng Tức Thì)
- [ ] **T010** Chạy kiểm tra cú pháp PHP: `php -l wp-content/plugins/mixhotel-core/mixhotel-core.php`
- [ ] **T011** Kiểm tra tính hợp lệ của `theme.json` và xác nhận không phát sinh warning/error trong `wp-content/debug.log`
- [ ] **T012** Cập nhật nhật ký công việc vào `docs/changelog.md` và ghi nhận bài học phát sinh (nếu có)
