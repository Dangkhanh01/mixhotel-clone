# FEATURE SPECIFICATION: 02 - HOMEPAGE AND BOOKING MODAL

**Feature Branch:** `feat/02-homepage-and-booking-modal`  
**Status:** Ready for Planning & Implementation  
**Feature Scope:** Chuyển hóa toàn bộ giao diện trang chủ từ Next.js prototype (`ui/`) sang WordPress FSE Block Theme (`mixhotel-theme`) với Header đa cấp, Sticky Mobile Action Bar, Contact Modal chọn chi nhánh, Hero Booking Form, và 12 Content Sections trang chủ. Mọi tương tác viết bằng Vanilla JS thuần.

**Prototype Source (Living Ground Truth):** `ui/src/app/page.tsx` và `ui/src/components/`

---

## 1. CLARIFICATIONS (GỠ BỎ ĐIỂM MƠ HỒ)

* **Q: Các section trên trang chủ sẽ là Block Template cứng hay Block Patterns?**
  * **A:** Đăng ký dưới dạng **Block Patterns** trong `patterns/` (file `.php` sử dụng `register_block_pattern`) để người biên tập có thể tùy biến qua Site Editor. Sau đó lắp ghép mặc định vào `templates/front-page.html` bằng Block Pattern Inserter (`<!-- wp:pattern {"slug":"mixhotel/hero-booking"} /-->`).

* **Q: Xử lý tương tác Modal và Dropdown Menu như thế nào?**
  * **A:** Viết bằng Vanilla JS (không jQuery, không React runtime trên WordPress).
    * Mở/Đóng Modal bằng toggle class `is-active` trên `<body>` và phần tử modal.
    * Bẫy phím `Escape` để đóng modal.
    * Click overlay (backdrop) để đóng modal.
    * Chống cuộn nền bằng `body.classList.add('modal-open')` → CSS `overflow: hidden`.
    * Mọi nút CTA sử dụng `data-contact-action="zalo|phone|messenger|sms|booking"` và `data-branch-id` để JS dispatcher mở đúng kênh liên hệ.

* **Q: Hình ảnh từ `ui/public/images/` được quản lý thế nào trên WordPress?**
  * **A:** Các hình ảnh tĩnh dùng cho giao diện (hero-bg, icon, branch photos, photo tiles) được copy sang `wp-content/themes/mixhotel-theme/assets/images/`. Ảnh liên quan đến nội dung động (ảnh phòng, sự kiện) sẽ được upload qua WordPress Media Library trong các spec sau.

* **Q: CSS styling từ Tailwind trong prototype sẽ được chuyển đổi thế nào?**
  * **A:** KHÔNG nhúng Tailwind runtime vào WordPress. Toàn bộ class Tailwind được chuyển đổi thủ công sang Vanilla CSS thuần, sử dụng CSS Variables từ `theme.json` (`--wp--preset--color--*`, `--wp--preset--spacing--*`, `--wp--preset--font-size--*`). CSS được tổ chức theo module: `header.css`, `mobile-bar.css`, `modal.css`, `hero.css`, `sections.css`.

* **Q: Form "Giữ phòng nhanh" ở Hero Section xử lý submit thế nào?**
  * **A:** Trong Spec 02 này, form chỉ hiển thị giao diện (HTML + CSS + Client-side validation). Nút submit sẽ mở Contact Modal chọn chi nhánh → redirect sang Zalo chat với nội dung pre-filled. Xử lý AJAX backend thật sẽ nằm trong `specs/04-booking-engine-and-leads/`. Tuy nhiên, markup và `name` attributes của form fields được khóa cứng trong contract từ bây giờ để đảm bảo tương thích.

* **Q: Header Desktop có dropdown menu nhiều cấp, thực hiện bằng gì?**
  * **A:** Dùng WordPress Block `<!-- wp:navigation -->` kết hợp CSS custom cho dropdown styling. Menu items và cấu trúc đa cấp được cấu hình qua WP Admin → Appearance → Menus (hoặc Navigation Block trong Site Editor). JS chỉ xử lý scroll-detection (sticky header class), tất cả hover/focus dropdown dùng CSS thuần (`:hover`, `:focus-within`).

