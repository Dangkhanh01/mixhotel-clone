<?php
/**
 * Title: Hero Banner & Form Giữ Phòng
 * Slug: mixhotel/hero-booking
 * Categories: mixhotel
 * Keywords: hero, booking, form, trang chủ
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
?>
<!-- wp:group {"tagName":"section","className":"mixLuxuryHero","anchor":"top","lock":{"move":true,"remove":true},"metadata":{"name":"Hero Banner \u0026 Form Giữ Phòng"}} -->
<section id="top" class="wp-block-group mixLuxuryHero">

<!-- wp:html -->
  <!-- Background Image & Layer Glow -->
  <div class="mixLuxuryHeroBg">
    <img
      src="<?php echo esc_url( $theme_uri . '/assets/images/hero-bg.webp' ); ?>"
      alt="Mix Boutique Hotel Không gian phòng concept"
      loading="eager"
      fetchpriority="high"
    />
  </div>
  <div aria-hidden="true" class="mixLuxuryHeroVeil"></div>
  <div aria-hidden="true" class="mixLuxuryHeroFloor"></div>
  <div aria-hidden="true" class="mixLuxuryHeroGlow"></div>
<!-- /wp:html -->

<!-- wp:group {"className":"mixLuxuryContainer"} -->
<div class="wp-block-group mixLuxuryContainer">

<!-- wp:group {"className":"mixLuxuryHeroGrid"} -->
<div class="wp-block-group mixLuxuryHeroGrid">

<!-- wp:group {"className":"mixLuxuryHeroContent"} -->
<div class="wp-block-group mixLuxuryHeroContent">

<!-- wp:paragraph {"className":"mixLuxuryKicker"} -->
<p class="mixLuxuryKicker">KHÁCH SẠN TÌNH YÊU TẠI HÀ NỘI</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":1,"className":"mixLuxuryDisplay"} -->
<h1 class="wp-block-heading mixLuxuryDisplay">Mix Boutique Hotel phòng concept <span class="mixLuxuryGold">riêng tư</span> cho hai người</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"mixLuxuryLead"} -->
<p class="mixLuxuryLead">Xem ảnh thật, video phòng thật, chọn concept hợp gu và nhắn Zalo để giữ phòng nhanh tại 3 chi nhánh Hà Nội.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"className":"mixLuxuryActions"} -->
<div class="wp-block-buttons mixLuxuryActions">
<!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnPrimary"} -->
<div class="wp-block-button mixLuxuryBtn mixLuxuryBtnPrimary"><a class="wp-block-button__link wp-element-button" href="https://zalo.me/0383104010" target="_blank" rel="noopener noreferrer"><i class="fa fa-commenting" aria-hidden="true">&#9993;</i> <span>Nhắn Zalo Tư Vấn</span></a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"mixLuxuryBtn mixLuxuryBtnOutline"} -->
<div class="wp-block-button mixLuxuryBtn mixLuxuryBtnOutline"><a class="wp-block-button__link wp-element-button" href="tel:0383104010"><i class="fa fa-phone" aria-hidden="true">&#9742;</i> <span>Gọi Ngay</span></a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

<!-- wp:group {"className":"mixLuxuryStats"} -->
<div class="wp-block-group mixLuxuryStats">
<!-- wp:group {"className":"mixLuxuryStat"} -->
<div class="wp-block-group mixLuxuryStat">
<!-- wp:paragraph {"className":"mixLuxuryStatNumber"} -->
<p class="mixLuxuryStatNumber">3</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"mixLuxuryStatText"} -->
<p class="mixLuxuryStatText">chi nhánh Hà Nội dễ di chuyển</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"mixLuxuryStat"} -->
<div class="wp-block-group mixLuxuryStat">
<!-- wp:paragraph {"className":"mixLuxuryStatNumber"} -->
<p class="mixLuxuryStatNumber">32+</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"mixLuxuryStatText"} -->
<p class="mixLuxuryStatText">phòng concept đổi gió cho cặp đôi</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"mixLuxuryStat"} -->
<div class="wp-block-group mixLuxuryStat">
<!-- wp:paragraph {"className":"mixLuxuryStatNumber"} -->
<p class="mixLuxuryStatNumber">199k</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"mixLuxuryStatText"} -->
<p class="mixLuxuryStatText">giá từ 199k / 2h đầu</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"mixLuxuryStat"} -->
<div class="wp-block-group mixLuxuryStat">
<!-- wp:paragraph {"className":"mixLuxuryStatNumber"} -->
<p class="mixLuxuryStatNumber">Kín đáo</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"mixLuxuryStatText"} -->
<p class="mixLuxuryStatText">riêng tư, an tâm, không lo thông tin</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"mixLuxuryMobileShots"} -->
<div class="wp-block-group mixLuxuryMobileShots">
<!-- wp:image {"sizeSlug":"large","linkDestination":"none","className":"mixLuxuryShotItem"} -->
<figure class="wp-block-image size-large mixLuxuryShotItem"><img src="<?php echo esc_url( $theme_uri . '/assets/images/photo-stage-featured.webp' ); ?>" alt="Không gian phòng Mix 1" loading="lazy"/></figure>
<!-- /wp:image -->
<!-- wp:image {"sizeSlug":"large","linkDestination":"none","className":"mixLuxuryShotItem"} -->
<figure class="wp-block-image size-large mixLuxuryShotItem"><img src="<?php echo esc_url( $theme_uri . '/assets/images/photo-tile-bathtub.webp' ); ?>" alt="Không gian phòng Mix 2" loading="lazy"/></figure>
<!-- /wp:image -->
<!-- wp:image {"sizeSlug":"large","linkDestination":"none","className":"mixLuxuryShotItem"} -->
<figure class="wp-block-image size-large mixLuxuryShotItem"><img src="<?php echo esc_url( $theme_uri . '/assets/images/photo-tile-tantra.webp' ); ?>" alt="Không gian phòng Mix 3" loading="lazy"/></figure>
<!-- /wp:image -->
</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

<!-- wp:group {"className":"mixLuxuryReserve mix-hero-reserve"} -->
<div class="wp-block-group mixLuxuryReserve mix-hero-reserve">

<!-- wp:heading {"level":2,"className":"mixLuxuryReserveTitle"} -->
<h2 class="wp-block-heading mixLuxuryReserveTitle">TƯ VẤN TỨC THÌ</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"mixLuxuryReserveText"} -->
<p class="mixLuxuryReserveText">Giữ Phòng Nhanh Nhất &bull; Gửi nhu cầu, Mix sẽ liên hệ xác nhận tình trạng phòng trống ngay.</p>
<!-- /wp:paragraph -->

<!-- wp:html -->
<form id="hero-booking-form" method="POST" action="" class="mixLuxuryReserveForm">
  <input type="hidden" name="action" value="mixhotel_submit_booking" />
  <input type="hidden" id="hero-booking-nonce" name="mixhotel_booking_nonce" value="" />
  <input type="text" name="mixhotel_hp_email" style="display:none;position:absolute;left:-9999px;" tabindex="-1" autocomplete="off" />

  <input
    type="text"
    name="customer_name"
    placeholder="Họ tên *"
    required
    maxlength="100"
    class="mixLuxuryInput mix-input"
  />

  <input
    type="tel"
    name="customer_phone"
    placeholder="Điện thoại *"
    required
    pattern="^(0[3|5|7|8|9])+([0-9]{8})$"
    title="Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, bắt đầu 03/05/07/08/09)"
    maxlength="15"
    class="mixLuxuryInput mix-input"
  />

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
    <div>
      <label style="display:block; font-size:11px; color:#c5a880; margin-bottom:4px; font-weight:600; text-transform:uppercase;">Ngày nhận phòng *</label>
      <input
        type="date"
        name="booking_date"
        min="<?php echo esc_attr( date( 'Y-m-d' ) ); ?>"
        value="<?php echo esc_attr( date( 'Y-m-d' ) ); ?>"
        required
        class="mixLuxuryInput mix-input"
      />
    </div>
    <div>
      <label style="display:block; font-size:11px; color:#c5a880; margin-bottom:4px; font-weight:600; text-transform:uppercase;">Giờ nhận phòng *</label>
      <input
        type="time"
        name="booking_time"
        value="14:00"
        required
        class="mixLuxuryInput mix-input"
      />
    </div>
  </div>

  <select name="branch_id" required class="mixLuxuryInput mix-input">
    <option value="branch-premium">CS1: Huỳnh Thúc Kháng (Mix Premium)</option>
    <option value="branch-dangtiendong">CS2: 256B Đặng Tiến Đông, Đống Đa</option>
    <option value="branch-phucla">CS3: 20 Phúc La, Hà Đông</option>
  </select>

  <select name="booking_demand" class="mixLuxuryInput mix-input">
    <option value="2h">Nghỉ giờ (2 giờ đầu)</option>
    <option value="overnight">Qua đêm (22h – 12h)</option>
    <option value="allday">Cả ngày đêm (14h – 12h)</option>
    <option value="event-decoration">Trang trí sinh nhật / kỷ niệm</option>
    <option value="consult-concept">Tư vấn concept phù hợp</option>
  </select>

  <button type="submit" class="mixLuxuryBtn mixLuxuryBtnPrimary uppercase w-full justify-center mix-btn--full">
    GỬI YÊU CẦU GIỮ PHÒNG
  </button>
</form>
<!-- /wp:html -->

<!-- wp:paragraph {"className":"mixLuxuryNote"} -->
<p class="mixLuxuryNote">Chưa đặt cọc: Mix hỗ trợ giữ phòng 15 - 20 phút tùy tình trạng phòng.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</section>
<!-- /wp:group -->
