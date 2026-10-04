<?php
/**
 * Title: Danh Sách Phòng & Khách Sạn Tình Yêu Dark Luxury
 * Slug: mixhotel/room-archive-content
 * Categories: mixhotel
 * Description: 100% 1:1 Luxury Landing Page for Khách Sạn Tình Yêu using Gutenberg Core Blocks.
 *
 * @package MixHotelTheme
 */

if (!defined('ABSPATH')) {
    exit;
}

$theme_uri = get_template_directory_uri();
$article_pack  = require get_template_directory() . '/inc-khach-san-tinh-yeu-article.php';

$article_toc   = $article_pack['toc'];
$article_html  = $article_pack['html'];

// Query all published branches dynamically from DB
$branch_posts = get_posts([
    'post_type'      => 'hotel_branch',
    'post_status'    => 'publish',
    'posts_per_page' => -1,
    'orderby'        => 'post_name',
    'order'          => 'ASC',
]);

// Map slugs to standard DOM anchor IDs & Areas
$branch_anchor_map = [
    'cs1-huynh-thuc-khang' => 'branch-mix-boutique-premium-hotel',
    'cs2-dang-tien-dong'    => 'branch-mix-boutique-hotel-256b-dang-tien-dong',
    'cs3-phuc-la'          => 'branch-mix-boutique-hotel-20-phuc-la-ha-dong',
];

$branch_area_map = [
    'cs1-huynh-thuc-khang' => 'Huỳnh Thúc Kháng',
    'cs2-dang-tien-dong'    => 'Đống Đa',
    'cs3-phuc-la'          => 'Hà Đông',
];

// Sort branches in canonical order: cs1, cs2, cs3
usort($branch_posts, function($a, $b) {
    $order = ['cs1-huynh-thuc-khang' => 1, 'cs2-dang-tien-dong' => 2, 'cs3-phuc-la' => 3];
    $pos_a = $order[$a->post_name] ?? 99;
    $pos_b = $order[$b->post_name] ?? 99;
    return $pos_a <=> $pos_b;
});

$branches_data = [];
$form_rooms_by_branch = [
    'All' => [],
];

foreach ($branch_posts as $b_post) {
    $b_id      = $b_post->ID;
    $b_slug    = $b_post->post_name;
    $anchor_id = $branch_anchor_map[$b_slug] ?? ('branch-' . $b_slug);
    $area_name = $branch_area_map[$b_slug] ?? 'Hà Nội';

    $b_thumb = get_the_post_thumbnail_url($b_id, 'full');
    if (!$b_thumb) {
        $b_thumb = $theme_uri . '/assets/tassets/images/banner-home.jpg';
    }

    $b_address = get_post_meta($b_id, '_mixhotel_branch_address', true);

    // Query published rooms belonging to this branch
    $room_posts = get_posts([
        'post_type'      => 'hotel_room',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'meta_key'       => '_mixhotel_room_branch_id',
        'meta_value'     => $b_id,
        'orderby'        => 'ID',
        'order'          => 'ASC',
    ]);

    $branch_rooms = [];
    $form_key = $b_post->post_title;
    if (!isset($form_rooms_by_branch[$form_key])) {
        $form_rooms_by_branch[$form_key] = [];
    }

    foreach ($room_posts as $r_post) {
        $r_id    = $r_post->ID;
        $r_thumb = get_the_post_thumbnail_url($r_id, 'large');
        if (!$r_thumb) {
            $gallery = MixHotel_Helpers::get_room_gallery($r_id);
            if (!empty($gallery)) {
                $r_thumb = wp_get_attachment_image_url($gallery[0], 'large');
            }
        }
        if (!$r_thumb) {
            $r_thumb = $theme_uri . '/assets/tassets/images/banner-home.jpg';
        }

        $price_2h     = get_post_meta($r_id, '_mixhotel_room_price_2h', true);
        $price_extra  = get_post_meta($r_id, '_mixhotel_room_price_extra_hour', true);
        $price_night  = get_post_meta($r_id, '_mixhotel_room_price_overnight', true);
        $price_allday = get_post_meta($r_id, '_mixhotel_room_price_allday', true);

        $price_formatted = $price_2h ? ('Giá từ: ' . number_format(absint($price_2h), 0, ',', '.') . ' VND/2h') : 'Giá từ: Liên hệ';
        $excerpt = $r_post->post_excerpt ?: wp_trim_words($r_post->post_content, 35);

        $room_item = [
            'id'    => $r_id,
            'name'  => $r_post->post_title,
            'link'  => get_permalink($r_id),
            'price' => $price_formatted,
            'desc'  => $excerpt,
            'image' => $r_thumb,
        ];
        $branch_rooms[] = $room_item;

        // Build options for booking form dropdown
        $form_item = [
            'value'    => $r_post->post_title,
            'text'     => $r_post->post_title,
            'price1'   => (float)$price_2h,
            'price2'   => (float)$price_night,
            'price3'   => $price_allday ? (number_format(absint($price_allday), 0, ',', '.') . 'VND') : '',
            'pricesub' => $price_extra ? ('(thêm ' . (absint($price_extra) / 1000) . 'k/h)') : '',
        ];
        $form_rooms_by_branch[$form_key][] = $form_item;
        $form_rooms_by_branch['All'][] = $form_item;
    }

    $trimmed_key = trim($form_key);
    $form_rooms_by_branch[$trimmed_key] = $form_rooms_by_branch[$form_key];
    $form_rooms_by_branch[$trimmed_key . ' '] = $form_rooms_by_branch[$form_key];

    if (strpos($b_slug, 'huynh-thuc-khang') !== false) {
        $form_rooms_by_branch['Mix Boutique Premium'] = $form_rooms_by_branch[$form_key];
    } elseif (strpos($b_slug, 'dang-tien-dong') !== false) {
        $form_rooms_by_branch['Mix Boutique Hotel 256B Đặng Tiến Đông'] = $form_rooms_by_branch[$form_key];
        $form_rooms_by_branch['Mix Boutique Hotel 256B Đặng Tiến Đông '] = $form_rooms_by_branch[$form_key];
    } elseif (strpos($b_slug, 'phuc-la') !== false) {
        $form_rooms_by_branch['Mix Boutique Hotel 20 Phúc La Hà Đông'] = $form_rooms_by_branch[$form_key];
        $form_rooms_by_branch['Mix Boutique Hotel 20 Phúc La Hà Đông '] = $form_rooms_by_branch[$form_key];
    }

    $room_count = count($branch_rooms);

    $branches_data[] = [
        'id'        => $anchor_id,
        'image'     => $b_thumb,
        'badge'     => $b_post->post_title,
        'area'      => $area_name,
        'name'      => $b_post->post_title,
        'address'   => $b_address,
        'notice'    => 'Đặt phòng tại chi nhánh này nếu bạn muốn chọn đúng khu vực, đúng concept và không nhầm sang chi nhánh khác.',
        'tags'      => [
            $room_count . ' phòng',
            'Superior từ 199k',
            'Deluxe từ 300k',
            'VIP từ 400k',
        ],
        'roomTitle' => 'Tất cả phòng tại ' . $b_post->post_title,
        'rooms'     => $branch_rooms,
    ];
}
?>
<!-- wp:group {"className":"mixLuxuryBreadcrumbs","metadata":{"name":"Breadcrumbs"}} -->
<div class="wp-block-group mixLuxuryBreadcrumbs">
  <!-- wp:paragraph {"className":"inner"} -->
  <p class="inner"><a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a> <span>/</span> <span class="current">Khách Sạn Tình Yêu</span></p>
  <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"cateMixHero","anchor":"top","lock":{"move":true,"remove":true},"metadata":{"name":"Hero - Khách Sạn Tình Yêu"}} -->
