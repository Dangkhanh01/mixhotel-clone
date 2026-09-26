# FEATURE SPECIFICATION: 06 - FSE GUTENBERG REFACTOR (No-code Admin UI)

**Feature Branch:** `feat/06-fse-gutenberg-refactor`  
**Status:** Ready for Planning & Implementation  
**Feature Scope:** Chuyển đổi toàn bộ Block Patterns và Template Parts hiện đang bị bọc cứng trong `<!-- wp:html -->` (Custom HTML Block) sang **Native Gutenberg Core Blocks** (`<!-- wp:group -->`, `<!-- wp:columns -->`, `<!-- wp:heading -->`, `<!-- wp:image -->`, `<!-- wp:cover -->`, `<!-- wp:navigation -->`...). Mục tiêu: Mở khóa hoàn toàn khả năng kéo thả, click-to-edit, Inspector Controls và nút "Replace" ảnh cho Admin/Editor trong Site Editor, đồng thời giữ nguyên 100% giao diện frontend hiện tại.

**Governing Documents:**
- `REAL_WORLD_AGENCY_WORKFLOW.md` — Mục 6 (Guardrails), Mục 7.3 (Dynamic Data Binding), Mục 7.4 (No-code Replaceability), Mục 9.4 (Gutenberg-first)
- `AGENTS.md` — Mục 2 (Ràng buộc Công nghệ), Mục 3 (Ranh giới An toàn)

---

## 1. CLARIFICATIONS (GỠ BỎ ĐIỂM MƠ HỒ)

* **Q: Mục tiêu chính của Feature 06 là gì?**
  * **A:** Biến codebase từ "vỏ bọc FSE nhưng ruột HTML tĩnh" thành **FSE Block Theme thực chất** — nơi Admin có thể:
    * **Kéo thả** đổi vị trí các section, card, column trên trang chủ.
    * **Click-to-edit** trực tiếp tiêu đề, mô tả, giá phòng ngay trong Site Editor.
    * **Thay ảnh bằng nút "Replace"** trong 3 giây (No-code Replaceability).
    * **Đổi màu sắc, font, padding** qua Inspector Controls sử dụng Design Tokens từ `theme.json`.
    * **Thêm/bớt link menu** qua Navigation Block mà không cần sửa code.

* **Q: Có phải refactor TẤT CẢ patterns/parts cùng một lúc không?**
  * **A:** KHÔNG. Áp dụng chiến thuật **Progressive Migration** theo 4 Wave (sóng chuyển đổi), bắt đầu từ các component đơn giản (Wave 1: POC) để kiểm chứng kỹ thuật trước khi mở rộng.

* **Q: CSS hiện tại có bị mất khi chuyển sang Core Blocks không?**
  * **A:** KHÔNG. Chiến lược là **CSS Preservation** — giữ nguyên 100% các file CSS hiện tại (`sections.css`, `hero.css`, `header.css`...). Sử dụng thuộc tính `className` trong Core Blocks để gắn đúng class CSS hiện có. Ví dụ:
    ```html
    <!-- TRƯỚC: wp:html bọc cứng -->
    <!-- wp:html -->
    <section class="mix-section mix-section--dark-2">
      <div class="mix-container">
        <div class="mix-section-head">
          <span class="mix-section-kicker">VÌ SAO CHỌN MIX</span>
          <h2 class="mix-section-title">Tập trung vào điều khách lo trước khi đặt</h2>
    ...
    <!-- /wp:html -->

    <!-- SAU: Native Gutenberg Blocks giữ nguyên class -->
    <!-- wp:group {"className":"mix-section mix-section--dark-2","tagName":"section","metadata":{"name":"Tại Sao Chọn Mix"}} -->
    <section class="wp-block-group mix-section mix-section--dark-2">
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
    ...
    ```

* **Q: `wp-block-group` class sẽ can thiệp vào CSS hiện có không?**
  * **A:** Gutenberg Core tự thêm class `wp-block-group`, `wp-block-heading`, `wp-block-image` v.v. Cần **kiểm tra và bổ sung CSS resets** nếu Core defaults ghi đè padding/margin không mong muốn. Tuy nhiên, nhờ `theme.json` đã tắt `defaultPalette: false` và kiểm soát spacing, xung đột tối thiểu.

