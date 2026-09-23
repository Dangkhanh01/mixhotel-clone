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

// 8 danh mục chuẩn từ prototype Next.js
$categories = [
    ['id' => 'all',       'name' => 'Tất Cả Bài Viết',    'subtitle' => 'CHIA SẺ & CẨM NANG HẸN HÒ',             'title' => 'TIN TỨC & BÀI VIẾT'],
    ['id' => 'review',    'name' => 'Review Khách Sạn',   'subtitle' => 'TRẢI NGHIỆM THỰC TẾ CÁC PHÒNG CONCEPT', 'title' => 'REVIEW KHÁCH SẠN TÌNH YÊU'],
    ['id' => 'hen-ho',    'name' => 'Địa Điểm Hẹn Hò',    'subtitle' => 'CHỐN HẸN HÒ LÃNG MẠN TẠI HÀ NỘI',       'title' => 'ĐỊA ĐIỂM HẸN HÒ DÀNH CHO CẶP ĐÔI'],
    ['id' => 'di-choi',   'name' => 'Địa Điểm Đi Chơi',   'subtitle' => 'GỢI Ý ĐỊA ĐIỂM HẸN HÒ CUỐI TUẦN',       'title' => 'ĐỊA ĐIỂM ĐI CHƠI CHO CẶP ĐÔI'],
    ['id' => 'qua-tang',  'name' => 'Gợi Ý Quà Tặng',     'subtitle' => 'SET QUÀ TẶNG & SETUP LÃNG MẠN',         'title' => 'GỢI Ý QUÀ TẶNG CÁC DỊP LỄ'],
    ['id' => 'kien-thuc', 'name' => 'Kiến Thức Khách Sạn','subtitle' => 'QUY CHUẨN DỊCH VỤ & BẢO MẬT MIX',       'title' => 'KIẾN THỨC VỀ KHÁCH SẠN'],
    ['id' => 'cam-nang',  'name' => 'Cẩm Nang Tình Yêu',  'subtitle' => 'BÍ QUYẾT GIỮ LỬA & THĂNG HOA CẢM XÚC',  'title' => 'CẨM NANG TÌNH YÊU'],
    ['id' => 'dia-chi',   'name' => 'Địa Chỉ Khách Sạn',  'subtitle' => 'HỆ THỐNG 3 CHI NHÁNH MIX BOUTIQUE',     'title' => 'CÁC ĐỊA CHỈ KHÁCH SẠN TÌNH YÊU'],
];

