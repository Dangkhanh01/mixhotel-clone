<?php
/**
 * Helper Functions for Mix Boutique Hotel
 *
 * Các hàm tiện ích dùng chung trong theme patterns và templates.
 * Tuân thủ AGENTS.md: Escape output đúng ngữ cảnh.
 *
 * @package MixHotel_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class MixHotel_Helpers {

    /**
     * Meta prefix
     */
    const PREFIX = '_mixhotel_';

    /**
     * Format giá tiền theo chuẩn Việt Nam
     *
     * @param int|string $amount Số tiền (VD: 350000).
     * @return string Giá đã format (VD: "350.000đ") hoặc "Liên hệ" nếu rỗng.
     */
    public static function format_price( $amount ) {
        if ( $amount === '' || $amount === null || $amount === false ) {
            return __( 'Liên hệ', 'mixhotel-core' );
        }

        $amount = absint( $amount );
        if ( $amount === 0 ) {
            return __( 'Liên hệ', 'mixhotel-core' );
        }

        return number_format( $amount, 0, ',', '.' ) . 'đ';
    }

    /**
     * Lấy toàn bộ thông tin chi nhánh
     *
     * @param int $branch_id Post ID của hotel_branch.
     * @return array|false Mảng dữ liệu chi nhánh hoặc false nếu không tồn tại.
     */
    public static function get_branch_data( $branch_id ) {
        $branch_id = absint( $branch_id );
        if ( $branch_id === 0 ) {
            return false;
        }

        $branch = get_post( $branch_id );
        if ( ! $branch || $branch->post_type !== 'hotel_branch' || $branch->post_status !== 'publish' ) {
            return false;
        }

        return [
            'id'         => $branch_id,
            'name'       => $branch->post_title,
            'address'    => get_post_meta( $branch_id, self::PREFIX . 'branch_address', true ),
            'hotline'    => get_post_meta( $branch_id, self::PREFIX . 'branch_hotline', true ),
            'zalo'       => get_post_meta( $branch_id, self::PREFIX . 'branch_zalo', true ),
            'messenger'  => get_post_meta( $branch_id, self::PREFIX . 'branch_messenger', true ),
            'sms'        => get_post_meta( $branch_id, self::PREFIX . 'branch_sms', true ),
            'maps_embed' => get_post_meta( $branch_id, self::PREFIX . 'branch_maps_embed', true ),
        ];
    }

    /**
     * Lấy giá phòng theo loại
     *
     * @param int    $post_id Post ID của hotel_room.
     * @param string $type    Loại giá: '2h', 'extra_hour', 'overnight', 'allday'.
     * @return int|string Giá trị số hoặc chuỗi rỗng nếu chưa nhập.
     */
    public static function get_room_price( $post_id, $type = '2h' ) {
        $meta_map = [
            '2h'         => 'room_price_2h',
            'extra_hour' => 'room_price_extra_hour',
            'overnight'  => 'room_price_overnight',
            'allday'     => 'room_price_allday',
        ];

        if ( ! isset( $meta_map[ $type ] ) ) {
            return '';
        }

        return get_post_meta( absint( $post_id ), self::PREFIX . $meta_map[ $type ], true );
    }

    /**
     * Lấy giá phòng đã format theo loại
     *
     * @param int    $post_id Post ID của hotel_room.
     * @param string $type    Loại giá: '2h', 'extra_hour', 'overnight', 'allday'.
     * @return string Giá đã format (VD: "350.000đ") hoặc "Liên hệ".
     */
    public static function get_room_price_formatted( $post_id, $type = '2h' ) {
        $raw = self::get_room_price( $post_id, $type );
        return self::format_price( $raw );
    }

    /**
     * Lấy danh sách attachment IDs của gallery phòng
     *
     * @param int $post_id Post ID của hotel_room.
     * @return array Mảng attachment IDs (có thể rỗng).
     */
    public static function get_room_gallery( $post_id ) {
        $gallery = get_post_meta( absint( $post_id ), self::PREFIX . 'room_gallery', true );

        if ( ! is_array( $gallery ) ) {
            return [];
        }

        // Lọc chỉ giữ IDs hợp lệ
        return array_filter( array_map( 'absint', $gallery ) );
    }

    /**
     * Lấy mảng URLs ảnh gallery ở các kích thước
     *
     * @param int    $post_id Post ID của hotel_room.
     * @param string $size    Kích thước ảnh WordPress (VD: 'large', 'medium', 'thumbnail').
     * @return array Mảng chứa ['id' => int, 'url' => string, 'alt' => string].
     */
    public static function get_room_gallery_images( $post_id, $size = 'large' ) {
        $ids    = self::get_room_gallery( $post_id );
        $images = [];

        foreach ( $ids as $img_id ) {
            $url = wp_get_attachment_image_url( $img_id, $size );
            if ( $url ) {
                $images[] = [
                    'id'  => $img_id,
                    'url' => $url,
                    'alt' => get_post_meta( $img_id, '_wp_attachment_image_alt', true ) ?: get_the_title( $img_id ),
                ];
            }
        }

        return $images;
    }

    /**
     * Lấy dữ liệu chi nhánh liên kết với phòng
     *
     * @param int $room_id Post ID của hotel_room.
     * @return array|false Mảng dữ liệu chi nhánh hoặc false.
     */
    public static function get_room_branch_data( $room_id ) {
        $branch_id = get_post_meta( absint( $room_id ), self::PREFIX . 'room_branch_id', true );
        return self::get_branch_data( $branch_id );
    }

    /**
     * Kiểm tra phòng có phải là phòng nổi bật không
     *
     * @param int $post_id Post ID của hotel_room.
     * @return bool
     */
    public static function is_room_featured( $post_id ) {
        return get_post_meta( absint( $post_id ), self::PREFIX . 'room_featured', true ) === '1';
    }

    /**
     * Lấy mã phòng
     *
     * @param int $post_id Post ID của hotel_room.
     * @return string Mã phòng hoặc chuỗi rỗng.
     */
    public static function get_room_code( $post_id ) {
        return get_post_meta( absint( $post_id ), self::PREFIX . 'room_code', true );
    }

    /**
     * Lấy YouTube Video ID
     *
     * @param int $post_id Post ID của hotel_room.
     * @return string YouTube ID hoặc chuỗi rỗng.
     */
    public static function get_room_youtube_id( $post_id ) {
        return get_post_meta( absint( $post_id ), self::PREFIX . 'room_youtube_id', true );
    }

    /**
     * Lấy hotline hiển thị cho phòng (từ chi nhánh hoặc fallback)
     *
     * Tuân thủ Edge Case #2 trong spec: phòng chưa gán chi nhánh → "Liên hệ tổng đài"
     *
     * @param int $room_id Post ID của hotel_room.
     * @return string Số hotline hoặc "Liên hệ tổng đài".
     */
    public static function get_room_hotline( $room_id ) {
        $branch = self::get_room_branch_data( $room_id );
        if ( $branch && ! empty( $branch['hotline'] ) ) {
            return $branch['hotline'];
        }
        return __( 'Liên hệ tổng đài', 'mixhotel-core' );
    }

    /**
     * Lấy link Zalo cho phòng (từ chi nhánh hoặc fallback #)
     *
     * @param int $room_id Post ID của hotel_room.
     * @return string URL Zalo hoặc '#'.
     */
    public static function get_room_zalo_link( $room_id ) {
        $branch = self::get_room_branch_data( $room_id );
        if ( $branch && ! empty( $branch['zalo'] ) ) {
            return $branch['zalo'];
        }
        return '#';
    }
}

