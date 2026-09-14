<?php
/**
 * Custom Post Types Registration for Mix Boutique Hotel
 * 
 * @package MixHotel_Core
 */

if (!defined('ABSPATH')) {
    exit;
}

class MixHotel_CPT {

    /**
     * Khởi tạo các hook
     */
    public static function init() {
        add_action('init', [__CLASS__, 'register_all_cpts'], 0);
    }

    /**
     * Đăng ký CPT hotel_room, hotel_branch, booking_lead
     */
    public static function register_all_cpts() {
        // 1. CPT: Phòng khách sạn (hotel_room)
        $room_labels = [
            'name'                  => _x('Phòng Khách Sạn', 'Post type general name', 'mixhotel-core'),
            'singular_name'         => _x('Phòng', 'Post type singular name', 'mixhotel-core'),
            'menu_name'             => _x('Phòng Khách Sạn', 'Admin Menu text', 'mixhotel-core'),
            'add_new'               => __('Thêm Phòng Mới', 'mixhotel-core'),
            'add_new_item'          => __('Thêm Phòng Khách Sạn Mới', 'mixhotel-core'),
            'edit_item'             => __('Chỉnh Sửa Phòng', 'mixhotel-core'),
            'new_item'              => __('Phòng Mới', 'mixhotel-core'),
            'view_item'             => __('Xem Phòng', 'mixhotel-core'),
            'search_items'          => __('Tìm Kiếm Phòng', 'mixhotel-core'),
            'not_found'             => __('Không tìm thấy phòng nào', 'mixhotel-core'),
            'not_found_in_trash'    => __('Không có phòng nào trong thùng rác', 'mixhotel-core'),
        ];

        register_post_type('hotel_room', [
            'labels'             => $room_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => ['slug' => 'khach-san-tinh-yeu', 'with_front' => false],
            'capability_type'    => 'post',
            'has_archive'        => 'khach-san-tinh-yeu',
            'hierarchical'       => false,
            'menu_position'      => 5,
            'menu_icon'          => 'dashicons-building',
            'supports'           => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'show_in_rest'       => true,
        ]);

        // 2. CPT: Chi nhánh (hotel_branch)
        $branch_labels = [
            'name'                  => _x('Chi Nhánh', 'Post type general name', 'mixhotel-core'),
            'singular_name'         => _x('Chi Nhánh', 'Post type singular name', 'mixhotel-core'),
            'menu_name'             => _x('Chi Nhánh', 'Admin Menu text', 'mixhotel-core'),
            'add_new'               => __('Thêm Chi Nhánh', 'mixhotel-core'),
            'add_new_item'          => __('Thêm Chi Nhánh Mới', 'mixhotel-core'),
            'edit_item'             => __('Chỉnh Sửa Chi Nhánh', 'mixhotel-core'),
            'view_item'             => __('Xem Chi Nhánh', 'mixhotel-core'),
            'search_items'          => __('Tìm Chi Nhánh', 'mixhotel-core'),
        ];

        register_post_type('hotel_branch', [
            'labels'             => $branch_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => ['slug' => 'chi-nhanh', 'with_front' => false],
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 6,
            'menu_icon'          => 'dashicons-location',
            'supports'           => ['title', 'editor', 'thumbnail', 'custom-fields'],
            'show_in_rest'       => true,
        ]);

        // 3. CPT: Đơn giữ phòng (booking_lead) - Public = false, chỉ nội bộ admin
        $lead_labels = [
            'name'                  => _x('Đơn Giữ Phòng', 'Post type general name', 'mixhotel-core'),
            'singular_name'         => _x('Đơn Giữ Phòng', 'Post type singular name', 'mixhotel-core'),
            'menu_name'             => _x('Đơn Giữ Phòng', 'Admin Menu text', 'mixhotel-core'),
            'add_new'               => __('Thêm Đơn Mới', 'mixhotel-core'),
            'edit_item'             => __('Xem/Sửa Đơn Giữ Phòng', 'mixhotel-core'),
            'search_items'          => __('Tìm Đơn Giữ Phòng', 'mixhotel-core'),
        ];

        register_post_type('booking_lead', [
            'labels'             => $lead_labels,
            'public'             => false,
            'publicly_queryable' => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => false,
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 7,
            'menu_icon'          => 'dashicons-phone',
            'supports'           => ['title', 'custom-fields'],
            'show_in_rest'       => false,
        ]);
    }
}
