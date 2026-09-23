<?php
/**
 * Title: Trang Tĩnh - Nội Dung Trang & Điều Hướng Chính Sách
 * Slug: mixhotel/page-content
 * Categories: mixhotel
 * Keywords: page, noi dung, chinh sach, prose, policy
 * Block Types: core/group
 * Post Types: page
 */

$post_id   = get_the_ID();
$post_slug = get_post_field('post_name', $post_id);

// Tự động điều hướng các trang chính sách sang Dark Luxury patterns tương ứng
if (in_array($post_slug, ['chinh-sach-thanh-toan', 'thanh-toan', 'chinh-sach-thanh-toan-mixhotel'])) {
    echo do_blocks('<!-- wp:pattern {"slug":"mixhotel/policy-payment"} /-->');
    return;
} elseif (in_array($post_slug, ['chinh-sach-bao-mat-thong-tin', 'chinh-sach-bao-mat', 'bao-mat-thong-tin', 'chinh-sach-bao-mat-mixhotel'])) {
    echo do_blocks('<!-- wp:pattern {"slug":"mixhotel/policy-privacy"} /-->');
    return;
} elseif (in_array($post_slug, ['chinh-sach-dat-tra-phong', 'chinh-sach-dat-phong', 'dat-tra-phong', 'chinh-sach-dat-tra-phong-mixhotel'])) {
    echo do_blocks('<!-- wp:pattern {"slug":"mixhotel/policy-booking"} /-->');
    return;
} elseif (in_array($post_slug, ['tin-tuc', 'news', 'blog', 'bai-viet'])) {
    echo do_blocks('<!-- wp:pattern {"slug":"mixhotel/blog-archive-content"} /-->');
    return;
} elseif (in_array($post_slug, [
    'mix-boutique-premium-hotel',
    'mix-boutique-hotel-256b-dang-tien-dong',
    'mix-boutique-hotel-20-phuc-la-ha-dong',
])) {
    echo do_blocks('<!-- wp:pattern {"slug":"mixhotel/branch-detail"} /-->');
    return;
} elseif ($post_slug === 'khach-san-tinh-yeu') {
    echo do_blocks('<!-- wp:pattern {"slug":"mixhotel-theme/room-archive-content"} /-->');
    return;
}
?>
<!-- wp:html -->
<div class="mixLuxuryBreadcrumbs">
  <div class="inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a>
    <span>/</span>
    <span class="current"><?php the_title(); ?></span>
  </div>
</div>

<main class="mixLuxuryContainerNarrow" style="padding-top: 48px; padding-bottom: 80px;">
  <div class="mixLuxuryHeading">
    <h1 class="mixLuxuryTitle"><?php the_title(); ?></h1>
    <div class="mixLuxuryTitleDivider"></div>
  </div>

  <article class="mixPolicyCard" style="font-size: 16px; line-height: 1.8;">
    <?php the_content(); ?>
  </article>
</main>
<!-- /wp:html -->
