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

---

## Phase 6: Seed-First Real Data Migration (Lựa chọn A)

- [x] **T015** Mở rộng `wp-content/plugins/mixhotel-core/seed-rooms-branches.php`:
  - Hỗ trợ CLI execution trực tiếp (`require wp-load.php`).
  - Nâng cấp `mix_import_attachment` hỗ trợ đa thư mục (`assets/images`, `assets/storage`, `assets/uploads`).
  - Định nghĩa đầy đủ 32 phòng với slug, tiêu đề, mã phòng, chi nhánh, giá 4 bậc, trích dẫn, nội dung concept, ảnh đại diện, amenities taxonomy.
- [x] **T016** Thực thi Seeder qua Docker container:
  - Chạy `seed-rooms-branches.php` để tạo/cập nhật 32 CPT `hotel_room` posts và media attachments trong database.
  - Flush rewrite rules để kích hoạt toàn bộ 32 permalinks `/khach-san-tinh-yeu/<slug>/`.
  - Xác minh 32 posts đều ở trạng thái `publish` trong database.
- [x] **T017** Refactor `wp-content/themes/mixhotel-theme/patterns/room-archive-content.php`:
  - Thay thế việc require dữ liệu mock tĩnh `inc-branches-data.php` bằng `WP_Query` động từ database.
  - Query các chi nhánh `hotel_branch` và các phòng thuộc từng chi nhánh qua meta `_mixhotel_room_branch_id`.
  - Giữ nguyên 100% markup UI, CSS classes và bài viết SEO (`inc-khach-san-tinh-yeu-article.php`).
  - Xây dựng dropdown phòng trong Form tư vấn động từ dữ liệu phòng thực tế.
- [x] **T018** Kiểm tra & Xác minh toàn diện (Verification Loop):
  - Chạy `php -l` trên các file PHP đã chỉnh sửa.
  - Kiểm tra HTTP response của trang danh mục `/khach-san-tinh-yeu/` và tất cả 32 trang chi tiết `/khach-san-tinh-yeu/<slug>/` (Đảm bảo 100% mã 200 OK, 0 mã 404).
  - Kiểm tra `wp-content/debug.log` đảm bảo không có warning/error.
  - Đánh dấu hoàn thành các task và cập nhật `docs/changelog.md`.

---

## Phase 7: Hero Section Layout Conflict Resolution (Fix UI Bug)

- [x] **T019** Điều tra nguyên nhân gốc rễ (Root Cause Analysis):
  - Dùng Headless Chrome CDP trích xuất CSS Rules áp dụng lên `.mixDetailHeroWrap`.
  - Phát hiện 292 quy tắc kế thừa trong `pages-luxury.css` (đặc biệt `.mixDetailHero .mixDetailHeroWrap { display: grid; grid-template-columns: minmax(0, 1.25fr) 430px; }`) ghi đè lên layout chuẩn của `room-detail.css`.
- [x] **T020** Xử lý xung đột CSS & Chuỗi nạp tài nguyên:
  - Đổi tên `.mixDetailHero` thành `.mixDetailHeroScraped` trong `pages-luxury.css` để ngăn chặn rò rỉ namespace.
  - Cập nhật `room-detail.css`: thiết lập `.mixDetailHeroWrap` với `display: block !important; width: 100%; max-width: 1200px;`, font `Philosopher` cho tiêu đề, tỷ lệ 4:3 và viền vàng kim cho ảnh chính lớn.
  - Cập nhật `functions.php`: bổ sung dependency `'mixhotel-pages-luxury'` vào `mixhotel-room-detail` và cache-busting `filemtime`.
- [x] **T021** Xác minh thị giác đa thiết bị & đa phòng:
  - Kiểm tra tự động trên Desktop (1920x1080) và Mobile (390x844) cho các phòng `Karma`, `Bad girl`, `Inferno`, `Get High`.
  - Bố cục 2 cột 7:5 trên Desktop và 1 cột xếp dọc trên Mobile đạt chuẩn 100% theo prototype Next.js.
  - Ghi nhận bài học vào `.agents/skills/wordpress-bug-prevention/SKILL.md` (BUG-10).


