<?php
/**
 * Title: About - Thư Viện Ảnh
 * Slug: mixhotel/about-gallery
 * Categories: mixhotel
 * Keywords: about, gallery, anh
 * Block Types: core/group
 * Post Types: page
 */
?>
<!-- wp:html -->
<section class="mixAboutGallery" aria-label="Thư viện ảnh khách sạn">
  <div class="mix-container">
    <div class="mixSectionHeader">
      <p class="mixSectionKicker">THƯ VIỆN HÌNH ẢNH</p>
      <h2 class="mixSectionTitle">KHÔNG GIAN MIX BOUTIQUE HOTEL</h2>
      <p class="mixSectionSubtitle">Khám phá vẻ đẹp của từng không gian, từng góc phòng tại Mix Boutique Hotel</p>
    </div>

    <?php
    // WP_Query lấy hotel_room có featured image để tạo gallery
    $gallery_args = [
        'post_type'      => 'hotel_room',
        'post_status'    => 'publish',
        'posts_per_page' => 9,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
        'meta_query'     => [
            [
                'key'     => '_thumbnail_id',
                'compare' => 'EXISTS',
            ]
        ],
    ];
    $gallery_query = new WP_Query($gallery_args);

    if ($gallery_query->have_posts()) :
    ?>
    <div class="mixAboutGalleryGrid">
      <?php while ($gallery_query->have_posts()) : $gallery_query->the_post(); ?>
        <?php if (has_post_thumbnail()) : ?>
        <a href="<?php echo esc_url(get_permalink()); ?>" class="mixAboutGalleryItem" title="<?php the_title_attribute(); ?>">
          <?php
          the_post_thumbnail('large', [
              'class'   => 'mixAboutGalleryImg',
              'alt'     => esc_attr(get_the_title()),
              'loading' => 'lazy',
          ]);
          ?>
          <div class="mixAboutGalleryOverlay">
            <span class="mixAboutGalleryOverlayText"><?php echo esc_html(get_the_title()); ?></span>
          </div>
        </a>
        <?php endif; ?>
      <?php endwhile; ?>
      <?php wp_reset_postdata(); ?>
    </div>
    <?php else : ?>
    <!-- Fallback khi chưa có phòng -->
    <div class="mixAboutGalleryPlaceholder">
      <p>Thư viện ảnh đang được cập nhật. Vui lòng quay lại sau!</p>
      <a href="/khach-san-tinh-yeu/" class="mixAboutIntroBtn">Xem danh sách phòng →</a>
    </div>
    <?php endif; ?>

    <div class="mixAboutGalleryActions">
      <a href="/gallery/" class="mixAboutIntroBtn">XEM TẤT CẢ HÌNH ẢNH →</a>
    </div>
  </div>
</section>
<!-- /wp:html -->
