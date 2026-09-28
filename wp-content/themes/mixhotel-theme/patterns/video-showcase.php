<?php
/**
 * Title: Video Phòng Thật (YouTube Showcase)
 * Slug: mixhotel/video-showcase
 * Categories: mixhotel
 * Keywords: video, youtube, phòng
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
?>
<!-- wp:group {"tagName":"section","className":"mix-section mix-section--dark-1","anchor":"videos","lock":{"move":true,"remove":true},"metadata":{"name":"Video Phòng Thật (YouTube Showcase)"}} -->
<section id="videos" class="wp-block-group mix-section mix-section--dark-1">

<!-- wp:group {"className":"mix-container"} -->
<div class="wp-block-group mix-container">

<!-- wp:group {"className":"mixLuxuryVideosGrid"} -->
<div class="wp-block-group mixLuxuryVideosGrid">

<!-- wp:html -->
      <!-- Left Column: 2 Vertical Shorts -->
      <div class="mixLuxuryShortsCol">
        <!-- Short 1 -->
        <div class="mixLuxuryShortItem">
          <div class="mixLuxuryShortItemHead">
            <span class="mixLuxuryShortIndex">01</span>
            <p class="mixLuxuryShortTitle">Đêm ngàn sao cho đôi tình nhân THĂNG HOA RẠO RỰC Mixboutique Hotel</p>
          </div>
          <div class="mixLuxuryShortThumb" data-youtube-id="qyeqmaNJYbY" role="button" tabindex="0" title="Xem video phòng đêm ngàn sao">
            <img
              src="<?php echo esc_url( $theme_uri . '/assets/images/yt-short-1.jpg' ); ?>"
              alt="Đêm ngàn sao"
              loading="lazy"
            />
            <div class="mixLuxuryPlayBtn">
              <i class="fa fa-play">&#9654;</i>
            </div>
            <div class="mixLuxuryShortBadge">Xem video ngắn</div>
          </div>
        </div>

        <!-- Short 2 -->
        <div class="mixLuxuryShortItem">
          <div class="mixLuxuryShortItemHead">
            <span class="mixLuxuryShortIndex">02</span>
            <p class="mixLuxuryShortTitle">TOGETHER and to Mixboutique Hotel đưa nhau lên tới 'đỉnh chóp'</p>
          </div>
          <div class="mixLuxuryShortThumb" data-youtube-id="_3pSDfR8Ccw" role="button" tabindex="0" title="Xem video together">
            <img
              src="<?php echo esc_url( $theme_uri . '/assets/images/yt-short-2.jpg' ); ?>"
              alt="Together Mix Boutique"
              loading="lazy"
            />
            <div class="mixLuxuryPlayBtn">
              <i class="fa fa-play">&#9654;</i>
            </div>
            <div class="mixLuxuryShortBadge">Xem video ngắn</div>
          </div>
        </div>
      </div>
<!-- /wp:html -->

<!-- wp:group {"className":"mixLuxuryVideoPanel"} -->
<div class="wp-block-group mixLuxuryVideoPanel">

<!-- wp:group -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"mix-section-kicker"} -->
<p class="mix-section-kicker">VIDEO TỪ KÊNH MIX</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"className":"mix-section-title","style":{"typography":{"textAlign":"left"}}} -->
<h2 class="wp-block-heading mix-section-title" style="text-align:left">Video phòng thật giúp bạn yên tâm đặt phòng</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"mix-section-desc","style":{"typography":{"textAlign":"left"},"spacing":{"margin":{"bottom":"20px"}}}} -->
<p class="mix-section-desc" style="text-align:left;margin-bottom:20px">Cảm nhận rõ không gian, ánh sáng, bồn tắm, giường ngủ và toàn bộ tiện nghi thực tế trước khi đến.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:html -->
        <!-- Bullets -->
        <div class="mixLuxuryVideoBullets">
          <div class="mixLuxuryVideoBulletItem">
            <i class="fa fa-check-circle">&#10004;</i>
            <span>Video quay trực tiếp tại từng hạng phòng, hình ảnh chân thực 100%.</span>
          </div>
          <div class="mixLuxuryVideoBulletItem">
            <i class="fa fa-check-circle">&#10004;</i>
            <span>Lựa chọn không gian, tiện nghi và concept bạn yêu thích trước khi đặt.</span>
          </div>
          <div class="mixLuxuryVideoBulletItem">
            <i class="fa fa-check-circle">&#10004;</i>
            <span>Nhắn Zalo ngay dưới video để được tư vấn và giữ phòng nhanh chóng.</span>
          </div>
        </div>

        <!-- Channel Preview Player -->
        <div class="mixLuxuryChannelThumb" data-youtube-id="Ts4seBpirOA" role="button" tabindex="0" title="Xem video giới thiệu Mix Boutique Hotel">
          <img
            src="<?php echo esc_url( $theme_uri . '/assets/images/yt-channel.jpg' ); ?>"
            alt="Mix Boutique Hotel Channel Preview"
            loading="lazy"
          />
          <div class="mixLuxuryPlayBtn">
            <i class="fa fa-play">&#9654;</i>
          </div>
        </div>

        <!-- Actions -->
        <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 8px;">
          <button type="button" class="mixLuxuryBtn mixLuxuryBtnPrimary" data-contact-action="zalo">
            <i class="fa fa-commenting">&#9993;</i>
            <span>Nhắn Zalo Chọn Phòng</span>
          </button>
          <a
            href="https://www.youtube.com/@mixboutiquehotel921"
            target="_blank"
            rel="noopener noreferrer"
            class="mixLuxuryBtn mixLuxuryBtnOutline"
          >
            <span>Xem Kênh YouTube</span>
            <i class="fa fa-external-link">&#8599;</i>
          </a>
        </div>
<!-- /wp:html -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

<!-- wp:html -->
  <!-- Video Modal Lite Embed -->
  <div id="videoModalLite" class="mix-video-modal" role="dialog" aria-modal="true" aria-label="Video Player">
    <div class="mix-video-modal__container">
      <button type="button" class="mix-video-modal__close" id="btnCloseVideoModal" aria-label="Đóng video">&times;</button>
      <div id="videoModalIframeWrap" style="width: 100%; height: 100%;"></div>
    </div>
  </div>
<!-- /wp:html -->

</section>
<!-- /wp:group -->
