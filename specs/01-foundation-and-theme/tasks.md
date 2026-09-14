# TASKS: 01 - FOUNDATION AND THEME SETUP

**Input:** `specs/01-foundation-and-theme/spec.md`, `specs/01-foundation-and-theme/plan.md`, `contracts/`  
**Quy tắc:** Mỗi task gắn cứng đường dẫn file chính xác. Kiểm tra cú pháp PHP ngay sau khi hoàn thành.

---

## Phase 1: Foundational — Cấu Trúc Theme & Design Tokens
- [X] **T001** [P] Tạo file metadata theme tại `wp-content/themes/mixhotel-theme/style.css`
- [X] **T002** [P] Tạo cấu trúc thư mục template tại `wp-content/themes/mixhotel-theme/templates/` và `parts/`
- [X] **T003** Tạo file `wp-content/themes/mixhotel-theme/theme.json` khớp 100% với `contracts/theme-tokens.contract.json` (Palette màu, typography Questrial/Roboto, spacing scale)
- [X] **T004** Tạo file template cơ sở `wp-content/themes/mixhotel-theme/templates/index.html` và `templates/front-page.html`
- [X] **T005** [P] Tạo template parts `wp-content/themes/mixhotel-theme/parts/header.html` và `parts/footer.html`

---

## Phase 2: Foundational — Plugin Nghiệp Vụ `mixhotel-core`
- [X] **T006** Khởi tạo file bootstrap plugin tại `wp-content/plugins/mixhotel-core/mixhotel-core.php`
- [X] **T007** [P] Triển khai đăng ký Taxonomy `room_amenity` và `room_concept` tại `wp-content/plugins/mixhotel-core/includes/class-taxonomies.php`
- [X] **T008** [P] Triển khai đăng ký CPT `hotel_room`, `hotel_branch` và `booking_lead` tại `wp-content/plugins/mixhotel-core/includes/class-cpt-room.php`
- [X] **T009** Cấu hình `register_activation_hook` để flush rewrite rules an toàn theo quy tắc `BUG-02` trong `wordpress-bug-prevention/SKILL.md`

---

## Phase 3: Verification & Fast Loop (Kiểm Chứng Tức Thì)
- [X] **T010** Xác nhận cấu trúc code PHP OOP chuẩn cho `mixhotel-core.php`, `class-taxonomies.php`, `class-cpt-room.php`
- [X] **T011** Kiểm tra tính hợp lệ của `theme.json` (đã pass kiểm tra JSON Schema với PowerShell)
- [X] **T012** Cập nhật nhật ký công việc vào `docs/changelog.md`
