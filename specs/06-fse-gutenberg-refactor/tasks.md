# TASKS: 06 - FSE GUTENBERG REFACTOR (No-code Admin UI)

**Input:** `specs/06-fse-gutenberg-refactor/spec.md`, `plan.md`  
**Quy tắc:** Mỗi task gắn cứng đường dẫn file chính xác. Kiểm tra cú pháp PHP ngay sau hoàn thành. Đọc `wordpress-bug-prevention/SKILL.md` trước khi code.  
**Chiến lược:** Progressive Migration — 4 Waves. Không tiến sang Wave tiếp theo nếu Wave trước chưa pass Gate.

---

## Phase 0: Chuẩn Bị — CSS Resets, Utility Classes & ADR

- [ ] **T001** Tạo file `docs/decisions/ADR-006-fse-refactor-strategy.md` — Ghi nhận quyết định kiến trúc: lý do chọn Progressive Migration, CSS Preservation, giữ `wp:html` cho Dynamic Patterns và Navigation, kế hoạch Feature 07.

- [ ] **T002** Bổ sung CSS utility classes và Gutenberg block resets vào `wp-content/themes/mixhotel-theme/assets/css/sections.css` — Thêm block vào cuối file (KHÔNG sửa/xóa CSS hiện có):
  * Gutenberg defaults reset: `.mix-section .wp-block-group`, `.mix-section .wp-block-heading`, `.mix-section .wp-block-paragraph`, `.mix-section .wp-block-columns`, `.mix-section .wp-block-column` → margin/padding reset.
  * Utility classes: `.mix-flex-between`, `.mix-flex-col-gap-20`, `.mix-flex-col-gap-12`, `.mix-flex-wrap-gap-8`, `.mix-flex-wrap-gap-12`, `.mix-grid-2col`, `.mix-grid-4col`, `.mix-mono-number`, `.mix-text-left`, `.mix-w-full`, `.mix-justify-center`.
  * `wp:columns` override: `.mix-grid-4col.wp-block-columns` → grid layout thay vì flex.
  * **Verification:** Tải lại frontend, kiểm tra không có CSS regression trên giao diện hiện tại (CSS resets chỉ scoped trong `.mix-section` nên an toàn).

- [ ] **T003** Chụp screenshot baseline toàn bộ frontend (trước refactor) — Trang chủ (desktop 1200px + mobile 360px), dùng làm chuẩn so sánh visual regression sau mỗi Wave.

---

## Phase 1 (Wave 1): POC — 2 Component Đơn Giản Nhất

> **Gate POC:** Admin click-to-edit text thành công, Inspector Controls hiện đúng, frontend 100% giống trước.

- [ ] **T004** [POC-1] Refactor `wp-content/themes/mixhotel-theme/patterns/why-choose-us.php` — Chuyển từ `<!-- wp:html -->` sang Native Gutenberg Blocks theo Mẫu A trong `plan.md`:
  * Section wrapper → `<!-- wp:group {"tagName":"section",...} -->`
  * Section head (kicker, h2, desc) → `<!-- wp:paragraph -->`, `<!-- wp:heading -->`, `<!-- wp:paragraph -->`
  * 4 Cards grid → `<!-- wp:columns {"className":"mix-grid-4col"} -->` + 4 `<!-- wp:column {"className":"mixLuxuryWhyCard"} -->`
  * Mỗi card: icon box + mono number + h3 + paragraph → Core Blocks
  * Áp dụng `"lock":{"move":true,"remove":true}` trên section wrapper.
  * **Verification:**
    * `php -l patterns/why-choose-us.php` pass.
    * Frontend hiển thị 100% giống trước (so sánh CSS).
    * Site Editor: click vào "Tập trung vào điều khách lo trước khi đặt" → editable.
    * Site Editor: Inspector Controls hiện Color/Typography panel.

- [ ] **T005** [POC-2] Refactor `wp-content/themes/mixhotel-theme/patterns/booking-steps.php` — Chuyển từ `<!-- wp:html -->` sang Native Gutenberg Blocks:
  * Section wrapper → `<!-- wp:group {"tagName":"section",...} -->`
  * Section head → Core Blocks
  * 3 Step Cards → `<!-- wp:columns {"className":"mixLuxuryStepsGrid"} -->` + 3 `<!-- wp:column {"className":"mixLuxuryStepCard"} -->`
  * Mỗi card: step number + kicker + h3 + paragraph → Core Blocks
  * **Verification:** Tương tự T004.

