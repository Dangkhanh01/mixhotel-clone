# TASKS: 05 - AUXILIARY PAGES & POLISH (PIXEL-PERFECT V2)

**Mục tiêu:** Tái tạo chuẩn xác 100% giao diện Dark Luxury từ prototype `@ui/` sang WordPress FSE Theme `mixhotel-theme`, khắc phục triệt để UI downgrade.

---

## Phase 1: Foundation, Typography & CSS Assets

- [X] **T001** Copy font **Philosopher** (`Philosopher-Bold.ttf`, `Philosopher-Regular.ttf`) từ `ui/public/fonts/` vào `wp-content/themes/mixhotel-theme/assets/fonts/`.
- [X] **T002** Copy hình ảnh thật từ `ui/public/images/` (ảnh giới thiệu `mixhotel-gt-.webp`, toàn bộ ảnh bài viết `ui/public/images/articles/`) vào `wp-content/themes/mixhotel-theme/assets/images/`.
- [X] **T003** Tạo file `wp-content/themes/mixhotel-theme/assets/css/pages-luxury.css`:
  - Khai báo `@font-face` nạp font `Philosopher` (`Philosopher-Regular` 400, `Philosopher-Bold` 700).
  - Trích xuất toàn bộ CSS class đặc thù từ `ui/src/app/mixhotel-luxury.css` và styling từ `ui/`: `.titleBlock_1`, `.wrapSubcateBlock_1`, `.subcateBlock_1`, `.subcateName`, `.gold-rectangle`, `.mixBoutiqueHero`, `.block404`, cards `.bg-luxury-card`, buttons gradient.
- [X] **T004** Cập nhật `wp-content/themes/mixhotel-theme/functions.php`:
  - Enqueue `pages-luxury.css` thay thế cho file cũ.
  - Đảm bảo font Philosopher áp dụng toàn cục cho headings và các thành phần luxury.

---

## Phase 2: Theme — Trang Giới Thiệu (Port 1:1 từ `ui/src/app/gioi-thieu/page.tsx`)

- [X] **T005** Cập nhật pattern `wp-content/themes/mixhotel-theme/patterns/about-intro.php`:
  - Port chính xác: Breadcrumbs nền `#0f0b08`, kicker vàng `GIỚI THIỆU VỀ HỆ THỐNG`, tiêu đề H1 font Philosopher `VỀ KHÁCH SẠN TÌNH YÊU MIX BOUTIQUE`.
  - Quote lớn: *"ĐỪNG ĐỂ TÌNH YÊU CỦA BẠN CHỈ CÓ MỘT MÀU!"*.
  - Nội dung 4 đoạn văn triết lý thương hiệu.
  - Banner ảnh lớn bo góc tròn `rounded-3xl` (`assets/images/mixhotel-gt-.webp`), badge nổi `Boutique Mood`, title `"Không Gian Riêng Tư • Cảm Xúc Thăng Hoa"`.
- [X] **T006** Cập nhật pattern `wp-content/themes/mixhotel-theme/patterns/about-amenities.php`:
  - Port chính xác 6 Đặc quyền tiện nghi cao cấp: WiFi Nhanh, Bồn Tắm Đôi (Jacuzzi), Trang Phục Cosplay, Ghế Tình Yêu Tantra, Smart TV & Netflix, Đồ Uống & Cocktail.
  - Thẻ card nền `#15100c` viền `#c88922]/20`, icon box `#c88922]/15`, hover translate mượt mà.
- [X] **T007** Cập nhật pattern `wp-content/themes/mixhotel-theme/patterns/about-testimonials.php`:
  - Port chính xác 4 đánh giá thực tế từ khách hàng (Nguyễn Minh Anh, Trần Quốc Bảo, Lê Hoàng Yến, Hà My).
  - Thẻ card `#140e0a` viền `#c88922]/25`, rating 5 sao vàng kim SVG, trích dẫn in nghiêng, tên + chức danh khách hàng.
