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
$content   = get_post_field('post_content', $post_id);

// Nếu trang đã có nội dung trong Database (do Admin sửa trong wp-admin/post.php), ưu tiên hiển thị the_content()
if (!empty(trim((string) $content))) {
    the_content();
    return;
}

// Fallback: Tự động điều hướng các trang chính sách sang Dark Luxury patterns tương ứng nếu nội dung rỗng
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
    echo do_blocks('<!-- wp:pattern {"slug":"mixhotel/room-archive-content"} /-->');
    return;
}

?>
<!-- wp:group {"className":"mixLuxuryBreadcrumbs"} -->
<div class="wp-block-group mixLuxuryBreadcrumbs">
  <div class="inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a>
    <span>/</span>
    <span class="current"><?php the_title(); ?></span>
  </div>
</div>
<!-- /wp:group -->

<!-- wp:group {"tagName":"main","className":"mixLuxuryContainerNarrow","style":{"spacing":{"padding":{"top":"48px","bottom":"80px"}}}} -->
<main class="wp-block-group mixLuxuryContainerNarrow" style="padding-top:48px;padding-bottom:80px">
  <!-- wp:group {"className":"mixLuxuryHeading"} -->
  <div class="wp-block-group mixLuxuryHeading">
    <!-- wp:heading {"level":1,"className":"mixLuxuryTitle"} -->
    <h1 class="wp-block-heading mixLuxuryTitle"><?php the_title(); ?></h1>
    <!-- /wp:heading -->
    <div class="mixLuxuryTitleDivider"></div>
  </div>
  <!-- /wp:group -->

  <!-- wp:group {"tagName":"article","className":"mixPolicyCard","style":{"typography":{"fontSize":"16px","lineHeight":"1.8"}}} -->
  <article class="wp-block-group mixPolicyCard" style="font-size:16px;line-height:1.8">
    <?php the_content(); ?>
  </article>
  <!-- /wp:group -->
</main>
<!-- /wp:group -->

