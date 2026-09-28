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

<!-- wp:html -->
    <!-- Photo Stage Grid -->
    <div class="mixLuxuryPhotosStage">
      <!-- Main Featured Room -->
      <div class="mixLuxuryPhotoMain" data-contact-action="zalo" data-room-title="Featured Room Mix Boutique">
        <img
          src="<?php echo esc_url( $theme_uri . '/assets/images/photo-stage-featured.webp' ); ?>"
          alt="Ảnh thật phòng VIP Mix Boutique Hotel"
          loading="lazy"
        />
        <div class="mixLuxuryPhotoMainOverlay"></div>

        <div class="mixLuxuryPhotoBadge">
          <span class="mixLuxuryPhotoBadgeNumber">01</span>
          <strong class="mixLuxuryPhotoBadgeLabel">Featured room</strong>
        </div>

        <div class="mixLuxuryPhotoMainCaption">
          <span class="mixLuxuryPhotoTileKicker">ẢNH NỔI BẬT</span>
          <h3 class="mixLuxuryPhotoTileTitle" style="font-size: 20px;">Không gian boutique riêng tư, ánh sáng rõ và có gu</h3>
        </div>
      </div>

      <!-- 5-tile Subgrid -->
      <div class="mixLuxuryPhotoGrid">
        <!-- Tile 1: BDSM (Large) -->
        <div class="mixLuxuryPhotoTile mixLuxuryPhotoTileLarge" data-contact-action="zalo" data-room-title="Hot Concept Dụng Cụ BDSM">
          <img
            src="<?php echo esc_url( $theme_uri . '/assets/images/photo-tile-bdsm.webp' ); ?>"
            alt="Dụng cụ BDSM"
            loading="lazy"
          />
          <div class="mixLuxuryPhotoMainOverlay"></div>
          <div class="mixLuxuryPhotoTileCaption">
            <span class="mixLuxuryPhotoTileKicker hot">HOT CONCEPT</span>
            <strong class="mixLuxuryPhotoTileTitle">Dụng cụ BDSM</strong>
          </div>
        </div>

        <!-- Tile 2: Jacuzzi Bathtub -->
        <div class="mixLuxuryPhotoTile" data-contact-action="zalo" data-room-title="Phòng Bồn Tắm Jacuzzi">
          <img
            src="<?php echo esc_url( $theme_uri . '/assets/images/photo-tile-bathtub.webp' ); ?>"
            alt="Bồn tắm Jacuzzi"
            loading="lazy"
          />
          <div class="mixLuxuryPhotoMainOverlay"></div>
          <div class="mixLuxuryPhotoTileCaption">
            <span class="mixLuxuryPhotoTileKicker">Bathtub room</span>
            <strong class="mixLuxuryPhotoTileTitle">Bồn tắm Jacuzzi</strong>
          </div>
        </div>

        <!-- Tile 3: Cosplay -->
        <div class="mixLuxuryPhotoTile" data-contact-action="zalo" data-room-title="Phòng Cosplay Lãng Mạn">
          <img
            src="<?php echo esc_url( $theme_uri . '/assets/images/photo-tile-cosplay.jpg' ); ?>"
            alt="Cosplay"
            loading="lazy"
          />
          <div class="mixLuxuryPhotoMainOverlay"></div>
          <div class="mixLuxuryPhotoTileCaption">
            <span class="mixLuxuryPhotoTileKicker">Romantic</span>
            <strong class="mixLuxuryPhotoTileTitle">Cosplay</strong>
          </div>
        </div>

        <!-- Tile 4: Tantra / Ghế tình yêu -->
        <div class="mixLuxuryPhotoTile" data-contact-action="zalo" data-room-title="Phòng Ghế Tình Yêu Tantra">
          <img
            src="<?php echo esc_url( $theme_uri . '/assets/images/photo-tile-tantra.webp' ); ?>"
            alt="Ghế tình yêu"
            loading="lazy"
          />
          <div class="mixLuxuryPhotoMainOverlay"></div>
          <div class="mixLuxuryPhotoTileCaption">
            <span class="mixLuxuryPhotoTileKicker">Boutique mood</span>
            <strong class="mixLuxuryPhotoTileTitle">Ghế tình yêu</strong>
          </div>
        </div>

        <!-- Tile 5: Netflix Smart TV -->
        <div class="mixLuxuryPhotoTile" data-contact-action="zalo" data-room-title="Phòng Smart Tivi Có Netflix">
          <img
            src="<?php echo esc_url( $theme_uri . '/assets/images/photo-tile-netflix.webp' ); ?>"
            alt="Smart Tivi có Netflix"
            loading="lazy"
          />
          <div class="mixLuxuryPhotoMainOverlay"></div>
          <div class="mixLuxuryPhotoTileCaption">
            <span class="mixLuxuryPhotoTileKicker">Netflix & Chill</span>
            <strong class="mixLuxuryPhotoTileTitle">Smart Tivi có Netflix</strong>
          </div>
        </div>
      </div>
    </div>
<!-- /wp:html -->

</div>
<!-- /wp:group -->

</section>
<!-- /wp:group -->
