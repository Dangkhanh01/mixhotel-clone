<?php
/**
 * Title: Phòng Concept Nổi Bật
 * Slug: mixhotel/concept-rooms
 * Categories: mixhotel
 * Keywords: concept, phòng, room
 * Block Types: core/group
 * Post Types: page
 */
$theme_uri = get_template_directory_uri();
?>
<!-- wp:html -->
<section id="concept" class="mix-section mix-section--dark-3">
  <div class="mix-container">
    <!-- Section Head -->
    <div class="mix-section-head">
      <span class="mix-section-kicker">CONCEPT PHÒNG NỔI BẬT</span>
      <h2 class="mix-section-title">Lãng mạn và huyền bí</h2>
      <p class="mix-section-desc">
        Mỗi căn phòng là một concept riêng biệt, được thiết kế để biến mọi khoảnh khắc hẹn hò trở nên thăng hoa và đáng nhớ.
      </p>
    </div>

    <!-- Room Articles Stack -->
    <div style="display: flex; flex-direction: column; gap: 40px;">
      <!-- Room 1: Karma -->
      <article class="mixLuxuryRoomCard" style="padding: 28px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; align-items: center;">
          <div>
            <div style="font-size: 12px; color: #a0a0a8; margin-bottom: 6px;">
              <span>Concept riêng tư</span> • <strong style="color: #c5a880;">Mix Boutique Hotel</strong>
            </div>
            <h3 style="font-family: var(--wp--preset--font-family--questrial, sans-serif); font-size: 26px; font-weight: 700; color: #ffffff; margin: 0 0 14px;">
              Room 302 - Karma
            </h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
              <span class="mixLuxuryRoomFeatureBadge">Smart Tivi có Netflix</span>
              <span class="mixLuxuryRoomFeatureBadge">Giường tròn</span>
              <span class="mixLuxuryRoomFeatureBadge">Cosplay</span>
            </div>
            <p style="font-size: 13.5px; color: #a0a0a8; line-height: 1.6; margin-bottom: 24px; text-align: justify;">
              Karma được thiết kế theo phong cách gợi cảm và huyền bí, với tông màu đỏ nóng bỏng làm chủ đạo. Điểm nhấn độc đáo của căn phòng là những bức tranh Kamasutra được sắp xếp dọc theo bức tường phía đầu giường và trên trần nhà, tạo nên một không gian đầy tính nghệ thuật và kích thích.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button type="button" class="mixLuxuryBtn mixLuxuryBtnPrimary" data-contact-action="phone" data-room-title="Room 302 - Karma">
                <i class="fa fa-phone">&#9742;</i>
                <span>Hỏi phòng Room 302 - Karma</span>
              </button>
              <a href="/khach-san-tinh-yeu/karma/" class="mixLuxuryBtn mixLuxuryBtnOutline">
                <span>Xem chi tiết phòng</span>
              </a>
            </div>
          </div>
          <div class="mixLuxuryRoomThumb" style="border-radius: 14px;">
            <img src="<?php echo esc_url( $theme_uri . '/assets/images/room-302-karma.jpg' ); ?>" alt="Room 302 - Karma" loading="lazy" />
            <div class="mixLuxuryRoomTag">01 • Boutique Room</div>
          </div>
        </div>
      </article>

      <!-- Room 2: Katana -->
      <article class="mixLuxuryRoomCard" style="padding: 28px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; align-items: center;">
          <div class="mixLuxuryRoomThumb" style="border-radius: 14px;">
            <img src="<?php echo esc_url( $theme_uri . '/assets/images/room-401-katana.jpg' ); ?>" alt="VIP Room 401 - Katana" loading="lazy" />
            <div class="mixLuxuryRoomTag">02 • VIP Room</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #a0a0a8; margin-bottom: 6px;">
              <span>Concept Nhật Bản</span> • <strong style="color: #c5a880;">Mix Boutique Hotel</strong>
            </div>
            <h3 style="font-family: var(--wp--preset--font-family--questrial, sans-serif); font-size: 26px; font-weight: 700; color: #ffffff; margin: 0 0 14px;">
              VIP Room 401 - Katana
            </h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
              <span class="mixLuxuryRoomFeatureBadge">Ghế tình yêu</span>
              <span class="mixLuxuryRoomFeatureBadge">Bồn tắm</span>
              <span class="mixLuxuryRoomFeatureBadge">Smart Tivi Netflix</span>
              <span class="mixLuxuryRoomFeatureBadge">Dụng cụ BDSM</span>
            </div>
            <p style="font-size: 13.5px; color: #a0a0a8; line-height: 1.6; margin-bottom: 24px; text-align: justify;">
              Katana được thiết kế theo phong cách Nhật Bản truyền thống nhưng cũng không kém phần hiện đại và lãng mạn. Căn phòng lấy tông màu đỏ đậm và đen làm chủ đạo, tạo nên một không gian ấm cúng và gợi cảm với tranh Geisha lớn phía đầu giường.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button type="button" class="mixLuxuryBtn mixLuxuryBtnPrimary" data-contact-action="phone" data-room-title="VIP Room 401 - Katana">
                <i class="fa fa-phone">&#9742;</i>
                <span>Hỏi phòng Room 401 - Katana</span>
              </button>
              <a href="/khach-san-tinh-yeu/katana/" class="mixLuxuryBtn mixLuxuryBtnOutline">
                <span>Xem chi tiết phòng</span>
              </a>
            </div>
          </div>
        </div>
      </article>

      <!-- Room 3: Amora -->
      <article class="mixLuxuryRoomCard" style="padding: 28px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; align-items: center;">
          <div>
            <div style="font-size: 12px; color: #a0a0a8; margin-bottom: 6px;">
              <span>Trần sao lãng mạn</span> • <strong style="color: #c5a880;">Mix Boutique Hotel</strong>
            </div>
            <h3 style="font-family: var(--wp--preset--font-family--questrial, sans-serif); font-size: 26px; font-weight: 700; color: #ffffff; margin: 0 0 14px;">
              Room 402 - Amora
            </h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
              <span class="mixLuxuryRoomFeatureBadge">Cosplay</span>
              <span class="mixLuxuryRoomFeatureBadge">Trần sao lung linh</span>
              <span class="mixLuxuryRoomFeatureBadge">Cửa kính thiên nhiên</span>
            </div>
            <p style="font-size: 13.5px; color: #a0a0a8; line-height: 1.6; margin-bottom: 24px; text-align: justify;">
              Amora mang đến một không gian lãng mạn và gần gũi với thiên nhiên. Căn phòng được thiết kế theo phong cách ấm áp, với trần nhà bằng gỗ và những dây đèn lấp lánh như bầu trời sao, tạo cảm giác thư giãn và mơ mộng.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button type="button" class="mixLuxuryBtn mixLuxuryBtnPrimary" data-contact-action="phone" data-room-title="Room 402 - Amora">
                <i class="fa fa-phone">&#9742;</i>
                <span>Hỏi phòng Room 402 - Amora</span>
              </button>
              <a href="/khach-san-tinh-yeu/amora/" class="mixLuxuryBtn mixLuxuryBtnOutline">
                <span>Xem chi tiết phòng</span>
              </a>
            </div>
          </div>
          <div class="mixLuxuryRoomThumb" style="border-radius: 14px;">
            <img src="<?php echo esc_url( $theme_uri . '/assets/images/room-402-amora.jpg' ); ?>" alt="Room 402 - Amora" loading="lazy" />
            <div class="mixLuxuryRoomTag">03 • Boutique Room</div>
          </div>
        </div>
      </article>

      <!-- Room 4: Cloud Nine -->
      <article class="mixLuxuryRoomCard" style="padding: 28px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; align-items: center;">
          <div class="mixLuxuryRoomThumb" style="border-radius: 14px;">
            <img src="<?php echo esc_url( $theme_uri . '/assets/images/room-469-cloudnine.jpg' ); ?>" alt="VIP Room 469 - Cloud Nine" loading="lazy" />
            <div class="mixLuxuryRoomTag">04 • VIP Room</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #a0a0a8; margin-bottom: 6px;">
              <span>Bồn tắm Jacuzzi & Máy chiếu</span> • <strong style="color: #c5a880;">Mix Boutique Hotel</strong>
            </div>
            <h3 style="font-family: var(--wp--preset--font-family--questrial, sans-serif); font-size: 26px; font-weight: 700; color: #ffffff; margin: 0 0 14px;">
              VIP Room 469 - Cloud Nine
            </h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
              <span class="mixLuxuryRoomFeatureBadge">Bồn tắm Jacuzzi</span>
              <span class="mixLuxuryRoomFeatureBadge">Máy chiếu phim</span>
              <span class="mixLuxuryRoomFeatureBadge">Cosplay</span>
            </div>
            <p style="font-size: 13.5px; color: #a0a0a8; line-height: 1.6; margin-bottom: 24px; text-align: justify;">
              Cloud Nine mang đến một không gian lãng mạn và hiện đại, lấy cảm hứng từ bầu trời đêm đầy sao với trần nhà trang trí hàng trăm bóng đèn lấp lánh và bồn tắm Jacuzzi lớn đặt ngay trong không gian mở.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button type="button" class="mixLuxuryBtn mixLuxuryBtnPrimary" data-contact-action="phone" data-room-title="VIP Room 469 - Cloud Nine">
                <i class="fa fa-phone">&#9742;</i>
                <span>Hỏi phòng Cloud Nine</span>
              </button>
              <a href="/khach-san-tinh-yeu/cloud-nine/" class="mixLuxuryBtn mixLuxuryBtnOutline">
                <span>Xem chi tiết phòng</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>
<!-- /wp:html -->
