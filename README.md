w

# HƯỚNG DẪN THỰC CHIẾN DỰ ÁN WEB BÁN HÀNG: `demo-store`

> **Bộ tài liệu chuẩn từ cơ bản đến thực tế dành cho Lập trình viên WordPress & Freelancer/Agency.**
> *Sử dụng Docker Compose, WordPress Core, WooCommerce và Trình dựng Block Editor hiện đại.*

---

## MỤC LỤC

1. [Khái niệm nền tảng: Docker, Container &amp; Port Mapping](#1-khái-niệm-nền-tảng-docker-container--port-mapping)
2. [Khởi chạy dự án bằng Docker Compose](#2-khởi-chạy-dự-án-bằng-docker-compose)
3. [Quy trình thiết lập Website chuẩn (Click-by-Click)](#3-quy-trình-thiết-lập-website-chuẩn-click-by-click)
4. [Tối ưu WooCommerce sang thị trường Việt Nam (VNĐ)](#4-tối-ưu-woocommerce-sang-thị-trường-việt-nam-vnđ)
5. [Cơ chế Database trong WordPress &amp; Kết nối DBeaver](#5-cơ-chế-database-trong-wordpress--kết-nối-dbeaver)
6. [Quy trình Git khi nhận dự án khách hàng thực tế](#6-quy-trình-git-khi-nhận-dự-án-khách-hàng-thực-tế)
7. [Bộ Plugin &#34;Bất khả thi thiếu&#34; &amp; Kỹ năng săn lùng Plugin](#7-bộ-plugin-bất-khả-thi-thiếu--kỹ-năng-săn-lùng-plugin)
8. [Checklist bàn giao dự án cho khách hàng](#8-checklist-bàn-giao-dự-án-cho-khách-hàng)

---

## 1. KHÁI NIỆM NỀN TẢNG: DOCKER, CONTAINER & PORT MAPPING

### 1.1. Container là gì?

- **Ví von:** Giống như một **"Hộp cơm trưa giữ nhiệt"**. Trong hộp có sẵn cơm, canh, đũa thìa (Mã nguồn WP, PHP, Apache). Bạn mang hộp cơm đi bất cứ đâu (máy Windows, Mac hay Linux), hương vị bữa ăn vẫn giữ nguyên vẹn 100%, không bị ảnh hưởng bởi môi trường bên ngoài.
- **Lợi ích:** Không làm rác máy tính cá nhân, không lo bị đụng phiên bản PHP, dễ dàng xóa bỏ hoặc nhân bản.

### 1.2. Docker Compose là gì?

- Một website hoàn chỉnh luôn cần: **Bộ xử lý PHP (WordPress)** + **Cơ sở dữ liệu (MySQL)** + **Công cụ quản lý DB (phpMyAdmin)**.
- Đây là 3 container độc lập. **Docker Compose** đóng vai trò là **"Bản nhạc trưởng"** (thể hiện qua file `docker-compose.yml`), giúp cả 3 container tự động khởi động cùng lúc và tự bắt tay kết nối với nhau mà không cần gõ lệnh thủ công.

### 1.3. Giải mã Port Mapping (Ánh xạ cổng)

Cú pháp port trong Docker luôn là: **`"CỔNG_MÁY_THẬT : CỔNG_CONTAINER"`**

- **Bên phải (`:80` hoặc `:3306`):** Là cổng mạng nội bộ bên trong container.
- **Bên trái (`8888:`, `8889:`, `3307:`):** Là cổng trên máy tính thật của bạn.
- **Tại sao lại chọn các cổng 8888, 8889, 3307?**
  - Cổng mặc định `80`, `8080`, `3306` rất hay bị chiếm bởi Laragon, XAMPP, Skype, IIS hoặc các dự án khác (như Moodle).
  - Chọn các cổng trên giúp dự án chạy ở một **"làn đường riêng biệt"**, đảm bảo 100% không bao giờ bị lỗi trùng cổng (`Port already allocated`).

```
[Trình duyệt của bạn] -> http://localhost:8888 (Máy thật) ──(Ánh xạ)──> Cổng 80 (WordPress Container)
[Trình duyệt của bạn] -> http://localhost:8889 (Máy thật) ──(Ánh xạ)──> Cổng 80 (phpMyAdmin Container)
[DBeaver / DataGrip]  -> localhost:3307         (Máy thật) ──(Ánh xạ)──> Cổng 3306 (MySQL Container)
```

---

## 2. KHỞI CHẠY DỰ ÁN BẰNG DOCKER COMPOSE

Mở Terminal (PowerShell hoặc Git Bash) tại thư mục `D:\PROJECT\demo-store` và chạy:

```bash
# Khởi động toàn bộ dịch vụ ngầm
docker compose up -d
```

### Các đường link truy cập dự án:

- 🌐 **Website Cửa Hàng:** [http://localhost:8888](http://localhost:8888)
- 🛠️ **Trang Quản trị Admin:** [http://localhost:8888/wp-admin](http://localhost:8888/wp-admin)
- 🗄️ **Quản lý Database (phpMyAdmin):** [http://localhost:8889](http://localhost:8889) *(User: `root` | Pass: `root_password_123`)*

### Lệnh tắt dịch vụ khi không dùng:

```bash
# Tắt container (dữ liệu bài viết, sản phẩm vẫn được bảo toàn)
docker compose down

# Tắt và xóa toàn bộ dữ liệu database để làm lại từ đầu:
docker compose down -v
```

---

## 3. QUY TRÌNH THIẾT LẬP WEBSITE CHUẨN (CLICK-BY-CLICK)

### Màn hình 1: Cài đặt thông tin ban đầu (WordPress Setup)

1. Truy cập `http://localhost:8888`.
2. Chọn ngôn ngữ: **Tiếng Việt** -> Bấm **Tiếp tục**.
3. Điền thông tin:
   - **Tên website:** `Cửa Hàng Trực Tuyến - Demo Store`
   - **Tên người dùng:** `admin`
   - **Mật khẩu:** `Admin@123456`
   - **Email:** `admin@example.com`
4. Bấm **Cài đặt WordPress** -> Bấm **Đăng nhập**.

---

### Màn hình 2: Cài đặt Plugin Starter Templates

1. Vào **Plugin** -> **Thêm Plugin mới (Add New)**.
2. Tìm kiếm: **`Starter Templates`**.
3. Chọn plugin **Starter Templates: AI-Powered Website Templates for Elementor & Gutenberg** (hình chữ S tím) -> Bấm **Cài đặt ngay** -> Bấm **Kích hoạt**.

---

### Màn hình 3: Lựa chọn công nghệ dựng trang (Page Builder)

1. Màn hình hỏi *"How would you like to build your website?"*:
   - 👉 Chọn ô bên phải: **`Build with Templates`** *(Classic Starter Templates)*.
   - *Lý do:* Dùng kho mẫu miễn phí có sẵn, không cần đăng ký tài khoản AI.
2. Màn hình hỏi *"Choose Page Builder"*:
   - 👉 Chọn: **`Block Editor`** *(Gutenberg - Biểu tượng logo WordPress)*.
   - *Lý do kỹ thuật:*
     - **Tốc độ:** Nhẹ hơn Elementor rất nhiều, điểm Google PageSpeed 90-100.
     - **An toàn bàn giao:** Khách hàng gõ chữ đổi ảnh trực tiếp như Word/Canva, không thể bấm nhầm làm vỡ layout giao diện.

---

### Màn hình 4: Tìm và lọc mẫu Giao diện Bán Hàng

1. Ở ô lọc bên phải (đang để chữ *All*):
   - 👉 Chuyển sang chọn: **`Free`** *(Để ẩn toàn bộ mẫu Premium bắt trả phí)*.
2. Ô tìm kiếm gõ: **`Store`** (hoặc tab *E-Commerce*).
3. Chọn một mẫu cửa hàng bất kỳ (VD: **`Brandstore`** hoặc **`Organic Store`**).

---

### Màn hình 5: Chọn nền tảng Bán hàng (Platform)

1. Màn hình hỏi *"Choose eCommerce Platform"*:
   - 👉 Tích chọn: **`WooCommerce`** *(Bỏ qua SureCart dù nó ghi Recommended)*.
   - *Lý do kỹ thuật:* WooCommerce là chuẩn số 1 thế giới và Việt Nam, tương thích 100% các cổng thanh toán (MoMo, VNPay, ZaloPay) và hãng vận chuyển (GHTK, GHN, Viettel Post).

---

### Màn hình 6: Chọn tính năng đi kèm (Select Features)

1. 👉 **BỎ TÍCH (Uncheck)** 2 ô:
   - ❌ Bỏ tích: `SEO & Search Visibility` *(Tránh plugin SEO rác cài vào làm nặng web, sau này ta tự cài Rank Math SEO)*.
   - ❌ Bỏ tích: `Cookie Consent` *(Luật cookie châu Âu không cần thiết tại VN, làm che màn hình mobile giảm tỷ lệ chốt đơn)*.
2. Bấm: **`Continue →`** (hoặc **`Skip this step`**).

---

### Màn hình 7: Hoàn tất

1. Bấm vào dòng chữ nhỏ dưới nút xanh: **`Skip & Start Building`**.
2. Đợi 1 - 2 phút để hệ thống tự tải sản phẩm mẫu và hình ảnh về.
3. Khi hiện **Congratulations 🎉** -> Bấm **`View Your Website →`**.

---

## 4. TỐI ƯU WOOCOMMERCE SANG THỊ TRƯỜNG VIỆT NAM (VNĐ)

1. Vào Admin: `http://localhost:8888/wp-admin`.
2. Vào menu: **WooCommerce** -> **Cài đặt (Settings)** -> Tab **Tổng quan (General)**:
   - **Quốc gia / Bang:** `Việt Nam`
   - **Đơn vị tiền tệ:** `Đồng Việt Nam (₫)`
   - **Vị trí tiền tệ:** `Phía bên phải có dấu cách (vd: 500.000 ₫)`
   - Bấm **Lưu thay đổi**.
3. **Thử sửa sản phẩm:**
   - Vào **Sản phẩm (Products)** -> **Tất cả sản phẩm**.
   - Bấm **Chỉnh sửa (Edit)** 1 sản phẩm -> Đổi tên tiếng Việt, đổi giá bán (vd: `450000`), thay ảnh sản phẩm -> Bấm **Cập nhật**.

---

## 5. CƠ CHẾ DATABASE TRONG WORDPRESS & KẾT NỐI DBEAVER

### 5.1. WordPress có ORM không?

WordPress **không dùng ORM truyền thống** (như Hibernate, Prisma hay Eloquent), nhưng cung cấp **Model APIs & Query Abstraction Layer** cực mạnh. **99% trường hợp bạn không cần viết Raw SQL:**

#### Cấp 1: Query API & CRUD (Thay thế ORM)

```php
// Lấy danh sách 5 sản phẩm mới nhất (Tương đương SELECT * FROM...)
$products = get_posts([
    'post_type'      => 'product',
    'posts_per_page' => 5,
    'post_status'    => 'publish'
]);

// Thêm/Sửa sản phẩm bằng WooCommerce OOP Data Mapper
$product = new WC_Product_Simple();
$product->set_name('Áo Thun Nam Cao Cấp');
$product->set_regular_price('250000');
$product->save(); // Tự động INSERT an toàn vào MySQL
```

#### Cấp 2: Khi tạo bảng nghiệp vụ riêng (Dùng `$wpdb`)

```php
global $wpdb;
// Tự động INSERT chống SQL Injection
$wpdb->insert(
    'bang_diem_thuong',
    ['user_id' => 10, 'points' => 100],
    ['%d', '%d']
);
```

### 5.2. Kết nối bằng DBeaver / DataGrip / Navicat

File `docker-compose.yml` đã mở sẵn cổng `3307`. Cấu hình kết nối:

- **Host:** `localhost`
- **Port:** `3307`
- **Database:** `store_db_demo`
- **Username:** `root` *(hoặc `store_user`)*
- **Password:** `root_password_123` *(hoặc `store_password_123`)*

---

## 6. QUY TRÌNH GIT KHI NHẬN DỰ ÁN KHÁCH HÀNG THỰC TẾ

*(Workflow chuẩn Agency & Freelancer)*

```
[Repo gốc: demo-store] (nhánh main)
       │
       ├──> Nhánh: client-shop-quan-ao (Làm cho shop thời trang)
       │
       └──> Nhánh: client-shop-my-pham (Làm cho shop mỹ phẩm)
```

1. **Thư mục này chính là "Base Starter Repository":** Đã tích hợp sẵn Docker, WordPress tối ưu RAM, WooCommerce và Theme chuẩn.
2. **Khi có khách hàng mới (VD: Shop Quần Áo An An):**
   - Từ nhánh `main`, tạo ngay nhánh mới riêng biệt cho khách:
     ```bash
     git checkout -b client-anan-fashion
     ```
   - Trên nhánh này, bạn thay logo, thay banner, nhập danh mục sản phẩm của khách.
   - Nếu cần code thêm tính năng: Viết plugin riêng trong thư mục `wp-content/plugins/custom-feature/`.
   - Commit và push lên repo dự án:
     ```bash
     git add .
     git commit -m "feat: setup custom branding and catalog for An An Fashion"
     ```
3. **File `.gitignore` chuẩn đã cấu hình:** Tự động bỏ qua thư mục `wp-content/uploads/` để tránh đẩy hàng GB ảnh của khách lên Git.

---

## 7. BỘ PLUGIN "BẤT KHẢ THI THIẾU" & KỸ NĂNG SĂN LÙNG PLUGIN

### 7.1. Danh sách Plugin khuyên dùng cho mọi dự án:

1. **Kéo thả giao diện:** `Block Editor` (mặc định) + **`Spectra`** (bổ sung hàng chục khối giao diện đẹp).
2. **Chuẩn SEO Google:** **`Rank Math SEO`** (chấm điểm đèn xanh/đỏ hướng dẫn viết bài chuẩn SEO).
3. **Form liên hệ / Báo giá:** **`Fluent Forms`** (hoặc `WPForms`).
4. **Tối ưu hình ảnh siêu nhẹ:** **`Converter for Media`** (tự nén đổi đuôi WebP).
5. **Chống Spam form:** **`Cloudflare Turnstile`** (thay thế reCAPTCHA rối rắm).

### 7.2. Kỹ năng tìm kiếm Plugin trên Google / TikTok:

- **Công thức Search Google:**

  > `best [tên tính năng tiếng Anh] plugin wordpress free [năm hiện tại]`
  >

  - *Ví dụ:* `best booking calendar plugin wordpress free 2026`, `best popup discount plugin wordpress`.
- **Kênh TikTok & YouTube nên theo dõi:**

  - Hashtag TikTok: `#wordpresstips`, `#wordpressplugins`, `#webdesign`.
  - Kênh YouTube: *Jamie Marsland*, *WPCrafter*, *Ferdy Korpershoek*.
- **Bộ lọc 4 thông số kiểm tra Plugin an toàn:**

  1. Lượt kích hoạt: `10,000+` trở lên.
  2. Lần cập nhật cuối: Dưới `3 tháng`.
  3. Đã xác nhận tương thích với phiên bản WordPress hiện tại.
  4. Đánh giá: Từ `4.5 sao` trở lên.

---

## 8. CHECKLIST BÀN GIAO DỰ ÁN CHO KHÁCH HÀNG

1. **NÓI KHÔNG VỚI PLUGIN/THEME CRACK (NULL):** Chỉ dùng theme/plugin chính thống từ `wordpress.org` hoặc bản quyền có key. Hàng crack sẽ dính mã độc sau 1-2 tháng và làm mất uy tín của bạn.
2. **Video hướng dẫn bàn giao (Loom / OBS):** Quay clip 5-10 phút hướng dẫn khách:
   - Cách đăng bài viết mới chuẩn SEO.
   - Cách thêm/sửa giá sản phẩm.
   - Cách xem danh sách đơn hàng và đổi mật khẩu Admin.
3. **Backup định kỳ:** Cài plugin **`UpdraftPlus`** để tự động sao lưu website lên Google Drive hàng tuần phòng ngừa sự cố.