// Danh sách bài viết mẫu giàu dữ liệu từ @ui/src/app/tin-tuc/page.tsx
$articles = [
    [
        'id'       => 1,
        'slug'     => 'khach-san-vintage',
        'cat'      => 'review',
        'catName'  => 'Review Khách Sạn',
        'title'    => 'Trải nghiệm phòng khách sạn vintage tại Mix Hotel: Đâu là lựa chọn cho cảm xúc của bạn?',
        'excerpt'  => 'Khám phá phòng khách sạn phong cách vintage hoài cổ, mộc mạc và điện ảnh tại Mix Hotel. Hướng dẫn chọn phòng theo đúng mood, tiện ích bồn tắm và ngân sách cho cặp đôi.',
        'image'    => $theme_uri . '/assets/images/articles/khach-san-vintage-thumb.jpg',
        'date'     => '14/09/2026',
    ],
    [
        'id'       => 2,
        'slug'     => 'khach-san-phong-cach-tropical',
        'cat'      => 'hen-ho',
        'catName'  => 'Địa Điểm Hẹn Hò',
        'title'    => 'Khách sạn phong cách tropical: Trải nghiệm chọn phòng đúng "gu" cho buổi hẹn hò',
        'excerpt'  => 'Gợi ý phòng khách sạn phong cách nhiệt đới tropical theo vibe thiên nhiên tươi mát, cây xanh, ánh sáng tự nhiên và bảng giá phòng linh hoạt.',
        'image'    => $theme_uri . '/assets/images/articles/khach-san-phong-cach-tropical-thumb.jpg',
        'date'     => '12/09/2026',
    ],
    [
        'id'       => 3,
        'slug'     => 'khach-san-phong-cach-indochine',
        'cat'      => 'review',
        'catName'  => 'Review Khách Sạn',
        'title'    => 'Phòng khách sạn phong cách Indochine tại Mix Hotel: Cách tìm đúng "gu" cho trải nghiệm riêng tư',
        'excerpt'  => 'Bạn tìm khách sạn phong cách indochine nhưng phân vân giữa các hạng phòng? Hướng dẫn chọn phòng theo gu, tiện ích bồn tắm và bảng giá chi tiết.',
        'image'    => $theme_uri . '/assets/images/articles/khach-san-phong-cach-indochine-thumb.jpg',
        'date'     => '10/09/2026',
    ],
    [
        'id'       => 4,
        'slug'     => 'khach-san-gan-lang-bac',
        'cat'      => 'dia-chi',
        'catName'  => 'Địa Chỉ Khách Sạn',
        'title'    => 'Top 7 khách sạn gần Lăng Bác dễ di chuyển, giá theo giờ/qua đêm',
        'excerpt'  => 'Tổng hợp các khách sạn gần Lăng Bác đáp ứng tiêu chí: vị trí thuận tiện, giá rõ ràng, phòng sạch sẽ và phù hợp cho cặp đôi nghỉ ngơi.',
        'image'    => $theme_uri . '/assets/images/articles/khach-san-gan-lang-bac-thumb.jpg',
        'date'     => '08/09/2026',
    ],
    [
        'id'       => 5,
        'slug'     => 'so-sanh-khach-san',
        'cat'      => 'kien-thuc',
        'catName'  => 'Kiến Thức Khách Sạn',
        'title'    => 'So sánh khách sạn tình yêu và khách sạn truyền thống: Đâu là lựa chọn phù hợp cho bạn?',
        'excerpt'  => 'So sánh khách sạn tình yêu và khách sạn truyền thống về giá cả, tiện nghi và quy trình check-in để bạn lựa chọn đúng nhu cầu hẹn hò.',
        'image'    => $theme_uri . '/assets/images/articles/so-sanh-khach-san-thumb.jpg',
        'date'     => '05/09/2026',
    ],
    [
        'id'       => 6,
        'slug'     => 'bang-noi-quy-khach-san',
        'cat'      => 'kien-thuc',
        'catName'  => 'Kiến Thức Khách Sạn',
        'title'    => 'Nội Quy Khách Sạn Tình Yêu & Những Lưu Ý Quan Trọng Để Cặp Đôi Trải Nghiệm Trọn Vẹn',
        'excerpt'  => 'Bảng nội quy khách sạn tình yêu về thủ tục check-in, quy định độ tuổi và các lưu ý quan trọng để bạn và người ấy có buổi hẹn hò trọn vẹn.',
        'image'    => $theme_uri . '/assets/images/articles/bang-noi-quy-khach-san-thumb.jpg',
        'date'     => '01/09/2026',
    ],
    [
        'id'       => 7,
        'slug'     => 'khach-san-gan-pho-co',
        'cat'      => 'dia-chi',
        'catName'  => 'Địa Chỉ Khách Sạn',
        'title'    => 'Top 5 khách sạn gần phố cổ: Lựa chọn tinh tế cho cặp đôi tìm kiếm sự riêng tư và thoải mái',
        'excerpt'  => 'So sánh chi tiết ưu nhược điểm khi ở trong và gần Phố Cổ Hà Nội để chọn khách sạn phù hợp cho cặp đôi tìm kiếm sự lãng mạn và riêng tư.',
        'image'    => $theme_uri . '/assets/images/articles/khach-san-gan-pho-co-thumb.jpg',
        'date'     => '28/08/2026',
    ],
    [
        'id'       => 8,
        'slug'     => 'khach-san-gan-ho-guom',
        'cat'      => 'di-choi',
        'catName'  => 'Địa Điểm Đi Chơi',
        'title'    => 'Top 7 Khách Sạn Gần Hồ Gươm Đẹp, Sang Trọng Và Lãng Mạn',
        'excerpt'  => 'Bạn đang tìm khách sạn gần Hồ Gươm? Khám phá ngay danh sách các khách sạn từ 5 sao sang trọng đến boutique lãng mạn cho buổi tối hẹn hò.',
        'image'    => $theme_uri . '/assets/images/articles/khach-san-gan-ho-guom-thumb.webp',
        'date'     => '25/08/2026',
    ],
    [
        'id'       => 9,
        'slug'     => 'set-qua-tang-lang-man',
        'cat'      => 'qua-tang',
        'catName'  => 'Gợi Ý Quà Tặng',
        'title'    => 'Gợi ý set quà tặng lãng mạn trong phòng khách sạn khiến người ấy tan chảy',
        'excerpt'  => 'Dịch vụ decor phòng tiệc sinh nhật, kỷ niệm với rượu vang Pháp, dâu tây nhúng socola và hoa tươi được ưa chuộng nhất tại Mix Hotel.',
        'image'    => $theme_uri . '/assets/images/event-3.jpg',
        'date'     => '22/08/2026',
    ],
    [
        'id'       => 10,
        'slug'     => 'bi-quyet-tao-bat-ngo',
        'cat'      => 'cam-nang',
        'catName'  => 'Cẩm Nang Tình Yêu',
        'title'    => 'Bí quyết tạo bất ngờ cho bạn gái nhân dịp kỷ niệm ngày yêu nhau',
        'excerpt'  => 'Từ việc chọn concept phòng có bồn sục Jacuzzi đôi, setup hoa hồng nến lung linh đến chuẩn bị quà tặng tinh tế khiến nàng nhớ mãi.',
        'image'    => $theme_uri . '/assets/images/tvha-2.webp',
        'date'     => '20/08/2026',
    ],
];

// Query các bài viết WP thực tế nếu có
$wp_posts = new WP_Query([
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => 20,
]);

