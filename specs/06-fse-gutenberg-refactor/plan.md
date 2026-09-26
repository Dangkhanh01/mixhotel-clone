# IMPLEMENTATION PLAN: 06 - FSE GUTENBERG REFACTOR (No-code Admin UI)

**Input:** `specs/06-fse-gutenberg-refactor/spec.md`, `REAL_WORLD_AGENCY_WORKFLOW.md`, `AGENTS.md`, `docs/design-tokens-spec.md`  
**Constitution Check:** Tuân thủ 100% nguyên tắc `AGENTS.md` — FSE Block Theme, không sửa core, dùng Design Tokens, CSS Variables `--wp--preset--*`, không hardcode hex/rgba rải rác.  
**Ground Truth Source:** Codebase hiện tại (`wp-content/themes/mixhotel-theme/`)

---

## 1. CONSTITUTION CHECK (KIỂM TRA TUÂN THỦ HIẾN PHÁP DỰ ÁN)

| Điều khoản trong `AGENTS.md` | Đánh giá | Ghi chú thực thi |
| :--- | :---: | :--- |
| **Dùng FSE Block Theme** | PASS | Feature này thực thi đúng tinh thần FSE — chuyển từ `wp:html` sang Native Core Blocks |
| **Không sửa Core / Vendor** | PASS | 100% thay đổi nằm trong `mixhotel-theme/patterns/`, `parts/`, `assets/css/` |
| **Dùng Design Tokens tập trung** | PASS | Core Blocks sử dụng `theme.json` color presets, font presets, spacing presets qua Inspector Controls |
| **Không hardcode mã màu** | PASS | Inline styles hiện có sẽ được chuyển thành CSS classes hoặc Gutenberg style attributes map về `theme.json` tokens |
| **Không lạm dụng `!important`** | PASS | Chỉ dùng `!important` khi cần override Gutenberg Core defaults gây xung đột (ghi rõ lý do) |
| **Bảo mật Form & API** | PASS | Form markup giữ nguyên `wp_nonce_field()` bên trong `<!-- wp:html -->` |
| **No-code Replaceability** | TARGET | Đây chính là mục tiêu chính của Feature 06 |

---

## 2. CHIẾN LƯỢC CHUYỂN ĐỔI (MIGRATION STRATEGY)

### 2.1. Nguyên tắc CSS Preservation

