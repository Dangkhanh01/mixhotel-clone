# SPEC-07: TOÀN DIỆN NO-CODE WYSIWYG FIGMA-STYLE CHO TOÀN BỘ TRANG (MIX HOTEL)

## 1. TỔNG QUAN & BỐI CẢNH (OVERVIEW & CONTEXT)

* **Vấn đề hiện tại:** Sau khi chuyển đổi các trang sang `wp:post-content` và Dark Canvas trong Gutenberg, nhiều thành phần giao diện phức hợp (như Banner hình ảnh trang Giới thiệu, Lưới ảnh phòng thật, Danh sách phòng concept, Danh sách chi nhánh, Khối câu hỏi FAQ, các nút CTA) vẫn đang được đóng gói trong các khối `<!-- wp:html -->` thô.
* **Hậu quả:** Người quản trị website (Admin / Biên tập viên không biết lập trình) khi mở trang soạn thảo không thể:
  1. Nhấp vào hình ảnh để bấm nút **"Thay thế" (Replace)** từ Media Library.
  2. Nhấp vào câu chữ, tiêu đề, giá tiền để gõ sửa trực tiếp trên canvas.
  3. Nhấp vào nút bấm để đổi nhãn chữ hoặc liên kết URL một cách trực quan.
* **Mục tiêu:** Chuyển đổi 100% các khối nội dung tĩnh và phức hợp trên toàn bộ website thành **WordPress Native Core Blocks** (`wp:cover`, `wp:image`, `wp:group`, `wp:heading`, `wp:paragraph`, `wp:buttons`, `wp:details`), mang lại trải nghiệm chỉnh sửa trực quan dạng Figma no-code 100%, đồng thời giữ nguyên vẹn 100% tính thẩm mỹ Dark Luxury và logic tương tác.

---

## 2. KẾT QUẢ ĐỒNG THUẬN TỪ QUY TRÌNH /GRILL-ME

1. **Chiến lược chuyển đổi khối (Block Conversion Strategy):**
   - Chuyển đổi toàn bộ các khối nội dung (Banner, Card phòng, Card chi nhánh, Lưới ảnh thật, FAQ, Nút bấm) sang Core Blocks chuẩn.
   - CHỈ giữ lại `<!-- wp:html -->` cho các logic đặc thù không thể thay thế bằng Core Block (ví dụ: Form đặt phòng AJAX kèm honeypot, Google Maps iframe embed).
2. **Tích hợp Media Library (Kho ảnh WordPress):**
   - Tự động nhập (import) toàn bộ các file ảnh gốc của theme vào WordPress Media Library làm Attachment posts có ID và Alt text đầy đủ.
   - Khi admin nhấp vào bất kỳ ảnh/banner nào rồi bấm "Thay thế" (Replace), họ sẽ thấy ngay sẵn toàn bộ kho ảnh chất lượng cao của Mix Hotel.
3. **Nút bấm tương tác no-code (`wp:buttons` / `wp:button`):**
   - Mọi nút bấm chuyển thành khối `<!-- wp:button -->` chuẩn.
   - Admin có thể gõ sửa chữ trên nút và đổi link trực quan.
   - Javascript của theme sẽ tự động bắt các liên kết `#booking` để kích hoạt Booking Modal Popup, hoặc xử lý các liên kết `tel:`, `zalo:`, `https://` bình thường.
4. **Bảo vệ bố cục (Block Locking):**
   - Khóa khung cấu trúc container (`lock: {"move": true, "remove": true}`) ở cấp độ Section, Columns và Card Wrapper để chống admin vô tình xóa nhầm hoặc kéo thả làm vỡ CSS layout.
   - Toàn bộ nội dung bên trong (chữ, ảnh, icon, nút bấm) được mở khóa tự do 100% để click sửa trực tiếp.
5. **Phạm vi áp dụng (Scope of Rollout):**
   - Triển khai trọn gói đồng bộ trên toàn bộ hệ thống trang: Trang Chủ, Giới Thiệu, Liên Hệ, Gallery, Tin Tức, Khách Sạn Tình Yêu, 3 Chi Nhánh, 3 Chính Sách.

---

## 3. THIẾT KẾ KIẾN TRÚC CHI TIẾT (TECHNICAL DESIGN)

### 3.1. Phân Loại & Chuyển Đổi Các Khối Giao Diện