* **Q: Các component có PHP logic phức tạp (concept-rooms, branches-list, room-detail-content) sẽ xử lý thế nào?**
  * **A:** Chia làm 2 nhóm:
    * **Nhóm A (Static Content Patterns):** Nội dung tĩnh quản trị bởi Admin (pricing, FAQ, why-choose-us, booking-steps, events, CTA) → Chuyển hoàn toàn sang Native Gutenberg Blocks.
    * **Nhóm B (Dynamic Data Patterns):** Nội dung động kéo từ CPT/Taxonomy (concept-rooms, branches-list, room-detail, blog-archive, gallery-grid) → Giữ nguyên PHP logic bên trong `<!-- wp:html -->` vì cần `WP_Query` và `get_post_meta()`. Các phần này sẽ được cải tiến bằng Query Loop Block hoặc Block Bindings API trong Feature 07 tương lai.

* **Q: Header và Footer sẽ chuyển hoàn toàn sang Navigation Block?**
  * **A:** Header sẽ được refactor theo 2 bước:
    * **Bước 1 (Feature 06):** Đổi Logo tĩnh sang `<!-- wp:site-logo -->`. Menu navigation giữ nguyên HTML vì Navigation Block của WordPress 6.x chưa hỗ trợ tốt dropdown multi-level với CSS custom styling phức tạp. Sẽ ghi ADR giải thích lý do.
    * **Bước 2 (Feature 07 tương lai):** Khi WordPress Core cải thiện Navigation Block → Chuyển menu sang `<!-- wp:navigation -->`.

* **Q: Khóa layout bảo vệ bố cục (templateLock) có áp dụng trong Feature 06 không?**
  * **A:** CÓ. Các Group block gốc (section wrappers) sẽ sử dụng `"lock":{"move":true,"remove":true}` để ngăn Admin vô tình xóa hoặc kéo nhầm section layout. Nội dung bên trong vẫn tự do chỉnh sửa (click-to-edit text, replace image).

---

## 2. PHÂN LOẠI COMPONENT THEO MỨC ĐỘ CHUYỂN ĐỔI

### Nhóm A: Chuyển đổi hoàn toàn sang Native Gutenberg Blocks (Wave 1-3)

Đây là các pattern có nội dung **tĩnh, quản trị bởi Admin**, không cần PHP logic backend. Sau khi chuyển đổi, Admin có thể click-to-edit mọi text, replace mọi image, đổi color/font qua Inspector Controls.

