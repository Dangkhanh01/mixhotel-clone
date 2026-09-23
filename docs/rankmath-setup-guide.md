# HƯỚNG DẪN CẤU HÌNH RANK MATH SEO
## Mix Boutique Hotel Clone — Feature 05

> **Dành cho:** Quản trị viên website  
> **Plugin:** Rank Math SEO (đã cài và kích hoạt)

---

## 1. CẤU HÌNH LOCAL SEO SCHEMA — LodgingBusiness

### Bước 1: Mở Rank Math General Settings
1. Đăng nhập WordPress Admin
2. Vào **Rank Math → General Settings**
3. Chọn tab **Local SEO**

### Bước 2: Điền thông tin khách sạn

| Trường | Giá trị |
|--------|---------|
| **Business Type** | `LodgingBusiness` |
| **Business Name** | Mix Boutique Hotel |
| **URL** | https://mixhotel.vn/ |
| **Business Address** | Ngách 29, Ngõ 49 Huỳnh Thúc Kháng, Láng, Đống Đa, Hà Nội |
| **Phone** | +84 383 104 010 |
| **Email** | Mixboutique.marketing@gmail.com |
| **Opening Hours** | Mở cửa 24/7 |
| **Price Range** | `$$` |

### Bước 3: Kích hoạt Google Maps
- Nhập **Google Maps API Key** (lấy từ Google Cloud Console)
- Hoặc dùng iframe embed từ Google Maps (đã được xử lý trong theme)

---

## 2. XML SITEMAP

### Kích hoạt Sitemap
1. Vào **Rank Math → Sitemap Settings**
2. Bật **Links Per Sitemap Page**: 200
3. Bật các loại content:
   - ✅ Posts (Bài viết)
   - ✅ Pages (Trang)
   - ✅ Hotel Rooms (`hotel_room`)
   - ✅ Hotel Branches (`hotel_branch`)
4. **Submit sitemap** tới Google Search Console: `https://yoursite.com/sitemap_index.xml`

---

## 3. BREADCRUMBS

### Cấu hình Breadcrumb
1. Vào **Rank Math → General Settings → Breadcrumbs**
2. Bật **Enable Breadcrumbs**
3. Cấu hình:
   - **Separator**: `›`
   - **Home Label**: Trang chủ
   - **Home URL**: `/`
4. **Lưu ý**: Theme hiện sử dụng breadcrumb HTML tự code trong templates. Không cần dùng Rank Math breadcrumb shortcode trừ khi muốn thay đổi.

---

## 4. OPENGRPAH & SOCIAL SHARING

### Cấu hình OpenGraph
1. Vào **Rank Math → Titles & Meta → Global Meta**
2. Bật **Twitter Card**: `Summary with Large Image`
3. Điền **Default Thumbnail**: Upload ảnh tổng quan Mix Boutique Hotel (1200×630px)

### Per-page Meta Description
- Mỗi trang trong Block Editor có khung **Rank Math** phía dưới
- Điền **Meta Description** cho từng trang: 120-160 ký tự, có từ khóa liên quan

---

## 5. META TITLE & DESCRIPTION GỢI Ý CHO CÁC TRANG

| Trang | Title (60 ký) | Meta Description (155 ký) |
|-------|---------------|---------------------------|
| Trang chủ | Mix Boutique Hotel — Khách Sạn Tình Yêu Hà Nội | Khách sạn tình yêu Hà Nội cao cấp với không gian lãng mạn, riêng tư. 3 chi nhánh: Huỳnh Thúc Kháng, Đặng Tiến Đông, Phúc La. Đặt phòng ngay! |
| Giới thiệu | Giới Thiệu Mix Boutique Hotel Hà Nội | Tìm hiểu về Mix Boutique Hotel — hệ thống khách sạn tình yêu hàng đầu Hà Nội với 5+ năm kinh nghiệm, thiết kế độc đáo và dịch vụ cao cấp. |
| Gallery | Gallery Phòng Concept Mix Boutique Hotel | Khám phá gallery hình ảnh tất cả phòng concept tại Mix Boutique Hotel. Không gian lãng mạn, sang trọng và riêng tư dành cho các cặp đôi. |
| Liên hệ | Liên Hệ Mix Boutique Hotel — Hotline & Zalo | Liên hệ Mix Boutique Hotel qua hotline 038 310 4010, Zalo, hoặc điền form liên hệ. Tư vấn 24/7, phản hồi trong 15 phút. |
| Tin tức | Tin Tức Mix Boutique Hotel — Blog Tình Yêu | Blog tình yêu, review phòng khách sạn, địa điểm hẹn hò, gợi ý quà tặng và cẩm nang dành cho các cặp đôi tại Hà Nội. |

---

## 6. KIỂM TRA SEO HOÀN THIỆN

### Sử dụng Google Search Console
1. Submit sitemap: `https://yoursite.com/sitemap_index.xml`
2. Theo dõi **Coverage** và **Core Web Vitals**

### Test Schema Markup
- Truy cập: https://search.google.com/test/rich-results
- Nhập URL trang chủ → Kiểm tra `LodgingBusiness` schema

### Test OpenGraph
- Truy cập: https://developers.facebook.com/tools/debug/
- Nhập URL từng trang → Kiểm tra preview chia sẻ

---

## 7. DANH SÁCH PAGES CẦN TẠO

Các WordPress Pages sau cần được tạo trong WP Admin hoặc WP-CLI:

| Tên trang | Slug | Template |
|-----------|------|----------|
| Giới thiệu | `gioi-thieu` | Trang Giới Thiệu |
| Gallery | `gallery` | Trang Gallery |
| Liên hệ | `lien-he` | Trang Liên Hệ |
| Chính sách thanh toán | `chinh-sach-thanh-toan` | Trang Đơn Giản |
| Chính sách bảo mật thông tin | `chinh-sach-bao-mat-thong-tin` | Trang Đơn Giản |
| Chính sách đặt trả phòng | `chinh-sach-dat-tra-phong` | Trang Đơn Giản |

### Cài đặt Blog (Tin tức)
- Vào **Settings → Reading**
- Mục **Posts page**: Chọn trang "Tin tức" (slug: `tin-tuc`)
- WordPress sẽ tự sử dụng template `home.html` cho trang này

---

*Tài liệu được tạo: Feature 05 — Auxiliary Pages & Polish*
