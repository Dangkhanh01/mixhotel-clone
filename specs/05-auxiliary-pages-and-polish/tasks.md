# TASKS: 05 - AUXILIARY PAGES & POLISH

**Input:** `specs/05-auxiliary-pages-and-polish/spec.md` & `specs/05-auxiliary-pages-and-polish/plan.md`  
**Tuân thủ:** `playbook_disciplined_vibe_coding.md` & `AGENTS.md`

---

## Phase 1: Plugin — Contact Form AJAX Handler

- [ ] **T001** Tạo file `wp-content/plugins/mixhotel-core/includes/class-contact-handler.php` — Đăng ký `wp_ajax_nopriv_mixhotel_submit_contact` và `wp_ajax_mixhotel_submit_contact`. Xử lý Nonce verification (`mixhotel_contact_nonce`), Honeypot check (`mixhotel_hp_email`, `website_url`), Rate limiting (3 reqs / 10 phút per IP via Transients), Sanitize + Validate (is_email, SĐT regex VN), Demo Sandbox mode (lưu log vào `mixhotel_demo_contact_log` + `WP_DEBUG_LOG`) hoặc `wp_mail()` khi tắt demo. Trả về `wp_send_json_success()` / `wp_send_json_error()`.
- [ ] **T002** Cập nhật `wp-content/plugins/mixhotel-core/mixhotel-core.php` — Require `class-contact-handler.php` và init hooks.

---

## Phase 2: Theme — Trang Giới Thiệu

- [ ] **T003** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/about-intro.php` — Section Hero giới thiệu: Tiêu đề "GIỚI THIỆU VỀ KHÁCH SẠN TÌNH YÊU", slogan italic, nội dung mô tả, ảnh giới thiệu lớn (Core Image Block). Tất cả No-code replaceable.
- [ ] **T004** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/about-amenities.php` — Grid 6 icon tiện nghi: Columns Block 6 cột (collapse 3 cột mobile). Mỗi cột: Image Block (icon) + Heading bold uppercase. Tiện nghi: WiFi, Bồn tắm, Cosplay, An toàn, Đồ chơi, Dịch vụ.
- [ ] **T005** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/about-video.php` — YouTube embed responsive dùng Core Embed Block hoặc custom iframe wrapper 16:9.
- [ ] **T006** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/about-testimonials.php` — Grid 2×3 card đánh giá. Mỗi card: Avatar rounded, Tên + Chức danh, Rating sao (★★★★), Nội dung đánh giá. Tất cả editable No-code.
- [ ] **T007** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/about-gallery.php` — Carousel/Gallery ảnh phòng dùng Core Gallery Block với lightbox (WP 6.4+).
- [ ] **T008** Tạo template `wp-content/themes/mixhotel-theme/templates/page-gioi-thieu.html` — Nhúng: Header → Breadcrumb → about-intro → about-amenities → about-video → about-testimonials → about-gallery → Footer + Mobile Action Bar + Contact Modal + Booking Modal.

---

## Phase 3: Theme — Trang Gallery

- [ ] **T009** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/gallery-grid.php` — WP_Query lấy tất cả `hotel_room` (publish), nhóm theo chi nhánh (WP_Query meta `_mixhotel_room_branch_id`). Grid card: Featured Image thumbnail, Tên phòng, Link → single-hotel_room. Pagination (`paginate_links()`).
- [ ] **T010** Tạo template `wp-content/themes/mixhotel-theme/templates/page-gallery.html` — Nhúng: Header → Breadcrumb → gallery-grid → Footer + Mobile Action Bar + Contact Modal + Booking Modal.

---

## Phase 4: Theme — Trang Chi Nhánh Chi Tiết

- [ ] **T011** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/branch-detail.php` — Render chi nhánh: Hero (Featured Image + Tên overlay), Nội dung editor `the_content()`, Block thông tin liên hệ (Hotline tel:, Zalo, Messenger từ post meta), Danh sách phòng (WP_Query WHERE `_mixhotel_room_branch_id` = current), Google Maps embed (`_mixhotel_branch_map_embed` escape bằng `wp_kses`).
- [ ] **T012** Tạo template `wp-content/themes/mixhotel-theme/templates/single-hotel_branch.html` — Nhúng: Header → Breadcrumb → branch-detail → Footer + Mobile Action Bar + Contact Modal + Booking Modal.

---

## Phase 5: Theme — Blog / Tin Tức

- [ ] **T013** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/blog-sidebar.php` — Sidebar: Danh mục bài viết (wp:categories), Bài viết mới nhất (wp:latest-posts limit 5). Styling Dark Luxury.
- [ ] **T014** Tạo template `wp-content/themes/mixhotel-theme/templates/home.html` — Blog archive: Layout 2 cột (Main: Query Loop Block → card bài viết Featured Image + Title + Date + Excerpt + Category badge; Sidebar: blog-sidebar pattern). Pagination chuẩn.
- [ ] **T015** Tạo template `wp-content/themes/mixhotel-theme/templates/single.html` — Bài viết chi tiết: Breadcrumb → Featured Image → Title → Meta (Date, Category, Author) → Post Content → Related Posts → Sidebar.

---

## Phase 6: Theme — Trang Liên Hệ