<section id="top" class="wp-block-group cateMixHero">
  <!-- wp:html -->
  <img
    src="<?php echo esc_url($theme_uri . '/assets/tassets/images/banner-home.jpg'); ?>"
    alt="Phòng concept Eden Mix Boutique Hotel"
    class="cateMixHeroBg"
  />
  <div class="cateMixHeroOverlay"></div>
  <div class="cateMixHeroLight"></div>
  <!-- /wp:html -->
  <!-- wp:group {"className":"cateMixHeroWrap"} -->
  <div class="wp-block-group cateMixHeroWrap">
    <!-- wp:group {"className":"cateMixHeroContent"} -->
    <div class="wp-block-group cateMixHeroContent">
      <!-- wp:paragraph {"className":"cateMixHeroSub"} -->
      <p class="cateMixHeroSub"><span></span><em>KHÁCH SẠN TÌNH YÊU HÀ NỘI</em></p>
      <!-- /wp:paragraph -->
      <!-- wp:heading {"level":1,"className":"cateMixHeroTitle"} -->
      <h1 class="wp-block-heading cateMixHeroTitle"><span>Chọn đúng chi nhánh</span><br /><span>Khách sạn tình yêu</span></h1>
      <!-- /wp:heading -->
      <!-- wp:paragraph {"className":"cateMixHeroDesc"} -->
      <p class="cateMixHeroDesc">3 địa chỉ khác nhau, nhóm phòng khác nhau. Bạn hãy chọn chi nhánh trước để Mix Hotel tư vấn đúng phòng trống.</p>
      <!-- /wp:paragraph -->
      <!-- wp:buttons {"className":"cateMixHeroActions"} -->
      <div class="wp-block-buttons cateMixHeroActions">
        <!-- wp:button {"className":"cateMixHeroBtn cateMixHeroBtnPrimary"} -->
        <div class="wp-block-button cateMixHeroBtn cateMixHeroBtnPrimary"><a class="wp-block-button__link wp-element-button" href="https://zalo.me/0383104010" target="_blank" rel="noopener noreferrer">Nhắn Zalo tư vấn</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"cateMixHeroBtn"} -->
        <div class="wp-block-button cateMixHeroBtn"><a class="wp-block-button__link wp-element-button" href="tel:0383104010">☎ Gọi điện</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"cateMixHeroBtn"} -->
        <div class="wp-block-button cateMixHeroBtn"><a class="wp-block-button__link wp-element-button" href="#chon-chi-nhanh">📍 Chọn chi nhánh</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
      <!-- wp:group {"className":"cateMixHeroNumbers"} -->
      <div class="wp-block-group cateMixHeroNumbers">
        <!-- wp:paragraph {"className":"cateMixHeroNumber"} -->
        <p class="cateMixHeroNumber"><strong>3</strong> <span>chi nhánh Hà Nội</span></p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"cateMixHeroNumber"} -->
        <p class="cateMixHeroNumber"><strong>199k</strong> <span>giá từ/ 2h đầu</span></p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"cateMixHeroNumber"} -->
        <p class="cateMixHeroNumber"><strong>15-20'</strong> <span>giữ phòng khi chưa cọc</span></p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"cateMixHeroNumber"} -->
        <p class="cateMixHeroNumber"><strong>18+</strong> <span>chỉ nhận khách từ 18 tuổi</span></p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
      <!-- wp:group {"className":"cateMixHeroBranchList"} -->
      <div class="wp-block-group cateMixHeroBranchList">
        <!-- wp:paragraph {"className":"cateMixHeroBranch"} -->
        <p class="cateMixHeroBranch"><a href="#branch-mix-boutique-premium-hotel"><strong>Premium</strong><span>Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội</span></a></p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"cateMixHeroBranch"} -->
        <p class="cateMixHeroBranch"><a href="#branch-mix-boutique-hotel-256b-dang-tien-dong"><strong>256B Đặng Tiến Đông</strong><span>256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội, Việt Nam</span></a></p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"cateMixHeroBranch"} -->
        <p class="cateMixHeroBranch"><a href="#branch-mix-boutique-hotel-20-phuc-la-ha-dong"><strong>20 Phúc La Hà Đông</strong><span>20, P. Phúc La, Hà Đông, Hà Nội, Việt Nam</span></a></p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"cateBranchSection","anchor":"chon-chi-nhanh","metadata":{"name":"3 Chi Nhánh Đang Nhận Khách"}} -->