- [ ] **T006** [POC-VERIFY] Kiểm tra toàn diện POC trên Docker (`http://localhost:8888`):
  * Frontend desktop (1200px): So sánh visual "Tại Sao Chọn Mix" + "3 Bước Đặt Phòng" với screenshot baseline.
  * Frontend mobile (360px): Không vỡ layout, không horizontal scroll.
  * Site Editor (`/wp-admin/site-editor.php`): Mở template `front-page`, tìm 2 section đã refactor, kiểm tra editability.
  * `wp-content/debug.log`: Không có Warning/Notice/Fatal mới.
  * **Gate Decision:** Nếu PASS → tiến sang Wave 2. Nếu FAIL → ghi nhận lỗi, điều chỉnh CSS resets và chiến lược trước khi tiếp tục.

---

## Phase 2 (Wave 2): Static Content Patterns (Text-Heavy)

> **Prerequisite:** Wave 1 POC đã pass Gate.

- [ ] **T007** Refactor `wp-content/themes/mixhotel-theme/patterns/pricing-table.php` — Chuyển sang Core Blocks:
  * Section wrapper + head → Core Blocks
  * 3 Pricing cards → `<!-- wp:columns {"className":"mixLuxuryPricingGrid"} -->` + 3 `<!-- wp:column -->`
  * Mỗi card: header (h3, subtitle, price), pricing items list, CTA button
  * **Lưu ý:** CTA buttons có `data-contact-action` → giữ trong `<!-- wp:html -->` bên trong column.
  * Featured card có class `mixLuxuryPricingCard--featured` và badge → CSS class trên column.
  * **Verification:** Frontend giống trước. Admin sửa được giá "199k" thành "249k" trong Site Editor.

- [ ] **T008** Refactor `wp-content/themes/mixhotel-theme/patterns/page-404.php` — Chuyển sang Core Blocks:
  * Section wrapper → `<!-- wp:group -->`
  * Heading, paragraphs, CTA button → Core Blocks + `<!-- wp:html -->` cho button.
  * **Verification:** Truy cập URL không tồn tại, trang 404 hiển thị đúng.

- [ ] **T009** Refactor `wp-content/themes/mixhotel-theme/patterns/about-cta.php` — Chuyển sang Core Blocks:
  * Text + button tĩnh → Core Blocks + `<!-- wp:html -->` cho button.
  * **Verification:** Trang /gioi-thieu/ hiển thị đúng.

- [ ] **T010** Refactor `wp-content/themes/mixhotel-theme/patterns/about-amenities.php` — Chuyển sang Core Blocks:
  * Card grid text tĩnh → `<!-- wp:columns -->` + Core Blocks.
  * **Verification:** Trang /gioi-thieu/ hiển thị đúng.

- [ ] **T011** Refactor `wp-content/themes/mixhotel-theme/patterns/contact-info.php` — Chuyển sang Core Blocks:
  * Text tĩnh (địa chỉ, hotline, email) → Core Blocks paragraphs.
  * **Verification:** Trang /lien-he/ hiển thị đúng.

- [ ] **T012** Refactor `wp-content/themes/mixhotel-theme/patterns/policy-booking.php` — Chuyển sang Core Blocks:
  * Section wrapper + heading + danh sách paragraphs → Core Blocks.
  * **Verification:** Trang chính sách đặt trả phòng hiển thị đúng.

- [ ] **T013** Refactor `wp-content/themes/mixhotel-theme/patterns/policy-payment.php` — Chuyển sang Core Blocks:
  * Tương tự T012.
  * **Verification:** Trang chính sách thanh toán hiển thị đúng.

- [ ] **T014** Refactor `wp-content/themes/mixhotel-theme/patterns/policy-privacy.php` — Chuyển sang Core Blocks:
  * Tương tự T012.
  * **Verification:** Trang chính sách bảo mật hiển thị đúng.

- [ ] **T015** [WAVE2-VERIFY] Kiểm tra toàn diện Wave 2:
  * Frontend desktop + mobile cho tất cả trang bị ảnh hưởng.
  * Site Editor editability cho pricing, 404, about, contact, policy pages.
  * `wp-content/debug.log` sạch.

---

## Phase 3 (Wave 3): Components Có Ảnh & Cover (No-code Image Replacement)

> **Prerequisite:** Wave 2 đã pass.

- [ ] **T016** Refactor `wp-content/themes/mixhotel-theme/patterns/final-cta.php` — Chuyển sang `<!-- wp:cover -->` theo Mẫu B trong `plan.md`:
  * Background image → `<!-- wp:cover {"url":"...","dimRatio":75} -->`
  * Kicker, heading, desc → Core Blocks bên trong cover
  * CTA buttons → `<!-- wp:html -->` bên trong cover
  * **Verification:** Admin click ảnh nền trong Site Editor → nút "Replace" xuất hiện. Thay ảnh thử → frontend hiển thị ảnh mới.

