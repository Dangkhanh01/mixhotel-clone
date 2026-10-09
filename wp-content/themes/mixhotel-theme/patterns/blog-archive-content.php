<?php
/**
 * Title: Blog - Trang Danh Sách Bài Viết Dark Luxury
 * Slug: mixhotel/blog-archive-content
 * Categories: mixhotel
 * Keywords: blog, archive, tin tuc, magazine
 * Block Types: core/group
 * Post Types: post
 */

$theme_uri = get_template_directory_uri();

// Lấy tất cả danh mục thực tế từ WordPress (loại trừ Uncategorized / Chưa phân loại)
$uncategorized = get_term_by('slug', 'chua-phan-loai', 'category');
$exclude_ids = $uncategorized ? [$uncategorized->term_id] : [];

$wp_categories = get_categories([
    'taxonomy'   => 'category',
    'hide_empty' => false,
    'exclude'    => $exclude_ids,
    'orderby'    => 'id',
    'order'      => 'ASC',
]);

// Danh sách danh mục cho Tab Filter (Bắt đầu với tab "Tất Cả")
$categories_tabs = [
    [
        'id'       => 'all',
        'name'     => 'Tất Cả Bài Viết',
        'subtitle' => 'CHIA SẺ & CẨM NANG HẸN HÒ',
        'title'    => 'TIN TỨC & BÀI VIẾT',
    ],
];

foreach ($wp_categories as $wcat) {
    $meta_title = get_term_meta($wcat->term_id, '_mixhotel_cat_title', true);
    $meta_sub   = get_term_meta($wcat->term_id, '_mixhotel_cat_subtitle', true);

    $categories_tabs[] = [
        'id'       => $wcat->slug,
        'name'     => $wcat->name,
        'subtitle' => $meta_sub ?: 'CHIA SẺ & CẨM NANG HẸN HÒ',
        'title'    => $meta_title ?: mb_strtoupper($wcat->name, 'UTF-8'),
    ];
}

// Query toàn bộ bài viết thực tế từ WordPress Database (100% dữ liệu thật)
$blog_query = new WP_Query([
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => 48,
    'orderby'        => 'date',
    'order'          => 'DESC',
]);
?>
<!-- wp:group {"className":"mixLuxuryBreadcrumbs"} -->
<div class="wp-block-group mixLuxuryBreadcrumbs">
  <div class="inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a>
    <span>/</span>
    <span class="current">Tin tức</span>
  </div>
</div>
<!-- /wp:group -->

<!-- wp:group {"tagName":"main","className":"mixLuxuryContainer","style":{"spacing":{"padding":{"top":"48px","bottom":"80px"}}}} -->
<main class="wp-block-group mixLuxuryContainer" style="padding-top:48px;padding-bottom:80px">
  
  <!-- Heading & Kicker -->
  <!-- wp:group {"className":"mixLuxuryHeading"} -->
  <div class="wp-block-group mixLuxuryHeading">
    <!-- wp:paragraph {"className":"mixLuxuryKicker"} -->
    <p class="mixLuxuryKicker" id="mixBlogSubtitle">CHIA SẺ &amp; CẨM NANG HẸN HÒ</p>
    <!-- /wp:paragraph -->
    <!-- wp:heading {"level":1,"className":"mixLuxuryTitle"} -->
    <h1 class="wp-block-heading mixLuxuryTitle" id="mixBlogTitle">TIN TỨC &amp; BÀI VIẾT</h1>
    <!-- /wp:heading -->
    <div class="mixLuxuryTitleDivider"></div>
  </div>
  <!-- /wp:group -->

  <!-- Dynamic Category Pills (Tabs) & Article Grid -->
  <!-- wp:html -->
  <div class="mixBlogCategories" id="mixBlogCatTabs">
    <?php foreach ($categories_tabs as $idx => $c) : ?>
      <button 
        type="button" 
        class="mixBlogCategoryPill <?php echo $idx === 0 ? 'active' : ''; ?>"
        data-cat="<?php echo esc_attr($c['id']); ?>"
        data-title="<?php echo esc_attr($c['title']); ?>"
        data-subtitle="<?php echo esc_attr($c['subtitle']); ?>"
        style="cursor: pointer;"
      >
        <?php echo esc_html($c['name']); ?>
      </button>
    <?php endforeach; ?>
  </div>

  <div class="mixBlogGrid" id="mixBlogGridContainer">
    <?php if ($blog_query->have_posts()) : ?>
      <?php while ($blog_query->have_posts()) : $blog_query->the_post(); 
        $art_id    = get_the_ID();
        $art_link  = get_permalink();
        $art_title = get_the_title();
        $art_date  = get_the_date('d/m/Y');
        $art_thumb = get_the_post_thumbnail_url($art_id, 'large');
        if (!$art_thumb) {
            $art_thumb = $theme_uri . '/assets/images/articles/khach-san-vintage-thumb.jpg';
        }
        $post_cats = get_the_category();
        $primary_cat = !empty($post_cats) ? $post_cats[0] : null;
        $cat_slug = $primary_cat ? $primary_cat->slug : 'all';
        $cat_name = $primary_cat ? $primary_cat->name : 'Tin tức';
        $art_excerpt = get_the_excerpt() ?: wp_trim_words(get_the_content(), 25);
      ?>
        <article class="mixBlogCard" data-cat="<?php echo esc_attr($cat_slug); ?>">
          <div>
            <div class="mixBlogCardThumb">
              <a href="<?php echo esc_url($art_link); ?>">
                <img src="<?php echo esc_url($art_thumb); ?>" alt="<?php echo esc_attr($art_title); ?>" loading="lazy" />
              </a>
              <span class="mixBlogCardTag">
                <?php echo esc_html($cat_name); ?>
              </span>
            </div>

            <div class="mixBlogCardBody">
              <div class="mixBlogCardDate">
                <span>📅</span>
                <span><?php echo esc_html($art_date); ?></span>
              </div>

              <h2 class="mixBlogCardTitle">
                <a href="<?php echo esc_url($art_link); ?>" style="color: inherit; text-decoration: none;">
                  <?php echo esc_html($art_title); ?>
                </a>
              </h2>

              <p class="mixBlogCardExcerpt">
                <?php echo esc_html($art_excerpt); ?>
              </p>
            </div>
          </div>

          <div class="mixBlogCardFooter">
            <a href="<?php echo esc_url($art_link); ?>" class="mixBlogCardReadMore">
              <span>Đọc tiếp</span>
              <span>&rarr;</span>
            </a>
          </div>
        </article>
      <?php endwhile; wp_reset_postdata(); ?>
    <?php else : ?>
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #a1a1aa;">
        <p style="font-size: 18px; margin-bottom: 16px;">Hiện chưa có bài viết nào được đăng tải.</p>
        <a href="<?php echo esc_url(home_url('/')); ?>" class="mixBlogCategoryPill" style="display: inline-block;">Quay lại trang chủ</a>
      </div>
    <?php endif; ?>
  </div>

  <div class="galleryPagination" id="mixBlogPagination" style="margin-top: 48px;"></div>
  <!-- /wp:html -->

</main>
<!-- /wp:group -->
