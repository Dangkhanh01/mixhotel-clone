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
├── 06-fse-gutenberg-refactor/      # TUẦN 5+: Chuyển wp:html → Native Core Blocks, No-code Admin UI
├── 07-wysiwyg-no-code-full-refactor/ # TUẦN 6+: Chuyển toàn bộ khối phức hợp → Native Core Blocks, Auto Media Import
└── 08-automated-booking/           # TUẦN 7+: Auto-Confirm đặt phòng, Availability Check, WP-Cron TTL, BUG-17 Fix
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

---

### TUẦN 6+: TOÀN DIỆN NO-CODE WYSIWYG FIGMA-STYLE (Ngày 38+)
* **Gói tính năng:** `specs/07-wysiwyg-no-code-full-refactor/`
* **Bối cảnh:**
  * Feature 06 đã chuyển đổi thành công 23+ Block Patterns tĩnh sang Core Blocks, nhưng nhiều thành phần phức hợp (Banner hình ảnh, Lưới ảnh phòng, Card phòng concept, Card chi nhánh, FAQ accordion, các nút CTA) vẫn đang bị đóng gói trong `<!-- wp:html -->`.
  * Feature 07 hoàn tất việc chuyển đổi 100% toàn bộ hệ thống, đưa trải nghiệm quản trị lên mức **Figma-style no-code 100%**.
* **Mục tiêu:**
  * Tự động nạp toàn bộ kho ảnh gốc vào WordPress Media Library (Auto Media Importer).
  * Chuyển đổi Banner → `wp:cover`, Card & Grid → `wp:group` + `wp:image` + `wp:buttons`, FAQ → `wp:details`.
  * Thiết lập Block Locking bảo vệ khung bố cục, mở khóa 100% nội dung click-to-edit.
  * Thêm event delegation `#booking` cho nút `wp:button` kích hoạt popup đặt phòng.
  * Cập nhật Seeder `mixhotel_restore_all_pages_content()` với cấu trúc blocks mới.
* **Chiến lược:** 6 Phases tuần tự:
  * **Phase 1:** Auto Media Importer — Nạp kho ảnh vào Media Library.
  * **Phase 2:** Chuyển đổi Banner & Ảnh Nền → `wp:cover`.
  * **Phase 3:** Chuyển đổi Lưới Ảnh & Card → `wp:image` + `wp:group` + `wp:buttons`.
  * **Phase 4:** Chuyển đổi FAQ → Native `core/details`.
  * **Phase 5:** Xử lý `#booking` Event Delegation & Đồng bộ Seeder toàn trang.
  * **Phase 6:** Kiểm thử toàn diện E2E (Gutenberg Editor + Frontend + Debug log).
* **Gate 6:** Admin nhấp vào bất kỳ ảnh/text/nút bấm nào trên toàn bộ hệ thống trang đều có thể sửa trực quan 100% — Nút "Thay thế" xuất hiện trên mọi ảnh, 0 lỗi invalid block, popup đặt phòng hoạt động bình thường.

---

### TUẦN 7+: AUTOMATED BOOKING ENGINE — AUTO-CONFIRM & AVAILABILITY CHECK (Ngày 45+)
* **Gói tính năng:** `specs/08-automated-booking/`
* **Bug Fix đi kèm:** BUG-17 — Nonce đóng băng trong seeded content (form đặt phòng không gửi được). Xem `docs/booking-form-bug-report.md`.
* **Bối cảnh:**
  * Feature 04 xây dựng Booking Lead Engine ở chế độ "duyệt thủ công": khách gửi form → lưu `pending` → lễ tân gọi xác nhận.
  * Feature 08 nâng cấp thành **Auto-Confirm tức thì** có kiểm tra phòng trống (Availability Check) theo time-range, tự động huỷ đơn hết hạn qua WP-Cron, và mở rộng vòng đời trạng thái đơn.
* **Mục tiêu:**
  * Sửa BUG-17 cho form hoạt động lại (nonce inject từ JS thay vì bake trong HTML).
  * Kiểm tra phòng trống theo khung giờ cụ thể (overlap detection): cùng phòng + cùng ngày + trùng time-range → từ chối.
  * Tính check-out time tự động theo nhu cầu: 2h, qua đêm (22h–12h), cả ngày (14h–12h).
  * WP-Cron job chạy mỗi 5 phút quét đơn `confirmed` quá 30 phút chưa check-in → tự chuyển `expired` và nhả slot.
  * Mở rộng Admin: nút Check-in, Hoàn thành, Khách không đến, Huỷ đơn + filter theo trạng thái.
  * Settings mới: Toggle Auto-Confirm, Thời gian giữ phòng (phút).
* **Chiến lược:** 6 Phases tuần tự:
  * **Phase 0 (Critical):** Sửa BUG-17 Nonce đóng băng.
  * **Phase 1:** Availability Check + Auto-Confirm logic.
  * **Phase 2:** WP-Cron TTL + Status Lifecycle.
  * **Phase 3:** Admin — Mở rộng quản lý đơn.
  * **Phase 4:** Frontend — Cập nhật form & UI.
  * **Phase 5:** Verification & Documentation.
* **Gate 7:** Form đặt phòng gửi thành công, auto-confirm hoạt động, đặt phòng trùng slot bị từ chối, đơn hết hạn tự huỷ qua cron, lễ tân check-in/check-out trên WP Admin.

