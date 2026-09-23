<?php
/**
 * Title: Blog - Nội Dung Bài Viết Chi Tiết Dark Luxury
 * Slug: mixhotel/blog-single-content
 * Categories: mixhotel
 * Keywords: blog, single, bai viet, toc, dark luxury
 * Block Types: core/group
 * Post Types: post
 */

$theme_uri   = get_template_directory_uri();
$post_id     = get_the_ID();
$post_title  = get_the_title();
$post_link   = get_permalink();
$post_date   = get_the_date('d/m/Y');
$post_author = get_the_author() ?: 'Mix Boutique';
$categories  = get_the_category();
$cat_name    = !empty($categories) ? $categories[0]->name : 'Tin Tức';
$cat_link    = !empty($categories) ? get_category_link($categories[0]->term_id) : home_url('/tin-tuc/');
$thumb_url   = get_the_post_thumbnail_url($post_id, 'full');
$excerpt     = get_the_excerpt();

// Related posts query
$related_query = new WP_Query([
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => 3,
    'post__not_in'   => [$post_id],
    'orderby'        => 'rand',
]);
?>
<!-- wp:html -->
<div class="mixLuxuryBreadcrumbs">
  <div class="inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a>
    <span>/</span>
    <a href="<?php echo esc_url(home_url('/tin-tuc/')); ?>">Tin tức</a>
    <span>/</span>
    <a href="<?php echo esc_url($cat_link); ?>"><?php echo esc_html($cat_name); ?></a>
    <span>/</span>
    <span class="current"><?php echo esc_html(wp_trim_words($post_title, 6, '...')); ?></span>
  </div>
</div>

