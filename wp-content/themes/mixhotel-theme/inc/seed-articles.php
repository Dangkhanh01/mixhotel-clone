<?php
/**
 * Mix Hotel - Seeder for Articles & Categories (Tin Tức)
 *
 * Imports 8 rich articles, categories, and media into WordPress database.
 * Can be run via:
 * 1. CLI: php -r "require 'wp-load.php'; require 'wp-content/themes/mixhotel-theme/inc/seed-articles.php'; mixhotel_seed_articles();"
 * 2. Admin Tool in Tools > Khôi phục Mẫu Trang
 *
 * @package MixHotelTheme
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Import article images from assets/images/articles to WordPress Media Library
 *
 * @return array Array of [filename => ['id' => int, 'url' => string]]
 */
function mixhotel_import_article_images_to_media_library() {
    $images_dir = get_template_directory() . '/assets/images/articles';
    if (!is_dir($images_dir)) {
        return [];
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';

    $upload_dir = wp_upload_dir();
    $target_dir = $upload_dir['basedir'] . '/articles';
    $target_url = $upload_dir['baseurl'] . '/articles';
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
            'meta_key'    => '_mixhotel_article_image_filename',
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
            'post_title'     => 'Mix Hotel Article - ' . ucwords($clean_title),
            'post_content'   => '',
            'post_status'    => 'inherit'
        ];

        $attach_id = wp_insert_attachment($attachment, $dest_file);
        if (!is_wp_error($attach_id) && $attach_id > 0) {
            $attach_data = wp_generate_attachment_metadata($attach_id, $dest_file);
            wp_update_attachment_metadata($attach_id, $attach_data);
            update_post_meta($attach_id, '_mixhotel_article_image_filename', $file);
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
 * Seed all categories and articles
 *
 * @return array Summary of seeded items
 */
function mixhotel_seed_articles() {
    $results = [
        'categories_created' => 0,
        'categories_updated' => 0,
        'articles_created'   => 0,
        'articles_updated'   => 0,
        'images_imported'    => 0,
        'errors'             => [],
    ];

    // 1. Categories Definition
    $categories_data = [
        'review' => [
            'name'          => 'Review Khách Sạn',
            'title'         => 'REVIEW KHÁCH SẠN TÌNH YÊU',
            'subtitle'      => 'TRẢI NGHIỆM THỰC TẾ CÁC PHÒNG CONCEPT',
            'description'   => 'Trải nghiệm thực tế các phòng concept tại Mix Boutique Hotel',
        ],
        'hen-ho' => [
            'name'          => 'Địa Điểm Hẹn Hò',
            'title'         => 'ĐỊA ĐIỂM HẸN HÒ DÀNH CHO CẶP ĐÔI',
            'subtitle'      => 'CHỐN HẸN HÒ LÃNG MẠN TẠI HÀ NỘI',
            'description'   => 'Gợi ý chốn hẹn hò lãng mạn tại Hà Nội cho các cặp đôi',
        ],
        'di-choi' => [
            'name'          => 'Địa Điểm Đi Chơi',
            'title'         => 'ĐỊA ĐIỂM ĐI CHƠI CHO CẶP ĐÔI',
            'subtitle'      => 'GỢI Ý ĐỊA ĐIỂM HẸN HÒ CUỐI TUẦN',
            'description'   => 'Gợi ý các địa điểm đi chơi, hẹn hò cuối tuần',
        ],
        'qua-tang' => [
            'name'          => 'Gợi Ý Quà Tặng',
            'title'         => 'GỢI Ý QUÀ TẶNG CÁC DỊP LỄ',
            'subtitle'      => 'SET QUÀ TẶNG & SETUP LÃNG MẠN',
            'description'   => 'Gợi ý set quà tặng và dịch vụ setup lãng mạn các dịp lễ',
        ],
        'kien-thuc' => [
            'name'          => 'Kiến Thức Khách Sạn',
            'title'         => 'KIẾN THỨC VỀ KHÁCH SẠN',
            'subtitle'      => 'QUY CHUẨN DỊCH VỤ & BẢO MẬT MIX',
            'description'   => 'Quy chuẩn dịch vụ, nội quy và tính bảo mật tại khách sạn',
        ],
        'cam-nang' => [
            'name'          => 'Cẩm Nang Tình Yêu',
            'title'         => 'CẨM NANG TÌNH YÊU',
            'subtitle'      => 'BÍ QUYẾT GIỮ LỬA & THĂNG HOA CẢM XÚC',
            'description'   => 'Bí quyết giữ lửa tình yêu và thăng hoa cảm xúc',
        ],
        'dia-chi' => [
            'name'          => 'Địa Chỉ Khách Sạn',
            'title'         => 'CÁC ĐỊA CHỈ KHÁCH SẠN TÌNH YÊU',
            'subtitle'      => 'HỆ THỐNG 3 CHI NHÁNH MIX BOUTIQUE',
            'description'   => 'Hệ thống 3 chi nhánh Mix Boutique Hotel và các địa chỉ lân cận',
        ],
    ];

    $cat_ids = [];
    foreach ($categories_data as $slug => $c_info) {
        $term = get_term_by('slug', $slug, 'category');
        if (!$term) {
            $created = wp_insert_term($c_info['name'], 'category', [
                'slug'        => $slug,
                'description' => $c_info['description'],
            ]);
            if (!is_wp_error($created)) {
                $term_id = $created['term_id'];
                update_term_meta($term_id, '_mixhotel_cat_title', $c_info['title']);
                update_term_meta($term_id, '_mixhotel_cat_subtitle', $c_info['subtitle']);
                $cat_ids[$slug] = $term_id;
                $results['categories_created']++;
            } else {
                $results['errors'][] = "Lỗi tạo danh mục {$slug}: " . $created->get_error_message();
            }
        } else {
            wp_update_term($term->term_id, 'category', [
                'name'        => $c_info['name'],
                'description' => $c_info['description'],
            ]);
            update_term_meta($term->term_id, '_mixhotel_cat_title', $c_info['title']);
            update_term_meta($term->term_id, '_mixhotel_cat_subtitle', $c_info['subtitle']);
            $cat_ids[$slug] = $term->term_id;
            $results['categories_updated']++;
        }
    }

    // 2. Import Images to Media Library
    $images_map = mixhotel_import_article_images_to_media_library();
    $results['images_imported'] = count($images_map);

    // 3. Load Articles Data JSON
    $json_file = get_template_directory() . '/inc/articles-data.json';
    if (!file_exists($json_file)) {
        $results['errors'][] = "Không tìm thấy file articles-data.json tại: {$json_file}";
        return $results;
    }

    $raw_json = file_get_contents($json_file);
    $articles = json_decode($raw_json, true);
    if (!is_array($articles)) {
        $results['errors'][] = "Lỗi giải mã JSON articles-data.json";
        return $results;
    }

    $theme_uri = get_template_directory_uri();
    $upload_dir = wp_upload_dir();
    $upload_articles_url = $upload_dir['baseurl'] . '/articles';

    // 4. Trash or draft default "Chào tất cả mọi người!" post if present
    $hello_post = get_post(1);
    if ($hello_post && $hello_post->post_name === 'chao-moi-nguoi') {
        wp_update_post([
            'ID'          => 1,
            'post_status' => 'draft',
        ]);
    }

    // 5. Seed Each Article
    foreach ($articles as $art) {
        $slug = sanitize_title($art['slug']);
        $title = $art['title'];
        $excerpt = $art['excerpt'];
        $content = $art['contentHtml'];
        $category_slug = $art['category'];

        // Replace internal image URLs
        // Pattern: /images/articles/filename
        $content = preg_replace_callback(
            '#/images/articles/([a-zA-Z0-9_\-\.]+)#',
            function($matches) use ($images_map, $upload_articles_url, $theme_uri) {
                $filename = $matches[1];
                if (isset($images_map[$filename])) {
                    return $images_map[$filename]['url'];
                }
                return $theme_uri . '/assets/images/articles/' . $filename;
            },
            $content
        );

        // Convert date DD/MM/YYYY to MySQL format YYYY-MM-DD HH:ii:ss
        $post_date = current_time('mysql');
        if (!empty($art['publishedAt'])) {
            $parts = explode('/', $art['publishedAt']);
            if (count($parts) === 3) {
                $post_date = "{$parts[2]}-{$parts[1]}-{$parts[0]} 09:00:00";
            }
        }

        // Check if article already exists by slug
        $existing = get_posts([
            'name'        => $slug,
            'post_type'   => 'post',
            'post_status' => 'any',
            'numberposts' => 1,
        ]);

        $post_data = [
            'post_title'   => $title,
            'post_name'    => $slug,
            'post_content' => $content,
            'post_excerpt' => $excerpt,
            'post_status'  => 'publish',
            'post_type'    => 'post',
            'post_date'    => $post_date,
            'post_author'  => 1,
        ];

        $post_id = 0;
        if (!empty($existing)) {
            $post_id = $existing[0]->ID;
            $post_data['ID'] = $post_id;
            wp_update_post($post_data);
            $results['articles_updated']++;
        } else {
            $post_id = wp_insert_post($post_data);
            if (is_wp_error($post_id)) {
                $results['errors'][] = "Lỗi tạo bài viết {$slug}: " . $post_id->get_error_message();
                continue;
            }
            $results['articles_created']++;
        }

        // Assign Category
        if (isset($cat_ids[$category_slug])) {
            wp_set_post_terms($post_id, [$cat_ids[$category_slug]], 'category');
        }

        // Assign Featured Image Thumbnail
        $thumb_filename = basename($art['thumbnail']);
        if (isset($images_map[$thumb_filename])) {
            set_post_thumbnail($post_id, $images_map[$thumb_filename]['id']);
        }

        // Save Custom Meta
        if (!empty($art['readTime'])) {
            update_post_meta($post_id, '_mixhotel_read_time', sanitize_text_field($art['readTime']));
        }
        if (!empty($art['views'])) {
            update_post_meta($post_id, '_mixhotel_views', absint($art['views']));
        }
        if (!empty($art['author'])) {
            update_post_meta($post_id, '_mixhotel_author_name', sanitize_text_field($art['author']));
        }
        if (!empty($art['relatedSlugs'])) {
            update_post_meta($post_id, '_mixhotel_related_slugs', $art['relatedSlugs']);
        }
    }

    return $results;
}