* **Q: YouTube video embedding có tối ưu cho Core Web Vitals không?**
  * **A:** Sử dụng kỹ thuật **YouTube Lite Embed** (Facade Pattern): chỉ hiển thị thumbnail + nút Play, chỉ tải iframe YouTube khi user click. Giảm ~500KB initial load.

---

## 2. USER SCENARIOS & ACCEPTANCE CRITERIA (CHUẨN GHERKIN)

### User Story 1 — Header Desktop Đa Cấp & Sticky on Scroll (Priority: P1)
> Là khách truy cập desktop, tôi muốn thanh menu luôn hiển thị và có dropdown liên kết đến các chi nhánh, tin tức, chính sách để dễ dàng điều hướng.

* **Scenario 1.1 (Header ban đầu — trạng thái chưa cuộn):**
  * **Given:** Khách mở trang chủ trên desktop (≥ 992px).
  * **When:** Trang vừa tải xong.
  * **Then:** Header hiển thị gồm Logo (trái), Navigation menu (giữa) với các mục [Giới thiệu, Khách sạn tình yêu ▼, Gallery, Tin tức ▼, Sự kiện, Chính sách ▼, Liên hệ], và nút "ĐẶT PHÒNG" (phải).

* **Scenario 1.2 (Sticky Header khi cuộn):**
  * **Given:** Khách đang ở bất kỳ vị trí nào trên trang, đã cuộn quá 30px.
  * **When:** Cuộn trang.
  * **Then:** Header nhận class `mixPremiumMenuScrolled`, background chuyển sang `dark-secondary` đặc, đổ bóng xuất hiện, logo thu nhỏ.

* **Scenario 1.3 (Dropdown Menu):**
  * **Given:** Khách di chuột vào mục "KHÁCH SẠN TÌNH YÊU".
  * **When:** Hover hoặc focus vào mục đó.
  * **Then:** Dropdown xuất hiện với 3 mục chi nhánh: Mix Boutique Premium, Mix 256B Đặng Tiến Đông, Mix 20 Phúc La Hà Đông. Click vào mục → điều hướng đến trang chi nhánh tương ứng.

---

### User Story 2 — Sticky Mobile Action Bar (Priority: P1)
> Là khách truy cập bằng điện thoại, tôi muốn luôn thấy thanh liên hệ nhanh ở đáy màn hình để gọi điện, nhắn Zalo hoặc Messenger bất cứ lúc nào.

* **Scenario 2.1 (Hiển thị bar):**
  * **Given:** Khách mở trang trên thiết bị mobile (< 992px).
  * **When:** Trang tải xong.
  * **Then:** Thanh Action Bar cố định ở đáy màn hình với 5 mục: [Trang chủ, Messenger, Phone (nút tròn vàng nhô cao), Zalo, Tin nhắn]. Bar có nền sáng `#f2f2f2`, đổ bóng hướng lên, không che khuất nội dung.

* **Scenario 2.2 (Nút Phone pulse animation):**
  * **Given:** Thanh Action Bar đang hiển thị.
  * **When:** Khách nhìn vào thanh.
  * **Then:** Nút Phone ở giữa có hình tròn vàng `#f3bf01`, nhô cao hơn các nút khác `-top-5`, icon điện thoại có animation lắc lư (wobble).

* **Scenario 2.3 (Mở Contact Modal từ Action Bar):**
  * **Given:** Khách bấm vào nút Zalo trên Action Bar.
  * **When:** Click.
  * **Then:** Contact Modal mở lên hiển thị danh sách 3 chi nhánh, mỗi chi nhánh có nút "Nhắn Zalo Tư Vấn".

---

### User Story 3 — Contact Modal Chọn Chi Nhánh (Priority: P1)
> Là khách muốn liên hệ, tôi muốn chọn chi nhánh gần nhất để liên lạc đúng số điện thoại/Zalo.

