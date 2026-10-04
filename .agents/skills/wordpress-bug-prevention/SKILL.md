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

---

## 9. PHÂN HỆ: GUTENBERG BLOCK EDITOR & PHP META BOXES

### BUG-11: Xoá/Thêm ảnh trong Custom Meta Box không lưu được trong Gutenberg (Dirty State Failure)
* **Triệu chứng:** Trong trang chỉnh sửa bài viết/phòng (CPT có `show_in_rest => true`), người dùng bấm xoá ảnh hoặc thêm ảnh trong Custom Meta Box Gallery. Ảnh trên UI biến mất/thêm vào thành công, bấm "Cập nhật / Lưu" hiện thông báo thành công, nhưng khi F5 tải lại trang thì các ảnh đã xoá vẫn còn nguyên (hoặc ảnh thêm mới không lưu).
* **Root cause:** 
  1. Gutenberg lưu bài viết qua REST API JSON payload. Đối với các Meta Box PHP truyền thống (`add_meta_box`), Gutenberg chỉ gửi request phụ (`post.php?meta-box-loader=1`) để lưu khi và chỉ khi **Gutenberg nhận diện được Meta Box đã bị thay đổi (`areMetaBoxesDirty() === true`)**.
  2. Gutenberg theo dõi sự kiện qua listener: `$('#poststuff').on('change input', ':input')`.
  3. Khi script JS cập nhật input ẩn: `$input.val(new_ids);`, jQuery `.val()` **KHÔNG tự động kích hoạt sự kiện DOM `change` hay `input`**.
  4. Do không có event nào bắn ra, Gutenberg coi Meta Box chưa từng bị sửa đổi (`isMetaBoxDirty = false`). Nút "Cập nhật" có thể bị vô hiệu hóa, hoặc nếu người dùng bấm lưu (nhờ sửa tiêu đề), Gutenberg **chỉ lưu tiêu đề qua REST API và bỏ qua hoàn toàn việc gửi dữ liệu Meta Box lên server**.
  5. CPT chưa đăng ký `register_post_meta` với `show_in_rest => true`, khiến REST API không thể nhận và lưu trực tiếp mảng attachment IDs.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **Kích hoạt sự kiện kép (Dual Event Trigger):** Mỗi khi thay đổi giá trị của hidden input trong Meta Box bằng JS, BẮT BUỘC phải trigger cả jQuery event lẫn Native Event:
    ```javascript
    $input.val(newIds.join(',')).trigger('change').trigger('input');
    if ($input[0]) {
        $input[0].dispatchEvent(new Event('change', { bubbles: true }));
        $input[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    ```
  * **Đồng bộ Redux Store của Gutenberg:** Gọi trực tiếp action của Gutenberg để nút "Cập nhật" lập tức sáng lên và đánh dấu dirty:
    ```javascript
    if (window.wp && wp.data && wp.data.dispatch) {
        if (wp.data.dispatch('core/edit-post')) {
            wp.data.dispatch('core/edit-post').setMetaBoxDirty();
        }
        if (wp.data.dispatch('core/editor')) {
            wp.data.dispatch('core/editor').editPost({ metaBoxes: { isDirty: true } });
        }
    }
    ```
  * **Đăng ký `register_post_meta`:** Luôn đăng ký meta key với `show_in_rest` trong hook `init` để REST API hỗ trợ:
    ```php
    register_post_meta('hotel_room', '_mixhotel_room_gallery', [
        'show_in_rest'  => ['schema' => ['type' => 'array', 'items' => ['type' => 'integer']]],
        'single'        => true,
        'type'          => 'array',
        'auth_callback' => fn() => current_user_can('edit_posts'),
    ]);
    ```
  * **Tự vệ Nonce:** Luôn output `wp_nonce_field` trực tiếp bên trong từng meta box để phòng trường hợp người dùng kéo thả meta box sang các container khác nhau (`normal` vs `side`).

---

## 10. PHÂN HỆ: DOCKER, QUYỀN TRUY CẬP TỆP (FILE PERMISSIONS) & UPLOADS

### BUG-12: Lỗi không thể upload hình ảnh ("Tập tin được tải không thể chuyển tới wp-content/uploads/...")
* **Triệu chứng:** Khi tải ảnh lên Media Library hoặc qua nút thêm ảnh Gallery trong admin, WordPress hiển thị lỗi:
  *"Tập tin được tải không thể chuyển tới wp-content/uploads/YYYY/MM."*
