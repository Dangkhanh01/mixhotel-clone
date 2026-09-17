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
<!-- wp:html -->
<section id="finalCta" class="mixLuxuryFinalCta">
  <!-- Background Image -->
  <div class="mixLuxuryFinalCtaBg">
    <img
      src="<?php echo esc_url( $theme_uri . '/assets/images/final-cta-bg.jpg' ); ?>"
      alt="Mix Boutique Hotel đặt phòng"
      loading="lazy"
    />
  </div>
  <div class="mixLuxuryFinalCtaVeil"></div>

  <div class="mixLuxuryFinalCtaContent">
    <span style="display: inline-block; font-size: 11px; font-family: monospace; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--wp--preset--color--luxury-gold, #c5a880); padding: 5px 16px; border-radius: 20px; background: rgba(197, 168, 128, 0.15); border: 1px solid rgba(197, 168, 128, 0.3); margin-bottom: 20px;">
      ĐẶT PHÒNG HÔM NAY
    </span>

    <h2 class="mixLuxuryFinalCtaTitle">
      Muốn xem phòng còn trống? Nhắn Zalo để Mix gửi ảnh &amp; báo giá ngay
    </h2>

    <p class="mixLuxuryFinalCtaDesc">
      Tư vấn nhanh chóng, kín đáo, ưu tiên ảnh thật và concept phù hợp nhất cho buổi hẹn của hai người.
    </p>

    <div class="mixLuxuryFinalCtaActions">
      <button
        type="button"
        class="mixLuxuryBtn mixLuxuryBtnPrimary"
        style="padding: 14px 32px; font-size: 14px;"
        data-contact-action="zalo"
      >
        <i class="fa fa-commenting">&#9993;</i>
        <span>Nhắn Zalo Tư Vấn</span>
      </button>

      <button
        type="button"
        class="mixLuxuryBtn mixLuxuryBtnOutline"
        style="padding: 14px 32px; font-size: 14px;"
        data-contact-action="phone"
      >
        <i class="fa fa-phone">&#9742;</i>
        <span>Gọi Ngay</span>
      </button>
    </div>
  </div>
</section>
<!-- /wp:html -->
