<?php
/**
 * Title: Chi Nhánh - Trang Chi Tiết Dark Luxury
 * Slug: mixhotel/branch-detail
 * Categories: mixhotel
 * Keywords: branch, chi nhanh, hotel, mixBoutiqueHero
 * Block Types: core/group
 * Post Types: hotel_branch, page
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
        'name'        => $prof['slugs'][0],
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
            $main_img = MixHotel_Helpers::get_room_main_image($r_id, 'large');
            $thumb    = ! empty($main_img['url']) ? $main_img['url'] : ($theme_uri . '/assets/images/room-302-karma.jpg');
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
<!-- wp:group {"tagName":"article","className":"mixBranchDetail","style":{"color":{"background":"#0c080a","text":"#fff8ec"}}} -->
<article class="wp-block-group mixBranchDetail has-text-color has-background" style="background-color:#0c080a;color:#fff8ec">

  <!-- 1. MIX BOUTIQUE HERO -->
  <!-- wp:group {"tagName":"section","className":"mixBoutiqueHero"} -->
  <section class="wp-block-group mixBoutiqueHero" style="position:relative;overflow:hidden;padding:100px 0 60px;min-height:580px;display:flex;align-items:center">
    <div class="mixBoutiqueHeroBg" style="position:absolute;inset:0;z-index:1">
      <img src="<?php echo esc_url($branch_thumb); ?>" alt="<?php echo esc_attr($branch_title); ?>" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.35)" loading="eager" />
    </div>
    <div style="position:absolute;inset:0;background:radial-gradient(circle at 20% 50%, rgba(200, 137, 34, 0.15), transparent 70%);z-index:2"></div>

    <!-- wp:group {"className":"mixLuxuryContainer"} -->
    <div class="wp-block-group mixLuxuryContainer" style="position:relative;z-index:3;width:100%">
      <div class="heroGridResponsive">
        <!-- Hero Content Left -->
        <!-- wp:group -->
        <div class="wp-block-group">
          <!-- wp:paragraph {"className":"mixLuxuryKicker"} -->
          <p class="mixLuxuryKicker">KHÁCH SẠN TÌNH YÊU HÀ NỘI</p>
          <!-- /wp:paragraph -->

          <!-- wp:heading {"level":1,"style":{"typography":{"fontSize":"clamp(32px, 4.5vw, 56px)","lineHeight":"1.15"}}} -->
          <h1 class="wp-block-heading" style="font-size:clamp(32px, 4.5vw, 56px);font-weight:900;font-family:'Philosopher',serif;color:#fff8ec;line-height:1.15;margin:0 0 20px"><?php echo esc_html($branch_title); ?></h1>
          <!-- /wp:heading -->

          <!-- wp:paragraph {"style":{"typography":{"fontSize":"16px","lineHeight":"1.7"}}} -->
          <p style="font-size:16px;color:#d4d4d8;line-height:1.7;max-width:620px;margin-bottom:28px;font-weight:300">Điểm hẹn lãng mạn kín đáo hàng đầu tại Hà Nội. Sở hữu các phòng concept độc bản với bồn tắm sục đôi Jacuzzi, ghế tình yêu Tantra, Netflix 4K và dịch vụ chu đáo 24/7.</p>
          <!-- /wp:paragraph -->

          <!-- wp:buttons {"className":"mixHeroActions","layout":{"type":"flex","flexWrap":"wrap"}} -->
          <div class="wp-block-buttons mixHeroActions">
            <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary"} -->
            <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnPrimary"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url($branch_zalo); ?>" target="_blank" rel="noreferrer">Nhắn Zalo Tư Vấn</a></div>
            <!-- /wp:button -->
            <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
            <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', $branch_hotline)); ?>">☎ Gọi Hotline</a></div>
            <!-- /wp:button -->
            <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
            <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="#danh-sach-phong">Xem Danh Sách Phòng</a></div>
            <!-- /wp:button -->
          </div>
          <!-- /wp:buttons -->

          <!-- 4 Stats Boxes -->
          <!-- wp:group {"className":"statsGridResponsive","style":{"spacing":{"margin":{"top":"28px"}}}} -->
          <div class="wp-block-group statsGridResponsive" style="margin-top:28px">
            <div style="padding:14px;border-radius:12px;background:rgba(20, 14, 10, 0.85);border:1px solid rgba(200, 137, 34, 0.25);text-align:center">
              <strong style="display:block;font-size:20px;font-weight:900;color:#ffe2a0;font-family:'Philosopher',serif">11+</strong>
              <span style="font-size:11px;color:#a1a1aa">Phòng Concept</span>
            </div>
            <div style="padding:14px;border-radius:12px;background:rgba(20, 14, 10, 0.85);border:1px solid rgba(200, 137, 34, 0.25);text-align:center">
              <strong style="display:block;font-size:20px;font-weight:900;color:#ffe2a0;font-family:'Philosopher',serif">24/7</strong>
              <span style="font-size:11px;color:#a1a1aa">Phục vụ liên tục</span>
            </div>
            <div style="padding:14px;border-radius:12px;background:rgba(20, 14, 10, 0.85);border:1px solid rgba(200, 137, 34, 0.25);text-align:center">
              <strong style="display:block;font-size:20px;font-weight:900;color:#ffe2a0;font-family:'Philosopher',serif">Jacuzzi</strong>
              <span style="font-size:11px;color:#a1a1aa">Bồn sục đôi</span>
            </div>
            <div style="padding:14px;border-radius:12px;background:rgba(20, 14, 10, 0.85);border:1px solid rgba(200, 137, 34, 0.25);text-align:center">
              <strong style="display:block;font-size:20px;font-weight:900;color:#ffe2a0;font-family:'Philosopher',serif">100%</strong>
              <span style="font-size:11px;color:#a1a1aa">Kín đáo riêng tư</span>
            </div>
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:group -->

        <!-- Hero Card Right -->
        <!-- wp:group {"className":"mixHeroRightCard"} -->
        <div class="wp-block-group mixHeroRightCard" style="padding:32px;border-radius:24px;background:linear-gradient(145deg, rgba(28, 20, 14, 0.95), rgba(14, 10, 8, 0.95));border:1px solid rgba(200, 137, 34, 0.35);box-shadow:0 25px 60px rgba(0,0,0,0.6)">
          <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px","fontWeight":"700"}}} -->
          <p style="display:inline-block;padding:6px 14px;border-radius:9999px;background:#c88922;color:#1a0f05;font-size:12px;font-weight:700;text-transform:uppercase;margin-bottom:16px;font-family:'Philosopher',serif">Từ 300.000đ / 2h đầu</p>
          <!-- /wp:paragraph -->
          <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"22px"}}} -->
          <h3 class="wp-block-heading" style="font-size:22px;font-weight:700;color:#ffe2a0;font-family:'Philosopher',serif;margin:0 0 10px">Không Gian Hẹn Hò Cao Cấp</h3>
          <!-- /wp:heading -->
          <!-- wp:paragraph {"style":{"typography":{"fontSize":"14px"}}} -->
          <p style="font-size:14px;color:#a1a1aa;line-height:1.6;margin-bottom:20px">📍 <?php echo esc_html($branch_address); ?></p>
          <!-- /wp:paragraph -->

          <div style="border-top:1px solid rgba(200, 137, 34, 0.2);padding-top:16px;margin-bottom:24px">
            <div style="display:flex;gap:8px;font-size:13px;color:#d4d4d8;margin-bottom:8px">
              <span style="color:#c88922">✦</span>
              <span>100% ảnh chụp thực tế tại chi nhánh</span>
            </div>
            <div style="display:flex;gap:8px;font-size:13px;color:#d4d4d8;margin-bottom:8px">
              <span style="color:#c88922">✦</span>
              <span>Bảo mật thông tin khách hàng tuyệt đối</span>
            </div>
            <div style="display:flex;gap:8px;font-size:13px;color:#d4d4d8">
              <span style="color:#c88922">✦</span>
              <span>Hỗ trợ setup hoa nến, rượu vang lãng mạn</span>
            </div>
          </div>

          <!-- wp:buttons -->
          <div class="wp-block-buttons">
            <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary","style":{"spacing":{"padding":{"top":"12px","bottom":"12px"}}}} -->
            <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnPrimary" style="width:100%"><a class="wp-block-button__link wp-element-button" href="#form-lien-he" style="width:100%;text-align:center">Giữ Phòng Ngay</a></div>
            <!-- /wp:button -->
          </div>
          <!-- /wp:buttons -->
        </div>
        <!-- /wp:group -->
      </div>
    </div>
    <!-- /wp:group -->
  </section>
  <!-- /wp:group -->

  <!-- 2. DANH SÁCH PHÒNG CONCEPT TẠI CHI NHÁNH -->
  <!-- wp:group {"tagName":"section","className":"mixLuxuryContainer","anchor":"danh-sach-phong","style":{"spacing":{"padding":{"top":"60px","bottom":"60px"}}}} -->
  <section id="danh-sach-phong" class="wp-block-group mixLuxuryContainer" style="padding-top:60px;padding-bottom:60px">
    <!-- wp:group {"className":"mixLuxuryHeading"} -->
    <div class="wp-block-group mixLuxuryHeading">
      <!-- wp:paragraph {"className":"mixLuxuryKicker"} -->
      <p class="mixLuxuryKicker">BỘ SƯU TẬP PHÒNG CONCEPT</p>
      <!-- /wp:paragraph -->
      <!-- wp:heading {"level":2,"className":"mixLuxuryTitle"} -->
      <h2 class="wp-block-heading mixLuxuryTitle">KHÁM PHÁ PHÒNG TẠI <?php echo esc_html($branch_title); ?></h2>
      <!-- /wp:heading -->
      <div class="mixLuxuryTitleDivider"></div>
      <!-- wp:paragraph {"style":{"typography":{"fontSize":"15px"}}} -->
      <p style="color:#c5b8a5;max-width:680px;margin:0 auto;font-size:15px">Mỗi phòng mang một phong cách nghệ thuật độc bản, đem lại trải nghiệm thăng hoa cảm xúc cho các cặp đôi.</p>
      <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->

    <?php if (!empty($rooms)) : ?>
      <!-- wp:group {"style":{"spacing":{"blockGap":"48px"}}} -->
      <div class="wp-block-group" style="display:flex;flex-direction:column;gap:48px">
        <?php foreach ($rooms as $idx => $room) : 
          $is_reversed = ($idx % 2 !== 0);
        ?>
          <!-- wp:group {"className":"mixLuxuryBranchRoomCard"} -->
          <div class="wp-block-group mixLuxuryBranchRoomCard" style="padding:32px;border-radius:24px;background:#140e0a;border:1px solid rgba(200, 137, 34, 0.25);box-shadow:0 20px 45px rgba(0,0,0,0.5)">
            <div class="roomCardResponsive" style="display:grid;grid-template-columns:<?php echo $is_reversed ? '1fr 1.1fr' : '1.1fr 1fr'; ?>;gap:36px;align-items:center">
              
              <!-- Content -->
              <div style="order:<?php echo $is_reversed ? '2' : '1'; ?>">
                <!-- wp:paragraph {"className":"mixLuxuryKicker"} -->
                <p class="mixLuxuryKicker">CONCEPT ĐỘC BẢN</p>
                <!-- /wp:paragraph -->
                <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"clamp(24px, 3vw, 36px)"}}} -->
                <h3 class="wp-block-heading" style="font-size:clamp(24px, 3vw, 36px);font-weight:900;font-family:'Philosopher',serif;color:#ffe2a0;margin:8px 0 14px"><?php echo esc_html($room['title']); ?></h3>
                <!-- /wp:heading -->
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"15px","lineHeight":"1.7"}}} -->
                <p style="font-size:15px;color:#d4d4d8;line-height:1.7;font-weight:300;margin-bottom:20px"><?php echo esc_html($room['desc']); ?></p>
                <!-- /wp:paragraph -->

                <!-- Prices -->
                <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;padding:14px;border-radius:14px;background:rgba(0,0,0,0.4);border:1px solid rgba(200, 137, 34, 0.2);margin-bottom:24px;text-align:center">
                  <div>
                    <span style="display:block;font-size:11px;color:#a1a1aa">2 Giờ đầu</span>
                    <strong style="font-size:16px;color:#ffe2a0"><?php echo esc_html($room['price_2h']); ?></strong>
                  </div>
                  <div>
                    <span style="display:block;font-size:11px;color:#a1a1aa">Qua đêm</span>
                    <strong style="font-size:16px;color:#ffe2a0"><?php echo esc_html($room['price_overnight']); ?></strong>
                  </div>
                  <div>
                    <span style="display:block;font-size:11px;color:#a1a1aa">Cả ngày</span>
                    <strong style="font-size:16px;color:#ffe2a0"><?php echo esc_html($room['price_fullday']); ?></strong>
                  </div>
                </div>

                <!-- Actions -->
                <!-- wp:buttons {"layout":{"type":"flex","flexWrap":"wrap"}} -->
                <div class="wp-block-buttons" style="display:flex;flex-wrap:wrap;gap:12px">
                  <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary"} -->
                  <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnPrimary"><a class="wp-block-button__link wp-element-button" href="#form-lien-he" onclick="var sel=document.getElementById('mixBookingRoomSelect');if(sel)sel.value='<?php echo esc_js($room['title']); ?>';">Đặt Phòng Này</a></div>
                  <!-- /wp:button -->
                  <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
                  <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url($room['permalink']); ?>">Xem Chi Tiết</a></div>
                  <!-- /wp:button -->
                  <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
                  <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', $branch_hotline)); ?>">☎ Gọi tư vấn</a></div>
                  <!-- /wp:button -->
                </div>
                <!-- /wp:buttons -->
              </div>

              <!-- Visual -->
              <div style="order:<?php echo $is_reversed ? '1' : '2'; ?>;position:relative;border-radius:18px;overflow:hidden;border:1px solid rgba(200, 137, 34, 0.3);aspect-ratio:16/10">
                <a href="<?php echo esc_url($room['permalink']); ?>" style="display:block;width:100%;height:100%">
                  <img src="<?php echo esc_url($room['thumb']); ?>" alt="<?php echo esc_attr($room['title']); ?>" style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease" loading="lazy" />
                </a>
              </div>

            </div>
          </div>
          <!-- /wp:group -->
        <?php endforeach; ?>
      </div>
      <!-- /wp:group -->
    <?php endif; ?>
  </section>
  <!-- /wp:group -->

  <!-- 3. BOOKING FORM INTEGRATED -->
  <!-- wp:group {"tagName":"section","className":"mixLuxuryContainer","anchor":"form-lien-he","style":{"spacing":{"padding":{"top":"40px","bottom":"80px"}}}} -->
  <section id="form-lien-he" class="wp-block-group mixLuxuryContainer" style="padding-top:40px;padding-bottom:80px;scroll-margin-top:100px">
    <div class="mixContactGrid">
      
      <!-- Left: Trust Badges & Steps -->
      <!-- wp:group {"className":"mixBookingTrustCard"} -->
      <div class="wp-block-group mixBookingTrustCard" style="padding:clamp(24px, 4vw, 40px);border-radius:24px;background:linear-gradient(145deg, #18110b, #100b07);border:1px solid rgba(200, 137, 34, 0.3);box-shadow:0 20px 45px rgba(0,0,0,0.5)">
        <!-- wp:paragraph {"className":"mixLuxuryKicker"} -->
        <p class="mixLuxuryKicker">GỬI YÊU CẦU GIỮ PHÒNG</p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"clamp(24px, 3.5vw, 40px)","lineHeight":"1.25"}}} -->
        <h2 class="wp-block-heading" style="font-size:clamp(24px, 3.5vw, 40px);font-weight:900;font-family:'Philosopher',serif;color:#fff8ec;line-height:1.25;margin:8px 0 16px">Đặt phòng nhanh.<br /><span style="color:#ffe2a0">Mix kiểm tra và giữ phòng ngay</span></h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"style":{"typography":{"fontSize":"15px","lineHeight":"1.7"}}} -->
        <p style="font-size:15px;color:#d4d4d8;line-height:1.7;font-weight:300;margin-bottom:28px">Chỉ mất 1 phút để gửi yêu cầu. Tư vấn viên sẽ liên hệ ngay qua điện thoại hoặc Zalo để xác nhận tình trạng phòng trống và hỗ trợ bạn chu đáo.</p>
        <!-- /wp:paragraph -->

        <!-- 3 Trust Points -->
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:14px;margin-bottom:32px;text-align:center">
          <div style="padding:14px;border-radius:14px;background:rgba(0,0,0,0.3);border:1px solid rgba(200, 137, 34, 0.2)">
            <strong style="display:block;font-size:18px;color:#ffe2a0;font-family:'Philosopher',serif">15-20p</strong>
            <span style="font-size:11px;color:#a1a1aa">Giữ phòng chưa cọc</span>
          </div>
          <div style="padding:14px;border-radius:14px;background:rgba(0,0,0,0.3);border:1px solid rgba(200, 137, 34, 0.2)">
            <strong style="display:block;font-size:18px;color:#ffe2a0;font-family:'Philosopher',serif">100%</strong>
            <span style="font-size:11px;color:#a1a1aa">Bảo mật danh tính</span>
          </div>
          <div style="padding:14px;border-radius:14px;background:rgba(0,0,0,0.3);border:1px solid rgba(200, 137, 34, 0.2)">
            <strong style="display:block;font-size:18px;color:#ffe2a0;font-family:'Philosopher',serif">24/7</strong>
            <span style="font-size:11px;color:#a1a1aa">Phục vụ linh hoạt</span>
          </div>
        </div>

        <!-- 3 Process Steps -->
        <div style="display:flex;flex-direction:column;gap:12px;font-size:14px;color:#d4d4d8">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="width:24px;height:24px;border-radius:50%;background:#c88922;color:#1a0f05;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:12px">1</span>
            <span>Điền thông tin và chọn phòng mong muốn</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <span style="width:24px;height:24px;border-radius:50%;background:#c88922;color:#1a0f05;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:12px">2</span>
            <span>Lễ tân kiểm tra tình trạng phòng trống</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <span style="width:24px;height:24px;border-radius:50%;background:#c88922;color:#1a0f05;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:12px">3</span>
            <span>Nhận xác nhận giữ phòng qua Zalo/Điện thoại</span>
          </div>
        </div>
      </div>
      <!-- /wp:group -->

      <!-- Right: Booking Form -->
      <!-- wp:group {"className":"mixContactFormCard"} -->
      <div class="wp-block-group mixContactFormCard">
        <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"22px"}}} -->
        <h3 class="wp-block-heading" style="font-size:22px;font-weight:700;font-family:'Philosopher',serif;color:#ffe2a0;margin:0 0 16px">Thông Tin Giữ Phòng</h3>
        <!-- /wp:heading -->

        <!-- wp:html -->
        <form id="mixBranchBookingForm" class="mixCateBookingForm">
          <input type="hidden" name="action" value="mixhotel_submit_booking" />
          <input type="hidden" name="branch" value="<?php echo esc_attr($branch_title); ?>" />
          <input type="hidden" name="nonce" value="" />
          
          <div style="margin-bottom:16px">
            <label>Họ tên của bạn *</label>
            <input type="text" name="customer_name" required placeholder="Ví dụ: Anh Nam / Chị Linh" />
          </div>

          <div style="margin-bottom:16px">
            <label>Số điện thoại / Zalo *</label>
            <input type="tel" name="customer_phone" required placeholder="09xx xxx xxx" />
          </div>

          <div style="margin-bottom:16px">
            <label>Phòng muốn đặt</label>
            <select name="room_title" id="mixBookingRoomSelect" style="width:100%;padding:12px 16px;border-radius:12px;background:#0c0806;border:1px solid rgba(200, 137, 34, 0.3);color:#ffffff;font-size:14px;color-scheme:dark">
              <option value="">-- Chọn phòng concept --</option>
              <?php foreach ($rooms as $r) : ?>
                <option value="<?php echo esc_attr($r['title']); ?>"><?php echo esc_html($r['title']); ?></option>
              <?php endforeach; ?>
            </select>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
            <div>
              <label for="branch_booking_date">Ngày nhận phòng</label>
              <input type="date" id="branch_booking_date" name="booking_date" class="mixBookingDateInput" min="<?php echo date('Y-m-d'); ?>" value="<?php echo date('Y-m-d'); ?>" />
            </div>
            <div>
              <label for="branch_booking_time">Giờ đến dự kiến</label>
              <input type="time" id="branch_booking_time" name="booking_time" class="mixBookingTimeInput" value="14:00" />
            </div>
          </div>

          <div style="margin-bottom:20px">
            <label>Ghi chú yêu cầu (nếu có)</label>
            <textarea name="booking_note" rows="2" placeholder="Ví dụ: Giữ phòng 15 phút, mượn đồ cosplay, chuẩn bị hoa nến..."></textarea>
          </div>

          <button type="submit" class="mixCtaBtn" style="width:100%;text-align:center;border-radius:12px;font-size:14px">
            Gửi Yêu Cầu Giữ Phòng
          </button>
        </form>

        <div id="mixBranchBookingResult" style="margin-top:16px;display:none;padding:14px;border-radius:12px;text-align:center;font-size:14px"></div>
        <!-- /wp:html -->
      </div>
      <!-- /wp:group -->

    </div>
  </section>
  <!-- /wp:group -->

  <!-- 4. GOOGLE MAPS EMBED & DIRECT CONTACT -->
  <!-- wp:group {"tagName":"section","className":"mixLuxuryContainer","style":{"spacing":{"padding":{"bottom":"80px"}}}} -->
  <section class="wp-block-group mixLuxuryContainer" style="padding-bottom:80px">
    <!-- wp:group {"style":{"spacing":{"padding":{"top":"32px","bottom":"32px","left":"32px","right":"32px"}}}} -->
    <div class="wp-block-group" style="padding:32px;border-radius:24px;background:#140e0a;border:1px solid rgba(200, 137, 34, 0.25)">
      <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"22px"}}} -->
      <h3 class="wp-block-heading" style="font-size:22px;font-weight:700;font-family:'Philosopher',serif;color:#ffe2a0;margin:0 0 16px">Vị Trí &amp; Chỉ Đường Tới <?php echo esc_html($branch_title); ?></h3>
      <!-- /wp:heading -->

      <!-- wp:paragraph {"style":{"typography":{"fontSize":"15px"}}} -->
      <p style="font-size:15px;color:#d4d4d8;margin-bottom:24px">📍 Địa chỉ: <strong><?php echo esc_html($branch_address); ?></strong> &bull; Hotline: <strong style="color:#ffe2a0"><?php echo esc_html($branch_hotline); ?></strong></p>
      <!-- /wp:paragraph -->

      <?php if ($branch_map_embed) : ?>
        <div style="position:relative;width:100%;aspect-ratio:16/7;border-radius:16px;overflow:hidden;border:1px solid rgba(200, 137, 34, 0.2);margin-bottom:24px">
          <?php echo $branch_map_embed; ?>
        </div>
      <?php endif; ?>

      <!-- wp:buttons {"className":"mixContactMapActions","layout":{"type":"flex","justifyContent":"center","flexWrap":"wrap"}} -->
      <div class="wp-block-buttons mixContactMapActions">
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnPrimary"><a class="wp-block-button__link wp-element-button" href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', $branch_hotline)); ?>">Gọi Hotline <?php echo esc_html($branch_hotline); ?></a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnZalo"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnZalo"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url($branch_zalo); ?>" target="_blank" rel="noreferrer">Nhắn Zalo Chi Nhánh</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="https://maps.google.com/?q=<?php echo urlencode($branch_title . ' ' . $branch_address); ?>" target="_blank" rel="noreferrer">📍 Mở Google Maps Chỉ Đường</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
  </section>
  <!-- /wp:group -->

</article>
<!-- /wp:group -->