```
┌─────────────────────────────────────────────────┐
│           CSS PRESERVATION STRATEGY             │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. KHÔNG XÓA bất kỳ file CSS nào hiện có      │
│  2. KHÔNG ĐỔI TÊN class CSS nào hiện có        │
│  3. GẮN class CSS cũ vào Core Blocks qua       │
│     thuộc tính "className" trong block JSON     │
│  4. CHỈ BỔ SUNG CSS resets mới nếu              │
│     wp-block-* defaults gây xung đột           │
│  5. TẠO utility classes mới thay cho            │
│     inline styles bị xóa                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 2.2. Bảng ánh xạ Block Grammar (Block Mapping Strategy)

Mỗi phần tử HTML trong pattern hiện tại được map sang Gutenberg Core Block tương ứng:

| HTML Element Hiện Tại | Gutenberg Core Block | Attributes Quan Trọng |
|:---|:---|:---|
| `<section class="mix-section ...">` | `<!-- wp:group -->` | `"tagName":"section"`, `"className":"mix-section mix-section--dark-2"` |
| `<div class="mix-container">` | `<!-- wp:group -->` | `"className":"mix-container"` |
| `<div class="mix-section-head">` | `<!-- wp:group -->` | `"className":"mix-section-head"` |
| `<span class="mix-section-kicker">` | `<!-- wp:paragraph -->` | `"className":"mix-section-kicker"` |
| `<h2 class="mix-section-title">` | `<!-- wp:heading -->` | `"className":"mix-section-title"` |
| `<p class="mix-section-desc">` | `<!-- wp:paragraph -->` | `"className":"mix-section-desc"` |
| `<div style="display:grid; ...">` | `<!-- wp:columns -->` hoặc `<!-- wp:group -->` | `"className":"mix-grid-4col"` (class CSS mới) |
| `<div class="mixLuxuryWhyCard">` | `<!-- wp:column -->` hoặc `<!-- wp:group -->` | `"className":"mixLuxuryWhyCard"` |
| `<h3 class="...Title">` | `<!-- wp:heading {"level":3} -->` | `"className":"..."` |
| `<p class="...Desc">` | `<!-- wp:paragraph -->` | `"className":"..."` |
| `<img src="..." loading="lazy">` | `<!-- wp:image -->` | `"url":"...","alt":"..."` |
| `<section class="...FinalCta">` + background `<img>` | `<!-- wp:cover -->` | `"url":"...","dimRatio":80` |
| Logo `<img>` | `<!-- wp:site-logo -->` | `"width":180` |
| `<button data-contact-action="...">` | Giữ trong `<!-- wp:html -->` | JS interaction cần raw HTML |
| `<form>` + `wp_nonce_field()` | Giữ trong `<!-- wp:html -->` | PHP function cần raw execution |
| `<details>` accordion | Giữ trong `<!-- wp:html -->` hoặc `<!-- wp:details -->` | Đánh giá trong POC |

### 2.3. Chiến lược xử lý Inline Styles

Nhiều pattern hiện tại chứa inline `style="..."`. Khi chuyển sang Core Blocks, inline styles cần được xử lý:

**Phương án 1 (Ưu tiên): Chuyển thành CSS utility class**
```css
/* Thêm vào sections.css */
.mix-flex-col-gap-20 { display: flex; flex-direction: column; gap: 20px; }
.mix-grid-2col { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.mix-grid-4col { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.mix-flex-between { display: flex; align-items: center; justify-content: space-between; }
.mix-mono-number { font-family: monospace; font-size: 28px; font-weight: 800; color: rgba(255, 255, 255, 0.15); }
```

**Phương án 2 (Ngoại lệ): Gutenberg style attribute**
Cho các style đơn giản (margin-top, padding), sử dụng Gutenberg JSON style attribute:
```html
<!-- wp:group {"style":{"spacing":{"margin":{"top":"14px"}}}} -->
```

---

## 3. KIẾN TRÚC FILE — THAY ĐỔI SAU REFACTOR

```
wp-content/themes/mixhotel-theme/
├── theme.json                                   # [GIỮA NGUYÊN]
├── style.css                                    # [GIỮA NGUYÊN]
├── functions.php                                # [CÓ THỂ MODIFY] Thêm CSS reset file nếu cần
├── assets/
│   ├── css/
│   │   ├── header.css                           # [GIỮA NGUYÊN]
│   │   ├── mobile-bar.css                       # [GIỮA NGUYÊN]
│   │   ├── desktop-contact-bar.css              # [GIỮA NGUYÊN]
│   │   ├── modal.css                            # [GIỮA NGUYÊN]
│   │   ├── hero.css                             # [GIỮA NGUYÊN]
│   │   ├── sections.css                         # [MODIFY] Thêm utility classes + wp-block resets
│   │   ├── pages.css                            # [GIỮA NGUYÊN]
│   │   ├── pages-luxury.css                     # [GIỮA NGUYÊN]
│   │   ├── room-detail.css                      # [GIỮA NGUYÊN]
│   │   └── room-archive.css                     # [GIỮA NGUYÊN]
│   └── js/                                      # [GIỮA NGUYÊN] Toàn bộ JS không thay đổi
├── templates/                                   # [GIỮA NGUYÊN] Cấu trúc template không đổi
├── parts/
│   ├── header.html                              # [MODIFY] Đổi logo → wp:site-logo
│   ├── footer.html                              # [MODIFY] Đổi logo → wp:site-logo
│   ├── mobile-action-bar.html                   # [GIỮA NGUYÊN]
│   ├── desktop-contact-bar.html                 # [GIỮA NGUYÊN]
│   ├── contact-modal.html                       # [GIỮA NGUYÊN]
│   └── booking-modal.html                       # [GIỮA NGUYÊN]
├── patterns/
│   ├── why-choose-us.php                        # [REFACTOR] wp:html → Core Blocks
│   ├── booking-steps.php                        # [REFACTOR] wp:html → Core Blocks
│   ├── pricing-table.php                        # [REFACTOR] wp:html → Core Blocks
│   ├── faq-accordion.php                        # [PARTIAL] Wrapper → Core Blocks, <details> giữ wp:html
│   ├── final-cta.php                            # [REFACTOR] Background img → wp:cover, text → Core Blocks
│   ├── events-decoration.php                    # [REFACTOR] Ảnh → wp:image, text → Core Blocks
│   ├── video-showcase.php                       # [PARTIAL] Text → Core Blocks, YouTube container giữ wp:html
│   ├── hero-booking.php                         # [PARTIAL] Background → wp:cover, text → Core Blocks, form giữ wp:html
│   ├── real-photos-grid.php                     # [PARTIAL] Section head → Core Blocks, grid giữ wp:html (layout phức tạp)
│   ├── about-intro.php                          # [REFACTOR] Heading/text → Core Blocks
│   ├── about-amenities.php                      # [REFACTOR] Card grid → Core Blocks
│   ├── about-testimonials.php                   # [REFACTOR] Cards → Core Blocks
│   ├── about-gallery.php                        # [REFACTOR] Ảnh → wp:image
│   ├── about-cta.php                            # [REFACTOR] Text/button → Core Blocks
│   ├── about-video.php                          # [PARTIAL] YouTube giữ wp:html
│   ├── contact-info.php                         # [REFACTOR] Text → Core Blocks
│   ├── contact-form.php                         # [PARTIAL] Wrapper → Core Blocks, form giữ wp:html
│   ├── contact-maps.php                         # [PARTIAL] Wrapper → Core Blocks, iframe giữ wp:html
│   ├── policy-booking.php                       # [REFACTOR] Text → Core Blocks
│   ├── policy-payment.php                       # [REFACTOR] Text → Core Blocks
│   ├── policy-privacy.php                       # [REFACTOR] Text → Core Blocks
│   ├── page-404.php                             # [REFACTOR] Text/button → Core Blocks
│   ├── page-content.php                         # [PARTIAL] PHP giữ wp:html
│   │── concept-rooms.php                        # [GIỮA NGUYÊN] PHP logic
│   │── branches-list.php                        # [GIỮA NGUYÊN] PHP logic
│   │── room-detail-content.php                  # [GIỮA NGUYÊN] PHP logic
│   │── room-archive-content.php                 # [GIỮA NGUYÊN] PHP logic
│   │── branch-detail.php                        # [GIỮA NGUYÊN] PHP logic
│   │── blog-archive-content.php                 # [GIỮA NGUYÊN] PHP logic
│   │── blog-single-content.php                  # [GIỮA NGUYÊN] PHP logic
│   │── blog-sidebar.php                         # [GIỮA NGUYÊN] PHP logic
│   └── gallery-grid.php                         # [GIỮA NGUYÊN] PHP logic
└── docs/
    └── decisions/
        └── ADR-006-fse-refactor-strategy.md     # [NEW] Ghi nhận quyết định kiến trúc
```

---

## 4. WAVES CHUYỂN ĐỔI (PROGRESSIVE MIGRATION)

### Wave 1: POC — Proof of Concept (2-3 components đơn giản nhất)

**Mục tiêu:** Kiểm chứng chiến lược CSS Preservation hoạt động đúng. Nếu POC thất bại (vỡ CSS, mất chức năng), dừng lại và điều chỉnh chiến lược trước khi tiếp tục.

| Component | Lý do chọn làm POC |
|:---|:---|
| `why-choose-us.php` | Đơn giản nhất: chỉ có heading + paragraph + 4 card. Không ảnh, không JS, không PHP. |
| `booking-steps.php` | Tương tự: 3 card text tĩnh. Dùng để xác nhận pattern chuyển đổi. |

**Gate POC:** 
- Admin click-to-edit text thành công trong Site Editor.
- Inspector Controls hiện Color/Typography settings.
- Frontend hiển thị 100% giống trước refactor.
- Không có PHP Warning/Notice trong debug.log.

### Wave 2: Static Content Patterns (text-heavy, có ảnh)

**Tiến hành sau khi POC đạt chuẩn:**

| Component | Ghi chú |
|:---|:---|
| `pricing-table.php` | Admin tự sửa giá phòng |
| `page-404.php` | Đơn giản |
| `about-cta.php` | Đơn giản |
| `about-amenities.php` | Card grid text |
| `contact-info.php` | Text tĩnh |
| `policy-booking.php` | Text tĩnh |
| `policy-payment.php` | Text tĩnh |
| `policy-privacy.php` | Text tĩnh |

### Wave 3: Components có Ảnh & Cover (No-code Image Replacement)

| Component | Ghi chú |
|:---|:---|
| `final-cta.php` | Background img → `wp:cover` |
| `events-decoration.php` | 3 ảnh sự kiện → `wp:image` |
| `about-intro.php` | Heading + ảnh tĩnh |
| `about-gallery.php` | Grid ảnh → `wp:image` |
| `about-testimonials.php` | Cards + avatar |
| Header `parts/header.html` | Logo → `wp:site-logo` |
| Footer `parts/footer.html` | Logo → `wp:site-logo` |

### Wave 4: Complex Hybrid Patterns (Partial Refactor)

| Component | Phần chuyển đổi | Phần giữ nguyên |
|:---|:---|:---|
| `hero-booking.php` | Section heading, stats, CTA buttons | Background img, form HTML |
| `video-showcase.php` | Section heading, bullet list | YouTube containers |
| `about-video.php` | Section heading | YouTube container |
| `faq-accordion.php` | Section heading | `<details>` elements |
| `real-photos-grid.php` | Section heading | Photo grid (complex CSS grid) |
| `contact-form.php` | Section wrapper | Form HTML |
| `contact-maps.php` | Section wrapper | Google Maps iframe |
| `page-content.php` | Wrapper | PHP `the_content()` |

---

## 5. MẪU CHUYỂN ĐỔI THAM CHIẾU (CONVERSION TEMPLATES)

### 5.1. Mẫu A: Section Text-Only (why-choose-us, booking-steps)

**TRƯỚC (hiện tại):**
```php
<?php
/**
 * Title: Tại Sao Chọn Mix
 * Slug: mixhotel/why-choose-us
 * Categories: mixhotel
 */
?>
<!-- wp:html -->
<section id="why" class="mix-section mix-section--dark-2">
  <div class="mix-container">
    <div class="mix-section-head">
      <span class="mix-section-kicker">VÌ SAO CHỌN MIX</span>
      <h2 class="mix-section-title">Tập trung vào điều khách lo trước khi đặt</h2>
      <p class="mix-section-desc">...</p>
    </div>
    <div style="display: grid; ...">
      <div class="mixLuxuryWhyCard">
        <h3 class="mixLuxuryWhyTitle">Riêng tư tuyệt đối</h3>
        <p class="mixLuxuryWhyDesc">...</p>
      </div>
      ...
    </div>
  </div>
</section>
<!-- /wp:html -->
```

**SAU (refactored):**
```php
<?php
/**
 * Title: Tại Sao Chọn Mix
 * Slug: mixhotel/why-choose-us
 * Categories: mixhotel
 */
?>
<!-- wp:group {"tagName":"section","className":"mix-section mix-section--dark-2","anchor":"why","lock":{"move":true,"remove":true},"metadata":{"name":"Tại Sao Chọn Mix"}} -->
<section id="why" class="wp-block-group mix-section mix-section--dark-2">

<!-- wp:group {"className":"mix-container"} -->
<div class="wp-block-group mix-container">

<!-- wp:group {"className":"mix-section-head"} -->
<div class="wp-block-group mix-section-head">
<!-- wp:paragraph {"className":"mix-section-kicker"} -->
<p class="mix-section-kicker">VÌ SAO CHỌN MIX</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"className":"mix-section-title"} -->
<h2 class="wp-block-heading mix-section-title">Tập trung vào điều khách lo trước khi đặt</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"mix-section-desc"} -->
<p class="mix-section-desc">Sự tin cậy, không gian tinh tế và cảm xúc của bạn là ưu tiên hàng đầu tại Mix Boutique Hotel.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:columns {"className":"mix-grid-4col"} -->
<div class="wp-block-columns mix-grid-4col">

