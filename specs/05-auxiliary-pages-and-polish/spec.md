# FEATURE SPECIFICATION: 05 - AUXILIARY PAGES & POLISH

**Feature Branch:** `feat/05-auxiliary-pages-and-polish`  
**Status:** Spec Ready (Chờ duyệt)  
**Mục tiêu:** Xây dựng toàn bộ các trang phụ trợ còn thiếu trên website clone Mix Boutique Hotel, hoàn thiện navigation đầy đủ, tối ưu SEO Schema với Rank Math, và đánh bóng giao diện/hiệu năng để sẵn sàng nghiệm thu bàn giao.

---

## 1. CLARIFICATIONS (GỠ BỎ ĐIỂM MƠ HỒ)

* **Q: Dự án clone kỹ thuật, các trang phụ trợ cần clone đến mức độ nào?**
  * **A:** Clone bố cục visual và cấu trúc nội dung. Nội dung text/hình ảnh sử dụng nội dung mẫu có thể thay thế No-code qua Block Editor. Không hardcode nội dung tĩnh — tất cả phải quản trị được từ WP Admin.

* **Q: Website gốc `mixhotel.vn` có những trang phụ trợ nào cần tái tạo?**
  * **A:** Dựa trên phân tích sitemap navigation của website gốc, cần tái tạo:
    1. **Trang Giới Thiệu** (`/gioi-thieu/`) — Giới thiệu khách sạn, tiện nghi highlight, video YouTube, đánh giá khách hàng, carousel ảnh.
    2. **Trang Gallery** (`/gallery/`) — Lưới hình ảnh tổng hợp tất cả phòng, nhóm theo chi nhánh, phân trang, lightbox xem ảnh lớn.
    3. **Trang Tin Tức / Blog** (`/tin-tuc/`) — Archive bài viết WordPress Post type `post` sử dụng Categories để phân nhóm (Review, Địa điểm, Cẩm nang, Kiến thức).
    4. **Trang Chi Nhánh Chi Tiết** (`/chi-nhanh/{slug}/` hoặc custom slug theo CPT `hotel_branch`) — Thông tin chi nhánh, danh sách phòng thuộc chi nhánh, bản đồ Google Maps embed, thông tin liên hệ.
    5. **Trang Liên Hệ** (`/lien-he/`) — Form liên hệ (Tên, SĐT, Email, Nội dung), thông tin công ty, danh sách chi nhánh với map embed.
    6. **Các Trang Chính Sách** (Thanh toán, Bảo mật thông tin, Đặt trả phòng) — WordPress Pages chuẩn với nội dung text mẫu.
    7. **Trang 404** — Trang báo lỗi thân thiện, gợi ý quay về trang chủ hoặc trang phòng.

* **Q: Trang Liên hệ dùng form gì? Có cài plugin form không?**
  * **A:** Để tuân thủ nguyên tắc "ít plugin nhất có thể" trong `AGENTS.md §2`, form liên hệ sẽ được xử lý bằng **custom AJAX handler trong `mixhotel-core`** (tương tự cơ chế Booking Lead), không cài thêm plugin form. Dữ liệu lưu vào WordPress Options hoặc gửi email. Vì đây là clone kỹ thuật, form chạy ở chế độ **Demo Sandbox** — lưu log mô phỏng thay vì gửi email thật.

* **Q: Blog/Tin tức sử dụng CPT riêng hay WordPress Post mặc định?**
  * **A:** Sử dụng **WordPress Post type mặc định (`post`)** kết hợp **Categories** để phân nhóm chuyên mục (Review, Địa điểm hẹn hò, Cẩm nang, Kiến thức khách sạn). Đây là giải pháp tối ưu vì tận dụng toàn bộ hạ tầng sẵn có của WordPress Core: RSS, Archive templates, Gutenberg editor, REST API, Rank Math SEO integration.

* **Q: SEO Schema `LodgingBusiness` cấu hình ở đâu?**
  * **A:** Plugin **Rank Math SEO** (đã cài và kích hoạt) hỗ trợ Local SEO Schema. Cấu hình thông qua WP Admin → Rank Math → Local SEO, khai báo thông tin khách sạn: tên, địa chỉ, số điện thoại, giờ làm việc, loại hình kinh doanh. Không cần code PHP thủ công cho phần này.

---

## 2. BẢN ĐỒ TRANG (SITEMAP) VÀ TRẠNG THÁI HIỆN TẠI

