# IMPLEMENTATION PLAN: 05 - AUXILIARY PAGES & POLISH (PIXEL-PERFECT V2)

**Feature:** `specs/05-auxiliary-pages-and-polish`  
**Tuân thủ:** `playbook_disciplined_vibe_coding.md` & `AGENTS.md`  
**Mục tiêu:** Porting 1:1 từ prototype Next.js `@ui/` sang WordPress FSE Theme, khôi phục toàn diện trải nghiệm Dark Luxury và font Philosopher.

---

## 1. ARCHITECTURE OVERVIEW

```
[@ui Source Code]                            [WordPress Target Implementation]
├── ui/public/fonts/*.ttf              ──>   wp-content/themes/mixhotel-theme/assets/fonts/
├── ui/public/images/mixhotel-gt-.webp ──>   wp-content/themes/mixhotel-theme/assets/images/
├── ui/public/images/articles/*        ──>   wp-content/themes/mixhotel-theme/assets/images/articles/
├── ui/src/app/mixhotel-luxury.css     ──>   assets/css/pages-luxury.css (extracted & scoped)
│
├── ui/src/app/gioi-thieu/page.tsx     ──>   patterns/about-intro.php, about-amenities.php, about-testimonials.php, about-cta.php
│                                            └── templates/page-gioi-thieu.html
│
├── ui/src/app/gallery/page.tsx        ──>   patterns/gallery-grid.php (gold-rectangle + branch tabs)
│                                            └── templates/page-gallery.html
│
├── ui/src/components/branch/          ──>   patterns/branch-detail.php (mixBoutiqueHero + stats + quick booking + rooms)
│   BranchDetailTemplate.tsx                 └── templates/single-hotel_branch.html
│
├── ui/src/app/tin-tuc/page.tsx        ──>   patterns/blog-archive-content.php (8 categories tabs + luxury cards + sidebar)
│                                            └── templates/home.html
│
├── ui/src/components/article/         ──>   patterns/blog-single-content.php (table of contents + dark luxury typography + share)
│   ArticleDetailClient.tsx                  └── templates/single.html
│
├── ui/src/app/lien-he/page.tsx        ──>   patterns/contact-page-content.php (luxury card 7:5 + branch cards + zalo card)
│                                            ├── patterns/contact-maps.php (3 branches embed)
│                                            └── templates/page-lien-he.html
│
├── ui/src/app/chinh-sach-*/page.tsx   ──>   patterns/policy-payment.php, policy-privacy.php, policy-booking.php
│                                            └── templates/page.html
│
└── ui/src/app/mixhotel-luxury.css     ──>   patterns/page-404.php (.block404 standard)
    .block404                                └── templates/404.html
```

---

## 2. KẾ HOẠCH BẢO TỒN TÀI NGUYÊN BACKEND ĐÃ TEST HOÀN HẢO

* **Plugin Contact AJAX:** `wp-content/plugins/mixhotel-core/includes/class-contact-handler.php` giữ nguyên 100%. Đã test qua HTTP passed cả 5 kịch bản (Nonce, Honeypot, Validation, Demo Sandbox log, Rate Limiting).
* **WP Admin Sandbox Table:** `wp-content/plugins/mixhotel-core/includes/class-settings.php` giữ nguyên bảng hiển thị Contact Leads trong menu "Nhật Ký Sandbox".
* **Kinh nghiệm phòng lỗi BUG-07:** FSE templates `.html` chỉ gọi `<!-- wp:pattern {"slug":"..."} /-->`, toàn bộ mã render động đặt trong file pattern `.php`.

---

## 3. LỘ TRÌNH THỰC THI ATOMIC

### Bước 1: Chuẩn bị Assets & Fonts
- Enqueue font `Philosopher` (`Philosopher-Bold`, `Philosopher-Regular`) vào `pages-luxury.css`.
- Trích xuất CSS rules chính xác cho các component luxury.

### Bước 2: Trang Giới Thiệu
- Port chính xác HTML/JSX từ `ui/src/app/gioi-thieu/page.tsx`:
  - Kicker: `GIỚI THIỆU VỀ HỆ THỐNG`
  - Tiêu đề H1: `VỀ KHÁCH SẠN TÌNH YÊU MIX BOUTIQUE`
  - Quote: *"ĐỪNG ĐỂ TÌNH YÊU CỦA BẠN CHỈ CÓ MỘT MÀU!"*
  - Banner ảnh lớn kèm badge `Boutique Mood`
  - 6 thẻ tiện nghi nền `#15100c` viền vàng kim
  - 4 đánh giá thực tế kèm 5 sao vàng
  - CTA Banner gradient

### Bước 3: Trang Gallery
- Port từ `ui/src/app/gallery/page.tsx`:
  - Title block `.titleBlock_1`
  - Filter tabs `.wrapSubcateBlock_1`
  - Khung ảnh `.gold-rectangle` với hover zoom và overlay

### Bước 4: Trang Chi Nhánh
- Port từ `ui/src/components/branch/BranchDetailTemplate.tsx`:
  - Hero kicker + title + stats (11 phòng, 24/7, bồn sục, 100% riêng tư)
  - Quick booking box
  - Lưới phòng của chi nhánh
  - Bản đồ và liên hệ

### Bước 5: Trang Tin Tức & Bài Viết
- Port từ `ui/src/app/tin-tuc/page.tsx`:
  - 8 chuyên mục tin tức chuẩn
  - Thẻ bài viết magazine
  - Sidebar với banner đặt phòng
  - Single article với Table of Contents và nút share

### Bước 6: Trang Liên Hệ
- Port từ `ui/src/app/lien-he/page.tsx`:
  - Form card bo góc `rounded-3xl`
  - Cột thông tin 3 cơ sở với icon MapPin
  - Box Zalo chat riêng biệt
  - Kết nối AJAX với `MixHotel_Contact_Handler`

### Bước 7: 3 Trang Chính Sách
- Port từ `ui/src/app/chinh-sach-*/page.tsx`:
  - Đóng gói trong Card lớn nền `#140e0a`
  - Các box con với icon Banknote, CreditCard, ShieldCheck, Clock

### Bước 8: Trang 404
- Port từ `ui/src/app/mixhotel-luxury.css` (`.block404`).

### Bước 9: Kiểm thử & Nghiệm thu
- PHP syntax check toàn bộ (`php -l`).
- Chạy automated test suite WP-CLI.
- Kiểm tra trực quan trên browser.
