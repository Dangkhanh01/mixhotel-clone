<?php
/**
 * Title: Gallery - Lưới Ảnh Phòng 1:1 Dark Luxury
 * Slug: mixhotel/gallery-grid
 * Categories: mixhotel
 * Keywords: gallery, thu vien, anh phong, gold-rectangle
 * Block Types: core/group
 * Post Types: page
 */

$theme_uri = get_template_directory_uri();

// Nạp 32 phòng concept từ prototype Next.js @ui/src/data/galleryData.ts
$gallery_items = [];
$dataFile = get_template_directory() . '/inc-gallery-data.php';
if (file_exists($dataFile)) {
    $gallery_items = require $dataFile;
}

// Nạp thêm các phòng thực tế từ WordPress CPT hotel_room nếu có
$wp_rooms_query = new WP_Query([
    'post_type'      => 'hotel_room',
    'post_status'    => 'publish',
    'posts_per_page' => 50,
]);

if ($wp_rooms_query->have_posts()) {
    while ($wp_rooms_query->have_posts()) {
        $wp_rooms_query->the_post();
        $thumb = get_the_post_thumbnail_url(get_the_ID(), 'large');
        if ($thumb) {
            $branch_term = get_the_terms(get_the_ID(), 'hotel_branch_tax');
            $b_name = ($branch_term && !is_wp_error($branch_term)) ? $branch_term[0]->name : '186 Hoàng Ngân';
            $b_slug = ($branch_term && !is_wp_error($branch_term)) ? $branch_term[0]->slug : 'premium';
            
            array_unshift($gallery_items, [
                'id'         => get_post_field('post_name', get_the_ID()),
                'title'      => get_the_title(),
                'link'       => get_permalink(),
                'image'      => $thumb,
                'branchId'   => $b_slug,
                'branchName' => $b_name,
                'badge'      => 'Concept',
            ]);
        }
    }
    wp_reset_postdata();
}
?>
<!-- wp:html -->
<div class="mixLuxuryBreadcrumbs">
  <div class="inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a>
    <span>/</span>
    <span class="current">Gallery</span>
  </div>
</div>

<main class="galerryMix mixLuxuryContainer" style="padding-top: 40px; padding-bottom: 60px;">
  <!-- Title Block -->
  <div style="text-align: center; margin-bottom: 24px;">
    <div class="titleBlock_1">
      <a>
        <p class="titleText">GALLERY</p>
      </a>
    </div>
    <p style="color: #c5b8a5; max-width: 672px; margin: -8px auto 32px; font-size: 15px; line-height: 1.6; text-align: center;">
      Khám phá bộ sưu tập 32+ phòng concept lãng mạn, tinh tế với hình ảnh chụp thực tế 100% tại 3 cơ sở Mix Boutique Hotel.
    </p>
  </div>

  <!-- Subcategory Branch Filters -->
  <div class="wrapSubcateBlock_1">
    <div class="subcateBlock_1" id="mixGalleryBranchTabs">
      <button type="button" class="subcateName active" data-branch="all">Tất cả cơ sở</button>
      <button type="button" class="subcateName" data-branch="premium">Gallery Mix Boutique Hotel 186 Hoàng Ngân</button>
      <button type="button" class="subcateName" data-branch="dang-tien-dong">Gallery Mix Boutique Hotel 256B Đặng Tiến Đông</button>
      <button type="button" class="subcateName" data-branch="phuc-la">Gallery Mix Boutique Hotel 20 Phúc La Hà Đông</button>
    </div>
  </div>

  <!-- Gallery Grid -->
  <div class="galleryMixGrid" id="mixGalleryGridContainer">
    <?php foreach ($gallery_items as $item) : ?>
      <div class="galleryItemCol" data-branch="<?php echo esc_attr($item['branchId']); ?>">
        <figure class="gold-rectangle slideshow">
          <a href="<?php echo esc_url($item['link']); ?>" title="<?php echo esc_attr($item['title']); ?>">
            <img 
              src="<?php echo esc_url($item['image']); ?>" 
              alt="<?php echo esc_attr($item['title']); ?>" 
            />
            <div class="galleryHoverOverlay">
              <span>Xem chi tiết phòng &rarr;</span>
            </div>
          </a>
        </figure>
        <p class="galleryCardTitle">
          <a href="<?php echo esc_url($item['link']); ?>" title="<?php echo esc_attr($item['title']); ?>">
            <?php echo esc_html($item['title']); ?>
          </a>
        </p>
        <div class="galleryCardMeta">
          <span><?php echo esc_html($item['branchName'] . ' • ' . $item['badge']); ?></span>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <!-- Pagination Container -->
  <div class="galleryPagination" id="mixGalleryPagination"></div>

  <!-- Bottom Content Frame / SEO Article -->
  <article style="margin-top: 48px; margin-bottom: 32px;">
    <section style="padding: 32px; border-radius: 16px; border: 1px solid rgba(200, 137, 34, 0.25); background: #140e0a; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
      <header style="margin-bottom: 24px;">
        <h2 style="font-size: 24px; font-weight: 700; color: #ffe2a0; font-family: 'Philosopher', serif; margin: 0 0 8px;">
          Bộ Sưu Tập Hình Ảnh Khách Sạn Tình Yêu Mix Boutique Hotel
        </h2>
        <div style="width: 80px; height: 2px; background: #c88922; margin-bottom: 16px;"></div>
      </header>
      <div style="color: #eee4d3; line-height: 1.8; font-size: 15px; font-weight: 300;">
        <p style="margin-bottom: 16px;">
          Chào mừng bạn đến với bộ sưu tập hình ảnh thực tế của <strong>Mix Boutique Hotel</strong>. Tất cả hình ảnh trong Gallery được chụp trực tiếp tại 3 cơ sở của chúng tôi tại Hà Nội: <em>Mix Boutique Premium (186 Hoàng Ngân / Huỳnh Thúc Kháng)</em>, <em>Cơ sở 256B Đặng Tiến Đông</em>, và <em>Cơ sở 20 Phúc La - Hà Đông</em>.
        </p>
        <p style="margin-bottom: 16px;">
          Mỗi căn phòng tại Mix Hotel là một thế giới cảm xúc riêng biệt với hơn 32 concept độc bản: từ lãng mạn huyền ảo với trần ngàn sao <strong>Galaxy</strong>, bồng bềnh tiên cảnh tại <strong>Cloud Nine</strong>, nồng nhiệt thăng hoa cùng <strong>Inferno</strong>, đến những trải nghiệm kịch tính mới lạ tại <strong>Master &apos;n&apos; Slave</strong> hay sự dịu dàng của <strong>Eden</strong>.
        </p>
        <p>
          Toàn bộ phòng đều được trang bị đầy đủ tiện nghi cao cấp: bồn tắm sục Jacuzzi đôi ngập tràn bọt tuyết, ghế tình yêu Tantra uốn lượn quyến rũ, màn chiếu phim Full HD / 4K siêu nét cùng dịch vụ cho mượn trang phục Cosplay và Board Game tình yêu hoàn toàn miễn phí. Hãy bấm vào từng thẻ phòng để xem chi tiết không gian, bảng giá và đặt phòng kín đáo, riêng tư 100%!
        </p>
      </div>
    </section>
  </article>
