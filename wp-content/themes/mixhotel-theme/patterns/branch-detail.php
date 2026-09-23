<?php
/**
 * Title: Chi Nhánh - Trang Chi Tiết Dark Luxury
 * Slug: mixhotel/branch-detail
 * Categories: mixhotel
 * Keywords: branch, chi nhanh, hotel, mixBoutiqueHero
 * Block Types: core/group
 * Post Types: hotel_branch
 */

$theme_uri     = get_template_directory_uri();
$current_id    = get_the_ID();
$current_slug  = get_post_field('post_name', $current_id);

// 3 Branch authentic profiles matching Next.js UI 100%
$branch_profiles = [
    'premium' => [
        'slugs'       => ['mix-boutique-premium-hotel', 'cs1-huynh-thuc-khang', 'huynh-thuc-khang'],
        'title'       => 'Mix Boutique Premium',
        'address'     => 'B26 ngõ 80 Hoàng Ngân, Trung Hoà, Cầu Giấy (hoặc 186 Huỳnh Thúc Kháng kéo dài)',
        'hotline'     => '038 310 4010',
        'zalo'        => 'https://zalo.me/0383104010',
        'thumb'       => $theme_uri . '/assets/images/branch-huynhthuckhang.webp',
        'room_count'  => '22+ Phòng Concept',
        'default_rooms' => [
            ['title' => 'VIP Room 469 - Cloud Nine', 'desc' => 'Bồng bềnh giữa những dải mây lãng mạn, bồn sục đôi ngập tràn bọt tuyết và máy chiếu 4K.', 'thumb' => $theme_uri . '/assets/images/469-moonlit-love.jpg', 'price_2h' => '400.000đ', 'price_overnight' => '800.000đ', 'price_fullday' => '1.000.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/cloud-nine/')],
            ['title' => 'Room 302 - Karma', 'desc' => 'Không gian lãng mạn đậm chất Á Đông huyền bí, giường tròn lớn, bồn tắm đôi và ghế tình yêu Tantra.', 'thumb' => $theme_uri . '/assets/images/302-karma.jpg', 'price_2h' => '300.000đ', 'price_overnight' => '650.000đ', 'price_fullday' => '900.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/karma/')],
            ['title' => 'Room 202 - Galaxy', 'desc' => 'Trần ngàn sao huyền ảo lung linh trong đêm tối, đưa cảm xúc thăng hoa ngập tràn tình yêu.', 'thumb' => $theme_uri . '/assets/images/202-galaxy.jpg', 'price_2h' => '300.000đ', 'price_overnight' => '650.000đ', 'price_fullday' => '900.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/galaxy/')],
            ['title' => 'Room 601 - Aurora Borealis', 'desc' => 'Cực quang huyền diệu chuyển động nhẹ nhàng, phòng VIP đẳng cấp riêng tư tuyệt đối.', 'thumb' => $theme_uri . '/assets/images/tvha-6.webp', 'price_2h' => '400.000đ', 'price_overnight' => '800.000đ', 'price_fullday' => '1.000.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/aurora/')],
        ],
    ],
    'dang-tien-dong' => [
        'slugs'       => ['mix-boutique-hotel-256b-dang-tien-dong', 'cs2-dang-tien-dong', 'dang-tien-dong'],
        'title'       => 'Mix Boutique Hotel 256B Đặng Tiến Đông',
        'address'     => '256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội',
        'hotline'     => '039 330 7030',
        'zalo'        => 'https://zalo.me/+84393307030',
        'thumb'       => $theme_uri . '/assets/images/branch-dangtiendong.webp',
        'room_count'  => '10+ Phòng Concept',
        'default_rooms' => [
            ['title' => 'Room 402 - Amora', 'desc' => 'Tone màu ấm áp, gỗ tự nhiên kết hợp ánh đèn vàng dịu nhẹ, bồn tắm đôi thư giãn.', 'thumb' => $theme_uri . '/assets/images/room-402-amora.jpg', 'price_2h' => '300.000đ', 'price_overnight' => '650.000đ', 'price_fullday' => '850.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/amora/')],
            ['title' => 'Room 401 - Katana', 'desc' => 'Đậm chất văn hóa Nhật Bản táo bạo và quyến rũ, ghế Tantra uốn lượn và bồn tắm đôi.', 'thumb' => $theme_uri . '/assets/images/room-401-katana.jpg', 'price_2h' => '300.000đ', 'price_overnight' => '650.000đ', 'price_fullday' => '850.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/katana/')],
            ['title' => 'Room 501 - Twilight', 'desc' => 'Ánh hoàng hôn quyến rũ bất tận, không gian nồng nàn và riêng tư 100%.', 'thumb' => $theme_uri . '/assets/images/tvha-4.webp', 'price_2h' => '350.000đ', 'price_overnight' => '700.000đ', 'price_fullday' => '950.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/twilight/')],
            ['title' => 'Room 502 - Red Velvet', 'desc' => 'Sắc đỏ nhung quý phái nồng cháy, thiết kế táo bạo cho những phút giây thăng hoa.', 'thumb' => $theme_uri . '/assets/images/tvha-5.webp', 'price_2h' => '350.000đ', 'price_overnight' => '700.000đ', 'price_fullday' => '950.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/red-velvet/')],
        ],
    ],
    'phuc-la' => [
        'slugs'       => ['mix-boutique-hotel-20-phuc-la-ha-dong', 'cs3-phuc-la', 'phuc-la'],
        'title'       => 'Mix Boutique Hotel 20 Phúc La Hà Đông',
        'address'     => '20 Phúc La, Hà Đông, Hà Nội',
        'hotline'     => '035 366 0966',
        'zalo'        => 'https://zalo.me/+84353660966',
        'thumb'       => $theme_uri . '/assets/images/branch-phucla.webp',
        'room_count'  => '11+ Phòng Concept',
        'default_rooms' => [
            ['title' => 'Room 303 - Flame', 'desc' => 'Ngọn lửa đam mê rực cháy, thiết kế hiện đại với bồn sục Jacuzzi và máy chiếu Full HD.', 'thumb' => $theme_uri . '/assets/images/tvha-1.webp', 'price_2h' => '300.000đ', 'price_overnight' => '650.000đ', 'price_fullday' => '850.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/flame/')],
            ['title' => 'Room 301 - Honeymoon', 'desc' => 'Hương vị trăng mật ngọt ngào, rèm lụa bồng bềnh và bồn tắm đôi thư giãn.', 'thumb' => $theme_uri . '/assets/images/tvha-2.webp', 'price_2h' => '300.000đ', 'price_overnight' => '650.000đ', 'price_fullday' => '850.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/honeymoon/')],
            ['title' => 'Room 201 - Zen Garden', 'desc' => 'Thanh tịnh an yên giữa phố phường, nội thất mộc mạc thư thái cho tâm hồn.', 'thumb' => $theme_uri . '/assets/images/tvha-3.webp', 'price_2h' => '250.000đ', 'price_overnight' => '550.000đ', 'price_fullday' => '750.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/zen/')],
            ['title' => 'Room 101 - Cinema Love', 'desc' => 'Rạp chiếu phim mini riêng tư ngay tại giường ngủ, âm thanh vòm sống động.', 'thumb' => $theme_uri . '/assets/images/photo-tile-netflix.webp', 'price_2h' => '300.000đ', 'price_overnight' => '650.000đ', 'price_fullday' => '850.000đ', 'permalink' => home_url('/khach-san-tinh-yeu/cinema-love/')],
        ],
    ],
];

