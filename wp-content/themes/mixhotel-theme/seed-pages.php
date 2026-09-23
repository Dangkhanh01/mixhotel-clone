<?php
/**
 * Seed Script: Tạo các WordPress Pages cho Feature 05 - Auxiliary Pages
 *
 * CÁCH SỬ DỤNG (chọn một trong hai cách):
 *
 * CÁCH 1 - Chạy qua WP-CLI:
 *   wp eval-file seed-pages.php --allow-root
 *
 * CÁCH 2 - Import trực tiếp trong functions.php (chỉ chạy 1 lần):
 *   Thêm dòng: require_once get_template_directory() . '/seed-pages.php';
 *   (XÓA sau khi đã chạy)
 *
 * @package MixHotelTheme
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    // Nếu chạy độc lập, cần bootstrap WordPress
    $wp_load = dirname(dirname(dirname(dirname(__DIR__)))) . '/wp-load.php';
    if (file_exists($wp_load)) {
        require_once $wp_load;
    } else {
        die('WordPress không tìm thấy. Hãy chạy file này từ thư mục theme hoặc dùng WP-CLI.');
    }
}

// Các trang cần tạo
$pages_to_create = [
    [
        'post_title'   => 'Giới thiệu',
        'post_name'    => 'gioi-thieu',
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_content' => '<!-- wp:paragraph --><p>Chào mừng đến với Mix Boutique Hotel — hệ thống khách sạn tình yêu hàng đầu Hà Nội.</p><!-- /wp:paragraph -->',
        'meta_input'   => [
            '_wp_page_template' => 'page-gioi-thieu',
        ],
    ],
    [
        'post_title'   => 'Gallery',
        'post_name'    => 'gallery',
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_content' => '<!-- wp:paragraph --><p>Gallery tổng hợp tất cả phòng concept tại Mix Boutique Hotel.</p><!-- /wp:paragraph -->',
        'meta_input'   => [
            '_wp_page_template' => 'page-gallery',
        ],
    ],
    [
        'post_title'   => 'Liên hệ',
        'post_name'    => 'lien-he',
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_content' => '<!-- wp:paragraph --><p>Liên hệ với chúng tôi qua form bên dưới hoặc trực tiếp qua hotline.</p><!-- /wp:paragraph -->',
        'meta_input'   => [
            '_wp_page_template' => 'page-lien-he',
        ],
    ],
    [
        'post_title'   => 'Chính sách thanh toán',
        'post_name'    => 'chinh-sach-thanh-toan',
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_content' => '<!-- wp:heading --><h2>Chính Sách Thanh Toán</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Mix Boutique Hotel chấp nhận các hình thức thanh toán sau:</p><!-- /wp:paragraph -->
<!-- wp:list --><ul><li>Thanh toán tiền mặt trực tiếp tại quầy</li><li>Chuyển khoản ngân hàng</li><li>Thanh toán qua Momo, VNPay, ZaloPay</li></ul><!-- /wp:list -->
<!-- wp:heading {"level":3} --><h3>Lưu Ý</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Giá phòng có thể thay đổi vào các dịp lễ, Tết, Valentine, 20/10. Vui lòng liên hệ hotline để biết giá chính xác.</p><!-- /wp:paragraph -->',
        'meta_input'   => [
            '_wp_page_template' => 'default',
        ],
    ],
    [
        'post_title'   => 'Chính sách bảo mật thông tin',
        'post_name'    => 'chinh-sach-bao-mat-thong-tin',
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_content' => '<!-- wp:heading --><h2>Chính Sách Bảo Mật Thông Tin</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Mix Boutique Hotel cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng.</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":3} --><h3>Thông Tin Chúng Tôi Thu Thập</h3><!-- /wp:heading -->
<!-- wp:list --><ul><li>Họ tên, số điện thoại khi đặt phòng</li><li>Email (không bắt buộc)</li><li>Thông tin check-in theo quy định pháp luật</li></ul><!-- /wp:list -->
<!-- wp:heading {"level":3} --><h3>Cam Kết Của Chúng Tôi</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Thông tin khách hàng sẽ không được chia sẻ cho bên thứ ba vì mục đích thương mại. Dữ liệu chỉ được sử dụng để liên lạc và cải thiện dịch vụ.</p><!-- /wp:paragraph -->',
        'meta_input'   => [
            '_wp_page_template' => 'default',
        ],
    ],
    [
        'post_title'   => 'Chính sách đặt trả phòng',
        'post_name'    => 'chinh-sach-dat-tra-phong',
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_content' => '<!-- wp:heading --><h2>Chính Sách Đặt Trả Phòng</h2><!-- /wp:heading -->
<!-- wp:heading {"level":3} --><h3>Đặt Phòng</h3><!-- /wp:heading -->
<!-- wp:list --><ul><li>Giữ phòng tối đa 15 phút kể từ khi xác nhận</li><li>Cần cung cấp số điện thoại và họ tên khi đặt</li><li>Đặt trước qua hotline hoặc form trực tuyến</li></ul><!-- /wp:list -->
<!-- wp:heading {"level":3} --><h3>Check-in</h3><!-- /wp:heading -->
<!-- wp:list --><ul><li>Nghỉ giờ: Từ 7h00 đến 22h00</li><li>Nghỉ đêm: Từ 22h00 hôm trước đến 12h00 hôm sau</li><li>Cả ngày: Từ 14h00 hôm này đến 12h00 hôm sau</li></ul><!-- /wp:list -->
<!-- wp:heading {"level":3} --><h3>Hủy Đặt Phòng</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Thông báo hủy trước ít nhất 1 giờ để chúng tôi có thể sắp xếp phòng cho khách khác. Hủy sát giờ hoặc không đến mà không thông báo có thể bị tính phí một phần.</p><!-- /wp:paragraph -->',
        'meta_input'   => [
            '_wp_page_template' => 'default',
        ],
    ],
];

$results = [];
$created = 0;
$skipped = 0;

foreach ($pages_to_create as $page_data) {
    // Kiểm tra trang đã tồn tại chưa
    $existing = get_page_by_path($page_data['post_name'], OBJECT, 'page');
    if ($existing) {
        $results[] = "⏭️  BỎ QUA: Trang '{$page_data['post_title']}' đã tồn tại (ID: {$existing->ID})";
        $skipped++;
        continue;
    }

    $meta_input = isset($page_data['meta_input']) ? $page_data['meta_input'] : [];
    unset($page_data['meta_input']);
    $page_data['meta_input'] = $meta_input;

    $page_id = wp_insert_post($page_data, true);

    if (is_wp_error($page_id)) {
        $results[] = "❌ LỖI: Không thể tạo trang '{$page_data['post_title']}': " . $page_id->get_error_message();
    } else {
        $results[] = "✅ ĐÃ TẠO: '{$page_data['post_title']}' — ID: {$page_id}, Slug: {$page_data['post_name']}";
        $created++;
    }
}

// In kết quả
echo "\n==========================================\n";
echo "SEED PAGES — Feature 05: Auxiliary Pages\n";
echo "==========================================\n";
foreach ($results as $result) {
    echo $result . "\n";
}
echo "------------------------------------------\n";
echo "Tổng: {$created} trang tạo mới, {$skipped} trang đã tồn tại.\n";
echo "==========================================\n\n";

// Gợi ý cài đặt Posts Page
echo "📌 TIẾP THEO — Cài đặt Trang Tin Tức:\n";
echo "   Vào WordPress Admin → Settings → Reading\n";
echo "   Mục 'Posts page': Tạo trang 'Tin tức' (slug: tin-tuc) và chọn nó.\n\n";