| # | Trang | URL mục tiêu | Template FSE | Trạng thái |
|:--|:------|:-------------|:-------------|:-----------|
| 1 | Trang chủ | `/` | `front-page.html` | ✅ Feature 02 |
| 2 | Danh mục phòng | `/khach-san-tinh-yeu/` | `archive-hotel_room.html` | ✅ Feature 03 |
| 3 | Chi tiết phòng | `/khach-san-tinh-yeu/{slug}/` | `single-hotel_room.html` | ✅ Feature 03 |
| 4 | **Giới thiệu** | `/gioi-thieu/` | `page-gioi-thieu.html` | 🔲 Feature 05 |
| 5 | **Gallery** | `/gallery/` | `page-gallery.html` | 🔲 Feature 05 |
| 6 | **Chi nhánh chi tiết** | `/chi-nhanh/{slug}/` | `single-hotel_branch.html` | 🔲 Feature 05 |
| 7 | **Tin tức (Blog)** | `/tin-tuc/` | `home.html` (blog archive) | 🔲 Feature 05 |
| 8 | **Bài viết chi tiết** | `/tin-tuc/{slug}/` | `single.html` | 🔲 Feature 05 |
| 9 | **Liên hệ** | `/lien-he/` | `page-lien-he.html` | 🔲 Feature 05 |
| 10 | **Chính sách Thanh toán** | `/chinh-sach-thanh-toan/` | `page.html` (generic) | 🔲 Feature 05 |
| 11 | **Chính sách Bảo mật** | `/chinh-sach-bao-mat-thong-tin/` | `page.html` (generic) | 🔲 Feature 05 |
| 12 | **Chính sách Đặt trả phòng** | `/chinh-sach-dat-tra-phong/` | `page.html` (generic) | 🔲 Feature 05 |
| 13 | **Trang 404** | (bất kỳ URL không tồn tại) | `404.html` | 🔲 Feature 05 |

---

## 3. USER SCENARIOS & ACCEPTANCE CRITERIA

### US1 — Khách Xem Trang Giới Thiệu (Priority: P1)
* **Given:** Khách bấm menu "GIỚI THIỆU" hoặc truy cập `/gioi-thieu/`.
* **When:** Trang load xong.
* **Then:**
  1. Hiển thị breadcrumb `Trang chủ > Giới thiệu`.
  2. Section Hero: Tiêu đề "GIỚI THIỆU VỀ KHÁCH SẠN TÌNH YÊU", slogan brand, ảnh giới thiệu lớn (No-code replaceable qua Core Image Block).
  3. Section Trải nghiệm: Grid 6 icon tiện nghi (WiFi, Bồn tắm, Cosplay, An toàn, Đồ chơi, Dịch vụ) — dùng Core Image Block + Heading.
  4. Section Video YouTube embed (Responsive iframe 16:9).
  5. Section Đánh giá khách hàng: Grid card 2 cột, mỗi card có avatar (Core Image Block), tên, chức danh, rating sao, nội dung đánh giá.
  6. Section Thư viện hình ảnh: Carousel/Gallery ảnh phòng (Core Gallery Block hoặc pattern custom).

### US2 — Khách Xem Gallery Tổng Hợp (Priority: P1)
* **Given:** Khách bấm menu "GALLERY" hoặc truy cập `/gallery/`.
* **When:** Trang load xong.
* **Then:**
  1. Hiển thị breadcrumb `Trang chủ > Gallery`.
  2. Tiêu đề trang "GALLERY".
  3. Sidebar trái (hoặc filter trên mobile): Nhóm gallery theo chi nhánh (Gallery Mix Premium, Gallery 256B Đặng Tiến Đông, Gallery Phúc La).
  4. Grid ảnh phòng dạng card: Thumbnail ảnh đại diện + Tên phòng. Click vào → chuyển đến trang chi tiết phòng tương ứng (`single-hotel_room`).
  5. Phân trang (Pagination) nếu số phòng vượt quá 12 item/trang.