</main>

<script>
(function() {
  const ITEMS_PER_PAGE = 12;
  let currentBranch = 'all';
  let currentPage = 1;

  function initGallery() {
    const tabs = document.querySelectorAll('#mixGalleryBranchTabs .subcateName');
    const container = document.getElementById('mixGalleryGridContainer');
    const pagContainer = document.getElementById('mixGalleryPagination');
    if (!container || !tabs.length) return;

    const allCards = Array.from(container.querySelectorAll('.galleryItemCol'));

    function render() {
      // Filter cards
      const matched = allCards.filter(card => {
        const b = card.getAttribute('data-branch') || '';
        return currentBranch === 'all' || b === currentBranch || b.includes(currentBranch);
      });

      const totalPages = Math.ceil(matched.length / ITEMS_PER_PAGE) || 1;
      if (currentPage > totalPages) currentPage = 1;

      // Show/hide cards
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      allCards.forEach(c => {
        c.style.setProperty('display', 'none', 'important');
      });
      matched.forEach((c, idx) => {
        if (idx >= startIndex && idx < endIndex) {
          c.style.setProperty('display', 'flex', 'important');
        }
      });

      // Render pagination
      if (totalPages <= 1) {
        pagContainer.innerHTML = '';
        return;
      }

      let pagHtml = '';
      if (currentPage > 1) {
        pagHtml += '<button type="button" class="pageBtn prevBtn">&lsaquo;</button>';
      }

      for (let p = 1; p <= totalPages; p++) {
        pagHtml += '<button type="button" class="pageBtn ' + (p === currentPage ? 'active' : '') + '" data-page="' + p + '">' + p + '</button>';
      }

      if (currentPage < totalPages) {
        pagHtml += '<button type="button" class="pageBtn nextBtn">&rsaquo;</button>';
      }

      pagContainer.innerHTML = pagHtml;

      // Attach pagination events
      pagContainer.querySelectorAll('.pageBtn').forEach(btn => {
        btn.addEventListener('click', function() {
          if (this.classList.contains('prevBtn')) {
            currentPage--;
          } else if (this.classList.contains('nextBtn')) {
            currentPage++;
          } else {
            currentPage = parseInt(this.getAttribute('data-page'), 10) || 1;
          }
          render();
          container.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }

    // Tab click events
    tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentBranch = this.getAttribute('data-branch') || 'all';
        currentPage = 1;
        render();
      });
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
</script>
<!-- /wp:html -->
