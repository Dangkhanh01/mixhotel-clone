<?php
/**
 * Custom Taxonomies Registration for Mix Boutique Hotel
 * 
 * @package MixHotel_Core
 */

if (!defined('ABSPATH')) {
    exit;
}

class MixHotel_Taxonomies {

    /**
     * Khởi tạo các hook
     */
    public static function init() {
        add_action('init', [__CLASS__, 'register_all_taxonomies'], 0);
    }

    /**
     * Đăng ký taxonomy: room_amenity (Tiện nghi phòng) và room_concept (Phong cách/Chủ đề)
     */
    public static function register_all_taxonomies() {
        // 1. Taxonomy: Tiện nghi phòng (room_amenity)
        $amenity_labels = [
            'name'              => _x('Tiện Nghi Phòng', 'taxonomy general name', 'mixhotel-core'),
            'singular_name'     => _x('Tiện Nghi', 'taxonomy singular name', 'mixhotel-core'),
            'search_items'      => __('Tìm Tiện Nghi', 'mixhotel-core'),
            'all_items'         => __('Tất Cả Tiện Nghi', 'mixhotel-core'),
            'edit_item'         => __('Chỉnh Sửa Tiện Nghi', 'mixhotel-core'),
            'update_item'       => __('Cập Nhật Tiện Nghi', 'mixhotel-core'),
            'add_new_item'      => __('Thêm Mới Tiện Nghi', 'mixhotel-core'),
            'new_item_name'     => __('Tên Tiện Nghi Mới', 'mixhotel-core'),
            'menu_name'         => __('Tiện Nghi', 'mixhotel-core'),
        ];

        register_taxonomy('room_amenity', ['hotel_room'], [
            'hierarchical'      => true,
            'labels'            => $amenity_labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => ['slug' => 'tien-nghi'],
            'show_in_rest'      => true,
        ]);

        // 2. Taxonomy: Concept phòng (room_concept)
        $concept_labels = [
            'name'              => _x('Concept Phòng', 'taxonomy general name', 'mixhotel-core'),
            'singular_name'     => _x('Concept', 'taxonomy singular name', 'mixhotel-core'),
            'search_items'      => __('Tìm Concept', 'mixhotel-core'),
            'all_items'         => __('Tất Cả Concept', 'mixhotel-core'),
            'edit_item'         => __('Chỉnh Sửa Concept', 'mixhotel-core'),
            'update_item'       => __('Cập Nhật Concept', 'mixhotel-core'),
            'add_new_item'      => __('Thêm Mới Concept', 'mixhotel-core'),
            'new_item_name'     => __('Tên Concept Mới', 'mixhotel-core'),
            'menu_name'         => __('Concept Phòng', 'mixhotel-core'),
        ];

        register_taxonomy('room_concept', ['hotel_room'], [
            'hierarchical'      => true,
            'labels'            => $concept_labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => ['slug' => 'concept'],
            'show_in_rest'      => true,
        ]);
    }
}
