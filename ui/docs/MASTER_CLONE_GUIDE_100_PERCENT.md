# HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC REFACTOR UI CLONE MIXHOTEL.VN ĐẠT 100% WEB GỐC

> **Dành cho:** AI Coding Agent / Developer tiếp nhận dự án.  
> **Mục tiêu tối thượng:** Đưa toàn bộ giao diện (HTML/CSS), bố cục (Layout), cấu trúc định tuyến (Routing) và chuỗi tương tác (Interaction Sequences) của web clone tại `@directory:ui` giống **100% web gốc `https://mixhotel.vn`**, không lệch bất kỳ nhánh nào.

---

## MỤC LỤC TỔNG QUAN

1. [Bản chất kiến trúc & Chân lý cốt lõi](#1-bản-chất-kiến-trúc--chân-lý-cốt-lõi)
2. [Hệ thống Popup & Chuỗi Thao Tác (Interaction Sequences & Modals)](#2-hệ-thống-popup--chuỗi-thao-tác-interaction-sequences--modals)
3. [Điều hướng & Thanh thao tác cố định (Navigation & Floating Controls)](#3-điều-hướng--thanh-thao-tác-cố-định-navigation--floating-controls)
4. [Trang Chủ: Chuẩn hóa 12 Vertical Sections](#4-trang-chủ-chuẩn-hóa-12-vertical-sections)
5. [3 Trang Chi Nhánh Riêng Biệt (Branch Detail Pages)](#5-3-trang-chi-nhánh-riêng-biệt-branch-detail-pages)
6. [Trang Danh Mục Khách Sạn Tình Yêu (`/khach-san-tinh-yeu/`)](#6-trang-danh-mục-khách-sạn-tình-yêu-khach-san-tinh-yeu)
7. [Trang Chi Tiết Phòng Độc Bản (`/khach-san-tinh-yeu/[slug]/`)](#7-trang-chi-tiết-phòng-độc-bản-khach-san-tinh-yeuslug)
8. [Hệ Thống Tin Tức & Điều Hướng Danh Mục Con (News & Subcategories)](#8-hệ-thống-tin-tức--điều-hướng-danh-mục-con-news--subcategories)
9. [Các Trang Phụ: Gallery, Giới Thiệu, Liên Hệ, Chính Sách](#9-các-trang-phụ-gallery-giới-thiệu-liên-hệ-chính-sách)
10. [Lộ trình thực thi từng bước dành cho Agent (Checklist)](#10-lộ-trình-thực-thi-từng-bước-dành-cho-agent-checklist)

---

## 1. BẢN CHẤT KIẾN TRÚC & CHÂN LÝ CỐT LÕI

### 1.1. Thực trạng codebase hiện tại so với web gốc
- **Tài sản quý giá nhất đã có:** File `src/app/mixhotel-luxury.css` (gần 700 KB) là **bản bundle CSS nguyên gốc** được trích xuất trực tiếp từ `mixhotel.vn`. Nó chứa **100%** class BEM, keyframe animations, responsive media queries của toàn bộ web gốc.
- **Sai lầm lớn nhất của code hiện tại:** Thay vì sử dụng đúng cấu trúc thẻ HTML và class BEM đã có trong `mixhotel-luxury.css`, code clone trước đó đã tự ý viết lại giao diện bằng các utility Tailwind CSS và Lucide Icons tự tạo. Hậu quả là:
  - Bố cục méo mó, khoảng cách padding/margin và font-size không khớp.
  - Thiếu hẳn các animation signature: ripple glow (`bigshake_1`, `bigshake_2`), hiệu ứng lắc lư điện thoại (`latdat_2`), menu trượt (`appeared_3`), nút bóng sáng (`figure2`).
  - Giao diện mobile bị lệch hoàn toàn so với web gốc.

### 1.2. Nguyên tắc vàng bắt buộc tuân thủ 100%
1. **Tuyệt đối không tự bịa class Tailwind:** Bắt buộc sử dụng đúng tên class của web gốc (ví dụ `.mixBranches`, `.mixBranchesCard`, `.mixPrices`, `.mixWhyCard`, `.mixLuxuryHero`, `.mixFooterPremium`).
2. **Sử dụng Font Awesome 4.7 / 6:** Web gốc dùng Font Awesome (`<i class="fa fa-phone"></i>`, `<i class="fa fa-angle-down"></i>`, v.v.), không dùng icon SVG tùy tiện từ Lucide làm sai lệch kích thước và trọng số nét vẽ.
3. **Cấu trúc dữ liệu đã chuẩn bị sẵn:** Toàn bộ dữ liệu bài viết (`articlesData.ts`), chi nhánh (`branchesData.ts`), chi tiết từng phòng (`roomsDetailData.ts`), thư viện ảnh (`galleryData.ts`) đã có đầy đủ tại `src/data/`. Chỉ cần gắn đúng view.

---

## 2. HỆ THỐNG POPUP & CHUỖI THAO TÁC (INTERACTION SEQUENCES & MODALS)

Web gốc `mixhotel.vn` có **2 POPUP RIÊNG BIỆT** phối hợp với nhau tạo thành chuỗi chuyển đổi khách hàng hoàn hảo. Code clone hiện tại thiếu hoàn toàn Popup 2 và dựng sai Popup 1.

### 2.1. Popup 1: Chọn Chi Nhánh (`#popupContact_1`)
- **Mục đích:** Khi người dùng chưa chọn chi nhánh cụ thể mà bấm các nút chung như "ĐẶT PHÒNG" (Header), "Nhắn Zalo tư vấn" (Hero), "Hỏi phòng Superior/Deluxe/VIP" (Bảng giá), "Chat face" / "Chat Zalo" (Floating bar).
- **Cấu trúc DOM gốc:**
```html
<div class="modal fade" id="popupContact_1" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="titlePart">
        <a class="close closeItem" data-dismiss="modal">x</a>
      </div>
      <div class="SelectLocate">
        <div class="smallPart">
          <a href="" phone="tel:+84383104010" zalo="https://zalo.me/+84383104010" messenger="https://m.me/602986296805550/" sms="sms:+84383104010" target="_blank" rel="nofollow">
            Mix Boutique Premium
          </a>
        </div>
        <div class="smallPart">
          <a href="" phone="tel:+84393307030" zalo="https://zalo.me/+84393307030" messenger="https://m.me/111428390604292/" sms="sms:+84393307030" target="_blank" rel="nofollow">
            Mix Boutique Hotel 256B Đặng Tiến Đông
          </a>
        </div>
        <div class="smallPart d-none">
          <!-- 104B Nguyễn Khuyến ẩn (d-none) -->
          <a href="" phone="tel:0334060906" zalo="https://zalo.me/0334060906" messenger="https://m.me/111386644041404/" sms="sms:0334060906" target="_blank" rel="nofollow">
            Mix Boutique Hotel 104B Nguyễn Khuyến
          </a>
        </div>
        <div class="smallPart">
          <a href="" phone="tel:+84353660966" zalo="https://zalo.me/+84353660966" messenger="https://m.me//114361207416511" sms="sms:+84353660966" target="_blank" rel="nofollow">
            Mix Boutique Hotel 20 Phúc La Hà Đông
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
```
- **Hành vi JavaScript (Sequence):**
  - Khi một phần tử có class `.callContactLocate` được click, nó mang thuộc tính `stylecontact="zalo"` (hoặc `"phone"`, `"messenger"`, `"sms"`).
  - Modal `#popupContact_1` mở lên.
  - Vòng lặp duyệt qua các thẻ `a` trong `.SelectLocate`: Lấy giá trị của attribute tương ứng với `stylecontact` gán vào `href` của thẻ `a`.
  - Nút đóng `x` (`.closeItem`) nằm ở góc trên bên phải với background đỏ rượu (`var(--mau_chu_dao_2)`) và hover đỏ tươi.

---

### 2.2. Popup 2: Xác Nhận Kết Nối (`#popupWhenClickContact`)
- **Mục đích:** Khi người dùng đã nhắm đến một chi nhánh hoặc số điện thoại cụ thể (ví dụ: bấm "Hỏi phòng" trên Card chi nhánh Huỳnh Thúc Kháng, bấm "Gọi ngay", bấm icon Phone ở thanh nổi bên phải, bấm Hotline ở Footer). Web gốc **không chuyển hướng ngay lập tức** mà bật modal hỏi xác nhận.
- **Cấu trúc DOM gốc:**
```html
<div class="modal fade popupAskContact" id="popupWhenClickContact" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <p class="modal-title">KẾT NỐI</p>
        <button aria-label="Close" class="close" data-dismiss="modal" type="button">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        Bạn có muốn kết nối với tư vấn viên của chúng tôi?
      </div>
      <div class="modal-footer">
        <a class="btnType_1" data-dismiss="modal">Hủy</a>
        <a class="btnType_1 btnContact" href="" rel="nofollow" target="_blank">Chat Zalo / Gọi điện / Gửi email</a>
      </div>
    </div>
  </div>
</div>
```
- **Hành vi JavaScript (Sequence):**
  - Các phần tử kích hoạt mang class `.contactCallPopUp` cùng các thuộc tính:
    - `contacttext="..."`: Chuỗi hiển thị trên nút xác nhận (ví dụ: "Chat Zalo", "Gọi điện", "Gửi email", "Chỉ đường").
    - `datahref="..."`: Link đích (ví dụ: `https://zalo.me/+84383104010`, `tel:+84383104010`, `mailto:...`).
  - Khi click:
    1. Đọc `contacttext` $\rightarrow$ gán vào chữ của nút `.btnContact`.
    2. Đọc `datahref` $\rightarrow$ gán vào thuộc tính `href` của nút `.btnContact`.
    3. Mở modal `#popupWhenClickContact`.
    4. Nếu bấm "Hủy" $\rightarrow$ đóng modal.
    5. Nếu bấm `.btnContact` $\rightarrow$ mở tab mới chuyển tới Zalo/gọi điện.

---

### 2.3. Bảng Ma Trận Kích Hoạt Sequence Toàn Web

| Vị trí nút | Chữ trên nút / Icon | Loại Trigger | Tham số truyền vào | Hành vi sequence chuẩn 100% |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Header** | `ĐẶT PHÒNG` | `.callContactLocate` | `stylecontact="zalo"` | Mở `#popupContact_1`, gán link Zalo của 3 chi nhánh |
| **Hero Section** | `Nhắn Zalo tư vấn` | `.callContactLocate` | `stylecontact="zalo"` | Mở `#popupContact_1`, gán link Zalo |
| **Hero Section** | `Gọi ngay` | `.callContactLocate` | `stylecontact="phone"` | Mở `#popupContact_1`, gán link tel: |
| **Floating Bar (Phải)** | `Chat face` | `.callContactLocate` | `stylecontact="messenger"` | Mở `#popupContact_1`, gán link m.me |
| **Floating Bar (Phải)** | `Chat Zalo` | `.callContactLocate` | `stylecontact="zalo"` | Mở `#popupContact_1`, gán link Zalo |
| **Floating Bar (Phải)** | `Phone` | `.contactCallPopUp` | `contacttext="Gọi điện"`<br>`datahref="tel:0383104010"` | Mở `#popupWhenClickContact` xác nhận gọi Hotline |
| **Floating Bar (Phải)** | `PageUp (Về đầu trang)` | Click Event | Scroll top animation | Cuộn mượt màn hình lên vị trí `top: 0` |
| **Mobile Bottom Bar** | `Messenger` | `.callContactLocate` | `stylecontact="messenger"` | Mở `#popupContact_1` |
| **Mobile Bottom Bar** | `Phone (Nút tròn giữa)` | `.callContactLocate` | `stylecontact="phone"` | Mở `#popupContact_1` |
| **Mobile Bottom Bar** | `Zalo` | `.callContactLocate` | `stylecontact="zalo"` | Mở `#popupContact_1` |
| **Mobile Bottom Bar** | `Tin nhắn` | `.callContactLocate` | `stylecontact="sms"` | Mở `#popupContact_1` với link `sms:` |
| **Branches Section** | `Hỏi phòng` (trên từng card) | `.contactCallPopUp` | `contacttext="Chat Zalo"`<br>`datahref="[Zalo chi nhánh đó]"` | Mở `#popupWhenClickContact` |
| **Branches Section** | `Gọi ngay` (trên từng card) | `.contactCallPopUp` | `contacttext="Gọi điện"`<br>`datahref="[Phone chi nhánh đó]"` | Mở `#popupWhenClickContact` |
| **Concept Rooms** | `Hỏi phòng [Tên]` | `.callContactLocate` | `stylecontact="phone"` | Mở `#popupContact_1` |
| **Pricing Section** | `Hỏi phòng [Hạng]` | `.callContactLocate` | `stylecontact="zalo"` | Mở `#popupContact_1` |
| **Events Section** | `Tư vấn set trang trí` | `.callContactLocate` | `stylecontact="zalo"` | Mở `#popupContact_1` |
| **Final CTA** | `Nhắn Zalo tư vấn` | `.callContactLocate` | `stylecontact="zalo"` | Mở `#popupContact_1` |
| **Final CTA** | `Gọi ngay` | `.callContactLocate` | `stylecontact="phone"` | Mở `#popupContact_1` |
| **Footer** | SĐT Hotline | `.contactCallPopUp` | `contacttext="Gọi điện"`<br>`datahref="tel:038 310 4010"` | Mở `#popupWhenClickContact` |
| **Footer** | Email | `.contactCallPopUp` | `contacttext="Gửi email"`<br>`datahref="mailto:..."` | Mở `#popupWhenClickContact` |

---

## 3. ĐIỀU HƯỚNG & THANH THAO TÁC CỐ ĐỊNH (NAVIGATION & FLOATING CONTROLS)

### 3.1. Desktop Header (`#menuNKTA #menuMixPremiumDesktop`)
- **HTML Container:**
```html
<div id="menuNKTA">
  <div id="menuMixPremiumDesktop">
    <div class="mixPremiumMenuWrap">
      <div class="container">
        <div class="mixPremiumMenuInner">
          <div class="mixPremiumLogoBox">
            <a class="mixPremiumLogoLink" href="/" title="home">
              <img alt="mixhotel" class="mixPremiumLogoImg" src="/uploads/images/mix-boutique-logo.png">
            </a>
          </div>
          <div class="mixPremiumNavBox">
            <!-- Menu items -->
          </div>
          <div class="mixPremiumActionBox">
            <a class="mixPremiumContactBtn callContactLocate" stylecontact="zalo">
              <i class="fa fa-phone"></i>
              <span>ĐẶT PHÒNG</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```
- **Menu Hierarchy (Cấu trúc danh mục cấp 1 & cấp 2):**
  1. `GIỚI THIỆU` $\rightarrow$ `/gioi-thieu/`
  2. `KHÁCH SẠN TÌNH YÊU` (Dropdown `.mixPremiumHasDrop`) $\rightarrow$ `/khach-san-tinh-yeu/`:
     - `MIX BOUTIQUE PREMIUM` $\rightarrow$ `/mix-boutique-premium-hotel/`
     - `MIX BOUTIQUE HOTEL 256B ĐẶNG TIẾN ĐÔNG` $\rightarrow$ `/mix-boutique-hotel-256b-dang-tien-dong/`
     - `MIX BOUTIQUE HOTEL 20 PHÚC LA HÀ ĐÔNG` $\rightarrow$ `/mix-boutique-hotel-20-phuc-la-ha-dong/`
  3. `GALLERY` $\rightarrow$ `/gallery/`
  4. `TIN TỨC` (Dropdown `.mixPremiumHasDrop`) $\rightarrow$ `/tin-tuc/`:
     - `REVIEW KHÁCH SẠN TÌNH YÊU` $\rightarrow$ `/review-khach-san-tinh-yeu/`
     - `ĐỊA ĐIỂM HẸN HÒ DÀNH CHO CẶP ĐÔI` $\rightarrow$ `/dia-diem-hen-ho-danh-cho-cap-doi/`
     - `ĐỊA ĐIỂM ĐI CHƠI CHO CẶP ĐÔI` $\rightarrow$ `/dia-diem-di-choi-cho-cap-doi/`
     - `GỢI Ý QUÀ TẶNG CÁC DỊP LỄ` $\rightarrow$ `/goi-y-qua-tang-cac-diep-le/`
     - `KIẾN THỨC VỀ KHÁCH SẠN` $\rightarrow$ `/kien-thuc-ve-khach-san/`
     - `CẨM NANG TÌNH YÊU` $\rightarrow$ `/cam-nang-tinh-yeu/`
     - `CÁC ĐỊA CHỈ KHÁCH SẠN TÌNH YÊU` $\rightarrow$ `/cac-dia-chi-khach-san-tinh-yeu/`
  5. `SỰ KIỆN` $\rightarrow$ `#`
  6. `CHÍNH SÁCH` (Dropdown `.mixPremiumHasDrop`) $\rightarrow$ `#`:
     - `CHÍNH SÁCH THANH TOÁN` $\rightarrow$ `/chinh-sach-thanh-toan/`
     - `CHÍNH SÁCH BẢO MẬT THÔNG TIN` $\rightarrow$ `/chinh-sach-bao-mat-thong-tin/`
     - `CHÍNH SÁCH ĐẶT TRẢ PHÒNG` $\rightarrow$ `/chinh-sach-dat-tra-phong/`
  7. `LIÊN HỆ` $\rightarrow$ `/lien-he/`

---

### 3.2. Mobile Navigation (`#menuNKTA_MOBILE`)

Code clone hiện tại đang vẽ một header mobile khác biệt với web gốc. Web gốc có 3 khối mobile chuẩn:
1. **Top Bar cố định (`.menuTopPage`):**
   - Chỉ có 2 phần: Logo bên trái (`.logoPart`) và Icon menu 3 gạch bên phải (`.barsPart a.aTagBars`).
   - Tuyệt đối **không có** nút "ĐẶT PHÒNG" ở thanh top mobile.
2. **Drawer Menu trượt toàn màn hình (`.blockCateMobile`):**
   - Nút tắt màu đỏ vuông vức góc trên phải (`.hideBlock .xItem`).
   - Các danh mục có menu con mang class `.catePart.dropMore`:
     - Chứa icon mũi tên sang phải `.faFix.fa-angle-right` (khi đóng).
     - Chứa icon mũi tên chúc xuống `.faFix.fa-angle-down` (khi mở).
     - Submenu `.blockLevel2` hiển thị dạng accordion khi có class `.active`.
3. **Bottom Fixed Action Bar (`.menuEndPage`):**
   - Cố định đáy màn hình `bottom: 0`, chia 5 cột đối xứng:
     1. `.homePart`: Icon Trang chủ + Text "Trang chủ"
     2. `.messFacePart`: Icon Messenger + Text "Messenger" (trigger `#popupContact_1`)
     3. `.phonePart.centerPart`: **Nút tròn vàng nhô cao ở chính giữa** có hiệu ứng sóng tỏa ra liên tục `bigshake_2` và rung lắc điện thoại `latdat_2`. Bấm vào mở `#popupContact_1` với `stylecontact="phone"`.
     4. `.zaloPart`: Icon Zalo + Text "Zalo" (trigger `#popupContact_1`)
     5. `.inboxPart`: Icon Bản đồ/Tin nhắn + Text "Tin nhắn" (trigger `#popupContact_1`)

---

### 3.3. Desktop Floating Contact Bar (`#contactBtnBlock`)
- Vị trí: Canh giữa theo chiều dọc ở mép phải màn hình (desktop only, ẩn trên `< 768px`).
- Gồm 4 item:
  1. `.messengerBlock`: Icon Messenger + Text "Chat face" $\rightarrow$ hover có ripple tím, click mở `#popupContact_1`.
  2. `.zaloBlock`: Icon Zalo + Text "Chat Zalo" $\rightarrow$ hover có ripple xanh, click mở `#popupContact_1`.
  3. `.phoneBlock`: Icon Điện thoại + Text "Phone" $\rightarrow$ hover có ripple xanh đậm, click mở `#popupWhenClickContact` hỏi kết nối Hotline.
  4. `.pageUp`: Icon `<i class="fa fa-angle-double-up"></i>` $\rightarrow$ Click cuộn mượt lên đỉnh trang.

---

## 4. TRANG CHỦ: CHUẨN HÓA 12 VERTICAL SECTIONS

Để đạt 100% web gốc, toàn bộ các file tại `src/components/sections/` phải được refactor về đúng cấu trúc DOM và class của `mixhotel-luxury.css`:

### 4.1. `HeroSection.tsx` (`#top.mixLuxuryHero`)
- **Các lớp nền:** `.mixLuxuryHeroBg`, `.mixLuxuryHeroVeil`, `.mixLuxuryHeroFloor`, `.mixLuxuryHeroGlow`.
- **Cột trái:**
  - Kicker: `<div class="mixLuxuryKicker">Khách sạn tình yêu tại Hà Nội</div>`
  - Title: `<div class="mixLuxuryDisplay">Mix Boutique Hotel phòng concept <span class="mixLuxuryGold">riêng tư</span> cho hai người</div>`
  - Desc: `.mixLuxuryLead`
  - Actions: 2 nút `.mixLuxuryBtnPrimary` (Nhắn Zalo tư vấn) và `.mixLuxuryBtnOutline` (Gọi ngay) cùng mở `#popupContact_1`.
  - 4 Stats: `3` (chi nhánh Hà Nội dễ di chuyển), `32+` (phòng concept đổi gió cho cặp đôi), `199k` (giá từ 199.000 VND / 2h đầu), `Kín đáo` (riêng tư, an tâm, không lo thông tin).
  - `.mixLuxuryMobileShots`: 3 ảnh nhỏ xem trước trên mobile (`thu-vien-1.webp`, `thu-vien-2.webp`, `thu-vien-3.webp`).
- **Cột phải (`.mixLuxuryReserve`):**
  - Tiêu đề: `Giữ phòng nhanh nhất`
  - Mô tả: `Gửi nhu cầu, Mix sẽ liên hệ xác nhận tình trạng phòng trống. Muốn phản hồi nhanh nhất, hãy nhắn Zalo trực tiếp.`
  - Form:
    - `name="name" placeholder="Họ tên *"`
    - `name="phone" placeholder="Điện thoại *"`
    - `<select name="extra[Chi nhánh mong muốn]">`: 3 chi nhánh.
    - `<select name="extra[Nhu cầu]">`: Nghỉ giờ, Qua đêm, Trang trí sinh nhật / kỷ niệm, Tư vấn concept phù hợp.
    - Nút submit: `Gửi yêu cầu giữ phòng`.
  - Note: `Chưa đặt cọc: Mix hỗ trợ giữ phòng 15-20 phút, tùy tình trạng phòng.`

### 4.2. `RealPhotosSection.tsx` (`#real-photos.mixLuxuryPhotos`)
- Aura trang trí: `.mixLuxuryPhotosAuraOne`, `.mixLuxuryPhotosAuraTwo`.
- Stage bố trí:
  - Khối to bên trái `.mixLuxuryPhotoMain`: Badge `01 Featured room`, caption "Không gian boutique riêng tư, ánh sáng rõ và có gu".
  - Lưới 5 ô bên phải `.mixLuxuryPhotoGrid`:
    1. Ô to đầu tiên `.mixLuxuryPhotoTileLarge`: Badge `HOT CONCEPT` - `Dụng cụ BDSM` (Eden).
    2. Ô 2: Badge `Bathtub room` - `Bồn tắm Jacuzzi`.
    3. Ô 3: Badge `Romantic` - `Cosplay`.
    4. Ô 4: Badge `Boutique mood` - `Ghế tình yêu`.
    5. Ô 5: Badge `Netflix & Chill` - `Smart Tivi có Netflix`.

### 4.3. `VideoSection.tsx` (`#videos.mixLuxuryVideos`)
- 2 Khối Shorts dựng đứng (`.mixLuxuryShortItem`):
  1. `01` - `Đêm ngàn sao cho đôi tình nhân THĂNG HOA RẠO RỰC Mixboutique Hotel` (ID: `qyeqmaNJYbY`).
  2. `02` - `TOGETHER and to Mixboutique Hotel đưa nhau lên tởi "đỉnh chóp' khiên nàng tuôn trào tưng nhịp thở 😍` (ID: `_3pSDfR8Ccw`).
  - Sử dụng `.mixLuxuryYoutubeLite` với thumbnail YouTube HQ, nút play tròn mạ vàng ở giữa.
- Khối Showcase kênh YouTube Mix (`.mixLuxuryVideoPanel`):
  - 3 Bullets nổi bật.
  - Video preview kênh: ID `Ts4seBpirOA`.
  - 2 Action CTA: `Nhắn Zalo chọn phòng` (mở `#popupContact_1`) và `Xem kênh YouTube` (link ra ngoài).

### 4.4. `ConceptRoomsSection.tsx` (`#concept.mixLuxuryConcept`)
- Danh sách 4 phòng concept tiêu biểu dạng dọc (`.mixLuxuryRoom`):
  1. **Room 302 - Karma:** Tags (Smart Tivi có Netflix, Giường tròn, Cosplay). Nút "Hỏi phòng" mở popup + nút "Xem chi tiết phòng" link `/khach-san-tinh-yeu/karma/`.
  2. **VIP Room 401 - Katana:** Tags (Ghế tình yêu, Bồn tắm, Smart Tivi có Netflix, Dụng cụ BDSM, Cosplay). Link `/khach-san-tinh-yeu/katana/`.
  3. **Room 402 - Amora:** Tags (Cosplay). Link `/khach-san-tinh-yeu/amora/`.
  4. **VIP Room 469 - Cloud Nine:** Tags (Bồn tắm, Máy chiếu phim, Cosplay). Link `/khach-san-tinh-yeu/cloud-nine/`.
- Cấu trúc từng phòng phải có `.mixLuxuryRoomShell`, `.mixLuxuryRoomInfo` (bên trái), `.mixLuxuryRoomVisual` (ảnh lớn + 2 ảnh mini bên phải).

### 4.5. `BranchesSection.tsx` (`#branches.mixBranches`)
- Header: Kicker `3 chi nhánh Hà Nội`, Title `Chọn điểm gần bạn, Mix tư vấn phòng còn trống`.
- 3 Cards chi nhánh (`.mixBranchesCard`):
  - **Card 1 (Huỳnh Thúc Kháng):** Mang class `.mixBranchesCardHot`, Tag `Premium`, Badge `Chi nhánh nổi bật 01`.
  - **Card 2 (256B Đặng Tiến Đông):** Tag `Hotel`, Badge `Khu Đống Đa 02`.
  - **Card 3 (20 Phúc La Hà Đông):** Tag `Hotel`, Badge `Hà Đông - Xa La 03`.
- Nút bấm trên từng Card: Cả 2 nút `Hỏi phòng` (Zalo) và `Gọi ngay` (Phone) đều kích hoạt `#popupWhenClickContact`.

### 4.6. `WhyChooseUsSection.tsx` (`#why.mixWhy`)
- Title: `Tập trung vào điều khách lo trước khi đặt`.
- 4 Card (`.mixWhyCard`):
  - Card 1: Số `1` viền tròn vàng - `Riêng tư`.
  - Card 2: Số `2` - `Ảnh thật`.
  - Card 3: Số `3` - `Giá rõ`.
  - Card 4: Số `4` - `Có event`.
- Không sử dụng icon Lucide, sử dụng đúng thẻ `<div class="mixWhyIconWrap"><span class="mixWhyIconNumber">1</span></div>`.

### 4.7. `PricingSection.tsx` (`#prices.mixPrices`)
- Title: `Giá từ <span class="mixPricesGold">199k/2h</span> rõ ràng trước khi đặt`.
- 3 Cột giá (`.mixPricesGrid`):
  - **Superior:** 199k / 2h đầu. Thêm giờ: 50k/h. Qua đêm: 500k. Ngày đêm: 700k. Nút `Hỏi phòng Superior`.
  - **Deluxe:** Class `.mixPricesCardHot`, Ribbon `Được chọn nhiều`. 300k / 2h đầu. Thêm giờ: 50k/h. Qua đêm: 600k. Ngày đêm: 800k. Nút `Hỏi phòng Deluxe`.
  - **VIP:** 400k / 2h đầu. Thêm giờ: 80k/h. Qua đêm: 800k. Ngày đêm: 1.000k. Nút `Hỏi phòng VIP`.
- Tất cả các nút bấm mở `#popupContact_1` với `stylecontact="zalo"`.

### 4.8. `EventsSection.tsx` (`#events.mixEvents`)
- Bảng giá set trang trí (`.mixEventsPanel`):
  - Nến - hoa - bóng, free 1 rượu: `1.490k - 1.990k`
  - Set rượu - hoa - nến: `590k`
  - Nến + hoa + bánh gato: `650k`
  - Bánh kem / trái cây: `350k / 300k`
  - Nút: `Tư vấn set trang trí` (mở `#popupContact_1`).
- Lưới 4 ảnh chụp thực tế set trang trí: `.mixEventsPhotoLarge`, 2 ảnh vuông, 1 ảnh cao `.mixEventsPhotoTall`.

### 4.9. `BookingStepsSection.tsx` (`#bookingSteps.mixBookingSteps`)
- Title: `3 bước gọn để có phòng phù hợp`.
- 3 Card:
  - Step 01: `Gửi nhu cầu` (Nhắn Zalo chi nhánh, khung giờ, concept).
  - Step 02: `Mix xác nhận` (Tư vấn phòng trống, giá và set trang trí).
  - Step 03: `Giữ phòng` (Chưa cọc giữ 15-20 phút, qua đêm/cuối tuần cọc 50%).

### 4.10. `FaqSection.tsx` (`#faq.mixFaq`)
- Sử dụng thẻ HTML chuẩn: `<details class="mixFaqItem"><summary class="mixFaqQuestion"><span>...</span><i class="mixFaqIcon"></i></summary><div class="mixFaqAnswer"><p>...</p></div></details>`.
- 4 Câu hỏi chuẩn gốc:
  1. Mix có nhận khách dưới 18 tuổi không? $\rightarrow$ Không. Chỉ nhận từ 18 tuổi trở lên.
  2. Chưa đặt cọc có giữ phòng được không? $\rightarrow$ Giữ 15-20 phút.
  3. Có cần đặt cọc không? $\rightarrow$ Nghỉ > 4h, qua đêm hoặc cuối tuần cọc 50%.
  4. Có được mang đồ ăn vào phòng không? $\rightarrow$ Được mang, hạn chế đồ nặng mùi.

### 4.11. `FinalCtaSection.tsx` (`#finalCta.mixFinalCta`)
- Nền ảnh cuối trang `cuoi-trang.jpg` có 2 line vàng mờ trên/dưới (`.mixFinalCtaLineTop`, `.mixFinalCtaLineBottom`).
- Tiêu đề: `Muốn xem phòng còn trống? Nhắn Zalo để Mix gửi ảnh và giá phù hợp`.
- 2 Nút CTA mở `#popupContact_1`: `Nhắn Zalo tư vấn` và `Gọi ngay`.

### 4.12. `FooterSection.tsx` (`.mixFooterPremium`)
- 4 Cột chuẩn web gốc:
  - **Cột 1 (Thông tin khách sạn):** Công ty Linh Khanh, MST 0108646173, ngày cấp 13/03/2019, CS1 Huỳnh Thúc Kháng, SĐT `038 310 4010`, Email, Website, Badge DMCA & Huy hiệu Đã Thông Báo Bộ Công Thương.
  - **Cột 2 (Thông tin hỗ trợ):** Menu links (Giới thiệu, Phòng, Liên hệ) + Social Icons (Facebook, YouTube, Instagram, Pinterest).
  - **Cột 3 (Chính sách):** Menu links 3 chính sách + Thông tin Hộ Kinh Doanh Mix Boutique (GPKD 01E8034179, Số 186 Hoàng Ngân).
  - **Cột 4 (Kết nối):** Banner Fanpage Facebook.
- Dòng bản quyền: `Copyright © 2020 mixhotel.vn. All Rights Reserved. Design web and SEO by FAGO AGENCY`.

---

## 5. 3 TRANG CHI NHÁNH RIÊNG BIỆT (BRANCH DETAIL PAGES)

Các route chi nhánh:
- `/mix-boutique-premium-hotel/`
- `/mix-boutique-hotel-256b-dang-tien-dong/`
- `/mix-boutique-hotel-20-phuc-la-ha-dong/`

### 5.1. Cấu trúc template chuẩn của từng trang chi nhánh
Mỗi trang chi nhánh là một Landing Page hoàn chỉnh gồm 7 phần:
1. **`.mixBoutiqueHero`:**
   - Kicker chỉ rõ địa điểm (ví dụ: `Khách sạn tình yêu Huỳnh Thúc Kháng`).
   - Title: `Mix Boutique Premium riêng tư cho hai người`.
   - 3 Nút: Nhắn Zalo tư vấn (mở `#popupWhenClickContact`), Gọi điện (mở `#popupWhenClickContact`), Xem phòng (anchor `#rooms`).
   - 4 Stats: 199k giá từ, số lượng phòng concept, 15-20p giữ phòng, 18+.
   - Card bên phải: `Địa chỉ Premium` + 3 bullets cam kết + badge `Tư vấn nhanh 24/7`.
2. **`.mixRoomShowcase#rooms`:**
   - Phòng tiêu biểu nhất chi nhánh (Ví dụ CS1 là `VIP Room 469 - Cloud Nine`).
   - Giá phòng, mô tả chi tiết, 3 tiện ích nổi bật có icon (`bon-tam.png`, `may-chieu-phim.png`, `Icon_cosplay.png`).
   - 3 Nút: Liên hệ (mở `#popupWhenClickContact`), Chi tiết (link `/khach-san-tinh-yeu/cloud-nine/`), Giữ phòng (anchor `#form-lien-he`).
3. **`.mixVideoPremium#video-phong`:**
   - 2 Video review thật của chi nhánh.
4. **Các Section Phòng Riêng Biệt Đan Xen (`.mixRoomPremium` & `.mixRoomPremiumSecond .mixRoomPremiumBlockReverse`):**
   - Đan xen so le (ảnh trái - chữ phải, rồi ảnh phải - chữ trái).
   - Mỗi phòng hiển thị: Kicker, Tên phòng, Mô tả, List tiện ích icon, Bảng 3 mức giá (Giá giờ 2h đầu, Qua đêm 22h-12h, Cả ngày 14h-12h).
   - 3 Nút: "Đặt phòng [Tên]" (anchor `#form-lien-he`), "Xem chi tiết phòng" (link `/khach-san-tinh-yeu/[slug]/`), "Gọi tư vấn" (mở `#popupWhenClickContact`).
5. **Form Đặt Phòng Riêng Cho Chi Nhánh (`#form-lien-he.mixBoutiqueBooking`):**
   - Tự động điền trước Chi nhánh hiện tại.
6. **FAQ Riêng của Chi Nhánh.**
7. **Footer chuẩn.**

---

## 6. TRANG DANH MỤC KHÁCH SẠN TÌNH YÊU (`/khach-san-tinh-yeu/`)

Web gốc xây dựng trang này như một cẩm nang tổng hợp kiêm chọn phòng trực tiếp:
1. **`.cateMixHero`:**
   - H1: `Chọn đúng chi nhánh / Khách sạn tình yêu`.
   - 3 Nút CTA: Nhắn Zalo tư vấn, Gọi điện, Chọn chi nhánh (anchor `#chon-chi-nhanh`).
   - 4 Stats & 3 Pills địa chỉ chi nhánh.
2. **`.cateBranchSection#chon-chi-nhanh`:**
   - 3 Tab điều hướng nhanh: `#branch-mix-boutique-premium-hotel`, `#branch-mix-boutique-hotel-256b-dang-tien-dong`, `#branch-mix-boutique-hotel-20-phuc-la-ha-dong`.
   - 3 Khối Card chi nhánh lớn (`.cateBranchCard`), mỗi khối gồm:
     - Ảnh bìa chi nhánh + Badge tên chi nhánh.
     - Tên, địa chỉ, lưu ý, tags số lượng phòng & giá các hạng.
     - Lưới toàn bộ các phòng của chi nhánh đó (`.cateBranchRooms -> .cateBranchRoom`): Ảnh phòng, Tên phòng, Giá từ (... VND/2h), Mô tả, Nút `Xem chi tiết phòng` dẫn sang `/khach-san-tinh-yeu/[slug]/`.
3. **Bài Viết Nghiệp Vụ SEO & Hướng Dẫn:**
   - Mục lục tự động, nội dung phân tích "Khách sạn tình yêu là gì?", giải thích các tiện ích đặc thù (ghế Tantra, lồng chim, bồn sục Jacuzzi, phòng Cinema).
   - FAQPage Schema và Accordion giải đáp thắc mắc.

---

## 7. TRANG CHI TIẾT PHÒNG ĐỘC BẢN (`/khach-san-tinh-yeu/[slug]/`)

Áp dụng cho toàn bộ các phòng (ví dụ `/khach-san-tinh-yeu/karma/`, `katana`, `amora`, `cloud-nine`, `eden`, `bad-girl`, `inferno`, v.v.):
1. **`.mixDetailHero`:**
   - Kicker: Tên phòng.
   - Title: Tên phòng lớn (font 80px).
   - Mô tả cảm xúc và điểm nhấn phòng.
   - 2 Nút: `Nhắn Zalo giữ phòng` và `Gọi lễ tân` (đều mở `#popupWhenClickContact`).
   - 4 Stats: Giá 2h đầu, giá thêm giờ, thời gian giữ phòng 15-20p, 18+.
   - Card tóm tắt bên phải: Giá từ, 4 gạch đầu dòng tính năng, địa chỉ chi nhánh.
2. **`.roomYoutubeDetail`:**
   - Video quay cận cảnh góc phòng, ánh sáng thực tế.
3. **`.roomImageDetailGallery`:**
   - Khối xem ảnh lớn (`.roomImageDetailGalleryMain`) + Dải ảnh thumbnails (`.roomImageDetailGalleryThumbs`).
   - Tương tác: Click thumbnail nào thì ảnh lớn lập tức đổi sang ảnh đó; có nút "Xem ảnh lớn" phóng to Fancybox.
4. **`.detailConceptPremium`:**
   - Khối giới thiệu sâu về phong cách (Ví dụ Karma: "Đỏ để khơi cảm xúc, riêng tư để khám phá nhiều hơn").
   - 4 Card đặc điểm: Tone màu, Nội thất, Ghế S-curve, Tiện nghi.
5. **`.detailPricePremium`:**
   - Bảng 4 gói giá: 2 giờ đầu, Thêm mỗi giờ, Qua đêm (22h-12h), Ngày đêm (14h-12h).
   - Quy định đặt cọc 50% rõ ràng.
6. **`.detailOccasionPremium`:**
   - 3 Dịp phù hợp: 01 Đổi gió sau tuần bận, 02 Kỷ niệm ngày yêu/ngày cưới, 03 Buổi hẹn cần kín đáo.
7. **`.detailBookingPremium#chi-tiet-pro`:**
   - Form đặt phòng đầy đủ: Họ tên, SĐT, Địa chỉ chi nhánh (Select), Phòng quan tâm (Select - **tự động chọn đúng phòng này**), Ngày nhận/trả, Giờ vào/ra, Số khách, Ghi chú.
8. **`.detailMemorySection`:**
   - Bảng gói trang trí bất ngờ (Gói hoa nến bóng, Bánh kem, Set rượu).
9. **`.detailFaqSection`:**
   - 4 Câu hỏi thường gặp riêng cho từng phòng.

---

## 8. HỆ THỐNG TIN TỨC & ĐIỀU HƯỚNG DANH MỤC CON (NEWS & SUBCATEGORIES)

### 8.1. Cấu trúc định tuyến (URL Architecture)
Web gốc không gom chung tin tức vào một URL kèm query string mà chia thành **7 danh mục con độc lập**:
- `/review-khach-san-tinh-yeu/`
- `/dia-diem-hen-ho-danh-cho-cap-doi/`
- `/dia-diem-di-choi-cho-cap-doi/`
- `/goi-y-qua-tang-cac-diep-le/`
- `/kien-thuc-ve-khach-san/`
- `/cam-nang-tinh-yeu/`
- `/cac-dia-chi-khach-san-tinh-yeu/`
Và trang danh mục tổng: `/tin-tuc/`.

**Đặc biệt lưu ý về bài viết chi tiết:** Web gốc đặt slug bài viết ngay tại root domain:
- `https://mixhotel.vn/khach-san-vintage/`
- `https://mixhotel.vn/khach-san-phong-cach-tropical/`
- `https://mixhotel.vn/khach-san-phong-cach-indochine/`
- `https://mixhotel.vn/khach-san-gan-lang-bac/`

> **Giải pháp kỹ thuật trong Next.js App Router:**
> 1. Có thể tạo route `src/app/[slug]/page.tsx` hoặc cấu hình `rewrites` trong `next.config.ts` để map từ `/[slug]` vào trình xử lý bài viết nếu slug không khớp với các route tĩnh.
> 2. Đảm bảo hỗ trợ cả đường dẫn `/tin-tuc/[slug]` và `/[slug]`.

### 8.2. Giao diện trang danh mục tin tức (`#cateNewsMix`)
- Breadcrumb: Trang chủ > Tin Tức.
- Tiêu đề khối: `.titleBlock_1` có thanh gạch chân màu vàng.
- Lưới bài viết: `.rowFix` chia 3 cột (trên mobile 1 cột), mỗi bài là một card `.specialBlock_4`:
  - Ảnh đại diện có hiệu ứng bóng lướt qua khi hover (`.figure2`).
  - Icon chuyên mục: `<i class="fa fa-newspaper-o"></i> Tin trong ngành`.
  - Tiêu đề `.titleNews` giới hạn 2 dòng.
  - Mô tả `.description` giới hạn 3 dòng.
- Phân trang chuẩn `.paginationBlock` (`1, 2, 3, >, >>`).

### 8.3. Giao diện chi tiết bài viết (`#detailNewsMix`)
- Breadcrumbs chi tiết.
- Tiêu đề bài viết H1: `.size-3vw.titlePost`.
- Tóm tắt in đậm: `.size-1`.
- **Mục lục tự động (`.tableOfContent`):**
  - Tiêu đề "Nội dung bài viết:" kèm icon chevron `.fa-angle-down.clickToggle` thu gọn/mở rộng.
  - Danh sách liên kết neo (`#bookmark-list ul li a`) trỏ chính xác đến các thẻ H2/H3 trong bài.
- **Nội dung bài viết (`.data_contents.getTableOfContentBlock`):** Căn đều 2 bên, ảnh căn giữa có chú thích in nghiêng, bảng biểu có border rõ nét, các trích dẫn `.blockquote`.
- **Khối bài viết liên quan cuối trang (`.highlightPostBlock`):** Carousel các bài viết cùng chủ đề `.specialBlock_3`.

---

## 9. CÁC TRANG PHỤ: GALLERY, GIỚI THIỆU, LIÊN HỆ, CHÍNH SÁCH

### 9.1. Trang Thư Viện Ảnh (`/gallery/` - `.galerryMix`)
- Thanh lọc theo chi nhánh (`.wrapSubcateBlock_1 .subcateBlock_1`):
  - Gallery Mix Boutique Hotel 186 Hoàng Ngân
  - Gallery Mix Boutique Hotel 256B Đặng Tiến Đông
  - Gallery Mix Boutique Hotel 20 Phúc La Hà Đông
- Lưới ảnh `.gold-rectangle.slideshow`: Chia 3 cột trên desktop, hiển thị ảnh phòng, tên phòng có link dẫn tới chi tiết phòng.
- Phân trang `.paginationBlock`.
- Modal trình chiếu ảnh phóng to `.galleryshow`.

### 9.2. Trang Giới Thiệu (`/gioi-thieu/` - `#introduceMixhotel`)
- Tiêu đề 2 dòng: `GIỚI THIỆU / VỀ KHÁCH SẠN TÌNH YÊU` kèm gạch ngang `.underLineTitle`.
- Khẩu hiệu: *ĐỪNG ĐỂ TÌNH YÊU CỦA BẠN CHỈ CÓ MỘT MÀU!*
- Đoạn văn kể câu chuyện thương hiệu và ảnh giới thiệu lớn.
- Khối 6 tiện ích (`.specialBlock_8`): Wifi nhanh, Bồn tắm, Cosplay, An toàn, Đồ chơi, Dịch vụ.
- Video giới thiệu nhúng YouTube iframe (`lEnIPMzq2YU`).
- Khối đánh giá khách hàng (`.banner-5`): 4 card review có avatar tròn, họ tên, chức danh, 5 sao vàng và lời nhận xét chân thực.

### 9.3. Trang Liên Hệ (`/lien-he/` - `#contactMixHotel`)
- Cột trái: Form gửi thông tin cá nhân (Họ tên, Điện thoại, Email, Nội dung).
- Cột phải:
  - Địa chỉ 3 cơ sở (click mở `#popupWhenClickContact` chỉ đường).
  - Số điện thoại Hotline `038 310 4010` (click mở `#popupWhenClickContact` gọi điện).
  - Email (click mở `#popupWhenClickContact` gửi email).
  - Social Links (Facebook, YouTube, Instagram).
- Khối bản đồ phía dưới (`.specialBlock_2 .wrapAllMaps`): 3 iframe Google Maps nhúng trực tiếp vị trí của 3 chi nhánh.

### 9.4. 3 Trang Chính Sách
- `/chinh-sach-thanh-toan/`
- `/chinh-sach-bao-mat-thong-tin/`
- `/chinh-sach-dat-tra-phong/`
- Cấu trúc: Breadcrumbs + Thẻ nội dung `.data_contents` hiển thị điều khoản rõ ràng, chân trang Footer chuẩn.

---

## 10. LỘ TRÌNH THỰC THI TỪNG BƯỚC DÀNH CHO AGENT (CHECKLIST)

Agent tiếp nhận thực hiện lần lượt theo các bước sau, **kiểm tra kỹ sau mỗi bước**:

- [ ] **Bước 1: Chuẩn hóa 2 Modal Toàn Cục (`ContactModal` & `ConnectConfirmModal`)**
  - Dựng component `BranchSelectModal` khớp 100% ID `#popupContact_1` và style của `mixhotel-luxury.css`.
  - Dựng component `ConnectConfirmModal` khớp 100% ID `#popupWhenClickContact`.
  - Đặt cả 2 modal tại Root Layout hoặc Global Context để bất kỳ nút nào trên toàn bộ các trang cũng kích hoạt được đúng sequence.
- [ ] **Bước 2: Chuẩn hóa Header & Mobile Navigation**
  - Refactor `DesktopHeader.tsx`: Khớp markup `#menuNKTA #menuMixPremiumDesktop`, chuẩn hóa menu cấp 1, cấp 2 và nút ĐẶT PHÒNG.
  - Refactor `MobileHeader.tsx`: Khôi phục thanh top tối giản (Logo + Bars), dựng drawer `.blockCateMobile` có accordion mũi tên và nút tắt đỏ.
  - Refactor `MobileActionBar.tsx`: Dựng đúng `.menuEndPage` 5 cột, nút Phone giữa nhô cao có pulse glow `bigshake_2` và wobble `latdat_2`.
  - Refactor `DesktopContactBar.tsx`: Khớp đúng ID `#contactBtnBlock`, text "Phone", keyframe `bigshake_1` và nút cuộn mượt `pageUp`.
- [ ] **Bước 3: Chuẩn hóa 12 Vertical Sections Trang Chủ**
  - Chuyển toàn bộ các file trong `src/components/sections/` sang sử dụng BEM class của `mixhotel-luxury.css`.
  - Gắn đúng các trigger `.callContactLocate` và `.contactCallPopUp` theo Ma trận tương tác tại Mục 2.3.
- [ ] **Bước 4: Chuẩn hóa 3 Trang Chi Nhánh**
  - Refactor `BranchDetailTemplate.tsx` về chuẩn `.mixBoutiqueHero`, `.mixRoomShowcase`, `.mixVideoPremium`, `.mixRoomPremium`.
  - Đảm bảo cả 3 route `/mix-boutique-premium-hotel`, `/mix-boutique-hotel-256b-dang-tien-dong`, `/mix-boutique-hotel-20-phuc-la-ha-dong` hiển thị đúng danh sách phòng và hotline riêng.
- [ ] **Bước 5: Chuẩn hóa Trang Danh Mục Phòng & Chi Tiết Phòng**
  - Khôi phục layout `.cateMixHero` và `.cateBranchSection#chon-chi-nhanh` tại `/khach-san-tinh-yeu/page.tsx`.
  - Khôi phục layout `.mixDetailHero`, `.roomImageDetailGallery`, `.detailPricePremium`, `.detailBookingPremium` tại `/khach-san-tinh-yeu/[slug]/RoomDetailClient.tsx`.
  - Tự động chọn đúng phòng và chi nhánh vào form khi bấm đặt phòng từ chi tiết phòng.
- [ ] **Bước 6: Cấu hình Routing & Giao Diện Hệ Thống Tin Tức**
  - Tạo các route tĩnh cho 7 danh mục tin tức con.
  - Cấu hình rewrites/dynamic routing để truy cập được cả `/[slug]/` và `/tin-tuc/[slug]/`.
  - Chuẩn hóa layout bài viết chi tiết: mục lục bấm nhảy mượt tới thẻ heading, bảng đối chiếu, carousel bài viết liên quan.
- [ ] **Bước 7: Chuẩn hóa Gallery, Giới Thiệu, Liên Hệ, Chính Sách**
  - Hoàn thiện `/gallery/` (tabs lọc chi nhánh, grid ảnh, lightbox).
  - Hoàn thiện `/gioi-thieu/` (câu chuyện, 6 tiện ích, video, testimonials).
  - Hoàn thiện `/lien-he/` (form, hotline, 3 map iframe).
  - Hoàn thiện 3 trang chính sách.
- [ ] **Bước 8: Kiểm thử toàn diện & Verification Loop**
  - Chạy `npm run build` để kiểm tra toàn bộ static paths, type errors.
  - Kiểm tra giao diện trên cả Desktop (1920x1080, 1366x768) và Mobile (375x812, 412x915).
  - Kiểm tra từng chuỗi thao tác bấm nút: Đảm bảo popup mở đúng, số điện thoại và link Zalo kết nối chính xác 100% đến từng chi nhánh.
