<?php
/**
 * Seeder Script for Mix Boutique Hotel Demo Data
 *
 * Seeds Branches, Rooms, Taxonomies, and Gallery Images.
 * Can be run via: wp eval-file wp-content/plugins/mixhotel-core/seed-rooms-branches.php --allow-root
 *
 * @package MixHotelCore
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

echo "=== MIX BOUTIQUE HOTEL SEEDER START ===\n";

$img_dir = WP_CONTENT_DIR . '/themes/mixhotel-theme/assets/images/';

// Helper: Import image as attachment if not already imported
function mix_import_attachment( $filename, $title = '' ) {
    global $wpdb;
    $filename = basename( $filename );
    $filepath = WP_CONTENT_DIR . '/themes/mixhotel-theme/assets/images/' . $filename;

    if ( ! file_exists( $filepath ) ) {
        echo "File not found: {$filepath}\n";
        return 0;
    }

    // Check if attachment with same title or filename already exists
    $existing = $wpdb->get_var( $wpdb->prepare(
        "SELECT ID FROM {$wpdb->posts} WHERE post_type = 'attachment' AND post_title = %s LIMIT 1",
        $title ?: pathinfo( $filename, PATHINFO_FILENAME )
    ) );

    if ( $existing ) {
        return (int) $existing;
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';

    // Copy file to temp upload
    $upload_dir = wp_upload_dir();
    $unique_name = wp_unique_filename( $upload_dir['path'], $filename );
    $dest_path = $upload_dir['path'] . '/' . $unique_name;
    copy( $filepath, $dest_path );

    $wp_filetype = wp_check_filetype( $unique_name, null );
    $attachment = [
        'post_mime_type' => $wp_filetype['type'],
        'post_title'     => $title ?: pathinfo( $filename, PATHINFO_FILENAME ),
        'post_content'   => '',
        'post_status'    => 'inherit',
    ];

    $attach_id = wp_insert_attachment( $attachment, $dest_path );
    $attach_data = wp_generate_attachment_metadata( $attach_id, $dest_path );
    wp_update_attachment_metadata( $attach_id, $attach_data );

    echo "Imported attachment {$filename} => ID {$attach_id}\n";
    return $attach_id;
}

// 1. Seed Taxonomies: room_amenity
$amenities = [
    'bon-tam-jacuzzi' => [
        'name' => 'Bồn tắm Jacuzzi',
        'desc' => 'Bồn tắm sục massage thư giãn cao cấp cho cặp đôi.',
    ],
    'smart-tv' => [
        'name' => 'Smart Tivi có Netflix',
        'desc' => 'Màn hình lớn tích hợp sẵn tài khoản Netflix xem phim thả ga.',
    ],
    'cosplay' => [
        'name' => 'Cosplay',
        'desc' => 'Miễn phí mượn trang phục cosplay độc đáo và phong phú.',
    ],
    'ghe-tinh-yeu' => [
        'name' => 'Ghế tình yêu',
        'desc' => 'Ghế tình nhân Tantra thiết kế công thái học cao cấp.',
    ],
    'tran-sao' => [
        'name' => 'Trần sao lung linh',
        'desc' => 'Hệ thống đèn LED trần mô phỏng bầu trời sao lãng mạn.',
    ],
    'may-chieu' => [
        'name' => 'Máy chiếu phim',
        'desc' => 'Máy chiếu màn ảnh rộng rạp chiếu phim thu nhỏ tại phòng.',
    ],
    'dung-cu-bdsm' => [
        'name' => 'Dụng cụ BDSM',
        'desc' => 'Bộ phụ kiện trải nghiệm cảm xúc mới lạ, an toàn.',
    ],
];

$amenity_term_ids = [];
foreach ( $amenities as $slug => $data ) {
    $term = get_term_by( 'slug', $slug, 'room_amenity' );
    if ( ! $term ) {
        $res = wp_insert_term( $data['name'], 'room_amenity', [
            'slug'        => $slug,
            'description' => $data['desc'],
        ] );
        if ( ! is_wp_error( $res ) ) {
            $amenity_term_ids[ $slug ] = $res['term_id'];
            echo "Created amenity: {$data['name']} (ID {$res['term_id']})\n";
        }
    } else {
        wp_update_term( $term->term_id, 'room_amenity', [
            'description' => $data['desc'],
        ] );
        $amenity_term_ids[ $slug ] = $term->term_id;
    }
}

// 2. Seed Branches (hotel_branch)
$branches = [
    'cs1-huynh-thuc-khang' => [
        'title'      => 'Mix Huỳnh Thúc Kháng (Mix Premium)',
        'address'    => '186 Hoàng Ngân, Cầu Giấy, Hà Nội',
        'hotline'    => '038 310 4010',
        'zalo'       => 'https://zalo.me/+84383104010',
        'messenger'  => 'https://m.me/mixhotel',
        'sms'        => '0383104010',
        'maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.630023490716!2d105.8016!3d21.0075',
        'image'      => 'branch-huynhthuckhang.webp',
    ],
    'cs2-dang-tien-dong' => [
        'title'      => 'Mix Đặng Tiến Đông',
        'address'    => '256B Đặng Tiến Đông, Đống Đa, Hà Nội',
        'hotline'    => '039 330 7030',
        'zalo'       => 'https://zalo.me/+84393307030',
        'messenger'  => 'https://m.me/mixhotel',
        'sms'        => '0393307030',
        'maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.498!2d105.821!3d21.012',
        'image'      => 'branch-dangtiendong.webp',
    ],
    'cs3-phuc-la' => [
        'title'      => 'Mix Phúc La',
        'address'    => '20 Phúc La, Hà Đông, Hà Nội',
        'hotline'    => '038 310 4010',
        'zalo'       => 'https://zalo.me/+84383104010',
        'messenger'  => 'https://m.me/mixhotel',
        'sms'        => '0383104010',
        'maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.200!2d105.780!3d20.970',
        'image'      => 'branch-phucla.webp',
    ],
];

$branch_post_ids = [];
foreach ( $branches as $slug => $bdata ) {
    $existing_branch = get_page_by_path( $slug, OBJECT, 'hotel_branch' );
    $branch_id = $existing_branch ? $existing_branch->ID : 0;

    if ( ! $branch_id ) {
        $branch_id = wp_insert_post( [
            'post_title'  => $bdata['title'],
            'post_name'   => $slug,
            'post_type'   => 'hotel_branch',
            'post_status' => 'publish',
        ] );
        echo "Created branch: {$bdata['title']} (ID {$branch_id})\n";
    }

    $branch_post_ids[ $slug ] = $branch_id;

    update_post_meta( $branch_id, '_mixhotel_branch_address', $bdata['address'] );
    update_post_meta( $branch_id, '_mixhotel_branch_hotline', $bdata['hotline'] );
    update_post_meta( $branch_id, '_mixhotel_branch_zalo', $bdata['zalo'] );
    update_post_meta( $branch_id, '_mixhotel_branch_messenger', $bdata['messenger'] );
    update_post_meta( $branch_id, '_mixhotel_branch_sms', $bdata['sms'] );
    update_post_meta( $branch_id, '_mixhotel_branch_maps_embed', $bdata['maps_embed'] );

    if ( ! empty( $bdata['image'] ) ) {
        $thumb_id = mix_import_attachment( $bdata['image'], $bdata['title'] );
        if ( $thumb_id ) {
            set_post_thumbnail( $branch_id, $thumb_id );
        }
    }
}

// 3. Shared gallery images
$shared_gallery = [
    mix_import_attachment( 'photo-tile-bathtub.webp', 'Bồn tắm sang trọng' ),
    mix_import_attachment( 'photo-tile-netflix.webp', 'Smart Tivi Netflix' ),
    mix_import_attachment( 'photo-tile-cosplay.jpg', 'Cosplay miễn phí' ),
    mix_import_attachment( 'photo-tile-tantra.webp', 'Ghế tình nhân Tantra' ),
    mix_import_attachment( 'photo-tile-bdsm.webp', 'Phụ kiện lãng mạn' ),
];
$shared_gallery = array_filter( $shared_gallery );

// 4. Seed Rooms (hotel_room)
$rooms = [
    'karma' => [
        'title'        => 'Room 302 - Karma',
        'code'         => 'KARMA-302',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Karma được thiết kế theo phong cách gợi cảm và huyền bí, với tông màu đỏ nóng bỏng làm chủ đạo.',
        'content'      => 'Karma được thiết kế theo phong cách gợi cảm và huyền bí, với tông màu đỏ nóng bỏng làm chủ đạo. Điểm nhấn độc đáo của căn phòng là những bức tranh Kamasutra được sắp xếp dọc theo bức tường phía đầu giường và trên trần nhà, tạo nên một không gian đầy tính nghệ thuật và kích thích. Chiếc giường tròn lớn màu trắng tinh khôi tương phản nổi bật với tông đỏ của căn phòng. Các chi tiết trang trí như đèn chùm pha lê và gương phản chiếu khắp nơi càng làm tăng thêm vẻ sang trọng và lãng mạn.',
        'price_2h'     => 350000,
        'price_extra'  => 100000,
        'price_night'  => 550000,
        'price_allday' => 750000,
        'youtube_id'   => 'dQw4w9WgXcQ',
        'featured'     => '1',
        'thumb_file'   => 'room-302-karma.jpg',
        'amenities'    => ['bon-tam-jacuzzi', 'smart-tv', 'cosplay', 'ghe-tinh-yeu'],
    ],
    'katana' => [
        'title'        => 'VIP Room 401 - Katana',
        'code'         => 'KATANA-401',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Katana được thiết kế theo phong cách Nhật Bản truyền thống nhưng cũng không kém phần hiện đại và lãng mạn.',
        'content'      => 'Katana được thiết kế theo phong cách Nhật Bản truyền thống nhưng cũng không kém phần hiện đại và lãng mạn. Căn phòng lấy tông màu đỏ đậm và đen làm chủ đạo, tạo nên một không gian ấm cúng và gợi cảm với tranh Geisha lớn phía đầu giường cùng đầy đủ trang thiết bị trải nghiệm độc đáo.',
        'price_2h'     => 400000,
        'price_extra'  => 120000,
        'price_night'  => 650000,
        'price_allday' => 850000,
        'youtube_id'   => 'dQw4w9WgXcQ',
        'featured'     => '1',
        'thumb_file'   => 'room-401-katana.jpg',
        'amenities'    => ['bon-tam-jacuzzi', 'ghe-tinh-yeu', 'smart-tv', 'dung-cu-bdsm'],
    ],
    'amora' => [
        'title'        => 'Room 402 - Amora',
        'code'         => 'AMORA-402',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Amora mang đến một không gian lãng mạn và gần gũi với thiên nhiên, trần sao lung linh huyền ảo.',
        'content'      => 'Amora mang đến một không gian lãng mạn và gần gũi với thiên nhiên. Căn phòng được thiết kế theo phong cách ấm áp, với trần nhà bằng gỗ và những dây đèn lấp lánh như bầu trời sao, tạo cảm giác thư giãn và mơ mộng tuyệt đối cho những buổi tối hẹn hò ngọt ngào.',
        'price_2h'     => 320000,
        'price_extra'  => 90000,
        'price_night'  => 500000,
        'price_allday' => 700000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'room-402-amora.jpg',
        'amenities'    => ['tran-sao', 'cosplay', 'smart-tv'],
    ],
    'cloud-nine' => [
        'title'        => 'VIP Room 469 - Cloud Nine',
        'code'         => 'CLOUD-469',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Cloud Nine mang đến một không gian lãng mạn lấy cảm hứng từ bầu trời đêm với bồn sục Jacuzzi và máy chiếu phim.',
        'content'      => 'Cloud Nine mang đến một không gian lãng mạn và hiện đại, lấy cảm hứng từ bầu trời đêm đầy sao với trần nhà trang trí hàng trăm bóng đèn lấp lánh và bồn tắm Jacuzzi lớn đặt ngay trong không gian mở cùng hệ thống máy chiếu phim độ phân giải cao.',
        'price_2h'     => 450000,
        'price_extra'  => 150000,
        'price_night'  => 750000,
        'price_allday' => 950000,
        'youtube_id'   => 'dQw4w9WgXcQ',
        'featured'     => '1',
        'thumb_file'   => 'room-469-cloudnine.jpg',
        'amenities'    => ['bon-tam-jacuzzi', 'may-chieu', 'cosplay', 'tran-sao'],
    ],
];

foreach ( $rooms as $slug => $rdata ) {
    $existing_room = get_page_by_path( $slug, OBJECT, 'hotel_room' );
    $room_id = $existing_room ? $existing_room->ID : 0;

    if ( ! $room_id ) {
        $room_id = wp_insert_post( [
            'post_title'   => $rdata['title'],
            'post_name'    => $slug,
            'post_type'    => 'hotel_room',
            'post_status'  => 'publish',
            'post_excerpt' => $rdata['excerpt'],
            'post_content' => $rdata['content'],
        ] );
        echo "Created room: {$rdata['title']} (ID {$room_id})\n";
    } else {
        wp_update_post( [
            'ID'           => $room_id,
            'post_title'   => $rdata['title'],
            'post_excerpt' => $rdata['excerpt'],
            'post_content' => $rdata['content'],
        ] );
    }

    $branch_id = isset( $branch_post_ids[ $rdata['branch'] ] ) ? $branch_post_ids[ $rdata['branch'] ] : 0;

    update_post_meta( $room_id, '_mixhotel_room_code', $rdata['code'] );
    update_post_meta( $room_id, '_mixhotel_room_branch_id', $branch_id );
    update_post_meta( $room_id, '_mixhotel_room_price_2h', $rdata['price_2h'] );
    update_post_meta( $room_id, '_mixhotel_room_price_extra_hour', $rdata['price_extra'] );
    update_post_meta( $room_id, '_mixhotel_room_price_overnight', $rdata['price_night'] );
    update_post_meta( $room_id, '_mixhotel_room_price_allday', $rdata['price_allday'] );
    update_post_meta( $room_id, '_mixhotel_room_youtube_id', $rdata['youtube_id'] );
    update_post_meta( $room_id, '_mixhotel_room_featured', $rdata['featured'] );

    // Thumbnail
    if ( ! empty( $rdata['thumb_file'] ) ) {
        $thumb_id = mix_import_attachment( $rdata['thumb_file'], $rdata['title'] );
        if ( $thumb_id ) {
            set_post_thumbnail( $room_id, $thumb_id );
            // Gallery includes room thumbnail + shared images
            $room_gallery = array_merge( [ $thumb_id ], $shared_gallery );
            update_post_meta( $room_id, '_mixhotel_room_gallery', array_unique( $room_gallery ) );
        }
    }

    // Amenities
    if ( ! empty( $rdata['amenities'] ) ) {
        wp_set_object_terms( $room_id, $rdata['amenities'], 'room_amenity' );
    }
}

// Flush rewrite rules after creating posts
flush_rewrite_rules( false );

echo "=== MIX BOUTIQUE HOTEL SEEDER COMPLETE ===\n";