<!-- wp:column {"className":"mixLuxuryWhyCard"} -->
<div class="wp-block-column mixLuxuryWhyCard">
<!-- wp:group {"className":"mix-flex-between"} -->
<div class="wp-block-group mix-flex-between">
<!-- wp:group {"className":"mixLuxuryWhyIconBox"} -->
<div class="wp-block-group mixLuxuryWhyIconBox">
<!-- wp:paragraph -->
<p>1</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
<!-- wp:paragraph {"className":"mix-mono-number"} -->
<p class="mix-mono-number">01</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
<!-- wp:heading {"level":3,"className":"mixLuxuryWhyTitle"} -->
<h3 class="wp-block-heading mixLuxuryWhyTitle">Riêng tư tuyệt đối</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"mixLuxuryWhyDesc"} -->
<p class="mixLuxuryWhyDesc">Tư vấn kín đáo, hỗ trợ khách chọn phòng phù hợp và tuyệt đối không làm phiền trải nghiệm riêng.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

... (tương tự cho card 2, 3, 4)

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

</section>
<!-- /wp:group -->
```

### 5.2. Mẫu B: Section có Background Image (final-cta)

**SAU (refactored):**
```php
<?php
/**
 * Title: Final CTA Tái Tương Tác
 * Slug: mixhotel/final-cta
 * Categories: mixhotel
 */