<section class="wp-block-group cateBranchSection" id="chon-chi-nhanh">
  <!-- wp:html -->
  <div class="cateBranchDecor cateBranchDecorOne"></div>
  <div class="cateBranchDecor cateBranchDecorTwo"></div>
  <!-- /wp:html -->
  <!-- wp:group {"className":"cateBranchContainer"} -->
  <div class="wp-block-group cateBranchContainer">
    <!-- wp:group {"className":"cateBranchHead"} -->
    <div class="wp-block-group cateBranchHead">
      <!-- wp:group {"className":"cateBranchHeadLeft"} -->
      <div class="wp-block-group cateBranchHeadLeft">
        <!-- wp:paragraph {"className":"cateBranchSub"} -->
        <p class="cateBranchSub"><span></span><em>Chọn nhanh theo khu vực</em></p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":2,"className":"cateBranchTitle"} -->
        <h2 class="wp-block-heading cateBranchTitle"><span>3 chi nhánh Mix Boutique</span><br /><span>Hotel đang nhận khách</span></h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"cateBranchDesc"} -->
        <p class="cateBranchDesc">Tìm ngay chi nhánh Mix Boutique Hotel gần bạn, khám phá các hạng phòng đẹp và đặt phòng chỉ với vài thao tác đơn giản!</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
      <!-- wp:html -->
      <div class="cateBranchTabs" id="cateBranchTabsContainer">
        <?php foreach ($branches_data as $bIdx => $branch) : ?>
          <a
            class="cateBranchTab <?php echo ($bIdx === 0) ? 'cateBranchTabActive' : ''; ?>"
            href="#<?php echo esc_attr($branch['id']); ?>"
            data-target="<?php echo esc_attr($branch['id']); ?>"
          >
            <?php echo esc_html($branch['name']); ?>
          </a>
        <?php endforeach; ?>
      </div>
      <!-- /wp:html -->
    </div>
    <!-- /wp:group -->

    <?php foreach ($branches_data as $branch) : ?>
      <!-- wp:group {"tagName":"article","className":"cateBranchCard","anchor":"<?php echo esc_attr($branch['id']); ?>","metadata":{"name":"Chi Nhánh <?php echo esc_attr($branch['name']); ?>"}} -->
      <article id="<?php echo esc_attr($branch['id']); ?>" class="wp-block-group cateBranchCard">
        <!-- wp:group {"className":"cateBranchImageWrap"} -->
        <div class="wp-block-group cateBranchImageWrap">
          <!-- wp:image {"sizeSlug":"large","linkDestination":"none","className":"cateBranchImage"} -->
          <figure class="wp-block-image size-large cateBranchImage"><img src="<?php echo esc_url($branch['image']); ?>" alt="<?php echo esc_attr($branch['name']); ?>"/></figure>
          <!-- /wp:image -->
          <!-- wp:html -->
          <div class="cateBranchImageOverlay"></div>
          <div class="cateBranchBadge"><?php echo esc_html($branch['badge']); ?></div>
          <!-- /wp:html -->
        </div>
        <!-- /wp:group -->
        <!-- wp:group {"className":"cateBranchInfo"} -->
        <div class="wp-block-group cateBranchInfo">
          <!-- wp:paragraph {"className":"cateBranchArea"} -->
          <p class="cateBranchArea"><?php echo esc_html($branch['area']); ?></p>
          <!-- /wp:paragraph -->
          <!-- wp:heading {"level":3,"className":"cateBranchName"} -->
          <h3 class="wp-block-heading cateBranchName"><?php echo esc_html($branch['name']); ?></h3>
          <!-- /wp:heading -->
          <!-- wp:paragraph {"className":"cateBranchAddress"} -->
          <p class="cateBranchAddress"><?php echo esc_html($branch['address']); ?></p>
          <!-- /wp:paragraph -->
          <!-- wp:paragraph {"className":"cateBranchNotice"} -->
          <p class="cateBranchNotice"><span>📍 <?php echo esc_html($branch['notice']); ?></span></p>
          <!-- /wp:paragraph -->
          <!-- wp:html -->
          <div class="cateBranchTags">
            <?php foreach ($branch['tags'] as $tag) : ?>
              <span><?php echo esc_html($tag); ?></span>
            <?php endforeach; ?>
          </div>
          <!-- /wp:html -->
          <!-- wp:heading {"level":4,"className":"cateBranchRoomTitle"} -->
          <h4 class="wp-block-heading cateBranchRoomTitle"><?php echo esc_html($branch['roomTitle']); ?></h4>
          <!-- /wp:heading -->
          <!-- wp:group {"className":"cateBranchRooms"} -->
          <div class="wp-block-group cateBranchRooms">
            <?php foreach ($branch['rooms'] as $room) : ?>
              <!-- wp:group {"tagName":"article","className":"cateBranchRoom","metadata":{"name":"<?php echo esc_attr($room['name']); ?>"}} -->
              <article class="wp-block-group cateBranchRoom">
                <!-- wp:image {"sizeSlug":"large","className":"cateBranchRoomImageLink"} -->
                <figure class="wp-block-image size-large cateBranchRoomImageLink"><a href="<?php echo esc_url($room['link']); ?>"><img src="<?php echo esc_url($room['image']); ?>" alt="<?php echo esc_attr($room['name']); ?>"/></a></figure>
                <!-- /wp:image -->
                <!-- wp:group {"className":"cateBranchRoomText"} -->
                <div class="wp-block-group cateBranchRoomText">
                  <!-- wp:paragraph {"className":"cateBranchRoomNameLink"} -->
                  <p class="cateBranchRoomNameLink"><a href="<?php echo esc_url($room['link']); ?>"><strong><?php echo esc_html($room['name']); ?></strong></a></p>
                  <!-- /wp:paragraph -->
                  <!-- wp:paragraph {"className":"cateBranchRoomPrice"} -->
                  <p class="cateBranchRoomPrice"><b><?php echo esc_html($room['price']); ?></b></p>
                  <!-- /wp:paragraph -->
                  <!-- wp:paragraph {"className":"cateBranchRoomDesc"} -->
                  <p class="cateBranchRoomDesc"><span><?php echo esc_html($room['desc']); ?></span></p>
                  <!-- /wp:paragraph -->
                  <!-- wp:buttons {"className":"cateBranchRoomActions"} -->
                  <div class="wp-block-buttons cateBranchRoomActions">
                    <!-- wp:button {"className":"cateBranchRoomBtn"} -->
                    <div class="wp-block-button cateBranchRoomBtn"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url($room['link']); ?>">Xem chi tiết</a></div>
                    <!-- /wp:button -->
                    <!-- wp:button {"className":"cateBranchRoomBtn cateBranchRoomBtnZalo"} -->
                    <div class="wp-block-button cateBranchRoomBtn cateBranchRoomBtnZalo"><a class="wp-block-button__link wp-element-button" href="https://zalo.me/0383104010" target="_blank" rel="noopener noreferrer">Nhắn Zalo</a></div>
                    <!-- /wp:button -->
                  </div>
                  <!-- /wp:buttons -->
                </div>
                <!-- /wp:group -->
              </article>
              <!-- /wp:group -->
            <?php endforeach; ?>
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:group -->
      </article>
      <!-- /wp:group -->
    <?php endforeach; ?>
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"mixCatePrice","anchor":"bang-gia","metadata":{"name":"Bảng Giá Rõ Để Khách Quyết Định Nhanh"}} -->
<section class="wp-block-group mixCatePrice" id="bang-gia">
  <!-- wp:group {"className":"container"} -->
  <div class="wp-block-group container">
    <!-- wp:group {"className":"mixCatePriceInner"} -->
    <div class="wp-block-group mixCatePriceInner">
      <!-- wp:html -->
      <div class="mixCatePriceGlow mixCatePriceGlowOne"></div>
      <div class="mixCatePriceGlow mixCatePriceGlowTwo"></div>
      <!-- /wp:html -->
      <!-- wp:group {"className":"mixCatePriceHead"} -->
      <div class="wp-block-group mixCatePriceHead">
        <!-- wp:paragraph {"className":"mixCatePriceKicker"} -->
        <p class="mixCatePriceKicker"><span></span><em>Bảng giá rõ ràng</em></p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":2,"className":"mixCatePriceTitle"} -->
        <h2 class="wp-block-heading mixCatePriceTitle">Bảng giá rõ để khách quyết định nhanh</h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"mixCatePriceDesc"} -->
        <p class="mixCatePriceDesc">Không mập mờ, không phụ thu bất ngờ. Bạn xem trước khung giá để chọn phòng và hình thức nghỉ phù hợp.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
      <!-- wp:columns {"className":"mixCatePriceGrid"} -->
      <div class="wp-block-columns mixCatePriceGrid">
        <!-- wp:column {"className":"mixCatePriceCard"} -->
        <div class="wp-block-column mixCatePriceCard">
          <!-- wp:group {"className":"mixCatePriceCardTop"} -->
          <div class="wp-block-group mixCatePriceCardTop">
            <!-- wp:heading {"level":3,"className":"mixCatePriceName"} -->
            <h3 class="wp-block-heading mixCatePriceName">Superior</h3>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"className":"mixCatePriceBadge"} -->
            <p class="mixCatePriceBadge">Phổ biến</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
          <!-- wp:paragraph {"className":"mixCatePriceMain"} -->
          <p class="mixCatePriceMain"><span>199k</span> <small>/ 2h</small></p>
          <!-- /wp:paragraph -->
          <!-- wp:group {"className":"mixCatePriceList"} -->
          <div class="wp-block-group mixCatePriceList">
            <!-- wp:paragraph {"className":"mixCatePriceRow"} -->
            <p class="mixCatePriceRow"><span>Thêm giờ</span> <b>50k/ h</b></p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"mixCatePriceRow"} -->
            <p class="mixCatePriceRow"><span>Qua đêm 22h-12h</span> <b>500k</b></p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"mixCatePriceRow"} -->
            <p class="mixCatePriceRow"><span>Ngày đêm 14h-12h</span> <b>700k</b></p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column {"className":"mixCatePriceCard mixCatePriceCardHot"} -->
        <div class="wp-block-column mixCatePriceCard mixCatePriceCardHot">
          <!-- wp:group {"className":"mixCatePriceCardTop"} -->
          <div class="wp-block-group mixCatePriceCardTop">
            <!-- wp:heading {"level":3,"className":"mixCatePriceName"} -->
            <h3 class="wp-block-heading mixCatePriceName">Deluxe</h3>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"className":"mixCatePriceBadge"} -->
            <p class="mixCatePriceBadge">Đáng chọn</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
          <!-- wp:paragraph {"className":"mixCatePriceMain"} -->
          <p class="mixCatePriceMain"><span>300k</span> <small>/ 2h</small></p>
          <!-- /wp:paragraph -->
          <!-- wp:group {"className":"mixCatePriceList"} -->
          <div class="wp-block-group mixCatePriceList">
            <!-- wp:paragraph {"className":"mixCatePriceRow"} -->
            <p class="mixCatePriceRow"><span>Thêm giờ</span> <b>50k/ h</b></p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"mixCatePriceRow"} -->
            <p class="mixCatePriceRow"><span>Qua đêm 22h-12h</span> <b>600k</b></p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"mixCatePriceRow"} -->
            <p class="mixCatePriceRow"><span>Ngày đêm 14h-12h</span> <b>800k</b></p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column {"className":"mixCatePriceCard"} -->
        <div class="wp-block-column mixCatePriceCard">
          <!-- wp:group {"className":"mixCatePriceCardTop"} -->
          <div class="wp-block-group mixCatePriceCardTop">
            <!-- wp:heading {"level":3,"className":"mixCatePriceName"} -->
            <h3 class="wp-block-heading mixCatePriceName">Vip</h3>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"className":"mixCatePriceBadge"} -->
            <p class="mixCatePriceBadge">Riêng tư</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
          <!-- wp:paragraph {"className":"mixCatePriceMain"} -->
          <p class="mixCatePriceMain"><span>400k</span> <small>/ 2h</small></p>
          <!-- /wp:paragraph -->
          <!-- wp:group {"className":"mixCatePriceList"} -->
          <div class="wp-block-group mixCatePriceList">
            <!-- wp:paragraph {"className":"mixCatePriceRow"} -->
            <p class="mixCatePriceRow"><span>Thêm giờ</span> <b>50k/ h</b></p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"mixCatePriceRow"} -->
            <p class="mixCatePriceRow"><span>Qua đêm 22h-12h</span> <b>700k</b></p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"mixCatePriceRow"} -->
            <p class="mixCatePriceRow"><span>Ngày đêm 14h-12h</span> <b>900k</b></p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:column -->
      </div>
      <!-- /wp:columns -->

      <!-- wp:paragraph {"className":"mixCatePriceNote"} -->
      <p class="mixCatePriceNote">ℹ️ Giá trên là giá tham khảo chung theo hạng phòng. Mỗi chi nhánh có số lượng phòng và concept khác nhau; hãy nhắn Zalo để nhận báo giá chính xác theo phòng trống thực tế.</p>
      <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"mixCateBranch","anchor":"huong-dan-chon-chi-nhanh","metadata":{"name":"Chọn Đúng Để Không Đặt Nhầm"}} -->
