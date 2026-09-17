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
<!-- wp:html -->
<section class="mixLuxuryHero" id="top">
  <!-- Background Image with High Priority -->
  <div class="mixLuxuryHeroBg">
    <img
      src="<?php echo esc_url( $theme_uri . '/assets/images/hero-bg.webp' ); ?>"
      alt="Mix Boutique Hotel Không gian phòng concept"
      loading="eager"
      fetchpriority="high"
    />
  </div>

  <!-- Layer Veils & Glow -->
  <div aria-hidden="true" class="mixLuxuryHeroVeil"></div>
  <div aria-hidden="true" class="mixLuxuryHeroFloor"></div>
  <div aria-hidden="true" class="mixLuxuryHeroGlow"></div>

  <div class="mixLuxuryContainer">
    <div class="mixLuxuryHeroGrid">
      <!-- Left Column: Hero Content -->
      <div class="mixLuxuryHeroContent">
        <div class="mixLuxuryKicker">KHÁCH SẠN TÌNH YÊU TẠI HÀ NỘI</div>

        <h1 class="mixLuxuryDisplay">
          Mix Boutique Hotel phòng concept <span class="mixLuxuryGold">riêng tư</span> cho hai người
        </h1>

        <p class="mixLuxuryLead">
          Xem ảnh thật, video phòng thật, chọn concept hợp gu và nhắn Zalo để giữ phòng nhanh tại 3 chi nhánh Hà Nội.
        </p>

        <!-- Actions -->
        <div class="mixLuxuryActions">
          <button type="button" class="mixLuxuryBtn mixLuxuryBtnPrimary" data-contact-action="zalo">
            <i class="fa fa-commenting">&#9993;</i>
            <span>Nhắn Zalo Tư Vấn</span>
          </button>

          <button type="button" class="mixLuxuryBtn mixLuxuryBtnOutline" data-contact-action="phone">
            <i class="fa fa-phone">&#9742;</i>
            <span>Gọi Ngay</span>
          </button>
        </div>

        <!-- 4 Stats Cards -->
        <div class="mixLuxuryStats">
          <div class="mixLuxuryStat">
            <span class="mixLuxuryStatNumber">3</span>
            <span class="mixLuxuryStatText">chi nhánh Hà Nội dễ di chuyển</span>
          </div>

          <div class="mixLuxuryStat">
            <span class="mixLuxuryStatNumber">32+</span>
            <span class="mixLuxuryStatText">phòng concept đổi gió cho cặp đôi</span>
          </div>

          <div class="mixLuxuryStat">
            <span class="mixLuxuryStatNumber">199k</span>
            <span class="mixLuxuryStatText">giá từ 199k / 2h đầu</span>
          </div>

          <div class="mixLuxuryStat">
            <span class="mixLuxuryStatNumber">Kín đáo</span>
            <span class="mixLuxuryStatText">riêng tư, an tâm, không lo thông tin</span>
          </div>
        </div>

        <!-- Mini Preview Shots -->
        <div class="mixLuxuryMobileShots">
          <div class="mixLuxuryShotItem">
            <img src="<?php echo esc_url( $theme_uri . '/assets/images/photo-stage-featured.webp' ); ?>" alt="Không gian phòng Mix 1" loading="lazy" />
          </div>
          <div class="mixLuxuryShotItem">
            <img src="<?php echo esc_url( $theme_uri . '/assets/images/photo-tile-bathtub.webp' ); ?>" alt="Không gian phòng Mix 2" loading="lazy" />
          </div>
          <div class="mixLuxuryShotItem">
            <img src="<?php echo esc_url( $theme_uri . '/assets/images/photo-tile-tantra.webp' ); ?>" alt="Không gian phòng Mix 3" loading="lazy" />
          </div>
        </div>
      </div>

      <!-- Right Column: Reservation Form Card -->
      <div class="mixLuxuryReserve mix-hero-reserve">
        <h2 class="mixLuxuryReserveTitle">TƯ VẤN TỨC THÌ</h2>
        <p class="mixLuxuryReserveText">
          Giữ Phòng Nhanh Nhất &bull; Gửi nhu cầu, Mix sẽ liên hệ xác nhận tình trạng phòng trống ngay.
        </p>

        <form id="hero-booking-form" method="POST" action="" class="mixLuxuryReserveForm">
          <?php wp_nonce_field('mixhotel_submit_booking', 'mixhotel_booking_nonce'); ?>
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

          <select name="branch_id" required class="mixLuxuryInput mix-input">
            <option value="branch-premium">CS1: Huỳnh Thúc Kháng (Mix Premium)</option>
            <option value="branch-dangtiendong">CS2: 256B Đặng Tiến Đông, Đống Đa</option>
            <option value="branch-phucla">CS3: 20 Phúc La, Hà Đông</option>
          </select>

          <select name="booking_demand" class="mixLuxuryInput mix-input">
            <option value="rest-hourly">Nghỉ giờ (từ 2h)</option>
            <option value="overnight">Nghỉ qua đêm</option>
            <option value="event-decoration">Trang trí sinh nhật / kỷ niệm</option>
            <option value="consult-concept">Tư vấn concept phù hợp</option>
          </select>

          <button type="submit" class="mixLuxuryBtn mixLuxuryBtnPrimary uppercase w-full justify-center mix-btn--full">
            GỬI YÊU CẦU GIỮ PHÒNG
          </button>
        </form>

        <p class="mixLuxuryNote">
          Chưa đặt cọc: Mix hỗ trợ giữ phòng 15 - 20 phút tùy tình trạng phòng.
        </p>
      </div>
    </div>
  </div>
</section>
<!-- /wp:html -->