?>
<!-- wp:cover {"url":"<?php echo esc_url(get_template_directory_uri() . '/assets/images/final-cta-bg.jpg'); ?>","dimRatio":75,"overlayColor":"dark-primary","className":"mixLuxuryFinalCta","anchor":"finalCta","lock":{"move":true,"remove":true}} -->
<div class="wp-block-cover mixLuxuryFinalCta" id="finalCta">
  <span aria-hidden="true" class="wp-block-cover__background has-dark-primary-background-color has-background-dim-75 has-background-dim"></span>
  <img class="wp-block-cover__image-background" src="" alt="" data-object-fit="cover" />
  <div class="wp-block-cover__inner-container">
    <!-- wp:paragraph {"className":"mix-section-kicker"} -->
    <p class="mix-section-kicker">ĐẶT PHÒNG HÔM NAY</p>
    <!-- /wp:paragraph -->
    <!-- wp:heading {"className":"mixLuxuryFinalCtaTitle"} -->
    <h2 class="wp-block-heading mixLuxuryFinalCtaTitle">Muốn xem phòng còn trống? Nhắn Zalo để Mix gửi ảnh &amp; báo giá ngay</h2>
    <!-- /wp:heading -->
    <!-- wp:paragraph {"className":"mixLuxuryFinalCtaDesc"} -->
    <p class="mixLuxuryFinalCtaDesc">Tư vấn nhanh chóng, kín đáo, ưu tiên ảnh thật và concept phù hợp nhất cho buổi hẹn của hai người.</p>
    <!-- /wp:paragraph -->
    <!-- wp:html -->
    <div class="mixLuxuryFinalCtaActions">
      <button type="button" class="mixLuxuryBtn mixLuxuryBtnPrimary" style="padding: 14px 32px; font-size: 14px;" data-contact-action="zalo">
        <i class="fa fa-commenting">&#9993;</i>
        <span>Nhắn Zalo Tư Vấn</span>
      </button>
      <button type="button" class="mixLuxuryBtn mixLuxuryBtnOutline" style="padding: 14px 32px; font-size: 14px;" data-contact-action="phone">
        <i class="fa fa-phone">&#9742;</i>
        <span>Gọi Ngay</span>
      </button>
    </div>
    <!-- /wp:html -->
  </div>