- [ ] **T016** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/contact-form.php` — Form HTML: Họ tên*, SĐT*, Email*, Nội dung textarea. Nút "Gửi". Honeypot hidden fields. Nonce field. Thông báo success/error placeholder.
- [ ] **T017** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/contact-info.php` — Thông tin công ty: Tên DN, GPKD, địa chỉ chi nhánh. Hotline, Email, Social links (Facebook, YouTube, Instagram). Editable No-code.
- [ ] **T018** Tạo pattern `wp-content/themes/mixhotel-theme/patterns/contact-maps.php` — Grid Google Maps embed: WP_Query tất cả `hotel_branch`, render `_mixhotel_branch_map_embed` meta (escape `wp_kses` cho phép iframe attrs).
- [ ] **T019** Tạo template `wp-content/themes/mixhotel-theme/templates/page-lien-he.html` — Nhúng: Header → Breadcrumb → (contact-form + contact-info 2 cột) → contact-maps → Footer + Mobile Action Bar + Contact Modal.
- [ ] **T020** Tạo file `wp-content/themes/mixhotel-theme/assets/js/contact-form.js` — Vanilla JS: Bắt submit `#mixhotel-contact-form`, client validation (tên, SĐT VN 10 số, email), loading state, fetch AJAX → `MixHotelData.ajaxUrl` action `mixhotel_submit_contact`, hiển thị success/error message, reset form.

---

## Phase 7: Theme — Trang Chính Sách & Trang 404

- [ ] **T021** Cập nhật `wp-content/themes/mixhotel-theme/templates/page.html` — Template generic: Breadcrumb, nội dung post content, styling prose Dark Luxury (headings, paragraphs, lists, blockquote có màu và spacing đúng Design Tokens).
- [ ] **T022** Tạo/Cập nhật `wp-content/themes/mixhotel-theme/templates/404.html` — Illustration "404" CSS art/SVG. Text thông báo. 2 nút CTA: "Về Trang Chủ" + "Xem Phòng". Styling Dark Luxury centered layout.

---

## Phase 8: Theme — Navigation Update & Styling

- [ ] **T023** Cập nhật `wp-content/themes/mixhotel-theme/parts/header.html` — Bổ sung menu items: Giới Thiệu, Gallery, Tin Tức (dropdown sub-categories), Chính Sách (dropdown 3 trang), Liên Hệ. Đảm bảo dropdown hoạt động Desktop + Mobile.
- [ ] **T024** Cập nhật `wp-content/themes/mixhotel-theme/parts/footer.html` — Bổ sung: Link 3 trang Chính sách vào cột "Chính Sách". Link Giới thiệu, Gallery, Liên hệ vào cột "Thông tin hỗ trợ".
- [ ] **T025** Tạo file `wp-content/themes/mixhotel-theme/assets/css/pages.css` — Tất cả styles cho các trang phụ trợ. **BẮT BUỘC** sử dụng CSS Variables Design Tokens (`--wp--preset--color--*`, `--wp--preset--font-size--*`, `--wp--preset--spacing--*`). Includes: about sections, gallery grid, contact form, blog cards, branch detail, 404 page, policy prose, testimonials cards.
- [ ] **T026** Cập nhật `wp-content/themes/mixhotel-theme/functions.php` — Enqueue `pages.css` và `contact-form.js`. Mở rộng `MixHotelData` localized script cho contact form (nonce, ajaxUrl, isDemo, strings i18n).
- [ ] **T027** Cập nhật `wp-content/themes/mixhotel-theme/theme.json` — Đăng ký thêm templateParts nếu cần. Đảm bảo templates mới được khai báo.

---

## Phase 9: SEO Schema & Rank Math Configuration

- [ ] **T028** Tạo tài liệu hướng dẫn `docs/rankmath-setup-guide.md` — Hướng dẫn cấu hình Rank Math cho quản trị viên: Local SEO Schema `LodgingBusiness`, XML Sitemap, Breadcrumbs, OpenGraph defaults.
- [ ] **T029** Tạo các WordPress Pages cần thiết (qua WP Admin hoặc WP-CLI): Page "Giới thiệu" (slug: `gioi-thieu`), Page "Gallery" (slug: `gallery`), Page "Liên hệ" (slug: `lien-he`), Page "Chính sách thanh toán" (slug: `chinh-sach-thanh-toan`), Page "Chính sách bảo mật thông tin" (slug: `chinh-sach-bao-mat-thong-tin`), Page "Chính sách đặt trả phòng" (slug: `chinh-sach-dat-tra-phong`). Thêm nội dung text mẫu placeholder cho các trang chính sách.
- [ ] **T030** Cấu hình WordPress Settings: Đặt trang "Tin tức" làm Posts Page (Settings → Reading → Posts page).

---

## Phase 10: Verification & Documentation

- [ ] **T031** Kiểm tra cú pháp PHP (`php -l`) cho tất cả file PHP mới: `class-contact-handler.php`, tất cả patterns mới.
- [ ] **T032** Kiểm tra JavaScript syntax cho `contact-form.js`.
- [ ] **T033** Kiểm tra responsive trên viewport 375px, 768px, 1024px, 1440px cho tất cả trang phụ trợ.
- [ ] **T034** Kiểm tra navigation: Tất cả link header/footer hoạt động đúng. Dropdown menu mở đúng. Mobile menu hoạt động.
- [ ] **T035** Kiểm tra form liên hệ: Submit thành công, Response hiển thị, Demo Sandbox log ghi nhận.
- [ ] **T036** Cập nhật `docs/changelog.md` với đầy đủ thông tin Feature 05.
- [ ] **T037** Cập nhật `walkthrough.md` tổng kết quá trình triển khai Feature 05.
