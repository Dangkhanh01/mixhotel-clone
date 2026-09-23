<?php
/**
 * Title: Trang 404 - Không Tìm Thấy (.block404)
 * Slug: mixhotel/page-404
 * Categories: mixhotel
 * Keywords: 404, not found, block404, loi
 * Block Types: core/group
 * Post Types: page
 */
?>
<!-- wp:html -->
<main class="block404 mixLuxuryContainerNarrow" style="padding-top: 100px; padding-bottom: 100px; text-align: center;">
  <div style="font-size: clamp(80px, 14vw, 160px); font-weight: 900; font-family: 'Philosopher', serif; line-height: 1; background: linear-gradient(135deg, #c88922 0%, #ffe2a0 50%, #d9a83a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 16px; filter: drop-shadow(0 10px 25px rgba(200, 137, 34, 0.4));">
    404
  </div>

  <h1 style="font-size: clamp(22px, 3.5vw, 36px); font-weight: 700; font-family: 'Philosopher', serif; color: #fff8ec; text-transform: uppercase; margin-bottom: 16px;">
    KHÔNG TÌM THẤY TRANG BẠN YÊU CẦU
  </h1>

  <p style="font-size: 16px; color: #d4d4d8; max-width: 580px; margin: 0 auto 36px; line-height: 1.7; font-weight: 300;">
    Đường dẫn bạn truy cập có thể đã hết hạn, bị thay đổi hoặc không tồn tại. Đừng để cảm xúc bị gián đoạn, hãy khám phá các phòng concept lãng mạn của Mix Hotel ngay!
  </p>

  <div class="btnBlock" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 16px; margin-bottom: 40px;">
    <div style="margin: 0; padding: 0; background: transparent;">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="mixCtaBtn" style="display: inline-block; padding: 12px 32px; font-size: 14px;">
        Về Trang Chủ
      </a>
    </div>
    <div style="margin: 0; padding: 0; background: transparent;">
      <a href="<?php echo esc_url(home_url('/khach-san-tinh-yeu/')); ?>" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 32px; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(200, 137, 34, 0.4); color: #ffe2a0; font-family: 'Philosopher', serif; font-weight: 700; font-size: 14px; text-decoration: none;">
        Xem Danh Sách Phòng
      </a>
    </div>
  </div>

  <p style="font-size: 14px; color: #a1a1aa;">
    Cần hỗ trợ giữ phòng gấp? Hotline 24/7: 
    <a href="tel:0383104010" style="color: #ffe2a0; font-weight: 700; text-decoration: none;">038 310 4010</a>
  </p>
</main>
<!-- /wp:html -->