- [ ] **T017** Refactor `wp-content/themes/mixhotel-theme/patterns/events-decoration.php` — Chuyển ảnh tĩnh sang `<!-- wp:image -->`:
  * Left column: text + pricing panel → phần text dùng Core Blocks, pricing panel và CTA button giữ `<!-- wp:html -->`.
  * Right column: 3 ảnh sự kiện hardcode → 3 `<!-- wp:image {"url":"...","alt":"..."} /-->`
  * **Verification:** Admin click ảnh sự kiện → nút "Replace" xuất hiện.

- [ ] **T018** Refactor `wp-content/themes/mixhotel-theme/patterns/about-intro.php` — Chuyển heading/text sang Core Blocks:
  * Breadcrumb giữ `<!-- wp:html -->` (có PHP `home_url()`).
  * Section heading + paragraphs + ảnh (nếu có) → Core Blocks.
  * **Verification:** Trang /gioi-thieu/ hiển thị đúng.

- [ ] **T019** Refactor `wp-content/themes/mixhotel-theme/patterns/about-gallery.php` — Chuyển ảnh sang `<!-- wp:image -->`:
  * Grid ảnh tĩnh → Mỗi ảnh là `<!-- wp:image -->` block.
  * **Verification:** Admin thay được ảnh qua nút "Replace".

- [ ] **T020** Refactor `wp-content/themes/mixhotel-theme/patterns/about-testimonials.php` — Chuyển sang Core Blocks:
  * Cards testimonials → `<!-- wp:columns -->` + Core Blocks.
  * Avatar ảnh → `<!-- wp:image -->`.
  * **Verification:** Trang /gioi-thieu/ hiển thị đúng.

- [ ] **T021** Refactor Logo trong `wp-content/themes/mixhotel-theme/parts/header.html` — Thay logo `<img>` bằng `<!-- wp:site-logo -->`:
  * CHỈ thay phần logo, KHÔNG sửa phần navigation menu hay mobile drawer.
  * Logo desktop: dòng 9 → `<!-- wp:site-logo {"width":180,"shouldSyncIcon":true,"className":"mixPremiumLogoImg"} /-->`
  * Logo mobile: dòng 115 → `<!-- wp:site-logo {"width":120} /-->`
  * **Lưu ý:** Cần kiểm tra CSS `.mixPremiumLogoBox` và `.logoPart` vẫn hoạt động đúng với `wp-block-site-logo`.
  * **Verification:** Logo hiển thị đúng kích thước trên desktop và mobile. Admin vào Site Editor → click logo → nút "Replace" xuất hiện.

- [ ] **T022** Refactor Logo trong `wp-content/themes/mixhotel-theme/parts/footer.html` — Thay logo `<img>` bằng `<!-- wp:site-logo -->`:
  * Dòng 10: thay `<img src="...mix-boutique-logo.png" ...>` bằng `<!-- wp:site-logo {"width":160,"className":"footerColLogo"} /-->`.
  * **Verification:** Footer logo hiển thị đúng.

- [ ] **T023** [WAVE3-VERIFY] Kiểm tra toàn diện Wave 3:
  * Frontend desktop + mobile cho tất cả trang bị ảnh hưởng.
  * Site Editor: kiểm tra "Replace" button hoạt động cho images và logo.
  * `wp-content/debug.log` sạch.
  * Visual regression: so sánh với screenshot baseline.

---

## Phase 4 (Wave 4): Complex Hybrid Patterns (Partial Refactor)

> **Prerequisite:** Wave 3 đã pass.

- [ ] **T024** Partial Refactor `wp-content/themes/mixhotel-theme/patterns/faq-accordion.php` — Chuyển section wrapper sang Core Blocks, giữ `<details>` trong `<!-- wp:html -->`:
  * Section `<section>` + section-head (kicker, h2, desc) → Core Blocks.
  * `<div class="mixLuxuryFaqList">` chứa `<details>` → giữ nguyên trong `<!-- wp:html -->`.
  * **Verification:** FAQ hiển thị đúng, accordion click mở/đóng hoạt động. Admin sửa được tiêu đề section.

- [ ] **T025** Partial Refactor `wp-content/themes/mixhotel-theme/patterns/video-showcase.php` — Chuyển text header sang Core Blocks:
  * Section wrapper → `<!-- wp:group {"tagName":"section"} -->`
  * Right column: section kicker, h2, desc, bullets → Core Blocks.
  * Left column (shorts) + YouTube containers + Video Modal → giữ `<!-- wp:html -->`.
  * Channel player + Actions → giữ `<!-- wp:html -->`.
  * **Verification:** Video showcase hiển thị đúng, YouTube Lite embed hoạt động. Admin sửa được heading + description.

