# IMPLEMENTATION PLAN: 02 - HOMEPAGE AND BOOKING MODAL

**Input:** `specs/02-homepage-and-booking-modal/spec.md`, `contracts/`, `docs/design-tokens-spec.md`, `docs/system-architecture.md`  
**Constitution Check:** Tuân thủ 100% nguyên tắc trong `AGENTS.md` (FSE Block Theme, không sửa core, dùng Design Tokens, không hardcode màu, Nonce/Sanitize cho form).  
**Prototype Ground Truth:** `ui/src/app/page.tsx` và `ui/src/components/`

---

## 1. CONSTITUTION CHECK (KIỂM TRA TUÂN THỦ HIẾN PHÁP DỰ ÁN)

| Điều khoản trong `AGENTS.md` | Đánh giá | Ghi chú thực thi |
| :--- | :---: | :--- |
| **Dùng FSE Block Theme** | PASS | Toàn bộ sections trang chủ triển khai bằng Block Patterns + Template Parts trong `mixhotel-theme/` |
| **Không sửa Core / Vendor** | PASS | 100% code nằm trong theme và plugin. Không sửa `wp-admin/`, `wp-includes/` |
| **Dùng Design Tokens tập trung** | PASS | CSS sử dụng `var(--wp--preset--color--*)`, `var(--wp--preset--font-size--*)`, `var(--wp--preset--spacing--*)` — không hardcode hex |
| **Không cài plugin bên thứ 3** | PASS | Modal, dropdown, accordion, lite-embed đều viết Vanilla JS thuần |
| **Bảo mật Form & API** | PASS | Form hero-booking có nonce field, honeypot field. Submit Spec 02 chỉ mở Zalo link (chưa gọi AJAX). Backend AJAX sẽ nằm ở Spec 04 |
| **Sanitization & Escaping** | PASS | Pattern files `.php` sử dụng `esc_html()`, `esc_url()`, `esc_attr()` cho mọi output |

---

## 2. KIẾN TRÚC FILE & COMPONENT

### 2.1. Cấu trúc thư mục sau khi hoàn thành Spec 02

```
wp-content/themes/mixhotel-theme/
├── style.css                                    # [MODIFY] Thêm @import cho CSS modules
├── theme.json                                   # [GIỮA NGUYÊN] Đã hoàn thành ở Spec 01
├── functions.php                                # [NEW] Enqueue scripts/styles, register patterns
├── assets/
│   ├── css/
│   │   ├── header.css                           # [NEW] Header desktop + mobile styles
│   │   ├── mobile-bar.css                       # [NEW] Sticky Mobile Action Bar styles
│   │   ├── desktop-contact-bar.css              # [NEW] Desktop floating contact bar
│   │   ├── modal.css                            # [NEW] Contact Modal styles
│   │   ├── hero.css                             # [NEW] Hero Section styles
│   │   └── sections.css                         # [NEW] Tất cả remaining sections
│   ├── js/
│   │   ├── contact-modal.js                     # [NEW] Modal open/close/ESC/overlay dispatcher
│   │   ├── header-scroll.js                     # [NEW] Sticky header on scroll detection
│   │   ├── faq-accordion.js                     # [NEW] FAQ expand/collapse
│   │   └── youtube-lite.js                      # [NEW] Lite Embed click-to-load iframe
│   └── images/                                  # [NEW] Copy từ ui/public/images/ (chỉ các file cần thiết)
│       ├── hero-bg.webp
│       ├── mix-boutique-logo.png
│       ├── photo-stage-featured.webp
│       ├── photo-tile-*.webp
│       ├── branch-*.webp
│       ├── event-*.jpg
│       ├── final-cta-bg.jpg
│       ├── icon-*.svg
│       ├── icon-*.webp
│       ├── icon-*.png
│       └── yt-short-*.jpg
├── templates/
│   ├── index.html                               # [GIỮA NGUYÊN]
│   └── front-page.html                          # [MODIFY] Ghép patterns + template parts theo thứ tự
├── parts/
│   ├── header.html                              # [MODIFY] Header hoàn chỉnh với Navigation Block + CTA
│   ├── footer.html                              # [MODIFY] Footer hoàn chỉnh theo prototype
│   ├── mobile-action-bar.html                   # [NEW] Thanh cố định mobile 5 nút
│   ├── desktop-contact-bar.html                 # [NEW] Thanh contact nổi desktop
│   └── contact-modal.html                       # [NEW] Modal chọn chi nhánh liên hệ
└── patterns/
    ├── hero-booking.php                         # [NEW] Hero + Form
    ├── real-photos-grid.php                     # [NEW] Ảnh thật grid
    ├── video-showcase.php                       # [NEW] Video YouTube Lite
    ├── concept-rooms.php                        # [NEW] Phòng concept nổi bật
    ├── branches-list.php                        # [NEW] 3 chi nhánh
    ├── why-choose-us.php                        # [NEW] Tại sao chọn Mix
    ├── pricing-table.php                        # [NEW] Bảng giá
    ├── events-decoration.php                    # [NEW] Sự kiện & trang trí
    ├── booking-steps.php                        # [NEW] 3 bước đặt phòng
    ├── faq-accordion.php                        # [NEW] FAQ accordion
    └── final-cta.php                            # [NEW] Final CTA
```

---

## 3. CÁC HỢP ĐỒNG KỸ THUẬT (CONTRACTS)

1. **`contracts/modal-interaction.contract.json`**: Khóa cứng ID, class, data attributes, z-index, events và accessibility rules cho Contact Modal.
2. **`contracts/booking-form.contract.json`**: Khóa cứng field names, validation patterns, sanitization functions, và hành vi submit cho cả Spec 02 (Zalo redirect) và Spec 04 (AJAX backend).
3. **`contracts/patterns-manifest.contract.json`**: Khóa cứng danh sách 11 Block Patterns + 5 Template Parts, slug, mapping nguồn component, và thứ tự lắp ghép front-page.