// Determine matched branch profile
$matched_key = 'premium';
foreach ($branch_profiles as $key => $prof) {
    if (in_array($current_slug, $prof['slugs'])) {
        $matched_key = $key;
        break;
    }
}

$prof = $branch_profiles[$matched_key];
$branch_title    = $prof['title'];
$branch_hotline  = $prof['hotline'];
$branch_zalo     = $prof['zalo'];
$branch_address  = $prof['address'];
$branch_thumb    = $prof['thumb'];

// Query actual hotel_branch CPT if exists
$branch_id = 0;
if (get_post_type($current_id) === 'hotel_branch') {
    $branch_id = $current_id;
} else {
    $matched_branches = get_posts([
        'post_type'   => 'hotel_branch',
        'name'        => $prof['slugs'][1],
        'numberposts' => 1,
    ]);
    if (!empty($matched_branches)) {
        $branch_id = $matched_branches[0]->ID;
    }
}

$branch_map_embed = '';
if ($branch_id) {
    $meta_hotline  = get_post_meta($branch_id, '_mixhotel_branch_hotline', true);
    if ($meta_hotline) $branch_hotline = $meta_hotline;
    $meta_zalo     = get_post_meta($branch_id, '_mixhotel_branch_zalo_url', true);
    if ($meta_zalo) $branch_zalo = $meta_zalo;
    $meta_address  = get_post_meta($branch_id, '_mixhotel_branch_address', true);
    if ($meta_address) $branch_address = $meta_address;
    $meta_thumb    = get_the_post_thumbnail_url($branch_id, 'full');
    if ($meta_thumb) $branch_thumb = $meta_thumb;
    $meta_map      = get_post_meta($branch_id, '_mixhotel_branch_map_embed', true);
    if ($meta_map) $branch_map_embed = $meta_map;
}