<section class="wp-block-group mixCateBranch" id="huong-dan-chon-chi-nhanh">
  <!-- wp:group {"className":"container"} -->
  <div class="wp-block-group container">
    <!-- wp:group {"className":"mixCateBranchInner"} -->
    <div class="wp-block-group mixCateBranchInner">
      <!-- wp:html -->
      <div class="mixCateBranchLight mixCateBranchLightLeft"></div>
      <div class="mixCateBranchLight mixCateBranchLightRight"></div>
      <!-- /wp:html -->
      <!-- wp:group {"className":"mixCateBranchHead"} -->
      <div class="wp-block-group mixCateBranchHead">
        <!-- wp:paragraph {"className":"mixCateBranchKicker"} -->
        <p class="mixCateBranchKicker"><span></span><em>Chọn đúng để không đặt nhầm</em></p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":2,"className":"mixCateBranchTitle"} -->
        <h2 class="wp-block-heading mixCateBranchTitle"><span>Chọn chi nhánh trước,</span><br /><span>chọn phòng sau</span></h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"mixCateBranchDesc"} -->
        <p class="mixCateBranchDesc">Mỗi chi nhánh ở một khu vực khác nhau và sở hữu nhóm phòng concept khác nhau. Khi liên hệ, hãy gửi đủ “chi nhánh + tên phòng” để tư vấn viên kiểm tra đúng phòng trống.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
      <!-- wp:columns {"className":"mixCateBranchSteps"} -->
      <div class="wp-block-columns mixCateBranchSteps">
        <!-- wp:column {"className":"mixCateBranchStep"} -->
        <div class="wp-block-column mixCateBranchStep">
          <!-- wp:paragraph {"className":"mixCateBranchNumber"} -->
          <p class="mixCateBranchNumber">01</p>
          <!-- /wp:paragraph -->
          <!-- wp:heading {"level":3,"className":"mixCateBranchStepTitle"} -->
          <h3 class="wp-block-heading mixCateBranchStepTitle">Xác định khu vực</h3>
          <!-- /wp:heading -->
          <!-- wp:paragraph {"className":"mixCateBranchStepText"} -->
          <p class="mixCateBranchStepText">Premium ở Huỳnh Thúc Kháng, 256B ở Đặng Tiến Đông, 20 Phúc La ở Hà Đông.</p>
          <!-- /wp:paragraph -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column {"className":"mixCateBranchStep"} -->
        <div class="wp-block-column mixCateBranchStep">
          <!-- wp:paragraph {"className":"mixCateBranchNumber"} -->
          <p class="mixCateBranchNumber">02</p>
          <!-- /wp:paragraph -->
          <!-- wp:heading {"level":3,"className":"mixCateBranchStepTitle"} -->
          <h3 class="wp-block-heading mixCateBranchStepTitle">Chọn phòng trong chi nhánh</h3>
          <!-- /wp:heading -->
          <!-- wp:paragraph {"className":"mixCateBranchStepText"} -->
          <p class="mixCateBranchStepText">Chỉ chọn các phòng đang nằm trong block chi nhánh tương ứng phía trên.</p>
          <!-- /wp:paragraph -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column {"className":"mixCateBranchStep"} -->
        <div class="wp-block-column mixCateBranchStep">
          <!-- wp:paragraph {"className":"mixCateBranchNumber"} -->
          <p class="mixCateBranchNumber">03</p>
          <!-- /wp:paragraph -->
          <!-- wp:heading {"level":3,"className":"mixCateBranchStepTitle"} -->
          <h3 class="wp-block-heading mixCateBranchStepTitle">Gửi đúng cú pháp</h3>
          <!-- /wp:heading -->
          <!-- wp:paragraph {"className":"mixCateBranchStepText"} -->
          <p class="mixCateBranchStepText">Ví dụ: “256B Đặng Tiến Đông - After Sunset - 20h tối nay”.</p>
          <!-- /wp:paragraph -->
        </div>
        <!-- /wp:column -->
      </div>
      <!-- /wp:columns -->
      <!-- wp:buttons {"className":"mixCateBranchActions"} -->
      <div class="wp-block-buttons mixCateBranchActions">
        <!-- wp:button {"className":"mixCateBranchBtn mixCateBranchBtnMain"} -->
        <div class="wp-block-button mixCateBranchBtn mixCateBranchBtnMain"><a class="wp-block-button__link wp-element-button" href="#branch-mix-boutique-premium-hotel">Xem Premium</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixCateBranchBtn"} -->
        <div class="wp-block-button mixCateBranchBtn"><a class="wp-block-button__link wp-element-button" href="#branch-mix-boutique-hotel-256b-dang-tien-dong">Xem 256B</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixCateBranchBtn"} -->
        <div class="wp-block-button mixCateBranchBtn"><a class="wp-block-button__link wp-element-button" href="#branch-mix-boutique-hotel-20-phuc-la-ha-dong">Xem Phúc La</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"mixCateVideo","anchor":"video-phong","metadata":{"name":"Video Phòng Thực Tế"}} -->
<section class="wp-block-group mixCateVideo" id="video-phong">
  <!-- wp:group {"className":"container"} -->
  <div class="wp-block-group container">
    <!-- wp:group {"className":"mixCateVideoInner"} -->
    <div class="wp-block-group mixCateVideoInner">
      <!-- wp:html -->
      <div class="mixCateVideoLight mixCateVideoLightLeft"></div>
      <div class="mixCateVideoLight mixCateVideoLightRight"></div>
      <!-- /wp:html -->
      <!-- wp:group {"className":"mixCateVideoContent"} -->
      <div class="wp-block-group mixCateVideoContent">
        <!-- wp:paragraph {"className":"mixCateVideoKicker"} -->
        <p class="mixCateVideoKicker"><span></span><em>Video phòng thực tế</em></p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":2,"className":"mixCateVideoTitle"} -->
        <h2 class="wp-block-heading mixCateVideoTitle"><span>Xem nhanh không</span><br /><span>gian trước khi</span><br /><span>chọn phòng</span></h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"mixCateVideoDesc"} -->
        <p class="mixCateVideoDesc">Video ngắn giúp bạn nhìn rõ ánh sáng, bố cục phòng và cảm giác thực tế hơn ảnh tĩnh. Khi nhắn Zalo, bạn có thể gửi kèm video hoặc tên phòng muốn xem thêm để Mix tư vấn đúng chi nhánh.</p>
        <!-- /wp:paragraph -->
        <!-- wp:group {"className":"mixCateVideoNotice"} -->
        <div class="wp-block-group mixCateVideoNotice">
          <!-- wp:paragraph {"className":"mixCateVideoNoticeText"} -->
          <p class="mixCateVideoNoticeText">▶ Landing page đang dùng video từ kênh YouTube Mix. Có thể bổ sung thêm Shorts cho từng phòng hoặc từng chi nhánh khi có link mới.</p>
          <!-- /wp:paragraph -->
        </div>
        <!-- /wp:group -->
        <!-- wp:buttons {"className":"mixCateVideoActions"} -->
        <div class="wp-block-buttons mixCateVideoActions">
          <!-- wp:button {"className":"mixCateVideoBtn mixCateVideoBtnMain"} -->
          <div class="wp-block-button mixCateVideoBtn mixCateVideoBtnMain"><a class="wp-block-button__link wp-element-button" href="https://www.youtube.com/@hotelmixboutique1110" target="_blank" rel="noopener noreferrer">Xem kênh YouTube</a></div>
          <!-- /wp:button -->
          <!-- wp:button {"className":"mixCateVideoBtn"} -->
          <div class="wp-block-button mixCateVideoBtn"><a class="wp-block-button__link wp-element-button" href="https://zalo.me/0383104010" target="_blank" rel="noopener noreferrer">💬 Hỏi video phòng</a></div>
          <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
      </div>
      <!-- /wp:group -->
      <!-- wp:group {"className":"mixCateVideoList"} -->
      <div class="wp-block-group mixCateVideoList">
        <!-- wp:group {"className":"mixCateVideoCard"} -->
        <div class="wp-block-group mixCateVideoCard">
          <!-- wp:embed {"url":"https://www.youtube.com/watch?v=_3pSDfR8Ccw","type":"video","providerNameSlug":"youtube","responsive":true} -->
          <figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube"><div class="wp-block-embed__wrapper">
          https://www.youtube.com/watch?v=_3pSDfR8Ccw
          </div></figure>
          <!-- /wp:embed -->
          <!-- wp:group {"className":"mixCateVideoInfo"} -->
          <div class="wp-block-group mixCateVideoInfo">
            <!-- wp:heading {"level":3,"className":"mixCateVideoName"} -->
            <h3 class="wp-block-heading mixCateVideoName">TOGETHER and to Mixboutique Hotel đưa nhau lên tới "đỉnh chóp" khiến nàng tuôn trào từng nhịp thở 😍</h3>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"className":"mixCateVideoText"} -->
            <p class="mixCateVideoText">Xem trước không gian phòng dạng Shorts trước khi nhắn tư vấn.</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:group -->

        <!-- wp:group {"className":"mixCateVideoCard"} -->
        <div class="wp-block-group mixCateVideoCard">
          <!-- wp:embed {"url":"https://www.youtube.com/watch?v=Ts4seBpirOA","type":"video","providerNameSlug":"youtube","responsive":true} -->
          <figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube"><div class="wp-block-embed__wrapper">
          https://www.youtube.com/watch?v=Ts4seBpirOA
          </div></figure>
          <!-- /wp:embed -->
          <!-- wp:group {"className":"mixCateVideoInfo"} -->
          <div class="wp-block-group mixCateVideoInfo">
            <!-- wp:heading {"level":3,"className":"mixCateVideoName"} -->
            <h3 class="wp-block-heading mixCateVideoName">Mixboutique nâng cấp TRÊN TÌNH BẠN DƯỚI TÌNH YÊU bên trong là TÌNH NHÂN 😍</h3>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"className":"mixCateVideoText"} -->
            <p class="mixCateVideoText">Xem trước không gian phòng dạng Shorts trước khi nhắn tư vấn.</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:group -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"mixFreePerks","metadata":{"name":"Tiện Ích Miễn Phí Khi Đặt Phòng"}} -->
