<?php
/**
 * Title: Danh Sách Phòng & Khách Sạn Tình Yêu Dark Luxury
 * Slug: mixhotel-theme/room-archive-content
 * Categories: mixhotel
 * Description: 100% 1:1 Luxury Landing Page for Khách Sạn Tình Yêu matching Next.js prototype.
 *
 * @package MixHotelTheme
 */

if (!defined('ABSPATH')) {
    exit;
}

$theme_uri = get_template_directory_uri();
$article_pack  = require get_template_directory() . '/inc-khach-san-tinh-yeu-article.php';

$article_toc   = $article_pack['toc'];
$article_html  = $article_pack['html'];

// Query all published branches dynamically from DB
$branch_posts = get_posts([
    'post_type'      => 'hotel_branch',
    'post_status'    => 'publish',
    'posts_per_page' => -1,
    'orderby'        => 'post_name',
    'order'          => 'ASC',
]);

// Map slugs to standard DOM anchor IDs & Areas
$branch_anchor_map = [
    'cs1-huynh-thuc-khang' => 'branch-mix-boutique-premium-hotel',
    'cs2-dang-tien-dong'    => 'branch-mix-boutique-hotel-256b-dang-tien-dong',
    'cs3-phuc-la'          => 'branch-mix-boutique-hotel-20-phuc-la-ha-dong',
];

$branch_area_map = [
    'cs1-huynh-thuc-khang' => 'Huỳnh Thúc Kháng',
    'cs2-dang-tien-dong'    => 'Đống Đa',
    'cs3-phuc-la'          => 'Hà Đông',
];

// Sort branches in canonical order: cs1, cs2, cs3
usort($branch_posts, function($a, $b) {
    $order = ['cs1-huynh-thuc-khang' => 1, 'cs2-dang-tien-dong' => 2, 'cs3-phuc-la' => 3];
    $pos_a = $order[$a->post_name] ?? 99;
    $pos_b = $order[$b->post_name] ?? 99;
    return $pos_a <=> $pos_b;
});

$branches_data = [];
$form_rooms_by_branch = [
    'All' => [],
];

foreach ($branch_posts as $b_post) {
    $b_id      = $b_post->ID;
    $b_slug    = $b_post->post_name;
    $anchor_id = $branch_anchor_map[$b_slug] ?? ('branch-' . $b_slug);
    $area_name = $branch_area_map[$b_slug] ?? 'Hà Nội';

    $b_thumb = get_the_post_thumbnail_url($b_id, 'full');
    if (!$b_thumb) {
        $b_thumb = $theme_uri . '/assets/tassets/images/banner-home.jpg';
    }

    $b_address = get_post_meta($b_id, '_mixhotel_branch_address', true);

    // Query published rooms belonging to this branch
    $room_posts = get_posts([
        'post_type'      => 'hotel_room',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'meta_key'       => '_mixhotel_room_branch_id',
        'meta_value'     => $b_id,
        'orderby'        => 'ID',
        'order'          => 'ASC',
    ]);

    $branch_rooms = [];
    $form_key = $b_post->post_title;
    if (!isset($form_rooms_by_branch[$form_key])) {
        $form_rooms_by_branch[$form_key] = [];
    }

    foreach ($room_posts as $r_post) {
        $r_id    = $r_post->ID;
        $r_thumb = get_the_post_thumbnail_url($r_id, 'large');
        if (!$r_thumb) {
            $gallery = MixHotel_Helpers::get_room_gallery($r_id);
            if (!empty($gallery)) {
                $r_thumb = wp_get_attachment_image_url($gallery[0], 'large');
            }
        }
        if (!$r_thumb) {
            $r_thumb = $theme_uri . '/assets/tassets/images/banner-home.jpg';
        }

        $price_2h     = get_post_meta($r_id, '_mixhotel_room_price_2h', true);
        $price_extra  = get_post_meta($r_id, '_mixhotel_room_price_extra_hour', true);
        $price_night  = get_post_meta($r_id, '_mixhotel_room_price_overnight', true);
        $price_allday = get_post_meta($r_id, '_mixhotel_room_price_allday', true);

        $price_formatted = $price_2h ? ('Giá từ: ' . number_format(absint($price_2h), 0, ',', '.') . ' VND/2h') : 'Giá từ: Liên hệ';
        $excerpt = $r_post->post_excerpt ?: wp_trim_words($r_post->post_content, 35);

        $room_item = [
            'id'    => $r_id,
            'name'  => $r_post->post_title,
            'link'  => get_permalink($r_id),
            'price' => $price_formatted,
            'desc'  => $excerpt,
            'image' => $r_thumb,
        ];
        $branch_rooms[] = $room_item;

        // Build options for booking form dropdown
        $form_item = [
            'value'    => $r_post->post_title,
            'text'     => $r_post->post_title,
            'price1'   => (float)$price_2h,
            'price2'   => (float)$price_night,
            'price3'   => $price_allday ? (number_format(absint($price_allday), 0, ',', '.') . 'VND') : '',
            'pricesub' => $price_extra ? ('(thêm ' . (absint($price_extra) / 1000) . 'k/h)') : '',
        ];
        $form_rooms_by_branch[$form_key][] = $form_item;
        $form_rooms_by_branch['All'][] = $form_item;
    }

    // Support trimmed and alias keys for booking form compatibility
    $trimmed_key = trim($form_key);
    $form_rooms_by_branch[$trimmed_key] = $form_rooms_by_branch[$form_key];
    $form_rooms_by_branch[$trimmed_key . ' '] = $form_rooms_by_branch[$form_key];

    if (strpos($b_slug, 'huynh-thuc-khang') !== false) {
        $form_rooms_by_branch['Mix Boutique Premium'] = $form_rooms_by_branch[$form_key];
    } elseif (strpos($b_slug, 'dang-tien-dong') !== false) {
        $form_rooms_by_branch['Mix Boutique Hotel 256B Đặng Tiến Đông'] = $form_rooms_by_branch[$form_key];
        $form_rooms_by_branch['Mix Boutique Hotel 256B Đặng Tiến Đông '] = $form_rooms_by_branch[$form_key];
    } elseif (strpos($b_slug, 'phuc-la') !== false) {
        $form_rooms_by_branch['Mix Boutique Hotel 20 Phúc La Hà Đông'] = $form_rooms_by_branch[$form_key];
        $form_rooms_by_branch['Mix Boutique Hotel 20 Phúc La Hà Đông '] = $form_rooms_by_branch[$form_key];
    }

    $room_count = count($branch_rooms);

    $branches_data[] = [
        'id'        => $anchor_id,
        'image'     => $b_thumb,
        'badge'     => $b_post->post_title,
        'area'      => $area_name,
        'name'      => $b_post->post_title,
        'address'   => $b_address,
        'notice'    => 'Đặt phòng tại chi nhánh này nếu bạn muốn chọn đúng khu vực, đúng concept và không nhầm sang chi nhánh khác.',
        'tags'      => [
            $room_count . ' phòng',
            'Superior từ 199k',
            'Deluxe từ 300k',
            'VIP từ 400k',
        ],
        'roomTitle' => 'Tất cả phòng tại ' . $b_post->post_title,
        'rooms'     => $branch_rooms,
    ];
}
?>
<!-- wp:html -->
<div class="mixLuxuryBreadcrumbs">
  <div class="inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a>
    <span>/</span>
    <span class="current">Khách Sạn Tình Yêu</span>
  </div>
