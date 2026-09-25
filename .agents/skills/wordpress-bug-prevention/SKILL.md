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

---

## 4. PHÂN HỆ: ACCORDION, HTML5 DETAILS & INTERACTION

### BUG-06: Ẩn/Hiện nội dung trong thẻ HTML5 `<details>` & Accordion CSS
* **Triệu chứng:** Khi click vào câu hỏi trong FAQ hoặc Accordion, câu trả lời không mở ra, hoặc mở ra nhưng nội dung bên trong vẫn bị ẩn (`display: none`).
* **Root cause:** 
  1. Ghi đè CSS `display: none` vô điều kiện lên class của phần thân câu trả lời (`.mixLuxuryFaqAnswer { display: none; }`), trong khi HTML5 `<details>` mặc định tự động ẩn/hiện con thông qua thuộc tính `[open]`.
  2. Dùng `display: flex` trực tiếp trên `<summary>` trong WebKit/Chromium gây lỗi click event vào các thẻ con (`<span>`, `<i>`) không kích hoạt toggle native nếu thiếu `pointer-events: none;` trên children.
  3. Thiếu cơ chế đồng bộ class `.is-open` khi người dùng toggle thẻ `<details>`.
* **Quy tắc phòng ngừa:**
  * Luôn hỗ trợ cả selector `[open]` và `.is-open` trong CSS:
    ```css
    .mixLuxuryFaqItem[open] .mixLuxuryFaqAnswer,
    .mixLuxuryFaqItem.is-open .mixLuxuryFaqAnswer {
      display: block;
    }
    ```
  * Trên `<summary>` khi dùng flex layout, luôn đặt `pointer-events: none;` cho các thẻ con bên trong để click event luôn nhận diện đúng `<summary>`:
    ```css
    .mixLuxuryFaqQuestion > * {
      pointer-events: none;
    }
    ```
  * Trong JavaScript điều khiển Accordion, sử dụng `e.preventDefault()` để kiểm soát trạng thái `open` và class `is-open` một cách tất định (deterministic), đồng thời đóng các item khác để đảm bảo single-open UX mượt mà.

---

## 7. PHÂN HỆ: FSE TEMPLATES & BLOCK PATTERNS

### BUG-07: PHP KHÔNG CHẠY trong file `.html` của FSE Templates/Parts

* **Triệu chứng:** PHP tags (`<?php ... ?>`), `get_template_part()`, `the_content()`, `WP_Query` bên trong file `.html` (templates/ hoặc parts/) bị render nguyên văn ra màn hình thay vì được thực thi.
* **Root cause:** WordPress FSE chỉ parse Block Grammar trong `.html` files. PHP Engine KHÔNG được gọi cho các files này. Chỉ có `.php` files mới execute PHP.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **TUYỆT ĐỐI KHÔNG** đặt PHP code trong `templates/*.html` hay `parts/*.html`.
  * Mọi logic PHP (WP_Query, the_content, get_post_meta, etc.) PHẢI nằm trong `patterns/*.php`.
  * FSE Templates `.html` chỉ được chứa Block Grammar — `<!-- wp:template-part -->` và `<!-- wp:pattern {"slug":"..."} /-->`.
  * Tham chiếu pattern từ template bằng block pattern slug, KHÔNG dùng `get_template_part()`.
* **Code so sánh:**
```html
<!-- ❌ SAI: PHP trong .html template (sẽ không chạy!) -->
<!-- wp:html -->
<?php
  $query = new WP_Query(['post_type' => 'post']);
  while ($query->have_posts()) : $query->the_post();
?>
<article><?php the_title(); ?></article>
<?php endwhile; ?>
<!-- /wp:html -->

<!-- ✅ ĐÚNG: Template .html chỉ có Block Grammar -->
<!-- wp:template-part {"slug":"header","area":"header"} /-->
<!-- wp:group {"tagName":"main","layout":{"type":"default"}} -->
<main class="wp-block-group">
    <!-- wp:pattern {"slug":"mixhotel/blog-archive-content"} /-->
</main>
<!-- /wp:group -->
<!-- wp:template-part {"slug":"footer","area":"footer"} /-->
```
* **Pattern .php thực hiện PHP:**
```php
<?php
/**
 * Title: Blog - Archive Content
 * Slug: mixhotel/blog-archive-content
 * Categories: mixhotel
 */
?>
<!-- wp:html -->
<?php
$query = new WP_Query(['post_type' => 'post', 'posts_per_page' => 9]);
while ($query->have_posts()) : $query->the_post();
?>
<article><?php the_title(); ?></article>
<?php endwhile; wp_reset_postdata(); ?>
<!-- /wp:html -->
```
* **Phát hiện tại:** Feature 05 — `home.html`, `single.html`, `page-lien-he.html`, `page.html`, `404.html` — đều phải refactor thành pattern `.php` + template `.html` thuần.