- [X] **T008** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/about-cta.php`:
  - Section CTA banner bo tròn `rounded-3xl` nền gradient `#20150d` $\rightarrow$ `#2d1b0f`, nút gradient vàng kim bo tròn `"ĐẶT PHÒNG NGAY"`.
- [X] **T009** Cập nhật template `wp-content/themes/mixhotel-theme/templates/page-gioi-thieu.html` nhúng tuần tự các pattern theo đúng bố cục Next.js.

---

## Phase 3: Theme — Trang Gallery (Port 1:1 từ `ui/src/app/gallery/page.tsx`)

- [X] **T010** Cập nhật pattern `wp-content/themes/mixhotel-theme/patterns/gallery-grid.php`:
  - Tiêu đề `.titleBlock_1` có đường line vàng dưới chân.
  - Mô tả: *"Khám phá bộ sưu tập 32+ phòng concept lãng mạn..."*.
  - Thanh Tab chi nhánh: `Tất Cả Các Cơ Sở`, `CS1: Mix Premium Huỳnh Thúc Kháng`, `CS2: 256B Đặng Tiến Đông`, `CS3: 20 Phúc La Hà Đông`.
  - Lưới ảnh tỷ lệ vàng `gold-rectangle` bo góc `rounded-xl`, hover zoom scale 105%, overlay gradient đen-vàng kim hiện tên phòng.
  - Phân trang chuẩn.
- [X] **T011** Cập nhật template `wp-content/themes/mixhotel-theme/templates/page-gallery.html`.

---

## Phase 4: Theme — Trang Chi Tiết Chi Nhánh (Port từ `BranchDetailTemplate.tsx`)

- [X] **T012** Cập nhật pattern `wp-content/themes/mixhotel-theme/patterns/branch-detail.php`:
  - Hero banner với kicker, tiêu đề chi nhánh font Philosopher cỡ lớn.
  - Dải 4 stats nổi: 11 Phòng concept, 24/7 Phục vụ, Bồn sục massage, 100% Riêng tư.
  - Form đặt phòng nhanh tích hợp sẵn trong trang chi nhánh.
  - Lưới danh sách các phòng thuộc chi nhánh (`hotel_room`).
  - Bản đồ Google Maps embed kèm thông tin địa chỉ, hotline.
  - 3 nút liên hệ nhanh: Gọi Hotline, Nhắn Zalo, Chỉ Đường.
- [X] **T013** Cập nhật template `wp-content/themes/mixhotel-theme/templates/single-hotel_branch.html`.

---

## Phase 5: Theme — Trang Tin Tức / Blog (Port từ `ui/src/app/tin-tuc/page.tsx`)

- [X] **T014** Cập nhật pattern `wp-content/themes/mixhotel-theme/patterns/blog-archive-content.php`:
  - Danh mục 8 tabs: Tất Cả, Review Khách Sạn, Địa Điểm Hẹn Hò, Địa Điểm Đi Chơi, Gợi Ý Quà Tặng, Kiến Thức Khách Sạn, Cẩm Nang Tình Yêu, Địa Chỉ Khách Sạn.
  - Lưới bài viết dạng thẻ card phong cách magazine hiện đại kèm ảnh thật từ `assets/images/articles/`, ngày đăng, category badge, tóm tắt, nút "Đọc tiếp →".
  - Sidebar: Chuyên mục tin tức, bài viết mới nhất, banner CTA đặt phòng.
- [X] **T015** Cập nhật pattern `wp-content/themes/mixhotel-theme/patterns/blog-single-content.php`:
  - Breadcrumb, tiêu đề bài viết font Philosopher, ngày đăng, ảnh featured lớn.
  - Khối Mục lục bài viết (Table of Contents) tự động.
  - Nội dung bài viết phong cách Dark Luxury Typography.
  - Khối nút Chia sẻ mạng xã hội (Facebook, Zalo, Copy Link) và Box CTA đặt phòng cuối bài.
  - Lưới bài viết liên quan (Related Articles).
