<?php
/**
 * Title: About - Thư Viện Ảnh
 * Slug: mixhotel/about-gallery
 * Categories: mixhotel
 * Keywords: about, gallery, anh
 * Block Types: core/group
 * Post Types: page
 */

$theme_uri = get_template_directory_uri();

// Retrieve 9 room images
$gallery_items = [];
$gallery_args = [
    'post_type'      => 'hotel_room',
    'post_status'    => 'publish',
    'posts_per_page' => 9,
    'orderby'        => 'menu_order',
    'order'          => 'ASC',
];
$gallery_query = new WP_Query($gallery_args);
if ($gallery_query->have_posts()) {
    while ($gallery_query->have_posts()) {
        $gallery_query->the_post();
        $thumb = get_the_post_thumbnail_url(get_the_ID(), 'large');
        if ($thumb) {
            $gallery_items[] = [
                'title' => get_the_title(),
                'link'  => get_permalink(),
                'image' => $thumb,
            ];
        }
    }
    wp_reset_postdata();
}

// Fallback to theme images if query empty
if (empty($gallery_items)) {
    $fallback_images = [
        'photo-stage-featured.webp' => 'Phòng Galaxy Suite',
        'photo-tile-bathtub.webp'   => 'Phòng Bồn Tắm Jacuzzi',
        'photo-tile-tantra.webp'    => 'Phòng Ghế Tình Yêu Tantra',
        'room-inferno.webp'         => 'Phòng Inferno',
        'room-galaxy.webp'          => 'Phòng Galaxy',
        'room-cloud-nine.webp'      => 'Phòng Cloud Nine',
        'room-eden.webp'            => 'Phòng Eden',
        'event-1.jpg'               => 'Trang Trí Hoa Nến Lãng Mạn',
        'event-2.jpg'               => 'Set Rượu Vang & Bánh Kem',
    ];
    foreach ($fallback_images as $img_file => $title) {
        $gallery_items[] = [
            'title' => $title,
            'link'  => '/khach-san-tinh-yeu/',
            'image' => $theme_uri . '/assets/images/' . $img_file,
        ];
    }
}
?>
<!-- wp:group {"tagName":"section","className":"mixAboutGallery","lock":{"move":true,"remove":true},"metadata":{"name":"About Gallery"}} -->
<section class="wp-block-group mixAboutGallery">

<!-- wp:group {"className":"mix-container"} -->
<div class="wp-block-group mix-container">

<!-- wp:group {"className":"mixSectionHeader"} -->
<div class="wp-block-group mixSectionHeader">
<!-- wp:paragraph {"className":"mixSectionKicker"} -->
<p class="mixSectionKicker">THƯ VIỆN HÌNH ẢNH</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"className":"mixSectionTitle"} -->
<h2 class="wp-block-heading mixSectionTitle">KHÔNG GIAN MIX BOUTIQUE HOTEL</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"mixSectionSubtitle"} -->
<p class="mixSectionSubtitle">Khám phá vẻ đẹp của từng không gian, từng góc phòng tại Mix Boutique Hotel</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"mixAboutGalleryGrid"} -->
<div class="wp-block-group mixAboutGalleryGrid">
<?php foreach ($gallery_items as $item) : ?>
<!-- wp:image {"sizeSlug":"large","linkDestination":"custom","className":"mixAboutGalleryItem"} -->
<figure class="wp-block-image size-large mixAboutGalleryItem"><a href="<?php echo esc_url($item['link']); ?>"><img src="<?php echo esc_url($item['image']); ?>" alt="<?php echo esc_attr($item['title']); ?>" loading="lazy"/></a></figure>
<!-- /wp:image -->
<?php endforeach; ?>
</div>
<!-- /wp:group -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"32px"}}}} -->
<div class="wp-block-buttons" style="margin-top:32px">
<!-- wp:button {"className":"mixAboutIntroBtn"} -->
<div class="wp-block-button mixAboutIntroBtn"><a class="wp-block-button__link wp-element-button" href="/gallery/">XEM TẤT CẢ HÌNH ẢNH &rarr;</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

</section>
<!-- /wp:group -->
