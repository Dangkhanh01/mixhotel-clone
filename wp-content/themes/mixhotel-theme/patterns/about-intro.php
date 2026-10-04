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
<!-- wp:group {"className":"mixLuxuryBreadcrumbs"} -->
<div class="wp-block-group mixLuxuryBreadcrumbs"><div class="inner"><a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a> <span>/</span> <span class="current">Giới thiệu</span></div></div>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","className":"mixLuxuryContainer mix-about-intro-wrap","lock":{"move":true,"remove":true},"metadata":{"name":"About Intro"}} -->
<section class="wp-block-group mixLuxuryContainer mix-about-intro-wrap">

<!-- wp:group {"className":"mixAboutStory"} -->
<div class="wp-block-group mixAboutStory">
<!-- wp:paragraph {"className":"mixLuxuryKicker"} -->
<p class="mixLuxuryKicker">GIỚI THIỆU VỀ HỆ THỐNG</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":1,"className":"mixLuxuryTitle"} -->
<h1 class="wp-block-heading mixLuxuryTitle">VỀ KHÁCH SẠN TÌNH YÊU MIX BOUTIQUE</h1>
<!-- /wp:heading -->
<!-- wp:group {"className":"mixLuxuryTitleDivider"} -->
<div class="wp-block-group mixLuxuryTitleDivider"></div>
<!-- /wp:group -->

<!-- wp:paragraph {"className":"mixAboutQuote"} -->
<p class="mixAboutQuote">&ldquo;ĐỪNG ĐỂ TÌNH YÊU CỦA BẠN CHỈ CÓ MỘT MÀU!&rdquo;</p>
<!-- /wp:paragraph -->

<!-- wp:group {"className":"mixAboutText"} -->
<div class="wp-block-group mixAboutText">
<!-- wp:paragraph -->
<p>Ở <strong>Mix Boutique Hotel</strong>, chúng tôi giúp bạn vẽ bức tranh tình yêu của chính mình bằng những sắc màu tươi mới, để mỗi phút giây bên nhau đều như <span style="color: #ffe2a0; font-weight: 600;">&ldquo;Phút yêu đầu&rdquo;</span>.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Chúng tôi, những người yêu nhau luôn tìm kiếm một nơi thật sự riêng tư, có không gian lãng mạn để tận hưởng cảm giác bên nhau trọn vẹn nhất. Tuy nhiên ở chốn Hà Nội tấp nập, ngoài các khách sạn rập khuôn và trung tâm thương mại đông đúc, chúng ta gần như không còn sự lựa chọn nào khác cho cảm xúc đôi lứa.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Lấy ý tưởng từ những câu chuyện tình bất tử trong các bộ phim kinh điển mang phong vị Châu Âu và nét huyền bí Á Đông, chúng tôi đã tạo dựng từng concept phòng độc bản. Chúng tôi phát triển dịch vụ tiêu chuẩn cùng hình thức thuê phòng linh hoạt theo giờ và qua đêm, tập trung hoàn toàn vào cảm xúc thăng hoa của khách hàng.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Và Mix Boutique Hotel ra đời. Với hơn 4 cơ sở tại các quận trung tâm Hà Nội, chúng tôi tự hào là điểm đến số 1 được các cặp đôi lựa chọn để gìn giữ ngọn lửa tình yêu nồng say.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

<?php
$banner_img = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('mixhotel-gt-.webp') : ['id' => 0, 'url' => $theme_uri . '/assets/images/mixhotel-gt-.webp'];
?>
<!-- wp:cover {"url":"<?php echo esc_url($banner_img['url']); ?>","id":<?php echo (int) $banner_img['id']; ?>,"dimRatio":40,"overlayColor":"black","isUserOverlayColor":true,"className":"mixAboutBanner"} -->
<div class="wp-block-cover mixAboutBanner"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-40 has-background-dim"></span><img class="wp-block-cover__image-background wp-image-<?php echo (int) $banner_img['id']; ?>" alt="Mix Boutique Hotel — Không Gian Riêng Tư • Cảm Xúc Thăng Hoa" src="<?php echo esc_url($banner_img['url']); ?>" data-object-fit="cover"/>
<div class="wp-block-cover__inner-container">
<!-- wp:group {"className":"mixAboutBannerContent"} -->
<div class="wp-block-group mixAboutBannerContent">
<!-- wp:paragraph {"className":"mixAboutBadge"} -->
<p class="mixAboutBadge">Boutique Mood</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2,"className":"mixAboutBannerTitle"} -->
<h2 class="wp-block-heading mixAboutBannerTitle">Không Gian Riêng Tư • Cảm Xúc Thăng Hoa</h2>
<!-- /wp:heading -->
</div>
<!-- /wp:group -->
</div></div>
<!-- /wp:cover -->

</section>
<!-- /wp:group -->
