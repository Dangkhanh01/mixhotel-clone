# FEATURE SPECIFICATION: 03 - ROOM CATALOG AND DETAIL

**Feature Branch:** `feat/03-room-catalog-and-detail`  
**Status:** Ready for Implementation  
**Prototype Source:** `ui/src/app/khach-san-tinh-yeu/page.tsx` (Archive) & `ui/src/app/khach-san-tinh-yeu/[slug]/RoomDetailClient.tsx` (Detail)

---

## 1. CLARIFICATIONS

* **Q: Dữ liệu phòng lấy từ đâu?**
  * **A:** Từ CPT `hotel_room` qua WP_Query. Mọi thông tin (tên, giá, ảnh, tiện nghi) đều được quản trị viên nhập trong WP Admin thông qua Custom Meta Boxes do plugin `mixhotel-core` cung cấp.

* **Q: Dữ liệu liên hệ (Zalo, Hotline) trên trang chi tiết phòng lấy từ đâu?**
  * **A:** Mỗi phòng liên kết với 1 chi nhánh (`hotel_branch`) qua meta `_mixhotel_room_branch_id`. Trang chi tiết phòng sẽ truy vấn chi nhánh tương ứng để lấy số hotline, link Zalo. Đây là **dữ liệu mẫu (Demo Sandbox)** phục vụ mục đích kỹ thuật, có thể đổi bất cứ lúc nào trong WP Admin → Chi Nhánh.

* **Q: Bộ lọc phòng hoạt động ra sao?**
  * **A:** Lọc theo taxonomy `room_amenity` (tiện nghi) bằng JavaScript thuần phía client (ẩn/hiện card). Không cần AJAX reload cho trang archive vì số lượng phòng không vượt quá 50.

* **Q: Gallery ảnh phòng chi tiết xử lý thế nào?**
  * **A:** Dùng meta `_mixhotel_room_gallery` (lưu mảng attachment IDs). PHP render grid thumbnails, JS xử lý click thumbnail → đổi ảnh lớn (active image swap). Không dùng lightbox plugin ngoài.

---

## 2. USER SCENARIOS & ACCEPTANCE CRITERIA

### US1 — Xem Danh Mục Phòng (Archive Page) (Priority: P1)
* **Given:** Khách truy cập `/khach-san-tinh-yeu/`.
* **When:** Trang tải xong.
* **Then:** Hiển thị grid card tất cả phòng (ảnh đại diện, tên, mô tả ngắn, tag tiện nghi, giá 2h đầu, nút Xem chi tiết & Hỏi phòng).

### US2 — Lọc Phòng Theo Tiện Nghi (Priority: P2)
* **Given:** Trang archive đã tải, có thanh filter phía trên grid.
* **When:** Bấm vào tag "Bồn tắm Jacuzzi".
* **Then:** Chỉ hiển thị phòng có taxonomy `room_amenity` = `bon-tam-jacuzzi`, các phòng không khớp bị ẩn với hiệu ứng fade.

### US3 — Xem Chi Tiết Phòng (Single Page) (Priority: P1)
* **Given:** Khách bấm vào card phòng hoặc truy cập `/khach-san-tinh-yeu/karma/`.
* **When:** Trang tải xong.
* **Then:** Hiển thị 6 section theo thứ tự: Hero (breadcrumb, badges, H1, CTA, stats), Gallery ảnh thật, Video YouTube (nếu có), Concept & Tiện nghi nổi bật, Bảng giá 4 mức (2h/Thêm giờ/Qua đêm/Cả ngày), Form giữ phòng nhanh.

### US4 — Bảng Giá Rõ Ràng (Priority: P1)
* **Given:** Khách đang xem trang chi tiết phòng.
* **When:** Cuộn đến section "Bảng giá".
* **Then:** Hiển thị grid 4 ô: 2 Giờ Đầu, Thêm Giờ, Qua Đêm (badge "Phổ biến"), Cả Ngày Đêm. Giá tiền lấy từ post meta, format số Việt Nam (VD: 350.000đ).

---

## 3. EDGE CASES

1. Phòng chưa có ảnh gallery → Ẩn section Gallery, hiển thị ảnh thumbnail mặc định.
2. Phòng chưa gán chi nhánh (`_mixhotel_room_branch_id` = 0) → Hiển thị "Liên hệ tổng đài" thay vì số trống.
3. Phòng chưa nhập giá → Hiển thị "Liên hệ" thay vì "0đ".
4. Không có phòng nào publish → Archive hiện thông báo "Chưa có phòng nào. Vui lòng quay lại sau."