<section class="wp-block-group mixFreePerks">
  <!-- wp:group {"className":"container"} -->
  <div class="wp-block-group container">
    <!-- wp:group {"className":"mixFreePerksWrap"} -->
    <div class="wp-block-group mixFreePerksWrap">
      <!-- wp:group {"className":"mixFreePerksMedia"} -->
      <div class="wp-block-group mixFreePerksMedia">
        <!-- wp:html -->
        <div class="mixFreePerksGlow"></div>
        <!-- /wp:html -->
        <!-- wp:group {"className":"mixFreePerksImage mixFreePerksImageLarge"} -->
        <div class="wp-block-group mixFreePerksImage mixFreePerksImageLarge">
          <!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
          <figure class="wp-block-image size-large"><img src="<?php echo esc_url($theme_uri . '/assets/tassets/images/cate-1.jpg'); ?>" alt="Đồ cosplay miễn phí khi đặt phòng Mix Hotel"/></figure>
          <!-- /wp:image -->
          <!-- wp:html -->
          <div class="mixFreePerksBadge"><span>FREE</span><small>Mượn tại quầy</small></div>
          <!-- /wp:html -->
        </div>
        <!-- /wp:group -->
        <!-- wp:group {"className":"mixFreePerksImage mixFreePerksImageSmall"} -->
        <div class="wp-block-group mixFreePerksImage mixFreePerksImageSmall">
          <!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
          <figure class="wp-block-image size-large"><img src="<?php echo esc_url($theme_uri . '/assets/tassets/images/cate-2.jpg'); ?>" alt="Đồ BDSM miễn phí khi đặt phòng Mix Hotel"/></figure>
          <!-- /wp:image -->
          <!-- wp:html -->
          <div class="mixFreePerksFloat"><span>03+</span><small>nhóm vật dụng</small></div>
          <!-- /wp:html -->
        </div>
        <!-- /wp:group -->
      </div>
      <!-- /wp:group -->
      <!-- wp:group {"className":"mixFreePerksContent"} -->
      <div class="wp-block-group mixFreePerksContent">
        <!-- wp:paragraph {"className":"mixFreePerksKicker"} -->
        <p class="mixFreePerksKicker"><span></span><em>Miễn phí khi đặt phòng</em></p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":2,"className":"mixFreePerksTitle"} -->
        <h2 class="wp-block-heading mixFreePerksTitle"><span>Tiện ích miễn phí</span><br /><span>khi đặt phòng</span></h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"mixFreePerksDesc"} -->
        <p class="mixFreePerksDesc">Mỗi phòng Mix đều có thể mượn thêm đồ cosplay, đồ BDSM và bộ bài Board Game tình yêu. Các vật dụng không để sẵn trong phòng để đảm bảo riêng tư và vệ sinh; khách vui lòng mượn tại quầy lễ tân khi checkin.</p>
        <!-- /wp:paragraph -->
        <!-- wp:columns {"className":"mixFreePerksGrid"} -->
        <div class="wp-block-columns mixFreePerksGrid">
          <!-- wp:column {"className":"mixFreePerksCard"} -->
          <div class="wp-block-column mixFreePerksCard">
            <!-- wp:paragraph {"className":"mixFreePerksIcon"} -->
            <p class="mixFreePerksIcon">✨</p>
            <!-- /wp:paragraph -->
            <!-- wp:heading {"level":3,"className":"mixFreePerksCardTitle"} -->
            <h3 class="wp-block-heading mixFreePerksCardTitle">Đồ cosplay</h3>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"className":"mixFreePerksCardText"} -->
            <p class="mixFreePerksCardText">Nhiều concept để đổi không khí buổi hẹn, nổi bật hơn khi nhận phòng.</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:column -->

          <!-- wp:column {"className":"mixFreePerksCard"} -->
          <div class="wp-block-column mixFreePerksCard">
            <!-- wp:paragraph {"className":"mixFreePerksIcon"} -->
            <p class="mixFreePerksIcon">🖤</p>
            <!-- /wp:paragraph -->
            <!-- wp:heading {"level":3,"className":"mixFreePerksCardTitle"} -->
            <h3 class="wp-block-heading mixFreePerksCardTitle">Đồ BDSM</h3>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"className":"mixFreePerksCardText"} -->
            <p class="mixFreePerksCardText">Bộ phụ kiện trải nghiệm miễn phí, mượn theo nhu cầu và tình trạng còn sẵn.</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:column -->

          <!-- wp:column {"className":"mixFreePerksCard"} -->
          <div class="wp-block-column mixFreePerksCard">
            <!-- wp:paragraph {"className":"mixFreePerksIcon"} -->
            <p class="mixFreePerksIcon">🃏</p>
            <!-- /wp:paragraph -->
            <!-- wp:heading {"level":3,"className":"mixFreePerksCardTitle"} -->
            <h3 class="wp-block-heading mixFreePerksCardTitle">Board Game tình yêu</h3>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"className":"mixFreePerksCardText"} -->
            <p class="mixFreePerksCardText">Bộ bài gợi mở câu chuyện, phù hợp cho buổi hẹn vui và tự nhiên hơn.</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:column -->
        </div>
        <!-- /wp:columns -->
        <!-- wp:group {"className":"mixFreePerksNote"} -->
        <div class="wp-block-group mixFreePerksNote">
          <!-- wp:paragraph -->
          <p>ℹ️ <strong>Cách nhận:</strong> Báo lễ tân khi checkin để mượn miễn phí, và gửi lại quầy khi checkout.</p>
          <!-- /wp:paragraph -->
        </div>
        <!-- /wp:group -->
        <!-- wp:buttons {"className":"mixFreePerksActions"} -->
        <div class="wp-block-buttons mixFreePerksActions">
          <!-- wp:button {"className":"mixFreePerksBtn mixFreePerksBtnPrimary"} -->
          <div class="wp-block-button mixFreePerksBtn mixFreePerksBtnPrimary"><a class="wp-block-button__link wp-element-button" href="https://zalo.me/0383104010" target="_blank" rel="noopener noreferrer">💬 Hỏi đồ mượn qua Zalo</a></div>
          <!-- /wp:button -->
          <!-- wp:button {"className":"mixFreePerksBtn mixFreePerksBtnGhost"} -->
          <div class="wp-block-button mixFreePerksBtn mixFreePerksBtnGhost"><a class="wp-block-button__link wp-element-button" href="#dat-phong">📝 Ghi chú khi đặt phòng</a></div>
          <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"cateEventDecor","metadata":{"name":"Gói Trang Trí Sự Kiện"}} -->