---

## 8. PHÂN HỆ: FORM INPUTS, WEBKIT PSEUDO-ELEMENTS & DARK MODE

### BUG-08: Lỗi chữ đen & vạch phân cách // trong HTML5 Date Input (`input[type="date"]`)
* **Triệu chứng:** 
  1. Chữ trong ô chọn ngày nhận phòng (`input[type="date"]`) bị màu đen hoặc xám tối (`rgb(0, 0, 0)`) trên nền tối (`#0c0806`), không đồng bộ chữ trắng (`#ffffff`) với các ô khác.
  2. Xuất hiện 2 dấu phân cách gạch chéo `//` hoặc vạch thẳng `|` không mong muốn giữa ngày, tháng, năm.
* **Root cause:** 
  1. WebKit/Blink đóng gói các phần tử ngày tháng trong User-Agent Shadow DOM (`::-webkit-datetime-edit`, `::-webkit-datetime-edit-fields-wrapper`, `::-webkit-datetime-edit-month-field`, `::-webkit-datetime-edit-day-field`, `::-webkit-datetime-edit-year-field`, `::-webkit-datetime-edit-text`).
  2. Mặc định Blink áp dụng `color: initial;` và `border-left: 1px solid` lên các sub-fields (`month-field`, `day-field`, `year-field`) nếu không được set tường minh. Đặt `color: #ffffff` chỉ ở thẻ cha `input` hoặc `::-webkit-datetime-edit` là không đủ để ghi đè shadow DOM sub-fields.
  3. Dùng `display: none` trên `::-webkit-datetime-edit-text` cùng với `margin-right` làm gãy tính toán flexbox/inline-block của Blink bên trong `DateTimeEditElement`, khiến các ký tự số bị co lại chỉ còn 1px (biến mất hoặc như dấu gạch `' '`).
  4. Gom selector có class kết hợp pseudo-element của WebKit (e.g. `.class::-webkit-datetime-edit`) vào chung một block phẩy `,` bị Blink coi là invalid và drop toàn bộ block CSS.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * Luôn khai báo tường minh cả `color: #ffffff !important;` và `-webkit-text-fill-color: #ffffff !important;` kèm `border: none !important;` cho từng sub-field:
    ```css
    input[type="date"]::-webkit-datetime-edit-month-field,
    input[type="date"]::-webkit-datetime-edit-day-field,
    input[type="date"]::-webkit-datetime-edit-year-field,
    input[type="time"]::-webkit-datetime-edit-hour-field,
    input[type="time"]::-webkit-datetime-edit-minute-field,
    input[type="time"]::-webkit-datetime-edit-ampm-field {
      color: #ffffff !important;
      -webkit-text-fill-color: #ffffff !important;
      border: none !important;
      border-left: none !important;
      border-right: none !important;
      outline: none !important;
    }
    ```
  * Để triệt tiêu hoàn toàn 2 dấu gạch chéo `//` mà vẫn giữ khoảng cách tự nhiên giữa các số:
    ```css
    input[type="date"]::-webkit-datetime-edit-text {
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
      font-size: 0px !important;
      width: 0px !important;
      margin: 0 4px !important;
      border: none !important;
    }
    ```
  * Không áp dụng quy tắc này cho `input[type="time"]::-webkit-datetime-edit-text` vì ô giờ cần giữ dấu hai chấm `:` hiển thị màu trắng (`color: #ffffff !important;`).

---

