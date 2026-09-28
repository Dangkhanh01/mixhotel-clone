# TASKS: TOÀN DIỆN NO-CODE WYSIWYG FIGMA-STYLE CHO TOÀN BỘ TRANG

## Phase 1: Tự Động Nạp Kho Ảnh Gốc Vào Media Library
- [ ] T001: Viết script import toàn bộ ảnh từ `wp-content/themes/mixhotel-theme/assets/images/` vào WordPress Media Library trong `wp-content/themes/mixhotel-theme/inc/seed-pages.php`
- [ ] T002: Thực thi import và kiểm tra kho ảnh đã xuất hiện đầy đủ trong `wp-admin/upload.php` kèm Attachment IDs

## Phase 2: Chuyển Đổi Banner & Ảnh Nền Sang `wp:cover`
- [ ] T003: Chuyển đổi khối Banner hình ảnh trong `wp-content/themes/mixhotel-theme/patterns/about-intro.php` sang `<!-- wp:cover -->` kèm ID ảnh và nút "Thay thế"
- [ ] T004: Chuyển đổi khối `final-cta.php` và `about-cta.php` sang `<!-- wp:cover -->` kết hợp `<!-- wp:buttons -->`
- [ ] T005: Bổ sung CSS định dạng cho `.wp-block-cover.mixAboutBanner` trong `assets/css/pages-luxury.css` và `assets/css/editor-custom.css`

## Phase 3: Chuyển Đổi Lưới Ảnh & Card Sang `wp:image` + `wp:group` + `wp:buttons`
- [ ] T006: Chuyển đổi lưới ảnh thật 100% trong `wp-content/themes/mixhotel-theme/patterns/real-photos-grid.php` sang các khối `<!-- wp:image -->` có nút "Thay thế" riêng
- [ ] T007: Chuyển đổi card danh sách phòng concept trong `wp-content/themes/mixhotel-theme/patterns/concept-rooms.php` sang `wp:group` chứa `wp:image`, `wp:heading`, `wp:paragraph` và `wp:button`
- [ ] T008: Chuyển đổi card danh sách 3 chi nhánh trong `wp-content/themes/mixhotel-theme/patterns/branches-list.php` sang `wp:group` chứa `wp:image`, `wp:heading`, `wp:paragraph` và `wp:button`
- [ ] T009: Chuyển đổi bảng giá trong `wp-content/themes/mixhotel-theme/patterns/pricing-table.php` sang các card `wp:group` chuẩn

## Phase 4: Chuyển Đổi Khối Câu Hỏi FAQ Sang Native `core/details`
- [ ] T010: Chuyển đổi danh sách câu hỏi trong `wp-content/themes/mixhotel-theme/patterns/faq-accordion.php` sang Native Core Block `<!-- wp:details -->`
- [ ] T011: Thêm CSS styling cho `.wp-block-details.mix-faq-details` trong `assets/css/sections.css` và `assets/css/editor-custom.css` để giữ nguyên viền vàng bo góc và hiệu ứng đóng/mở mượt mà

## Phase 5: Xử Lý Tương Tác Nút Bấm `#booking` & Đồng Bộ Cơ Sở Dữ Liệu
- [ ] T012: Thêm event delegation trong `wp-content/themes/mixhotel-theme/assets/js/booking-modal.js` (hoặc script modal) để bắt click các liên kết `href="#booking"` và class `.mix-btn-booking` mở popup đặt phòng
- [ ] T013: Cập nhật hàm seeder `mixhotel_restore_all_pages_content()` trong `inc/seed-pages.php` với cấu trúc blocks mới và chạy đồng bộ lại toàn bộ trang trong database
- [ ] T014: Kiểm tra cú pháp PHP `php -l` cho toàn bộ các file sửa đổi

## Phase 6: Kiểm Thử Toàn Diện (Visual & Functional E2E Verification)
- [ ] T015: Dùng `browser_subagent` kiểm tra màn hình soạn thảo Gutenberg của Trang Chủ và Giới Thiệu: Xác nhận nút "Thay thế" (Replace) xuất hiện trên ảnh banner và ảnh card, kiểm tra gõ sửa text và giá phòng trực quan
- [ ] T016: Dùng `browser_subagent` kiểm tra tính năng khôi phục trong `wp-admin/tools.php?page=mixhotel-restore-pages`
- [ ] T017: Dùng `browser_subagent` kiểm tra frontend toàn bộ trang: Xác nhận popup đặt phòng mở khi bấm nút `#booking`, giao diện Dark Luxury không bị regression
- [ ] T018: Kiểm tra `wp-content/debug.log` đảm bảo 0 Warning/Error, hoàn tất cập nhật tài liệu và báo cáo kết quả
