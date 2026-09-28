<?php
/**
 * Title: Phòng Concept Nổi Bật
 * Slug: mixhotel/concept-rooms
 * Categories: mixhotel
 * Keywords: concept, phòng, room
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
$img_karma     = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('room-302-karma.jpg') : ['id' => 0, 'url' => $theme_uri . '/assets/images/room-302-karma.jpg'];
$img_katana    = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('room-401-katana.jpg') : ['id' => 0, 'url' => $theme_uri . '/assets/images/room-401-katana.jpg'];
$img_amora     = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('room-402-amora.jpg') : ['id' => 0, 'url' => $theme_uri . '/assets/images/room-402-amora.jpg'];
$img_cloudnine = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('room-469-cloudnine.jpg') : ['id' => 0, 'url' => $theme_uri . '/assets/images/room-469-cloudnine.jpg'];
?>
<!-- wp:group {"tagName":"section","className":"mix-section mix-section--dark-3","anchor":"concept","lock":{"move":true,"remove":true},"metadata":{"name":"Phòng Concept Nổi Bật"}} -->
<section id="concept" class="wp-block-group mix-section mix-section--dark-3">

<!-- wp:group {"className":"mix-container"} -->
<div class="wp-block-group mix-container">

<!-- wp:group {"className":"mix-section-head"} -->
<div class="wp-block-group mix-section-head">
<!-- wp:paragraph {"className":"mix-section-kicker"} -->
<p class="mix-section-kicker">CONCEPT PHÒNG NỔI BẬT</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"className":"mix-section-title"} -->
<h2 class="wp-block-heading mix-section-title">Lãng mạn và huyền bí</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"mix-section-desc"} -->
<p class="mix-section-desc">Mỗi căn phòng là một concept riêng biệt, được thiết kế để biến mọi khoảnh khắc hẹn hò trở nên thăng hoa và đáng nhớ.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"mixLuxuryConceptStack","lock":{"move":true,"remove":true},"metadata":{"name":"Danh Sách Phòng Concept"}} -->
<div class="wp-block-group mixLuxuryConceptStack">

  <!-- wp:group {"tagName":"article","className":"mixLuxuryRoomCard mixLuxuryConceptCard","lock":{"move":true,"remove":true},"metadata":{"name":"Phòng Karma"}} -->
  <article class="wp-block-group mixLuxuryRoomCard mixLuxuryConceptCard">
  <!-- wp:columns {"verticalAlignment":"center","className":"mixLuxuryConceptGrid"} -->
  <div class="wp-block-columns are-vertically-aligned-center mixLuxuryConceptGrid">
    <!-- wp:column {"verticalAlignment":"center"} -->
    <div class="wp-block-column is-vertically-aligned-center">
      <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px"}},"textColor":"contrast"} -->
      <p class="has-contrast-color has-text-color" style="font-size:12px;margin-bottom:6px"><span>Concept riêng tư</span> • <strong style="color:#c5a880">Mix Boutique Hotel</strong></p>
      <!-- /wp:paragraph -->
      <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"26px"}}} -->
      <h3 class="wp-block-heading" style="font-size:26px;margin:0 0 14px">Room 302 - Karma</h3>
      <!-- /wp:heading -->
      <!-- wp:paragraph {"className":"mixLuxuryRoomFeatures"} -->
      <p class="mixLuxuryRoomFeatures"><span class="mixLuxuryRoomFeatureBadge">Smart Tivi có Netflix</span><span class="mixLuxuryRoomFeatureBadge">Giường tròn</span><span class="mixLuxuryRoomFeatureBadge">Cosplay</span></p>
      <!-- /wp:paragraph -->
      <!-- wp:paragraph {"style":{"typography":{"fontSize":"13.5px","lineHeight":"1.6"}}} -->
      <p style="font-size:13.5px;lineHeight:1.6;margin-bottom:24px;text-align:justify">Karma được thiết kế theo phong cách gợi cảm và huyền bí, với tông màu đỏ nóng bỏng làm chủ đạo. Điểm nhấn độc đáo của căn phòng là những bức tranh Kamasutra được sắp xếp dọc theo bức tường phía đầu giường và trên trần nhà, tạo nên một không gian đầy tính nghệ thuật và kích thích.</p>
      <!-- /wp:paragraph -->
      <!-- wp:buttons {"className":"mixLuxuryRoomActions"} -->
      <div class="wp-block-buttons mixLuxuryRoomActions">
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary mix-btn-booking"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnPrimary mix-btn-booking"><a class="wp-block-button__link wp-element-button" href="#booking">Hỏi phòng Room 302 - Karma</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="/khach-san-tinh-yeu/karma/">Xem chi tiết phòng</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:column -->
    <!-- wp:column {"verticalAlignment":"center"} -->
    <div class="wp-block-column is-vertically-aligned-center">
      <!-- wp:group {"className":"mixLuxuryRoomThumb"} -->
      <div class="wp-block-group mixLuxuryRoomThumb">
        <!-- wp:image {"id":<?php echo (int) $img_karma['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
        <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_karma['url']); ?>" alt="Room 302 - Karma" class="wp-image-<?php echo (int) $img_karma['id']; ?>"/></figure>
        <!-- /wp:image -->
        <!-- wp:paragraph {"className":"mixLuxuryRoomTag"} -->
        <p class="mixLuxuryRoomTag">01 • Boutique Room</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->
  </div>
  <!-- /wp:columns -->
  </article>
  <!-- /wp:group -->

  <!-- wp:group {"tagName":"article","className":"mixLuxuryRoomCard mixLuxuryConceptCard","lock":{"move":true,"remove":true},"metadata":{"name":"Phòng Katana"}} -->
  <article class="wp-block-group mixLuxuryRoomCard mixLuxuryConceptCard">
  <!-- wp:columns {"verticalAlignment":"center","className":"mixLuxuryConceptGrid"} -->
  <div class="wp-block-columns are-vertically-aligned-center mixLuxuryConceptGrid">
    <!-- wp:column {"verticalAlignment":"center"} -->
    <div class="wp-block-column is-vertically-aligned-center">
      <!-- wp:group {"className":"mixLuxuryRoomThumb"} -->
      <div class="wp-block-group mixLuxuryRoomThumb">
        <!-- wp:image {"id":<?php echo (int) $img_katana['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
        <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_katana['url']); ?>" alt="VIP Room 401 - Katana" class="wp-image-<?php echo (int) $img_katana['id']; ?>"/></figure>
        <!-- /wp:image -->
        <!-- wp:paragraph {"className":"mixLuxuryRoomTag"} -->
        <p class="mixLuxuryRoomTag">02 • VIP Room</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->
    <!-- wp:column {"verticalAlignment":"center"} -->
    <div class="wp-block-column is-vertically-aligned-center">
      <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px"}},"textColor":"contrast"} -->
      <p class="has-contrast-color has-text-color" style="font-size:12px;margin-bottom:6px"><span>Concept Nhật Bản</span> • <strong style="color:#c5a880">Mix Boutique Hotel</strong></p>
      <!-- /wp:paragraph -->
      <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"26px"}}} -->
      <h3 class="wp-block-heading" style="font-size:26px;margin:0 0 14px">VIP Room 401 - Katana</h3>
      <!-- /wp:heading -->
      <!-- wp:paragraph {"className":"mixLuxuryRoomFeatures"} -->
      <p class="mixLuxuryRoomFeatures"><span class="mixLuxuryRoomFeatureBadge">Ghế tình yêu</span><span class="mixLuxuryRoomFeatureBadge">Bồn tắm</span><span class="mixLuxuryRoomFeatureBadge">Smart Tivi Netflix</span><span class="mixLuxuryRoomFeatureBadge">Dụng cụ BDSM</span></p>
      <!-- /wp:paragraph -->
      <!-- wp:paragraph {"style":{"typography":{"fontSize":"13.5px","lineHeight":"1.6"}}} -->
      <p style="font-size:13.5px;lineHeight:1.6;margin-bottom:24px;text-align:justify">Katana được thiết kế theo phong cách Nhật Bản truyền thống nhưng cũng không kém phần hiện đại và lãng mạn. Căn phòng lấy tông màu đỏ đậm và đen làm chủ đạo, tạo nên một không gian ấm cúng và gợi cảm với tranh Geisha lớn phía đầu giường.</p>
      <!-- /wp:paragraph -->
      <!-- wp:buttons {"className":"mixLuxuryRoomActions"} -->
      <div class="wp-block-buttons mixLuxuryRoomActions">
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary mix-btn-booking"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnPrimary mix-btn-booking"><a class="wp-block-button__link wp-element-button" href="#booking">Hỏi phòng Room 401 - Katana</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="/khach-san-tinh-yeu/katana/">Xem chi tiết phòng</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:column -->
  </div>
  <!-- /wp:columns -->
  </article>
  <!-- /wp:group -->

  <!-- wp:group {"tagName":"article","className":"mixLuxuryRoomCard mixLuxuryConceptCard","lock":{"move":true,"remove":true},"metadata":{"name":"Phòng Amora"}} -->
  <article class="wp-block-group mixLuxuryRoomCard mixLuxuryConceptCard">
  <!-- wp:columns {"verticalAlignment":"center","className":"mixLuxuryConceptGrid"} -->
  <div class="wp-block-columns are-vertically-aligned-center mixLuxuryConceptGrid">
    <!-- wp:column {"verticalAlignment":"center"} -->
    <div class="wp-block-column is-vertically-aligned-center">
      <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px"}},"textColor":"contrast"} -->
      <p class="has-contrast-color has-text-color" style="font-size:12px;margin-bottom:6px"><span>Trần sao lãng mạn</span> • <strong style="color:#c5a880">Mix Boutique Hotel</strong></p>
      <!-- /wp:paragraph -->
      <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"26px"}}} -->
      <h3 class="wp-block-heading" style="font-size:26px;margin:0 0 14px">Room 402 - Amora</h3>
      <!-- /wp:heading -->
      <!-- wp:paragraph {"className":"mixLuxuryRoomFeatures"} -->
      <p class="mixLuxuryRoomFeatures"><span class="mixLuxuryRoomFeatureBadge">Cosplay</span><span class="mixLuxuryRoomFeatureBadge">Trần sao lung linh</span><span class="mixLuxuryRoomFeatureBadge">Cửa kính thiên nhiên</span></p>
      <!-- /wp:paragraph -->
      <!-- wp:paragraph {"style":{"typography":{"fontSize":"13.5px","lineHeight":"1.6"}}} -->
      <p style="font-size:13.5px;lineHeight:1.6;margin-bottom:24px;text-align:justify">Amora mang đến một không gian lãng mạn và gần gũi với thiên nhiên. Căn phòng được thiết kế theo phong cách ấm áp, với trần nhà bằng gỗ và những dây đèn lấp lánh như bầu trời sao, tạo cảm giác thư giãn và mơ mộng.</p>
      <!-- /wp:paragraph -->
      <!-- wp:buttons {"className":"mixLuxuryRoomActions"} -->
      <div class="wp-block-buttons mixLuxuryRoomActions">
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary mix-btn-booking"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnPrimary mix-btn-booking"><a class="wp-block-button__link wp-element-button" href="#booking">Hỏi phòng Room 402 - Amora</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="/khach-san-tinh-yeu/amora/">Xem chi tiết phòng</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:column -->
    <!-- wp:column {"verticalAlignment":"center"} -->
    <div class="wp-block-column is-vertically-aligned-center">
      <!-- wp:group {"className":"mixLuxuryRoomThumb"} -->
      <div class="wp-block-group mixLuxuryRoomThumb">
        <!-- wp:image {"id":<?php echo (int) $img_amora['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
        <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_amora['url']); ?>" alt="Room 402 - Amora" class="wp-image-<?php echo (int) $img_amora['id']; ?>"/></figure>
        <!-- /wp:image -->
        <!-- wp:paragraph {"className":"mixLuxuryRoomTag"} -->
        <p class="mixLuxuryRoomTag">03 • Boutique Room</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->
  </div>
  <!-- /wp:columns -->
  </article>
  <!-- /wp:group -->

  <!-- wp:group {"tagName":"article","className":"mixLuxuryRoomCard mixLuxuryConceptCard","lock":{"move":true,"remove":true},"metadata":{"name":"Phòng Cloud Nine"}} -->
  <article class="wp-block-group mixLuxuryRoomCard mixLuxuryConceptCard">
  <!-- wp:columns {"verticalAlignment":"center","className":"mixLuxuryConceptGrid"} -->
  <div class="wp-block-columns are-vertically-aligned-center mixLuxuryConceptGrid">
    <!-- wp:column {"verticalAlignment":"center"} -->
    <div class="wp-block-column is-vertically-aligned-center">
      <!-- wp:group {"className":"mixLuxuryRoomThumb"} -->
      <div class="wp-block-group mixLuxuryRoomThumb">
        <!-- wp:image {"id":<?php echo (int) $img_cloudnine['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
        <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_cloudnine['url']); ?>" alt="VIP Room 469 - Cloud Nine" class="wp-image-<?php echo (int) $img_cloudnine['id']; ?>"/></figure>
        <!-- /wp:image -->
        <!-- wp:paragraph {"className":"mixLuxuryRoomTag"} -->
        <p class="mixLuxuryRoomTag">04 • VIP Room</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:column -->
    <!-- wp:column {"verticalAlignment":"center"} -->
    <div class="wp-block-column is-vertically-aligned-center">
      <!-- wp:paragraph {"style":{"typography":{"fontSize":"12px"}},"textColor":"contrast"} -->
      <p class="has-contrast-color has-text-color" style="font-size:12px;margin-bottom:6px"><span>Bồn tắm Jacuzzi &amp; Máy chiếu</span> • <strong style="color:#c5a880">Mix Boutique Hotel</strong></p>
      <!-- /wp:paragraph -->
      <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"26px"}}} -->
      <h3 class="wp-block-heading" style="font-size:26px;margin:0 0 14px">VIP Room 469 - Cloud Nine</h3>
      <!-- /wp:heading -->
      <!-- wp:paragraph {"className":"mixLuxuryRoomFeatures"} -->
      <p class="mixLuxuryRoomFeatures"><span class="mixLuxuryRoomFeatureBadge">Bồn tắm Jacuzzi</span><span class="mixLuxuryRoomFeatureBadge">Máy chiếu phim</span><span class="mixLuxuryRoomFeatureBadge">Cosplay</span></p>
      <!-- /wp:paragraph -->
      <!-- wp:paragraph {"style":{"typography":{"fontSize":"13.5px","lineHeight":"1.6"}}} -->
      <p style="font-size:13.5px;lineHeight:1.6;margin-bottom:24px;text-align:justify">Cloud Nine mang đến một không gian lãng mạn và hiện đại, lấy cảm hứng từ bầu trời đêm đầy sao với trần nhà trang trí hàng trăm bóng đèn lấp lánh và bồn tắm Jacuzzi lớn đặt ngay trong không gian mở.</p>
      <!-- /wp:paragraph -->
      <!-- wp:buttons {"className":"mixLuxuryRoomActions"} -->
      <div class="wp-block-buttons mixLuxuryRoomActions">
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary mix-btn-booking"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnPrimary mix-btn-booking"><a class="wp-block-button__link wp-element-button" href="#booking">Hỏi phòng Cloud Nine</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
        <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="/khach-san-tinh-yeu/cloud-nine/">Xem chi tiết phòng</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:column -->
  </div>
  <!-- /wp:columns -->
  </article>
  <!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</section>
<!-- /wp:group -->