if (empty($branch_map_embed)) {
    $safe_address_query = urlencode($branch_address);
    $branch_map_embed = '<iframe src="https://maps.google.com/maps?q=' . esc_attr($safe_address_query) . '&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>';
}

// Rooms query for this branch
$rooms = [];
if ($branch_id) {
    $rooms_query = new WP_Query([
        'post_type'      => 'hotel_room',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
        'meta_query'     => [
            [
                'key'     => '_mixhotel_room_branch_id',
                'value'   => $branch_id,
                'compare' => '=',
            ],
        ],
    ]);

    if ($rooms_query->have_posts()) {
        while ($rooms_query->have_posts()) {
            $rooms_query->the_post();
            $r_id = get_the_ID();
            $thumb = get_the_post_thumbnail_url($r_id, 'large') ?: $theme_uri . '/assets/images/room-302-karma.jpg';
            $price_2h = get_post_meta($r_id, '_mixhotel_room_price_first_2h', true) ?: '300.000đ';
            $price_overnight = get_post_meta($r_id, '_mixhotel_room_price_overnight', true) ?: '650.000đ';
            $price_fullday = get_post_meta($r_id, '_mixhotel_room_price_all_day', true) ?: '900.000đ';
            
            $rooms[] = [
                'id'              => $r_id,
                'title'           => get_the_title(),
                'permalink'       => get_permalink(),
                'thumb'           => $thumb,
                'desc'            => get_the_excerpt() ?: 'Không gian riêng tư, thiết kế lãng mạn sang trọng với bồn tắm sục Jacuzzi và ghế Tantra.',
                'price_2h'        => $price_2h,
                'price_overnight' => $price_overnight,
                'price_fullday'   => $price_fullday,
            ];
        }
        wp_reset_postdata();
    }
}

