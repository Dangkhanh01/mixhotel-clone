# TASKS: TOÀN DIỆN NO-CODE WYSIWYG FIGMA-STYLE CHO TOÀN BỘ TRANG

## Phase 1: Tự Động Nạp Kho Ảnh Gốc Vào Media Library
- [x] T001: Viết script import toàn bộ ảnh từ `wp-content/themes/mixhotel-theme/assets/images/` vào WordPress Media Library trong `wp-content/themes/mixhotel-theme/inc/seed-pages.php`
- [x] T002: Thực thi import và kiểm tra kho ảnh đã xuất hiện đầy đủ trong `wp-admin/upload.php` kèm Attachment IDs (81 ảnh đã nạp thành công)

## Phase 2: Chuyển Đổi Banner & Ảnh Nền Sang `wp:cover`
- [x] T003: Chuyển đổi khối Banner hình ảnh trong `wp-content/themes/mixhotel-theme/patterns/about-intro.php` sang `<!-- wp:cover -->` kèm ID ảnh và nút "Thay thế"
- [x] T004: Chuyển đổi khối `final-cta.php` và `about-cta.php` sang `<!-- wp:cover -->` kết hợp `<!-- wp:buttons -->`
- [x] T005: Bổ sung CSS định dạng cho `.wp-block-cover.mixAboutBanner` trong `assets/css/pages-luxury.css` và `assets/css/editor-custom.css`

## Phase 3: Chuyển Đổi Lưới Ảnh & Card Sang `wp:image` + `wp:group` + `wp:buttons`
- [x] T006: Chuyển đổi lưới ảnh thật 100% trong `wp-content/themes/mixhotel-theme/patterns/real-photos-grid.php` sang các khối `<!-- wp:image -->` có nút "Thay thế" riêng
- [x] T007: Chuyển đổi card danh sách phòng concept trong `wp-content/themes/mixhotel-theme/patterns/concept-rooms.php` sang `wp:group` chứa `wp:image`, `wp:heading`, `wp:paragraph` và `wp:button`
- [x] T008: Chuyển đổi card danh sách 3 chi nhánh trong `wp-content/themes/mixhotel-theme/patterns/branches-list.php` sang `wp:group` chứa `wp:image`, `wp:heading`, `wp:paragraph` và `wp:button`
- [x] T009: Chuyển đổi bảng giá trong `wp-content/themes/mixhotel-theme/patterns/pricing-table.php` sang các card `wp:group` chuẩn

## Phase 4: Chuyển Đổi Khối Câu Hỏi FAQ Sang Native `core/details`
- [x] T010: Chuyển đổi danh sách câu hỏi trong `wp-content/themes/mixhotel-theme/patterns/faq-accordion.php` sang Native Core Block `<!-- wp:details -->`
- [x] T011: Thêm CSS styling cho `.wp-block-details.mix-faq-details` trong `assets/css/sections.css` và `assets/css/editor-custom.css` để giữ nguyên viền vàng bo góc và hiệu ứng đóng/mở mượt mà

## Phase 5: Xử Lý Tương Tác Nút Bấm `#booking` & Đồng Bộ Cơ Sở Dữ Liệu
- [x] T012: Thêm event delegation trong `wp-content/themes/mixhotel-theme/assets/js/booking-modal.js` (hoặc script modal) để bắt click các liên kết `href="#booking"` và class `.mix-btn-booking` mở popup đặt phòng
- [x] T013: Cập nhật hàm seeder `mixhotel_restore_all_pages_content()` trong `inc/seed-pages.php` với cấu trúc blocks mới và chạy đồng bộ lại toàn bộ trang trong database
- [x] T014: Kiểm tra cú pháp PHP `php -l` cho toàn bộ các file sửa đổi

