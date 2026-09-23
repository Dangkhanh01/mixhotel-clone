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
<!-- wp:html -->
<section class="mixLuxuryContainer" style="padding-bottom: 80px;" aria-label="Bản đồ vị trí các chi nhánh">
  <div class="mixLuxuryHeading">
    <span class="mixLuxuryKicker">VỊ TRÍ &amp; BẢN ĐỒ</span>
    <h2 class="mixLuxuryTitle">BẢN ĐỒ HỆ THỐNG CHI NHÁNH</h2>
    <div class="mixLuxuryTitleDivider"></div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;" class="mapsGridResponsive">
    <?php foreach ($branches_data as $b) : ?>
      <div style="padding: 24px; border-radius: 20px; background: #140e0a; border: 1px solid rgba(200, 137, 34, 0.25); display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 15px 35px rgba(0,0,0,0.4);">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; font-family: 'Philosopher', serif; color: #ffe2a0; margin: 0 0 10px;">
            <?php echo esc_html($b['title']); ?>
          </h3>
          <p style="font-size: 14px; color: #d4d4d8; line-height: 1.6; margin-bottom: 14px; min-height: 44px;">
            📍 <?php echo esc_html($b['address']); ?>
          </p>
          <p style="font-size: 14px; color: #c88922; font-weight: 600; margin-bottom: 20px;">
            📞 Hotline: <a href="tel:0383104010" style="color: #ffe2a0; text-decoration: none;"><?php echo esc_html($b['hotline']); ?></a>
          </p>
        </div>

        <a 
          href="<?php echo esc_url($b['map_url']); ?>" 
          target="_blank" 
          rel="noreferrer" 
          style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px 16px; border-radius: 12px; background: rgba(200, 137, 34, 0.15); border: 1px solid rgba(200, 137, 34, 0.4); color: #ffe2a0; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s ease; box-sizing: border-box;"
        >
          <span>Xem Chỉ Đường Trên Google Maps &rarr;</span>
        </a>
      </div>
    <?php endforeach; ?>
  </div>
</section>

<style>
@media (max-width: 991px) {
  .mapsGridResponsive {
    grid-template-columns: 1fr !important;
  }
}
</style>
<!-- /wp:html -->