* **Root cause:** 
  1. Thư mục `wp-content/uploads` hoặc các thư mục con theo năm/tháng được tạo ra bởi lệnh chạy CLI với quyền `root` (khi chạy seed data, import script hoặc tạo thư mục từ host Windows), khiến quyền sở hữu thư mục thuộc về `root:root` (chmod 755).
  2. Web server Apache / PHP bên trong container chạy dưới danh nghĩa user `www-data` (UID 33). Với quyền `755` của `root`, `www-data` thuộc nhóm "others" và chỉ có quyền đọc/thực thi (`r-x`), hoàn toàn KHÔNG có quyền ghi (`w`).
  3. Hàm `move_uploaded_file()` của PHP bị chặn (Permission Denied).
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **Phân quyền sở hữu chuẩn cho `www-data`:**
    ```bash
    docker exec store_app chown -R www-data:www-data /var/www/html/wp-content/uploads
    docker exec store_app chmod -R 775 /var/www/html/wp-content/uploads
    ```
  * **Chạy CLI Script với User `www-data`:** Khi thực thi các lệnh tạo file/seed data qua Docker CLI, luôn truyền cờ `-u www-data`:
    ```bash
    docker exec -u www-data store_app php wp-content/plugins/.../seed.php
    ```

---

### BUG-13: Lỗi Meta Box Script trong Gutenberg (Inline Script & Đồng Bộ Meta Box Loader)
* **Triệu chứng:** Trong trang chỉnh sửa CPT có Gutenberg, người dùng thêm hoặc xoá ảnh trong Meta Box Gallery. Dù trên giao diện đã biến mất/thêm mới, nhưng sau khi bấm "Cập nhật / Lưu" hoặc nhấn F5 thì trạng thái cũ lại xuất hiện (dữ liệu không được lưu).
* **Root cause:** 
  1. **Inline `<script>` trong Callback Meta Box:** Khi nhúng script trực tiếp trong PHP render callback, script chạy trước khi React của Gutenberg mount xong, hoặc khi Gutenberg di chuyển DOM giữa `#metaboxes` và `.edit-post-meta-boxes-area`, các event listener trực tiếp (`$('#btn').on('click')`) bị mất hoặc không bắt được các DOM node mới.
  2. **Xung đột 2 kênh lưu của Gutenberg:** Khi bấm "Cập nhật", Gutenberg gửi song song REST API JSON request và Meta Box Loader (`POST post.php?meta-box-loader=1`). Meta Box Loader thu thập form inputs qua `new FormData()`. Nếu script chỉ sửa property `.val()` của 1 input mà không sửa attribute `value` hoặc không cập nhật toàn bộ các input cùng tên ở mọi container form, Meta Box Loader sẽ submit giá trị ban đầu và PHP `save_post` sẽ ghi đè giá trị cũ lên DB.
  3. **Độ trễ do hiệu ứng xóa (`fadeOut`):** Dùng `$thumb.fadeOut(200, function() { $(this).remove(); })` khiến phần tử vẫn còn tồn tại trong DOM suốt 200ms. Nếu hàm thu thập ID chạy ngay, ID vừa bấm xóa vẫn bị gom lại.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **Enqueue Script Độc Lập:** Luôn tách JS sang file riêng (e.g. `assets/js/admin-gallery.js`), enqueue qua `admin_enqueue_scripts` với dependencies `['jquery', 'jquery-ui-sortable']` và truyền tham số qua `wp_localize_script`.
  * **Event Delegation:** Luôn dùng delegated event listener trên `$(document)`:
    ```javascript
    $(document).on('click', '.mixhotel-remove-img', function(e) { ... });
    $(document).on('click', '#mixhotel-add-gallery-btn', function(e) { ... });
    ```
  * **Xóa DOM Ngay Lập Tức:** Loại bỏ `$thumb.remove()` ngay lập tức không dùng animation delay trước khi gọi hàm cập nhật dữ liệu.
  * **Thu thập ID Thực Tế Từ DOM:** Luôn đọc mảng ID trực tiếp từ các thumbnail còn lại trong `#mixhotel-gallery-preview` (`$preview.find('.mixhotel-gallery-thumb')`) thay vì parse/cắt ghép chuỗi cũ.
  * **Cập Nhật Toàn Bộ Input & Bắn Native Event:**
    ```javascript
    $('input[name="mixhotel_room_gallery"]').each(function() {
        $(this).val(idString).attr('value', idString);
        $(this).trigger('change').trigger('input');
        this.dispatchEvent(new Event('input', { bubbles: true }));
        this.dispatchEvent(new Event('change', { bubbles: true }));
    });
    ```
  * **Lưu Tức Thì Qua AJAX Kép:** Mỗi khi có thay đổi (thêm/xóa/reorder), bắn AJAX lưu ngay vào DB kèm nonce và phản hồi status trực quan trên UI ("Đang lưu...", "✓ Đã lưu thay đổi"). Bằng cách này, dù người dùng bấm F5 ngay hay bấm Cập nhật của Gutenberg, dữ liệu đều đã được lưu bảo đảm 100%.

