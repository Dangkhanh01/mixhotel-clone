<?php
/**
 * Title: Sự Kiện & Trang Trí
 * Slug: mixhotel/events-decoration
 * Categories: mixhotel
 * Keywords: sự kiện, trang trí, events
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
?>
<!-- wp:html -->
<section id="events" class="mix-section mix-section--dark-3">
  <div class="mix-container">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: center;">
      <!-- Left Column: Copy & Pricing Panel -->
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <span class="mix-section-kicker">TRANG TRÍ SỰ KIỆN</span>
          <h2 class="mix-section-title" style="text-align: left;">Thêm bất ngờ cho sinh nhật, kỷ niệm hoặc cầu hôn</h2>
          <p class="mix-section-desc" style="text-align: left; margin: 0;">
            Mix Boutique Hotel hỗ trợ chuẩn bị trọn gói các set nến thơm, cánh hoa, bóng bay, bánh kem và rượu vang ngọt ngào. (Giá trang trí chưa bao gồm tiền phòng).
          </p>
        </div>

        <!-- Pricing Panel -->
        <div style="background-color: var(--wp--preset--color--dark-secondary, #17171c); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);">
          <h3 style="font-family: var(--wp--preset--font-family--questrial, sans-serif); font-size: 16px; font-weight: 700; color: #ffffff; margin: 0 0 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding-bottom: 10px;">
            Bảng giá trang trí mẫu (tham khảo)
          </h3>

          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; font-size: 13.5px;">
            <div style="display: flex; justify-content: space-between; gap: 10px; color: #a0a0a8;">
              <span>&#11088; Nến - hoa - bóng bay, tặng 1 chai vang</span>
              <strong style="color: var(--wp--preset--color--luxury-gold, #c5a880); white-space: nowrap;">1.490k - 1.990k</strong>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 10px; color: #a0a0a8;">
              <span>&#11088; Set rượu vang - hoa hồng - nến lung linh</span>
              <strong style="color: var(--wp--preset--color--luxury-gold, #c5a880); white-space: nowrap;">590k</strong>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 10px; color: #a0a0a8;">
              <span>&#11088; Set nến nghệ thuật + hoa tươi + bánh kem</span>
              <strong style="color: var(--wp--preset--color--luxury-gold, #c5a880); white-space: nowrap;">650k</strong>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 10px; color: #a0a0a8;">
              <span>&#11088; Set bánh kem sinh nhật / khay trái cây</span>
              <strong style="color: var(--wp--preset--color--luxury-gold, #c5a880); white-space: nowrap;">350k / 300k</strong>
            </div>
          </div>

          <button
            type="button"
            class="mixLuxuryBtn mixLuxuryBtnPrimary"
            style="width: 100%; justify-content: center;"
            data-contact-action="zalo"
            data-room-title="Tư vấn set trang trí sự kiện"
          >
            <i class="fa fa-commenting">&#9993;</i>
            <span>Tư Vấn Set Trang Trí Riêng</span>
          </button>
        </div>
      </div>

      <!-- Right Column: Photos Grid -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div style="grid-column: span 2; border-radius: 14px; overflow: hidden; height: 240px; border: 1px solid rgba(255, 255, 255, 0.1);">
          <img src="<?php echo esc_url( $theme_uri . '/assets/images/event-1.jpg' ); ?>" alt="Trang trí sự kiện 1" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
        </div>
        <div style="border-radius: 14px; overflow: hidden; height: 170px; border: 1px solid rgba(255, 255, 255, 0.1);">
          <img src="<?php echo esc_url( $theme_uri . '/assets/images/event-2.jpg' ); ?>" alt="Trang trí sự kiện 2" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
        </div>
        <div style="border-radius: 14px; overflow: hidden; height: 170px; border: 1px solid rgba(255, 255, 255, 0.1);">
          <img src="<?php echo esc_url( $theme_uri . '/assets/images/event-3.jpg' ); ?>" alt="Trang trí sự kiện 3" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</section>
<!-- /wp:html -->
