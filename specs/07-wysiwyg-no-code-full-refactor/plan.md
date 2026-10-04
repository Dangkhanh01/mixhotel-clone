# PLAN-07: KẾ HOẠCH TRIỂN KHAI TOÀN DIỆN NO-CODE WYSIWYG FIGMA-STYLE

## MỤC TIÊU TRIỂN KHAI
Chuyển đổi toàn diện các khối HTML thô trên toàn bộ hệ thống trang Mix Hotel sang Core Blocks chuẩn, tích hợp sẵn toàn bộ kho ảnh vào Media Library, thiết lập block locking bảo vệ khung lưới, và đảm bảo 100% no-code click-to-edit cho người quản trị.

---

## CÁC GIAI ĐOẠN THỰC THI (PHASES)

### Phase 1: Tự Động Nạp Kho Ảnh Gốc Vào WordPress Media Library
* Viết helper nạp toàn bộ ảnh từ `assets/images/` vào bảng `wp_posts` (`post_type = attachment`).
* Lưu trữ bảng tra cứu (mapping) giữa tên file ảnh và Attachment ID.
* Đảm bảo khi admin mở bất kỳ khối `wp:image` hay `wp:cover` nào và bấm "Thay thế", WordPress Media Library đã có sẵn toàn bộ kho ảnh của khách sạn.

### Phase 2: Chuyển Đổi Các Khối Banner & Ảnh Nền Sang `wp:cover`
* Chuyển đổi `about-intro.php` (Banner "Không Gian Riêng Tư • Cảm Xúc Thăng Hoa") sang `<!-- wp:cover -->`.
* Chuyển đổi `final-cta.php` và `about-cta.php` sang `<!-- wp:cover -->`.
* Khóa di chuyển container và mở khóa nội dung text, badge, nút con bên trong.

### Phase 3: Chuyển Đổi Các Lưới Ảnh & Card Sang `wp:image` + `wp:group` + `wp:buttons`
* Chuyển đổi `real-photos-grid.php` (Ảnh thật 100% từng phòng): 6 khối ảnh `wp:image` có nút "Thay thế" riêng biệt.
* Chuyển đổi `concept-rooms.php` (Danh sách phòng concept): Card chuẩn `wp:group` chứa `wp:image` (ảnh), `wp:heading` (tên), `wp:paragraph` (giá, chi nhánh), `wp:button` (nút đặt phòng).
* Chuyển đổi `branches-list.php` (3 Chi nhánh): 3 card chi nhánh với `wp:image`, `wp:heading`, `wp:paragraph` và `wp:button`.
* Chuyển đổi `pricing-table.php` (Bảng giá 3 hạng phòng): Card biểu phí bằng `wp:group` và `wp:heading` / `wp:paragraph`.

### Phase 4: Chuyển Đổi Khối Câu Hỏi FAQ Sang Native `core/details`
* Chuyển đổi `faq-accordion.php` sang Native Core Block `<!-- wp:details {"className":"mix-faq-details"} -->`.
* Áp dụng CSS Dark Luxury bo góc, viền vàng cho `wp-block-details`.
* Cho phép click trực tiếp để gõ sửa câu hỏi và câu trả lời.

### Phase 5: Xử Lý Tương Tác Nút Bấm `#booking` & Cập Nhật Seeder Toàn Trang
* Thêm event delegation trong JS theme bắt sự kiện click link `#booking` để mở popup đặt phòng.
* Cập nhật hàm `mixhotel_restore_all_pages_content()` trong `inc/seed-pages.php` với cấu trúc blocks mới.
* Chạy seeder nạp lại toàn bộ trang trong database.

### Phase 6: Kiểm Thử Toàn Diện (End-to-End Visual & Functional Verification)
* Kiểm tra trình soạn thảo Gutenberg trên Trang Chủ, Giới Thiệu, Liên Hệ, Gallery, Tin Tức:
  - Xác nhận nút "Thay thế" (Replace) xuất hiện trên tất cả các ảnh và banner.
  - Xác nhận có thể gõ sửa trực tiếp tên phòng, giá tiền, câu hỏi FAQ.
  - Xác nhận 0 lỗi invalid block error.
* Kiểm tra ngoài frontend: Giao diện dark luxury không đổi, popup đặt phòng hoạt động bình thường.

### Phase 7: Hoàn Thiện Visual Parity & Gutenberg Validation Grammar (Khớp 100% Giao Diện Thật & Sạch Lỗi Block)
* Chuẩn hóa block schema: Loại bỏ 100% các thuộc tính không hợp lệ (`data-contact-action`, `data-room-title`, `data-branch-id`) và các inline `style="..."` bất hợp lệ trên các Core Block (`core/heading`, `core/paragraph`, `core/group`, `core/button`) trong `patterns/concept-rooms.php`, `patterns/real-photos-grid.php`, `patterns/branches-list.php`, v.v.
* Chuyển toàn bộ định dạng typography, margin, khoảng cách vào CSS classes và khai báo trong `assets/css/editor-custom.css`, `assets/css/pages-luxury.css` và `assets/css/pages.css`.
* Cập nhật CSS cho Hero Section bên trong `.editor-styles-wrapper` để hiển thị đầy đủ hình nền `hero-bg.webp`, lớp phủ mờ veil và hiệu ứng sàn vàng floor glow.
* Ẩn `.editor-post-title` trên trang chủ và landing page để loại bỏ tiêu đề thừa gây lệch khung hình.
* Cấu hình full-width canvas bleed cho `.editor-styles-wrapper .is-root-container` để giao diện editor dàn đều toàn màn hình giống hệt frontend.
* Chạy cập nhật lại toàn bộ nội dung trang vào database thông qua seeder `mixhotel_restore_all_pages_content()`.
* Dùng `browser_subagent` chụp ảnh đối chiếu kiểm chứng: 0 lỗi block validation ("Khối chứa nội dung không hợp lệ"), giao diện editor hiển thị sắc nét khớp 100% với frontend.