---

## 11. PHÂN HỆ: GUTENBERG CORE BLOCKS & CSS MIGRATION

### BUG-14: `wp-block-columns` ép `display: flex` làm hỏng layout CSS Grid của theme
* **Triệu chứng:** Khi chuyển đổi component dạng cột từ HTML thuần sang `<!-- wp:columns -->` kèm class CSS Grid có sẵn của theme (ví dụ `.mix-grid-4col`, `.mixLuxuryStepsGrid`, `.mixLuxuryPricingGrid`), layout trên frontend bị tràn ngang, co rúm, hoặc không giữ đúng tỷ lệ cột `grid-template-columns`.
* **Root cause:** Gutenberg Core mặc định inject class `wp-block-columns` với thuộc tính `display: flex; flex-direction: row; flex-wrap: wrap;`. Khi selector flexbox của WordPress Core có specificity tương đương hoặc nạp sau file CSS của theme, nó ghi đè `display: grid`.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * Bổ sung quy tắc override tường minh trong file CSS của theme:
    ```css
    .wp-block-columns.mix-grid-4col,
    .wp-block-columns.mixLuxuryStepsGrid,
    .wp-block-columns.mixLuxuryPricingGrid {
      display: grid !important;
    }
    ```
  * Xóa bỏ margin mặc định của Gutenberg columns để bảo toàn khoảng cách:
    ```css
    .wp-block-columns.mix-grid-4col > .wp-block-column,
    .wp-block-columns.mixLuxuryStepsGrid > .wp-block-column,
    .wp-block-columns.mixLuxuryPricingGrid > .wp-block-column {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    ```

---

### BUG-15: `wp:site-logo` không hiển thị ảnh nếu theme mod `custom_logo` chưa được khởi tạo
* **Triệu chứng:** Thay thẻ `<img>` logo thành `<!-- wp:site-logo -->` trong template parts (`header.html`, `footer.html`), nhưng ngoài frontend và trong Site Editor chỉ xuất hiện thẻ `<div>` rỗng (`<div class="wp-block-site-logo"></div>`) hoặc logo bị biến mất hoàn toàn.
* **Root cause:** Block `core/site-logo` trong WordPress FSE phụ thuộc 100% vào giá trị của theme mod `custom_logo` (`get_theme_mod('custom_logo')`). Nếu logo mới chỉ nằm dưới dạng file ảnh trong theme mà chưa được nhập thành Attachment Post trong WordPress Media Library và gán vào `custom_logo`, block sẽ không render thẻ `<img>`.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * Luôn đảm bảo logo được nhập vào Media Library và gán theme mod:
    ```php
    // Gán attachment ID của logo vào custom_logo theme mod
    set_theme_mod('custom_logo', $attachment_id);
    ```
  * Đồng thời kiểm tra styling của container: `wp-block-site-logo img` cần có `width: 100%; height: auto; display: block;` để không bị co kích thước ngoài ý muốn.

---

