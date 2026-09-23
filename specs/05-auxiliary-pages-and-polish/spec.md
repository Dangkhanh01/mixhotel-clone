# FEATURE SPECIFICATION: 05 - AUXILIARY PAGES & POLISH (REVISED V2)

**Feature Branch:** `feat/05-auxiliary-pages-and-polish`  
**Status:** In Progress (Spec-Driven Development)  
**Mục tiêu tối thượng:** Tái tạo chính xác 100% chuẩn mực thị giác (Pixel-Perfect Dark Luxury) của toàn bộ các trang phụ trợ từ prototype chuẩn Next.js tại thư mục `@ui/` sang WordPress FSE Block Theme `mixhotel-theme`, giải quyết triệt để vấn đề sụt giảm chất lượng (UI Downgrade) của mô hình incremental coding.

---

## 1. THIẾT LẬP NGUYÊN TẮC: GROUND TRUTH & ZERO DRIFT

* **HIẾN PHÁP GIAO DIỆN (Single Source of Truth):**
  Thư mục `@ui/src/app/` và `@ui/src/components/` là **Design Master tuyệt đối (tương đương bản vẽ Figma nghiệm thu)**.
  Mọi mã nguồn WordPress Pattern, FSE Template, CSS và Assets sinh ra trong Spec 5 BẮT BUỘC phải đối chiếu 1:1 với component tương ứng trong `@ui`. TUYỆT ĐỐI KHÔNG tự chế HTML/CSS ngoài phạm vi prototype mẫu.

* **BẢNG ÁNH XẠ NGUỒN (SOURCE-TO-TARGET MAPPING):**

| Trang | Source File trong `@ui` | WordPress Target Template / Pattern |
|---|---|---|
| **Giới Thiệu** | `ui/src/app/gioi-thieu/page.tsx` | `templates/page-gioi-thieu.html` $\rightarrow$ `patterns/about-*.php` |
| **Gallery** | `ui/src/app/gallery/page.tsx` | `templates/page-gallery.html` $\rightarrow$ `patterns/gallery-grid.php` |
| **Liên Hệ** | `ui/src/app/lien-he/page.tsx` | `templates/page-lien-he.html` $\rightarrow$ `patterns/contact-page-content.php` + `patterns/contact-maps.php` |
| **Chi Nhánh** | `ui/src/components/branch/BranchDetailTemplate.tsx` | `templates/single-hotel_branch.html` $\rightarrow$ `patterns/branch-detail.php` |
| **Tin Tức (Archive)** | `ui/src/app/tin-tuc/page.tsx` | `templates/home.html` $\rightarrow$ `patterns/blog-archive-content.php` |
| **Bài Viết (Single)** | `ui/src/components/article/ArticleDetailClient.tsx` | `templates/single.html` $\rightarrow$ `patterns/blog-single-content.php` |
| **Chính Sách Thanh Toán** | `ui/src/app/chinh-sach-thanh-toan/page.tsx` | `patterns/policy-payment.php` (hoặc Gutenberg Block Pattern) |
| **Chính Sách Bảo Mật** | `ui/src/app/chinh-sach-bao-mat-thong-tin/page.tsx` | `patterns/policy-privacy.php` |
| **Chính Sách Đặt Trả** | `ui/src/app/chinh-sach-dat-tra-phong/page.tsx` | `patterns/policy-booking.php` |
| **Trang 404** | `ui/src/app/mixhotel-luxury.css` (`.block404`) | `templates/404.html` $\rightarrow$ `patterns/page-404.php` |

---

## 2. QUY CHUẨN DESIGN SYSTEM & TYPOGRAPHY

1. **Font Chữ Thương Hiệu (Philosopher Font):**
   * Font chữ chủ đạo của Mix Boutique Hotel là **Philosopher** (`Philosopher-Bold.ttf`, `Philosopher-Regular.ttf`).
   * Phải được nạp qua `@font-face` trong `assets/css/` từ `assets/fonts/`.
   * Toàn bộ Heading H1, H2, H3, kicker, giá phòng và nút CTA phải có class font hoặc thuộc tính `font-family: 'Philosopher', sans-serif`.