| Khối Giao Diện | Cấu Trúc Cũ (`wp:html`) | Cấu Trúc Mới (Native Core Blocks) | Trải Nghiệm No-Code Mới Cho Admin |
| :--- | :--- | :--- | :--- |
| **Banner Giới Thiệu (`about-intro.php`)** | `<div class="mixAboutBanner">...</div>` | `<!-- wp:cover {"url":"...","id":X,"className":"mixAboutBanner"} -->` chứa `wp:paragraph` (Badge) và `wp:heading` (Title) | Click vào ảnh hiện nút **"Thay thế" (Replace)**; click vào chữ gõ sửa trực tiếp. |
| **Ảnh Thật Phòng Thật (`real-photos-grid.php`)** | Lưới thẻ `<img src="...">` trong `wp:html` | `<!-- wp:columns -->` / `<!-- wp:group -->` chứa 6 khối `<!-- wp:image -->` chuẩn, kết hợp `wp:paragraph` caption & badge | Nhấp vào từng ô ảnh để đổi ảnh từ Media Library; sửa tên phòng & mô tả trực tiếp. |
| **Phòng Concept (`concept-rooms.php`)** | Card HTML tĩnh chứa `<img>`, `<span class="price">` | Các thẻ `wp:group` (Card) chứa `<!-- wp:image -->` (ảnh phòng), `wp:heading` (tên phòng), `wp:paragraph` (giá, cơ sở), và `wp:button` ("Đặt Phòng") | Đổi ảnh phòng, sửa giá tiền (ví dụ `300.000đ/2h`), sửa tên phòng, đổi nút đặt phòng hoàn toàn trực quan. |
| **Chi Nhánh (`branches-list.php`)** | Khối HTML 3 cơ sở tĩnh | `wp:columns` chứa 3 card `wp:group`, mỗi card có `wp:image` (ảnh chi nhánh), `wp:heading` (tên CS), `wp:paragraph` (địa chỉ, hotline) và `wp:button` ("Xem Chi Nhánh") | Click thay ảnh cơ sở, cập nhật địa chỉ hotline trực quan. |
| **Bảng Giá (`pricing-table.php`)** | Khối HTML 3 thẻ giá tĩnh | `wp:columns` chứa 3 card `wp:group`, mỗi card có `wp:heading` (hạng phòng), `wp:paragraph` (giá giờ, giá qua đêm), `wp:button` ("Đặt phòng") | Chỉnh sửa biểu phí dịch vụ trực tiếp dạng bảng. |
| **Câu Hỏi Thường Gặp (`faq-accordion.php`)** | Thẻ `<details>` thô trong `wp:html` | Native Core Block `<!-- wp:details {"className":"mix-faq-details"} -->` chứa `<summary>` câu hỏi và `wp:paragraph` câu trả lời | Nhấp vào câu hỏi hoặc câu trả lời để soạn thảo nội dung no-code. |
| **Các Banner CTA (`final-cta.php`, `about-cta.php`)** | Banner ảnh nền | `<!-- wp:cover -->` kết hợp `<!-- wp:buttons -->` | Đổi ảnh nền banner 1-click; sửa tiêu đề, mô tả và nút kêu gọi hành động. |

---

### 3.2. Script Nhập Ảnh Tự Động (Auto Media Importer)

* Tạo hàm `mixhotel_import_theme_images_to_media_library()` trong `inc/seed-pages.php`:
  * Quét thư mục `wp-content/themes/mixhotel-theme/assets/images/`.
  * Với mỗi file ảnh (`.webp`, `.jpg`, `.png`), kiểm tra xem đã tồn tại Attachment Post trong database chưa.
  * Nếu chưa, tự động tạo Attachment Post thông qua `wp_insert_attachment()` và `wp_generate_attachment_metadata()`.
  * Trả về mảng mapping `[filename => attachment_id]` để các khối `wp:image` và `wp:cover` liên kết chính xác cả ID và URL.

---

### 3.3. Xử Lý Tương Tác Nút Bấm (`#booking` Event Listener)

* Trong `assets/js/booking-engine.js` (hoặc modal listener):
  * Bổ sung event delegation lắng nghe sự kiện click trên mọi thẻ `<a>` hoặc button có `href="#booking"` hoặc class `.mix-btn-booking`.
  * Tự động mở modal đặt phòng (`bookingModalLite`), ngăn chặn hành vi nhảy trang `#booking` mặc định.
