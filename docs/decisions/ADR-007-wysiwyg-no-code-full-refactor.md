# ADR-007: Chiến Lược Chuyển Đổi Toàn Diện No-code WYSIWYG Figma-Style (Feature 07)

* **Status:** Proposed
* **Date:** 2026-09-28
* **Deciders:** Engineering Team / AI Agent
* **Technical Context:** `specs/07-wysiwyg-no-code-full-refactor/spec.md`, `specs/07-wysiwyg-no-code-full-refactor/plan.md`, `AGENTS.md`, `docs/decisions/ADR-006-fse-refactor-strategy.md`

---

## 1. Ngữ Cảnh (Context)

Feature 06 (ADR-006) đã chuyển đổi thành công 23+ Block Patterns tĩnh sang WordPress Native Core Blocks, tuy nhiên vẫn còn nhiều thành phần giao diện phức hợp bị đóng gói trong `<!-- wp:html -->`:

### Vấn đề còn tồn đọng sau Feature 06:
1. **Banner hình ảnh** (`about-intro.php`): Ảnh banner không có nút "Replace" trong Gutenberg.
2. **Lưới ảnh phòng thật** (`real-photos-grid.php`): 6 ảnh tĩnh trong `<img>`, không thể thay từng ảnh.
3. **Card danh sách phòng concept** (`concept-rooms.php`): Tên phòng, giá tiền, ảnh phòng không click-to-edit.
4. **Card chi nhánh** (`branches-list.php`): Địa chỉ, hotline, ảnh chi nhánh không sửa trực quan.
5. **Bảng giá** (`pricing-table.php`): Biểu phí dịch vụ hardcode trong HTML.
6. **FAQ accordion** (`faq-accordion.php`): Câu hỏi/trả lời trong `<details>` thô.
7. **Các nút CTA**: Sử dụng `data-contact-action` cùng Vanilla JS dispatcher, không phải Core Block.
8. **Kho ảnh**: Ảnh gốc nằm trong thư mục theme (`assets/images/`), chưa được nhập vào WordPress Media Library.

---

## 2. Các Quyết Định Kiến Trúc (Architectural Decisions)

### Quyết định 1: Chuyển đổi toàn diện sang Core Blocks (không phải Custom Blocks)
* Sử dụng 100% WordPress Native Core Blocks: `wp:cover`, `wp:image`, `wp:group`, `wp:columns`, `wp:column`, `wp:heading`, `wp:paragraph`, `wp:buttons`, `wp:button`, `wp:details`.
* **Lý do:** Không tạo phụ thuộc vào build tooling (React/JSX), đảm bảo khả năng tương thích với mọi phiên bản WordPress tương lai, tối ưu hiệu năng tải trang.
* **CHỈ giữ lại `<!-- wp:html -->`** cho: Form đặt phòng AJAX (cần `wp_nonce_field()` + honeypot), Google Maps iframe embed, Hero Booking (tối ưu LCP).

### Quyết định 2: Auto Media Importer trước khi chuyển đổi blocks
* Tạo helper `mixhotel_import_theme_images_to_media_library()` trong `inc/seed-pages.php`.
* Quét `assets/images/` → Tạo Attachment Post cho mỗi ảnh → Trả về mapping `[filename => attachment_id]`.
* **Lý do:** Các khối `wp:image` và `wp:cover` yêu cầu `id` (Attachment ID) để kích hoạt nút "Replace" trong Media Library. Nếu không có ID, nút Replace sẽ không xuất hiện.

### Quyết định 3: Block Locking 2 tầng (Khóa container, Mở nội dung)
* **Tầng 1 — Khóa:** Tất cả container block cấp cao (Section wrappers, `wp:columns`, Card `wp:group`) có `"lock":{"move":true,"remove":true}`.
* **Tầng 2 — Mở:** Tất cả nội dung con (text, ảnh, nút bấm) được mở khóa 100% để click sửa trực tiếp.
* **Lý do:** Cân bằng giữa tự do chỉnh sửa nội dung và bảo vệ cấu trúc CSS layout khỏi bị phá vỡ.