</div>
<!-- /wp:cover -->
```

### 5.3. Mẫu C: Logo trong Header/Footer

**SAU (refactored — chỉ phần logo):**
```html
<!-- Thay thế:  -->
<!-- <img src="/wp-content/themes/mixhotel-theme/assets/images/mix-boutique-logo.png" ... /> -->

<!-- Bằng: -->
<!-- wp:site-logo {"width":180,"shouldSyncIcon":true,"className":"mixPremiumLogoImg"} /-->
```

---

## 6. CSS BỔ SUNG CẦN TẠO

### 6.1. Utility Classes (thêm vào `sections.css`)

```css
/* ===== Gutenberg Block Resets cho Mix Theme ===== */
.mix-section .wp-block-group { margin-top: 0; margin-bottom: 0; padding: 0; }
.mix-section .wp-block-heading { margin-top: 0; margin-bottom: 0; }
.mix-section .wp-block-paragraph { margin-top: 0; margin-bottom: 0; }
.mix-section .wp-block-columns { margin-bottom: 0; }
.mix-section .wp-block-column { margin-bottom: 0; }

/* ===== Utility Classes thay thế inline styles ===== */
.mix-flex-between { display: flex; align-items: center; justify-content: space-between; }
.mix-flex-col-gap-20 { display: flex; flex-direction: column; gap: 20px; }
.mix-flex-col-gap-12 { display: flex; flex-direction: column; gap: 12px; }
.mix-flex-wrap-gap-8 { display: flex; flex-wrap: wrap; gap: 8px; }
.mix-flex-wrap-gap-12 { display: flex; flex-wrap: wrap; gap: 12px; }
.mix-flex-wrap-gap-14 { display: flex; flex-wrap: wrap; gap: 14px; }
.mix-grid-2col { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.mix-grid-4col { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.mix-mono-number {
  font-family: monospace;
  font-size: 28px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.15);
}
.mix-text-left { text-align: left; }
.mix-w-full { width: 100%; }
.mix-justify-center { justify-content: center; }
```

### 6.2. wp:columns Override (wp:columns render `display: flex` mặc định, ta cần `grid`)

```css
/* Override Gutenberg wp:columns flex layout → grid layout cho "Tại Sao Chọn Mix" */
.mix-grid-4col.wp-block-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  flex-wrap: unset; /* Remove Gutenberg default flex-wrap */
}
.mix-grid-4col.wp-block-columns > .wp-block-column {
  flex-basis: unset; /* Remove Gutenberg default flex-basis */
  margin-left: 0;   /* Remove Gutenberg default gap */
}
```

---

## 7. ADR — QUYẾT ĐỊNH KIẾN TRÚC

### ADR-006: Chiến lược chuyển đổi wp:html sang Native Gutenberg Blocks

**Status:** Proposed  
**Context:** Toàn bộ Block Patterns trong `mixhotel-theme` sử dụng `<!-- wp:html -->` bao trùm, tước đoạt khả năng kéo thả và quản trị No-code của Admin.  
**Decision:**
1. Áp dụng **Progressive Migration** — chuyển đổi từng Wave, bắt đầu từ POC.
2. Chiến lược **CSS Preservation** — giữ nguyên 100% CSS files, gắn class cũ qua `className` attribute.
3. Nhóm B (Dynamic PHP patterns) giữ nguyên `<!-- wp:html -->`, tối ưu hóa trong Feature 07.
4. Header navigation giữ HTML custom thay vì dùng `<!-- wp:navigation -->` vì WordPress 6.x chưa hỗ trợ tốt multi-level dropdown custom styling.
5. Buttons CTA có `data-contact-action` giữ trong `<!-- wp:html -->` vì cần JS dispatcher.
**Consequences:** Admin có thể quản trị nội dung tĩnh (text, giá, ảnh) ngay trong Site Editor. Dynamic content (danh sách phòng, chi tiết phòng) chờ Feature 07.

---

## 8. RỦI RO VÀ PHƯƠNG ÁN DỰ PHÒNG

| Rủi ro | Xác suất | Tác động | Phương án |
|:---|:---:|:---:|:---|
| Gutenberg `wp-block-*` class ghi đè CSS layout hiện tại | Trung bình | Cao | CSS resets cụ thể cho từng block type. Kiểm tra từng Wave. |
| `wp:columns` render `flex` thay vì `grid` mong muốn | Cao | Trung bình | Override CSS flex → grid cho class utility. |
| Block Editor serialization thay đổi whitespace/HTML format | Thấp | Trung bình | Dùng `lock` attribute ngăn Editor tự động re-format. |
| Admin vô tình sửa hỏng layout trong Site Editor | Trung bình | Trung bình | `"lock":{"move":true,"remove":true}` trên section wrappers. |
| Performance: Native Blocks thêm nhiều comment delimiters | Thấp | Thấp | Block comments chỉ là HTML comments, browser bỏ qua. |