| # | Pattern/Part | File hiện tại | Mức độ | Lý do chuyển đổi |
|:--:|:---|:---|:---:|:---|
| 1 | Tại Sao Chọn Mix | `patterns/why-choose-us.php` | ⭐ Đơn giản | Chỉ có heading + paragraph + 4 card. Không có PHP logic, không có ảnh. |
| 2 | 3 Bước Đặt Phòng | `patterns/booking-steps.php` | ⭐ Đơn giản | 3 card với text tĩnh. Không có ảnh, không có PHP. |
| 3 | Bảng Giá Phòng | `patterns/pricing-table.php` | ⭐ Đơn giản | 3 card giá tĩnh. Admin cần tự sửa giá trực tiếp. |
| 4 | FAQ Accordion | `patterns/faq-accordion.php` | ⭐⭐ Trung bình | HTML5 `<details>` cần JS tương tác. Vẫn dùng `<!-- wp:html -->` cho phần `<details>` nhưng heading/section wrapper chuyển sang Core Blocks. |
| 5 | Final CTA | `patterns/final-cta.php` | ⭐⭐ Trung bình | Có background image hardcode → chuyển sang `<!-- wp:cover -->`. |
| 6 | Sự Kiện & Trang Trí | `patterns/events-decoration.php` | ⭐⭐ Trung bình | Có 3 ảnh sự kiện hardcode → chuyển sang `<!-- wp:image -->`. |
| 7 | Video Showcase | `patterns/video-showcase.php` | ⭐⭐⭐ Phức tạp | Có YouTube Lite Embed interaction, giữ `<!-- wp:html -->` cho video container, chuyển text wrapper sang Core Blocks. |
| 8 | Hero Booking | `patterns/hero-booking.php` | ⭐⭐⭐ Phức tạp | Background image → `<!-- wp:cover -->`. Form → giữ `<!-- wp:html -->`. Text/stats → Core Blocks. |
| 9 | Ảnh Thật Phòng Thật | `patterns/real-photos-grid.php` | ⭐⭐⭐ Phức tạp | 6 ảnh hardcode → `<!-- wp:image -->`. Grid layout phức tạp có thể cần giữ `<!-- wp:html -->` cho container. |
| 10 | Header Logo | `parts/header.html` | ⭐⭐ Trung bình | Đổi `<img>` logo → `<!-- wp:site-logo -->`. Menu giữ nguyên (xem Clarification). |
| 11 | Footer Logo | `parts/footer.html` | ⭐⭐ Trung bình | Đổi `<img>` logo → `<!-- wp:site-logo -->`. Phần text giữ nguyên. |
| 12 | About Intro | `patterns/about-intro.php` | ⭐⭐ Trung bình | Heading + paragraph + ảnh tĩnh. |
| 13 | About Amenities | `patterns/about-amenities.php` | ⭐ Đơn giản | Card grid text tĩnh. |
| 14 | About Testimonials | `patterns/about-testimonials.php` | ⭐⭐ Trung bình | Card với text + ảnh avatar. |
| 15 | About Gallery | `patterns/about-gallery.php` | ⭐⭐ Trung bình | Grid ảnh tĩnh → `<!-- wp:image -->`. |
| 16 | About CTA | `patterns/about-cta.php` | ⭐ Đơn giản | Text + button tĩnh. |
| 17 | About Video | `patterns/about-video.php` | ⭐⭐ Trung bình | Có YouTube Lite Embed. |
| 18 | Contact Info | `patterns/contact-info.php` | ⭐ Đơn giản | Text tĩnh. |
| 19 | Contact Form | `patterns/contact-form.php` | ⭐⭐⭐ Phức tạp | Có form HTML → giữ `<!-- wp:html -->` cho form, chuyển wrapper. |
| 20 | Contact Maps | `patterns/contact-maps.php` | ⭐⭐ Trung bình | Có iframe Google Maps → giữ `<!-- wp:html -->` cho iframe. |
| 21 | Policy pages | `patterns/policy-*.php` (3 files) | ⭐ Đơn giản | Text tĩnh nhiều paragraph. |
| 22 | Page 404 | `patterns/page-404.php` | ⭐ Đơn giản | Text + button tĩnh. |
| 23 | Page Content | `patterns/page-content.php` | ⭐⭐ Trung bình | Có `the_content()` PHP. |

### Nhóm B: Giữ nguyên `<!-- wp:html -->` (PHP Logic — Tối ưu trong Feature 07)

| # | Pattern | File | Lý do giữ nguyên |
|:--:|:---|:---|:---|
| 1 | Concept Rooms Nổi Bật | `patterns/concept-rooms.php` | Dùng `$theme_uri` cho ảnh, nội dung hardcode nhưng cần Dynamic Query trong tương lai. |
| 2 | Branches List | `patterns/branches-list.php` | Dùng `$theme_uri` cho ảnh chi nhánh, cần dynamic query CPT `hotel_branch`. |
| 3 | Room Detail Content | `patterns/room-detail-content.php` | PHP logic phức tạp (`WP_Query`, `get_post_meta`, Helpers class). |
| 4 | Room Archive Content | `patterns/room-archive-content.php` | PHP logic phức tạp (filter, pagination, query). |
| 5 | Branch Detail | `patterns/branch-detail.php` | PHP logic phức tạp. |
| 6 | Blog Archive Content | `patterns/blog-archive-content.php` | PHP logic với `WP_Query`. |
| 7 | Blog Single Content | `patterns/blog-single-content.php` | PHP logic với `the_content()`. |
| 8 | Blog Sidebar | `patterns/blog-sidebar.php` | PHP logic. |
| 9 | Gallery Grid | `patterns/gallery-grid.php` | PHP logic + JS interaction. |

### Nhóm C: Template Parts UI (Functional HTML — Giữ nguyên)

| # | Part | File | Lý do giữ nguyên |
|:--:|:---|:---|:---|
| 1 | Mobile Action Bar | `parts/mobile-action-bar.html` | Interactive HTML + JS (5 nút liên hệ). |
| 2 | Desktop Contact Bar | `parts/desktop-contact-bar.html` | Interactive HTML + JS. |
| 3 | Contact Modal | `parts/contact-modal.html` | Interactive Modal + JS dispatcher. |
| 4 | Booking Modal | `parts/booking-modal.html` | Interactive Modal + AJAX. |

---

