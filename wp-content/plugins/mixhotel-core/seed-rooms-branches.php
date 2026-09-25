<?php
/**
 * Seeder Script for Mix Boutique Hotel Demo Data
 *
 * Seeds Branches, Rooms (all 32 real rooms), Taxonomies, and Gallery Images.
 * Can be run via:
 * 1. CLI direct: php wp-content/plugins/mixhotel-core/seed-rooms-branches.php
 * 2. WP-CLI: wp eval-file wp-content/plugins/mixhotel-core/seed-rooms-branches.php --allow-root
 *
 * @package MixHotelCore
 */

if ( ! defined( 'ABSPATH' ) ) {
    $wp_load_path = dirname( __FILE__, 4 ) . '/wp-load.php';
    if ( file_exists( $wp_load_path ) ) {
        require_once $wp_load_path;
    } else {
        echo "Error: wp-load.php not found at {$wp_load_path}\n";
        exit( 1 );
    }
}

echo "=== MIX BOUTIQUE HOTEL SEEDER START ===\n";

// Helper: Import image as attachment if not already imported
function mix_import_attachment( $path, $title = '' ) {
    global $wpdb;

    $theme_dir = WP_CONTENT_DIR . '/themes/mixhotel-theme/';
    $candidates = [
        $path,
        $theme_dir . ltrim( $path, '/' ),
        $theme_dir . 'assets/images/' . basename( $path ),
        $theme_dir . 'assets/storage/' . ltrim( $path, '/' ),
        $theme_dir . 'assets/uploads/' . ltrim( $path, '/' ),
    ];

    $filepath = '';
    foreach ( $candidates as $cand ) {
        if ( ! empty( $cand ) && file_exists( $cand ) ) {
            $filepath = $cand;
            break;
        }
    }

    if ( empty( $filepath ) ) {
        echo "File not found: {$path}\n";
        return 0;
    }

    $clean_title = $title ?: pathinfo( $filepath, PATHINFO_FILENAME );

    // Check if attachment with same title already exists
    $existing = $wpdb->get_var( $wpdb->prepare(
        "SELECT ID FROM {$wpdb->posts} WHERE post_type = 'attachment' AND post_title = %s LIMIT 1",
        $clean_title
    ) );

    if ( $existing ) {
        return (int) $existing;
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';

    // Copy file to WordPress uploads
    $upload_dir = wp_upload_dir();
    $base_name = basename( $filepath );
    $unique_name = wp_unique_filename( $upload_dir['path'], $base_name );
    $dest_path = $upload_dir['path'] . '/' . $unique_name;
    copy( $filepath, $dest_path );

    $wp_filetype = wp_check_filetype( $unique_name, null );
    $attachment = [
        'post_mime_type' => $wp_filetype['type'],
        'post_title'     => $clean_title,
        'post_content'   => '',
        'post_status'    => 'inherit',
    ];

    $attach_id = wp_insert_attachment( $attachment, $dest_path );
    if ( $attach_id && ! is_wp_error( $attach_id ) ) {
        $attach_data = wp_generate_attachment_metadata( $attach_id, $dest_path );
        wp_update_attachment_metadata( $attach_id, $attach_data );
        echo "Imported attachment {$base_name} => ID {$attach_id}\n";
        return $attach_id;
    }

    return 0;
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
        'address'    => 'Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội',
        'hotline'    => '038 310 4010',
        'zalo'       => 'https://zalo.me/+84383104010',
        'messenger'  => 'https://m.me/mixhotel',
        'sms'        => '0383104010',
        'maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.630023490716!2d105.8016!3d21.0075',
        'image'      => 'assets/storage/jk/1v/jk1vjpywygthniouk288ksn121rl_banner-home.jpg',
    ],
    'cs2-dang-tien-dong' => [
        'title'      => 'Mix Boutique Hotel 256B Đặng Tiến Đông',
        'address'    => '256B Phố Đặng Tiến Đông, Ô Chợ Dừa, Đống Đa, Hà Nội',
        'hotline'    => '039 330 7030',
        'zalo'       => 'https://zalo.me/+84393307030',
        'messenger'  => 'https://m.me/mixhotel',
        'sms'        => '0393307030',
        'maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.498!2d105.821!3d21.012',
        'image'      => 'assets/storage/76/50/7650f9jp65mjs6holbr9rv6psvup_banner-home.jpg',
    ],
    'cs3-phuc-la' => [
        'title'      => 'Mix Boutique Hotel 20 Phúc La Hà Đông',
        'address'    => '20 Phố Phúc La, Khu đô thị Xa La, Hà Đông, Hà Nội',
        'hotline'    => '038 310 4010',
        'zalo'       => 'https://zalo.me/+84383104010',
        'messenger'  => 'https://m.me/mixhotel',
        'sms'        => '0383104010',
        'maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.200!2d105.780!3d20.970',
        'image'      => 'assets/storage/2b/8n/2b8nlobfd9zy6oltw70l9nj8ttdm_banner-home.jpg',
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
    } else {
        wp_update_post( [
            'ID'         => $branch_id,
            'post_title' => $bdata['title'],
        ] );
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

// 4. Seed All 32 Rooms (hotel_room)
$rooms = [
    // === CHI NHÁNH 1: MIX PREMIUM (HUỲNH THÚC KHÁNG) ===
    'bad-girl' => [
        'title'        => 'Room 001 - Bad girl',
        'code'         => 'BADGIRL-001',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Bad girl mang đến không gian đầy lãng mạn và quyến rũ với tông màu đen chủ đạo được làm nổi bật bởi ánh đèn neon tím huyền ảo.',
        'content'      => 'Bad girl mang đến không gian đầy lãng mạn và quyến rũ với tông màu đen chủ đạo được làm nổi bật bởi ánh đèn neon tím huyền ảo. Chiếc giường tròn lớn phủ ga đỏ rực đặt ngay trung tâm, mời gọi các cặp đôi tận hưởng những khoảnh khắc riêng tư ngọt ngào. Bên cạnh đó, chiếc sofa da đen kiểu cách và các chi tiết trang trí lớn trên tường cùng dòng chữ neon tạo thêm sự táo bạo và cá tính cho căn phòng. Ánh sáng dịu nhẹ hắt ra từ các ô cửa sổ trang trí càng làm tăng thêm vẻ ấm cúng và kín đáo, hứa hẹn một đêm đáng nhớ cho các cặp tình nhân.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/storage/do/4j/do4jgj8crqn9ct3kjme1flp1l9bj_001.jpg',
        'amenities'    => ['smart-tv', 'cosplay', 'ghe-tinh-yeu'],
    ],
    'inferno' => [
        'title'        => 'VIP Room 102 - Inferno',
        'code'         => 'INFERNO-102',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Inferno lấy gam màu đỏ và đen làm chủ đạo, tạo nên một bầu không khí rực lửa và đầy đam mê với giường tròn lồng chim và bồn tắm.',
        'content'      => 'Inferno lấy gam màu đỏ và đen làm chủ đạo, tạo nên một bầu không khí rực lửa và đầy đam mê. Trung tâm căn phòng là chiếc giường tròn lớn được đặt trong một chiếc lồng chim màu đỏ nổi bật, gợi lên sự bí ẩn và quyến rũ. Gương được sử dụng rộng khắp để tạo cảm giác không gian rộng lớn và phản chiếu ánh sáng từ đèn LED tím hồng, làm tăng thêm vẻ lãng mạn. Cạnh đó là một bồn tắm lớn màu đỏ trắng, lý tưởng cho những phút giây thư giãn riêng tư. Với thiết kế độc đáo và táo bạo, phòng "Inferno" này hứa hẹn sẽ mang đến trải nghiệm khó quên cho các cặp đôi.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => 'dQw4w9WgXcQ',
        'featured'     => '1',
        'thumb_file'   => 'assets/storage/gf/yb/gfybu3xn4qupjynq9xq9t8p0gymy_102.jpg',
        'amenities'    => ['bon-tam-jacuzzi', 'smart-tv', 'dung-cu-bdsm', 'ghe-tinh-yeu'],
    ],
    'master-n-slave' => [
        'title'        => 'Room 201 - Master n Slave',
        'code'         => 'MASTER-201',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Master \'n\' Slave được thiết kế với phong cách cổ điển và đầy quyền lực, lấy tông màu đỏ đen làm chủ đạo cùng giường 4 cọc gỗ.',
        'content'      => 'Master \'n\' Slave được thiết kế với phong cách cổ điển và đầy quyền lực, lấy tông màu đỏ đen làm chủ đạo. Điểm nhấn của căn phòng là chiếc giường bốn cọc gỗ lớn, tạo nên một không gian vừa sang trọng vừa bí ẩn. Rèm cửa nhung đỏ buông rủ cùng những chi tiết trang trí sắt uốn lượn mang lại cảm giác vương giả. Một chiếc ghế tình yêu chuyên dụng màu đen và các chi tiết trang trí khác được sắp đặt một cách tinh tế, thể hiện rõ chủ đề phòng. Tổng thể, phòng Master \'n\' Slave tạo ra một không gian đầy kịch tính và lãng mạn, rất phù hợp cho những cặp đôi muốn khám phá những trải nghiệm mới lạ.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/storage/tp/c1/tpc1w7dl3b8d3jsn0997qcgcy9zt_201-master-n-slave.jpg',
        'amenities'    => ['dung-cu-bdsm', 'ghe-tinh-yeu', 'smart-tv', 'cosplay'],
    ],
    'galaxy' => [
        'title'        => 'Room 202 - Galaxy',
        'code'         => 'GALAXY-202',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Phòng Galaxy đưa các cặp đôi vào một không gian lãng mạn như dải ngân hà với trần sao lung linh huyền ảo.',
        'content'      => 'Phòng Galaxy đưa các cặp đôi vào một không gian lãng mạn như dải ngân hà. Căn phòng được trang trí với gam màu tối, tạo cảm giác như bầu trời đêm. Điểm nhấn là trần nhà được treo đầy những chuỗi đèn lấp lánh mô phỏng các vì sao, cùng với đèn neon hình đôi môi, tạo nên một không gian vừa huyền ảo vừa lãng mạn. Giường ngủ lớn được đặt giữa phòng, đối diện là tấm gương lớn, giúp căn phòng có cảm giác rộng rãi hơn. Với thiết kế độc đáo này, phòng Galaxy chắc chắn sẽ mang đến một trải nghiệm đáng nhớ cho các cặp đôi.',
        'price_2h'     => 199000,
        'price_extra'  => 50000,
        'price_night'  => 500000,
        'price_allday' => 700000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/storage/63/r7/63r7hvzdxw4kznzy14srvy4fkwdo_202-galaxy.jpg',
        'amenities'    => ['tran-sao', 'smart-tv', 'cosplay'],
    ],
    'eden' => [
        'title'        => 'VIP Room 203 - Eden',
        'code'         => 'EDEN-203',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Eden là một ốc đảo xanh tươi giữa lòng thành phố, lấy cảm hứng từ khu vườn địa đàng với bồn tắm ngâm thư giãn.',
        'content'      => 'Eden là một ốc đảo xanh tươi giữa lòng thành phố, lấy cảm hứng từ khu vườn địa đàng. Căn phòng được bao phủ bởi cây xanh và dây leo giả, tạo cảm giác gần gũi với thiên nhiên, mang lại sự thư thái và tươi mát. Chiếc giường tròn màu trắng tinh khôi đặt ở trung tâm, hài hòa với những chiếc đèn mây tre đan hình nón và những chiếc lá cọ trang trí. Các chi tiết gạch ốp tường cổ điển ở khu vực lavabo và bồn tắm gỗ tự nhiên mang lại cảm giác mộc mạc và hoài cổ. Tổng thể, phòng "Eden" là một không gian lý tưởng cho các cặp đôi tìm kiếm sự bình yên, lãng mạn và hòa mình vào thiên nhiên.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => 'dQw4w9WgXcQ',
        'featured'     => '1',
        'thumb_file'   => 'assets/storage/6f/g3/6fg32jj8v1f0e9e4gl0ycu6rt38m_203-eden.jpg',
        'amenities'    => ['bon-tam-jacuzzi', 'smart-tv', 'cosplay', 'ghe-tinh-yeu'],
    ],
    'lolita' => [
        'title'        => 'Room 301 - Lolita',
        'code'         => 'LOLITA-301',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Lolita là một không gian lãng mạn và dịu dàng, lấy cảm hứng từ phong cách Lolita ngọt ngào sắc hồng pastel.',
        'content'      => 'Lolita là một không gian lãng mạn và dịu dàng, lấy cảm hứng từ phong cách Lolita ngọt ngào. Căn phòng được bao phủ bởi sắc hồng pastel, từ tường, rèm cửa đến các chi tiết nội thất, tạo nên một bầu không khí mơ mộng và đầy thơ mộng. Trung tâm căn phòng là chiếc giường bốn cọc, được trang trí bằng những dây hoa hồng và hoa nhỏ màu vàng, tạo cảm giác như một khu vườn cổ tích. Một chiếc ghế tình yêu kiểu cách với họa tiết hoa văn được đặt cạnh giường, cùng với chiếc gương soi toàn thân hình đám mây, làm tăng thêm sự nữ tính và đáng yêu. Phòng Lolita này là lựa chọn hoàn hảo cho những cặp đôi yêu thích sự lãng mạn và ngọt ngào.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/storage/wy/79/wy79insca4in9diukw7qq8zdes9l_301-lolita.jpg',
        'amenities'    => ['ghe-tinh-yeu', 'smart-tv', 'cosplay'],
    ],
    'karma' => [
        'title'        => 'Room 302 - Karma',
        'code'         => 'KARMA-302',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Karma được thiết kế theo phong cách gợi cảm và huyền bí, với tông màu đỏ nóng bỏng làm chủ đạo cùng tranh Kamasutra.',
        'content'      => 'Karma được thiết kế theo phong cách gợi cảm và huyền bí, với tông màu đỏ nóng bỏng làm chủ đạo. Điểm nhấn độc đáo của căn phòng là những bức tranh Kamasutra được sắp xếp dọc theo bức tường phía đầu giường và trên trần nhà, tạo nên một không gian đầy tính nghệ thuật và kích thích. Chiếc giường tròn lớn màu trắng tinh khôi tương phản nổi bật với tông đỏ của căn phòng. Các chi tiết trang trí như đèn chùm pha lê và gương phản chiếu khắp nơi càng làm tăng thêm vẻ sang trọng và lãng mạn. Phòng Karma hứa hẹn mang đến một trải nghiệm đầy đam mê và khám phá cho các cặp đôi.',
        'price_2h'     => 350000,
        'price_extra'  => 100000,
        'price_night'  => 550000,
        'price_allday' => 750000,
        'youtube_id'   => 'dQw4w9WgXcQ',
        'featured'     => '1',
        'thumb_file'   => 'room-302-karma.jpg',
        'amenities'    => ['bon-tam-jacuzzi', 'smart-tv', 'cosplay', 'ghe-tinh-yeu'],
    ],
    '303-scarlet' => [
        'title'        => 'VIP Room 303 - Scarlet',
        'code'         => 'SCARLET-303',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Scarlet được thiết kế với phong cách mạnh mẽ và táo bạo, kết hợp giữa gam màu đỏ rực rỡ và bồn tắm lộ thiên.',
        'content'      => 'Scarlet được thiết kế với phong cách mạnh mẽ và táo bạo, kết hợp giữa gam màu đỏ rực rỡ và đen huyền bí. Trung tâm căn phòng là chiếc giường tròn lớn màu đỏ, được đặt trên một bệ nâng lót nhung, tạo cảm giác sang trọng và lôi cuốn. Tường phòng được trang trí bằng các đường vân nổi, kết hợp với ánh sáng đỏ của đèn LED, tạo ra không gian đầy kịch tính. Điểm nhấn là biểu tượng chữ X lớn phát sáng và những chiếc gương được bố trí khắp nơi, phản chiếu ánh sáng và tạo cảm giác không gian rộng hơn. Với một bồn tắm lộ thiên và những chiếc ghế sofa da đen, phòng Scarlet này là sự lựa chọn hoàn hảo cho những cặp đôi muốn có một đêm đầy đam mê và lãng mạn.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => 'dQw4w9WgXcQ',
        'featured'     => '1',
        'thumb_file'   => 'assets/storage/4x/5q/4x5qwkkvxx3pz7350scsvbrt1j9x_303-scarlet.jpg',
        'amenities'    => ['bon-tam-jacuzzi', 'smart-tv', 'dung-cu-bdsm', 'ghe-tinh-yeu'],
    ],
    'katana' => [
        'title'        => 'VIP Room 401 - Katana',
        'code'         => 'KATANA-401',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Katana được thiết kế theo phong cách Nhật Bản truyền thống nhưng cũng không kém phần hiện đại và lãng mạn.',
        'content'      => 'Katana được thiết kế theo phong cách Nhật Bản truyền thống nhưng cũng không kém phần hiện đại và lãng mạn. Căn phòng lấy tông màu đỏ đậm và đen làm chủ đạo, tạo nên một không gian ấm cúng và gợi cảm. Điểm nhấn là bức tranh Geisha lớn phía đầu giường và những chiếc đèn lồng đỏ trắng đặc trưng, gợi nhớ văn hóa xứ Phù Tang. Chiếc giường thấp theo kiểu Nhật, kết hợp với các chi tiết trang trí như những tấm gỗ ghép hay biểu tượng chữ X phát sáng, tạo nên một sự hòa quyện độc đáo giữa truyền thống và hiện đại.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => 'dQw4w9WgXcQ',
        'featured'     => '1',
        'thumb_file'   => 'room-401-katana.jpg',
        'amenities'    => ['bon-tam-jacuzzi', 'ghe-tinh-yeu', 'smart-tv', 'dung-cu-bdsm'],
    ],
    'amora' => [
        'title'        => 'Room 402 - Amora',
        'code'         => 'AMORA-402',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Amora mang đến một không gian lãng mạn và gần gũi với thiên nhiên, với trần nhà gỗ và dây đèn như bầu trời sao.',
        'content'      => 'Amora mang đến một không gian lãng mạn và gần gũi với thiên nhiên. Căn phòng được thiết kế theo phong cách ấm áp, với trần nhà bằng gỗ và những dây đèn lấp lánh như bầu trời sao, tạo cảm giác thư giãn và mơ mộng. Điểm độc đáo của phòng là chiếc cửa kính lớn nhìn ra một khu vườn nhỏ với những viên đá và cây xanh, mang thiên nhiên vào trong không gian riêng tư. Nội thất tối giản, với chiếc giường lớn và các chi tiết trang trí như gương ốp tường và đèn ngủ đơn giản, tạo nên một không gian thoáng đãng và tinh tế.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'room-402-amora.jpg',
        'amenities'    => ['tran-sao', 'cosplay', 'smart-tv'],
    ],
    'cloud-nine' => [
        'title'        => 'VIP Room 469 - Cloud Nine',
        'code'         => 'CLOUD-469',
        'branch'       => 'cs1-huynh-thuc-khang',
        'excerpt'      => 'Cloud Nine mang đến một không gian lãng mạn và hiện đại, lấy cảm hứng từ bầu trời đêm đầy sao và bồn sục Jacuzzi.',
        'content'      => 'Cloud Nine mang đến một không gian lãng mạn và hiện đại, lấy cảm hứng từ bầu trời đêm đầy sao. Căn phòng được thiết kế với trần nhà ốp gỗ và trang trí bằng hàng trăm chiếc đèn nhỏ lấp lánh, tạo cảm giác như đang nằm dưới dải ngân hà. Điểm đặc biệt của phòng là một chiếc bồn tắm lớn đặt ngay trong không gian mở, đối diện với giường ngủ, lý tưởng cho những phút giây thư giãn riêng tư của các cặp đôi. Ngoài ra, chiếc máy chiếu lớn với màn hình chiếu cực rộng mang lại trải nghiệm xem phim chân thực như rạp chiếu phim ngay trong phòng.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => 'dQw4w9WgXcQ',
        'featured'     => '1',
        'thumb_file'   => 'room-469-cloudnine.jpg',
        'amenities'    => ['bon-tam-jacuzzi', 'may-chieu', 'cosplay', 'tran-sao'],
    ],

    // === CHI NHÁNH 2: MIX 256B ĐẶNG TIẾN ĐÔNG ===
    'hidden-frenzy' => [
        'title'        => 'Room 00 - Hidden Frenzy',
        'code'         => 'HIDDEN-00',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Rực rỡ và nóng bỏng là cảm giác đầu tiên khi đặt chân vào căn phòng Hidden Frenzy với giường tròn King Size và ghế tình yêu.',
        'content'      => 'Rực rỡ và nóng bỏng là cảm giác đầu tiên khi đặt chân vào căn phòng Hidden Frenzy. Sự khoải cảm sẽ bùng cháy với những cảm xúc thăng hoa mà căn phòng đầy thú vị này manh đến. Với giường tròn King Size và ghế tình yêu là nơi chứ đựng sự đê mê và khoải lạc của các cặp đôi. Dụng cụ yêu luôn được trang bị đầy đủ cho các nàng cùng các chàng thử cảm giác mới lạ. Gương áp trần sẽ là bằng chứng yêu của các cuộc vui bùng cháy và các bạn có thể ngắm khi bạn và người cùng nhau hành động. Không gian tràn hương vị tình ái của căn phòng là điểm nhấn quan trọng cho cuộc vui thêm tròn vị.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/600ac2278a159118a146eab7/hidden-frenzy__2_.webp',
        'amenities'    => ['ghe-tinh-yeu', 'dung-cu-bdsm', 'tran-sao', 'smart-tv'],
    ],
    'oasis' => [
        'title'        => 'VIP 01 - Oasis',
        'code'         => 'OASIS-01',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Nét đặc biệt tạo nên căn phòng Oasis là không gian thư thái tạo nên sự thoải mái khi yêu với tông trắng chủ đạo.',
        'content'      => 'Nét đặc biệt tạo nên căn phòng Oasis là không gian thư thái tạo nên sự thoải mái khi yêu. Với tông trắng là chủ đạo của căn phòng cùng với những ánh đèn vàng là thứ thu hút và nhen nhóp đóm lửa đang rực cháy của hai trái tim. Giường trắng tinh khôi vừa thơ ngây nhưng đấy lại là nơi quyên rũ mọi cảm xúc trở nên hư hỏng. Ghế treo là nơi có thể tâm sự mỗi lúc nhớ nhau nhưng cũng là nơi vô cùng thú vị nếu bạn muốn thử cảm giác mới. Ghế tình yêu có thể giúp bạn hiểu thêm về tư vị sắc thái khi yêu. Đến với Oasis, bạn sẽ được đắm chìm vào sự thái thái đến khoái lạc mà chưa từng có ở nơi đâu.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => '',
        'featured'     => '1',
        'thumb_file'   => 'assets/uploads/images/600ac3df8a159118a146eac0/oasis.webp',
        'amenities'    => ['ghe-tinh-yeu', 'smart-tv', 'cosplay'],
    ],
    'bad-boy' => [
        'title'        => 'Room 02 - Bad Boy',
        'code'         => 'BADBOY-02',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Nếu bạn muốn tìm một căn phòng với đầy sự hư hỏng nhưng lại rất sang trọng thì hãy đến với Bad Boy và chiếc giường lồng sắt.',
        'content'      => 'Nếu bạn muốn tìm một căn phòng với đầy sự hư hỏng nhưng lại rất sang trọng thì hãy đến với Bad Boy. Căn phòng với nhiều hương vị tình ái và sự quyến rũ vô hình làm cho bạn chỉ muốn yêu ngay khi vô phòng. Với thiết kế đặc biệt và tông đỏ chủ đạo, căn phòng toát lên một vẻ bí ẩn nhưng đầy tính khiêu gợi đấy nhé. Chiếc giường nằm gọn trong chiếc lồng sắc tạo cảm giác táo bạo hơn khi yêu. Mọi dụng cụng yêu là điểm nhấn cho cuộc vui thêm rực cháy, gương áp trần là nhân chứng vô hình khi hai trái tìm hoà chung một nhịp đập.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/600ac5388a159118a146eac9/bad-boy__2_.webp',
        'amenities'    => ['dung-cu-bdsm', 'tran-sao', 'smart-tv', 'ghe-tinh-yeu'],
    ],
    'lover' => [
        'title'        => 'VIP 03 - Lover',
        'code'         => 'LOVER-03',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Sự kiều diễm và xa hoa là hai từ miêu tả trọn vẹn vẻ đẹp của căn phòng Lover với bồn tắm sang chảnh.',
        'content'      => 'Sự kiều diễm và xa hoa là hai từ miêu tả trọn vẹn vẻ đẹp của căn phòng Lover. Lover có không gian mê hoặc tinh người với sắc đỏ xen lẫn vào đó là một chút trắng mờ ảo. Giường King size là nơi đắm chìm của mọi cảm xúc rực cháy và thắng hoa. Phòng tắm được trang bị vách ngắn trong suốt cung với đó là bồn tắm xa hoa sẽ cho đôi bạn thêm gần nhau hơn. Ghế tình yêu và ghế sofa là nơi mọi tư thế khó được lên ngôi. Cùng với đó căn phòng có view nhìn thẳng ra hồ tạo cảm giác lãng mạn và gợi cảm hơn khi yêu.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => '',
        'featured'     => '1',
        'thumb_file'   => 'assets/uploads/images/600bce438a159118a146eb32/lover__4_.webp',
        'amenities'    => ['bon-tam-jacuzzi', 'ghe-tinh-yeu', 'smart-tv', 'cosplay'],
    ],
    'after-sunset' => [
        'title'        => 'Room 04 - After Sunset',
        'code'         => 'SUNSET-04',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Sự trang trọng và quí tộc chỉ có thể ở căn phòng After Sunset với giường King size và ghế tình yêu.',
        'content'      => 'Sự trang trọng và quí tộc chỉ có thể ở căn phòng After Sunset. Tại đây, bạn sẽ là những nhà thường lưu học cách ăn chơi theo kiểu xa hoa. Giường King Size là nơi lý tưởng bắt đầu cho cuộc yêu đầy máu lửa. Ghế tình yêu thử thách độ dẻo dai của các cặp đôi và gương áp trần soi sáng hai cá thể đang hoà thành một. Với thiết kế cổ điển sẽ làm cho cuộc vui của bạn thêm phần tuyệt sắc và hoa lệ. Background màu đỏ cháy sẽ thêm phần kích thích và tạo cảm giác nóng và đầy máu lửa cho cuộc vui thêm phận thăng hoa.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/600bd0208a159118a146eb3b/after-sunset__1_.webp',
        'amenities'    => ['ghe-tinh-yeu', 'tran-sao', 'smart-tv'],
    ],
    'kissing' => [
        'title'        => 'VIP 05 - Kissing',
        'code'         => 'KISSING-05',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Sắc đỏ rực cháy là điểm thu hút mạnh mẽ của căn phòng Kissing với bồn tắm sủi bọt ngắm view thành phố.',
        'content'      => 'Sắc đỏ rực cháy là điểm thu hút mạnh mẽ của căn phòng mang tên Kissing. Đến với Kissing, bạn sẽ được trải nghiệm những điều mới lạ và khoái cảm khi yêu. Giường tròn độc đáo với phong cách quý tộc là nơi bạn cùng người ấy thoả sức lăn tròn ở một tầm cao mới. Bồn tắm sủi bọt bông mịn cùng với view ngắm toàn cảnh thành phố thì chỉ có hai từ mê đắm. Ghế tình yêu cho bạn cùng người ấy thử độ dẻo dai trong mọi tư thế. Không gian ấm cúng của Kissing sẽ bắt trọn từng nhịp đập của hai trái tim đang bùng cháy bên nhau.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => '',
        'featured'     => '1',
        'thumb_file'   => 'assets/uploads/images/600bd1c98a159118a146eb45/kissing__3_.webp',
        'amenities'    => ['bon-tam-jacuzzi', 'ghe-tinh-yeu', 'smart-tv', 'cosplay'],
    ],
    'lollipop' => [
        'title'        => 'Room 06 - Lollipop',
        'code'         => 'LOLLIP-06',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Ngọt ngào và lãng mạn như những bộ phim Mỹ tại căn phòng Lollipop với giường hồng tím mộng mơ.',
        'content'      => 'Ngọt ngào và lãng mạn như nhưng bộ phim mỹ sẽ có ngay tại căn phòng Lollipop. Căn phòng đáng yêu với điểm nhấn là chiếc giường hồng màu tím mộng mơ như những nàng công chúa. Được vui đùa trên chiếc giường ngọt ngào ấy quả thật không còn gì hoàn hảo hơn. Không gian như một chiếc lâu đài thu nhỏ sẽ tạo cho bạn như những hoàng tử và công chúa được thoả mình yêu nhau. Gương áp trần soi sáng bóng dáng của hai người với ngọn lựa đê mê. Mọi phút giây ngọt ngào và thăng hoa của bạn sẽ được lưu trữ tại căn phòng mang tên Lollipop đáng yêu.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/600bd2fa8a159118a146eb51/lollipop__4_.webp',
        'amenities'    => ['tran-sao', 'smart-tv', 'cosplay'],
    ],
    'on-top' => [
        'title'        => 'VIP 07 - On Top',
        'code'         => 'ONTOP-07',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Tình như chốn thiên đường chỉ có tại căn phòng mang tên On Top với thiết kế phong cách Maldives thu nhỏ.',
        'content'      => 'Tình như chốn thiêng đường chỉ có tại căn phòng mang tên On Top. Mang phong cách của một Maldives thu nhỏ lãng mạn và phong tình. Chiếc giường với thiết kế độc đáo là nơi chiến trường tình ái sẽ xảy ra. Bồn tắm hiện đại giúp thăng hoa mọi cảm xúc bị kiềm nén. Một chiếc view đỉnh của căn phòng tạo cảm giác khoái lạc hơn khi yêu. Không gian ấm cúng cho những trái tim cần được sưởi ấm tròn vẹn. Nến, hoa và rượu là chất xúc tác hoàn hảo cho khung cảnh thêm đậm chất tình.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => '',
        'featured'     => '1',
        'thumb_file'   => 'assets/uploads/images/600bd4b68a159118a146eb5b/on-top__8_.webp',
        'amenities'    => ['bon-tam-jacuzzi', 'smart-tv', 'cosplay'],
    ],
    'blowj-up' => [
        'title'        => 'Room 08 - Blowj Up',
        'code'         => 'BLOWJ-08',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Blowj up chứa phong vị ngọt ngào cho cuộc tình đổi gió với chiếc giường treo lửng lơ độc đáo.',
        'content'      => 'Blowj up là nơi chứa phong vị ngọt ngào cho cuộc tình thêm đổi gió. Với thiết kế đơn giản, tinh tế cùng màu trắng là chủ đạo đã tạo nên sự tinh khôi nhưng rất gợi tình. Giường treo lửng lơ mới lạ làm nên cảm giác thăng hoa và thách thức mọi sự xập xình nhấp nhô khi yêu. Nhà tắm là những tấm kính trong suốt với những chiếc rèm mỏng gợi cảm giác vừa bí ẩn vừa chân thật thu hút mọi cảm xúc.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/600bd5d88a159118a146eb67/blowj-up__4_.webp',
        'amenities'    => ['smart-tv', 'cosplay', 'ghe-tinh-yeu'],
    ],
    'lalaland' => [
        'title'        => 'Room 09 - Lalaland',
        'code'         => 'LALA-09',
        'branch'       => 'cs2-dang-tien-dong',
        'excerpt'      => 'Nơi chứa đựng những chuyện tình cảm ngọt ngào lãng mạn với giường trái tim và rạp chiếu phim tại phòng.',
        'content'      => 'Nơi chứa đựng những chuyện tình cảm ngọt ngào là lãng mạn chỉ có thể là Lalaland. Không hào nhoáng và ồn ào, Lalaland mang lại cảm giác ấm cúng và ngọt ngào của những câu chuyện tình yêu bình dị nhưng cũng đầy kích thích. Không gian sang chảnh theo một cách rất riêng làm nên nét thơ mộng đặc sắc. Giường trái tim độc đáo ấm êm thoả sức lặn lộn trong cuộc chiếc tình yêu. Rạp chiếu có ngay trong phòng vừa tiện lời giải trí lại vừa tiện lợi mà hành động.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/600bd7168a159118a146eb71/lalaland__4_.webp',
        'amenities'    => ['may-chieu', 'smart-tv', 'cosplay'],
    ],

    // === CHI NHÁNH 3: MIX 20 PHÚC LA (HÀ ĐÔNG) ===
    'naive' => [
        'title'        => 'Room 201 - Naive',
        'code'         => 'NAIVE-201',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Những chú nai nhỏ bé ngơ ngác đang mở to đôi mắt tròn ngây thơ, như mời gọi chàng thợ săn thuần thục.',
        'content'      => 'Những chú nai nhỏ bé ngơ ngác đang mở to đôi mắt tròn ngây thơ, như mời gọi và chờ đợi những chàng thợ săn thuần thục để được cùng nhau chơi trò TRỐN TÌM giữa con mồi và kẻ săn mồi. Hỡi các anh chàng thợ săn lão luyện, hãy chuẩn bị cho mình một chiến thuật tốt và thi triển kĩ năng vờn mồi đỉnh cao đi nào!',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/606eb8a88a15917d2a0cdb34/naive1.webp',
        'amenities'    => ['cosplay', 'smart-tv', 'ghe-tinh-yeu'],
    ],
    'whisper' => [
        'title'        => 'VIP 102 - Whisper',
        'code'         => 'WHISPER-102',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Một lời thì thầm gợi cảm mang theo hơi thở ấm áp nồng nàn kề cận trong không gian VIP bồn tắm Jacuzzi.',
        'content'      => 'Một lời thì thầm gợi cảm mang theo hơi thở ấm áp nồng nàn kề cận chính là thông điệp yêu thương mạnh mẽ nhất giúp ta chạm tới tất cả những mảnh ghép cảm xúc ở nơi sâu thẳm nhất của người tình. “Whisper” mong muốn sẽ cùng bạn dệt nên những lời tự tình trọn vẹn, lãng mạn và sâu lắng nhất với người mình yêu.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => '',
        'featured'     => '1',
        'thumb_file'   => 'assets/uploads/images/606eba398a15917d2a0cdb3c/whisper.webp',
        'amenities'    => ['bon-tam-jacuzzi', 'smart-tv', 'cosplay', 'ghe-tinh-yeu'],
    ],
    'wake-up' => [
        'title'        => 'VIP 101 - Wake up',
        'code'         => 'WAKEUP-101',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Hãy sẵn sàng để được Wake up đánh thức, vỗ về và mơn trớn mọi giác quan trong không gian bí ẩn.',
        'content'      => 'Hãy sẵn sàng để được Wake up đánh thức, vỗ về và mơn trớn mọi giác quan, hãy dìu dắt người tình đi qua những miền cảm xúc chưa từng được khám phá trong một không gian bí ẩn với bồn tắm sục massage và đầy đủ phụ kiện cảm xúc.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => '',
        'featured'     => '1',
        'thumb_file'   => 'assets/uploads/images/60bc49c18a15913d6bdc812b/wake-up.webp',
        'amenities'    => ['bon-tam-jacuzzi', 'smart-tv', 'dung-cu-bdsm', 'ghe-tinh-yeu'],
    ],
    'rhett-butler' => [
        'title'        => 'VIP 202 - Rhett Butler',
        'code'         => 'RHETT-202',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Rhett Butler - 1 thực thể lãng mạn, giao thoa hòa trộn giữa bóng tối và ánh sáng, hoài niệm và mới mẻ.',
        'content'      => 'Rhett Butler - 1 thực thể lãng mạn, giao thoa hòa trộn giữa bóng tối và ánh sáng, hoài niệm và mới mẻ, dịu dàng da diết và mãnh liệt đắm say với bồn tắm sang chảnh và nội thất quý phái.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => '',
        'featured'     => '1',
        'thumb_file'   => 'assets/uploads/images/60bc57e78a15913d6bdc8195/rhett-butler.webp',
        'amenities'    => ['bon-tam-jacuzzi', 'smart-tv', 'cosplay'],
    ],
    'confession' => [
        'title'        => 'Room 203 - Confession',
        'code'         => 'CONFESS-203',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Căn phòng Thú tội tại Mix đã sẵn sàng để các bad boy dùng hành động chịu phạt thay cho lời thú tội.',
        'content'      => 'Những lời thú tội đôi khi không dễ để diễn đạt bằng lời phải không nào? vậy thì Căn phòng Thú tội tại Mix đã sẵn sàng các để các bad boy dùng hành động chịu phạt thay cho lời thú tội rồi đây! Các chàng trai đã sẵn sàng đón nhận sự trừng phạt ngọt ngào của các cô nàng Gud Girl hay chưa?',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/60bc5b128a15913d6bdc81c0/confession.webp',
        'amenities'    => ['dung-cu-bdsm', 'smart-tv', 'cosplay', 'ghe-tinh-yeu'],
    ],
    'hollywood' => [
        'title'        => 'Room 204 - Hollywood',
        'code'         => 'HOLLY-204',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Thực hiện giấc mơ xem phim màn ảnh siêu rộng dưới bầu trời đầy sao tại căn phòng rạp chiếu Hollywood.',
        'content'      => 'Em có một ước mơ về nước Mỹ - buổi tối chúng tôi sẽ lái xe đến rạp chiếu phim ngoài trời, em vừa có thể xem một bộ phim tình cảm lãng mạn vừa có thể ngắm những ánh sao đêm! Và tôi vừa đưa em đến Hollywood để thực hiện giấc mơ xem phim màn ảnh siêu rộng dưới bầu trời đầy sao…',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/60bc5ce38a15913d6bdc81e1/holywood.webp',
        'amenities'    => ['may-chieu', 'tran-sao', 'smart-tv'],
    ],
    'honeymoon' => [
        'title'        => 'Room 301 - Honeymoon',
        'code'         => 'HONEY-301',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Để mỗi lúc bên nhau sẽ được nếm trải những phút giây ngọt ngào nhất của tuần trăng mật bất tận.',
        'content'      => 'Trong dòng chảy vội vã của thời gian, không ai biết tương lai sẽ ra sao, nhưng em biết chắc chắn rằng những kỷ niệm đẹp đẽ và rung cảm của chúng ta dành cho nhau sẽ chẳng có gì xóa nhòa được. Em muốn ngày ngày cùng nhau đến Honeymoon, để mỗi lúc bên nhau sẽ được nếm trải những phút giây ngọt ngào nhất và dòng kí ức của chúng ta về nhau luôn là những tháng ngày trăng mật bất tận…',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/60bc5f2d8a15913d6bdc81fe/honeymoon.webp',
        'amenities'    => ['ghe-tinh-yeu', 'smart-tv', 'cosplay'],
    ],
    'the-lust' => [
        'title'        => 'VIP 302 - The Lust',
        'code'         => 'LUST-302',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Trạng thái Lust in Love kích hoạt ham muốn và thèm khát yêu thương trong căn phòng VIP bồn tắm sang trọng.',
        'content'      => 'Tôi đang ở trạng thái Lust in Love với em. Mọi thứ về em đều hoàn hảo và thu hút tôi, khuôn mặt em, làn môi mềm ấm nóng của em và cả cơ thể hoàn mỹ của em nữa luôn châm ngòi kích hoạt ham muốn và thèm khát yêu thương của tôi dành cho em. Không biết phải nói và làm những gì để em hiểu được những cảm giác tuyệt vời mà tôi luôn cảm thấy mỗi khi được gần gũi em, và vì thế tôi tìm đến The Lust!',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => '',
        'featured'     => '1',
        'thumb_file'   => 'assets/uploads/images/60bc60638a15913d6bdc8216/the-lust.webp',
        'amenities'    => ['bon-tam-jacuzzi', 'ghe-tinh-yeu', 'smart-tv', 'dung-cu-bdsm'],
    ],
    'flame' => [
        'title'        => 'Room 303 - Flame',
        'code'         => 'FLAME-303',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Hãy để bóng tối nơi căn phòng rực lửa dẫn đường biến chúng ta trở thành ánh sáng, cùng tan chảy trong đêm dài.',
        'content'      => 'Một lần thôi, xin em hãy để tâm hồn lạc lối, buông mình vào màn đêm sâu thẳm để cảm nhận hơi ấm chảy giữa đôi làn môi của anh đang mơn man châm lửa, hực hờ hoang hoải dần thiêu đốt da thịt em và chỉ thêm một cái chạm nhẹ của đôi bàn tay anh nóng bỏng, em sẽ lập tức biến thành hàng ngàn tia lửa nhảy múa trong đêm. Hãy để bóng tối nơi căn phòng rực lửa dẫn đường biến chúng ta trở thành ánh sáng, hãy đốt cháy nhau và cùng tan chảy trong một đêm dài triền miên…',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/60bc61c48a15913d6bdc8229/Flame.webp',
        'amenities'    => ['smart-tv', 'dung-cu-bdsm', 'ghe-tinh-yeu'],
    ],
    'passion' => [
        'title'        => 'Room 304 - Passion',
        'code'         => 'PASSION-304',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Passion - Một câu chuyện tình không thể được coi là đẹp nếu thiếu đi sự đam mê cuồng nhiệt của những phút yêu đầu.',
        'content'      => 'Passion - Một câu chuyện tình không thể được coi là đẹp nếu thiếu đi sự đam mê cuồng nhiệt của những phút yêu đầu. Đam mê khiến ta thèm được uống từng ánh mắt, đôi môi, giọng nói và thậm chí là thèm được lấp đầy nỗi nhớ bằng mùi hương da thịt của nhau, làm ta cảm thấy chỉ cần được ở gần bên nhau thôi đã là điều tuyệt vời hơn sống trong bất kì một giấc mơ đẹp đẽ nào. Passion - một không gian quá đỗi mê hoặc để những người đang yêu tìm kiếm và trao cho nhau những cảm xúc yêu nồng nàn, mãnh liệt nhất.',
        'price_2h'     => 300000,
        'price_extra'  => 60000,
        'price_night'  => 600000,
        'price_allday' => 800000,
        'youtube_id'   => '',
        'featured'     => '0',
        'thumb_file'   => 'assets/uploads/images/60bc62f18a15913d6bdc823d/Passion.webp',
        'amenities'    => ['ghe-tinh-yeu', 'smart-tv', 'cosplay'],
    ],
    'get-high' => [
        'title'        => 'VIP 469 - Get High',
        'code'         => 'GETHIGH-469',
        'branch'       => 'cs3-phuc-la',
        'excerpt'      => 'Get High – không gian lãng mạn và ấm áp giúp các cặp đôi chạm tới nốt cao nhất trong hành trình thăng hoa cảm xúc.',
        'content'      => 'Get High – một không gian lãng mạn và ấm áp, khiến nàng luôn ở trạng thái phấn khích và hưng phấn mỗi lần đặt chân tới có giúp cho chàng dễ dàng chinh phục cảm xúc yêu của nàng hơn? Get High không chỉ giúp các cặp đôi chạm tới được nốt cao nhất trong hành trình kiếm tìm những cung bậc thăng hoa cảm xúc, mà còn giữ cho những rung động mãnh liệt nhất luôn bay bổng, như đang mơ, như đang say… Căn phòng được trang bị bồn tắm sục Jacuzzi và máy chiếu phim màn ảnh rộng.',
        'price_2h'     => 400000,
        'price_extra'  => 80000,
        'price_night'  => 800000,
        'price_allday' => 1000000,
        'youtube_id'   => '',
        'featured'     => '1',
        'thumb_file'   => 'assets/uploads/images/60bc667a8a15913d6bdc8263/Get-High.webp',
        'amenities'    => ['bon-tam-jacuzzi', 'smart-tv', 'cosplay', 'may-chieu'],
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
        echo "Created room: {$rdata['title']} (Slug: {$slug}, ID {$room_id})\n";
    } else {
        wp_update_post( [
            'ID'           => $room_id,
            'post_title'   => $rdata['title'],
            'post_excerpt' => $rdata['excerpt'],
            'post_content' => $rdata['content'],
            'post_status'  => 'publish',
        ] );
        echo "Updated room: {$rdata['title']} (Slug: {$slug}, ID {$room_id})\n";
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

    // Thumbnail & Gallery
    if ( ! empty( $rdata['thumb_file'] ) ) {
        $thumb_id = mix_import_attachment( $rdata['thumb_file'], $rdata['title'] );
        if ( $thumb_id ) {
            set_post_thumbnail( $room_id, $thumb_id );
            // Gallery includes room thumbnail + shared images
            $room_gallery = array_merge( [ $thumb_id ], $shared_gallery );
            update_post_meta( $room_id, '_mixhotel_room_gallery', array_values( array_unique( $room_gallery ) ) );
        }
    }

    // Amenities
    if ( ! empty( $rdata['amenities'] ) ) {
        wp_set_object_terms( $room_id, $rdata['amenities'], 'room_amenity' );
    }
}

// Flush rewrite rules after creating/updating posts
flush_rewrite_rules( false );

$final_count = wp_count_posts( 'hotel_room' )->publish;
echo "=== MIX BOUTIQUE HOTEL SEEDER COMPLETE. TOTAL PUBLISHED ROOMS: {$final_count} ===\n";
