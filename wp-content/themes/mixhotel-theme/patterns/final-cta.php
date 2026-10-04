<?php
/**
 * Title: Final CTA Tái Tương Tác
 * Slug: mixhotel/final-cta
 * Categories: mixhotel
 * Keywords: cta, liên hệ, đặt phòng
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
$bg_img = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('final-cta-bg.jpg') : ['id' => 0, 'url' => $theme_uri . '/assets/images/final-cta-bg.jpg'];
?>
<!-- wp:cover {"url":"<?php echo esc_url( $bg_img['url'] ); ?>","id":<?php echo (int) $bg_img['id']; ?>,"dimRatio":75,"overlayColor":"dark-primary","className":"mixLuxuryFinalCta","anchor":"finalCta","lock":{"move":true,"remove":true}} -->
<div class="wp-block-cover mixLuxuryFinalCta" id="finalCta">
  <span aria-hidden="true" class="wp-block-cover__background has-dark-primary-background-color has-background-dim-75 has-background-dim"></span>
  <img class="wp-block-cover__image-background wp-image-<?php echo (int) $bg_img['id']; ?>" src="<?php echo esc_url( $bg_img['url'] ); ?>" alt="Mix Boutique Hotel đặt phòng" data-object-fit="cover" />
  <div class="wp-block-cover__inner-container mixLuxuryFinalCtaContent">
    <!-- wp:paragraph {"className":"mix-section-kicker-badge"} -->
    <p class="mix-section-kicker-badge">ĐẶT PHÒNG HÔM NAY</p>
    <!-- /wp:paragraph -->
    <!-- wp:heading {"className":"mixLuxuryFinalCtaTitle"} -->
    <h2 class="wp-block-heading mixLuxuryFinalCtaTitle">Muốn xem phòng còn trống? Nhắn Zalo để Mix gửi ảnh &amp; báo giá ngay</h2>
    <!-- /wp:heading -->
    <!-- wp:paragraph {"className":"mixLuxuryFinalCtaDesc"} -->
    <p class="mixLuxuryFinalCtaDesc">Tư vấn nhanh chóng, kín đáo, ưu tiên ảnh thật và concept phù hợp nhất cho buổi hẹn của hai người.</p>
    <!-- /wp:paragraph -->
    <!-- wp:buttons {"className":"mixLuxuryFinalCtaActions","layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons is-content-justification-center mixLuxuryFinalCtaActions">
      <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary"} -->
      <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnPrimary"><a class="wp-block-button__link wp-element-button" href="https://zalo.me/0383104010" target="_blank" rel="noopener noreferrer">✉ Nhắn Zalo Tư Vấn</a></div>
      <!-- /wp:button -->
      <!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
      <div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="tel:0383104010">📞 Gọi Ngay</a></div>
      <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
  </div>
</div>
<!-- /wp:cover -->