2. **Bảng Màu Dark Luxury Chuẩn:**
   * Nền chính: `#070503` (đen cà phê huyền bí).
   * Nền thẻ Card / Section: `#140e0a` hoặc `#1c140e`.
   * Viền thẻ (Border): `rgba(200, 137, 34, 0.25)` (vàng kim ánh mờ).
   * Điểm nhấn vàng (Accent Gold): `#c88922`.
   * Vàng kim rực rỡ (Highlight Gold): `#ffe2a0`.
   * Chữ chính: `#fff8ec` (trắng kem ngà, dịu mắt).
   * Chữ phụ / mô tả: `#a0a0a8` / `#c5b8a5`.
   * Nút bấm CTA: Gradient vàng kim 3 điểm dừng `linear-gradient(to right, #c88922, #ffe2a0, #d9a83a)` bo tròn viên thuốc (`rounded-full` / `border-radius: 9999px`).

3. **Kiến Trúc CSS:**
   * Thay vì tự viết class BEM tùy tiện, sử dụng bộ CSS đồng bộ từ `@ui` (`assets/css/pages-luxury.css`), kế thừa hoàn toàn các lớp giao diện chuẩn: `.titleBlock_1`, `.wrapSubcateBlock_1`, `.gold-rectangle`, các utility classes, và hiệu ứng animation (`latdat_2`, `bigshake_1`, `appeared_1`).

---

## 3. USER SCENARIOS & ACCEPTANCE CRITERIA

### US1 — Trang Giới Thiệu Chuẩn Dark Luxury (`/gioi-thieu/`)
* **Given:** Khách truy cập `http://localhost:8888/gioi-thieu/`.
* **Then:**
  1. Breadcrumb chuẩn: `Trang chủ / Giới thiệu` trên nền `#0f0b08`.
  2. Kicker vàng: `GIỚI THIỆU VỀ HỆ THỐNG`.
  3. Tiêu đề H1 font Philosopher: `VỀ KHÁCH SẠN TÌNH YÊU MIX BOUTIQUE`.
  4. Story quote nổi bật: *"ĐỪNG ĐỂ TÌNH YÊU CỦA BẠN CHỈ CÓ MỘT MÀU!"* màu `#ffe2a0`.
  5. Banner ảnh lớn bo góc tròn `rounded-3xl` (ảnh `mixhotel-gt-.webp`) kèm badge nổi `Boutique Mood` và overlay tiêu đề `"Không Gian Riêng Tư • Cảm Xúc Thăng Hoa"`.
  6. Lưới 6 Đặc quyền tiện nghi (WiFi nhanh, Bồn tắm đôi, Trang phục cosplay, Ghế Tantra, Smart TV & Netflix, Đồ uống & Cocktail) dạng thẻ card `#15100c` viền vàng kim, có icon SVG sắc nét.
  7. Lưới 4 đánh giá thực tế từ khách hàng thân thiết kèm 5 sao vàng kim.
  8. Banner CTA cuối trang với nút bấm gradient viên thuốc `"ĐẶT PHÒNG NGAY"`.

### US2 — Trang Gallery Bộ Sưu Tập Chuẩn (`/gallery/`)
* **Given:** Khách truy cập `http://localhost:8888/gallery/`.
* **Then:**
  1. Header Gallery: Tiêu đề `GALLERY` với đường kẻ line vàng chân tiêu đề chuẩn class `.titleBlock_1`.
  2. Thanh Tab lọc chi nhánh: `Tất Cả Các Cơ Sở`, `CS1: Mix Premium Huỳnh Thúc Kháng`, `CS2: 256B Đặng Tiến Đông`, `CS3: 20 Phúc La Hà Đông`. Tab hoạt động lọc ảnh mượt mà.
  3. Lưới ảnh phòng: Khung ảnh chữ nhật tỷ lệ vàng (`gold-rectangle`), hover zoom mượt mà, overlay gradient đen-vàng kim hiển thị tên phòng và cơ sở.
  4. Nút phân trang điều hướng.

### US3 — Trang Chi Nhánh Chi Tiết Chuẩn (`single-hotel_branch`)
* **Given:** Khách xem chi tiết chi nhánh (ví dụ: `cs1-huynh-thuc-khang`).
* **Then:**
  1. Hero section hoành tráng: Kicker, tiêu đề chi nhánh font Philosopher cỡ lớn, mô tả vị trí.
  2. Hàng Stats nổi bật (4 chỉ số: 11 Phòng concept, 24/7 Phục vụ, Bồn sục đôi, 100% Riêng tư).
  3. Form đặt phòng giữ chỗ nhanh gắn liền với chi nhánh.
  4. Lưới danh sách phòng của chi nhánh kèm giá và tiện ích nổi bật.
  5. Bản đồ Google Maps nhúng trực tiếp hoặc link chỉ đường chính xác.
  6. 3 nút liên hệ nhanh: Gọi Hotline, Nhắn Zalo, Chỉ Đường.