- [X] **T016** Cập nhật templates `templates/home.html` và `templates/single.html`.

---

## Phase 6: Theme — Trang Liên Hệ & Form AJAX (Port từ `ui/src/app/lien-he/page.tsx`)

- [X] **T017** Cập nhật pattern `wp-content/themes/mixhotel-theme/patterns/contact-page-content.php`:
  - Layout 2 cột chuẩn tỉ lệ 7:5.
  - Cột trái: Card form bo góc `rounded-3xl` nền `#140e0a` viền `#c88922]/25`, input nền `#0c0806` viền `#c88922]/30`, nút gradient vàng kim bo tròn kèm icon `Send`.
  - Cột phải: Khối thông tin 3 cơ sở với icon `MapPin` vàng, hotline `038 310 4010`, email, giờ phục vụ 24/24h.
  - Hộp Chat Zalo riêng biệt với nút bấm `"Mở Zalo Ngay"`.
- [X] **T018** Cập nhật pattern `wp-content/themes/mixhotel-theme/patterns/contact-maps.php` lưới bản đồ 3 cơ sở phía dưới.
- [X] **T019** Cập nhật template `wp-content/themes/mixhotel-theme/templates/page-lien-he.html`.
- [X] **T020** Tích hợp hoàn thiện `assets/js/contact-form.js` đảm bảo tương thích 100% với form mới và endpoint AJAX `MixHotel_Contact_Handler`.

---

## Phase 7: Theme — 3 Trang Chính Sách (Port từ `ui/src/app/chinh-sach-*/page.tsx`)

- [X] **T021** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/policy-payment.php`:
  - Card bo tròn `rounded-3xl` nền `#140e0a` viền `#c88922]/25`.
  - Box 1: Thanh toán tiền mặt (kèm icon `Banknote`, danh sách 4 cơ sở).
  - Box 2: Thẻ ngân hàng & QR (kèm icon `CreditCard`).
  - Box 3: Cam kết bảo mật giao dịch (kèm icon `ShieldCheck`).
- [X] **T022** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/policy-privacy.php`:
  - 4 Box điều khoản bảo mật thông tin với icon minh họa và thông tin pháp lý đơn vị quản lý.
- [X] **T023** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/policy-booking.php`:
  - 4 Box quy định đặt phòng: Đặt theo giờ (giữ 15-20p), Đặt qua đêm (cọc 50%), Độ tuổi (18+), Khung giờ lưu trú, Đổi hủy phòng.
- [X] **T024** Cập nhật template `templates/page.html` để render các pattern chính sách theo slug tương ứng.

---

## Phase 8: Theme — Trang 404 (Port từ `mixhotel-luxury.css` `.block404`)

- [X] **T025** Cập nhật pattern `wp-content/themes/mixhotel-theme/patterns/page-404.php`:
  - Cấu trúc `.block404` chuẩn, số 404 nghệ thuật, thông báo thân thiện, 2 nút bấm điều hướng `.btnBlock` ("Về Trang Chủ" và "Xem Danh Sách Phòng").
- [X] **T026** Cập nhật template `templates/404.html`.

---

## Phase 9: Verification & Quality Assurance

- [X] **T027** Kiểm tra cú pháp PHP (`php -l`) toàn bộ patterns và files theme.
- [X] **T028** Cập nhật và chạy lại `test-spec5-automated.php` kiểm tra toàn diện:
  - Tất cả trang trả về HTTP 200 OK trên Apache/Docker.
  - Font Philosopher được nạp thành công.
  - Form liên hệ AJAX submit thành công và lưu log vào Demo Sandbox.
- [X] **T029** Kiểm tra responsive đa thiết bị (Mobile 375px/390px, Tablet 768px, Desktop 1200px+).
- [X] **T030** Cập nhật `walkthrough.md` và `docs/changelog.md` tổng kết quá trình tái cấu trúc hoàn hảo.