<section class="wp-block-group cateEventDecor">
  <!-- wp:group {"className":"container"} -->
  <div class="wp-block-group container">
    <!-- wp:group {"className":"cateEventDecorWrap"} -->
    <div class="wp-block-group cateEventDecorWrap">
      <!-- wp:group {"className":"cateEventDecorImageBox"} -->
      <div class="wp-block-group cateEventDecorImageBox">
        <!-- wp:html -->
        <div class="cateEventDecorImageGlow"></div>
        <!-- /wp:html -->
        <!-- wp:image {"sizeSlug":"large","linkDestination":"none","className":"cateEventDecorImage"} -->
        <figure class="wp-block-image size-large cateEventDecorImage"><img src="<?php echo esc_url($theme_uri . '/assets/tassets/images/home-6.jpg'); ?>" alt="Trang trí sinh nhật kỷ niệm cầu hôn"/></figure>
        <!-- /wp:image -->
        <!-- wp:html -->
        <div class="cateEventDecorLabel"><span>Từ 350k</span><small>Trang trí theo yêu cầu</small></div>
        <!-- /wp:html -->
      </div>
      <!-- /wp:group -->
      <!-- wp:group {"className":"cateEventDecorContent"} -->
      <div class="wp-block-group cateEventDecorContent">
        <!-- wp:paragraph {"className":"cateEventDecorSub"} -->
        <p class="cateEventDecorSub"><span></span><em>Thêm bất ngờ</em></p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":2,"className":"cateEventDecorTitle"} -->
        <h2 class="wp-block-heading cateEventDecorTitle"><span>Trang trí sinh nhật,</span><br /><span>kỷ niệm, cầu hôn</span></h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"cateEventDecorDesc"} -->
        <p class="cateEventDecorDesc">Gói trang trí giúp tăng giá trị mỗi lần đặt phòng và biến buổi hẹn thành một kỷ niệm có chủ ý hơn. Giá dưới đây chưa bao gồm tiền phòng.</p>
        <!-- /wp:paragraph -->
        <!-- wp:group {"className":"cateEventDecorList"} -->
        <div class="wp-block-group cateEventDecorList">
          <!-- wp:group {"className":"cateEventDecorItem"} -->
          <div class="wp-block-group cateEventDecorItem">
            <!-- wp:paragraph {"className":"cateEventDecorItemTop"} -->
            <p class="cateEventDecorItemTop"><span class="cateEventDecorItemName">Nến - hoa - bóng</span> <span class="cateEventDecorItemIcon">⭐</span></p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"cateEventDecorItemPrice"} -->
            <p class="cateEventDecorItemPrice">Deluxe 1.490k, VIP 1.990k</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
          <!-- wp:group {"className":"cateEventDecorItem"} -->
          <div class="wp-block-group cateEventDecorItem">
            <!-- wp:paragraph {"className":"cateEventDecorItemTop"} -->
            <p class="cateEventDecorItemTop"><span class="cateEventDecorItemName">Set rượu - hoa - nến</span> <span class="cateEventDecorItemIcon">🍷</span></p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"cateEventDecorItemPrice"} -->
            <p class="cateEventDecorItemPrice">590k</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
          <!-- wp:group {"className":"cateEventDecorItem"} -->
          <div class="wp-block-group cateEventDecorItem">
            <!-- wp:paragraph {"className":"cateEventDecorItemTop"} -->
            <p class="cateEventDecorItemTop"><span class="cateEventDecorItemName">Bánh kem</span> <span class="cateEventDecorItemIcon">🎂</span></p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"cateEventDecorItemPrice"} -->
            <p class="cateEventDecorItemPrice">350k</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
          <!-- wp:group {"className":"cateEventDecorItem"} -->
          <div class="wp-block-group cateEventDecorItem">
            <!-- wp:paragraph {"className":"cateEventDecorItemTop"} -->
            <p class="cateEventDecorItemTop"><span class="cateEventDecorItemName">Rượu + trái cây</span> <span class="cateEventDecorItemIcon">🥂</span></p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"cateEventDecorItemPrice"} -->
            <p class="cateEventDecorItemPrice">600k</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:group -->
        <!-- wp:group {"className":"cateEventDecorNotice"} -->
        <div class="wp-block-group cateEventDecorNotice">
          <!-- wp:paragraph {"className":"cateEventDecorNoticeText"} -->
          <p class="cateEventDecorNoticeText">ℹ️ Tiền cọc event không hoàn lại khi hủy phòng.</p>
          <!-- /wp:paragraph -->
        </div>
        <!-- /wp:group -->
        <!-- wp:buttons {"className":"cateEventDecorActions"} -->
        <div class="wp-block-buttons cateEventDecorActions">
          <!-- wp:button {"className":"cateEventDecorBtn cateEventDecorBtnMain"} -->
          <div class="wp-block-button cateEventDecorBtn cateEventDecorBtnMain"><a class="wp-block-button__link wp-element-button" href="https://zalo.me/0383104010" target="_blank" rel="noopener noreferrer">💬 Tư vấn gói trang trí</a></div>
          <!-- /wp:button -->
          <!-- wp:button {"className":"cateEventDecorBtn cateEventDecorBtnLine"} -->
          <div class="wp-block-button cateEventDecorBtn cateEventDecorBtnLine"><a class="wp-block-button__link wp-element-button" href="#dat-phong">📅 Đặt phòng ngay</a></div>
          <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"cateBookingSteps","metadata":{"name":"3 Bước Giữ Phòng Nhanh"}} -->
<section class="wp-block-group cateBookingSteps">
  <!-- wp:group {"className":"container"} -->
  <div class="wp-block-group container">
    <!-- wp:group {"className":"cateBookingStepsHead"} -->
    <div class="wp-block-group cateBookingStepsHead">
      <!-- wp:paragraph {"className":"cateBookingStepsSub"} -->
      <p class="cateBookingStepsSub"><span></span><em>Quy trình đặt phòng</em></p>
      <!-- /wp:paragraph -->
      <!-- wp:heading {"level":2,"className":"cateBookingStepsTitle"} -->
      <h2 class="wp-block-heading cateBookingStepsTitle"><span>3 bước để giữ</span><br /><span>phòng nhanh</span></h2>
      <!-- /wp:heading -->
    </div>
    <!-- /wp:group -->
    <!-- wp:columns {"className":"cateBookingStepsList"} -->
    <div class="wp-block-columns cateBookingStepsList">
      <!-- wp:column {"className":"cateBookingStepsItem"} -->
      <div class="wp-block-column cateBookingStepsItem">
        <!-- wp:paragraph {"className":"cateBookingStepsNumber"} -->
        <p class="cateBookingStepsNumber">01</p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":3,"className":"cateBookingStepsName"} -->
        <h3 class="wp-block-heading cateBookingStepsName">Nhắn nhu cầu</h3>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"cateBookingStepsText"} -->
        <p class="cateBookingStepsText">Gửi chi nhánh, ngày, khung giờ và nhu cầu nghỉ giờ, qua đêm hoặc trang trí.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:column -->

      <!-- wp:column {"className":"cateBookingStepsItem"} -->
      <div class="wp-block-column cateBookingStepsItem">
        <!-- wp:paragraph {"className":"cateBookingStepsNumber"} -->
        <p class="cateBookingStepsNumber">02</p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":3,"className":"cateBookingStepsName"} -->
        <h3 class="wp-block-heading cateBookingStepsName">Nhận tư vấn</h3>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"cateBookingStepsText"} -->
        <p class="cateBookingStepsText">Mix kiểm tra phòng trống, gửi ảnh phòng phù hợp và báo giá rõ trước khi xác nhận.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:column -->

      <!-- wp:column {"className":"cateBookingStepsItem"} -->
      <div class="wp-block-column cateBookingStepsItem">
        <!-- wp:paragraph {"className":"cateBookingStepsNumber"} -->
        <p class="cateBookingStepsNumber">03</p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":3,"className":"cateBookingStepsName"} -->
        <h3 class="wp-block-heading cateBookingStepsName">Giữ phòng</h3>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"cateBookingStepsText"} -->
        <p class="cateBookingStepsText">Chưa cọc giữ 15-20 phút. Các ca nghỉ dài, qua đêm, ngày đêm hoặc cuối tuần cần cọc 50%.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"cateConsultForm","anchor":"dat-phong","metadata":{"name":"Form Tư Vấn Nhanh"}} -->
