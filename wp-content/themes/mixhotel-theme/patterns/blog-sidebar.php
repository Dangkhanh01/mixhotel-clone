<?php
/**
 * Title: Blog - Sidebar
 * Slug: mixhotel/blog-sidebar
 * Categories: mixhotel
 * Keywords: blog, sidebar, danh muc
 * Block Types: core/group
 * Post Types: post
 */
?>
<!-- wp:group {"tagName":"aside","className":"mixBlogSidebar"} -->
<aside class="wp-block-group mixBlogSidebar" aria-label="Sidebar blog">

  <!-- Widget: Danh mục bài viết -->
  <!-- wp:html -->
  <div class="mixBlogSidebarWidget">
    <h3 class="mixBlogSidebarTitle">
      <span class="mixBlogSidebarIcon" aria-hidden="true">📂</span>
      Danh Mục
    </h3>
    <ul class="mixBlogCategoriesList">
      <?php
      $categories = get_categories([
          'orderby'    => 'count',
          'order'      => 'DESC',
          'hide_empty' => true,
      ]);
      foreach ($categories as $category) :
      ?>
      <li class="mixBlogCategoryItem">
        <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>" class="mixBlogCategoryLink">
          <span class="mixBlogCategoryName"><?php echo esc_html($category->name); ?></span>
          <span class="mixBlogCategoryCount">(<?php echo esc_html($category->count); ?>)</span>
        </a>
      </li>
      <?php endforeach; ?>
      <?php if (empty($categories)) : ?>
      <li class="mixBlogCategoryEmpty">Chưa có danh mục</li>
      <?php endif; ?>
    </ul>
  </div>

  <!-- Widget: Bài viết mới nhất -->
  <div class="mixBlogSidebarWidget">
    <h3 class="mixBlogSidebarTitle">
      <span class="mixBlogSidebarIcon" aria-hidden="true">📰</span>
      Bài Viết Mới Nhất
    </h3>
    <?php
    $recent_posts = new WP_Query([
        'post_type'      => 'post',
        'post_status'    => 'publish',
        'posts_per_page' => 5,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);

    if ($recent_posts->have_posts()) :
    ?>
    <ul class="mixBlogRecentList">
      <?php while ($recent_posts->have_posts()) : $recent_posts->the_post(); ?>
      <li class="mixBlogRecentItem">
        <a href="<?php echo esc_url(get_permalink()); ?>" class="mixBlogRecentLink">
          <?php if (has_post_thumbnail()) : ?>
          <div class="mixBlogRecentThumb">
            <?php
            the_post_thumbnail('thumbnail', [
                'class'   => 'mixBlogRecentThumbImg',
                'alt'     => esc_attr(get_the_title()),
                'loading' => 'lazy',
            ]);
            ?>
          </div>
          <?php endif; ?>
          <div class="mixBlogRecentInfo">
            <span class="mixBlogRecentTitle"><?php the_title(); ?></span>
            <span class="mixBlogRecentDate"><?php echo esc_html(get_the_date('d/m/Y')); ?></span>
          </div>
        </a>
      </li>
      <?php endwhile; ?>
    </ul>
    <?php
    wp_reset_postdata();
    else :
    ?>
    <p class="mixBlogRecentEmpty">Chưa có bài viết nào.</p>
    <?php endif; ?>
  </div>
  <!-- /wp:html -->

  <!-- Widget: CTA đặt phòng -->
  <!-- wp:group {"className":"mixBlogSidebarWidget mixBlogSidebarCTA"} -->
  <div class="wp-block-group mixBlogSidebarWidget mixBlogSidebarCTA">
    <!-- wp:group {"className":"mixBlogSidebarCTABox"} -->
    <div class="wp-block-group mixBlogSidebarCTABox">
      <!-- wp:paragraph {"className":"mixBlogSidebarCTATitle"} -->
      <p class="mixBlogSidebarCTATitle">🛎️ Đặt Phòng Ngay</p>
      <!-- /wp:paragraph -->
      <!-- wp:paragraph {"className":"mixBlogSidebarCTADesc"} -->
      <p class="mixBlogSidebarCTADesc">Trải nghiệm không gian lãng mạn tại Mix Boutique Hotel</p>
      <!-- /wp:paragraph -->
      <!-- wp:buttons -->
      <div class="wp-block-buttons">
        <!-- wp:button {"className":"mixBlogSidebarCTABtn"} -->
        <div class="wp-block-button mixBlogSidebarCTABtn"><a class="wp-block-button__link wp-element-button" href="#booking">ĐẶT PHÒNG NGAY</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
  </div>
  <!-- /wp:group -->

</aside>
<!-- /wp:group -->
