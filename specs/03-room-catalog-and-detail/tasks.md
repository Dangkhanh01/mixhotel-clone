# TASKS: 03 - ROOM CATALOG AND DETAIL

**Input:** `specs/03-room-catalog-and-detail/spec.md`  
**Prototype Refs:** `ui/src/app/khach-san-tinh-yeu/page.tsx`, `ui/src/app/khach-san-tinh-yeu/[slug]/RoomDetailClient.tsx`

---

## Phase 1: Plugin — Meta Boxes & Helper Functions

- [x] **T001** Tạo file `wp-content/plugins/mixhotel-core/includes/class-meta-boxes.php` — Đăng ký meta boxes cho CPT `hotel_room` (Mã phòng, Chi nhánh, Bảng giá 4 mức, Gallery IDs, YouTube Video ID, Featured flag) và CPT `hotel_branch` (Địa chỉ, Hotline, Zalo, Messenger, SMS, Maps embed)
- [x] **T002** Tạo file `wp-content/plugins/mixhotel-core/includes/class-helpers.php` — Hàm tiện ích: `mixhotel_format_price($amount)`, `mixhotel_get_branch_data($branch_id)`, `mixhotel_get_room_price($post_id, $type)`, `mixhotel_get_room_gallery($post_id)`
- [x] **T003** Cập nhật `wp-content/plugins/mixhotel-core/mixhotel-core.php` — Require 2 file mới, gọi init

---

## Phase 2: Theme — CSS Module cho Room Pages

- [x] **T004** Tạo file `wp-content/themes/mixhotel-theme/assets/css/room-detail.css` — Styles cho trang chi tiết phòng (Hero with blurred bg, breadcrumb, gallery grid, pricing cards, booking form, concept perks, responsive)
- [x] **T005** Tạo file `wp-content/themes/mixhotel-theme/assets/css/room-archive.css` — Styles cho trang danh mục (filter bar, room card grid, empty state, responsive)
- [x] **T006** Cập nhật `wp-content/themes/mixhotel-theme/functions.php` — Enqueue 2 CSS modules mới (conditional: chỉ load trên trang `hotel_room`)

---

## Phase 3: Theme — Patterns & Templates

- [x] **T007** Tạo file `wp-content/themes/mixhotel-theme/patterns/room-detail-content.php` — Pattern PHP render toàn bộ nội dung trang chi tiết phòng (6 sections: Hero, Gallery, Video, Concept, Pricing, Booking Form). Dùng WP_Query + post meta + helper functions
- [x] **T008** Tạo file `wp-content/themes/mixhotel-theme/patterns/room-archive-content.php` — Pattern PHP render trang danh mục (filter bar + grid cards). Dùng WP_Query truy vấn tất cả hotel_room published
- [x] **T009** Tạo file `wp-content/themes/mixhotel-theme/templates/single-hotel_room.html` — FSE template cho trang chi tiết phòng (header + pattern + floating bars + footer)
- [x] **T010** Tạo file `wp-content/themes/mixhotel-theme/templates/archive-hotel_room.html` — FSE template cho trang danh mục phòng

---

## Phase 4: JavaScript — Gallery & Filter

- [x] **T011** Tạo file `wp-content/themes/mixhotel-theme/assets/js/room-gallery.js` — Vanilla JS: click thumbnail → swap main image, active state
- [x] **T012** Tạo file `wp-content/themes/mixhotel-theme/assets/js/room-filter.js` — Vanilla JS: click amenity tag → filter cards by data-amenity attribute, "Tất cả" reset

---

## Phase 5: Verification

- [x] **T013** Kiểm tra cú pháp PHP: `php -l` trên tất cả file `.php` mới (Đã xác minh qua container Docker: 100% file không lỗi cú pháp, WP_DEBUG_LOG sạch 0 lỗi, E2E browser test hoàn thành thành công)
- [x] **T014** Cập nhật `docs/changelog.md`
