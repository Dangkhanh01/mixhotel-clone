<?php
/**
 * Title: Liên Hệ - Bản Đồ 3 Chi Nhánh Dark Luxury
 * Slug: mixhotel/contact-maps
 * Categories: mixhotel
 * Keywords: contact, maps, ban do, chi nhanh
 * Block Types: core/group
 * Post Types: page
 */

$branches_data = [
    [
        'title'   => 'CS1: Mix Premium Huỳnh Thúc Kháng',
        'address' => 'Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, Đống Đa, Hà Nội',
        'hotline' => '038 310 4010',
        'map_url' => 'https://maps.google.com/?q=8+ngach+29+ngo+49+Huynh+Thuc+Khang+Ha+Noi',
    ],
    [
        'title'   => 'CS2: 256B Đặng Tiến Đông',
        'address' => '256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội',
        'hotline' => '038 310 4010',
        'map_url' => 'https://maps.google.com/?q=256B+Dang+Tien+Dong+Ha+Noi',
    ],
    [
        'title'   => 'CS3: 20 Phúc La Hà Đông',
        'address' => '20 Phố Phúc La, Phúc La, Hà Đông, Hà Nội',
        'hotline' => '038 310 4010',
        'map_url' => 'https://maps.google.com/?q=20+Phuc+La+Ha+Dong+Ha+Noi',
    ],
];
?>
<!-- wp:group {"tagName":"section","className":"mixLuxuryContainer","style":{"spacing":{"padding":{"bottom":"80px"}}},"lock":{"move":true,"remove":true},"metadata":{"name":"Liên Hệ - Bản Đồ 3 Chi Nhánh Dark Luxury"}} -->
<section class="wp-block-group mixLuxuryContainer" style="padding-bottom:80px">

<!-- wp:group {"className":"mixLuxuryHeading"} -->
<div class="wp-block-group mixLuxuryHeading">
<!-- wp:paragraph {"className":"mixLuxuryKicker"} -->
<p class="mixLuxuryKicker">VỊ TRÍ &amp; BẢN ĐỒ</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"className":"mixLuxuryTitle"} -->
<h2 class="wp-block-heading mixLuxuryTitle">BẢN ĐỒ HỆ THỐNG CHI NHÁNH</h2>
<!-- /wp:heading -->
<!-- wp:group {"className":"mixLuxuryTitleDivider"} -->
<div class="wp-block-group mixLuxuryTitleDivider"></div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->

<!-- wp:columns {"className":"mixContactMapsGrid mapsGridResponsive"} -->
<div class="wp-block-columns mixContactMapsGrid mapsGridResponsive">
<?php foreach ($branches_data as $b) : ?>
<!-- wp:column {"className":"mixContactMapCol"} -->
<div class="wp-block-column mixContactMapCol">
<!-- wp:group {"className":"mixContactMapCard"} -->
<div class="wp-block-group mixContactMapCard">
<!-- wp:heading {"level":3,"className":"mixContactMapTitle"} -->
<h3 class="wp-block-heading mixContactMapTitle"><?php echo esc_html($b['title']); ?></h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"mixContactMapAddress"} -->
<p class="mixContactMapAddress">📍 <?php echo esc_html($b['address']); ?></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"mixContactMapHotline"} -->
<p class="mixContactMapHotline">📞 Hotline: <a href="tel:0383104010"><?php echo esc_html($b['hotline']); ?></a></p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"className":"mixContactMapActions"} -->
<div class="wp-block-buttons mixContactMapActions">
<!-- wp:button {"className":"mixContactMapBtn","width":100} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 mixContactMapBtn"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url($b['map_url']); ?>" target="_blank" rel="noopener noreferrer">Xem Chỉ Đường Trên Google Maps &rarr;</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
<?php endforeach; ?>
</div>
<!-- /wp:columns -->

</section>
<!-- /wp:group -->
