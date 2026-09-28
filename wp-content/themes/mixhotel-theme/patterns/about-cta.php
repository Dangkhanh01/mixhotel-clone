<?php
/**
 * Title: About - CTA Banner Đặt Phòng
 * Slug: mixhotel/about-cta
 * Categories: mixhotel
 * Keywords: about, cta, booking, banner
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
$bg_img = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('final-cta-bg.jpg') : ['id' => 0, 'url' => $theme_uri . '/assets/images/final-cta-bg.jpg'];
?>
<!-- wp:group {"tagName":"section","className":"mixLuxuryContainer mix-mb-80","lock":{"move":true,"remove":true},"metadata":{"name":"About CTA"}} -->
<section class="wp-block-group mixLuxuryContainer mix-mb-80">

<!-- wp:cover {"url":"<?php echo esc_url($bg_img['url']); ?>","id":<?php echo (int) $bg_img['id']; ?>,"dimRatio":80,"overlayColor":"black","isUserOverlayColor":true,"className":"mixCtaBanner","lock":{"move":true,"remove":true}} -->
<div class="wp-block-cover mixCtaBanner"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-80 has-background-dim"></span><img class="wp-block-cover__image-background wp-image-<?php echo (int) $bg_img['id']; ?>" alt="Mix Boutique Hotel Đặt Phòng" src="<?php echo esc_url($bg_img['url']); ?>" data-object-fit="cover"/>
<div class="wp-block-cover__inner-container">

<!-- wp:heading {"className":"mixCtaTitle"} -->
<h2 class="wp-block-heading mixCtaTitle">Sẵn Sàng Cho Phút Yêu Thăng Hoa Cùng Người Ấy?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"mixCtaDesc"} -->
<p class="mixCtaDesc">Đặt phòng trước 15-30 phút để nhận trọn gói ưu đãi giảm 10% và chuẩn bị phòng ốc chỉn chu nhất.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
  <!-- wp:button {"className":"mixCtaBtn callContactLocate"} -->
  <div class="wp-block-button mixCtaBtn callContactLocate"><a class="wp-block-button__link wp-element-button" href="#booking">ĐẶT PHÒNG NGAY</a></div>
  <!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div></div>
<!-- /wp:cover -->

</section>
<!-- /wp:group -->

