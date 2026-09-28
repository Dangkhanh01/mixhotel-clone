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

<!-- wp:html -->
<div style="background-color: var(--wp--preset--color--dark-secondary, #17171c); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);">
  <h3 style="font-family: var(--wp--preset--font-family--questrial, sans-serif); font-size: 16px; font-weight: 700; color: #ffffff; margin: 0 0 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding-bottom: 10px;">
    Bảng giá trang trí mẫu (tham khảo)
  </h3>

  <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; font-size: 13.5px;">
    <div style="display: flex; justify-content: space-between; gap: 10px; color: #a0a0a8;">
      <span>&#11088; Nến - hoa - bóng bay, tặng 1 chai vang</span>
      <strong style="color: var(--wp--preset--color--luxury-gold, #c5a880); white-space: nowrap;">1.490k - 1.990k</strong>
    </div>
    <div style="display: flex; justify-content: space-between; gap: 10px; color: #a0a0a8;">
      <span>&#11088; Set rượu vang - hoa hồng - nến lung linh</span>
      <strong style="color: var(--wp--preset--color--luxury-gold, #c5a880); white-space: nowrap;">590k</strong>
    </div>
    <div style="display: flex; justify-content: space-between; gap: 10px; color: #a0a0a8;">
      <span>&#11088; Set nến nghệ thuật + hoa tươi + bánh kem</span>
      <strong style="color: var(--wp--preset--color--luxury-gold, #c5a880); white-space: nowrap;">650k</strong>
    </div>
    <div style="display: flex; justify-content: space-between; gap: 10px; color: #a0a0a8;">
      <span>&#11088; Set bánh kem sinh nhật / khay trái cây</span>
      <strong style="color: var(--wp--preset--color--luxury-gold, #c5a880); white-space: nowrap;">350k / 300k</strong>
    </div>
  </div>

  <button
    type="button"
    class="mixLuxuryBtn mixLuxuryBtnPrimary"
    style="width: 100%; justify-content: center;"
    data-contact-action="zalo"
    data-room-title="Tư vấn set trang trí sự kiện"
  >
    <i class="fa fa-commenting">&#9993;</i>
    <span>Tư Vấn Set Trang Trí Riêng</span>
  </button>
</div>
<!-- /wp:html -->

</div>
<!-- /wp:group -->

<!-- Right Column: Photos Grid -->
<!-- wp:group {"className":"mix-events-photos"} -->
<div class="wp-block-group mix-events-photos">

<div class="mix-events-photo-main">
  <!-- wp:image {"url":"<?php echo esc_url( $theme_uri . '/assets/images/event-1.jpg' ); ?>","alt":"Trang trí sự kiện 1"} -->
  <figure class="wp-block-image"><img src="<?php echo esc_url( $theme_uri . '/assets/images/event-1.jpg' ); ?>" alt="Trang trí sự kiện 1" loading="lazy" /></figure>
  <!-- /wp:image -->
</div>

<div class="mix-events-photo-sub">
  <!-- wp:image {"url":"<?php echo esc_url( $theme_uri . '/assets/images/event-2.jpg' ); ?>","alt":"Trang trí sự kiện 2"} -->
  <figure class="wp-block-image"><img src="<?php echo esc_url( $theme_uri . '/assets/images/event-2.jpg' ); ?>" alt="Trang trí sự kiện 2" loading="lazy" /></figure>
  <!-- /wp:image -->
</div>

<div class="mix-events-photo-sub">
  <!-- wp:image {"url":"<?php echo esc_url( $theme_uri . '/assets/images/event-3.jpg' ); ?>","alt":"Trang trí sự kiện 3"} -->
  <figure class="wp-block-image"><img src="<?php echo esc_url( $theme_uri . '/assets/images/event-3.jpg' ); ?>" alt="Trang trí sự kiện 3" loading="lazy" /></figure>
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