<main class="mixLuxuryContainerNarrow" style="padding-top: 48px; padding-bottom: 80px;">
  <!-- Article Header -->
  <header class="mixArticleHeader">
    <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 9999px; background: rgba(200, 137, 34, 0.15); border: 1px solid rgba(200, 137, 34, 0.3); color: #ffe2a0; font-size: 12px; font-weight: 700; text-transform: uppercase; font-family: 'Philosopher', serif; margin-bottom: 16px;">
      <span>📰</span>
      <span><?php echo esc_html($cat_name); ?></span>
    </div>

    <h1 style="font-size: clamp(26px, 4vw, 44px); font-weight: 900; font-family: 'Philosopher', serif; color: #fff8ec; line-height: 1.25; margin: 0 0 20px;">
      <?php echo esc_html($post_title); ?>
    </h1>

    <!-- Meta Information Bar -->
    <div class="mixArticleMeta">
      <div>
        <span style="color: #71717a;">Bởi:</span>
        <strong style="color: #ffe2a0;"><?php echo esc_html($post_author); ?></strong>
      </div>
      <span style="color: #3f3f46;">•</span>
      <div>
        <span>📅 <?php echo esc_html($post_date); ?></span>
      </div>
      <span style="color: #3f3f46;">•</span>
      <div>
        <span>⏱ 5 phút đọc</span>
      </div>
    </div>

    <!-- Sapo / Lead Paragraph -->
    <?php if ($excerpt) : ?>
      <div class="mixArticleSapo">
        <?php echo esc_html($excerpt); ?>
      </div>
    <?php endif; ?>

    <!-- Featured Image -->
    <?php if ($thumb_url) : ?>
      <div style="width: 100%; border-radius: 20px; overflow: hidden; border: 1px solid rgba(200, 137, 34, 0.3); margin-bottom: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
        <img 
          src="<?php echo esc_url($thumb_url); ?>" 
          alt="<?php echo esc_attr($post_title); ?>" 
          style="width: 100%; height: auto; display: block;" 
          loading="eager"
        />
      </div>
    <?php endif; ?>
  </header>

  <!-- Table of Contents Auto-box -->
  <div class="mixArticleToc" id="mixArticleTocBox" style="display: none;">
    <div class="mixArticleTocTitle">📑 Mục Lục Bài Viết</div>
    <ul class="mixArticleTocList" id="mixArticleTocList"></ul>
  </div>

  <!-- Main Article Content -->
  <article class="mixArticleContent" id="mixMainArticleBody">
    <?php the_content(); ?>
  </article>

  <!-- Social Share Buttons -->
  <div class="mixArticleShare">
    <strong style="color: #ffe2a0; font-size: 14px; font-family: 'Philosopher', serif;">Chia sẻ bài viết:</strong>
    <a 
      href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode($post_link); ?>" 
      target="_blank" 
      rel="noreferrer" 
      style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; background: #1877f2; color: #fff; font-size: 12px; font-weight: 700; text-decoration: none;"
    >
      Facebook
    </a>
    <a 
      href="https://zalo.me/share?url=<?php echo urlencode($post_link); ?>" 
      target="_blank" 
      rel="noreferrer" 
      style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; background: #03a5fa; color: #fff; font-size: 12px; font-weight: 700; text-decoration: none;"
    >
      Zalo
    </a>
    <button 
      type="button" 
      onclick="navigator.clipboard.writeText('<?php echo esc_js($post_link); ?>'); alert('Đã sao chép liên kết bài viết!');" 
      style="padding: 8px 16px; border-radius: 8px; background: rgba(255,255,255,0.08); border: 1px solid rgba(200, 137, 34, 0.3); color: #ffe2a0; font-size: 12px; font-weight: 600; cursor: pointer;"
    >
      Sao chép link
    </button>
  </div>

  <!-- Booking CTA Box -->
  <div class="mixCtaBanner" style="margin-top: 48px; margin-bottom: 60px;">
    <h3 class="mixCtaTitle">Trải Nghiệm Không Gian Lãng Mạn Tại Mix Hotel</h3>
    <p class="mixCtaDesc">
      Đặt phòng trước 15-30 phút để nhận trọn gói ưu đãi giảm 10% và chuẩn bị phòng ốc chỉn chu nhất.
    </p>
    <button type="button" class="callContactLocate mixCtaBtn">
      ĐẶT PHÒNG NGAY
    </button>
  </div>

  <!-- Related Articles -->
  <?php if ($related_query->have_posts()) : ?>
    <section style="border-top: 1px solid rgba(200, 137, 34, 0.2); padding-top: 48px;">
      <div class="mixLuxuryHeading" style="text-align: left; margin-bottom: 28px;">
        <span class="mixLuxuryKicker">CHỦ ĐỀ LIÊN QUAN</span>
        <h2 class="mixLuxuryTitle" style="font-size: 26px;">BÀI VIẾT BẠN CÓ THỂ QUAN TÂM</h2>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;" class="relatedGridResponsive">
        <?php while ($related_query->have_posts()) : $related_query->the_post(); 
          $r_thumb = get_the_post_thumbnail_url(get_the_ID(), 'medium_large') ?: $theme_uri . '/assets/images/articles/khach-san-vintage-thumb.jpg';
        ?>
          <a href="<?php echo esc_url(get_permalink()); ?>" class="mixBlogCard" style="text-decoration: none;">
            <div class="mixBlogCardThumb" style="height: 180px;">
              <img src="<?php echo esc_url($r_thumb); ?>" alt="<?php echo esc_attr(get_the_title()); ?>" loading="lazy" />
            </div>
            <div class="mixBlogCardBody" style="padding: 16px;">
              <div class="mixBlogCardDate" style="margin-bottom: 8px;">
                <span>📅 <?php echo esc_html(get_the_date('d/m/Y')); ?></span>
              </div>
              <h4 class="mixBlogCardTitle" style="font-size: 15px; margin: 0 0 10px;">
                <?php echo esc_html(get_the_title()); ?>
              </h4>
            </div>
            <div class="mixBlogCardFooter" style="padding: 0 16px 16px;">
              <span class="mixBlogCardReadMore" style="font-size: 11px;">
                Đọc tiếp &rarr;
              </span>
            </div>
          </a>
        <?php endwhile; wp_reset_postdata(); ?>
      </div>
    </section>
  <?php endif; ?>
</main>

<style>
@media (max-width: 767px) {
  .relatedGridResponsive {
    grid-template-columns: 1fr !important;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const content = document.getElementById('mixMainArticleBody');
  const tocBox = document.getElementById('mixArticleTocBox');
  const tocList = document.getElementById('mixArticleTocList');
  if (!content || !tocBox || !tocList) return;

  const headings = content.querySelectorAll('h2, h3');
  if (headings.length >= 2) {
    tocBox.style.display = 'block';
    headings.forEach((h, idx) => {
      const id = 'toc-heading-' + idx;
      h.id = id;
      const li = document.createElement('li');
      li.style.marginLeft = (h.tagName.toLowerCase() === 'h3') ? '16px' : '0';
      const a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = (idx + 1) + '. ' + h.textContent.trim();
      li.appendChild(a);
      tocList.appendChild(li);
    });
  }
});
</script>
<!-- /wp:html -->