if ($wp_posts->have_posts()) {
    while ($wp_posts->have_posts()) {
        $wp_posts->the_post();
        $thumb = get_the_post_thumbnail_url(get_the_ID(), 'large');
        if (!$thumb) {
            $thumb = $theme_uri . '/assets/images/articles/khach-san-vintage-thumb.jpg';
        }
        $post_cats = get_the_category();
        $cat_slug = !empty($post_cats) ? $post_cats[0]->slug : 'all';
        $cat_name = !empty($post_cats) ? $post_cats[0]->name : 'Tin tức';

        array_unshift($articles, [
            'id'       => get_the_ID(),
            'slug'     => get_post_field('post_name', get_the_ID()),
            'cat'      => $cat_slug,
            'catName'  => $cat_name,
            'title'    => get_the_title(),
            'excerpt'  => get_the_excerpt() ?: wp_trim_words(get_the_content(), 25),
            'image'    => $thumb,
            'date'     => get_the_date('d/m/Y'),
        ]);
    }
    wp_reset_postdata();
}
?>
<!-- wp:html -->
<div class="mixLuxuryBreadcrumbs">
  <div class="inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a>
    <span>/</span>
    <span class="current">Tin tức</span>
  </div>
</div>

<main class="mixLuxuryContainer" style="padding-top: 48px; padding-bottom: 80px;">
  <!-- Heading & Kicker -->
  <div class="mixLuxuryHeading">
    <span class="mixLuxuryKicker" id="mixBlogSubtitle">CHIA SẺ &amp; CẨM NANG HẸN HÒ</span>
    <h1 class="mixLuxuryTitle" id="mixBlogTitle">TIN TỨC &amp; BÀI VIẾT</h1>
    <div class="mixLuxuryTitleDivider"></div>
  </div>

  <!-- 8 Category Pills (Tabs) -->
  <div class="mixBlogCategories" id="mixBlogCatTabs">
    <?php foreach ($categories as $idx => $c) : ?>
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

  <!-- Article Grid -->
  <div class="mixBlogGrid" id="mixBlogGridContainer">
    <?php foreach ($articles as $art) : 
      $art_link = home_url('/' . $art['slug'] . '/');
    ?>
      <article class="mixBlogCard" data-cat="<?php echo esc_attr($art['cat']); ?>">
        <div>
          <div class="mixBlogCardThumb">
            <a href="<?php echo esc_url($art_link); ?>">
              <img src="<?php echo esc_url($art_image = $art['image']); ?>" alt="<?php echo esc_attr($art['title']); ?>" loading="lazy" />
            </a>
            <span class="mixBlogCardTag">
              <?php echo esc_html($art['catName']); ?>
            </span>
          </div>

          <div class="mixBlogCardBody">
            <div class="mixBlogCardDate">
              <span>📅</span>
              <span><?php echo esc_html($art['date']); ?></span>
            </div>

            <h2 class="mixBlogCardTitle">
              <a href="<?php echo esc_url($art_link); ?>" style="color: inherit; text-decoration: none;">
                <?php echo esc_html($art['title']); ?>
              </a>
            </h2>

            <p class="mixBlogCardExcerpt">
              <?php echo esc_html($art['excerpt']); ?>
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
    <?php endforeach; ?>
  </div>

  <!-- Pagination -->
  <div class="galleryPagination" id="mixBlogPagination" style="margin-top: 48px;"></div>
</main>

<script>
(function() {
  const ITEMS_PER_PAGE = 6;
  let currentCat = 'all';
  let currentPage = 1;

  function initBlog() {
    const tabs = document.querySelectorAll('#mixBlogCatTabs .mixBlogCategoryPill');
    const container = document.getElementById('mixBlogGridContainer');
    const pagContainer = document.getElementById('mixBlogPagination');
    const titleEl = document.getElementById('mixBlogTitle');
    const subtitleEl = document.getElementById('mixBlogSubtitle');

    if (!container || !tabs.length) return;

    const allCards = Array.from(container.querySelectorAll('.mixBlogCard'));

    function render() {
      const matched = allCards.filter(card => {
        const c = card.getAttribute('data-cat') || '';
        return currentCat === 'all' || c === currentCat;
      });

      const totalPages = Math.ceil(matched.length / ITEMS_PER_PAGE) || 1;
      if (currentPage > totalPages) currentPage = 1;

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      allCards.forEach(c => c.style.display = 'none');
      matched.forEach((c, idx) => {
        if (idx >= startIndex && idx < endIndex) {
          c.style.display = 'flex';
        }
      });

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

    tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentCat = this.getAttribute('data-cat') || 'all';
        if (titleEl && this.getAttribute('data-title')) {
          titleEl.innerText = this.getAttribute('data-title');
        }
        if (subtitleEl && this.getAttribute('data-subtitle')) {
          subtitleEl.innerText = this.getAttribute('data-subtitle');
        }
        currentPage = 1;
        render();
      });
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog);
  } else {
    initBlog();
  }
})();
</script>
<!-- /wp:html -->
