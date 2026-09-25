# CHANGELOG: NHẬT KÝ PHÁT TRIỂN DỰ ÁN MIX HOTEL CLONE

Tất cả các thay đổi kiến trúc, tính năng và sửa lỗi của dự án đều được ghi chép tại đây theo chuẩn [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

### Added & Fixed - 2026-09-25 (Fix Room Detail Hero UI Layout Conflict)
- **Sửa triệt để lỗi vỡ giao diện Hero Section trên toàn bộ trang chi tiết phòng (`/khach-san-tinh-yeu/<slug>/`):**
  - **Nguyên nhân:** File `pages-luxury.css` chứa 292 quy tắc kế thừa cũ `.mixDetailHero` (đặc biệt là `.mixDetailHero .mixDetailHeroWrap { display: grid; grid-template-columns: minmax(0, 1.25fr) 430px; }`) với CSS specificity cao hơn, khiến Breadcrumb bị đẩy sang cột trái còn toàn bộ nội dung phòng và ảnh chính bị co rúm vào cột phải 430px (ảnh chính chỉ còn 145px × 109px).
  - **Giải pháp:**
    - Đổi tên toàn bộ selector cũ trong `pages-luxury.css` sang `.mixDetailHeroScraped` để triệt tiêu hoàn toàn rò rỉ xung đột.
    - Cập nhật `room-detail.css`: thiết lập `.mixDetailHeroWrap` với `display: block !important; width: 100%; max-width: 1200px;`, chuyển `.mixDetailTitle` sang font thương hiệu `Philosopher`, căn chỉnh tỷ lệ 4:3 cho ảnh chính lớn (467px × 350px) kèm viền vàng kim và bóng đổ sang trọng.
    - Cập nhật `functions.php`: bổ sung `'mixhotel-pages-luxury'` vào mảng dependencies của `mixhotel-room-detail` và dùng `filemtime` dynamic version để luôn tải sau và tự động làm mới cache trình duyệt.
  - **Xác thực:** Kiểm tra tự động bằng Headless Chrome CDP trên cả Desktop (1920x1080) và Mobile (390x844) cho các phòng mẫu (`Karma`, `Bad girl`, `Inferno`, `Get High`), layout 2 cột 7:5 trên Desktop hiển thị chuẩn xác 100% theo prototype.

### Added & Fixed - 2026-09-24 (Seed-First Real Data Migration)
- **Chuyển đổi toàn diện dữ liệu phòng tĩnh sang CPT Database (Lựa chọn A: "Seed-First"):**
  - **Mở rộng Seeder (`seed-rooms-branches.php`):**
    - Nhập toàn bộ 32 phòng thực tế vào WordPress CPT `hotel_room` với đầy đủ meta (mã phòng, chi nhánh, giá 4 mức 2h/thêm giờ/qua đêm/ngày đêm, video YouTube, cờ nổi bật).
    - Nâng cấp bộ nhập media `mix_import_attachment` hỗ trợ tự động tìm kiếm và tải ảnh đại diện từ `assets/images/`, `assets/storage/`, và `assets/uploads/` vào WordPress Media Library.
    - Gán tự động bộ tiện nghi `room_amenity` (Jacuzzi, ghế tình yêu, cosplay, trần sao, máy chiếu, BDSM, Smart TV) theo concept của từng phòng.
    - Thiết lập shared gallery gồm 5 hình ảnh trải nghiệm cao cấp cho từng phòng.
  - **Tái cấu trúc Pattern Danh mục Phòng (`patterns/room-archive-content.php`):**
    - Loại bỏ hoàn toàn sự phụ thuộc vào file mảng tĩnh `inc-branches-data.php`.
    - Truy vấn động toàn bộ chi nhánh và phòng qua `WP_Query` và meta `_mixhotel_room_branch_id`.
    - Tạo danh sách lựa chọn phòng và chi nhánh trong Form tư vấn nhanh tự động từ cơ sở dữ liệu.
    - Cập nhật liên kết phòng dùng trực tiếp permalink chuẩn của WordPress (`get_permalink()`).
  - **Xóa bỏ mã nguồn thừa:**
    - Xóa file mock `inc-branches-data.php` (51KB), chuyển hệ thống sang hoạt động 100% dựa trên database.
  - **Kiểm thử tự động 100%:**
    - Kiểm tra tự động 32/32 phòng qua HTTP cURL (`verify-all-rooms.php`): 32/32 đường dẫn trả về mã HTTP 200 OK (0 lỗi 404).
    - Kiểm tra `wp-content/debug.log`: 0 lỗi PHP syntax, 0 Warning, 0 Notice.

### Fixed & Polished - 2026-09-23
- **Khắc phục triệt để lỗi 404 trên trang Khách Sạn Tình Yêu & 3 trang chi nhánh con:**
  - Seed đầy đủ 4 WordPress pages trong cơ sở dữ liệu: `khach-san-tinh-yeu` (ID: 49), `mix-boutique-premium-hotel` (ID: 50), `mix-boutique-hotel-256b-dang-tien-dong` (ID: 51), `mix-boutique-hotel-20-phuc-la-ha-dong` (ID: 52).
  - Bổ sung WordPress Rewrite Rule trong `functions.php`: ánh xạ đường dẫn dạng cấp con `/khach-san-tinh-yeu/(mix-boutique-[^/]+)/` trực tiếp sang query page tương ứng.
  - Cập nhật bộ định tuyến template `patterns/page-content.php` tự động nạp `mixhotel/branch-detail` cho 3 chi nhánh và `mixhotel-theme/room-archive-content` cho trang Khách Sạn Tình Yêu.
  - Tích hợp 100% nội dung Dark Luxury 12 sections của trang landing page `/khach-san-tinh-yeu/` (Hero, 3 showcase chi nhánh với đầy đủ phòng & giá, quy trình 4 bước đặt phòng, form tư vấn chọn chi nhánh/loại phòng, FAQ, CTA và bài viết SEO chuyên sâu kèm Table of Contents).
- **Tái cấu trúc 1:1 giao diện Trang Gallery (`/gallery/`) theo chuẩn Next.js prototype:**
  - Đồng bộ toàn bộ 32 hình ảnh concept phòng từ `ui/public/` vào thư mục assets của theme WordPress (`assets/images/`, `assets/tassets/`, `assets/external/`, `assets/storage/`, `assets/uploads/`).
  - Nâng cấp CSS chuyên sâu trong `assets/css/pages-luxury.css`:
    - Thanh tab chi nhánh viền vàng kim bo tròn `.subcateBlock_1 .subcateName` với gradient active `#c88922` $\rightarrow$ `#a46d14`.
    - Lưới ảnh `.galleryMixGrid` tỷ lệ 4:3 (`gold-rectangle`) có viền vàng kim, hover phóng to mượt mà (`transform: scale(1.08)`).
    - Bộ lọc JavaScript client-side hiển thị nhanh chóng theo chi nhánh, flex column chuẩn xác, phân trang và bài viết chuẩn SEO phía cuối trang.
- **Kiểm thử tự động nâng cao (`test-spec5-automated.php`):**
  - Mở rộng suite kiểm thử từ 129 lên **141 tests**, kiểm tra tự động mã HTTP 200 và từ khóa nhận diện của toàn bộ 7 biến thể URL chi nhánh và khách sạn tình yêu. Đạt kết quả: **141/141 PASSED, 0 FAILED, 0 WARNINGS**.

### Added - 2026-09-23
- **Nâng cấp toàn diện 1:1 Dark Luxury UI & Hoàn thành Feature 05: Auxiliary Pages & Polish (`specs/05-auxiliary-pages-and-polish/`):**
  - **Typography & Font Philosopher:**
    - Tích hợp trọn bộ font chữ thương hiệu `Philosopher-Regular.ttf` và `Philosopher-Bold.ttf` vào `assets/fonts/`.
    - Đăng ký font family `Philosopher` vào `theme.json` cho toàn bộ headings `h1`–`h4` và khai báo `@font-face` chuẩn.
  - **Hệ thống CSS Dark Luxury (`assets/css/pages-luxury.css` - 664KB):**
    - Porting toàn bộ quy tắc giao diện cao cấp từ Next.js `@ui/src/app/mixhotel-luxury.css` kết hợp biến màu Design Tokens `--wp--preset--color--*`.
    - Enqueue tự động qua `functions.php` (`mixhotel-pages-luxury`).
  - **Trang Giới Thiệu (`page-gioi-thieu`):**
    - `about-intro.php`: Câu chuyện thương hiệu, trích dẫn triết lý, 4 đoạn văn tinh tế, badge "Boutique Mood", banner `mixhotel-gt-.webp`.
    - `about-amenities.php`: Grid 6 tiện nghi chuẩn (WiFi, Bồn tắm Jacuzzi, Cosplay, Ghế Tantra, Smart TV 4K, Cocktail) với SVG icons dát vàng.
    - `about-testimonials.php`: 4 phản hồi khách hàng thực tế với avatar gradient và 5 sao vàng SVG.
    - `about-cta.php`: Khung kêu gọi hành động bo góc gradient viền vàng kim.
  - **Trang Gallery (`page-gallery`):**
    - `gallery-grid.php`: 32 phòng concept từ prototype Next.js (kết hợp query động CPT `hotel_room`), 4 tab phân loại chi nhánh, hiệu ứng phóng to `.gold-rectangle`, bộ lọc client-side mượt mà, phân trang và khung nội dung SEO.
  - **Trang Chi Nhánh (`single-hotel_branch`):**
    - `branch-detail.php`: Banner `mixBoutiqueHero`, 4 stats boxes, danh sách phòng bố cục so le, bảng giá 3 nấc, form đặt phòng nhanh AJAX tích hợp và bản đồ Google Maps kèm 3 nút hành động.
  - **Trang Tin Tức (`home`, `page-tin-tuc`, `single`):**
    - `blog-archive-content.php`: 8 tab danh mục, 10+ bài viết tạp chí Next.js + query WP động, Dark Luxury cards, phân trang và bộ lọc client-side.
    - `blog-single-content.php`: Category badge, sapo callout, mục lục tự động (TOC), nút chia sẻ mạng xã hội, khung booking CTA và lưới 3 bài viết liên quan.
  - **Trang Liên Hệ (`page-lien-he`):**
    - `contact-page-content.php`: Layout 2 cột tỉ lệ 7:5 chuẩn Dark Luxury, input tối viền vàng kim, chống spam honeypot + Nonce CSRF, cột phải 3 địa chỉ chi nhánh và hộp chat Zalo riêng biệt.
    - `contact-maps.php`: Lưới bản đồ 3 chi nhánh với liên kết chỉ đường Google Maps.
    - `assets/js/contact-form.js`: Đồng bộ tương thích hoàn toàn với endpoint AJAX `MixHotel_Contact_Handler` và hiển thị thông báo alert trạng thái.
  - **3 Trang Chính Sách (`policy-payment`, `policy-privacy`, `policy-booking`):**
    - `policy-payment.php`: Tiền mặt tại 4 cơ sở, chuyển khoản POS/VietQR, cam kết bảo mật.
    - `policy-privacy.php`: 4 box điều khoản bảo mật thông tin và thông tin pháp nhân quản lý.
    - `policy-booking.php`: Quy định đặt theo giờ (giữ 15-20p), đặt qua đêm (cọc 50%), độ tuổi 18+, đổi/hủy và bất khả kháng.
    - `page-content.php`: Tự động điều hướng các slug chính sách và tin tức sang block pattern tương ứng.
  - **Trang 404 (`page-404`, `404.html`):**
    - `page-404.php`: Cấu trúc `.block404`, số 404 gradient vàng kim nghệ thuật, thông báo thân thiện và 2 nút điều hướng `.btnBlock`.
  - **Kiểm Thử & Đảm Bảo Chất Lượng Toàn Diện (QA):**
    - Lint cú pháp PHP: 100% không có lỗi trên 36 theme files và 10 plugin files.
    - Test Suite tự động (`test-spec5-automated.php`): Đạt tuyệt đối **129/129 tests passed** (HTTP 200/404, templates BUG-07, pattern rendering, assets & fonts, contact AJAX security & rate limiting).
    - Browser Subagent Audit: Kiểm tra trực quan trên trình duyệt thực tế cả Mobile (390x844) và Desktop (1280x800), ghi lại video WebP chứng thực layout Dark Luxury.

### Added - 2026-09-21
- **Kiến trúc & Quản lý Phụ thuộc (Approved 3rd-party Plugins & Git Hardening):**
  - `docs/system-architecture.md`: Bổ sung danh sách 4 plugin bên thứ 3 được phê duyệt theo chuẩn SOP Agency (Spectra, Rank Math SEO, Converter for Media, UpdraftPlus).
  - `.gitignore`: Đồng bộ quy tắc loại trừ dependencies bên thứ 3, thư mục sao lưu UpdraftPlus (`wp-content/updraft/`), cache WebP (`wp-content/uploads-webpc/`) và file cấu hình runtime nhằm đảm bảo an toàn dữ liệu, chống leak secrets và tinh gọn repository tuân thủ `REAL_WORLD_AGENCY_WORKFLOW.md` mục 13.1.

### Added - 2026-09-17
- **Hoàn thành Feature 04: Booking Engine and Leads (`specs/04-booking-engine-and-leads/`):**
  - **Plugin — AJAX Handler & Lead Engine:**
    - `includes/class-booking-handler.php`: Xử lý AJAX endpoint `mixhotel_submit_booking` (cả nopriv và priv). Kiểm tra Nonce linh hoạt (`mixhotel_booking_nonce` / `mixhotel_booking_security`), Honeypot 2 lớp (`mixhotel_hp_email`, `website_url`), Rate-limiting theo IP (transient 5 requests / 10 phút). Chuẩn hóa SĐT VN (10 chữ số). Sinh mã đơn tự động dạng `#LEAD-YYYYMMDD-XXX`. Lưu đầy đủ meta vào CPT `booking_lead`. Tích hợp thông báo Telegram Bot thời gian thực kèm chế độ **Demo Sandbox Alert Simulator**. Tuân thủ tuyệt đối BUG-03 (luôn trả về `wp_send_json_success` / `wp_send_json_error`).
  - **Plugin — Admin Settings & Lead Management:**
    - `includes/class-settings.php`: Cung cấp trang cấu hình quản trị "Mix Hotel" trong WP Admin: Bật/Tắt chế độ Demo Sandbox (mặc định Bật), cấu hình Telegram Bot Token & Chat ID, Hotline mặc định, kèm trang "Nhật Ký Demo Sandbox" hiển thị 25 thông báo mô phỏng gần nhất và nút xóa sạch nhật ký.
    - `includes/class-admin-leads.php`: Tùy biến bảng quản lý danh sách `booking_lead` trong WP Admin: Custom columns (Mã đơn, Khách hàng kèm link `tel:` và Zalo, Chi nhánh & Phòng, Nhu cầu & Lịch hẹn, Trạng thái badge, Sandbox badge). Meta box chi tiết đơn trong màn hình edit với nút bấm gọi ngay, link Zalo, selector trạng thái và ghi chú tiếp nhận nội bộ của lễ tân.
    - Cập nhật `mixhotel-core.php`: Require và khởi tạo 3 module mới.
  - **Theme — Frontend JavaScript & FSE Template Parts:**
    - `assets/js/booking-engine.js`: Vanilla JS thuần (8.8KB, tuân thủ NFR-002 <= 10KB), bắt submit form tại Hero (`#hero-booking-form`) và Chi tiết phòng (`#mixhotel-booking-form`). Client validation SĐT và họ tên, hiển thị trạng thái loading spinner, gửi AJAX request tới `MixHotelData.ajaxUrl`. Xử lý mở Modal xác nhận và tự động reset form.
    - `parts/booking-modal.html`: Template part FSE popup xác nhận giữ phòng thành công: Mã giữ phòng `#LEAD-...`, chi nhánh tiếp nhận, đồng hồ giữ phòng 15 phút, banner Demo Sandbox minh bạch, các nút CTA hành động nhanh (Nhắn Zalo xác nhận, Gọi hotline chi nhánh, Đóng cửa sổ).
    - Cập nhật templates: Nhúng `booking-modal` vào `front-page.html`, `single-hotel_room.html`, và `archive-hotel_room.html`.
    - Cập nhật `functions.php`: Enqueue `booking-engine.js`, mở rộng `MixHotelData` với `isDemo` và localized data.
  - **Theme — Styling Dark Luxury:**
    - `assets/css/modal.css`: Thiết kế hoàn chỉnh cho `.mix-booking-modal`, icon check vàng gold, mã giữ phòng monospace, badge đếm ngược 15 phút kèm pulse dot xanh lá, banner Demo Sandbox, spinner animation `.mix-spinner`, và alert thông báo lỗi `.mix-form-error-alert`.

- **Hoàn thành Feature 03: Room Catalog and Detail (`specs/03-room-catalog-and-detail/`):**
  - **Plugin — Meta Boxes & Helpers:**
    - `includes/class-meta-boxes.php`: Meta boxes cho CPT `hotel_room` (Mã phòng, Chi nhánh selector, Bảng giá 4 mức, Gallery IDs với WP Media picker, YouTube Video ID, Featured flag) và `hotel_branch` (Địa chỉ, Hotline, Zalo, Messenger, SMS, Maps embed URL). Nonce verification + sanitize/escape đầy đủ.
    - `includes/class-helpers.php`: Helper class + global wrapper functions: `mixhotel_format_price()` (VNĐ format), `mixhotel_get_branch_data()`, `mixhotel_get_room_price()`, `mixhotel_get_room_gallery()`. Xử lý edge cases: giá rỗng → "Liên hệ", phòng chưa gán chi nhánh → "Liên hệ tổng đài".
    - Cập nhật `mixhotel-core.php`: Require + init 2 module mới.
  - **Theme — CSS Modules (Conditional Enqueue):**
    - `assets/css/room-detail.css`: 6 sections (Hero blurred bg, Gallery grid, Video embed, Concept perks, Pricing 4-tier cards, Booking form). Responsive mobile. Tuân thủ design tokens.
    - `assets/css/room-archive.css`: Filter bar, room card grid, empty state, archive hero. Horizontal scroll filter trên mobile.
    - `functions.php`: Conditional enqueue chỉ load CSS/JS trên trang `hotel_room` tương ứng.
  - **Theme — FSE Patterns & Templates:**
    - `patterns/room-detail-content.php`: Pattern PHP render 6 sections chi tiết phòng. Dùng MixHotel_Helpers + WP_Query + post meta. Honeypot field chống spam.
    - `patterns/room-archive-content.php`: Pattern PHP render filter bar (từ taxonomy `room_amenity`) + card grid. Featured rooms ưu tiên. Empty state khi chưa có phòng.
    - `templates/single-hotel_room.html`: FSE template chi tiết phòng.
    - `templates/archive-hotel_room.html`: FSE template danh mục phòng.
  - **Theme — Vanilla JS:**
    - `assets/js/room-gallery.js`: Click thumbnail → swap main image với fade transition + active state.
    - `assets/js/room-filter.js`: Click amenity tag → filter cards bằng `data-amenities` attribute, "Tất cả" reset.


- **Hoàn thành Feature 02: Homepage and Booking Modal (`specs/02-homepage-and-booking-modal/`):**
  - Đồng bộ đầy đủ 36 media assets từ `ui/public/images/` sang `wp-content/themes/mixhotel-theme/assets/images/`.
  - Khởi tạo `functions.php`: Enqueue 6 CSS modules và 4 JS files, đăng ký Block Pattern category `mixhotel` và template parts FSE.
  - Xây dựng 6 CSS modules chuyên biệt: `header.css`, `mobile-bar.css`, `desktop-contact-bar.css`, `modal.css`, `hero.css`, `sections.css` (tổng dung lượng CSS 54KB unminified, tuân thủ NFR-001 <= 80KB).
  - Triển khai 4 file Vanilla JS độc lập: `contact-modal.js`, `header-scroll.js`, `faq-accordion.js`, `youtube-lite.js` (tổng 12.9KB, tuân thủ NFR-002 <= 15KB).
  - Hoàn thiện 5 Template Parts FSE: `header.html`, `footer.html`, `mobile-action-bar.html`, `desktop-contact-bar.html`, `contact-modal.html`.
  - Triển khai 11 Block Patterns trang chủ trong `patterns/`: `hero-booking.php`, `real-photos-grid.php`, `video-showcase.php`, `concept-rooms.php`, `branches-list.php`, `why-choose-us.php`, `pricing-table.php`, `events-decoration.php`, `booking-steps.php`, `faq-accordion.php`, `final-cta.php`.
  - Lắp ráp hoàn chỉnh `templates/front-page.html` tuân thủ 100% thứ tự trong `patterns-manifest.contract.json`.
  - Kiểm thử toàn diện: Lint 100% PHP và JS không lỗi, kiểm tra HTTP 200 trên Docker local, WP_DEBUG_LOG hoàn toàn sạch (0 Warning, 0 Notice, 0 Fatal), kiểm thử tương tác và responsive qua browser subagent đạt chuẩn.

### Added - 2026-09-14
- **Hoàn thành Feature 01: Foundation and Theme Setup (`specs/01-foundation-and-theme/`):**
  - Khởi tạo Full Site Editing Block Theme `wp-content/themes/mixhotel-theme/`:
    - `style.css`: Khai báo metadata theme, CSS reset và keyframe animations (`bigshake_1`, `bigshake_2`, `latdat_2`, `pageUpAni`, `pulseAura`).
    - `theme.json`: Cấu hình Design Tokens chuẩn version 3, palette màu Dark Luxury (`#0f0f12`, `#17171c`, `#c5a880`, `#c92a2a`), font Questrial & Roboto, spacing scale.
    - `templates/index.html` & `templates/front-page.html`: Template FSE cơ sở.
    - `parts/header.html` & `parts/footer.html`: Template parts tái sử dụng.
  - Khởi tạo Custom Plugin nghiệp vụ `wp-content/plugins/mixhotel-core/`:
    - `mixhotel-core.php`: Bootstrap loader và activation/deactivation hooks flush rewrite rules an toàn.
    - `includes/class-taxonomies.php`: Đăng ký taxonomy `room_amenity` (Tiện nghi phòng) và `room_concept` (Concept phòng).
    - `includes/class-cpt-room.php`: Đăng ký Custom Post Types `hotel_room` (rewrite slug `khach-san-tinh-yeu`), `hotel_branch` (rewrite slug `chi-nhanh`), và `booking_lead` (Đơn giữ phòng nội bộ).
- **Thiết lập Bộ tài liệu 3 tầng theo chuẩn Disciplined Vibe Coding (SDD):**
  - Tầng 3: `AGENTS.md` và `.agents/skills/wordpress-bug-prevention/SKILL.md`.
  - Tầng 1: `docs/system-architecture.md`, `docs/database-schema.md`, `docs/design-tokens-spec.md`, `docs/roadmap.md`.
  - Tầng 2: `specs/01-foundation-and-theme/` (spec, plan, contracts, tasks).
