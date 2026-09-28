<?php
/**
 * Title: Trang 404 - Không Tìm Thấy (.block404)
 * Slug: mixhotel/page-404
 * Categories: mixhotel
 * Keywords: 404, not found, block404, loi
 * Block Types: core/group
 * Post Types: page
 */
?>
<!-- wp:group {"tagName":"main","className":"block404 mixLuxuryContainerNarrow mix-page-404","lock":{"move":true,"remove":true},"metadata":{"name":"Trang 404"}} -->
<main class="wp-block-group block404 mixLuxuryContainerNarrow mix-page-404">

<!-- wp:paragraph {"className":"mix-404-number"} -->
<p class="mix-404-number">404</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":1,"className":"mix-404-title"} -->
<h1 class="wp-block-heading mix-404-title">KHÔNG TÌM THẤY TRANG BẠN YÊU CẦU</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"mix-404-desc"} -->
<p class="mix-404-desc">Đường dẫn bạn truy cập có thể đã hết hạn, bị thay đổi hoặc không tồn tại. Đừng để cảm xúc bị gián đoạn, hãy khám phá các phòng concept lãng mạn của Mix Hotel ngay!</p>
<!-- /wp:paragraph -->

<!-- wp:html -->
<div class="btnBlock" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 16px; margin-bottom: 40px;">
  <div style="margin: 0; padding: 0; background: transparent;">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="mixCtaBtn" style="display: inline-block; padding: 12px 32px; font-size: 14px;">
      Về Trang Chủ
    </a>
  </div>
  <div style="margin: 0; padding: 0; background: transparent;">
    <a href="<?php echo esc_url(home_url('/khach-san-tinh-yeu/')); ?>" class="mix-404-btn-alt">
      Xem Danh Sách Phòng
    </a>
  </div>
</div>
<!-- /wp:html -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"14px"}},"textColor":"text-muted"} -->
<p class="has-text-muted-color has-text-color" style="font-size:14px">Cần hỗ trợ giữ phòng gấp? Hotline 24/7: <a href="tel:0383104010" style="color: #ffe2a0; font-weight: 700; text-decoration: none;">038 310 4010</a></p>
<!-- /wp:paragraph -->

</main>
<!-- /wp:group -->