### BUG-09: SVG Icon Bị Teo Nhỏ (Co Rút Còn Vài Pixel) Trong Circular Icon Buttons
* **Triệu chứng:** Icon SVG (như icon điện thoại trong thanh liên hệ nổi `#contactBtnBlock .phoneBlock .imgPart img`) bị teo nhỏ chỉ còn một chấm tí hon (1–3px) bên trong nút tròn 35px.
* **Root cause:** 
  1. File SVG thiếu thuộc tính `viewBox="0 0 W H"`. Khi không có `viewBox`, trình duyệt không thể tính toán scale vector tự do theo kích thước của thẻ `<img>`.
  2. Xung đột padding kép: Nút cha `.imgPart` có kích thước 35px kèm `padding: 6px` hoặc `7px`. Đồng thời, một stylesheet kế thừa (e.g. `pages-luxury.css` cào từ site cũ) đặt `#contactBtnBlock .smallBlock .imgPart img { padding: 10px; }`. Khi `box-sizing: content-box` (hoặc border-box trên img), `35px - 14px (padding cha) - 20px (padding img) = 1px`, bóp nghẹt toàn bộ diện tích hiển thị của SVG.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * BẮT BUỘC file SVG phải có `viewBox="0 0 W H"` đầy đủ và hợp lệ.
  * Reset triệt để padding trên thẻ `img` bên trong các icon button:
    ```css
    #contactBtnBlock .phoneBlock .imgPart img {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      object-fit: contain !important;
      display: block !important;
    }
    ```
  * Nút cha chứa icon (`.phoneBlock .imgPart`) phải dùng flexbox căn giữa với padding vừa phải (e.g. `7px` trên nút `36px` để icon đạt kích cỡ ~22px):
    ```css
    #contactBtnBlock .phoneBlock .imgPart {
      width: 36px !important;
      height: 36px !important;
      padding: 7px !important;
      box-sizing: border-box !important;
      background-color: #043d6d !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    ```
  * Sử dụng `filemtime` làm version query parameter khi `wp_enqueue_style` để trình duyệt không lưu cache CSS cũ.

---

### BUG-10: Xung đột CSS Scraped/Legacy với FSE Block Template Patterns (Vỡ Grid Hero Chi Tiết Phòng)
* **Triệu chứng:** Khi xem chi tiết phòng (`/khach-san-tinh-yeu/<slug>/`), Breadcrumb bị đẩy dạt sang bên trái một mình lưng chừng màn hình, toàn bộ tiêu đề, nút bấm, thông số bị dồn ép sang góc phải hẹp (430px), và ảnh phòng chính bị co rúm thành thumbnail tí hon (~145px × 109px).
* **Root cause:** 
  1. Trong file CSS chung tải toàn trang (`pages-luxury.css`), tồn tại quy tắc kế thừa từ web cũ:
     `.mixDetailHero .mixDetailHeroWrap { display: grid; grid-template-columns: minmax(0, 1.25fr) 430px; gap: 34px; align-items: center; }`
     được viết cho cấu trúc cũ có 2 con: `.mixDetailHeroContent` và `.mixDetailHeroCard`.
  2. Trong pattern hiện tại (`room-detail-content.php`), `.mixDetailHeroWrap` chứa 2 con trực tiếp: `<nav class="mixDetailBreadcrumb">` và `<div class="mixDetailHeroGrid">`.
  3. Quy tắc của file chung có độ ưu tiên CSS Specificity cao hơn (`0,2,0` với 2 class) so với quy tắc trong file chi tiết `.mixDetailHeroWrap` (`0,1,0`). Trình duyệt ép breadcrumb vào cột 1 (688px), và ép toàn bộ `mixDetailHeroGrid` vào cột 2 (430px).
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **Tránh rò rỉ namespace:** Khi copy/scrape CSS từ theme cũ, tuyệt đối không để các class trùng tên với component FSE pattern mới nếu cấu trúc DOM khác nhau. Bắt buộc namespace hoặc đổi tên (e.g. `.mixDetailHeroScraped`).
  * **Tăng tính tự vệ cho Component Stylesheet:**
    * Trong `room-detail.css`, luôn khai báo với specificity tương đương hoặc cao hơn:
      ```css
      .mixDetailHeroWrap,
      .mixDetailHero .mixDetailHeroWrap {
        display: block !important;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        box-sizing: border-box;
      }
      ```
  * **Chuỗi phụ thuộc Enqueue:** Trong `functions.php`, stylesheet chuyên trang (`mixhotel-room-detail`) BẮT BUỘC phải khai báo dependency bao gồm stylesheet chung (`mixhotel-pages-luxury`) để luôn được tải sau:
    ```php
    wp_enqueue_style(
        'mixhotel-room-detail',
        $theme_uri . '/assets/css/room-detail.css',
        array('mixhotel-style', 'mixhotel-pages-luxury'),
        $room_detail_ver
    );
    ```