<section class="wp-block-group cateConsultForm" id="dat-phong">
  <!-- wp:html -->
  <div class="cateConsultFormLight cateConsultFormLightLeft"></div>
  <div class="cateConsultFormLight cateConsultFormLightRight"></div>
  <!-- /wp:html -->
  <!-- wp:group {"className":"container"} -->
  <div class="wp-block-group container">
    <!-- wp:group {"className":"cateConsultFormWrap"} -->
    <div class="wp-block-group cateConsultFormWrap">
      <!-- wp:group {"className":"cateConsultFormContent"} -->
      <div class="wp-block-group cateConsultFormContent">
        <!-- wp:paragraph {"className":"cateConsultFormSub"} -->
        <p class="cateConsultFormSub"><span></span><em>Tư vấn nhanh</em></p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":2,"className":"cateConsultFormTitle"} -->
        <h2 class="wp-block-heading cateConsultFormTitle"><span>Gửi yêu cầu, Mix</span><br /><span>xác nhận phòng trống</span></h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"cateConsultFormDesc"} -->
        <p class="cateConsultFormDesc">Form không tự động cam kết còn phòng. Tư vấn viên sẽ liên hệ lại để xác nhận tình trạng phòng, khung giờ phù hợp và hướng dẫn giữ phòng.</p>
        <!-- /wp:paragraph -->
        <!-- wp:group {"className":"cateConsultFormBenefits"} -->
        <div class="wp-block-group cateConsultFormBenefits">
          <!-- wp:group {"className":"cateConsultFormBenefit"} -->
          <div class="wp-block-group cateConsultFormBenefit">
            <!-- wp:paragraph {"className":"cateConsultFormBenefitIcon"} -->
            <p class="cateConsultFormBenefitIcon">🔒</p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"cateConsultFormBenefitText"} -->
            <p class="cateConsultFormBenefitText">Bảo mật thông tin khách hàng, không chia sẻ cho bên thứ ba.</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
          <!-- wp:group {"className":"cateConsultFormBenefit"} -->
          <div class="wp-block-group cateConsultFormBenefit">
            <!-- wp:paragraph {"className":"cateConsultFormBenefitIcon"} -->
            <p class="cateConsultFormBenefitIcon">💳</p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"cateConsultFormBenefitText"} -->
            <p class="cateConsultFormBenefitText">Thanh toán tiền mặt tại quầy hoặc chuyển khoản ngân hàng.</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
          <!-- wp:group {"className":"cateConsultFormBenefit"} -->
          <div class="wp-block-group cateConsultFormBenefit">
            <!-- wp:paragraph {"className":"cateConsultFormBenefitIcon"} -->
            <p class="cateConsultFormBenefitIcon">📅</p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"className":"cateConsultFormBenefitText"} -->
            <p class="cateConsultFormBenefitText">Đã đặt cọc có thể đổi giờ/ngày trong 1-15 ngày, tùy tình trạng phòng trống.</p>
            <!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:group -->
      </div>
      <!-- /wp:group -->
      <!-- wp:group {"className":"cateConsultFormBox"} -->
      <div class="wp-block-group cateConsultFormBox">
        <!-- wp:html -->
        <div class="cateConsultFormGlow"></div>
        <form class="cateConsultFormMain" id="mixLandingBookingForm">
          <div id="mixLandingFormSuccess" style="display: none; padding: 16px; margin-bottom: 20px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #a7f3d0; font-size: 14px;">
            ✓ Yêu cầu của bạn đã được gửi thành công! Mix Hotel sẽ liên hệ xác nhận phòng trong ít phút.
          </div>
          <div class="cateConsultFormGrid">
            <div class="cateConsultFormField">
              <label for="landing_name">Họ và tên *</label>
              <input id="landing_name" name="customer_name" type="text" required placeholder="Nhập họ và tên" />
            </div>
            <div class="cateConsultFormField">
              <label for="landing_phone">Số điện thoại *</label>
              <input id="landing_phone" name="customer_phone" type="tel" required placeholder="Nhập số điện thoại" />
            </div>
            <div class="cateConsultFormField cateConsultFormFieldFull">
              <label for="landing_branch">Chi nhánh mong muốn</label>
              <div class="cateConsultFormSelectWrap">
                <select id="landing_branch" name="branch">
                  <option value="All">Chọn chi nhánh</option>
                  <?php foreach ($branches_data as $b) : ?>
                    <option value="<?php echo esc_attr($b['name']); ?>"><?php echo esc_html($b['name']); ?></option>
                  <?php endforeach; ?>
                </select>
              </div>
            </div>
            <div class="cateConsultFormField">
              <label for="landing_checkin_date">Ngày nhận phòng</label>
              <input id="landing_checkin_date" name="checkin_date" class="cateDateInput" type="date" min="<?php echo date('Y-m-d'); ?>" value="<?php echo date('Y-m-d'); ?>" />
            </div>
            <div class="cateConsultFormField">
              <label for="landing_checkout_date">Ngày trả phòng</label>
              <input id="landing_checkout_date" name="checkout_date" class="cateDateInput" type="date" min="<?php echo date('Y-m-d'); ?>" value="<?php echo date('Y-m-d', strtotime('+1 day')); ?>" />
            </div>
            <div class="cateConsultFormField">
              <label for="landing_checkin_time">Giờ vào</label>
              <input id="landing_checkin_time" name="checkin_time" class="cateTimeInput" type="time" value="14:00" />
            </div>
            <div class="cateConsultFormField">
              <label for="landing_checkout_time">Giờ ra</label>
              <input id="landing_checkout_time" name="checkout_time" class="cateTimeInput" type="time" value="12:00" />
            </div>
            <div class="cateConsultFormField">
              <label for="landing_demand">Nhu cầu</label>
              <div class="cateConsultFormSelectWrap">
                <select id="landing_demand" name="demand">
                  <option value="">Chọn nhu cầu</option>
                  <option value="Nghỉ giờ">Nghỉ giờ</option>
                  <option value="Qua đêm">Qua đêm</option>
                  <option value="Theo ngày">Theo ngày</option>
                  <option value="Tổ chức kỷ niệm">Tổ chức kỷ niệm</option>
                </select>
              </div>
            </div>
            <div class="cateConsultFormField">
              <label for="landing_room">Phòng quan tâm</label>
              <div class="cateConsultFormSelectWrap cateRoomSelects">
                <select id="landing_room" name="room_title">
                  <option value="">Chọn phòng nếu đã có ý thích</option>
                  <?php if (!empty($form_rooms_by_branch['All'])) : ?>
                    <?php foreach ($form_rooms_by_branch['All'] as $opt) : ?>
                      <option value="<?php echo esc_attr($opt['value']); ?>"><?php echo esc_html($opt['text']); ?></option>
                    <?php endforeach; ?>
                  <?php endif; ?>
                </select>
              </div>
            </div>
            <div class="cateConsultFormField cateConsultFormFieldFull">
              <label for="landing_note">Ghi chú</label>
              <textarea id="landing_note" name="customer_note" placeholder="Dịp kỷ niệm, cần bồn tắm, máy chiếu, decor..."></textarea>
            </div>
            <div class="cateConsultFormActions cateConsultFormFieldFull">
              <button type="submit" class="cateConsultFormBtn cateConsultFormBtnSubmit" id="landingSubmitBtn">
                <span>Gửi yêu cầu</span>
              </button>
              <a href="https://zalo.me/0383104010" target="_blank" rel="noreferrer" class="cateConsultFormBtn cateConsultFormBtnZalo" style="text-decoration: none;">
                <span>💬 Nhắn Zalo</span>
              </a>
            </div>
          </div>
        </form>
        <script>
          window.MixHotelLandingRooms = <?php echo json_encode($form_rooms_by_branch, JSON_HEX_TAG | JSON_HEX_AMP); ?>;
        </script>
        <!-- /wp:html -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"cateFaq","metadata":{"name":"Gỡ Băn Khoăn FAQ"}} -->