</div>

<div class="min-h-screen" style="background-color: #0c080a; color: #fff8ec;">

  <!-- 1. CATE MIX HERO -->
  <div class="cateMixHero" style="position: relative; min-height: 820px; overflow: hidden; color: #fff; background: #090604;">
    <img
      src="<?php echo esc_url($theme_uri . '/assets/tassets/images/banner-home.jpg'); ?>"
      alt="Phòng concept Eden Mix Boutique Hotel"
      class="cateMixHeroBg"
      style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;"
    />
    <div class="cateMixHeroOverlay"></div>
    <div class="cateMixHeroLight"></div>
    <div class="cateMixHeroWrap">
      <div class="cateMixHeroContent">
        <div class="cateMixHeroSub">
          <span></span>
          <em>KHÁCH SẠN TÌNH YÊU HÀ NỘI</em>
        </div>
        <div class="cateMixHeroTitle">
          <span>Chọn đúng chi nhánh</span>
          <br />
          <span>Khách sạn tình yêu</span>
        </div>
        <div class="cateMixHeroDesc">
          3 địa chỉ khác nhau, nhóm phòng khác nhau. Bạn hãy chọn chi nhánh trước để Mix Hotel tư vấn đúng phòng trống.
        </div>
        <div class="cateMixHeroActions">
          <a
            href="https://zalo.me/0383104010"
            target="_blank"
            rel="noreferrer"
            class="cateMixHeroBtn cateMixHeroBtnPrimary"
            style="text-decoration: none;"
          >
            <span>Nhắn Zalo tư vấn</span>
          </a>
          <a
            href="tel:0383104010"
            class="cateMixHeroBtn"
            style="text-decoration: none;"
          >
            <span>☎ Gọi điện</span>
          </a>
          <a href="#chon-chi-nhanh" class="cateMixHeroBtn" style="text-decoration: none;">
            <span>📍 Chọn chi nhánh</span>
          </a>
        </div>
        <div class="cateMixHeroNumbers">
          <div class="cateMixHeroNumber">
            <strong>3</strong>
            <span>chi nhánh Hà Nội</span>
          </div>
          <div class="cateMixHeroNumber">
            <strong>199k</strong>
            <span>giá từ/ 2h đầu</span>
          </div>
          <div class="cateMixHeroNumber">
            <strong>15-20'</strong>
            <span>giữ phòng khi chưa cọc</span>
          </div>
          <div class="cateMixHeroNumber">
            <strong>18+</strong>
            <span>chỉ nhận khách từ 18 tuổi</span>
          </div>
        </div>
        <div class="cateMixHeroBranchList">
          <a class="cateMixHeroBranch" href="#branch-mix-boutique-premium-hotel" style="text-decoration: none;">
            <strong>Premium</strong>
            <span>Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội</span>
          </a>
          <a class="cateMixHeroBranch" href="#branch-mix-boutique-hotel-256b-dang-tien-dong" style="text-decoration: none;">
            <strong>256B Đặng Tiến Đông</strong>
            <span>256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội, Việt Nam</span>
          </a>
          <a class="cateMixHeroBranch" href="#branch-mix-boutique-hotel-20-phuc-la-ha-dong" style="text-decoration: none;">
            <strong>20 Phúc La Hà Đông</strong>
            <span>20, P. Phúc La, Hà Đông, Hà Nội, Việt Nam</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- 2. CATE BRANCH SECTION -->
  <div class="cateBranchSection" id="chon-chi-nhanh">
    <div class="cateBranchDecor cateBranchDecorOne"></div>
    <div class="cateBranchDecor cateBranchDecorTwo"></div>
    <div class="cateBranchContainer">
      <div class="cateBranchHead">
        <div class="cateBranchHeadLeft">
          <div class="cateBranchSub">
            <span></span>
            <em>Chọn nhanh theo khu vực</em>
          </div>
          <div class="cateBranchTitle">
            <span>3 chi nhánh Mix Boutique</span>
            <br />
            <span>Hotel đang nhận khách</span>
          </div>
          <div class="cateBranchDesc">
            Tìm ngay chi nhánh Mix Boutique Hotel gần bạn, khám phá các hạng phòng đẹp và đặt phòng chỉ với vài thao tác đơn giản!
          </div>
        </div>
        <div class="cateBranchTabs" id="cateBranchTabsContainer">
          <?php foreach ($branches_data as $bIdx => $branch) : ?>
            <a
              class="cateBranchTab <?php echo ($bIdx === 0) ? 'cateBranchTabActive' : ''; ?>"
              href="#<?php echo esc_attr($branch['id']); ?>"
              data-target="<?php echo esc_attr($branch['id']); ?>"
              style="text-decoration: none;"
            >
              <?php echo esc_html($branch['name']); ?>
            </a>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- 3 Branch Cards -->
      <?php foreach ($branches_data as $branch) : ?>
        <div class="cateBranchCard" id="<?php echo esc_attr($branch['id']); ?>">
          <div class="cateBranchImageWrap" style="position: relative; width: 100%; height: 320px; overflow: hidden; border-radius: 20px 20px 0 0;">
            <img
              src="<?php echo esc_url($branch['image']); ?>"
              alt="<?php echo esc_attr($branch['name']); ?>"
              class="cateBranchImage"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
            <div class="cateBranchImageOverlay"></div>
            <div class="cateBranchBadge"><?php echo esc_html($branch['badge']); ?></div>
          </div>
          <div class="cateBranchInfo">
            <div class="cateBranchArea"><?php echo esc_html($branch['area']); ?></div>
            <div class="cateBranchName"><?php echo esc_html($branch['name']); ?></div>
            <div class="cateBranchAddress"><?php echo esc_html($branch['address']); ?></div>
            <div class="cateBranchNotice">
              <span>📍 <?php echo esc_html($branch['notice']); ?></span>
            </div>
            <div class="cateBranchTags">
              <?php foreach ($branch['tags'] as $tag) : ?>
                <span><?php echo esc_html($tag); ?></span>
              <?php endforeach; ?>
            </div>
            <div class="cateBranchRoomTitle"><?php echo esc_html($branch['roomTitle']); ?></div>
            <div class="cateBranchRooms">
              <?php foreach ($branch['rooms'] as $room) : ?>
                <div class="cateBranchRoom">
                  <a
                    href="<?php echo esc_url($room['link']); ?>"
                    class="cateBranchRoomImageLink"
                    style="position: relative; display: block; width: 100%; height: 190px; overflow: hidden; border-radius: 12px 12px 0 0;"
                    title="<?php echo esc_attr('Xem chi tiết ' . $room['name']); ?>"
                  >
                    <img
                      src="<?php echo esc_url($room['image']); ?>"
                      alt="<?php echo esc_attr($room['name']); ?>"
                      style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;"
                    />
                  </a>
                  <div class="cateBranchRoomText">
                    <a
                      href="<?php echo esc_url($room['link']); ?>"
                      class="cateBranchRoomNameLink"
                      style="display: block; text-decoration: none;"
                      title="<?php echo esc_attr('Xem chi tiết ' . $room['name']); ?>"
                    >
                      <strong><?php echo esc_html($room['name']); ?></strong>
                    </a>
                    <b><?php echo esc_html($room['price']); ?></b>
                    <span><?php echo esc_html($room['desc']); ?></span>
                    <a
                      href="<?php echo esc_url($room['link']); ?>"
                      class="cateBranchRoomDetail"
                      style="display: inline-flex; align-items: center; gap: 4px; text-decoration: none;"
                    >
                      Xem chi tiết phòng &rarr;
                    </a>
                  </div>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- 3. MIX CATE PRICE SECTION -->
  <section class="mixCatePrice" id="bang-gia">
    <div class="container">
      <div class="mixCatePriceInner">
        <div class="mixCatePriceGlow mixCatePriceGlowOne"></div>
        <div class="mixCatePriceGlow mixCatePriceGlowTwo"></div>
        <div class="mixCatePriceHead">
          <div class="mixCatePriceKicker">
            <span></span>
            <em>Giá hiển thị sớm</em>
          </div>
          <div class="mixCatePriceTitle">Bảng giá rõ để khách quyết định nhanh</div>
          <div class="mixCatePriceDesc">
            Giá áp dụng theo hạng phòng. Cuối tuần cần đặt cọc 50% trong các trường hợp nghỉ giờ trên 4 tiếng, qua đêm, ngày đêm hoặc đặt phòng cuối tuần.
          </div>
        </div>
        <div class="mixCatePriceGrid">
          <!-- Superior -->
          <div class="mixCatePriceCard">
            <div class="mixCatePriceCardTop">
              <div class="mixCatePriceName">Superior</div>
              <div class="mixCatePriceBadge">Phổ biến</div>
            </div>
            <div class="mixCatePriceMain">
              <span>199k</span>
              <small>/ 2h</small>
            </div>
            <div class="mixCatePriceList">
              <div class="mixCatePriceRow">
                <span>Thêm giờ</span>
                <b>50k/ h</b>
              </div>
              <div class="mixCatePriceRow">
                <span>Qua đêm 22h-12h</span>
                <b>500k</b>
              </div>
              <div class="mixCatePriceRow">
                <span>Ngày đêm 14h-12h</span>
                <b>700k</b>
              </div>
            </div>
          </div>

          <!-- Deluxe -->
          <div class="mixCatePriceCard mixCatePriceCardHot">
            <div class="mixCatePriceCardTop">
              <div class="mixCatePriceName">Deluxe</div>
              <div class="mixCatePriceBadge">Đáng chọn</div>
            </div>
            <div class="mixCatePriceMain">
              <span>300k</span>
              <small>/ 2h</small>
            </div>
            <div class="mixCatePriceList">
              <div class="mixCatePriceRow">
                <span>Thêm giờ</span>
                <b>50k/ h</b>
              </div>
              <div class="mixCatePriceRow">
                <span>Qua đêm 22h-12h</span>
                <b>600k</b>
              </div>
              <div class="mixCatePriceRow">
                <span>Ngày đêm 14h-12h</span>
                <b>800k</b>
              </div>
            </div>
          </div>

          <!-- VIP -->
          <div class="mixCatePriceCard">
            <div class="mixCatePriceCardTop">
              <div class="mixCatePriceName">Vip</div>
              <div class="mixCatePriceBadge">Riêng tư</div>
            </div>
            <div class="mixCatePriceMain">
              <span>400k</span>
              <small>/ 2h</small>
            </div>
            <div class="mixCatePriceList">
              <div class="mixCatePriceRow">
                <span>Thêm giờ</span>
                <b>80k/ h</b>
              </div>
              <div class="mixCatePriceRow">
                <span>Qua đêm 22h-12h</span>
                <b>800k</b>
              </div>
              <div class="mixCatePriceRow">
                <span>Ngày đêm 14h-12h</span>
                <b>1.000k</b>
              </div>
            </div>
          </div>
        </div>

        <div class="mixCatePriceNote">
          <span>Lưu ý:</span>
          <span>Chưa đặt cọc giữ phòng 15-20 phút, có thể giữ đến 1 tiếng khi thời tiết xấu. Mix chỉ nhận khách từ 18 tuổi.</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. MIX CATE BRANCH (CHỌN ĐÚNG ĐỂ KHÔNG ĐẶT NHẦM) -->
  <section class="mixCateBranch" id="huong-dan-chon-chi-nhanh">
    <div class="container">
      <div class="mixCateBranchInner">
        <div class="mixCateBranchLight mixCateBranchLightLeft"></div>
        <div class="mixCateBranchLight mixCateBranchLightRight"></div>
        <div class="mixCateBranchHead">
          <div class="mixCateBranchKicker">
            <span></span>
            <em>Chọn đúng để không đặt nhầm</em>
          </div>
          <div class="mixCateBranchTitle">
            <span>Chọn chi nhánh trước,</span>
            <br />
            <span>chọn phòng sau</span>
          </div>
          <div class="mixCateBranchDesc">
            <span>Mỗi chi nhánh ở một khu vực khác nhau và sở hữu nhóm phòng concept khác nhau.</span>
            <span>Khi liên hệ, hãy gửi đủ “chi nhánh + tên phòng” để tư vấn viên kiểm tra đúng phòng trống.</span>
          </div>
        </div>
        <div class="mixCateBranchSteps">
          <div class="mixCateBranchStep">
            <div class="mixCateBranchNumber">01</div>
            <div class="mixCateBranchStepTitle">Xác định khu vực</div>
            <div class="mixCateBranchStepText">
              Premium ở Huỳnh Thúc Kháng, 256B ở Đặng Tiến Đông, 20 Phúc La ở Hà Đông.
            </div>
          </div>
          <div class="mixCateBranchStep">
            <div class="mixCateBranchNumber">02</div>
            <div class="mixCateBranchStepTitle">Chọn phòng trong chi nhánh</div>
            <div class="mixCateBranchStepText">
              Chỉ chọn các phòng đang nằm trong block chi nhánh tương ứng phía trên.
            </div>
          </div>
          <div class="mixCateBranchStep">
            <div class="mixCateBranchNumber">03</div>
            <div class="mixCateBranchStepTitle">Gửi đúng cú pháp</div>
            <div class="mixCateBranchStepText">
              Ví dụ: “256B Đặng Tiến Đông - After Sunset - 20h tối nay”.
            </div>
          </div>
        </div>
        <div class="mixCateBranchActions">
          <a class="mixCateBranchBtn mixCateBranchBtnMain" href="#branch-mix-boutique-premium-hotel" style="text-decoration: none;">Xem Premium</a>
          <a class="mixCateBranchBtn" href="#branch-mix-boutique-hotel-256b-dang-tien-dong" style="text-decoration: none;">Xem 256B</a>
          <a class="mixCateBranchBtn" href="#branch-mix-boutique-hotel-20-phuc-la-ha-dong" style="text-decoration: none;">Xem Phúc La</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. MIX CATE VIDEO -->
  <section class="mixCateVideo" id="video-phong">
    <div class="container">
      <div class="mixCateVideoInner">
        <div class="mixCateVideoLight mixCateVideoLightLeft"></div>
        <div class="mixCateVideoLight mixCateVideoLightRight"></div>
        <div class="mixCateVideoContent">
          <div class="mixCateVideoKicker">
            <span></span>
            <em>Video phòng thực tế</em>
          </div>
          <div class="mixCateVideoTitle">
            <span>Xem nhanh không</span>
            <br />
            <span>gian trước khi</span>
            <br />
            <span>chọn phòng</span>
          </div>
          <div class="mixCateVideoDesc">
            <span>Video ngắn giúp bạn nhìn rõ ánh sáng, bố cục phòng và cảm giác thực tế hơn ảnh tĩnh.</span>
            <span>Khi nhắn Zalo, bạn có thể gửi kèm video hoặc tên phòng muốn xem thêm để Mix tư vấn đúng chi nhánh.</span>
          </div>
          <div class="mixCateVideoNotice">
            <div class="mixCateVideoNoticeIcon">▶</div>
            <div class="mixCateVideoNoticeText">
              <span>Landing page đang dùng video từ kênh YouTube Mix.</span>
              <span>Có thể bổ sung thêm Shorts cho từng phòng hoặc từng chi nhánh khi có link mới.</span>
            </div>
          </div>
          <div class="mixCateVideoActions">
            <a
              class="mixCateVideoBtn mixCateVideoBtnMain"
              href="https://www.youtube.com/@hotelmixboutique1110"
              rel="nofollow noopener noreferrer"
              target="_blank"
              style="text-decoration: none;"
            >
              Xem kênh YouTube
            </a>
            <a
              class="mixCateVideoBtn"
              href="https://zalo.me/0383104010"
              target="_blank"
              rel="noreferrer"
              style="text-decoration: none;"
            >
              <span>💬 Hỏi video phòng</span>
            </a>
          </div>
        </div>
        <div class="mixCateVideoList">
          <a
            class="mixCateVideoCard"
            href="https://www.youtube.com/watch?v=_3pSDfR8Ccw"
            rel="nofollow noopener noreferrer"
            target="_blank"
            style="text-decoration: none;"
          >
            <div class="mixCateVideoThumb" style="position: relative; width: 100%; height: 180px; overflow: hidden; border-radius: 12px 12px 0 0;">
              <img
                src="<?php echo esc_url($theme_uri . '/assets/external/img.youtube.com/vi/_3pSDfR8Ccw/hqdefault.jpg'); ?>"
                alt="Video không gian Mix Boutique Hotel"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
              <div class="mixCateVideoPlay">▶</div>
              <div class="mixCateVideoTag">Shorts</div>
            </div>
            <div class="mixCateVideoInfo">
              <div class="mixCateVideoName">
                TOGETHER and to Mixboutique Hotel đưa nhau lên tới "đỉnh chóp" khiến nàng tuôn trào từng nhịp thở 😍
              </div>
              <div class="mixCateVideoText">
                Xem trước không gian phòng dạng Shorts trước khi nhắn tư vấn.
              </div>
            </div>
          </a>
          <a
            class="mixCateVideoCard"
            href="https://www.youtube.com/watch?v=Ts4seBpirOA"
            rel="nofollow noopener noreferrer"
            target="_blank"
            style="text-decoration: none;"
          >
            <div class="mixCateVideoThumb" style="position: relative; width: 100%; height: 180px; overflow: hidden; border-radius: 12px 12px 0 0;">
              <img
                src="<?php echo esc_url($theme_uri . '/assets/external/img.youtube.com/vi/Ts4seBpirOA/hqdefault.jpg'); ?>"
                alt="Video review Mix Boutique Hotel"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
              <div class="mixCateVideoPlay">▶</div>
              <div class="mixCateVideoTag">Review</div>
            </div>
            <div class="mixCateVideoInfo">
              <div class="mixCateVideoName">
                Mixboutique nâng cấp TRÊN TÌNH BẠN DƯỚI TÌNH YÊU bên trong là TÌNH NHÂN 😍
              </div>
              <div class="mixCateVideoText">
                Xem trước không gian phòng dạng Shorts trước khi nhắn tư vấn.
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. MIX FREE PERKS -->
  <section class="mixFreePerks">
    <div class="container">
      <div class="mixFreePerksWrap">
        <div class="mixFreePerksMedia">
          <div class="mixFreePerksGlow"></div>
          <div class="mixFreePerksImage mixFreePerksImageLarge" style="position: relative; height: 280px; overflow: hidden; border-radius: 16px;">
            <img
              src="<?php echo esc_url($theme_uri . '/assets/tassets/images/cate-1.jpg'); ?>"
              alt="Đồ cosplay miễn phí khi đặt phòng Mix Hotel"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
            <div class="mixFreePerksBadge">
              <span>FREE</span>
              <small>Mượn tại quầy</small>
            </div>
          </div>
          <div class="mixFreePerksImage mixFreePerksImageSmall" style="position: relative; height: 190px; overflow: hidden; border-radius: 16px;">
            <img
              src="<?php echo esc_url($theme_uri . '/assets/tassets/images/cate-2.jpg'); ?>"
              alt="Đồ BDSM miễn phí khi đặt phòng Mix Hotel"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
            <div class="mixFreePerksFloat">
              <span>03+</span>
              <small>nhóm vật dụng</small>
            </div>
          </div>
        </div>
        <div class="mixFreePerksContent">
          <div class="mixFreePerksKicker">
            <span></span>
            <em>Miễn phí khi đặt phòng</em>
          </div>
          <div class="mixFreePerksTitle">
            <span>Tiện ích miễn phí</span>
            <br />
            <span>khi đặt phòng</span>
          </div>
          <div class="mixFreePerksDesc">
            Mỗi phòng Mix đều có thể mượn thêm đồ cosplay, đồ BDSM và bộ bài Board Game tình yêu. Các vật dụng không để sẵn trong phòng để đảm bảo riêng tư và vệ sinh; khách vui lòng mượn tại quầy lễ tân khi checkin.
          </div>
          <div class="mixFreePerksGrid">
            <div class="mixFreePerksCard">
              <div class="mixFreePerksIcon">✨</div>
              <div class="mixFreePerksCardTitle">Đồ cosplay</div>
              <div class="mixFreePerksCardText">
                Nhiều concept để đổi không khí buổi hẹn, nổi bật hơn khi nhận phòng.
              </div>
            </div>
            <div class="mixFreePerksCard">
              <div class="mixFreePerksIcon">🖤</div>
              <div class="mixFreePerksCardTitle">Đồ BDSM</div>
              <div class="mixFreePerksCardText">
                Bộ phụ kiện trải nghiệm miễn phí, mượn theo nhu cầu và tình trạng còn sẵn.
              </div>
            </div>
            <div class="mixFreePerksCard">
              <div class="mixFreePerksIcon">🃏</div>
              <div class="mixFreePerksCardTitle">Board Game tình yêu</div>
              <div class="mixFreePerksCardText">
                Bộ bài gợi mở câu chuyện, phù hợp cho buổi hẹn vui và tự nhiên hơn.
              </div>
            </div>
          </div>
          <div class="mixFreePerksNote">
            <div class="mixFreePerksNoteIcon">ℹ️</div>
            <div class="mixFreePerksNoteText">
              <strong>Cách nhận:</strong> Báo lễ tân khi checkin để mượn miễn phí, và gửi lại quầy khi checkout.
            </div>
          </div>
          <div class="mixFreePerksActions">
            <a
              href="https://zalo.me/0383104010"
              target="_blank"
              rel="noreferrer"
              class="mixFreePerksBtn mixFreePerksBtnPrimary"
              style="text-decoration: none;"
            >
              <span>💬 Hỏi đồ mượn qua Zalo</span>
            </a>
            <a href="#dat-phong" class="mixFreePerksBtn mixFreePerksBtnGhost" style="text-decoration: none;">
              <span>📝 Ghi chú khi đặt phòng</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. CATE EVENT DECOR -->
  <section class="cateEventDecor">
    <div class="container">
      <div class="cateEventDecorWrap">
        <div class="cateEventDecorImageBox">
          <div class="cateEventDecorImageGlow"></div>
          <div class="cateEventDecorImage" style="position: relative; height: 320px; overflow: hidden; border-radius: 20px;">
            <img
              src="<?php echo esc_url($theme_uri . '/assets/tassets/images/home-6.jpg'); ?>"
              alt="Trang trí sinh nhật kỷ niệm cầu hôn"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
          </div>
          <div class="cateEventDecorLabel">
            <span>Từ 350k</span>
            <small>Trang trí theo yêu cầu</small>
          </div>
        </div>
        <div class="cateEventDecorContent">
          <div class="cateEventDecorSub">
            <span></span>
            <em>Thêm bất ngờ</em>
          </div>
          <div class="cateEventDecorTitle">
            <span>Trang trí sinh nhật,</span>
            <br />
            <span>kỷ niệm, cầu hôn</span>
          </div>
          <div class="cateEventDecorDesc">
            Gói trang trí giúp tăng giá trị mỗi lần đặt phòng và biến buổi hẹn thành một kỷ niệm có chủ ý hơn. Giá dưới đây chưa bao gồm tiền phòng.
          </div>
          <div class="cateEventDecorList">
            <div class="cateEventDecorItem">
              <div class="cateEventDecorItemTop">
                <div class="cateEventDecorItemName">Nến - hoa - bóng</div>
                <div class="cateEventDecorItemIcon">⭐</div>
              </div>
              <div class="cateEventDecorItemPrice">Deluxe 1.490k, VIP 1.990k</div>
            </div>
            <div class="cateEventDecorItem">
              <div class="cateEventDecorItemTop">
                <div class="cateEventDecorItemName">Set rượu - hoa - nến</div>
                <div class="cateEventDecorItemIcon">🍷</div>
              </div>
              <div class="cateEventDecorItemPrice">590k</div>
            </div>
            <div class="cateEventDecorItem">
              <div class="cateEventDecorItemTop">
                <div class="cateEventDecorItemName">Bánh kem</div>
                <div class="cateEventDecorItemIcon">🎂</div>
              </div>
              <div class="cateEventDecorItemPrice">350k</div>
            </div>
            <div class="cateEventDecorItem">
              <div class="cateEventDecorItemTop">
                <div class="cateEventDecorItemName">Rượu + trái cây</div>
                <div class="cateEventDecorItemIcon">🥂</div>
              </div>
              <div class="cateEventDecorItemPrice">600k</div>
            </div>
          </div>
          <div class="cateEventDecorNotice">
            <div class="cateEventDecorNoticeIcon">ℹ️</div>
            <div class="cateEventDecorNoticeText">
              Tiền cọc event không hoàn lại khi hủy phòng.
            </div>
          </div>
          <div class="cateEventDecorActions">
            <a
              href="https://zalo.me/0383104010"
              target="_blank"
              rel="noreferrer"
              class="cateEventDecorBtn cateEventDecorBtnMain"
              style="text-decoration: none;"
            >
              <span>💬 Tư vấn gói trang trí</span>
            </a>
            <a href="#dat-phong" class="cateEventDecorBtn cateEventDecorBtnLine" style="text-decoration: none;">
              <span>📅 Đặt phòng ngay</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 8. CATE BOOKING STEPS -->
  <section class="cateBookingSteps">
    <div class="container">
      <div class="cateBookingStepsHead">
        <div class="cateBookingStepsSub">
          <span></span>
          <em>Quy trình đặt phòng</em>
        </div>
        <div class="cateBookingStepsTitle">
          <span>3 bước để giữ</span>
          <br />
          <span>phòng nhanh</span>
        </div>
      </div>
      <div class="cateBookingStepsList">
        <div class="cateBookingStepsItem">
          <div class="cateBookingStepsNumber">01</div>
          <div class="cateBookingStepsName">Nhắn nhu cầu</div>
          <div class="cateBookingStepsText">
            Gửi chi nhánh, ngày, khung giờ và nhu cầu nghỉ giờ, qua đêm hoặc trang trí.
          </div>
        </div>
        <div class="cateBookingStepsItem">
          <div class="cateBookingStepsNumber">02</div>
          <div class="cateBookingStepsName">Nhận tư vấn</div>
          <div class="cateBookingStepsText">
            Mix kiểm tra phòng trống, gửi ảnh phòng phù hợp và báo giá rõ trước khi xác nhận.
          </div>
        </div>
        <div class="cateBookingStepsItem">
          <div class="cateBookingStepsNumber">03</div>
          <div class="cateBookingStepsName">Giữ phòng</div>
          <div class="cateBookingStepsText">
            Chưa cọc giữ 15-20 phút. Các ca nghỉ dài, qua đêm, ngày đêm hoặc cuối tuần cần cọc 50%.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 9. CATE CONSULT FORM -->
  <section class="cateConsultForm" id="dat-phong">
    <div class="cateConsultFormLight cateConsultFormLightLeft"></div>
    <div class="cateConsultFormLight cateConsultFormLightRight"></div>
    <div class="container">
      <div class="cateConsultFormWrap">
        <div class="cateConsultFormContent">
          <div class="cateConsultFormSub">
            <span></span>
            <em>Tư vấn nhanh</em>
          </div>
          <div class="cateConsultFormTitle">
            <span>Gửi yêu cầu, Mix</span>
            <br />
            <span>xác nhận phòng trống</span>
          </div>
          <div class="cateConsultFormDesc">
            Form không tự động cam kết còn phòng. Tư vấn viên sẽ liên hệ lại để xác nhận tình trạng phòng, khung giờ phù hợp và hướng dẫn giữ phòng.
          </div>
          <div class="cateConsultFormBenefits">
            <div class="cateConsultFormBenefit">
              <div class="cateConsultFormBenefitIcon">🔒</div>
              <div class="cateConsultFormBenefitText">
                Bảo mật thông tin khách hàng, không chia sẻ cho bên thứ ba.
              </div>
            </div>
            <div class="cateConsultFormBenefit">
              <div class="cateConsultFormBenefitIcon">💳</div>
              <div class="cateConsultFormBenefitText">
                Thanh toán tiền mặt tại quầy hoặc chuyển khoản ngân hàng.
              </div>
            </div>
            <div class="cateConsultFormBenefit">
              <div class="cateConsultFormBenefitIcon">📅</div>
              <div class="cateConsultFormBenefitText">
                Đã đặt cọc có thể đổi giờ/ngày trong 1-15 ngày, tùy tình trạng phòng trống.
              </div>
            </div>
          </div>
        </div>
        <div class="cateConsultFormBox">
          <div class="cateConsultFormGlow"></div>
          <form class="cateConsultFormMain" id="mixLandingBookingForm">
            <div id="mixLandingFormSuccess" style="display: none; padding: 16px; margin-bottom: 20px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #a7f3d0; font-size: 14px;">
              ✓ Yêu cầu của bạn đã được gửi thành công! Mix Hotel sẽ liên hệ xác nhận phòng trong ít phút.
            </div>
            <div class="cateConsultFormGrid">
              <div class="cateConsultFormField">
                <label for="landing_name">Họ và tên *</label>
                <input id="landing_name" name="customer_name" type="text" required placeholder="Nhập họ và tên" />
              </div>
              <div class="cateConsultFormField">
                <label for="landing_phone">Số điện thoại *</label>
                <input id="landing_phone" name="customer_phone" type="tel" required placeholder="Nhập số điện thoại" />
              </div>
              <div class="cateConsultFormField cateConsultFormFieldFull">
                <label for="landing_branch">Chi nhánh mong muốn</label>
                <div class="cateConsultFormSelectWrap">
                  <select id="landing_branch" name="branch">
                    <option value="All">Chọn chi nhánh</option>
                    <?php foreach ($branches_data as $b) : ?>
                      <option value="<?php echo esc_attr($b['name']); ?>"><?php echo esc_html($b['name']); ?></option>
                    <?php endforeach; ?>
                  </select>
                </div>
              </div>
              <div class="cateConsultFormField">
                <label for="landing_checkin_date">Ngày nhận phòng</label>
                <input id="landing_checkin_date" name="checkin_date" class="cateDateInput" type="date" min="<?php echo date('Y-m-d'); ?>" value="<?php echo date('Y-m-d'); ?>" />
              </div>
              <div class="cateConsultFormField">
                <label for="landing_checkout_date">Ngày trả phòng</label>
                <input id="landing_checkout_date" name="checkout_date" class="cateDateInput" type="date" min="<?php echo date('Y-m-d'); ?>" value="<?php echo date('Y-m-d', strtotime('+1 day')); ?>" />
              </div>
              <div class="cateConsultFormField">
                <label for="landing_checkin_time">Giờ vào</label>
                <input id="landing_checkin_time" name="checkin_time" class="cateTimeInput" type="time" value="14:00" />
              </div>
              <div class="cateConsultFormField">
                <label for="landing_checkout_time">Giờ ra</label>
                <input id="landing_checkout_time" name="checkout_time" class="cateTimeInput" type="time" value="12:00" />
              </div>
              <div class="cateConsultFormField">
                <label for="landing_demand">Nhu cầu</label>
                <div class="cateConsultFormSelectWrap">
                  <select id="landing_demand" name="demand">
                    <option value="">Chọn nhu cầu</option>
                    <option value="Nghỉ giờ">Nghỉ giờ</option>
                    <option value="Qua đêm">Qua đêm</option>
                    <option value="Theo ngày">Theo ngày</option>
                    <option value="Tổ chức kỷ niệm">Tổ chức kỷ niệm</option>
                  </select>
                </div>
              </div>
              <div class="cateConsultFormField">
                <label for="landing_room">Phòng quan tâm</label>
                <div class="cateConsultFormSelectWrap cateRoomSelects">
                  <select id="landing_room" name="room_title">
                    <option value="">Chọn phòng nếu đã có ý thích</option>
                    <?php if (!empty($form_rooms_by_branch['All'])) : ?>
                      <?php foreach ($form_rooms_by_branch['All'] as $opt) : ?>
                        <option value="<?php echo esc_attr($opt['value']); ?>"><?php echo esc_html($opt['text']); ?></option>
                      <?php endforeach; ?>
                    <?php endif; ?>
                  </select>
                </div>
              </div>
              <div class="cateConsultFormField cateConsultFormFieldFull">
                <label for="landing_note">Ghi chú</label>
                <textarea id="landing_note" name="customer_note" placeholder="Dịp kỷ niệm, cần bồn tắm, máy chiếu, decor..."></textarea>
              </div>
              <div class="cateConsultFormActions cateConsultFormFieldFull">
                <button type="submit" class="cateConsultFormBtn cateConsultFormBtnSubmit" id="landingSubmitBtn">
                  <span>Gửi yêu cầu</span>
                </button>
                <a href="https://zalo.me/0383104010" target="_blank" rel="noreferrer" class="cateConsultFormBtn cateConsultFormBtnZalo" style="text-decoration: none;">
                  <span>💬 Nhắn Zalo</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- 10. CATE FAQ -->
  <section class="cateFaq">
    <div class="container">
      <div class="cateFaqHead">
        <div class="cateFaqSub">
          <span></span>
          <em>Câu hỏi thường gặp</em>
        </div>
        <div class="cateFaqTitle">
          <span>Gỡ các băn khoăn</span>
          <br />
          <span>trước khi đặt</span>
        </div>
        <div class="cateFaqDesc">
          Một số thông tin quan trọng giúp bạn chủ động hơn khi đặt phòng, giữ phòng và chuẩn bị cho buổi hẹn tại Mix.
        </div>
      </div>
      <div class="cateFaqGrid">
        <details class="cateFaqItem" open>
          <summary class="cateFaqQuestion">
            <span>Có giữ phòng khi chưa đặt cọc không?</span>
            <span style="color: #c88922;">+</span>
          </summary>
          <div class="cateFaqAnswer">
            Có. Mix giữ phòng 15-20 phút khi chưa cọc, có thể linh động đến 1 tiếng nếu thời tiết xấu.
          </div>
        </details>
        <details class="cateFaqItem" open>
          <summary class="cateFaqQuestion">
            <span>Khi nào cần đặt cọc 50%?</span>
            <span style="color: #c88922;">+</span>
          </summary>
          <div class="cateFaqAnswer">
            Nghỉ giờ trên 4 tiếng, qua đêm, ngày đêm và đặt phòng cuối tuần cần cọc 50% tổng tiền phòng.
          </div>
        </details>
        <details class="cateFaqItem" open>
          <summary class="cateFaqQuestion">
            <span>Có phụ thu cuối tuần hoặc ngày lễ không?</span>
            <span style="color: #c88922;">+</span>
          </summary>
          <div class="cateFaqAnswer">
            Theo thông tin hiện tại không có phụ thu cuối tuần/ngày lễ, nhưng cuối tuần cần đặt cọc để giữ phòng.
          </div>
        </details>
        <details class="cateFaqItem" open>
          <summary class="cateFaqQuestion">
            <span>Khách có được mang đồ ăn/uống vào không?</span>
            <span style="color: #c88922;">+</span>
          </summary>
          <div class="cateFaqAnswer">
            Có thể mang vào, hạn chế đồ nặng mùi. Hoa tươi, bánh sinh nhật, rượu từ ngoài có thể có phụ thu.
          </div>
        </details>
        <details class="cateFaqItem" open>
          <summary class="cateFaqQuestion">
            <span>Mix có nhận khách dưới 18 tuổi không?</span>
            <span style="color: #c88922;">+</span>
          </summary>
          <div class="cateFaqAnswer">
            Không. Mix chỉ nhận khách từ 18 tuổi.
          </div>
        </details>
        <details class="cateFaqItem" open>
          <summary class="cateFaqQuestion">
            <span>Đặt cọc rồi có đổi lịch được không?</span>
            <span style="color: #c88922;">+</span>
          </summary>
          <div class="cateFaqAnswer">
            Khách đã đặt cọc có thể đổi giờ hoặc ngày trong phạm vi 1-15 ngày, tùy tình trạng phòng trống.
          </div>
        </details>
      </div>
      <div class="cateFaqBottom">
        <div class="cateFaqBottomText">
          Chưa thấy câu hỏi bạn cần? Nhắn Mix để được tư vấn nhanh trước khi đặt phòng.
        </div>
        <a href="https://zalo.me/0383104010" target="_blank" rel="noreferrer" class="cateFaqBtn" style="text-decoration: none;">
          <span>💬 Hỏi nhanh qua Zalo</span>
        </a>
      </div>
    </div>
  </section>

  <!-- 11. CATE PREMIUM CTA -->
  <section class="catePremiumCta" id="booking">
    <div class="catePremiumCtaWrap" style="position: relative; overflow: hidden; border-radius: 24px; padding: 60px 40px; margin: 40px auto; max-width: 1200px;">
      <img
        src="<?php echo esc_url($theme_uri . '/assets/external/photo-1618221195710-dd6b41faaea6'); ?>"
        alt="Đặt phòng khách sạn tình yêu Mix Hotel"
        class="catePremiumCtaBg"
        style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;"
      />
      <div class="catePremiumCtaShade"></div>
      <div class="catePremiumCtaContent" style="position: relative; z-index: 10;">
        <div class="catePremiumCtaKicker">
          <span></span>
          <em>Đặt phòng hôm nay</em>
        </div>
        <div class="catePremiumCtaTitle">
          <span>Chọn chi nhánh gần bạn,</span>
          <br />
          <span>Mix tư vấn phòng phù hợp</span>
          <br />
          <span>trong vài phút</span>
        </div>
        <div class="catePremiumCtaText">
          Nhận ảnh thật, giá rõ ràng, tư vấn kín đáo và giữ phòng nhanh qua Zalo hoặc hotline.
        </div>
        <div class="catePremiumCtaActions">
          <a
            href="https://zalo.me/0383104010"
            target="_blank"
            rel="noreferrer"
            class="catePremiumCtaBtn catePremiumCtaBtnMain"
            style="text-decoration: none;"
          >
            <span>💬 Nhắn Zalo tư vấn</span>
          </a>
          <a href="tel:0383104010" class="catePremiumCtaBtn catePremiumCtaBtnSub" style="text-decoration: none;">
            <span>☎ Gọi ngay</span>
          </a>
        </div>
      </div>
      <div class="catePremiumCtaInfo" style="position: relative; z-index: 10;">
        <div class="catePremiumCtaInfoItem">
          <span>01</span>
          <p>Xem ảnh phòng thật</p>
        </div>
        <div class="catePremiumCtaInfoItem">
          <span>02</span>
          <p>Chọn chi nhánh gần nhất</p>
        </div>
        <div class="catePremiumCtaInfoItem">
          <span>03</span>
          <p>Giữ phòng nhanh qua Zalo</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 12. CONTENT FRAME SECTION (SEO ARTICLE) -->
  <section class="content-frame-section py-16" style="padding: 60px 0;">
    <div class="container">
      <div class="content-frame">
        <!-- Collapsible Table of Contents -->
        <div class="tableOfContent appearContent">
          <div
            class="title"
            id="tocToggleHeader"
            style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-weight: 700; color: #ffe2a0;"
          >
            <span>Nội dung bài viết:</span>
            <span id="tocToggleIcon" style="font-size: 16px;">▾</span>
          </div>
          <div class="mucLucPart" id="bookmark-list">
            <ul>
              <?php foreach ($article_toc as $item) : ?>
                <li class="<?php echo !empty($item['isSub']) ? 'sub_data' : 'data'; ?>">
                  <a href="<?php echo esc_attr($item['href']); ?>"><?php echo esc_html($item['title']); ?></a>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
        </div>

        <!-- Article Content Body -->
        <div class="content-body size-1vw data_contents mt-10" style="margin-top: 40px; color: #eee4d3; line-height: 1.8;">
          <?php echo $article_html; ?>
        </div>
      </div>
    </div>
  </section>

