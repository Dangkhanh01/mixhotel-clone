<?php
/**
 * Title: Ảnh Thật Phòng Thật (Photo Stage)
 * Slug: mixhotel/real-photos-grid
 * Categories: mixhotel
 * Keywords: photos, ảnh thật, gallery
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
$img_featured = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('photo-stage-featured.webp') : ['id' => 0, 'url' => $theme_uri . '/assets/images/photo-stage-featured.webp'];
$img_bdsm     = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('photo-tile-bdsm.webp') : ['id' => 0, 'url' => $theme_uri . '/assets/images/photo-tile-bdsm.webp'];
$img_bathtub  = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('photo-tile-bathtub.webp') : ['id' => 0, 'url' => $theme_uri . '/assets/images/photo-tile-bathtub.webp'];
$img_cosplay  = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('photo-tile-cosplay.jpg') : ['id' => 0, 'url' => $theme_uri . '/assets/images/photo-tile-cosplay.jpg'];
$img_tantra   = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('photo-tile-tantra.webp') : ['id' => 0, 'url' => $theme_uri . '/assets/images/photo-tile-tantra.webp'];
$img_netflix  = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('photo-tile-netflix.webp') : ['id' => 0, 'url' => $theme_uri . '/assets/images/photo-tile-netflix.webp'];
?>
<!-- wp:group {"tagName":"section","className":"mix-section mix-section--dark-3","anchor":"real-photos","lock":{"move":true,"remove":true},"metadata":{"name":"Ảnh Thật Phòng Thật (Photo Stage)"}} -->
<section id="real-photos" class="wp-block-group mix-section mix-section--dark-3">

<!-- wp:group {"className":"mix-container"} -->
<div class="wp-block-group mix-container">

<!-- wp:group {"className":"mix-section-head"} -->
<div class="wp-block-group mix-section-head">
<!-- wp:paragraph {"className":"mix-section-kicker"} -->
<p class="mix-section-kicker">ẢNH THẬT PHÒNG THẬT</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"className":"mix-section-title"} -->
<h2 class="wp-block-heading mix-section-title">Xem ảnh thật 100% từng phòng để dễ dàng chọn không gian trước khi đặt</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"mix-section-desc"} -->
<p class="mix-section-desc">Mỗi hạng phòng đều có ảnh thực tế của bồn tắm, máy chiếu, ghế tình yêu, gương trần và các tiện nghi nổi bật.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"mixLuxuryPhotosStage","lock":{"move":true,"remove":true},"metadata":{"name":"Lưới Ảnh Thật"}} -->
<div class="wp-block-group mixLuxuryPhotosStage">

  <!-- wp:group {"className":"mixLuxuryPhotoMain","lock":{"move":true,"remove":true},"metadata":{"name":"Featured Room"}} -->
  <div class="wp-block-group mixLuxuryPhotoMain" data-contact-action="zalo" data-room-title="Featured Room Mix Boutique">
    <!-- wp:image {"id":<?php echo (int) $img_featured['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
    <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_featured['url']); ?>" alt="Ảnh thật phòng VIP Mix Boutique Hotel" class="wp-image-<?php echo (int) $img_featured['id']; ?>"/></figure>
    <!-- /wp:image -->

    <!-- wp:group {"className":"mixLuxuryPhotoBadge"} -->
    <div class="wp-block-group mixLuxuryPhotoBadge">
      <!-- wp:paragraph {"className":"mixLuxuryPhotoBadgeNumber"} -->
      <p class="mixLuxuryPhotoBadgeNumber">01</p>
      <!-- /wp:paragraph -->
      <!-- wp:paragraph {"className":"mixLuxuryPhotoBadgeLabel"} -->
      <p class="mixLuxuryPhotoBadgeLabel">Featured room</p>
      <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"className":"mixLuxuryPhotoMainCaption"} -->
    <div class="wp-block-group mixLuxuryPhotoMainCaption">
      <!-- wp:paragraph {"className":"mixLuxuryPhotoTileKicker"} -->
      <p class="mixLuxuryPhotoTileKicker">ẢNH NỔI BẬT</p>
      <!-- /wp:paragraph -->
      <!-- wp:heading {"level":3,"className":"mixLuxuryPhotoTileTitle"} -->
      <h3 class="wp-block-heading mixLuxuryPhotoTileTitle" style="font-size:20px">Không gian boutique riêng tư, ánh sáng rõ và có gu</h3>
      <!-- /wp:heading -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->

  <!-- wp:group {"className":"mixLuxuryPhotoGrid","lock":{"move":true,"remove":true},"metadata":{"name":"Subgrid 5 ảnh"}} -->
  <div class="wp-block-group mixLuxuryPhotoGrid">

    <!-- wp:group {"className":"mixLuxuryPhotoTile mixLuxuryPhotoTileLarge","lock":{"move":true,"remove":true},"metadata":{"name":"Tile BDSM"}} -->
    <div class="wp-block-group mixLuxuryPhotoTile mixLuxuryPhotoTileLarge" data-contact-action="zalo" data-room-title="Hot Concept Dụng Cụ BDSM">
      <!-- wp:image {"id":<?php echo (int) $img_bdsm['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
      <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_bdsm['url']); ?>" alt="Dụng cụ BDSM" class="wp-image-<?php echo (int) $img_bdsm['id']; ?>"/></figure>
      <!-- /wp:image -->
      <!-- wp:group {"className":"mixLuxuryPhotoTileCaption"} -->
      <div class="wp-block-group mixLuxuryPhotoTileCaption">
        <!-- wp:paragraph {"className":"mixLuxuryPhotoTileKicker hot"} -->
        <p class="mixLuxuryPhotoTileKicker hot">HOT CONCEPT</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryPhotoTileTitle"} -->
        <p class="mixLuxuryPhotoTileTitle"><strong>Dụng cụ BDSM</strong></p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"className":"mixLuxuryPhotoTile","lock":{"move":true,"remove":true},"metadata":{"name":"Tile Bathtub"}} -->
    <div class="wp-block-group mixLuxuryPhotoTile" data-contact-action="zalo" data-room-title="Phòng Bồn Tắm Jacuzzi">
      <!-- wp:image {"id":<?php echo (int) $img_bathtub['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
      <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_bathtub['url']); ?>" alt="Bồn tắm Jacuzzi" class="wp-image-<?php echo (int) $img_bathtub['id']; ?>"/></figure>
      <!-- /wp:image -->
      <!-- wp:group {"className":"mixLuxuryPhotoTileCaption"} -->
      <div class="wp-block-group mixLuxuryPhotoTileCaption">
        <!-- wp:paragraph {"className":"mixLuxuryPhotoTileKicker"} -->
        <p class="mixLuxuryPhotoTileKicker">Bathtub room</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryPhotoTileTitle"} -->
        <p class="mixLuxuryPhotoTileTitle"><strong>Bồn tắm Jacuzzi</strong></p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"className":"mixLuxuryPhotoTile","lock":{"move":true,"remove":true},"metadata":{"name":"Tile Cosplay"}} -->
    <div class="wp-block-group mixLuxuryPhotoTile" data-contact-action="zalo" data-room-title="Phòng Cosplay Lãng Mạn">
      <!-- wp:image {"id":<?php echo (int) $img_cosplay['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
      <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_cosplay['url']); ?>" alt="Cosplay" class="wp-image-<?php echo (int) $img_cosplay['id']; ?>"/></figure>
      <!-- /wp:image -->
      <!-- wp:group {"className":"mixLuxuryPhotoTileCaption"} -->
      <div class="wp-block-group mixLuxuryPhotoTileCaption">
        <!-- wp:paragraph {"className":"mixLuxuryPhotoTileKicker"} -->
        <p class="mixLuxuryPhotoTileKicker">Romantic</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryPhotoTileTitle"} -->
        <p class="mixLuxuryPhotoTileTitle"><strong>Cosplay</strong></p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"className":"mixLuxuryPhotoTile","lock":{"move":true,"remove":true},"metadata":{"name":"Tile Tantra"}} -->
    <div class="wp-block-group mixLuxuryPhotoTile" data-contact-action="zalo" data-room-title="Phòng Ghế Tình Yêu Tantra">
      <!-- wp:image {"id":<?php echo (int) $img_tantra['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
      <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_tantra['url']); ?>" alt="Ghế tình yêu" class="wp-image-<?php echo (int) $img_tantra['id']; ?>"/></figure>
      <!-- /wp:image -->
      <!-- wp:group {"className":"mixLuxuryPhotoTileCaption"} -->
      <div class="wp-block-group mixLuxuryPhotoTileCaption">
        <!-- wp:paragraph {"className":"mixLuxuryPhotoTileKicker"} -->
        <p class="mixLuxuryPhotoTileKicker">Boutique mood</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryPhotoTileTitle"} -->
        <p class="mixLuxuryPhotoTileTitle"><strong>Ghế tình yêu</strong></p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"className":"mixLuxuryPhotoTile","lock":{"move":true,"remove":true},"metadata":{"name":"Tile Netflix"}} -->
    <div class="wp-block-group mixLuxuryPhotoTile" data-contact-action="zalo" data-room-title="Phòng Smart Tivi Có Netflix">
      <!-- wp:image {"id":<?php echo (int) $img_netflix['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
      <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_netflix['url']); ?>" alt="Smart Tivi có Netflix" class="wp-image-<?php echo (int) $img_netflix['id']; ?>"/></figure>
      <!-- /wp:image -->
      <!-- wp:group {"className":"mixLuxuryPhotoTileCaption"} -->
      <div class="wp-block-group mixLuxuryPhotoTileCaption">
        <!-- wp:paragraph {"className":"mixLuxuryPhotoTileKicker"} -->
        <p class="mixLuxuryPhotoTileKicker">Netflix &amp; Chill</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryPhotoTileTitle"} -->
        <p class="mixLuxuryPhotoTileTitle"><strong>Smart Tivi có Netflix</strong></p>
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