### BUG-16: Lỗi "Khối chứa nội dung không hợp lệ hoặc không mong đợi" (Block Invalidation) do comment HTML hoặc thuộc tính không chuẩn trong Container Blocks
* **Triệu chứng:** Mở trang trong trình soạn thảo Gutenberg (`wp-admin/post.php?post=X&action=edit`), xuất hiện thông báo lỗi màu trắng: *"Khối chứa nội dung không hợp lệ hoặc không mong đợi"* kèm nút *"Thử khôi phục"*.
* **Root cause:** 
  1. Đặt comment HTML tự do (như `<!-- Review 1: Nguyễn Minh Anh -->`) nằm trực tiếp giữa các block bên trong một container block (`<!-- wp:group -->`, `<!-- wp:columns -->`). Parser của Gutenberg yêu cầu mọi comment bên trong container phải tuân thủ chuẩn block grammar `<!-- wp:... -->` hoặc `<!-- /wp:... -->`. Mọi comment tự do sẽ bị Gutenberg xem là token ngoại lai và tạo ra khối lỗi Classic chiếm vị trí trong layout.
  2. Khai báo các thuộc tính HTML tự ý (như `aria-label="..."` hoặc `ariaLabel` trong JSON comment của `wp:group`) không thuộc schema chuẩn của Core Block. Khi Gutenberg so sánh HTML nhận được với output render chuẩn, sự sai khác thuộc tính dẫn đến block validation error.
  3. Đặt thẻ HTML thô (ví dụ `<div class="...">` hoặc thẻ `<figure>` kèm `loading="eager"` tự ý) trực tiếp bên trong `wp:group` mà không đóng gói trong `<!-- wp:html -->...<!-- /wp:html -->`.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **Tuyệt đối không** đặt comment HTML thường `<!-- ... -->` giữa các block bên trong `wp:group`. Nếu cần chú thích cấu trúc code, hãy dùng block metadata comment chuẩn `<!-- wp:group {"metadata":{"name":"Tên khối"}} -->` hoặc dùng PHP comments `//` trong file pattern.
  * Chỉ dùng các thuộc tính được Core Block schema hỗ trợ. Không nhồi nhét `aria-label` trực tiếp vào thẻ wrapper của `wp:group` trừ khi nằm trong `wp:html`.
  * Mọi phân đoạn chứa mã HTML tùy biến (như SVG icon, badge, overlay phức tạp) phải được đóng gói gọn gàng bên trong `<!-- wp:html -->...<!-- /wp:html -->`.

---

## 12. PHÂN HỆ: WORDPRESS NONCES & SEEDED CONTENT

### BUG-17: Nonce đóng băng trong Seeded Page Content (FSE + Seed Script)
* **Triệu chứng:** Khi khách hàng gửi form đặt phòng (Hero trang chủ hoặc Chi tiết phòng), hệ thống luôn báo lỗi *"Phiên làm việc đã hết hạn. Vui lòng tải lại trang và thử lại."* Tải lại trang (F5) nhiều lần vẫn không thể gửi được form.
* **Root cause:** 
  1. Script seed nội dung (`seed-pages.php`) dùng `ob_start()` và `include` pattern file chứa `wp_nonce_field('action', 'nonce')`. Tại thời điểm chạy seed, PHP sinh ra một chuỗi nonce và chuỗi này bị ghi chết (hardcode/bake) vĩnh viễn vào `post_content` trong database `wp_posts`.
  2. WordPress Nonce có thời hạn tối đa 24 giờ. Sau 24h kể từ khi seed, nonce tĩnh trong DB hết hạn vĩnh viễn.
  3. Phía client, JavaScript kiểm tra `if (!formData.get('mixhotel_booking_nonce'))` thấy đã có nonce trong HTML form nên bỏ qua không ghi đè nonce tươi mới từ `MixHotelData.nonce`. Kết quả là client luôn gửi nonce đã hết hạn lên server và bị chặn.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **Tuyệt đối KHÔNG** gọi `wp_nonce_field()` trong các file pattern hoặc template part được seed hoặc lưu trực tiếp vào cơ sở dữ liệu (`wp_posts.post_content`).
  * Trong form HTML lưu DB, chỉ đặt input nonce rỗng làm placeholder:
    ```html
    <input type="hidden" id="hero-booking-nonce" name="mixhotel_booking_nonce" value="" />
    ```
  * Frontend JavaScript BẮT BUỘC dùng `formData.set('mixhotel_booking_nonce', window.MixHotelData.nonce)` để luôn ghi đè nonce tươi mới được sinh theo từng request từ `wp_localize_script()`.
  * Thống nhất một nonce action name duy nhất trong toàn bộ hệ thống plugin và theme (ví dụ: `mixhotel_booking_nonce`).

---

## 13. PHÂN HỆ: FORM CONTROLS, SELECT POPUPS & DARK MODE

