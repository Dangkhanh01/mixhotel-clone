# FEATURE SPECIFICATION: 01 - FOUNDATION AND THEME SETUP

**Feature Branch:** `feat/01-foundation-and-theme`  
**Status:** Ready for Planning & Implementation  
**Feature Scope:** Khởi tạo nền tảng Full Site Editing Block Theme (`mixhotel-theme`), cấu hình file `theme.json` tích hợp toàn bộ Design Tokens (Màu sắc, Typography Questrial/Roboto, Spacing), và khung sườn Plugin nghiệp vụ (`mixhotel-core`).

---

## 1. CLARIFICATIONS (GỠ BỎ ĐIỂM MƠ HỒ)

* **Q: Có sử dụng Bootstrap hay Tailwind CSS trong theme không?**
  * **A:** KHÔNG. Toàn bộ styling được quản trị tập trung thông qua `theme.json` và Vanilla CSS tinh gọn để tối đa hóa hiệu năng và tương thích 100% với WordPress Site Editor.
* **Q: Font chữ Questrial và Roboto được tải từ đâu?**
  * **A:** Khai báo trực tiếp trong `theme.json` thông qua cấu hình `typography.fontFamilies`, tải an toàn từ Google Fonts CDN hoặc local assets để tối ưu hóa tốc độ hiển thị chữ đầu tiên (FCP).
* **Q: Cấu trúc template FSE cơ bản gồm những file nào?**
  * **A:** Bắt buộc gồm `style.css`, `theme.json`, `templates/index.html`, `templates/front-page.html`, `parts/header.html`, `parts/footer.html`.

---

## 2. USER SCENARIOS & ACCEPTANCE CRITERIA (CHUẨN GHERKIN)

### User Story 1 — Hệ Thống Design Tokens & Bảng Màu (Priority: P1)
> Là một lập trình viên/người biên tập, tôi muốn theme tự động nhận diện bảng màu Dark Luxury và font chữ Questrial/Roboto để khi thêm bất kỳ khối Block nào trong Site Editor cũng giữ đúng nhận diện thương hiệu `mixhotel.vn`.

* **Scenario 1.1 (Kiểm tra Palette màu trong Site Editor):**
  * **Given:** Theme `mixhotel-theme` đã được kích hoạt trong WordPress Admin.
  * **When:** Người dùng mở Site Editor (Giao diện $\rightarrow$ Trình chỉnh sửa).
  * **Then:** Bảng màu hệ thống hiển thị đầy đủ các màu: *Dark Primary (`#0f0f12`), Dark Secondary (`#17171c`), Luxury Gold (`#c5a880`), Sensual Crimson (`#c92a2a`)*.

* **Scenario 1.2 (Kiểm tra Typography):**
  * **Given:** Một đoạn tiêu đề H1/H2 và văn bản Paragraph bất kỳ được thêm vào trang.
  * **When:** Xem trước trang ở ngoài frontend.
  * **Then:** Tiêu đề H1/H2 tự động áp dụng font `Questrial` và văn bản áp dụng font `Roboto` mà không bị lỗi chân chữ (flash of unstyled text).

---

### User Story 2 — Khởi Tạo Plugin Nghiệp Vụ `mixhotel-core` (Priority: P1)
> Là một quản trị viên, tôi muốn CPT `hotel_room` và Taxonomy `room_amenity` được đăng ký tự động và độc lập với theme để dữ liệu phòng không bị mất khi thử đổi giao diện.

* **Scenario 2.1 (Kiểm tra Menu Quản trị WordPress):**
  * **Given:** Plugin `mixhotel-core` được kích hoạt.
  * **When:** Quản trị viên truy cập WP Admin Dashboard.
  * **Then:** Xuất hiện menu **"Phòng Khách Sạn"** (icon khách sạn/building), cho phép Thêm phòng mới và quản lý Danh mục Tiện nghi.

---

## 3. EDGE CASES (TÌNH HUỐNG BIÊN)

1. **Thiếu file `theme.json` hoặc sai cú pháp:** WordPress tự fallback về theme mặc định. $\rightarrow$ **Giải pháp:** Validate schema JSON trước khi commit.
2. **Xung đột permalink khi kích hoạt CPT:** Bấm vào xem phòng bị lỗi 404. $\rightarrow$ **Giải pháp:** Áp dụng quy tắc `BUG-02` trong `wordpress-bug-prevention/SKILL.md` (flush rewrite rules an toàn trong `register_activation_hook`).
3. **Màn hình cực nhỏ (< 360px):** Typography bị tràn viền. $\rightarrow$ **Giải pháp:** Sử dụng hàm CSS `clamp()` cho font size trong `theme.json`.

---

## 4. REQUIREMENTS

* **FR-001:** Bắt buộc có file `theme.json` chuẩn version 3 tương thích WordPress 6.x.
* **FR-002:** Plugin `mixhotel-core` phải tự động đăng ký CPT `hotel_room` và taxonomy `room_amenity`.
* **NFR-001:** Không phát sinh bất kỳ lỗi PHP Warning / Notice nào trong `WP_DEBUG_LOG`.
* **NFR-002:** File `style.css` của theme phải tải dưới 50ms trên môi trường local.