## Phase 6: Kiểm Thử Toàn Diện (Visual & Functional E2E Verification)
- [x] T015: Dùng `browser_subagent` kiểm tra màn hình soạn thảo Gutenberg của Trang Chủ và Giới Thiệu: Xác nhận nút "Thay thế" (Replace) xuất hiện trên ảnh banner và ảnh card, kiểm tra gõ sửa text và giá phòng trực quan
- [x] T016: Dùng `browser_subagent` kiểm tra tính năng khôi phục trong `wp-admin/tools.php?page=mixhotel-restore-pages`
- [x] T017: Dùng `browser_subagent` kiểm tra frontend toàn bộ trang: Xác nhận popup đặt phòng mở khi bấm nút `#booking`, giao diện Dark Luxury không bị regression
- [x] T018: Kiểm tra `wp-content/debug.log` đảm bảo 0 Warning/Error, hoàn tất cập nhật tài liệu và báo cáo kết quả

## Phase 7: Hoàn Thiện Visual Parity & Gutenberg Validation Grammar (Khớp 100% Giao Diện Thật & Sạch Lỗi Block)
- [x] T019: Chuẩn hóa toàn bộ Core Block trong `patterns/concept-rooms.php`: loại bỏ inline `style="..."` trên heading/paragraph, chuyển vào class `.mixLuxuryRoomTitle`, `.mixLuxuryRoomDesc`, `.mixLuxuryRoomBadgeKicker`
- [x] T020: Chuẩn hóa `patterns/real-photos-grid.php`: loại bỏ thuộc tính `data-contact-action` và `data-room-title` trên thẻ `wp:group`, thay bằng semantic classes `.mix-photo-main`, `.mix-photo-tile`
- [x] T021: Chuẩn hóa `patterns/branches-list.php`: loại bỏ thuộc tính `data-*` trên nút `core/button`, sử dụng class `.mix-branch-btn-booking` và class container
- [x] T022: Cập nhật CSS trong `editor-custom.css` và `pages-luxury.css`: định dạng Hero background atmosphere trong editor, ẩn post title trên landing, và thiết lập full-width canvas bleed
- [x] T023: Cập nhật event delegation trong `assets/js/booking-modal.js` và `branch-booking.js` để bắt click theo semantic class thay vì phụ thuộc `data-*`
- [x] T024: Chạy `mixhotel_restore_all_pages_content()` để đồng bộ hóa lại 100% nội dung trang vào database
- [x] T025: Kiểm tra cú pháp PHP `php -l` cho toàn bộ các file
- [x] T026: Dùng `browser_subagent` mở Gutenberg editor Trang Chủ trong `wp-admin`, chụp ảnh xác nhận 0 lỗi Block Validation ("Khối chứa nội dung không hợp lệ"), xác nhận Hero background hiển thị chuẩn và giao diện khớp với frontend

## Phase 8: Refactor WYSIWYG No-Code Trang Khách Sạn Tình Yêu (Post ID 49)
- [x] T027: Chuyển đổi toàn bộ pattern `patterns/room-archive-content.php` (Hero, 3 Branches, 33 Concept Rooms, Bảng giá, Quy trình, Tiện ích, Booking CTA) thành native Gutenberg blocks (`wp:group`, `wp:heading`, `wp:paragraph`, `wp:image`, `wp:buttons`, `wp:button`, `wp:html`).
- [x] T028: Bọc tất cả layout wrappers (`container`, inner wrappers) bằng `wp:group` hợp lệ và chuyển các custom widgets (form, FAQ accordion, tab navigation, decor glow) sang `wp:html` tuân thủ BUG-16 & BUG-20.
- [x] T029: Bổ sung CSS Dark Luxury visual parity cho editor canvas trong `assets/css/editor-custom.css` (`.cateMixHero`, `.cateBranchCard`, `.cateBranchRooms`, `.mixCatePriceGrid`, v.v.).
- [x] T030: Đồng bộ database cho Post ID 49 thông qua `mixhotel_restore_all_pages_content()`.
- [x] T031: Kiểm thử tự động qua CDP: Xác nhận `warningCount: 0` (0 lỗi "Khối chứa nội dung không hợp lệ"), xác nhận click-to-edit và render thực tế đạt 100% Dark Luxury fidelity trên cả Editor và Frontend.