---

## 4. CHIẾN LƯỢC STYLING (CSS Architecture)

### 4.1. Nguyên tắc chuyển đổi từ Tailwind sang Vanilla CSS

Prototype `ui/` sử dụng Tailwind CSS utilities + CSS file `mixhotel-luxury.css` (647KB). Chiến lược chuyển đổi:

1. **Không nhúng Tailwind runtime** vào WordPress.
2. **Trích xuất CSS chuẩn** từ prototype CSS file `ui/src/app/mixhotel-luxury.css` — đây là file CSS gốc đã chứa toàn bộ class `.mixLuxury*`, `.mixPremium*`, `.mixBranches*` với thuộc tính sẵn.
3. **Thay thế hardcoded hex** bằng CSS Variables: `#0f0f12` → `var(--wp--preset--color--dark-primary)`, `#c5a880` → `var(--wp--preset--color--luxury-gold)`, v.v.
4. **Phân chia theo module** (header/modal/hero/sections) để dễ bảo trì, tổng ≤ 80KB minified.

### 4.2. Thang Z-Index chuẩn (Tuân thủ BUG-05)

```css
:root {
  --z-content:        1;
  --z-sticky-header:  100;
  --z-desktop-bar:    50;
  --z-mobile-bar:     500;
  --z-modal-overlay:  1000;
  --z-modal-content:  1050;
  --z-toast:          2000;
}
```

---

## 5. CHIẾN LƯỢC JAVASCRIPT (Vanilla JS Architecture)

Tổng cộng 4 file JS nhỏ, tổng ≤ 15KB minified:

| File | Mục đích | Kích thước ước tính |
| :--- | :--- | :--- |
| `contact-modal.js` | Mở/đóng modal, dispatcher theo contact type, ESC/overlay close, body lock, focus trap | ~4KB |
| `header-scroll.js` | Detect scroll > 30px → toggle sticky class, mobile drawer open/close | ~2KB |
| `faq-accordion.js` | Toggle expand/collapse cho FAQ items | ~1KB |
| `youtube-lite.js` | Click thumbnail → replace với YouTube iframe (facade pattern) | ~2KB |

**Enqueue strategy:** Tất cả JS được enqueue với `wp_enqueue_script()` trong `functions.php`, đặt `in_footer: true`, `strategy: 'defer'` để không block render.

---

## 6. CHIẾN LƯỢC ASSET PIPELINE

### 6.1. Đồng bộ hình ảnh từ `ui/public/images/`

Chỉ copy các file thực sự cần dùng (không copy duplicate):

| Nhóm | Files | Mục đích |
| :--- | :--- | :--- |
| Hero | `hero-bg.webp` | Background Hero Section |
| Logo | `mix-boutique-logo.png` | Header + Footer |
| Photo Tiles | `photo-stage-featured.webp`, `photo-tile-*.webp/.jpg` | Section Ảnh thật |
| Video Thumbs | `yt-short-1.jpg`, `yt-short-2.jpg` | Section Video |
| Branch Photos | `branch-*.webp` | Section Chi nhánh |
| Events | `event-*.jpg` | Section Sự kiện |
| Final CTA | `final-cta-bg.jpg` | Section CTA cuối |
| Icons Mobile Bar | `icon-home.svg`, `icon-messenger-bottom.svg`, `icon-phone-bottom.svg`, `icon-zalo-bottom.png`, `icon-sms.svg` | Sticky Mobile Action Bar |
| Icons Desktop Bar | `24-icon-2.webp`, `24-icon-3.webp`, `phone_item_2.svg` | Desktop Contact Bar |
| Footer | `bgFooter.webp`, `bo-cong-thuong.webp`, `dmca-badge.png` | Footer Section |

---

## 7. VERIFICATION PLAN (PHƯƠNG PHÁP KIỂM CHỨNG)

### 7.1. Automated Checks
* **PHP Syntax:** `php -l <file>` cho mỗi file `.php` mới (functions.php, patterns/*.php).
* **JSON Syntax:** PowerShell `ConvertFrom-Json` cho `theme.json` (nếu sửa đổi).
* **CSS Validation:** Kiểm tra không có thuộc tính CSS lỗi (Firefox Inspector / stylelint nếu có).
* **JS Lint:** `node --check <file>` kiểm tra syntax.
* **WP Debug Log:** Đảm bảo `wp-content/debug.log` không có Warning/Notice/Fatal sau khi tải trang chủ.

### 7.2. Manual Verification (Gate 2 — POC Approval)
* **Visual Comparison:** So sánh song song trang chủ WordPress (port 8888) với prototype Next.js (port 3000). Đạt yêu cầu: layout, màu sắc, typography, spacing tương đương ≥ 90%.
* **Responsive Test:**
  * Desktop ≥ 992px: Header đa cấp, Desktop Contact Bar, grid 2-3 cột.
  * Tablet 576-991px: Menu rút gọn, grid 2 cột.
  * Mobile < 576px: Mobile Action Bar, grid 1 cột, dropdown drawer.
  * Mobile Small 360px: Không tràn horizontal scroll, text không bị crop.
* **Interaction Test:**
  * Click mọi nút CTA → Contact Modal mở đúng kênh.
  * Đóng Modal bằng X, ESC, overlay click.
  * Hero Form validate + submit → Zalo link pre-filled.
  * FAQ accordion toggle.
  * YouTube Lite click → iframe load.
  * Scroll → Header sticky.
  * Nút "Về đầu trang" trên Desktop Contact Bar.