## 3. USER SCENARIOS & ACCEPTANCE CRITERIA (CHUẨN GHERKIN)

### User Story 1 — Admin Click-to-Edit Text Trực Tiếp (Priority: P1)
> Là Admin/Editor, tôi muốn click vào bất kỳ tiêu đề hoặc đoạn mô tả trên trang chủ trong Site Editor để sửa trực tiếp, thay vì phải mở file mã nguồn PHP.

* **Scenario 1.1 (Edit Section Heading):**
  * **Given:** Admin mở Site Editor → Chọn template `front-page`.
  * **When:** Click vào tiêu đề "Tập trung vào điều khách lo trước khi đặt" trong section "Tại Sao Chọn Mix".
  * **Then:** Tiêu đề chuyển sang editable mode, Admin gõ chữ mới, bấm "Save" → Frontend hiển thị text mới.
  * **Verification:** Refresh frontend, tiêu đề đã cập nhật đúng.

* **Scenario 1.2 (Edit Pricing):**
  * **Given:** Admin đang trong Site Editor ở section "Bảng Giá".
  * **When:** Click vào giá "199k" của gói Superior.
  * **Then:** Giá trị chuyển sang editable, Admin sửa thành "249k", Save.
  * **Verification:** Frontend hiển thị giá mới "249k".

* **Scenario 1.3 (Edit FAQ Question):**
  * **Given:** Admin đang trong Site Editor ở section FAQ.
  * **When:** Click vào câu hỏi "Mix có nhận khách dưới 18 tuổi không?".
  * **Then:** Câu hỏi chuyển sang editable mode.
  * **Verification:** Sửa text, Save, frontend hiển thị text mới.

---

### User Story 2 — Admin Thay Ảnh Bằng Nút Replace (Priority: P1)
> Là Admin, tôi muốn click vào ảnh banner hero hoặc ảnh sự kiện, bấm nút "Replace" để upload ảnh mới từ Media Library mà không cần gọi developer.

* **Scenario 2.1 (Replace Event Image):**
  * **Given:** Admin mở Site Editor → section "Sự Kiện & Trang Trí".
  * **When:** Click vào ảnh sự kiện thứ nhất.
  * **Then:** Toolbar hiện ra với nút "Replace" (hoặc "Thay thế"). Admin chọn ảnh mới → Ảnh cũ được thay thế với responsive srcset.
  * **Verification:** Frontend hiển thị ảnh mới, kích thước responsive đúng.

* **Scenario 2.2 (Replace Logo):**
  * **Given:** Admin mở Site Editor → click vào Logo ở Header.
  * **When:** Toolbar hiện nút "Replace".
  * **Then:** Admin upload logo mới → Logo cập nhật đồng bộ trên cả Header và Footer.
  * **Verification:** Tất cả trang đều hiển thị logo mới.

---

### User Story 3 — Admin Đổi Màu/Font Qua Inspector Controls (Priority: P2)
> Là Admin, tôi muốn thay đổi màu nền, màu chữ hoặc font chữ của một section bằng panel bên phải trong Site Editor.

* **Scenario 3.1 (Change Section Background Color):**
  * **Given:** Admin click vào Group block "Tại Sao Chọn Mix".
  * **When:** Mở Inspector Controls (panel bên phải) → Color Settings.
  * **Then:** Thấy bảng màu `theme.json` (Dark Primary, Dark Secondary, Luxury Gold...). Chọn "Dark Tertiary" → Background section đổi thành `#22222a`.
  * **Verification:** Frontend hiển thị background mới. CSS token `--wp--preset--color--dark-tertiary` được áp dụng.

---

### User Story 4 — Layout Bảo Vệ Không Cho Admin Xóa Nhầm (Priority: P2)
> Là Developer, tôi muốn khóa các section wrapper để Admin không vô tình xóa hoặc kéo nhầm toàn bộ section ra khỏi trang.

* **Scenario 4.1 (Lock Section):**
  * **Given:** Admin click vào section Group "Bảng Giá" trong Site Editor.
  * **When:** Nhấp chuột phải hoặc mở Options menu.
  * **Then:** Tùy chọn "Move" và "Remove" bị disable (greyed out). Admin vẫn có thể click-to-edit nội dung bên trong.

---