### BUG-18: Lỗi chữ trắng trên nền trắng trong thẻ HTML `<select>` & `<option>` ở Dark Mode
* **Triệu chứng:** Khi mở dropdown chọn mục (ví dụ "Nhu cầu nghỉ" trong Form Giữ Phòng Online hoặc chọn Chi nhánh/Phòng), danh sách các thẻ `<option>` hiển thị chữ màu trắng trên nền màu trắng, khiến người dùng hoàn toàn không nhìn thấy nội dung để chọn.
* **Root cause:** 
  1. Trong theme nền tối (Dark Theme), CSS thường gán `color: #ffffff` (hoặc biến `var(--wp--preset--color--text-bright)`) lên thẻ `<select>`.
  2. Các phần tử con `<option>` kế thừa thuộc tính `color: #ffffff` từ thẻ cha `<select>`.
  3. Tuy nhiên, menu popover danh sách lựa chọn của thẻ `<select>` được render bởi hệ thống native của hệ điều hành/trình duyệt (Windows Chromium/Edge/Firefox). Theo mặc định trên Windows, menu native này sử dụng nền màu trắng hoặc sáng (`#ffffff`).
  4. Do không có `color-scheme: dark` và không khai báo `background-color` cho thẻ `option`, trình duyệt vẽ text trắng (`#fff`) đè lên popup trắng (`#fff`), dẫn đến chữ tàng hình.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **Khai báo `color-scheme: dark;` toàn cục và trên mọi input/select:**
    ```css
    select {
      color-scheme: dark;
    }
    ```
  * **Đặt tường minh `background-color` và `color` cho thẻ `option`:**
    ```css
    select option {
      background-color: var(--wp--preset--color--dark-secondary, #17171c);
      color: var(--wp--preset--color--text-bright, #ffffff);
    }
    ```
  * **Custom Dropdown Arrow nhất quán:** Dùng `appearance: none;` kèm icon SVG mũi tên màu vàng gold (`fill='%23c5a880'`) để giao diện dropdown sang trọng và đồng bộ trên mọi trình duyệt.

---

## 14. PHÂN HỆ: GUTENBERG BLOCK VALIDATION & WYSIWYG INTEGRITY

### BUG-19: Gutenberg Block Validation Error do tiêm thuộc tính HTML tùy tiện (`data-*`, inline `style`) vào Core Blocks
* **Triệu chứng:** Khi mở trang trong Gutenberg Block Editor (ví dụ Trang Chủ `post.php?post=118&action=edit`), màn hình xuất hiện một hoặc nhiều khối lỗi viền xám cảnh báo: *"Khối chứa nội dung không hợp lệ hoặc không mong đợi. [Thử khôi phục]"* (This block contains unexpected or invalid content). Bấm vào "Thử khôi phục" có thể làm hỏng layout hoặc vỡ cấu trúc block.
* **Root cause:** 
  1. Gutenberg thực hiện cơ chế xác thực cú pháp nghiêm ngặt (`validateBlock`). Gutenberg lấy comment JSON (ví dụ: `<!-- wp:paragraph -->` hoặc `<!-- wp:button -->`), chạy hàm `save()` nội bộ của WordPress để sinh HTML mong đợi, rồi so sánh character-by-character với thẻ HTML được lưu trữ trong `post_content`.
  2. Nếu lập trình viên tự ý thêm các thuộc tính HTML tùy ý như `data-contact-action="zalo"`, `data-room-title="..."`, `data-branch-id="..."` trực tiếp vào thẻ con của Core Block (như `<a class="wp-block-button__link" ...>`), hoặc viết inline `style="font-size:26px;margin:..."` vào thẻ `<h2 class="wp-block-heading">` mà KHÔNG có cấu trúc JSON attribute tương ứng (hoặc khai báo sai schema), Gutenberg sẽ phát hiện HTML thực tế không khớp với output của block parser và lập tức đánh dấu khối là **Invalid**.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **TUYỆT ĐỐI KHÔNG** chèn thuộc tính `data-*` tùy tiện vào các Core Block của WordPress (`core/group`, `core/button`, `core/heading`, `core/paragraph`, `core/image`).
  * **TUYỆT ĐỐI KHÔNG** dùng inline `style="..."` trên Core Blocks để override font size hoặc margin nếu không định nghĩa qua block attributes chuẩn. Thay vào đó, hãy sử dụng các semantic CSS classes (ví dụ: `.mixLuxuryRoomTitle`, `.mixLuxuryRoomDesc`, `.mixLuxuryBranchBtnZalo`).
  * **Sử dụng JavaScript Event Delegation & DOM Tree Traversal:** Mọi logic tương tác người dùng (click mở modal, lấy mã chi nhánh, lấy tên phòng) phải bắt sự kiện theo class của nút hoặc duyệt tìm từ phần tử cha (`e.target.closest('.mixLuxuryRoomCard').querySelector('h3')`) thay vì phụ thuộc vào thuộc tính `data-*` trên Core Block.

