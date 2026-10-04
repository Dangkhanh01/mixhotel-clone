<?php
/**
 * Title: Sự Kiện & Trang Trí
 * Slug: mixhotel/events-decoration
 * Categories: mixhotel
 * Keywords: sự kiện, trang trí, events
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
?>
<!-- wp:group {"tagName":"section","className":"mix-section mix-section--dark-3","anchor":"events","lock":{"move":true,"remove":true},"metadata":{"name":"Sự Kiện \u0026 Trang Trí"}} -->
<section id="events" class="wp-block-group mix-section mix-section--dark-3">

<!-- wp:group {"className":"mix-container"} -->
<div class="wp-block-group mix-container">

<!-- wp:group {"className":"mix-events-layout"} -->
<div class="wp-block-group mix-events-layout">

<!-- Left Column: Copy & Pricing Panel -->
<!-- wp:group {"className":"mix-flex-col-gap-20"} -->
<div class="wp-block-group mix-flex-col-gap-20">

<!-- wp:group -->
<div class="wp-block-group">
<!-- wp:paragraph {"className":"mix-section-kicker"} -->
<p class="mix-section-kicker">TRANG TRÍ SỰ KIỆN</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"className":"mix-section-title mix-text-left"} -->
<h2 class="wp-block-heading mix-section-title mix-text-left">Thêm bất ngờ cho sinh nhật, kỷ niệm hoặc cầu hôn</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"mix-section-desc mix-text-left"} -->
<p class="mix-section-desc mix-text-left">Mix Boutique Hotel hỗ trợ chuẩn bị trọn gói các set nến thơm, cánh hoa, bóng bay, bánh kem và rượu vang ngọt ngào. (Giá trang trí chưa bao gồm tiền phòng).</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"mix-events-pricing-card"} -->
<div class="wp-block-group mix-events-pricing-card">
<!-- wp:heading {"level":3,"className":"mix-events-pricing-title"} -->
<h3 class="wp-block-heading mix-events-pricing-title">Bảng giá trang trí mẫu (tham khảo)</h3>
<!-- /wp:heading -->

<!-- wp:group {"className":"mix-events-pricing-list"} -->
<div class="wp-block-group mix-events-pricing-list">
<!-- wp:paragraph {"className":"mix-events-pricing-row"} -->
<p class="mix-events-pricing-row"><span>⭐ Nến - hoa - bóng bay, tặng 1 chai vang</span> <strong>1.490k - 1.990k</strong></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"mix-events-pricing-row"} -->
<p class="mix-events-pricing-row"><span>⭐ Set rượu vang - hoa hồng - nến lung linh</span> <strong>590k</strong></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"mix-events-pricing-row"} -->
<p class="mix-events-pricing-row"><span>⭐ Set nến nghệ thuật + hoa tươi + bánh kem</span> <strong>650k</strong></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"mix-events-pricing-row"} -->
<p class="mix-events-pricing-row"><span>⭐ Set bánh kem sinh nhật / khay trái cây</span> <strong>350k / 300k</strong></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary w-full","width":100} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 mixLuxuryBtn mixLuxuryBtnPrimary w-full"><a class="wp-block-button__link wp-element-button" href="https://zalo.me/0383104010" target="_blank" rel="noopener noreferrer"><i class="fa fa-commenting" aria-hidden="true">&#9993;</i> <span>Tư Vấn Set Trang Trí Riêng</span></a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

<!-- Right Column: Photos Grid -->
<!-- wp:group {"className":"mix-events-photos"} -->
<div class="wp-block-group mix-events-photos">

<div class="mix-events-photo-main">
  <!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
  <figure class="wp-block-image size-large"><img src="<?php echo esc_url( $theme_uri . '/assets/images/event-1.jpg' ); ?>" alt="Trang trí sự kiện 1" loading="lazy" /></figure>
  <!-- /wp:image -->
</div>

<div class="mix-events-photo-sub">
  <!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
  <figure class="wp-block-image size-large"><img src="<?php echo esc_url( $theme_uri . '/assets/images/event-2.jpg' ); ?>" alt="Trang trí sự kiện 2" loading="lazy" /></figure>
  <!-- /wp:image -->
</div>

<div class="mix-events-photo-sub">
  <!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
  <figure class="wp-block-image size-large"><img src="<?php echo esc_url( $theme_uri . '/assets/images/event-3.jpg' ); ?>" alt="Trang trí sự kiện 3" loading="lazy" /></figure>
  <!-- /wp:image -->
</div>

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</section>
<!-- /wp:group -->
