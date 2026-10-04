<?php
/**
 * Mix Hotel - Seeder & Restorer for All Page Contents (WYSIWYG Core Blocks)
 *
 * @package MixHotelTheme
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Import all images from assets/images to WordPress Media Library
 *
 * @return array Array of [filename => ['id' => int, 'url' => string]]
 */
function mixhotel_import_theme_images_to_media_library() {
    $images_dir = get_template_directory() . '/assets/images';
    if (!is_dir($images_dir)) {
        return [];
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';

    $upload_dir = wp_upload_dir();
    $target_dir = $upload_dir['basedir'] . '/mixhotel';
    $target_url = $upload_dir['baseurl'] . '/mixhotel';
    if (!file_exists($target_dir)) {
        wp_mkdir_p($target_dir);
    }

    $map = [];
    $files = scandir($images_dir);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..' || is_dir($images_dir . '/' . $file)) {
            continue;
        }

        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (!in_array($ext, ['webp', 'jpg', 'jpeg', 'png'])) {
            continue;
        }

        // Check if attachment already exists
        $existing = get_posts([
            'post_type'   => 'attachment',
            'meta_key'    => '_mixhotel_theme_image_filename',
            'meta_value'  => $file,
            'post_status' => 'any',
            'numberposts' => 1
        ]);

        if (!empty($existing)) {
            $attach_id = $existing[0]->ID;
            $map[$file] = [
                'id'  => $attach_id,
                'url' => wp_get_attachment_url($attach_id)
            ];
            continue;
        }

        $source_file = $images_dir . '/' . $file;
        $dest_file   = $target_dir . '/' . $file;

        if (!file_exists($dest_file)) {
            copy($source_file, $dest_file);
        }

        $filetype = wp_check_filetype($file, null);
        $clean_title = sanitize_text_field(preg_replace('/\.[^.]+$/', '', str_replace(['-', '_'], ' ', $file)));
        $attachment = [
            'guid'           => $target_url . '/' . $file,
            'post_mime_type' => $filetype['type'],
            'post_title'     => 'Mix Hotel - ' . ucwords($clean_title),
            'post_content'   => '',
            'post_status'    => 'inherit'
        ];

        $attach_id = wp_insert_attachment($attachment, $dest_file);
        if (!is_wp_error($attach_id) && $attach_id > 0) {
            $attach_data = wp_generate_attachment_metadata($attach_id, $dest_file);
            wp_update_attachment_metadata($attach_id, $attach_data);
            update_post_meta($attach_id, '_mixhotel_theme_image_filename', $file);
            update_post_meta($attach_id, '_wp_attachment_image_alt', 'Mix Boutique Hotel ' . $clean_title);

            $map[$file] = [
                'id'  => $attach_id,
                'url' => wp_get_attachment_url($attach_id)
            ];
        }
    }

    return $map;
}

/**
 * Get attachment info by theme image filename
 *
 * @param string $filename
 * @return array ['id' => int, 'url' => string]
 */
function mixhotel_get_theme_image_attachment($filename) {
    static $theme_images_map = null;
    if ($theme_images_map === null) {
        $theme_images_map = mixhotel_import_theme_images_to_media_library();
    }
    if (isset($theme_images_map[$filename])) {
        return $theme_images_map[$filename];
    }
    return [
        'id'  => 0,
        'url' => get_template_directory_uri() . '/assets/images/' . $filename,
    ];
}