### US3 — Khách Xem Chi Nhánh Chi Tiết (Priority: P1)
* **Given:** Khách bấm vào tên chi nhánh từ trang chủ, dropdown menu, hoặc từ link chi nhánh bất kỳ.
* **When:** Trang `single-hotel_branch` load xong.
* **Then:**
  1. Breadcrumb `Trang chủ > Chi nhánh > {Tên chi nhánh}`.
  2. Hero banner chi nhánh (Featured Image) kèm tên chi nhánh.
  3. Nội dung mô tả chi nhánh (Block Editor content, No-code editable).
  4. Danh sách phòng thuộc chi nhánh: Query các `hotel_room` có `_mixhotel_room_branch_id` trùng với chi nhánh hiện tại. Hiển thị dạng card grid (ảnh, tên, giá tham khảo, link xem chi tiết).
  5. Thông tin liên hệ chi nhánh: Hotline (link `tel:`), Zalo, Messenger.
  6. Google Maps embed (lấy từ meta `_mixhotel_branch_map_embed`).

### US4 — Khách Đọc Tin Tức / Blog (Priority: P2)
* **Given:** Khách bấm menu "TIN TỨC" hoặc truy cập `/tin-tuc/`.
* **When:** Trang blog archive load xong.
* **Then:**
  1. Breadcrumb `Trang chủ > Tin tức`.
  2. Danh sách bài viết dạng card: Featured Image, Tiêu đề (link), Ngày đăng, Excerpt 2 dòng, Danh mục.
  3. Sidebar phải (desktop): Danh mục bài viết (Categories), Bài viết mới nhất (Recent Posts).
  4. Phân trang WordPress Pagination chuẩn.
  5. Click vào bài viết → chuyển đến `single.html` hiển thị nội dung đầy đủ, có breadcrumb, ảnh Featured, meta tác giả/ngày, nội dung Gutenberg blocks.

### US5 — Khách Gửi Form Liên Hệ (Priority: P1)
* **Given:** Khách truy cập `/lien-he/`.
* **When:** Điền đầy đủ form (Họ tên*, SĐT*, Email*, Nội dung) và bấm "Gửi".
* **Then:**
  1. Client-side validation: Họ tên không trống, SĐT 10 số VN, Email hợp lệ.
  2. Gửi AJAX request kèm Nonce Token (giống cơ chế Booking Lead).
  3. Server: Sanitize input → Lưu vào log / gửi email demo → Trả JSON success.
  4. Hiển thị thông báo "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất." màu xanh nổi bật.
  5. Bên cạnh form: Hiển thị thông tin công ty (Tên, GPKD, Địa chỉ), Hotline, Email, và Google Maps embed các chi nhánh.

### US6 — Khách Xem Trang Chính Sách (Priority: P3)
* **Given:** Khách bấm link Chính sách từ Footer hoặc dropdown menu.
* **When:** Trang chính sách load xong.
* **Then:**
  1. Breadcrumb `Trang chủ > {Tên chính sách}`.
  2. Nội dung chính sách là WordPress Page content, quản trị viên tự sửa qua Block Editor.
  3. Styling nhất quán với tone Dark Luxury của toàn bộ website.

### US7 — Trang 404 Thân Thiện (Priority: P3)
* **Given:** Khách truy cập URL không tồn tại.
* **When:** Trang 404 hiển thị.
* **Then:**
  1. Illustration/Icon "404" cách điệu theo tone Dark Luxury.
  2. Thông điệp: "Trang bạn tìm không tồn tại hoặc đã được di chuyển."
  3. Nút CTA: "Về Trang Chủ" và "Xem Phòng".

---

## 4. NON-FUNCTIONAL REQUIREMENTS (NFR)

* **NFR-001 (SEO Schema):** Cấu hình Rank Math Local SEO Schema `LodgingBusiness` cho website. Mỗi trang có title tag, meta description phù hợp. XML Sitemap tự động cập nhật khi thêm trang/bài viết mới.
* **NFR-002 (Hiệu năng):** Tất cả hình ảnh sử dụng `loading="lazy"` (WordPress 5.5+ mặc định). Plugin Converter for Media tự động chuyển đổi ảnh sang WebP/AVIF.
* **NFR-003 (Responsive):** Tất cả trang phụ trợ responsive hoàn hảo trên viewport 375px (mobile) đến 1440px (desktop).
* **NFR-004 (No-code Replaceability):** Mọi hình ảnh, nội dung text, video embed phải thay đổi được từ Block Editor mà không cần sửa code.
* **NFR-005 (Navigation Consistency):** Menu Header và Footer phải bao gồm đầy đủ link đến tất cả trang phụ trợ, đúng thứ tự và cấu trúc dropdown như website gốc.
* **NFR-006 (Bảo mật Form Liên hệ):** Tuân thủ `AGENTS.md §3` — Nonce, Sanitize, Escape, Rate-limiting.
