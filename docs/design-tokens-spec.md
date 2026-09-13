# DESIGN TOKENS & VISUAL SPECIFICATION

> **Dự án:** Clone giao diện `https://mixhotel.vn`  
> **Tầng tài liệu:** Tầng 1 — Nghiệp vụ vĩ mô  
> **Tham chiếu kỹ thuật:** Được ánh xạ trực tiếp vào `theme.json` và CSS Variables của `mixhotel-theme`.

---

## 1. BẢNG MÀU THƯƠNG HIỆU (COLOR PALETTE)

Toàn bộ giao diện mang phong cách **Dark Luxury Boutique**, kết hợp giữa nền đen huyền bí, ánh vàng kim vương giả và sắc đỏ đam mê.

| Tên Token | Slug (`theme.json`) | Hex Code | Ứng dụng thực tế trên giao diện |
| :--- | :--- | :--- | :--- |
| **Dark Primary** | `dark-primary` | `#0f0f12` | Nền chính toàn bộ website |
| **Dark Secondary** | `dark-secondary` | `#17171c` | Nền các thẻ Card phòng, Modal popup, Dropdown menu |
| **Dark Tertiary** | `dark-tertiary` | `#22222a` | Nền input form, viền border, dải phân cách nhẹ |
| **Luxury Gold** | `luxury-gold` | `#c5a880` | Màu thương hiệu chính: Nút CTA, tiêu đề phụ, hover link |
| **Gold Bright** | `gold-bright` | `#dfc299` | Trạng thái hover của nút bấm vàng, icon nổi bật |
| **Sensual Crimson** | `sensual-crimson` | `#c92a2a` | Nút Đặt phòng khẩn cấp, badge "HOT CONCEPT", ánh hào quang |
| **Text Bright** | `text-bright` | `#ffffff` | Tiêu đề chính H1, H2, giá tiền nổi bật |
| **Text Muted** | `text-muted` | `#a0a0a8` | Đoạn văn bản mô tả, thông tin ngày giờ, caption |
| **Text Subtle** | `text-subtle` | `#707078` | Placeholder form, nhãn phụ, thông tin bản quyền footer |

---

## 2. NGHỆ THUẬT CHỮ (TYPOGRAPHY)

Sử dụng Google Fonts chuẩn mực theo website gốc:
* **Display / Headings:** Font `Questrial`, sans-serif (nét chữ tròn đều, thanh lịch, hiện đại).
* **Body / UI Elements:** Font `Roboto`, sans-serif (dễ đọc, tối ưu hiển thị trên màn hình nhỏ).

### Bảng Thang Đo Kích Thước (Type Scale):

| Tên Token | Kích thước | Line Height | Font Weight | Ứng dụng |
| :--- | :--- | :--- | :--- | :--- |
| `font-size-hero` | `clamp(2rem, 5vw, 3.25rem)` | `1.15` | `700 (Questrial)` | Tiêu đề Hero Trang chủ |
| `font-size-h2` | `clamp(1.5rem, 3.5vw, 2.25rem)` | `1.25` | `700 (Questrial)` | Tiêu đề các Section lớn |
| `font-size-h3` | `1.5rem (24px)` | `1.3` | `600 (Questrial)` | Tên phòng trong card, Modal title |
| `font-size-h4` | `1.125rem (18px)` | `1.4` | `500 (Roboto)` | Tiêu đề khối phụ, giá phòng nổi bật |
| `font-size-body` | `0.9375rem (15px)` | `1.6` | `400 (Roboto)` | Nội dung mô tả, bài viết |
| `font-size-caption` | `0.8125rem (13px)` | `1.5` | `400 (Roboto)` | Tag tiện ích, ghi chú chân trang |
| `font-size-kicker` | `0.75rem (12px)` | `1.4` | `700 (Roboto)` | Nhãn Kicker viết hoa (VD: "ẢNH THẬT PHÒNG THẬT") |

---

## 3. THANG KHOẢNG CÁCH (SPACING & LAYOUT)

* **Container Max Width:** `1200px` (Padding 2 bên: Desktop `24px`, Mobile `16px`).
* **Thang Spacing (`theme.json` spacingScale):**
  * `space-xs`: `4px`
  * `space-sm`: `8px`
  * `space-md`: `16px`
  * `space-lg`: `24px`
  * `space-xl`: `40px`
  * `space-2xl`: `64px` (Khoảng cách giữa các Section chính trên desktop)
  * `space-3xl`: `96px`

---

## 4. HIỆU ỨNG THỊ GIÁC & TƯƠNG TÁC (VISUAL EFFECTS)

### 4.1. Hào quang Huyền bí (Luxury Aura Glow)
```css
/* Ánh sáng mờ ảo phía sau các khối Hero và Video */
.mix-aura-gold {
  background: radial-gradient(circle, rgba(197, 168, 128, 0.15) 0%, rgba(15, 15, 18, 0) 70%);
  pointer-events: none;
}
.mix-aura-crimson {
  background: radial-gradient(circle, rgba(201, 42, 42, 0.12) 0%, rgba(15, 15, 18, 0) 70%);
  pointer-events: none;
}
```

### 4.2. Bo góc & Đổ bóng (Border Radius & Shadows)
* Thẻ Card & Form Container: `border-radius: 12px`
* Nút CTA: `border-radius: 8px`
* Tag Tiện ích (Amenities badge): `border-radius: 20px` (Bo tròn pill)
* Card Shadow: `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5)`
* Modal Backdrop: `background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(8px);`

---

## 5. THIẾT BỊ & ĐIỂM NGẮT (RESPONSIVE BREAKPOINTS)

* **Mobile Small:** `< 375px` (Tối ưu riêng cho các dòng iPhone cũ / SE)
* **Mobile Standard:** `< 576px` (Bật thanh Sticky Action Bar ở đáy)
* **Tablet:** `576px - 991px` (Menu chuyển sang dạng rút gọn hoặc Drawer)
* **Desktop:** `≥ 992px` (Bật Menu ngang đầy đủ, bố cục Grid 2-3 cột)
