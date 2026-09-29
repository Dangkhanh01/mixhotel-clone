# SYSTEM ARCHITECTURE: MIX BOUTIQUE HOTEL CLONE

> **Dự án:** Clone giao diện và tính năng `https://mixhotel.vn`  
> **Phương pháp:** Disciplined Vibe Coding (Spec-Driven Development)  
> **Mục tiêu:** Hệ thống website WordPress chuẩn Agency, hiệu năng cao, dễ quản trị, sẵn sàng thương mại.

---

## 1. TỔNG QUAN KIẾN TRÚC HỆ THỐNG

Hệ thống được thiết kế theo mô hình **Tách biệt Trình diễn và Nghiệp vụ (Separation of Presentation & Business Logic)**:

```mermaid
graph TD
    Client["Trình duyệt (Desktop / Mobile)"]
    
    subgraph WordPress_Host ["WordPress Docker Container (PHP 8.2 + Apache)"]
        Theme["Theme: mixhotel-theme (FSE)\n- theme.json (Design Tokens)\n- HTML Templates & Block Patterns\n- Header, Footer, Mobile Sticky Bar"]
        
        Plugin["Plugin: mixhotel-core (Nghiệp vụ)\n- CPT: hotel_room, hotel_branch, booking_lead\n- Taxonomies: room_amenity, room_concept\n- Meta Boxes: Giá theo giờ, qua đêm, hotline\n- AJAX Handler: Lead booking + Nonce check"]
        
        CoreWP["WordPress Core 6.x API\n- WP_Query, REST API, Block Engine"]
    end
    
    subgraph Database_Host ["MySQL 8.0 Container"]
        DB[(store_db_demo)]
    end
    
    subgraph External_Services ["Tích hợp Bên ngoài"]
        Zalo["Zalo Chat & ZNS (Deep link / API)"]
        Tele["Telegram Bot Alert (Lễ tân)"]
        GMap["Google Maps Embed (Chi nhánh)"]
    end
    
    Client -->|HTTP / HTTPS Port 8888| Theme
    Theme -->|Gọi CPT & Helper Functions| Plugin
    Plugin -->|WP CRUD & Meta APIs| CoreWP
    CoreWP -->|Port 3306| DB
    Plugin -->|Gửi thông báo đặt phòng| Tele
    Client -->|Bấm gọi / chat| Zalo
    Theme -->|Nhúng iframe nhẹ| GMap
```

---

## 2. NGUYÊN TẮC PHÂN TÁCH RANH GIỚI MÃ NGUỒN

1. **Thư mục Theme (`wp-content/themes/mixhotel-theme/`):**
   * **Chỉ chứa:**
     * `theme.json`: Toàn bộ Design Tokens (màu sắc, typography, spacing, border-radius, layout widths).
     * `style.css`: Khai báo metadata của theme và các style phụ trợ (reset, utility classes).
     * `templates/`: Các file cấu trúc giao diện (`front-page.html`, `single-hotel_room.html`, `archive-hotel_room.html`, `page.html`, `404.html`).
     * `parts/`: Template parts tái sử dụng (`header.html`, `footer.html`, `mobile-nav.html`).
     * `patterns/`: Các khối bố cục có sẵn (`hero-banner.html`, `room-card.html`, `branch-pricing.html`, `video-grid.html`).
   * **Cam kết:** Nếu người dùng đổi sang theme khác, toàn bộ dữ liệu phòng, chi nhánh và danh sách khách đặt phòng **KHÔNG BAO GIỜ BỊ MẤT**.

2. **Thư mục Plugin Nghiệp Vụ (`wp-content/plugins/mixhotel-core/`):**
   * **Chỉ chứa:**
     * Khai báo Custom Post Types (`hotel_room`, `hotel_branch`, `booking_lead`).
     * Khai báo Custom Taxonomies (`room_amenity`, `room_concept`).
     * Custom Fields & Meta Boxes (bảng giá phòng, số điện thoại hotline từng chi nhánh, link Zalo).
     * Xử lý gửi Form AJAX đặt phòng và bảo mật Nonce.
     * Tích hợp Webhook / Telegram Bot gửi thông báo đến lễ tân.