function mixhotel_restore_all_pages_content() {
    global $wpdb;

    $theme_dir = get_template_directory();

    $get_pattern_content = function($slug) use ($theme_dir) {
        $file = $theme_dir . '/patterns/' . $slug . '.php';
        if (!file_exists($file)) {
            return '';
        }
        $theme_uri = get_template_directory_uri();
        ob_start();
        include $file;
        $html = ob_get_clean();
        return trim((string) $html);
    };

    // 1. TRANG CHỦ (Front Page)
    $home_patterns = [
        'hero-booking',
        'real-photos-grid',
        'video-showcase',
        'concept-rooms',
        'branches-list',
        'why-choose-us',
        'pricing-table',
        'events-decoration',
        'booking-steps',
        'faq-accordion',
        'final-cta'
    ];

    $home_content = '';
    foreach ($home_patterns as $p) {
        $c = $get_pattern_content($p);
        if (!empty($c)) {
            $home_content .= $c . "\n\n";
        }
    }

    $home_page = get_page_by_path('trang-chu');
    if (!$home_page) {
        $pages = get_posts(['post_type' => 'page', 'title' => 'Trang Chủ', 'post_status' => 'any']);
        if (!empty($pages)) {
            $home_page = $pages[0];
        }
    }

    if (!$home_page) {
        $home_id = wp_insert_post([
            'post_title'   => 'Trang Chủ',
            'post_name'    => 'trang-chu',
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'post_content' => $home_content,
        ]);
    } else {
        $home_id = $home_page->ID;
        $wpdb->update($wpdb->posts, ['post_content' => $home_content], ['ID' => $home_id]);
        clean_post_cache($home_id);
    }

    update_option('show_on_front', 'page');
    update_option('page_on_front', $home_id);

    // 2. GIỚI THIỆU
    $about_patterns = [
        'about-intro',
        'about-amenities',
        'about-testimonials',
        'about-video',
        'about-gallery',
        'about-cta'
    ];
    $about_content = '';
    foreach ($about_patterns as $p) {
        $c = $get_pattern_content($p);
        if (!empty($c)) {
            $about_content .= $c . "\n\n";
        }
    }
    $about_page = get_page_by_path('gioi-thieu');
    if ($about_page) {
        $wpdb->update($wpdb->posts, ['post_content' => $about_content], ['ID' => $about_page->ID]);
        clean_post_cache($about_page->ID);
    }

    // 3. LIÊN HỆ
    $contact_patterns = ['contact-info', 'contact-form', 'contact-maps'];
    $contact_content = '';
    foreach ($contact_patterns as $p) {
        $c = $get_pattern_content($p);
        if (!empty($c)) {
            $contact_content .= $c . "\n\n";
        }
    }
    $contact_page = get_page_by_path('lien-he');
    if ($contact_page) {
        $wpdb->update($wpdb->posts, ['post_content' => $contact_content], ['ID' => $contact_page->ID]);
        clean_post_cache($contact_page->ID);
    }

    // 4. GALLERY
    $gallery_content = $get_pattern_content('gallery-grid') . "\n\n" . $get_pattern_content('final-cta');
    $gallery_page = get_page_by_path('gallery');
    if ($gallery_page) {
        $wpdb->update($wpdb->posts, ['post_content' => $gallery_content], ['ID' => $gallery_page->ID]);
        clean_post_cache($gallery_page->ID);
    }

    // 5. CHÍNH SÁCH ĐẶT TRẢ PHÒNG
    $policy_booking_content = $get_pattern_content('policy-booking');
    $p_booking_page = get_page_by_path('chinh-sach-dat-tra-phong');
    if ($p_booking_page) {
        $wpdb->update($wpdb->posts, ['post_content' => $policy_booking_content], ['ID' => $p_booking_page->ID]);
        clean_post_cache($p_booking_page->ID);
    }

    // 6. CHÍNH SÁCH THANH TOÁN
    $policy_payment_content = $get_pattern_content('policy-payment');
    $p_payment_page = get_page_by_path('chinh-sach-thanh-toan');
    if ($p_payment_page) {
        $wpdb->update($wpdb->posts, ['post_content' => $policy_payment_content], ['ID' => $p_payment_page->ID]);
        clean_post_cache($p_payment_page->ID);
    }

    // 7. CHÍNH SÁCH BẢO MẬT
    $policy_privacy_content = $get_pattern_content('policy-privacy');
    foreach (['chinh-sach-bao-mat-thong-tin', 'chinh-sach-bao-mat'] as $slug) {
        $p_priv = get_page_by_path($slug);
        if ($p_priv) {
            $wpdb->update($wpdb->posts, ['post_content' => $policy_privacy_content], ['ID' => $p_priv->ID]);
            clean_post_cache($p_priv->ID);
        }
    }

    // 8. KHÁCH SẠN TÌNH YÊU
    $room_archive_content = $get_pattern_content('room-archive-content');
    $p_ks = get_page_by_path('khach-san-tinh-yeu');
    if ($p_ks) {
        $wpdb->update($wpdb->posts, ['post_content' => $room_archive_content], ['ID' => $p_ks->ID]);
        clean_post_cache($p_ks->ID);
    }

    // 9. 3 CHI NHÁNH
    foreach ([
        'mix-boutique-premium-hotel',
        'mix-boutique-hotel-256b-dang-tien-dong',
        'mix-boutique-hotel-20-phuc-la-ha-dong',
    ] as $b_slug) {
        $b_page = get_page_by_path($b_slug);
        if ($b_page) {
            $GLOBALS['post'] = $b_page;
            setup_postdata($b_page);
            $branch_content = $get_pattern_content('branch-detail');
            $wpdb->update($wpdb->posts, ['post_content' => $branch_content], ['ID' => $b_page->ID]);
            clean_post_cache($b_page->ID);
        }
    }
    wp_reset_postdata();

    // 10. TIN TỨC
    $blog_content = $get_pattern_content('blog-archive-content');
    $blog_page = get_page_by_path('tin-tuc');
    if ($blog_page) {
        $wpdb->update($wpdb->posts, ['post_content' => $blog_content], ['ID' => $blog_page->ID]);
        clean_post_cache($blog_page->ID);
    }

    return true;
}

