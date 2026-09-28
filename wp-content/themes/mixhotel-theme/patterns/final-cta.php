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
?>
<!-- wp:cover {"url":"<?php echo esc_url( $theme_uri . '/assets/images/final-cta-bg.jpg' ); ?>","dimRatio":75,"overlayColor":"dark-primary","className":"mixLuxuryFinalCta","anchor":"finalCta","lock":{"move":true,"remove":true}} -->
<div class="wp-block-cover mixLuxuryFinalCta" id="finalCta">
  <span aria-hidden="true" class="wp-block-cover__background has-dark-primary-background-color has-background-dim-75 has-background-dim"></span>
  <img class="wp-block-cover__image-background" src="<?php echo esc_url( $theme_uri . '/assets/images/final-cta-bg.jpg' ); ?>" alt="Mix Boutique Hotel đặt phòng" data-object-fit="cover" />
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
    <!-- wp:html -->
    <div class="mixLuxuryFinalCtaActions">
      <button type="button" class="mixLuxuryBtn mixLuxuryBtnPrimary" style="padding: 14px 32px; font-size: 14px;" data-contact-action="zalo">
        <i class="fa fa-commenting">&#9993;</i>
        <span>Nhắn Zalo Tư Vấn</span>
      </button>
      <button type="button" class="mixLuxuryBtn mixLuxuryBtnOutline" style="padding: 14px 32px; font-size: 14px;" data-contact-action="phone">
        <i class="fa fa-phone">&#9742;</i>
        <span>Gọi Ngay</span>
      </button>
    </div>
    <!-- /wp:html -->
  </div>
</div>
<!-- /wp:cover -->