</div>

<script>
(function() {
  // 1. Branch Tab Navigation
  const tabs = document.querySelectorAll('#cateBranchTabsContainer .cateBranchTab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('cateBranchTabActive'));
      this.classList.add('cateBranchTabActive');
      const targetId = this.getAttribute('data-target');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. TOC toggle
  const tocHeader = document.getElementById('tocToggleHeader');
  const bookmarkList = document.getElementById('bookmark-list');
  const tocIcon = document.getElementById('tocToggleIcon');
  if (tocHeader && bookmarkList) {
    tocHeader.addEventListener('click', function() {
      if (bookmarkList.style.display === 'none') {
        bookmarkList.style.display = 'block';
        if (tocIcon) tocIcon.textContent = '▾';
      } else {
        bookmarkList.style.display = 'none';
        if (tocIcon) tocIcon.textContent = '▸';
      }
    });
  }

  // 3. Consultation Form room selector update by branch
  const formRoomsData = <?php echo json_encode($form_rooms_by_branch); ?>;
  const branchSelect = document.getElementById('landing_branch');
  const roomSelect = document.getElementById('landing_room');

  if (branchSelect && roomSelect) {
    branchSelect.addEventListener('change', function() {
      const selected = this.value;
      const opts = formRoomsData[selected] || formRoomsData['All'] || [];
      roomSelect.innerHTML = '<option value="">Chọn phòng nếu đã có ý thích</option>';
      opts.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        roomSelect.appendChild(option);
      });
    });
  }

  // 4. Form Submit Handler
  const form = document.getElementById('mixLandingBookingForm');
  const successBox = document.getElementById('mixLandingFormSuccess');
  const submitBtn = document.getElementById('landingSubmitBtn');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('landing_name').value.trim();
      const phone = document.getElementById('landing_phone').value.trim();
      if (!name || !phone) {
        alert('Vui lòng nhập họ và tên cùng số điện thoại!');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Gửi yêu cầu';
        }
        if (successBox) {
          successBox.style.display = 'block';
          form.reset();
          successBox.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            successBox.style.display = 'none';
          }, 8000);
        }
      }, 1000);
    });
  }
})();
</script>
<!-- /wp:html -->