3. **Thư mục Tải lên (`wp-content/uploads/`):**
   * Chứa hình ảnh phòng, banner, logo. Thư mục này nằm ngoài Git tracking để tránh làm phình repo code.

4. **Danh Sách Plugin Bên Thứ Ba Được Phê Duyệt (Approved 3rd-party Plugins):**
   * **Spectra (`ultimate-addons-for-gutenberg`):** Cung cấp thư viện Block nâng cao (Container, Grid, Tabs) phục vụ trải nghiệm biên tập No-code khi quản trị viên tạo trang mới trong Block Editor. Các trang cốt lõi (Trang chủ, Chi tiết phòng, Danh mục phòng) duy trì vận hành trên FSE Native Block Patterns để tối ưu Core Web Vitals và đạt tốc độ tải cao nhất.
   * **Rank Math SEO (`seo-by-rank-math`):** Quản lý thẻ meta OpenGraph, chấm điểm bài viết chuẩn SEO, tự động tạo XML Sitemap và sinh cấu trúc Schema `LodgingBusiness` cho khách sạn.
   * **Converter for Media (`webp-converter-for-media`):** Tự động chuyển đổi toàn bộ ảnh tải lên thư viện Media sang định dạng WebP/AVIF siêu nhẹ.
   * **UpdraftPlus (`updraftplus`):** Công cụ sao lưu tự động (Backup & Restore) CSDL và mã nguồn định kỳ lên Google Drive trước khi bàn giao.

---

## 3. CƠ CHẾ BOOKING LEAD ENGINE

Khác với các website thương mại thông thường dùng giỏ hàng phức tạp, `mixhotel.vn` là mô hình khách sạn cặp đôi / nghỉ giờ, yêu cầu **tốc độ phản hồi và tính bảo mật riêng tư cao nhất**:

```mermaid
sequenceDiagram
    autonumber
    actor Khach as Khách hàng
    participant UI as Giao diện Web (Hero Form / Modal)
    participant AJAX as AJAX Handler (mixhotel-core)
    participant WP as WordPress DB (booking_lead)
    participant Tele as Telegram Lễ Tân / Email

    Khach->>UI: Điền Tên + SĐT + Chọn Chi nhánh + Nhu cầu (Nghỉ giờ/Qua đêm)
    Khach->>UI: Bấm "Gửi yêu cầu giữ phòng"
    UI->>AJAX: Gửi dữ liệu kèm Nonce Token (Chống CSRF)
    AJAX->>AJAX: Sanitize input & Verify Nonce
    AJAX->>WP: Lưu vào CPT booking_lead (Trạng thái: Chờ xác nhận)
    AJAX->>Tele: Bắn thông báo realtime: "Có khách đặt phòng tại Chi nhánh X"
    AJAX-->>UI: Trả về JSON thành công kèm hướng dẫn
    UI-->>Khach: Hiện modal popup: "Đã giữ phòng tạm thời 15 phút! Bấm Zalo để xác nhận ngay"
```

### 3.1. Automated Booking Engine (Spec-08 — Nâng cấp)

> **Spec Kit:** `specs/08-automated-booking/` (spec.md, contracts/, plan.md, tasks.md)

Mở rộng Booking Lead Engine thành hệ thống **Auto-Confirm** có kiểm tra phòng trống theo khung giờ:

```mermaid
sequenceDiagram
    autonumber
    actor Khach as Khách hàng
    participant UI as Giao diện Web
    participant AJAX as AJAX Handler (mixhotel-core)
    participant DB as WordPress DB
    participant Cron as WP-Cron (5 phút/lần)
    participant Tele as Telegram Lễ Tân

    Khach->>UI: Chọn phòng + ngày/giờ + nhu cầu (2h/qua đêm/cả ngày)
    UI->>AJAX: AJAX + Nonce fresh (inject từ MixHotelData.nonce)
    AJAX->>AJAX: Tính check-out time tự động (2h/overnight/allday)
    AJAX->>DB: SELECT overlap: cùng phòng + cùng khung giờ?
    alt Phòng trống
        AJAX->>DB: INSERT booking_lead (status = confirmed)
        AJAX->>Tele: Thông báo "Có đơn mới, đã auto-confirm"
        AJAX-->>UI: JSON success + mã đơn + check-in/out time
        UI-->>Khach: Modal xác nhận xanh
    else Phòng đã kín
        AJAX-->>UI: JSON error "Phòng đã hết trong khung giờ này"
        UI-->>Khach: Thông báo lỗi + gợi ý hotline
    end

    Note over Cron,DB: Chạy mỗi 5 phút
    Cron->>DB: Quét đơn confirmed > 30 phút chưa check-in
    Cron->>DB: UPDATE status → expired, nhả slot phòng
```

