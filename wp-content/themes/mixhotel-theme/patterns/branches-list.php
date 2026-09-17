<?php
/**
 * Title: Hệ Thống 3 Chi Nhánh Hà Nội
 * Slug: mixhotel/branches-list
 * Categories: mixhotel
 * Keywords: chi nhánh, branches, liên hệ
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
?>
<!-- wp:html -->
<section id="branches" class="mix-section mix-section--dark-1">
  <div class="mix-container">
    <!-- Head -->
    <div class="mix-section-head">
      <span class="mix-section-kicker">3 CHI NHÁNH HÀ NỘI</span>
      <h2 class="mix-section-title">Chọn điểm gần bạn, Mix tư vấn phòng còn trống</h2>
      <p class="mix-section-desc">
        Mỗi chi nhánh đều có nhiều hạng phòng và concept khác nhau. Nhắn Zalo để kiểm tra tình trạng phòng thực tế trước khi đến.
      </p>
    </div>

    <!-- 3 Branch Cards Grid -->
    <div class="mixLuxuryBranchesGrid">
      <!-- Branch 1: Huỳnh Thúc Kháng -->
      <article class="mixLuxuryBranchCard">
        <div class="mixLuxuryBranchThumb">
          <img
            src="<?php echo esc_url( $theme_uri . '/assets/images/branch-huynhthuckhang.webp' ); ?>"
            alt="Mix Boutique Premium (Huỳnh Thúc Kháng)"
            loading="lazy"
          />
          <div class="mixLuxuryPhotoBadge">
            <span class="mixLuxuryPhotoBadgeNumber">01</span>
            <span class="mixLuxuryPhotoBadgeLabel">Chi nhánh nổi bật</span>
          </div>
        </div>

        <div class="mixLuxuryBranchBody">
          <h3 class="mixLuxuryBranchName">Mix Boutique Premium (Huỳnh Thúc Kháng)</h3>

          <div class="mixLuxuryBranchInfo">
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-map-marker">&#128205;</i>
              <span>Ngách 29 Ngõ 49 Phố Huỳnh Thúc Kháng, Thành Công, Láng, Hà Nội</span>
            </div>
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-check">&#10004;</i>
              <span>Nhiều hạng phòng concept</span>
            </div>
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-check">&#10004;</i>
              <span>Kiểm tra phòng trống qua Zalo tức thì</span>
            </div>
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-check">&#10004;</i>
              <span>Khu trung tâm dễ tìm, kín đáo</span>
            </div>
          </div>

          <div class="mixLuxuryBranchActions">
            <button
              type="button"
              class="mixLuxuryBranchBtn mixLuxuryBranchBtnZalo"
              data-contact-action="zalo"
              data-branch-id="branch-premium"
            >
              <i class="fa fa-commenting">&#9993;</i>
              <span>Hỏi phòng</span>
            </button>
            <button
              type="button"
              class="mixLuxuryBranchBtn mixLuxuryBranchBtnPhone"
              data-contact-action="phone"
              data-branch-id="branch-premium"
            >
              <i class="fa fa-phone">&#9742;</i>
              <span>Gọi ngay</span>
            </button>
          </div>
        </div>
      </article>

      <!-- Branch 2: Đặng Tiến Đông -->
      <article class="mixLuxuryBranchCard">
        <div class="mixLuxuryBranchThumb">
          <img
            src="<?php echo esc_url( $theme_uri . '/assets/images/branch-dangtiendong.webp' ); ?>"
            alt="Mix Boutique Hotel 256B Đặng Tiến Đông"
            loading="lazy"
          />
          <div class="mixLuxuryPhotoBadge">
            <span class="mixLuxuryPhotoBadgeNumber">02</span>
            <span class="mixLuxuryPhotoBadgeLabel">Khu Đống Đa</span>
          </div>
        </div>

        <div class="mixLuxuryBranchBody">
          <h3 class="mixLuxuryBranchName">Mix Boutique Hotel 256B Đặng Tiến Đông</h3>

          <div class="mixLuxuryBranchInfo">
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-map-marker">&#128205;</i>
              <span>256B Phố Đặng Tiến Đông, Ô Chợ Dừa, Đống Đa, Hà Nội</span>
            </div>
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-check">&#10004;</i>
              <span>Gần Hoàng Cầu, Ô Chợ Dừa</span>
            </div>
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-check">&#10004;</i>
              <span>Di chuyển thuận tiện, kín đáo</span>
            </div>
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-check">&#10004;</i>
              <span>Đầy đủ gói nghỉ giờ & qua đêm</span>
            </div>
          </div>

          <div class="mixLuxuryBranchActions">
            <button
              type="button"
              class="mixLuxuryBranchBtn mixLuxuryBranchBtnZalo"
              data-contact-action="zalo"
              data-branch-id="branch-dangtiendong"
            >
              <i class="fa fa-commenting">&#9993;</i>
              <span>Hỏi phòng</span>
            </button>
            <button
              type="button"
              class="mixLuxuryBranchBtn mixLuxuryBranchBtnPhone"
              data-contact-action="phone"
              data-branch-id="branch-dangtiendong"
            >
              <i class="fa fa-phone">&#9742;</i>
              <span>Gọi ngay</span>
            </button>
          </div>
        </div>
      </article>

      <!-- Branch 3: Phúc La Hà Đông -->
      <article class="mixLuxuryBranchCard">
        <div class="mixLuxuryBranchThumb">
          <img
            src="<?php echo esc_url( $theme_uri . '/assets/images/branch-phucla.webp' ); ?>"
            alt="Mix Boutique Hotel 20 Phúc La Hà Đông"
            loading="lazy"
          />
          <div class="mixLuxuryPhotoBadge">
            <span class="mixLuxuryPhotoBadgeNumber">03</span>
            <span class="mixLuxuryPhotoBadgeLabel">Hà Đông - Xa La</span>
          </div>
        </div>

        <div class="mixLuxuryBranchBody">
          <h3 class="mixLuxuryBranchName">Mix Boutique Hotel 20 Phúc La Hà Đông</h3>

          <div class="mixLuxuryBranchInfo">
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-map-marker">&#128205;</i>
              <span>20 Phố Phúc La, Khu đô thị Xa La, Hà Đông, Hà Nội</span>
            </div>
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-check">&#10004;</i>
              <span>Khu Hà Đông - Xa La yên tĩnh</span>
            </div>
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-check">&#10004;</i>
              <span>Phù hợp nghỉ theo giờ & party kỷ niệm</span>
            </div>
            <div class="mixLuxuryBranchInfoItem">
              <i class="fa fa-check">&#10004;</i>
              <span>Bãi đậu xe ô tô rộng rãi, an toàn</span>
            </div>
          </div>

          <div class="mixLuxuryBranchActions">
            <button
              type="button"
              class="mixLuxuryBranchBtn mixLuxuryBranchBtnZalo"
              data-contact-action="zalo"
              data-branch-id="branch-phucla"
            >
              <i class="fa fa-commenting">&#9993;</i>
              <span>Hỏi phòng</span>
            </button>
            <button
              type="button"
              class="mixLuxuryBranchBtn mixLuxuryBranchBtnPhone"
              data-contact-action="phone"
              data-branch-id="branch-phucla"
            >
              <i class="fa fa-phone">&#9742;</i>
              <span>Gọi ngay</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>
<!-- /wp:html -->