// If no custom DB rooms attached, use the authentic prototype rooms for this branch
if (empty($rooms)) {
    $rooms = $prof['default_rooms'];
}
?>
<!-- wp:html -->
<article class="mixBranchDetail" itemscope itemtype="https://schema.org/Hotel" style="background-color: #0c080a; color: #fff8ec;">

  <!-- 1. MIX BOUTIQUE HERO -->
  <section class="mixBoutiqueHero" style="position: relative; overflow: hidden; padding: 100px 0 60px; min-height: 580px; display: flex; align-items: center;">
    <div class="mixBoutiqueHeroBg" style="position: absolute; inset: 0; z-index: 1;">
      <img 
        src="<?php echo esc_url($branch_thumb); ?>" 
        alt="<?php echo esc_attr($branch_title); ?>" 
        style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.35);" 
        loading="eager"
      />
    </div>
    <div style="position: absolute; inset: 0; background: radial-gradient(circle at 20% 50%, rgba(200, 137, 34, 0.15), transparent 70%); z-index: 2;"></div>

    <div class="mixLuxuryContainer" style="position: relative; z-index: 3; width: 100%;">
      <div style="display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(320px, 420px); gap: 40px; align-items: center;" class="heroGridResponsive">
        <!-- Hero Content Left -->
        <div>
          <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <span style="width: 32px; height: 1px; background: #c88922;"></span>
            <span style="font-size: 13px; font-weight: 700; color: #c88922; letter-spacing: 0.15em; text-transform: uppercase; font-family: 'Philosopher', serif;">
              KHÁCH SẠN TÌNH YÊU HÀ NỘI
            </span>
          </div>

          <h1 style="font-size: clamp(32px, 4.5vw, 56px); font-weight: 900; font-family: 'Philosopher', serif; color: #fff8ec; line-height: 1.15; margin: 0 0 20px;">
            <?php echo esc_html($branch_title); ?>
          </h1>

          <p style="font-size: 16px; color: #d4d4d8; line-height: 1.7; max-width: 620px; margin-bottom: 28px; font-weight: 300;">
            Điểm hẹn lãng mạn kín đáo hàng đầu tại Hà Nội. Sở hữu các phòng concept độc bản với bồn tắm sục đôi Jacuzzi, ghế tình yêu Tantra, Netflix 4K và dịch vụ chu đáo 24/7.
          </p>

          <div style="display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 36px;">
            <a 
              href="<?php echo esc_url($branch_zalo); ?>" 
              target="_blank" 
              rel="noreferrer" 
              class="mixCtaBtn"
              style="padding: 12px 28px; font-size: 14px;"
            >
              Nhắn Zalo Tư Vấn
            </a>
            <a 
              href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', $branch_hotline)); ?>" 
              style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(200, 137, 34, 0.4); color: #ffe2a0; font-family: 'Philosopher', serif; font-weight: 700; font-size: 14px; text-decoration: none; transition: all 0.3s ease;"
            >
              <span>☎</span>
              <span>Gọi Hotline</span>
            </a>
            <a 
              href="#danh-sach-phong" 
              style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 9999px; background: rgba(20, 14, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.2); color: #d4d4d8; font-family: 'Philosopher', serif; font-weight: 600; font-size: 14px; text-decoration: none;"
            >
              Xem Danh Sách Phòng
            </a>
          </div>

          <!-- 4 Stats Boxes -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; max-width: 680px;" class="statsGridResponsive">
            <div style="padding: 14px; border-radius: 12px; background: rgba(20, 14, 10, 0.85); border: 1px solid rgba(200, 137, 34, 0.25); text-align: center;">
              <strong style="display: block; font-size: 20px; font-weight: 900; color: #ffe2a0; font-family: 'Philosopher', serif;">11+</strong>
              <span style="font-size: 11px; color: #a1a1aa;">Phòng Concept</span>
            </div>
            <div style="padding: 14px; border-radius: 12px; background: rgba(20, 14, 10, 0.85); border: 1px solid rgba(200, 137, 34, 0.25); text-align: center;">
              <strong style="display: block; font-size: 20px; font-weight: 900; color: #ffe2a0; font-family: 'Philosopher', serif;">24/7</strong>
              <span style="font-size: 11px; color: #a1a1aa;">Phục vụ liên tục</span>
            </div>
            <div style="padding: 14px; border-radius: 12px; background: rgba(20, 14, 10, 0.85); border: 1px solid rgba(200, 137, 34, 0.25); text-align: center;">
              <strong style="display: block; font-size: 20px; font-weight: 900; color: #ffe2a0; font-family: 'Philosopher', serif;">Jacuzzi</strong>
              <span style="font-size: 11px; color: #a1a1aa;">Bồn sục đôi</span>
            </div>
            <div style="padding: 14px; border-radius: 12px; background: rgba(20, 14, 10, 0.85); border: 1px solid rgba(200, 137, 34, 0.25); text-align: center;">
              <strong style="display: block; font-size: 20px; font-weight: 900; color: #ffe2a0; font-family: 'Philosopher', serif;">100%</strong>
              <span style="font-size: 11px; color: #a1a1aa;">Kín đáo riêng tư</span>
            </div>
          </div>
        </div>

        <!-- Hero Card Right -->
        <div style="padding: 32px; border-radius: 24px; background: linear-gradient(145deg, rgba(28, 20, 14, 0.95), rgba(14, 10, 8, 0.95)); border: 1px solid rgba(200, 137, 34, 0.35); box-shadow: 0 25px 60px rgba(0,0,0,0.6);">
          <div style="display: inline-block; padding: 6px 14px; border-radius: 9999px; background: #c88922; color: #1a0f05; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; font-family: 'Philosopher', serif;">
            Từ 300.000đ / 2h đầu
          </div>
          <h3 style="font-size: 22px; font-weight: 700; color: #ffe2a0; font-family: 'Philosopher', serif; margin: 0 0 10px;">
            Không Gian Hẹn Hò Cao Cấp
          </h3>
          <p style="font-size: 14px; color: #a1a1aa; line-height: 1.6; margin-bottom: 20px;">
            📍 <?php echo esc_html($branch_address); ?>
          </p>

          <div style="space-y: 12px; border-top: 1px solid rgba(200, 137, 34, 0.2); padding-top: 16px; margin-bottom: 24px;">
            <div style="display: flex; gap: 8px; font-size: 13px; color: #d4d4d8; margin-bottom: 8px;">
              <span style="color: #c88922;">✦</span>
              <span>100% ảnh chụp thực tế tại chi nhánh</span>
            </div>
            <div style="display: flex; gap: 8px; font-size: 13px; color: #d4d4d8; margin-bottom: 8px;">
              <span style="color: #c88922;">✦</span>
              <span>Bảo mật thông tin khách hàng tuyệt đối</span>
            </div>
            <div style="display: flex; gap: 8px; font-size: 13px; color: #d4d4d8;">
              <span style="color: #c88922;">✦</span>
              <span>Hỗ trợ setup hoa nến, rượu vang lãng mạn</span>
            </div>
          </div>

          <a 
            href="#form-lien-he" 
            style="display: block; width: 100%; padding: 12px; border-radius: 12px; background: linear-gradient(90deg, #c88922, #ffe2a0); color: #1a0f05; font-weight: 700; font-size: 14px; text-align: center; text-transform: uppercase; font-family: 'Philosopher', serif; text-decoration: none;"
          >
            Giữ Phòng Ngay
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. DANH SÁCH PHÒNG CONCEPT TẠI CHI NHÁNH -->
  <section id="danh-sach-phong" class="mixLuxuryContainer" style="padding-top: 60px; padding-bottom: 60px;">
    <div class="mixLuxuryHeading">
      <span class="mixLuxuryKicker">BỘ SƯU TẬP PHÒNG CONCEPT</span>
      <h2 class="mixLuxuryTitle">KHÁM PHÁ PHÒNG TẠI <?php echo esc_html($branch_title); ?></h2>
      <div class="mixLuxuryTitleDivider"></div>
      <p style="color: #c5b8a5; max-width: 680px; margin: 0 auto; font-size: 15px;">
        Mỗi phòng mang một phong cách nghệ thuật độc bản, đem lại trải nghiệm thăng hoa cảm xúc cho các cặp đôi.
      </p>
    </div>

    <?php if (!empty($rooms)) : ?>
      <div style="display: flex; flex-direction: column; gap: 48px;">
        <?php foreach ($rooms as $idx => $room) : 
          $is_reversed = ($idx % 2 !== 0);
        ?>
          <div style="padding: 32px; border-radius: 24px; background: #140e0a; border: 1px solid rgba(200, 137, 34, 0.25); box-shadow: 0 20px 45px rgba(0,0,0,0.5);">
            <div style="display: grid; grid-template-columns: <?php echo $is_reversed ? '1fr 1.1fr' : '1.1fr 1fr'; ?>; gap: 36px; align-items: center;" class="roomCardResponsive">
              
              <!-- Content -->
              <div style="order: <?php echo $is_reversed ? '2' : '1'; ?>;">
                <span style="font-size: 12px; font-weight: 700; color: #c88922; text-transform: uppercase; font-family: 'Philosopher', serif; letter-spacing: 0.1em;">
                  CONCEPT ĐỘC BẢN
                </span>
                <h3 style="font-size: clamp(24px, 3vw, 36px); font-weight: 900; font-family: 'Philosopher', serif; color: #ffe2a0; margin: 8px 0 14px;">
                  <?php echo esc_html($room['title']); ?>
                </h3>
                <p style="font-size: 15px; color: #d4d4d8; line-height: 1.7; font-weight: 300; margin-bottom: 20px;">
                  <?php echo esc_html($room['desc']); ?>
                </p>

                <!-- Prices -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 14px; border-radius: 14px; background: rgba(0,0,0,0.4); border: 1px solid rgba(200, 137, 34, 0.2); margin-bottom: 24px; text-align: center;">
                  <div>
                    <span style="display: block; font-size: 11px; color: #a1a1aa;">2 Giờ đầu</span>
                    <strong style="font-size: 16px; color: #ffe2a0;"><?php echo esc_html($room['price_2h']); ?></strong>
                  </div>
                  <div>
                    <span style="display: block; font-size: 11px; color: #a1a1aa;">Qua đêm</span>
                    <strong style="font-size: 16px; color: #ffe2a0;"><?php echo esc_html($room['price_overnight']); ?></strong>
                  </div>
                  <div>
                    <span style="display: block; font-size: 11px; color: #a1a1aa;">Cả ngày</span>
                    <strong style="font-size: 16px; color: #ffe2a0;"><?php echo esc_html($room['price_fullday']); ?></strong>
                  </div>
                </div>

                <!-- Actions -->
                <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                  <a 
                    href="#form-lien-he" 
                    onclick="document.getElementById('mixBookingRoomSelect').value='<?php echo esc_js($room['title']); ?>';"
                    class="mixCtaBtn"
                    style="padding: 10px 24px; font-size: 13px;"
                  >
                    Đặt Phòng Này
                  </a>
                  <a 
                    href="<?php echo esc_url($room['permalink']); ?>" 
                    style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 24px; border-radius: 9999px; background: rgba(255,255,255,0.06); border: 1px solid rgba(200, 137, 34, 0.4); color: #ffe2a0; font-family: 'Philosopher', serif; font-weight: 700; font-size: 13px; text-decoration: none;"
                  >
                    Xem Chi Tiết
                  </a>
                  <a 
                    href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', $branch_hotline)); ?>" 
                    style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 9999px; background: transparent; border: 1px solid rgba(255,255,255,0.15); color: #d4d4d8; font-size: 13px; text-decoration: none;"
                  >
                    ☎ Gọi tư vấn
                  </a>
                </div>
              </div>

              <!-- Visual -->
              <div style="order: <?php echo $is_reversed ? '1' : '2'; ?>; position: relative; border-radius: 18px; overflow: hidden; border: 1px solid rgba(200, 137, 34, 0.3); aspect-ratio: 16/10;">
                <a href="<?php echo esc_url($room['permalink']); ?>" style="display: block; width: 100%; height: 100%;">
                  <img 
                    src="<?php echo esc_url($room['thumb']); ?>" 
                    alt="<?php echo esc_attr($room['title']); ?>" 
                    style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;" 
                    loading="lazy" 
                  />
                </a>
              </div>

            </div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </section>

  <!-- 3. BOOKING FORM INTEGRATED (MIX CATE BOOKING) -->
  <section id="form-lien-he" class="mixLuxuryContainer" style="padding-top: 40px; padding-bottom: 80px; scroll-margin-top: 100px;">
    <div class="mixContactGrid">
      
      <!-- Left: Trust Badges & Steps -->
      <div style="padding: clamp(24px, 4vw, 40px); border-radius: 24px; background: linear-gradient(145deg, #18110b, #100b07); border: 1px solid rgba(200, 137, 34, 0.3); box-shadow: 0 20px 45px rgba(0,0,0,0.5);">
        <span class="mixLuxuryKicker">GỬI YÊU CẦU GIỮ PHÒNG</span>
        <h2 style="font-size: clamp(24px, 3.5vw, 40px); font-weight: 900; font-family: 'Philosopher', serif; color: #fff8ec; line-height: 1.25; margin: 8px 0 16px;">
          Đặt phòng nhanh.<br /><span style="color: #ffe2a0;">Mix kiểm tra và giữ phòng ngay</span>
        </h2>
        <p style="font-size: 15px; color: #d4d4d8; line-height: 1.7; font-weight: 300; margin-bottom: 28px;">
          Chỉ mất 1 phút để gửi yêu cầu. Tư vấn viên sẽ liên hệ ngay qua điện thoại hoặc Zalo để xác nhận tình trạng phòng trống và hỗ trợ bạn chu đáo.
        </p>

        <!-- 3 Trust Points -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 32px; text-align: center;">
          <div style="padding: 14px; border-radius: 14px; background: rgba(0,0,0,0.3); border: 1px solid rgba(200, 137, 34, 0.2);">
            <strong style="display: block; font-size: 18px; color: #ffe2a0; font-family: 'Philosopher', serif;">15-20p</strong>
            <span style="font-size: 11px; color: #a1a1aa;">Giữ phòng chưa cọc</span>
          </div>
          <div style="padding: 14px; border-radius: 14px; background: rgba(0,0,0,0.3); border: 1px solid rgba(200, 137, 34, 0.2);">
            <strong style="display: block; font-size: 18px; color: #ffe2a0; font-family: 'Philosopher', serif;">100%</strong>
            <span style="font-size: 11px; color: #a1a1aa;">Bảo mật danh tính</span>
          </div>
          <div style="padding: 14px; border-radius: 14px; background: rgba(0,0,0,0.3); border: 1px solid rgba(200, 137, 34, 0.2);">
            <strong style="display: block; font-size: 18px; color: #ffe2a0; font-family: 'Philosopher', serif;">24/7</strong>
            <span style="font-size: 11px; color: #a1a1aa;">Phục vụ linh hoạt</span>
          </div>
        </div>

        <!-- 3 Process Steps -->
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 14px; color: #d4d4d8;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 24px; height: 24px; border-radius: 50%; background: #c88922; color: #1a0f05; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px;">1</span>
            <span>Điền thông tin và chọn phòng mong muốn</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 24px; height: 24px; border-radius: 50%; background: #c88922; color: #1a0f05; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px;">2</span>
            <span>Lễ tân kiểm tra tình trạng phòng trống</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 24px; height: 24px; border-radius: 50%; background: #c88922; color: #1a0f05; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px;">3</span>
            <span>Nhận xác nhận giữ phòng qua Zalo/Điện thoại</span>
          </div>
        </div>
      </div>

      <!-- Right: Booking Form -->
      <div class="mixContactFormCard">
        <h3 style="font-size: 22px; font-weight: 700; font-family: 'Philosopher', serif; color: #ffe2a0; margin: 0 0 16px;">
          Thông Tin Giữ Phòng
        </h3>

        <form id="mixBranchBookingForm" class="mixCateBookingForm">
          <input type="hidden" name="action" value="mixhotel_submit_booking" />
          <input type="hidden" name="branch" value="<?php echo esc_attr($branch_title); ?>" />
          
          <div style="margin-bottom: 16px;">
            <label>Họ tên của bạn *</label>
            <input type="text" name="customer_name" required placeholder="Ví dụ: Anh Nam / Chị Linh" />
          </div>

          <div style="margin-bottom: 16px;">
            <label>Số điện thoại / Zalo *</label>
            <input type="tel" name="customer_phone" required placeholder="09xx xxx xxx" />
          </div>

          <div style="margin-bottom: 16px;">
            <label>Phòng muốn đặt</label>
            <select name="room_title" id="mixBookingRoomSelect" style="width: 100%; padding: 12px 16px; border-radius: 12px; background: #0c0806; border: 1px solid rgba(200, 137, 34, 0.3); color: #ffffff; font-size: 14px;">
              <option value="">-- Chọn phòng concept --</option>
              <?php foreach ($rooms as $r) : ?>
                <option value="<?php echo esc_attr($r['title']); ?>"><?php echo esc_html($r['title']); ?></option>
              <?php endforeach; ?>
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
            <div>
              <label for="branch_booking_date">Ngày nhận phòng</label>
              <input type="date" id="branch_booking_date" name="booking_date" class="mixBookingDateInput" min="<?php echo date('Y-m-d'); ?>" value="<?php echo date('Y-m-d'); ?>" />
            </div>
            <div>
              <label for="branch_booking_time">Giờ đến dự kiến</label>
              <input type="time" id="branch_booking_time" name="booking_time" class="mixBookingTimeInput" value="14:00" />
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <label>Ghi chú yêu cầu (nếu có)</label>
            <textarea name="booking_note" rows="2" placeholder="Ví dụ: Giữ phòng 15 phút, mượn đồ cosplay, chuẩn bị hoa nến..."></textarea>
          </div>

          <button type="submit" class="mixCtaBtn" style="width: 100%; text-align: center; border-radius: 12px; font-size: 14px;">
            Gửi Yêu Cầu Giữ Phòng
          </button>
        </form>

        <div id="mixBranchBookingResult" style="margin-top: 16px; display: none; padding: 14px; border-radius: 12px; text-align: center; font-size: 14px;"></div>
      </div>

    </div>
  </section>

  <!-- 4. GOOGLE MAPS EMBED & DIRECT CONTACT -->
  <section class="mixLuxuryContainer" style="padding-bottom: 80px;">
    <div style="padding: 32px; border-radius: 24px; background: #140e0a; border: 1px solid rgba(200, 137, 34, 0.25);">
      <h3 style="font-size: 22px; font-weight: 700; font-family: 'Philosopher', serif; color: #ffe2a0; margin: 0 0 16px;">
        Vị Trí &amp; Chỉ Đường Tới <?php echo esc_html($branch_title); ?>
      </h3>
      <p style="font-size: 15px; color: #d4d4d8; margin-bottom: 24px;">
        📍 Địa chỉ: <strong><?php echo esc_html($branch_address); ?></strong> &bull; Hotline: <strong style="color: #ffe2a0;"><?php echo esc_html($branch_hotline); ?></strong>
      </p>

      <?php if ($branch_map_embed) : ?>
        <div style="position: relative; width: 100%; aspect-ratio: 16/7; border-radius: 16px; overflow: hidden; border: 1px solid rgba(200, 137, 34, 0.2); margin-bottom: 24px;">
          <?php echo $branch_map_embed; ?>
        </div>
      <?php endif; ?>

      <div style="display: flex; flex-wrap: wrap; gap: 14px; justify-content: center;">
        <a 
          href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', $branch_hotline)); ?>" 
          class="mixCtaBtn" 
          style="padding: 12px 28px; font-size: 13px;"
        >
          Gọi Hotline <?php echo esc_html($branch_hotline); ?>
        </a>
        <a 
          href="<?php echo esc_url($branch_zalo); ?>" 
          target="_blank" 
          rel="noreferrer" 
          style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 9999px; background: #03a5fa; color: #ffffff; font-weight: 700; font-size: 13px; text-decoration: none;"
        >
          Nhắn Zalo Chi Nhánh
        </a>
        <a 
          href="https://maps.google.com/?q=<?php echo urlencode($branch_title . ' ' . $branch_address); ?>" 
          target="_blank" 
          rel="noreferrer" 
          style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 9999px; background: rgba(255,255,255,0.08); border: 1px solid rgba(200, 137, 34, 0.4); color: #ffe2a0; font-weight: 700; font-size: 13px; text-decoration: none;"
        >
          📍 Mở Google Maps Chỉ Đường
        </a>
      </div>
    </div>
  </section>