### User Story 5 — Giao Diện Frontend Giữ Nguyên 100% (Priority: P0 — Bất biến)
> Là khách hàng truy cập website, tôi muốn mọi thứ trên frontend trông giống hệt phiên bản hiện tại — không bị vỡ layout, mất CSS, mất animation.

* **Scenario 5.1 (Visual Regression):**
  * **Given:** Snapshot ảnh chụp toàn trang frontend trước khi refactor.
  * **When:** Hoàn thành refactor và load lại frontend.
  * **Then:** So sánh visual: layout, màu sắc, typography, spacing, responsive phải đạt ≥ 98% tương đồng.
  * **Verification:** Chụp screenshot trước/sau so sánh.

---

## 4. RÀO CẢN KỸ THUẬT VÀ GIẢI PHÁP

### 4.1. CSS Class `wp-block-*` tự động thêm bởi Gutenberg
* **Vấn đề:** Khi dùng `<!-- wp:group -->`, Gutenberg tự thêm class `wp-block-group` vào thẻ `<div>`. Class này có thể gây xung đột với CSS hiện tại.
* **Giải pháp:** Kiểm tra và thêm CSS reset cho `wp-block-group`, `wp-block-heading`, `wp-block-image` nếu cần:
  ```css
  /* Reset Gutenberg defaults nếu can thiệp */
  .mix-section .wp-block-group { margin: 0; padding: 0; }
  .mix-section .wp-block-heading { margin: 0; }
  ```

### 4.2. Inline Styles trong Gutenberg Block Markup
* **Vấn đề:** Nhiều pattern hiện tại dùng inline `style="..."` trên thẻ HTML. Gutenberg lưu inline styles qua JSON attributes (`style` prop), có format khác.
* **Giải pháp:** Chuyển inline styles sang CSS class. Tạo utility classes mới trong `sections.css` nếu cần:
  ```css
  .mix-flex-between { display: flex; justify-content: space-between; align-items: center; }
  .mix-grid-4col { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
  ```

### 4.3. Thẻ `<section>` với `tagName`
* **Vấn đề:** Gutenberg Core `<!-- wp:group -->` mặc định render `<div>`. Pattern hiện tại dùng `<section>` có semantic HTML.
* **Giải pháp:** Sử dụng thuộc tính `"tagName":"section"` trong block attributes:
  ```html
  <!-- wp:group {"tagName":"section","className":"mix-section mix-section--dark-2"} -->
  <section class="wp-block-group mix-section mix-section--dark-2">
  ```

### 4.4. Accordion/Details Element
* **Vấn đề:** WordPress 6.6+ có native `<!-- wp:details -->` block, nhưng behavior và styling có thể khác custom implementation hiện tại.
* **Giải pháp:** Giữ `<!-- wp:html -->` cho phần `<details>` bên trong FAQ pattern, chỉ chuyển section wrapper và heading thành Core Blocks. Đánh giá chuyển sang `<!-- wp:details -->` trong phase POC.

### 4.5. Forms trong Patterns
* **Vấn đề:** `hero-booking.php` và `contact-form.php` chứa `<form>` với `wp_nonce_field()` (PHP function). Core Blocks không hỗ trợ inline PHP.
* **Giải pháp:** Giữ phần `<form>` bên trong `<!-- wp:html -->`, chỉ chuyển phần wrapper (section, heading, description) sang Core Blocks.

---

## 5. DEFINITION OF DONE (NGHIỆM THU)

Mỗi component được coi là hoàn thành khi đáp ứng **tất cả** tiêu chí sau:

- [ ] **Admin Editability:** Click vào text trong Site Editor → editable mode hoạt động đúng.
- [ ] **Image Replaceability:** Click vào ảnh trong Site Editor → nút "Replace" xuất hiện và hoạt động.
- [ ] **Inspector Controls:** Click vào block → panel bên phải hiện Color, Typography, Spacing settings.
- [ ] **Layout Lock:** Section wrapper có `"lock":{"move":true,"remove":true}` ngăn xóa/kéo nhầm.
- [ ] **CSS Preservation:** Frontend sau refactor giống hệt ≥ 98% so với trước refactor (visual comparison).
- [ ] **PHP Lint Clean:** `php -l <file>` pass không lỗi.
- [ ] **No Runtime Errors:** `wp-content/debug.log` không có Warning/Notice/Fatal mới.
- [ ] **Responsive Intact:** Kiểm tra 360px, 768px, 1200px — không vỡ layout, không horizontal scroll.