<section class="wp-block-group cateFaq">
  <!-- wp:group {"className":"container"} -->
  <div class="wp-block-group container">
    <!-- wp:group {"className":"cateFaqHead"} -->
    <div class="wp-block-group cateFaqHead">
      <!-- wp:paragraph {"className":"cateFaqSub"} -->
      <p class="cateFaqSub"><span></span><em>Câu hỏi thường gặp</em></p>
      <!-- /wp:paragraph -->
      <!-- wp:heading {"level":2,"className":"cateFaqTitle"} -->
      <h2 class="wp-block-heading cateFaqTitle"><span>Gỡ các băn khoăn</span><br /><span>trước khi đặt</span></h2>
      <!-- /wp:heading -->
      <!-- wp:paragraph {"className":"cateFaqDesc"} -->
      <p class="cateFaqDesc">Một số thông tin quan trọng giúp bạn chủ động hơn khi đặt phòng, giữ phòng và chuẩn bị cho buổi hẹn tại Mix.</p>
      <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->
    <!-- wp:html -->
    <div class="cateFaqGrid">
      <details class="cateFaqItem" open>
        <summary class="cateFaqQuestion">
          <span>Có giữ phòng khi chưa đặt cọc không?</span>
          <span style="color: #c88922;">+</span>
        </summary>
        <div class="cateFaqAnswer">
          Có. Mix giữ phòng 15-20 phút khi chưa cọc, có thể linh động đến 1 tiếng nếu thời tiết xấu.
        </div>
      </details>
      <details class="cateFaqItem" open>
        <summary class="cateFaqQuestion">
          <span>Khi nào cần đặt cọc 50%?</span>
          <span style="color: #c88922;">+</span>
        </summary>
        <div class="cateFaqAnswer">
          Nghỉ giờ trên 4 tiếng, qua đêm, ngày đêm và đặt phòng cuối tuần cần cọc 50% tổng tiền phòng.
        </div>
      </details>
      <details class="cateFaqItem" open>
        <summary class="cateFaqQuestion">
          <span>Có phụ thu cuối tuần hoặc ngày lễ không?</span>
          <span style="color: #c88922;">+</span>
        </summary>
        <div class="cateFaqAnswer">
          Theo thông tin hiện tại không có phụ thu cuối tuần/ngày lễ, nhưng cuối tuần cần đặt cọc để giữ phòng.
        </div>
      </details>
      <details class="cateFaqItem" open>
        <summary class="cateFaqQuestion">
          <span>Khách có được mang đồ ăn/uống vào không?</span>
          <span style="color: #c88922;">+</span>
        </summary>
        <div class="cateFaqAnswer">
          Có thể mang vào, hạn chế đồ nặng mùi. Hoa tươi, bánh sinh nhật, rượu từ ngoài có thể có phụ thu.
        </div>
      </details>
      <details class="cateFaqItem" open>
        <summary class="cateFaqQuestion">
          <span>Mix có nhận khách dưới 18 tuổi không?</span>
          <span style="color: #c88922;">+</span>
        </summary>
        <div class="cateFaqAnswer">
          Không. Mix chỉ nhận khách từ 18 tuổi.
        </div>
      </details>
      <details class="cateFaqItem" open>
        <summary class="cateFaqQuestion">
          <span>Đặt cọc rồi có đổi lịch được không?</span>
          <span style="color: #c88922;">+</span>
        </summary>
        <div class="cateFaqAnswer">
          Khách đã đặt cọc có thể đổi giờ hoặc ngày trong phạm vi 1-15 ngày, tùy tình trạng phòng trống.
        </div>
      </details>
    </div>
    <!-- /wp:html -->
    <!-- wp:group {"className":"cateFaqBottom"} -->
    <div class="wp-block-group cateFaqBottom">
      <!-- wp:paragraph {"className":"cateFaqBottomText"} -->
      <p class="cateFaqBottomText">Chưa thấy câu hỏi bạn cần? Nhắn Mix để được tư vấn nhanh trước khi đặt phòng.</p>
      <!-- /wp:paragraph -->
      <!-- wp:buttons -->
      <div class="wp-block-buttons">
        <!-- wp:button {"className":"cateFaqBtn"} -->
        <div class="wp-block-button cateFaqBtn"><a class="wp-block-button__link wp-element-button" href="https://zalo.me/0383104010" target="_blank" rel="noopener noreferrer">💬 Hỏi nhanh qua Zalo</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"catePremiumCta","anchor":"booking","metadata":{"name":"CTA Đặt Phòng Hôm Nay"}} -->
<section class="wp-block-group catePremiumCta" id="booking">
  <!-- wp:group {"className":"container"} -->
  <div class="wp-block-group container">
    <!-- wp:group {"className":"catePremiumCtaWrap"} -->
    <div class="wp-block-group catePremiumCtaWrap">
      <!-- wp:html -->
      <img
        src="<?php echo esc_url($theme_uri . '/assets/external/photo-1618221195710-dd6b41faaea6'); ?>"
        alt="Đặt phòng khách sạn tình yêu Mix Hotel"
        class="catePremiumCtaBg"
      />
      <div class="catePremiumCtaShade"></div>
      <!-- /wp:html -->
      <!-- wp:group {"className":"catePremiumCtaContent"} -->
      <div class="wp-block-group catePremiumCtaContent">
        <!-- wp:paragraph {"className":"catePremiumCtaKicker"} -->
        <p class="catePremiumCtaKicker"><span></span><em>Đặt phòng hôm nay</em></p>
        <!-- /wp:paragraph -->
        <!-- wp:heading {"level":2,"className":"catePremiumCtaTitle"} -->
        <h2 class="wp-block-heading catePremiumCtaTitle"><span>Chọn chi nhánh gần bạn,</span><br /><span>Mix tư vấn phòng phù hợp</span><br /><span>trong vài phút</span></h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"className":"catePremiumCtaText"} -->
        <p class="catePremiumCtaText">Nhận ảnh thật, giá rõ ràng, tư vấn kín đáo và giữ phòng nhanh qua Zalo hoặc hotline.</p>
        <!-- /wp:paragraph -->
        <!-- wp:buttons {"className":"catePremiumCtaActions"} -->
        <div class="wp-block-buttons catePremiumCtaActions">
          <!-- wp:button {"className":"catePremiumCtaBtn catePremiumCtaBtnMain"} -->
          <div class="wp-block-button catePremiumCtaBtn catePremiumCtaBtnMain"><a class="wp-block-button__link wp-element-button" href="https://zalo.me/0383104010" target="_blank" rel="noopener noreferrer">💬 Nhắn Zalo tư vấn</a></div>
          <!-- /wp:button -->
          <!-- wp:button {"className":"catePremiumCtaBtn catePremiumCtaBtnSub"} -->
          <div class="wp-block-button catePremiumCtaBtn catePremiumCtaBtnSub"><a class="wp-block-button__link wp-element-button" href="tel:0383104010">☎ Gọi ngay</a></div>
          <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
      </div>
      <!-- /wp:group -->
      <!-- wp:html -->
      <div class="catePremiumCtaInfo">
        <div class="catePremiumCtaInfoItem"><span>01</span><p>Xem ảnh phòng thật</p></div>
        <div class="catePremiumCtaInfoItem"><span>02</span><p>Chọn chi nhánh gần nhất</p></div>
        <div class="catePremiumCtaInfoItem"><span>03</span><p>Giữ phòng nhanh qua Zalo</p></div>
      </div>
      <!-- /wp:html -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"content-frame-section py-16","metadata":{"name":"Bài Viết Cẩm Nang SEO"}} -->
<section class="wp-block-group content-frame-section py-16">
  <!-- wp:group {"className":"container"} -->
  <div class="wp-block-group container">
    <!-- wp:group {"className":"content-frame"} -->
    <div class="wp-block-group content-frame">
      <!-- wp:html -->
      <div class="tableOfContent appearContent">
        <div
          class="title"
          id="tocToggleHeader"
          style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-weight: 700; color: #ffe2a0;"
        >
          <span>Nội dung bài viết:</span>
          <span id="tocToggleIcon" style="font-size: 16px;">▾</span>
        </div>
        <div class="mucLucPart" id="bookmark-list">
          <ul>
            <?php foreach ($article_toc as $item) : ?>
              <li class="<?php echo !empty($item['isSub']) ? 'sub_data' : 'data'; ?>">
                <a href="<?php echo esc_attr($item['href']); ?>"><?php echo esc_html($item['title']); ?></a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
      <!-- /wp:html -->
      <!-- wp:html -->
      <div class="content-body size-1vw data_contents mt-10" style="margin-top: 40px; color: #eee4d3; line-height: 1.8;">
        <?php echo $article_html; ?>
      </div>
      <!-- /wp:html -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->
</section>
<!-- /wp:group -->
