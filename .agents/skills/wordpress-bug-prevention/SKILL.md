---
name: wordpress-bug-prevention
description: Sổ tay phòng ngừa lỗi thường gặp trong lập trình WordPress FSE, PHP OOP, theme.json và CSS Mobile dành cho AI Agent.
---

# SỔ TAY PHÒNG NGỪA BUG WORDPRESS (WORDPRESS BUG PREVENTION REGISTRY)

> **Mục đích:** Tài liệu này ghi lại các lỗi kỹ thuật kinh điển trong hệ sinh thái WordPress và CSS Frontend. Mọi AI Agent BẮT BUỘC đọc file này trước khi triển khai code để không tái phạm lỗi cũ.

---

## 1. PHÂN HỆ: THEME.JSON & FULL SITE EDITING (FSE)

### BUG-01: Schema version và cú pháp theme.json không hợp lệ
* **Triệu chứng:** Giao diện bị mất toàn bộ style, bảng màu không xuất hiện trong Site Editor hoặc WordPress fallback về default theme.
* **Root cause:** File `theme.json` bị sai định dạng JSON, thiếu `$schema` hoặc dùng sai version format (`version: 2` hoặc `version: 3`).
* **Quy tắc phòng ngừa:**
  * Luôn khai báo `$schema: "https://schemas.wp.org/trunk/theme.json"`.
  * Dùng `version: 3` cho WordPress 6.6+.
  * KHÔNG đặt comment `//` trong file `theme.json` (JSON thuần không hỗ trợ comment).
* **Code so sánh:**
```json
// ❌ SAI: Có comment và sai cấu trúc color
{
  "version": 2,
  // Bảng màu của theme
  "settings": {
    "color": {
      "palette": [{ "slug": "gold", "color": "#d4af37" }] // Thiếu trường "name"
    }
  }
}

// ✅ ĐÚNG:
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "color": {
      "palette": [
        {
          "slug": "gold",
          "color": "#c5a880",
          "name": "Luxury Gold"
        }
      ]
    }
  }
}
```

---

## 2. PHÂN HỆ: PHP & WORDPRESS CORE APIS

### BUG-02: Quên Flush Rewrite Rules khi đăng ký Custom Post Type (CPT)
* **Triệu chứng:** Bấm vào xem chi tiết phòng (`/khach-san-tinh-yeu/karma/`) bị lỗi **404 Not Found**.
* **Root cause:** WordPress lưu cache permalink rules trong database. Khi khai báo CPT mới trong code, WordPress chưa cập nhật bảng rewrite rules.
* **Quy tắc phòng ngừa:**
  * KHÔNG gọi `flush_rewrite_rules()` trực tiếp trong hook `init` (vì sẽ làm chậm web ở mọi request).
  * CHỈ gọi `flush_rewrite_rules()` trong hook kích hoạt plugin (`register_activation_hook`).
* **Code so sánh:**
```php
// ❌ SAI: Gây chậm toàn bộ trang vì flush ở mọi request
add_action('init', function() {
    register_post_type('hotel_room', $args);
    flush_rewrite_rules(); // TAI HẠI!
});

// ✅ ĐÚNG:
function mixhotel_register_room_cpt() {
    register_post_type('hotel_room', $args);
}
add_action('init', 'mixhotel_register_room_cpt');

register_activation_hook(__FILE__, function() {
    mixhotel_register_room_cpt();
    flush_rewrite_rules();
});
```

---

### BUG-03: Xử lý AJAX thiếu Nonce verification hoặc Exit/Die
* **Triệu chứng:** Request AJAX bị lỗ hổng CSRF, hoặc response trả về thừa số `0` ở cuối response JSON.
* **Root cause:** WordPress AJAX endpoint kết thúc không gọi `wp_send_json_success()` hoặc `wp_die()`, dẫn đến WordPress output thêm số 0 mặc định.
* **Quy tắc phòng ngừa:**
  * 100% handler AJAX phải kiểm tra `check_ajax_referer('my_action_nonce', 'nonce')`.
  * Luôn kết thúc bằng `wp_send_json_success($data)` hoặc `wp_send_json_error($error)`.
* **Code so sánh:**
```php
// ❌ SAI:
add_action('wp_ajax_nopriv_submit_booking', function() {
    $name = $_POST['name'];
    echo json_encode(['status' => 'ok']); // Thiếu check nonce, thiếu wp_die() -> trả về {"status":"ok"}0
});

// ✅ ĐÚNG:
add_action('wp_ajax_nopriv_submit_booking', 'mixhotel_handle_booking');
add_action('wp_ajax_submit_booking', 'mixhotel_handle_booking');

function mixhotel_handle_booking() {
    check_ajax_referer('mixhotel_booking_nonce', 'security');
    
    $name  = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
    
    // Logic lưu DB...
    
    wp_send_json_success(['message' => 'Yêu cầu giữ phòng đã được ghi nhận!']);
}
```

---

## 3. PHÂN HỆ: CSS, VIEWPORT & RESPONSIVE MOBILE

### BUG-04: Lỗi 100vh trên trình duyệt di động (iOS Safari / Chrome Android)
* **Triệu chứng:** Menu hoặc Hero banner bị thanh địa chỉ (Address Bar) của trình duyệt trên điện thoại che mất phần dưới, gây hiện tượng giật layout khi cuộn.
* **Root cause:** Trên mobile browser, `100vh` bao gồm cả phần không gian bị thanh URL che khuất.
* **Quy tắc phòng ngừa:**
  * Luôn sử dụng `100dvh` (Dynamic Viewport Height) kèm fallback `100vh`.
* **Code so sánh:**
```css
/* ❌ SAI: */
.mobile-fullscreen-modal {
  height: 100vh;
}

/* ✅ ĐÚNG: */
.mobile-fullscreen-modal {
  height: 100vh; /* Fallback cho browser cũ */
  height: 100dvh; /* Chuẩn hiện đại trên mobile */
}
```

---

### BUG-05: Xung đột Z-Index giữa Sticky Mobile Action Bar và Modal Popup
* **Triệu chứng:** Khi mở Popup chọn chi nhánh (`#popupContact_1`), thanh menu liên hệ dưới đáy mobile vẫn nổi đè lên trên popup hoặc overlay bị mờ không đúng cách.
* **Root cause:** Không kiểm soát thứ bậc z-index theo tầng kiến trúc (Stacking Context).
* **Quy tắc phòng ngừa:**
  * Thiết lập thang đo Z-Index chuẩn trong CSS Tokens:
    * Content thường: `z-index: 1 - 10`
    * Sticky Header: `z-index: 100`
    * Sticky Bottom Mobile Bar: `z-index: 500`
    * Modal Overlay / Backdrop: `z-index: 1000`
    * Modal Dialog Content: `z-index: 1050`
    * Toast Notifications: `z-index: 2000`