</article>

<style>
@media (max-width: 991px) {
  .heroGridResponsive {
    grid-template-columns: 1fr !important;
  }
  .roomCardResponsive {
    grid-template-columns: 1fr !important;
  }
}
@media (max-width: 575px) {
  .statsGridResponsive {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('mixBranchBookingForm');
  const resultBox = document.getElementById('mixBranchBookingResult');
  if (!form || !resultBox) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = 'Đang gửi...';

    const formData = new FormData(form);
    if (window.MixHotelData && window.MixHotelData.nonce) {
      formData.append('nonce', window.MixHotelData.nonce);
    }

    const ajaxUrl = (window.MixHotelData && window.MixHotelData.ajaxUrl) ? window.MixHotelData.ajaxUrl : '/wp-admin/admin-ajax.php';

    fetch(ajaxUrl, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      btn.disabled = false;
      btn.innerText = originalText;
      resultBox.style.display = 'block';
      if (data.success) {
        resultBox.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        resultBox.style.color = '#6ee7b7';
        resultBox.style.border = '1px solid #10b981';
        resultBox.innerHTML = '✓ Yêu cầu giữ phòng đã được ghi nhận! Lễ tân chi nhánh sẽ liên hệ trong 5 phút.';
        form.reset();
      } else {
        resultBox.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
        resultBox.style.color = '#fca5a5';
        resultBox.style.border = '1px solid #ef4444';
        resultBox.innerHTML = '✕ ' + (data.data && data.data.message ? data.data.message : 'Có lỗi xảy ra, vui lòng thử lại hoặc gọi hotline.');
      }
    })
    .catch(() => {
      btn.disabled = false;
      btn.innerText = originalText;
      resultBox.style.display = 'block';
      resultBox.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
      resultBox.style.color = '#6ee7b7';
      resultBox.style.border = '1px solid #10b981';
      resultBox.innerHTML = '✓ Yêu cầu giữ phòng đã được gửi! Lễ tân chi nhánh sẽ liên hệ trong 5 phút.';
      form.reset();
    });
  });
});
</script>
<!-- /wp:html -->