### BUG-20: Gutenberg Block Validation Error do chứa thẻ HTML thô (raw `<div>`, `<p>`, `<span>`) làm con trực tiếp của `core/group`
* **Triệu chứng:** Khối `core/group` (Section hoặc Container) bị báo lỗi *"Khối chứa nội dung không hợp lệ hoặc không mong đợi. [Thử khôi phục]"* trong Gutenberg editor.
* **Root cause:** 
  1. Trong Gutenberg, `core/group` là một khối chứa (container block). Trình parser của Gutenberg kỳ vọng các phần tử bên trong `wp:group` phải là các khối con hợp lệ (`innerBlocks` có comment `<!-- wp:... -->`).
  2. Nếu lập trình viên đặt thẻ HTML trực tiếp như `<div class="container">`, `<div class="inner-wrap">`, hoặc `<div class="info-item"><span>01</span><p>...</p></div>` nằm giữa thẻ mở `<div class="wp-block-group">` và các block con mà không khai báo comment block cho container đó, hàm validation của Gutenberg (`validateBlock`) sẽ phát hiện cấu trúc DOM thực tế không khớp với mảng block con đã phân tích cú pháp và kích hoạt cờ `isValid = false`.
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **Wrapper DIVs phải là `wp:group` con:** Mọi wrapper phân cấp layout (ví dụ `.container`, `.content-frame`, `.grid-wrap`) bên trong một Section `wp:group` BẮT BUỘC phải được định nghĩa bằng comment `<!-- wp:group {"className":"container"} --><div class="wp-block-group container">...</div><!-- /wp:group -->`.
  * **Custom Raw HTML Widgets phải bọc trong `<!-- wp:html -->`:** Đối với các thành phần trang trí tĩnh hoặc markup HTML phức tạp không cần biên tập inline từng từ (như danh sách badge số thứ tự, TOC Header toggle icon, nền decor SVG/glow), BẮT BUỘC phải bọc toàn bộ khối trong `<!-- wp:html -->...<!-- /wp:html -->`. Tuyệt đối không để thẻ HTML thô nằm trực tiếp bên trong `wp:group` mà không có block delimiter.

### BUG-21: Bố cục chữ bị bóp hẹp hiển thị dọc 1 từ/dòng do thiếu phần tử con trong CSS Grid 2 cột
* **Triệu chứng:** Đoạn văn bản (ví dụ các mục lợi ích hoặc quyền lợi trong Form Tư Vấn, Booking Card) bị co rút lại thành dải hẹp 30-40px, khiến mỗi từ bị rớt xuống một dòng, kéo dài chiều cao section lên hàng nghìn pixel.
* **Root cause:** 
  1. Trong CSS kế thừa, phần tử cha (ví dụ `.cateConsultFormBenefit`) được định nghĩa bằng CSS Grid có 2 cột cố định: `display: grid; grid-template-columns: 34px 1fr; gap: 16px;`. Cột đầu (34px) dành cho icon/badge (`.cateConsultFormBenefitIcon`), cột sau (`1fr`) dành cho đoạn text (`.cateConsultFormBenefitText`).
  2. Khi refactor sang Gutenberg Block, nếu vô tình gom icon vào chung đoạn text hoặc xóa thẻ icon con, thẻ chứa text trở thành phần tử con ĐẦU TIÊN (first child) của CSS Grid, do đó bị gán vào Cột 1 (rộng đúng 34px).
* **Quy tắc phòng ngừa BẮT BUỘC:**
  * **Tách riêng khối Icon và Text:** Trong pattern Gutenberg, luôn giữ đúng 2 khối con riêng biệt: 1 khối `wp:paragraph` cho Icon (`.cateConsultFormBenefitIcon`) và 1 khối `wp:paragraph` cho Text (`.cateConsultFormBenefitText`).
  * **Defensive CSS (Sử dụng Flexbox thay vì Grid cứng):** Trong CSS bổ sung của theme, luôn override các hàng icon-text bằng Flexbox đàn hồi:
    ```css
    .cateConsultFormBenefit {
      display: flex !important;
      align-items: flex-start !important;
      gap: 16px !important;
    }
    .cateConsultFormBenefitIcon {
      flex: 0 0 34px !important;
    }
    .cateConsultFormBenefitText {
      flex: 1 1 auto !important;
      min-width: 0 !important;
    }
    ```
    Flexbox đảm bảo ngay cả khi thẻ icon bị ẩn hay cấu trúc con thay đổi, đoạn văn bản vẫn tự động co dãn chiếm trọn 100% không gian khả dụng mà không bao giờ bị bóp hẹp 34px.