// =========================================================================
// Global wrapper functions (tiện dùng trong templates/patterns)
// =========================================================================

if ( ! function_exists( 'mixhotel_format_price' ) ) {
    /**
     * Format giá tiền VNĐ
     *
     * @param int|string $amount Số tiền.
     * @return string
     */
    function mixhotel_format_price( $amount ) {
        return MixHotel_Helpers::format_price( $amount );
    }
}

if ( ! function_exists( 'mixhotel_get_branch_data' ) ) {
    /**
     * Lấy dữ liệu chi nhánh
     *
     * @param int $branch_id Post ID.
     * @return array|false
     */
    function mixhotel_get_branch_data( $branch_id ) {
        return MixHotel_Helpers::get_branch_data( $branch_id );
    }
}

if ( ! function_exists( 'mixhotel_get_room_price' ) ) {
    /**
     * Lấy giá phòng raw
     *
     * @param int    $post_id Post ID.
     * @param string $type    Loại giá.
     * @return int|string
     */
    function mixhotel_get_room_price( $post_id, $type = '2h' ) {
        return MixHotel_Helpers::get_room_price( $post_id, $type );
    }
}

if ( ! function_exists( 'mixhotel_get_room_gallery' ) ) {
    /**
     * Lấy gallery IDs
     *
     * @param int $post_id Post ID.
     * @return array
     */
    function mixhotel_get_room_gallery( $post_id ) {
        return MixHotel_Helpers::get_room_gallery( $post_id );
    }
}
