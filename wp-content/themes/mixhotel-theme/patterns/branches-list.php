<?php
/**
 * Title: Hệ Thống 3 Chi Nhánh Hà Nội
 * Slug: mixhotel/branches-list
 * Categories: mixhotel
 * Keywords: chi nhánh, branches, liên hệ
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
$img_branch1 = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('branch-huynhthuckhang.webp') : ['id' => 0, 'url' => $theme_uri . '/assets/images/branch-huynhthuckhang.webp'];
$img_branch2 = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('branch-dangtiendong.webp') : ['id' => 0, 'url' => $theme_uri . '/assets/images/branch-dangtiendong.webp'];
$img_branch3 = function_exists('mixhotel_get_theme_image_attachment') ? mixhotel_get_theme_image_attachment('branch-phucla.webp') : ['id' => 0, 'url' => $theme_uri . '/assets/images/branch-phucla.webp'];
?>
<!-- wp:group {"tagName":"section","className":"mix-section mix-section--dark-1","anchor":"branches","lock":{"move":true,"remove":true},"metadata":{"name":"3 Chi Nhánh Hà Nội"}} -->
<section id="branches" class="wp-block-group mix-section mix-section--dark-1">

<!-- wp:group {"className":"mix-container"} -->
<div class="wp-block-group mix-container">

<!-- wp:group {"className":"mix-section-head"} -->
<div class="wp-block-group mix-section-head">
<!-- wp:paragraph {"className":"mix-section-kicker"} -->
<p class="mix-section-kicker">3 CHI NHÁNH HÀ NỘI</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"className":"mix-section-title"} -->
<h2 class="wp-block-heading mix-section-title">Chọn điểm gần bạn, Mix tư vấn phòng còn trống</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"mix-section-desc"} -->
<p class="mix-section-desc">Mỗi chi nhánh đều có nhiều hạng phòng và concept khác nhau. Nhắn Zalo để kiểm tra tình trạng phòng thực tế trước khi đến.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:columns {"className":"mixLuxuryBranchesGrid","lock":{"move":true,"remove":true},"metadata":{"name":"Lưới 3 Chi Nhánh"}} -->
<div class="wp-block-columns mixLuxuryBranchesGrid">

  <!-- wp:column -->
  <div class="wp-block-column">
  <!-- wp:group {"tagName":"article","className":"mixLuxuryBranchCard mixLuxuryBranchCard--premium","lock":{"move":true,"remove":true},"metadata":{"name":"Chi nhánh Huỳnh Thúc Kháng"}} -->
  <article class="wp-block-group mixLuxuryBranchCard mixLuxuryBranchCard--premium">
    <!-- wp:group {"className":"mixLuxuryBranchThumb"} -->
    <div class="wp-block-group mixLuxuryBranchThumb">
      <!-- wp:image {"id":<?php echo (int) $img_branch1['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
      <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_branch1['url']); ?>" alt="Mix Boutique Premium (Huỳnh Thúc Kháng)" class="wp-image-<?php echo (int) $img_branch1['id']; ?>"/></figure>
      <!-- /wp:image -->
      <!-- wp:group {"className":"mixLuxuryPhotoBadge"} -->
      <div class="wp-block-group mixLuxuryPhotoBadge">
        <!-- wp:paragraph {"className":"mixLuxuryPhotoBadgeNumber"} -->
        <p class="mixLuxuryPhotoBadgeNumber">01</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryPhotoBadgeLabel"} -->
        <p class="mixLuxuryPhotoBadgeLabel">Chi nhánh nổi bật</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"className":"mixLuxuryBranchBody"} -->
    <div class="wp-block-group mixLuxuryBranchBody">
      <!-- wp:heading {"level":3,"className":"mixLuxuryBranchName"} -->
      <h3 class="wp-block-heading mixLuxuryBranchName">Mix Boutique Premium (Huỳnh Thúc Kháng)</h3>
      <!-- /wp:heading -->

      <!-- wp:group {"className":"mixLuxuryBranchInfo"} -->
      <div class="wp-block-group mixLuxuryBranchInfo">
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">📍 Ngách 29 Ngõ 49 Phố Huỳnh Thúc Kháng, Thành Công, Láng, Hà Nội</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">✓ Nhiều hạng phòng concept</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">✓ Kiểm tra phòng trống qua Zalo tức thì</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">✓ Khu trung tâm dễ tìm, kín đáo</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->

      <!-- wp:buttons {"className":"mixLuxuryBranchActions"} -->
      <div class="wp-block-buttons mixLuxuryBranchActions">
        <!-- wp:button {"className":"mixLuxuryBranchBtn mixLuxuryBranchBtnZalo mix-btn-booking"} -->
        <div class="wp-block-button mixLuxuryBranchBtn mixLuxuryBranchBtnZalo mix-btn-booking"><a class="wp-block-button__link wp-element-button" href="#booking">✉ Hỏi phòng</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixLuxuryBranchBtn mixLuxuryBranchBtnPhone"} -->
        <div class="wp-block-button mixLuxuryBranchBtn mixLuxuryBranchBtnPhone"><a class="wp-block-button__link wp-element-button" href="tel:0383104010">📞 Gọi ngay</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
  </article>
  <!-- /wp:group -->
  </div>
  <!-- /wp:column -->

  <!-- wp:column -->
  <div class="wp-block-column">
  <!-- wp:group {"tagName":"article","className":"mixLuxuryBranchCard mixLuxuryBranchCard--dangtiendong","lock":{"move":true,"remove":true},"metadata":{"name":"Chi nhánh Đặng Tiến Đông"}} -->
  <article class="wp-block-group mixLuxuryBranchCard mixLuxuryBranchCard--dangtiendong">
    <!-- wp:group {"className":"mixLuxuryBranchThumb"} -->
    <div class="wp-block-group mixLuxuryBranchThumb">
      <!-- wp:image {"id":<?php echo (int) $img_branch2['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
      <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_branch2['url']); ?>" alt="Mix Boutique Hotel 256B Đặng Tiến Đông" class="wp-image-<?php echo (int) $img_branch2['id']; ?>"/></figure>
      <!-- /wp:image -->
      <!-- wp:group {"className":"mixLuxuryPhotoBadge"} -->
      <div class="wp-block-group mixLuxuryPhotoBadge">
        <!-- wp:paragraph {"className":"mixLuxuryPhotoBadgeNumber"} -->
        <p class="mixLuxuryPhotoBadgeNumber">02</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryPhotoBadgeLabel"} -->
        <p class="mixLuxuryPhotoBadgeLabel">Khu Đống Đa</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"className":"mixLuxuryBranchBody"} -->
    <div class="wp-block-group mixLuxuryBranchBody">
      <!-- wp:heading {"level":3,"className":"mixLuxuryBranchName"} -->
      <h3 class="wp-block-heading mixLuxuryBranchName">Mix Boutique Hotel 256B Đặng Tiến Đông</h3>
      <!-- /wp:heading -->

      <!-- wp:group {"className":"mixLuxuryBranchInfo"} -->
      <div class="wp-block-group mixLuxuryBranchInfo">
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">📍 256B Phố Đặng Tiến Đông, Ô Chợ Dừa, Đống Đa, Hà Nội</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">✓ Gần Hoàng Cầu, Ô Chợ Dừa</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">✓ Di chuyển thuận tiện, kín đáo</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">✓ Đầy đủ gói nghỉ giờ &amp; qua đêm</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->

      <!-- wp:buttons {"className":"mixLuxuryBranchActions"} -->
      <div class="wp-block-buttons mixLuxuryBranchActions">
        <!-- wp:button {"className":"mixLuxuryBranchBtn mixLuxuryBranchBtnZalo mix-btn-booking"} -->
        <div class="wp-block-button mixLuxuryBranchBtn mixLuxuryBranchBtnZalo mix-btn-booking"><a class="wp-block-button__link wp-element-button" href="#booking">✉ Hỏi phòng</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixLuxuryBranchBtn mixLuxuryBranchBtnPhone"} -->
        <div class="wp-block-button mixLuxuryBranchBtn mixLuxuryBranchBtnPhone"><a class="wp-block-button__link wp-element-button" href="tel:0393307030">📞 Gọi ngay</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
  </article>
  <!-- /wp:group -->
  </div>
  <!-- /wp:column -->

  <!-- wp:column -->
  <div class="wp-block-column">
  <!-- wp:group {"tagName":"article","className":"mixLuxuryBranchCard mixLuxuryBranchCard--phucla","lock":{"move":true,"remove":true},"metadata":{"name":"Chi nhánh Phúc La Hà Đông"}} -->
  <article class="wp-block-group mixLuxuryBranchCard mixLuxuryBranchCard--phucla">
    <!-- wp:group {"className":"mixLuxuryBranchThumb"} -->
    <div class="wp-block-group mixLuxuryBranchThumb">
      <!-- wp:image {"id":<?php echo (int) $img_branch3['id']; ?>,"sizeSlug":"full","linkDestination":"none"} -->
      <figure class="wp-block-image size-full"><img src="<?php echo esc_url($img_branch3['url']); ?>" alt="Mix Boutique Hotel 20 Phúc La Hà Đông" class="wp-image-<?php echo (int) $img_branch3['id']; ?>"/></figure>
      <!-- /wp:image -->
      <!-- wp:group {"className":"mixLuxuryPhotoBadge"} -->
      <div class="wp-block-group mixLuxuryPhotoBadge">
        <!-- wp:paragraph {"className":"mixLuxuryPhotoBadgeNumber"} -->
        <p class="mixLuxuryPhotoBadgeNumber">03</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryPhotoBadgeLabel"} -->
        <p class="mixLuxuryPhotoBadgeLabel">Hà Đông - Xa La</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->
    </div>
    <!-- /wp:group -->

    <!-- wp:group {"className":"mixLuxuryBranchBody"} -->
    <div class="wp-block-group mixLuxuryBranchBody">
      <!-- wp:heading {"level":3,"className":"mixLuxuryBranchName"} -->
      <h3 class="wp-block-heading mixLuxuryBranchName">Mix Boutique Hotel 20 Phúc La Hà Đông</h3>
      <!-- /wp:heading -->

      <!-- wp:group {"className":"mixLuxuryBranchInfo"} -->
      <div class="wp-block-group mixLuxuryBranchInfo">
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">📍 20 Phố Phúc La, Khu đô thị Xa La, Hà Đông, Hà Nội</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">✓ Khu Hà Đông - Xa La yên tĩnh</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">✓ Phù hợp nghỉ theo giờ &amp; party kỷ niệm</p>
        <!-- /wp:paragraph -->
        <!-- wp:paragraph {"className":"mixLuxuryBranchInfoItem"} -->
        <p class="mixLuxuryBranchInfoItem">✓ Bãi đậu xe ô tô rộng rãi, an toàn</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:group -->

      <!-- wp:buttons {"className":"mixLuxuryBranchActions"} -->
      <div class="wp-block-buttons mixLuxuryBranchActions">
        <!-- wp:button {"className":"mixLuxuryBranchBtn mixLuxuryBranchBtnZalo mix-btn-booking"} -->
        <div class="wp-block-button mixLuxuryBranchBtn mixLuxuryBranchBtnZalo mix-btn-booking"><a class="wp-block-button__link wp-element-button" href="#booking">✉ Hỏi phòng</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"mixLuxuryBranchBtn mixLuxuryBranchBtnPhone"} -->
        <div class="wp-block-button mixLuxuryBranchBtn mixLuxuryBranchBtnPhone"><a class="wp-block-button__link wp-element-button" href="tel:0353660966">📞 Gọi ngay</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
  </article>
  <!-- /wp:group -->
  </div>
  <!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

</section>
<!-- /wp:group -->