### Quyết định 4: Chuyển nút CTA từ `data-contact-action` sang `wp:button` + Event Delegation
* Mọi nút CTA chuyển thành `<!-- wp:button -->` chuẩn.
* Admin có thể sửa nhãn chữ và URL trên nút trực quan.
* JS theme sử dụng event delegation lắng nghe click trên mọi `<a>` hoặc `<button>` có `href="#booking"` hoặc class `.mix-btn-booking` để kích hoạt popup đặt phòng.
* **Lý do:** `wp:button` cho phép no-code edit nhãn + link. Event delegation là cơ chế bền vững hơn `data-*` attributes trên HTML tĩnh vì nó hoạt động khi block content thay đổi trong DB.

### Quyết định 5: FAQ sử dụng Native `core/details` thay vì Custom Accordion
* Chuyển đổi từ `<details>` HTML thô trong `wp:html` sang `<!-- wp:details -->` Core Block.
* Admin click vào câu hỏi hoặc câu trả lời để gõ sửa trực tiếp.
* CSS Dark Luxury (viền vàng, bo góc, hiệu ứng mở/đóng) gắn qua `className: "mix-faq-details"`.
* **Lý do:** `core/details` block (WordPress 6.3+) cung cấp semantic HTML5 `<details>/<summary>` chuẩn, hỗ trợ accessibility tốt, và cho phép click-to-edit nội dung.

---

## 3. Phạm Vi Áp Dụng (Scope)

Triển khai đồng bộ trên toàn bộ hệ thống trang:
* Trang Chủ
* Trang Giới Thiệu
* Trang Liên Hệ
* Trang Gallery
* Trang Tin Tức
* Trang Khách Sạn Tình Yêu
* 3 Trang Chi Nhánh
* 3 Trang Chính Sách

---

## 4. Hệ Quả (Consequences)

### Tích cực:
* **100% No-code:** Admin/Editor nhấp vào bất kỳ thành phần nào (ảnh, text, nút, FAQ) đều có thể sửa trực quan.
* **Media Library tích hợp:** Nút "Thay thế" (Replace) xuất hiện trên mọi ảnh/banner, kho ảnh đã sẵn sàng trong Media Library.
* **Khung bố cục được bảo vệ:** Block Locking ngăn chặn phá vỡ layout.
* **Seeder đồng bộ:** Công cụ "Khôi phục Mẫu Trang" khôi phục chính xác cấu trúc Core Blocks mới.

### Tiêu cực & Biện pháp giảm thiểu:
* **Tăng độ phức tạp block markup:** Số lượng block comment delimiters tăng đáng kể. Biện pháp: Trình duyệt bỏ qua HTML comments, không ảnh hưởng hiệu năng render.
* **Mất tính năng PHP dynamic cho các patterns đã chuyển:** Các pattern `concept-rooms`, `branches-list`, `pricing-table` khi chuyển sang Core Blocks sẽ trở thành nội dung tĩnh trong `post_content`. Biện pháp: Seeder sẽ chịu trách nhiệm nạp dữ liệu đúng; khi dữ liệu thay đổi, admin sửa trực tiếp trên editor.
* **CSS cần bổ sung resets:** Một số Core Blocks có default styles xung đột. Biện pháp: Thêm scoped CSS resets trong `pages-luxury.css` và `editor-custom.css`.

---

## 5. Mối Liên Hệ Với ADR-006

| Khía cạnh | ADR-006 (Feature 06) | ADR-007 (Feature 07) |
|:---|:---|:---|
| **Phạm vi** | 23+ Static Patterns + Logo | Các khối phức hợp còn lại (Banner, Card, Grid, FAQ, CTA buttons) |
| **Chiến lược** | Progressive Migration 4 Waves | 6 Phases tuần tự |
| **CSS** | Preservation Strategy (giữ nguyên) | Kế thừa + bổ sung resets cho block types mới |
| **Media Library** | Chỉ Logo (`custom_logo`) | Import toàn bộ kho ảnh theme |
| **Buttons** | Giữ `data-contact-action` trong `wp:html` | Chuyển sang `wp:button` + Event Delegation `#booking` |
| **FAQ** | Partial refactor (wrapper only) | Full refactor sang `wp:details` |
