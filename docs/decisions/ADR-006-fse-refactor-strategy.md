# ADR-006: Chiến Lược Chuyển Đổi FSE Gutenberg Refactor (No-code Admin UI)

* **Status:** Accepted
* **Date:** 2026-09-26
* **Deciders:** Engineering Team / AI Agent
* **Technical Context:** `specs/06-fse-gutenberg-refactor/spec.md`, `specs/06-fse-gutenberg-refactor/plan.md`, `AGENTS.md`

---

## 1. Ngữ Cảnh (Context)

Website Mix Boutique Hotel đang sử dụng Full Site Editing (FSE) Block Theme (`wp-content/themes/mixhotel-theme/`), tuy nhiên hầu hết các Block Patterns và Template Parts hiện tại đang được bọc nguyên khối trong `<!-- wp:html -->` (Custom HTML Block).

### Vấn đề gặp phải:
1. **Thiếu tính năng No-code Admin:** Quản trị viên/Editor không thể click-to-edit trực tiếp văn bản, tiêu đề, giá phòng hay mô tả trong WordPress Site Editor.
2. **Không thể thay ảnh nhanh (No-code Replaceability):** Ảnh nền hoặc ảnh banner bị hardcode URL trong HTML hoặc PHP, không thể dùng nút "Replace" trong Media Library của Gutenberg.
3. **Mất tác dụng của Gutenberg Inspector Controls:** Editor không thể đổi màu nền, typography, khoảng cách qua theme tokens của `theme.json`.
4. **Nguy cơ lỗi cú pháp:** Khi người dùng muốn chỉnh sửa nội dung, họ buộc phải can thiệp trực tiếp vào mã nguồn PHP/HTML, dễ gây vỡ cấu trúc DOM hoặc lỗi cú pháp.

---

## 2. Các Quyết Định Kiến Trúc (Architectural Decisions)

### Quyết định 1: Áp dụng Progressive Migration (Chuyển đổi 4 Wave có Gate kiểm soát)
* Không refactor ồ ạt toàn bộ 23 patterns cùng lúc.
* Chia thành 4 Wave:
  - **Wave 1 (POC):** 2 components đơn giản nhất (`why-choose-us.php`, `booking-steps.php`).
  - **Wave 2:** Static Content Patterns (text-heavy, pricing, policy, about).
  - **Wave 3:** Components có ảnh và Cover (`final-cta.php`, `events-decoration.php`, `wp:site-logo`).
  - **Wave 4:** Complex Hybrid Patterns (giữ phần tương tác trong `wp:html`, refactor wrapper và heading).
* Mỗi Wave phải vượt qua cổng kiểm tra (Gate Verification) trước khi sang Wave tiếp theo.

### Quyết định 2: Chiến lược CSS Preservation (Bảo toàn 100% CSS hiện có)
* **Không xóa bất kỳ file CSS nào** và **không đổi tên class CSS** hiện có.
* Gắn class CSS cũ vào Core Blocks thông qua thuộc tính `"className"` trong block JSON comment và HTML markup tương ứng.
* Bổ sung CSS resets có phạm vi giới hạn (`.mix-section .wp-block-*`) để loại bỏ margin/padding mặc định của Gutenberg mà không gây ảnh hưởng đến phần còn lại.
* Chuyển đổi inline styles rải rác thành các utility classes chuẩn (`.mix-grid-4col`, `.mix-flex-between`, v.v.).

### Quyết định 3: Phân nhóm và Giữ nguyên `<!-- wp:html -->` cho Dynamic & Complex Hybrid Patterns
* **Nhóm A (Static Content):** Chuyển sang Native Core Blocks (`<!-- wp:group -->`, `<!-- wp:columns -->`, `<!-- wp:heading -->`, `<!-- wp:paragraph -->`, `<!-- wp:image -->`, `<!-- wp:cover -->`).
* **Nhóm B (Dynamic PHP Logic):** Các pattern có `WP_Query`, `get_post_meta()`, helper functions (`concept-rooms.php`, `branches-list.php`, `room-detail-content.php`, `room-archive-content.php`, `blog-*.php`) tiếp tục giữ `<!-- wp:html -->`. Nhóm này sẽ được tối ưu trong Feature 07 bằng Query Loop Block hoặc Block Bindings API.
* **Quyết định cho `hero-booking.php` (T026):** Giữ nguyên `<!-- wp:html -->` theo Phương án an toàn (Safe Option). Lý do: Hero banner phụ thuộc vào 4 lớp background veil/glow tuyệt đối (`.mixLuxuryHeroBg`, `.mixLuxuryHeroVeil`, `.mixLuxuryHeroFloor`, `.mixLuxuryHeroGlow`), tối ưu LCP bằng `loading="eager" fetchpriority="high"`, bố cục CSS grid 2 cột bất đối xứng (`minmax(0, 1.25fr) 420px`), và form đặt phòng AJAX chứa nonce bảo mật `wp_nonce_field()`. Việc can thiệp phân mảnh block vào cấu trúc grid này tiềm ẩn nguy cơ cao gây vỡ layout và tụt điểm LCP Core Web Vitals.