* **Scenario 3.1 (Mở Modal):**
  * **Given:** Khách click bất kỳ nút CTA nào có `data-contact-action`.
  * **When:** Click.
  * **Then:** Modal xuất hiện với overlay `backdrop-filter: blur(8px)`, background `rgba(0,0,0,0.8)`. Body bị khóa cuộn. Modal nội dung gồm: tiêu đề "Chọn Chi Nhánh Gần Bạn", 3 thẻ chi nhánh (mỗi thẻ có tên, địa chỉ, nút hành động).

* **Scenario 3.2 (Hành động theo kênh):**
  * **Given:** Modal đang mở với `contactType = "phone"`.
  * **When:** Khách click thẻ chi nhánh.
  * **Then:** Mở `tel:+84383104010` (tương ứng chi nhánh đã chọn). Nút hiển thị "Gọi: 038 310 4010".

* **Scenario 3.3 (Đóng Modal):**
  * **Given:** Modal đang mở.
  * **When:** Khách nhấn `Escape`, click overlay, hoặc click nút `X`.
  * **Then:** Modal đóng, body mở khóa cuộn, trạng thái trở lại bình thường.

---

### User Story 4 — Hero Section với Form Giữ Phòng (Priority: P1)
> Là khách truy cập lần đầu, tôi muốn ngay lập tức thấy lời giới thiệu hấp dẫn và form đặt phòng nhanh để gửi yêu cầu giữ phòng.

* **Scenario 4.1 (Layout Hero):**
  * **Given:** Khách mở trang chủ.
  * **When:** Trang tải xong.
  * **Then:** Hero Section hiển thị gồm: background ảnh full-width (hero-bg.webp), gradient veil từ dưới lên, cột trái (Kicker "KHÁCH SẠN TÌNH YÊU TẠI HÀ NỘI" + H1 + mô tả + 2 nút CTA + 4 stat cards), cột phải (Form Card "TƯ VẤN TỨC THÌ").

* **Scenario 4.2 (Form Validation Client-side):**
  * **Given:** Khách để trống ô "Họ tên" hoặc "Điện thoại".
  * **When:** Bấm "GỬI YÊU CẦU GIỮ PHÒNG".
  * **Then:** Form không submit, hiển thị validation HTML5 native `required`. Nếu SĐT không đúng pattern `^(0[3|5|7|8|9])+([0-9]{8})$` thì báo lỗi.

* **Scenario 4.3 (Form Submit mở Contact Modal):**
  * **Given:** Khách điền đầy đủ Họ tên, SĐT hợp lệ, chọn Chi nhánh và Nhu cầu.
  * **When:** Bấm "GỬI YÊU CẦU GIỮ PHÒNG".
  * **Then:** Contact Modal mở với kênh Zalo, text message pre-filled: `"Chào Mix, tôi là [Tên] ([SĐT]), muốn đặt phòng tại [Chi nhánh], gói: [Nhu cầu]"`.

---

### User Story 5 — 12 Content Sections Trang Chủ (Priority: P1)
> Là khách duyệt trang, tôi muốn xem đầy đủ thông tin: ảnh thật phòng thật, video phòng, concept phòng nổi bật, hệ thống chi nhánh, bảng giá, sự kiện, quy trình đặt phòng, FAQ, và footer.

* **Scenario 5.1 (Section "Ảnh thật phòng thật" — Real Photos Grid):**
  * **Given:** Khách cuộn đến section Real Photos.
  * **When:** Section xuất hiện trong viewport.
  * **Then:** Hiển thị grid 2 cột: cột trái là ảnh featured lớn (min-h 520px desktop), cột phải gồm 5 tile (1 tile lớn 2 cột + 4 tile nhỏ). Mỗi tile có kicker badge, tên concept, hiệu ứng hover scale 110%.

* **Scenario 5.2 (Section "Video phòng thật" — Video Showcase):**
  * **Given:** Khách cuộn đến section Video.
  * **When:** Click vào thumbnail video.
  * **Then:** Video Modal mở (overlay đen), iframe YouTube embed hiển thị autoplay. Click overlay hoặc nút X để đóng.