/**
 * Register Admin Menu for Restoring Page Content
 */
function mixhotel_register_seed_admin_menu() {
    add_management_page(
        __('Khôi phục Mẫu Trang Mix Hotel', 'mixhotel-theme'),
        __('Khôi phục Mẫu Trang', 'mixhotel-theme'),
        'manage_options',
        'mixhotel-restore-pages',
        'mixhotel_render_restore_pages_admin'
    );
}
add_action('admin_menu', 'mixhotel_register_seed_admin_menu');

/**
 * Render Admin Page for Restoring Page Content
 */
function mixhotel_render_restore_pages_admin() {
    if (!current_user_can('manage_options')) {
        wp_die(__('Bạn không có quyền truy cập trang này.', 'mixhotel-theme'));
    }

    $message = '';
    $message_type = '';

    if (isset($_POST['mixhotel_restore_pages_submit'])) {
        check_admin_referer('mixhotel_restore_pages_nonce_action', 'mixhotel_restore_pages_nonce');
        
        $result = mixhotel_restore_all_pages_content();
        if ($result) {
            $message = __('Đã khôi phục thành công toàn bộ mẫu giao diện gốc cho tất cả các trang! Bây giờ bạn có thể chỉnh sửa trực quan từng khối trong Trang (Pages).', 'mixhotel-theme');
            $message_type = 'success';
        } else {
            $message = __('Có lỗi xảy ra trong quá trình khôi phục trang.', 'mixhotel-theme');
            $message_type = 'error';
        }
    }

    ?>
    <div class="wrap" style="max-width: 900px; margin-top: 20px;">
        <h1 style="display: flex; align-items: center; gap: 10px;">
            <span class="dashicons dashicons-layout" style="font-size: 32px; width: 32px; height: 32px; color: #c5a880;"></span>
            <?php esc_html_e('Khôi phục Mẫu Giao Diện Toàn Bộ Trang (Mix Hotel)', 'mixhotel-theme'); ?>
        </h1>

        <?php if (!empty($message)) : ?>
            <div class="notice notice-<?php echo esc_attr($message_type); ?> is-dismissible" style="padding: 12px 16px; font-size: 14px;">
                <p><strong><?php echo esc_html($message); ?></strong></p>
            </div>
        <?php endif; ?>

        <div style="background: #ffffff; border: 1px solid #ccd0d4; border-left: 4px solid #c5a880; padding: 20px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-top: 20px;">
            <h2 style="margin-top: 0; color: #1d2327;">🛠️ <?php esc_html_e('Công cụ Tái tạo / Đặt lại Nội dung Mẫu Gutenberg', 'mixhotel-theme'); ?></h2>
            <p style="font-size: 14px; line-height: 1.6; color: #50575e;">
                <?php esc_html_e('Hệ thống Mix Hotel cho phép bạn chỉnh sửa nội dung toàn bộ trang một cách trực quan dạng Figma ngay tại danh sách ', 'mixhotel-theme'); ?>
                <a href="<?php echo esc_url(admin_url('edit.php?post_type=page')); ?>" style="font-weight: 600; color: #2271b1;">
                    <?php esc_html_e('Trang (Pages)', 'mixhotel-theme'); ?>
                </a>.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #50575e;">
                <?php esc_html_e('Nếu trong quá trình quản trị, bạn lỡ xóa nhầm các khối hoặc làm sai lệch cấu trúc giao diện mẫu gốc, bạn có thể bấm nút bên dưới để khôi phục lại toàn bộ nội dung chuẩn cho các trang:', 'mixhotel-theme'); ?>
            </p>
            <ul style="list-style: disc; margin-left: 24px; color: #50575e; font-size: 13px; line-height: 1.6;">
                <li><strong>Trang Chủ (Front Page):</strong> 11 Section (Hero Booking, Real Photos, Concept Rooms, Chi Nhánh, Bảng Giá, v.v.)</li>
                <li><strong>Giới Thiệu (About):</strong> 6 Section chuẩn</li>
                <li><strong>Liên Hệ (Contact):</strong> 3 Khối liên hệ & bản đồ</li>
                <li><strong>Gallery:</strong> Thư viện ảnh full visual</li>
                <li><strong>Khách Sạn Tình Yêu:</strong> Danh mục phòng tình yêu</li>
                <li><strong>3 Chi Nhánh:</strong> Premium Hotel, Đặng Tiến Đông, Phúc La Hà Đông</li>
                <li><strong>3 Chính Sách:</strong> Đặt trả phòng, Thanh toán, Bảo mật thông tin</li>
                <li><strong>Tin Tức:</strong> Danh sách bài viết & cẩm nang</li>
            </ul>

            <div style="background: #fff8e5; border-left: 4px solid #dba617; padding: 12px 16px; margin: 20px 0;">
                <p style="margin: 0; color: #614700; font-size: 13px;">
                    ⚠️ <strong><?php esc_html_e('Lưu ý quan trọng:', 'mixhotel-theme'); ?></strong>
                    <?php esc_html_e('Hành động này sẽ ghi đè các nội dung mẫu mặc định vào các trang trên. Nếu bạn đã có các tùy biến riêng, hãy lưu bản nháp hoặc kiểm tra WordPress Revisions.', 'mixhotel-theme'); ?>
                </p>
            </div>

            <form method="post" action="" onsubmit="return confirm('<?php echo esc_js(__('Bạn có chắc chắn muốn khôi phục lại toàn bộ nội dung mẫu gốc cho tất cả các trang?', 'mixhotel-theme')); ?>');">
                <?php wp_nonce_field('mixhotel_restore_pages_nonce_action', 'mixhotel_restore_pages_nonce'); ?>
                <button type="submit" name="mixhotel_restore_pages_submit" class="button button-primary button-hero" style="background: #1d2327; border-color: #c5a880; color: #ffe2a0; font-weight: 600; text-shadow: none; box-shadow: none;">
                    🔄 <?php esc_html_e('Khôi phục Toàn bộ Trang Mẫu Mặc định', 'mixhotel-theme'); ?>
                </button>
            </form>
        </div>
    </div>
    <?php
}

/**
 * Friendly notification on Pages list screen (edit.php?post_type=page)
 */
function mixhotel_pages_screen_admin_notice() {
    $screen = get_current_screen();
    if ($screen && $screen->id === 'edit-page') {
        ?>
        <div class="notice notice-info is-dismissible" style="border-left-color: #c5a880; background: #fffcf8; padding: 12px 16px;">
            <p style="font-size: 14px; margin: 0; color: #1d2327;">
                ✨ <strong>Trình chỉnh sửa trực quan Figma-Style:</strong> 
                Nhấp vào tiêu đề bất kỳ trang nào bên dưới (<em>Trang Chủ, Giới Thiệu, Liên Hệ, Gallery...</em>) để chỉnh sửa trực quan với giao diện Dark Luxury chuẩn xác. 
                Đổi chữ và thay ảnh trực tiếp tại từng khối. 
                Nếu cần đặt lại bố cục gốc, truy cập <a href="<?php echo esc_url(admin_url('tools.php?page=mixhotel-restore-pages')); ?>" style="color: #2271b1; font-weight: 600;">Công cụ &gt; Khôi phục Mẫu Trang</a>.
            </p>
        </div>
        <?php
    }
}
add_action('admin_notices', 'mixhotel_pages_screen_admin_notice');