### US4 — Trang Tin Tức / Blog & Bài Viết Đơn
* **Given:** Khách xem trang blog (`/tin-tuc/`) hoặc bài viết chi tiết.
* **Then:**
  1. Trang archive có 8 chuyên mục tin tức chuẩn: `Review Khách Sạn`, `Địa Điểm Hẹn Hò`, `Địa Điểm Đi Chơi`, `Gợi Ý Quà Tặng`, `Kiến Thức Khách Sạn`, `Cẩm Nang Tình Yêu`, `Địa Chỉ Khách Sạn`.
  2. Danh sách bài viết dạng thẻ card với ảnh chụp thật từ `assets/images/articles/`, ngày đăng, chuyên mục, tóm tắt.
  3. Sidebar hiển thị chuyên mục, bài viết xem nhiều, banner CTA đặt phòng.
  4. Trang bài viết chi tiết (`single.html`): Tiêu đề font Philosopher, ảnh đại diện lớn, Typography chuẩn Dark Luxury dễ đọc, hộp tóm tắt Mục lục bài viết (Table of Contents), và nút chia sẻ Zalo/Facebook.

### US5 — Trang Liên Hệ & Form AJAX Hoàn Chỉnh (`/lien-he/`)
* **Given:** Khách truy cập `http://localhost:8888/lien-he/`.
* **Then:**
  1. Cột trái: Card form bo góc `rounded-3xl` nền `#140e0a`, input nền `#0c0806` viền vàng kim `#c88922]/30`.
  2. Form submit qua AJAX không tải lại trang, bảo mật Nonce CSRF, chống bot honeypot, rate limiting 3 lượt/10 phút.
  3. Client validation (SĐT VN 10 số, Họ tên tối thiểu 2 ký tự).
  4. Khi gửi thành công: Nút chuyển spinner $\rightarrow$ box thông báo xanh vàng thân thiện $\rightarrow$ ghi nhận lead vào Demo Sandbox CSDL WordPress.
  5. Cột phải: Thông tin 3 cơ sở kèm icon MapPin vàng, hotline, email, giờ mở cửa 24/7, Box Zalo riêng biệt với nút bấm mở Zalo nhanh.
  6. Phía dưới: Lưới 3 bản đồ Google Maps của 3 chi nhánh.

### US6 — 3 Trang Chính Sách Chuẩn Dark Luxury Cards
* **Given:** Khách xem `/chinh-sach-thanh-toan/`, `/chinh-sach-bao-mat-thong-tin/`, `/chinh-sach-dat-tra-phong/`.
* **Then:**
  1. Không phải văn bản thô sơ, mà được đóng gói trong Card lớn `rounded-3xl p-8 md:p-12 bg-[#140e0a] border border-[#c88922]/25`.
  2. Các điều khoản chia thành các hộp con `p-6 rounded-2xl bg-[#1c140e] border border-[#c88922]/20`.
  3. Có icon trực quan: `Banknote` (tiền mặt), `CreditCard` (chuyển khoản QR/thẻ), `ShieldCheck` (bảo mật), `Clock` (khung giờ lưu trú), `Calendar` (đặt cọc).
  4. Hộp cam kết bảo mật quyền riêng tư màu vàng kim nổi bật.

### US7 — Trang Báo Lỗi 404
* **Given:** Khách vào đường dẫn không tồn tại.
* **Then:**
  1. Giao diện Dark Luxury class `.block404` chuẩn styling của Mix Hotel.
  2. Số 404 lớn nghệ thuật.
  3. 2 nút bấm điều hướng rõ ràng: Về Trang Chủ và Xem Danh Sách Phòng.

---

## 4. KẾ THỪA & BẢO TOÀN TÀI NGUYÊN BACKEND ĐÃ HOÀN THÀNH

* `MixHotel_Contact_Handler` trong `wp-content/plugins/mixhotel-core/includes/class-contact-handler.php` được bảo lưu 100%.
* Bảng nhật ký Contact Leads trong WP Admin (`mixhotel-sandbox-logs`) được bảo lưu 100%.
* Quy chuẩn chống lỗi `BUG-07` (không nhúng PHP vào file FSE `.html`, luôn dùng `.php` patterns) được áp dụng nghiêm ngặt cho toàn bộ các trang.