* **Scenario 5.3 (Desktop Contact Bar — Thanh liên hệ nổi bên phải):**
  * **Given:** Khách duyệt trang trên desktop (≥ 768px).
  * **When:** Trang tải.
  * **Then:** Thanh contact cố định bên phải màn hình (60% từ top, `z-index: 50`) chứa 3 mục: [Chat Face (Messenger), Chat Zalo, Phone]. Khi cuộn quá 200px xuất hiện thêm nút "Về đầu trang".

---

## 3. EDGE CASES (TÌNH HUỐNG BIÊN)

1. **Thanh địa chỉ mobile co/giãn (iOS Safari):** Sử dụng `100dvh` kèm fallback `100vh` cho Hero Section và Modal (tuân thủ `BUG-04` trong `wordpress-bug-prevention/SKILL.md`).
2. **Xung đột z-index giữa Mobile Bar và Modal:** Áp dụng thang z-index chuẩn từ `BUG-05`: Mobile Bar = `z-index: 500`, Modal Overlay = `z-index: 1000`, Modal Content = `z-index: 1050`.
3. **Font chưa tải xong (FOUT):** Font Questrial/Roboto được khai báo trong `theme.json` với `font-display: swap`. Header text không bị giật khi font async tải xong.
4. **Trang chủ quá dài trên Mobile:** Mỗi section phải `overflow: hidden` để tránh horizontal scroll do element con tràn. Kiểm tra trên viewport 360px.
5. **Nút Phone wobble animation gây lag:** Animation CSS `@keyframes wobble-phone` chỉ áp dụng `transform: rotate()`, không dùng `left/top/margin` để đảm bảo GPU compositing.
6. **WordPress Site Editor render sai Block Pattern:** Luôn validate HTML comment syntax chính xác cho WordPress Block Grammar (`<!-- wp:... -->`).
7. **Ảnh hero-bg.webp quá nặng trên 3G:** Sử dụng `loading="eager"` + `fetchpriority="high"` chỉ cho hero-bg, các ảnh còn lại dùng `loading="lazy"`.

---

## 4. REQUIREMENTS

### Functional Requirements
* **FR-001:** Trang chủ (`front-page.html`) phải hiển thị đầy đủ 12 sections theo đúng thứ tự trong prototype `ui/src/app/page.tsx`.
* **FR-002:** Contact Modal phải hỗ trợ 5 kênh liên hệ: `phone`, `zalo`, `messenger`, `sms`, `booking`.
* **FR-003:** Hero Booking Form phải có 4 trường: Họ tên (required), Điện thoại (required, pattern VN), Chi nhánh (select 3 options), Nhu cầu (select 4 options).
* **FR-004:** Mobile Action Bar chỉ hiển thị trên viewport < 992px (ẩn bằng CSS `display: none` trên desktop).
* **FR-005:** Desktop Contact Bar chỉ hiển thị trên viewport ≥ 768px.
* **FR-006:** Header Desktop phải có dropdown menu cho 3 nhóm: Khách sạn tình yêu (3 chi nhánh), Tin tức (7 danh mục), Chính sách (3 trang).
* **FR-007:** YouTube video phải sử dụng Lite Embed (thumbnail + click-to-load iframe).

### Non-Functional Requirements
* **NFR-001:** Tổng dung lượng CSS modules (header + mobile-bar + modal + hero + sections) không vượt quá 80KB minified.
* **NFR-002:** Vanilla JS cho modal + interactions không vượt quá 15KB minified.
* **NFR-003:** Lighthouse Performance score trên mobile ≥ 75 trên môi trường Docker local.
* **NFR-004:** Không phát sinh PHP Warning/Notice/Fatal trong `WP_DEBUG_LOG`.
* **NFR-005:** Mọi màu sắc phải sử dụng CSS Variables `var(--wp--preset--color--*)` thay vì hardcode hex.
