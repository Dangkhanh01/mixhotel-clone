<?php
/**
 * Title: About - Hero & Story Giới Thiệu
 * Slug: mixhotel/about-intro
 * Categories: mixhotel
 * Keywords: about, gioi thieu, story, hero
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
?>
<!-- wp:html -->
<div class="mixLuxuryBreadcrumbs">
  <div class="inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a>
    <span>/</span>
    <span class="current">Giới thiệu</span>
  </div>
</div>

<section class="mixLuxuryContainer" style="padding-top: 48px; padding-bottom: 24px;" aria-label="Giới thiệu khách sạn">
  <!-- Story Section -->
  <div class="mixAboutStory">
    <span class="mixLuxuryKicker">GIỚI THIỆU VỀ HỆ THỐNG</span>
    <h1 class="mixLuxuryTitle">VỀ KHÁCH SẠN TÌNH YÊU MIX BOUTIQUE</h1>
    <div class="mixLuxuryTitleDivider"></div>

    <p class="mixAboutQuote">
      &ldquo;ĐỪNG ĐỂ TÌNH YÊU CỦA BẠN CHỈ CÓ MỘT MÀU!&rdquo;
    </p>

    <div class="mixAboutText">
      <p>
        Ở <strong>Mix Boutique Hotel</strong>, chúng tôi giúp bạn vẽ bức tranh tình yêu của chính mình bằng những sắc màu tươi mới, để mỗi phút giây bên nhau đều như <span style="color: #ffe2a0; font-weight: 600;">&ldquo;Phút yêu đầu&rdquo;</span>.
      </p>
      <p>
        Chúng tôi, những người yêu nhau luôn tìm kiếm một nơi thật sự riêng tư, có không gian lãng mạn để tận hưởng cảm giác bên nhau trọn vẹn nhất. Tuy nhiên ở chốn Hà Nội tấp nập, ngoài các khách sạn rập khuôn và trung tâm thương mại đông đúc, chúng ta gần như không còn sự lựa chọn nào khác cho cảm xúc đôi lứa.
      </p>
      <p>
        Lấy ý tưởng từ những câu chuyện tình bất tử trong các bộ phim kinh điển mang phong vị Châu Âu và nét huyền bí Á Đông, chúng tôi đã tạo dựng từng concept phòng độc bản. Chúng tôi phát triển dịch vụ tiêu chuẩn cùng hình thức thuê phòng linh hoạt theo giờ và qua đêm, tập trung hoàn toàn vào cảm xúc thăng hoa của khách hàng.
      </p>
      <p>
        Và Mix Boutique Hotel ra đời. Với hơn 4 cơ sở tại các quận trung tâm Hà Nội, chúng tôi tự hào là điểm đến số 1 được các cặp đôi lựa chọn để gìn giữ ngọn lửa tình yêu nồng say.
      </p>
    </div>
  </div>

  <!-- Feature Image Banner -->
  <div class="mixAboutBanner">
    <img 
      src="<?php echo esc_url($theme_uri . '/assets/images/mixhotel-gt-.webp'); ?>" 
      alt="Mix Boutique Hotel — Không Gian Riêng Tư &bull; Cảm Xúc Thăng Hoa"
      loading="eager"
    />
    <div class="mixAboutBannerOverlay"></div>
    <div class="mixAboutBannerContent">
      <span class="mixAboutBadge">Boutique Mood</span>
      <h2 class="mixAboutBannerTitle">Không Gian Riêng Tư &bull; Cảm Xúc Thăng Hoa</h2>
    </div>
  </div>
</section>
<!-- /wp:html -->
