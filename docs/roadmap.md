# ROADMAP: 4 TUẦN INCREMENTAL DELIVERY

> **Dự án:** Mix Boutique Hotel (`mixhotel.vn`)  
> **Phương pháp:** Disciplined Vibe Coding (Spec-Driven Development)  
> **Nguyên tắc:** Mỗi tuần là một hoặc hai Feature Packages (`specs/<feature>/`) khép kín, có thể kiểm chứng độc lập.

---

## TỔNG QUAN CÁC FEATURE PACKAGES (`specs/`)

```
specs/
├── 01-foundation-and-theme/          # TUẦN 1: Khung Theme FSE, theme.json, Reset CSS, Plugin Core setup
├── 02-homepage-and-booking-modal/   # TUẦN 2: Trang chủ, Hero Booking Form, Real Photos, Modal Contact
├── 03-room-catalog-and-detail/      # TUẦN 3: CPT Room/Branch, Single Room Template, Archive & Filter tiện nghi
├── 04-booking-engine-and-leads/     # TUẦN 3-4: AJAX Lead Processing, Nonce check, Telegram Bot Alert
├── 05-auxiliary-pages-and-polish/   # TUẦN 4: Gallery, Chi nhánh, Blog/Cẩm nang, SEO Schema, PageSpeed
└── 06-fse-gutenberg-refactor/      # TUẦN 5+: Chuyển wp:html → Native Core Blocks, No-code Admin UI
```

---

## CHI TIẾT LỘ TRÌNH 4 TUẦN

### TUẦN 1: FOUNDATION & DESIGN SYSTEM (Ngày 1 - Ngày 7)
* **Gói tính năng:** `specs/01-foundation-and-theme/`
* **Mục tiêu:**
  * Thiết lập môi trường Docker chạy ổn định.
  * Hoàn thiện bộ `theme.json` chứa 100% Design Tokens (Palette màu, Font Questrial/Roboto, Spacing scale).
  * Khởi tạo Plugin `mixhotel-core` đăng ký CPT và Taxonomies nền tảng.
* **Gate 1:** Kiểm tra cú pháp PHP và schema `theme.json` không có lỗi cảnh báo trên Docker local.

---

### TUẦN 2: VERTICAL SLICE 1 — TRANG CHỦ & HỆ THỐNG GIAO DIỆN (Ngày 8 - Ngày 14)
* **Gói tính năng:** `specs/02-homepage-and-booking-modal/`
* **Mục tiêu:**
  * Header Desktop đa cấp + Sticky Action Bar cố định dưới đáy mobile (Home, Messenger, Call, Zalo, SMS).
  * Modal chọn chi nhánh liên hệ nhanh (`#popupContact_1`).
  * Hero Section kèm Form "Giữ phòng nhanh nhất" (Họ tên, SĐT, Chi nhánh, Nhu cầu).
  * Grid "Ảnh thật phòng thật" và "Video phòng thật" (YouTube Lite).
  * Bảng giá & Hệ thống chi nhánh mẫu.
* **Gate 2:** Duyệt POC trang chủ (Visual comparison chuẩn dark-luxury và responsive hoàn hảo trên mobile).

---

### TUẦN 3: VERTICAL SLICE 2 & 3 — CHI TIẾT PHÒNG & CỖ MÁY ĐẶT PHÒNG (Ngày 15 - Ngày 21)
* **Gói tính năng:** `specs/03-room-catalog-and-detail/` & `specs/04-booking-engine-and-leads/`
* **Mục tiêu:**
  * Template chi tiết phòng (`single-hotel_room.html`): Bảng giá 2h đầu/qua đêm, Album ảnh, Tags tiện ích.
  * Template danh mục phòng (`archive-hotel_room.html`): Bộ lọc phòng theo Chi nhánh & Tiện ích (Bồn tắm, BDSM...).
  * AJAX Booking Handler: Lưu dữ liệu khách vào CPT `booking_lead`, chống bot spam, bảo mật Nonce.
  * Bắn thông báo đặt phòng tức thì về Telegram lễ tân.
* **Gate 3:** Test đặt phòng thành công trên mobile và dữ liệu xuất hiện ngay trong WP Admin.

---

### TUẦN 4: TRANG BỔ TRỢ, TỐI ƯU HIỆU NĂNG & BÀN GIAO (Ngày 22 - Ngày 30)
* **Gói tính năng:** `specs/05-auxiliary-pages-and-polish/`
* **Mục tiêu:**
  * Trang Thư viện ảnh (`/gallery/`), Trang Chi nhánh + Bản đồ Google Maps, Trang Cẩm nang/Tin tức.
  * Tối ưu hình ảnh WebP, lazyload video, nén CSS/JS, Core Web Vitals Mobile $\ge$ 85, Desktop $\ge$ 95.
  * Thiết lập phân quyền tài khoản quản trị (Lễ tân chỉ xem đơn, không xoá code).
  * Sao lưu toàn bộ Database & Source code, bàn giao tài liệu quản trị.
* **Gate 4:** Hoàn tất nghiệm thu cuối cùng (Final Release Gate).

---

### TUẦN 5+: FSE GUTENBERG REFACTOR — NO-CODE ADMIN UI (Ngày 31+)
* **Gói tính năng:** `specs/06-fse-gutenberg-refactor/`
* **Bối cảnh:**
  * Toàn bộ Block Patterns và Template Parts đã xây dựng ở Tuần 1-4 sử dụng `<!-- wp:html -->` (Custom HTML Block) để tái tạo 1:1 giao diện từ website tham khảo. Kỹ thuật này đảm bảo pixel-perfect nhưng tước đoạt hoàn toàn khả năng kéo thả và quản trị No-code của Admin.
  * Feature 06 chuyển đổi codebase về đúng chuẩn FSE thực chất theo `REAL_WORLD_AGENCY_WORKFLOW.md` (Mục 7.4 No-code Replaceability, Mục 9.4 Gutenberg-first).
* **Mục tiêu:**
  * Chuyển đổi 23+ Block Patterns từ `<!-- wp:html -->` sang Native Gutenberg Core Blocks (`wp:group`, `wp:heading`, `wp:paragraph`, `wp:columns`, `wp:image`, `wp:cover`, `wp:site-logo`).
  * Mở khóa: Admin click-to-edit text, thay ảnh bằng nút "Replace" 3 giây, đổi màu/font qua Inspector Controls.
  * Giữ nguyên 100% giao diện frontend (CSS Preservation Strategy).
  * Áp dụng `templateLock` bảo vệ cấu trúc layout khỏi sửa nhầm.
* **Chiến lược:** Progressive Migration qua 4 Waves:
  * **Wave 1 (POC):** `why-choose-us.php`, `booking-steps.php` — kiểm chứng kỹ thuật.
  * **Wave 2 (Static Content):** `pricing-table.php`, `page-404.php`, `about-*.php`, `contact-info.php`, `policy-*.php`.
  * **Wave 3 (Images & Cover):** `final-cta.php`, `events-decoration.php`, `about-gallery.php`, Header/Footer logo → `wp:site-logo`.
  * **Wave 4 (Complex Hybrid):** `hero-booking.php`, `video-showcase.php`, `faq-accordion.php` (partial refactor).
* **Gate 5:** Admin Usability Test đạt chuẩn — Editor role tự sửa text, thay ảnh, đổi giá phòng thành công trong Site Editor mà không vỡ layout.