- [ ] **T026** Partial Refactor `wp-content/themes/mixhotel-theme/patterns/hero-booking.php` — Chuyển text content sang Core Blocks:
  * Đánh giá: Hero pattern rất phức tạp (background veil layers, grid layout, form, stats).
  * **Phương án thận trọng:** Chỉ chuyển phần text (kicker, h1, lead paragraph, stats) sang Core Blocks nếu không phá vỡ CSS grid layout. Background + form giữ `<!-- wp:html -->`.
  * **Phương án an toàn:** Nếu CSS grid quá chặt (`.mixLuxuryHeroGrid` depend on direct children order), giữ nguyên `<!-- wp:html -->` cho toàn bộ hero → ghi chú lý do vào ADR.
  * **Verification:** Hero hiển thị đúng, form validation hoạt động, booking submit hoạt động.

- [ ] **T027** Partial Refactor `wp-content/themes/mixhotel-theme/patterns/real-photos-grid.php` — Chuyển section head sang Core Blocks:
  * Section wrapper + section-head (kicker, h2, desc) → Core Blocks.
  * Photo grid (`.mixLuxuryPhotosStage` + tiles) → giữ `<!-- wp:html -->` vì CSS grid layout phức tạp.
  * **Verification:** Ảnh thật grid hiển thị đúng.

- [ ] **T028** Partial Refactor `wp-content/themes/mixhotel-theme/patterns/contact-form.php` — Chuyển wrapper sang Core Blocks:
  * Section wrapper + heading → Core Blocks.
  * Form HTML → giữ `<!-- wp:html -->`.
  * **Verification:** Form liên hệ hiển thị đúng, submit hoạt động.

- [ ] **T029** Partial Refactor `wp-content/themes/mixhotel-theme/patterns/contact-maps.php` — Chuyển wrapper sang Core Blocks:
  * Section wrapper + heading → Core Blocks.
  * Google Maps iframe → giữ `<!-- wp:html -->`.
  * **Verification:** Maps hiển thị đúng.

- [ ] **T030** Partial Refactor `wp-content/themes/mixhotel-theme/patterns/about-video.php` — Chuyển text sang Core Blocks:
  * Section wrapper + heading → Core Blocks.
  * YouTube container → giữ `<!-- wp:html -->`.
  * **Verification:** Video about hiển thị đúng.

- [ ] **T031** [WAVE4-VERIFY] Kiểm tra toàn diện Wave 4:
  * Frontend desktop + mobile cho tất cả trang bị ảnh hưởng.
  * Site Editor editability cho phần text đã chuyển đổi.
  * Tất cả JS interactions hoạt động: FAQ accordion, YouTube Lite, Contact Modal, Booking Form.
  * `wp-content/debug.log` sạch.

---

## Phase 5: Final Verification & Documentation

- [ ] **T032** Visual Regression Test toàn diện — So sánh screenshot frontend sau toàn bộ refactor với baseline (T003):
  * Trang chủ desktop (1200px) + mobile (360px).
  * Trang Giới Thiệu desktop + mobile.
  * Trang Liên Hệ desktop + mobile.
  * Trang Chính Sách (3 trang) desktop.
  * Trang 404 desktop + mobile.
  * **Tiêu chí:** ≥ 98% visual match.

- [ ] **T033** Admin Usability Test — Đóng vai Editor (không phải Admin):
  * Đăng nhập với tài khoản Editor role.
  * Mở Site Editor → Sửa tiêu đề section "Tại Sao Chọn Mix" → Save → Kiểm tra frontend.
  * Thay ảnh sự kiện qua nút "Replace" → Save → Kiểm tra frontend.
  * Sửa giá phòng "199k" → "249k" → Save → Kiểm tra frontend.
  * Thay logo qua Site Logo block → Save → Kiểm tra Header + Footer.
  * **Tiêu chí:** Tất cả thao tác thành công mà không gặp lỗi hoặc vỡ layout.

- [ ] **T034** Kiểm tra `wp-content/debug.log` lần cuối — Không có PHP Warning/Notice/Fatal Error.

- [ ] **T035** Cập nhật `docs/decisions/ADR-006-fse-refactor-strategy.md` — Status từ "Proposed" → "Accepted". Ghi nhận kết quả POC, các CSS resets cần thiết, và patterns nào vẫn giữ `<!-- wp:html -->` kèm lý do.

- [ ] **T036** Cập nhật `docs/changelog.md` — Ghi nhận Feature 06 hoàn thành.

- [ ] **T037** Cập nhật `.agents/skills/wordpress-bug-prevention/SKILL.md` — Nếu gặp bug mới trong quá trình refactor (ví dụ: `wp-block-columns` override CSS grid, `wp:cover` render sai trên mobile), ghi nhận vào Bug Registry.