### Quyết định 4: Giữ nguyên Menu Navigation trong Feature 06
* WordPress Core 6.x `<!-- wp:navigation -->` chưa hỗ trợ mượt mà menu đa cấp (multi-level dropdown) kết hợp mobile drawer và CSS custom đặc thù của theme.
* Quyết định: Trong `parts/header.html` và `parts/footer.html`, chỉ refactor thẻ `<img>` logo sang `<!-- wp:site-logo -->`. Cấu trúc menu HTML/JS giữ nguyên và sẽ xem xét chuyển đổi sau khi Gutenberg Core hoàn thiện hơn.

### Quyết định 5: Khóa Bố Cục Bảo Vệ (Layout Lock)
* Nhúng `"lock":{"move":true,"remove":true}` vào các Group block cấp cao nhất (section wrappers) để Admin không vô tình xóa nhầm hoặc kéo lệch bố cục tổng thể của trang.

---

## 3. Hệ Quả (Consequences)

### Tích cực:
* Admin/Editor có thể chỉnh sửa 100% nội dung tĩnh và thay đổi ảnh qua Site Editor UI trực quan.
* Giao diện frontend được bảo toàn nguyên vẹn (≥ 99% visual match).
* Tận dụng tối đa Design Tokens từ `theme.json`.
* Giảm thiểu rủi ro nhờ chiến lược phân wave từng bước.

### Tiêu cực & Biện pháp giảm thiểu:
* **Gutenberg wrapper injection:** Core blocks tự động inject thêm các class như `wp-block-group`, `wp-block-columns` (mặc định flex layout). Biện pháp: Đã viết override rules cho `.mix-grid-4col.wp-block-columns`, `.mixLuxuryStepsGrid.wp-block-columns`, `.mixLuxuryPricingGrid.wp-block-columns` trong `sections.css`.
* **Markup cồng kềnh hơn:** Khối lượng comment delimiters tăng lên. Tuy nhiên trình duyệt bỏ qua comments nên không ảnh hưởng tốc độ render.

---

## 4. Kết Quả Triển Khai Thực Tế (Execution Results)

1. **Wave 1 (POC):** `why-choose-us.php` và `booking-steps.php` chuyển đổi thành công sang Native Core Blocks (`wp:group`, `wp:columns`, `wp:column`, `wp:heading`, `wp:paragraph`), xác thực tính khả thi của chiến lược CSS Preservation.
2. **Wave 2 (Static Patterns):** Chuyển đổi thành công 7 patterns tĩnh (`pricing-table.php`, `page-404.php`, `about-cta.php`, `about-amenities.php`, `contact-info.php`, `policy-booking.php`, `policy-payment.php`, `policy-privacy.php`).
3. **Wave 3 (Images & Cover):** Chuyển đổi `final-cta.php` sang `wp:cover`, `events-decoration.php` sang `wp:image`, `about-intro.php`, `about-gallery.php`, `about-testimonials.php`, và Logo trong `header.html` & `footer.html` sang `wp:site-logo` có hỗ trợ Media Library replace.
4. **Wave 4 (Complex Hybrid Patterns):** Chuyển đổi wrapper & heading cho `faq-accordion.php`, `video-showcase.php`, `real-photos-grid.php`, `contact-form.php`, `contact-maps.php`, `about-video.php`, đồng thời bảo toàn an toàn các thành phần tương tác (forms, modals, players, nonces) trong `wp:html`. Giữ nguyên `hero-booking.php` để đảm bảo tối ưu LCP tuyệt đối.
5. **Độ ổn định hệ thống:**
   * Visual Match: Đạt ≥ 99% trên cả Desktop và Mobile Viewport.
   * Runtime Error Log: `wp-content/debug.log` sạch 100% không cảnh báo hay lỗi PHP.
   * Usability: Đã cấp quyền và kiểm thử Editor role trong Site Editor thành công.