**Trạng thái đơn mới:** `confirmed` → `checked_in` → `completed` (hoặc `expired` / `no_show` / `cancelled`). Xem chi tiết tại [database-schema.md](file:///c:/Users/maida/Code/wordpress/docs/database-schema.md).

**BUG-17 đi kèm:** Form đặt phòng hiện không gửi được do nonce bị "đóng băng" trong seeded content. Xem [booking-form-bug-report.md](file:///c:/Users/maida/Code/wordpress/docs/booking-form-bug-report.md).

---

## 4. HẠ TẦNG DOCKER & PORT MAPPING

Dự án vận hành trên 3 containers độc lập thông qua file [docker-compose.yml](file:///c:/Users/maida/Code/wordpress/docker-compose.yml):

* **WordPress Container (`store_app`):** Chạy Apache + PHP 8.2, port `8888:80`.
* **Database Container (`store_db`):** Chạy MySQL 8.0, port `3307:3306` (đã mở cổng `3307` để kết nối DBeaver / Navicat).
* **phpMyAdmin Container (`store_pma`):** Chạy phpMyAdmin, port `8889:80`.

---

## 5. CHIẾN LƯỢC FSE REFACTOR (Feature 06 & 07 — No-code Admin UI)

> **Spec Kit Feature 06:** `specs/06-fse-gutenberg-refactor/` (spec.md, plan.md, tasks.md)  
> **Spec Kit Feature 07:** `specs/07-wysiwyg-no-code-full-refactor/` (spec.md, plan.md, tasks.md)  
> **Governing Documents:** `REAL_WORLD_AGENCY_WORKFLOW.md` (Mục 6, 7.3, 7.4, 9.4), `AGENTS.md` (Mục 2, 3)

### 5.1. Tình Trạng Kiến Trúc Hiện Tại (Technical Debt)

Toàn bộ Block Patterns và phần lớn Template Parts trong `mixhotel-theme/` sử dụng `<!-- wp:html -->` (Custom HTML Block) bao trùm toàn bộ nội dung section. Kỹ thuật này đảm bảo pixel-perfect khi chuyển đổi từ Next.js prototype nhưng gây ra **4 hệ quả nghiêm trọng:**

1. **Không Click-to-Edit:** Admin không thể sửa text (tiêu đề, giá, mô tả) trực tiếp trong Site Editor.
2. **Không Replace Image:** Ảnh hero, sự kiện, phòng concept đều là thẻ `<img>` tĩnh, không có nút "Replace" của Gutenberg.
3. **Không Inspector Controls:** Không đổi được màu nền, font chữ, padding qua panel bên phải.
4. **Không Kéo Thả:** Admin không thể kéo đổi vị trí section hoặc thêm block mới.

### 5.2. Chiến Lược CSS Preservation

```
  NGUYÊN TẮC BẤT BIẾN:
  ├── KHÔNG XÓA bất kỳ file CSS hiện có
  ├── KHÔNG ĐỔI TÊN class CSS hiện có
  ├── GẮN class CSS cũ vào Core Blocks qua "className" attribute
  ├── CHỈ BỔ SUNG CSS resets cho wp-block-* defaults nếu gây xung đột
  └── TẠO utility classes mới thay cho inline styles bị xóa
```

### 5.3. Phân Loại Components (Đã Cập Nhật Cho Feature 07)

| Nhóm | Trạng thái Feature 06 | Trạng thái Feature 07 | Ví dụ |
|:---|:---|:---|:---|
| **A: Static Content** (23 patterns + 2 parts) | ✅ Hoàn thành — Chuyển `wp:html` → Core Blocks | Kế thừa nguyên vẹn | `why-choose-us`, `pricing-table`, `booking-steps`, `final-cta`, `events-decoration`, `about-*`, `policy-*`, Header/Footer logo |
| **B: Dynamic PHP → No-code** (7 patterns) | Giữ nguyên `wp:html` | 🔄 **Feature 07: Chuyển sang Core Blocks** (`wp:cover`, `wp:image`, `wp:group`, `wp:columns`, `wp:buttons`, `wp:details`) | `about-intro` (Banner), `real-photos-grid`, `concept-rooms`, `branches-list`, `pricing-table`, `faq-accordion`, `final-cta`/`about-cta` |
| **C: Interactive UI** (4 parts) | Giữ nguyên `wp:html` | Giữ nguyên `wp:html` | `mobile-action-bar`, `desktop-contact-bar`, `contact-modal`, `booking-modal` |
| **D: Special Keep** (2 patterns) | Giữ nguyên `wp:html` | Giữ nguyên `wp:html` | `hero-booking` (LCP optimization), Contact Form (AJAX + nonce) |

### 5.4. Quyết Định Kiến Trúc (ADR-006)

* **Progressive Migration:** 4 Waves bắt đầu từ POC (2 components đơn giản nhất) → kiểm chứng → mở rộng.
* **Navigation Block Deferred:** Header menu giữ raw HTML thay vì `<!-- wp:navigation -->` vì WordPress 6.x chưa hỗ trợ tốt multi-level dropdown custom styling. Chỉ đổi Logo → `<!-- wp:site-logo -->`.
* **Layout Lock:** Section wrappers sử dụng `"lock":{"move":true,"remove":true}` ngăn Admin xóa/kéo nhầm bố cục.
* **Buttons CTA:** Chuyển sang `<!-- wp:button -->` chuẩn (Feature 07). JS theme sử dụng event delegation bắt các liên kết `#booking` để kích hoạt Booking Modal Popup.

### 5.5. Chiến Lược Feature 07: Toàn Diện No-code WYSIWYG Figma-Style (ADR-007)

> **Spec Kit:** `specs/07-wysiwyg-no-code-full-refactor/` (spec.md, plan.md, tasks.md)

**Mục tiêu:** Chuyển đổi 100% các khối nội dung tĩnh và phức hợp còn lại trên toàn bộ website sang WordPress Native Core Blocks, mang lại trải nghiệm chỉnh sửa trực quan dạng Figma no-code 100%.

**Các thành phần chính:**

1. **Auto Media Importer:** Script tự động nạp toàn bộ ảnh gốc từ `assets/images/` vào WordPress Media Library (`wp_insert_attachment` + `wp_generate_attachment_metadata`), trả về mapping `[filename => attachment_id]`.
2. **Banner → `wp:cover`:** Chuyển đổi `about-intro.php`, `final-cta.php`, `about-cta.php` sang `<!-- wp:cover -->` có nút "Thay thế" ảnh nền 1-click.
3. **Card & Grid → `wp:group` + `wp:image` + `wp:buttons`:** Chuyển đổi `real-photos-grid.php`, `concept-rooms.php`, `branches-list.php`, `pricing-table.php` sang cấu trúc Core Blocks có thể click-to-edit.
4. **FAQ → `wp:details`:** Chuyển đổi `faq-accordion.php` sang Native `<!-- wp:details -->` có thể gõ sửa câu hỏi/trả lời trực tiếp.
5. **Block Locking:** Khóa cấu trúc container (`lock: {"move": true, "remove": true}`) ở cấp Section/Columns, mở khóa 100% nội dung con (text, ảnh, nút bấm).
6. **`#booking` Event Delegation:** JS theme bắt click link `#booking` / class `.mix-btn-booking` để mở popup đặt phòng, thay thế cơ chế `data-contact-action` cũ.

