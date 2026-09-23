<?php
/**
 * Title: Chính Sách - Đặt & Trả Phòng Dark Luxury
 * Slug: mixhotel/policy-booking
 * Categories: mixhotel
 * Keywords: policy, chinh sach, dat phong, tra phong, booking
 * Block Types: core/group
 * Post Types: page
 */
?>
<!-- wp:html -->
<div class="mixLuxuryBreadcrumbs">
  <div class="inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a>
    <span>/</span>
    <span>Chính sách</span>
    <span>/</span>
    <span class="current">Chính sách đặt trả phòng</span>
  </div>
</div>

<main class="mixLuxuryContainerNarrow" style="padding-top: 48px; padding-bottom: 80px;">
  <!-- Heading -->
  <div class="mixLuxuryHeading">
    <span class="mixLuxuryKicker">QUY ĐỊNH LƯU TRÚ</span>
    <h1 class="mixLuxuryTitle">CHÍNH SÁCH ĐẶT &amp; TRẢ PHÒNG</h1>
    <div class="mixLuxuryTitleDivider"></div>
  </div>

  <div class="mixPolicyCard">
    <!-- Box 1 -->
    <div class="mixPolicyBox">
      <div class="mixPolicyBoxTitle">
        <span>📅</span>
        <span>1. Quy định về đặt phòng &amp; Giữ phòng</span>
      </div>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #d4d4d8; line-height: 1.8;">
        <li>
          <strong>Đặt theo giờ:</strong> Mix Hotel giữ phòng tối đa <strong>15 - 20 phút</strong> kể từ giờ hẹn mà không yêu cầu đặt cọc trước.
        </li>
        <li>
          <strong>Đặt qua đêm &amp; ngày lễ:</strong> Quý khách vui lòng chuyển khoản đặt cọc tối thiểu 50% tiền phòng để hệ thống khóa phòng và bảo lưu chắc chắn cho quý khách.
        </li>
        <li>
          <strong>Độ tuổi quy định:</strong> Hệ thống khách sạn tình yêu chỉ phục vụ khách hàng từ <strong>đủ 18 tuổi trở lên</strong> có căn cước công dân hoặc giấy tờ tùy thân hợp lệ.
        </li>
      </ul>
    </div>

    <!-- Box 2 -->
    <div class="mixPolicyBox">
      <div class="mixPolicyBoxTitle">
        <span>⏱️</span>
        <span>2. Thời gian Nhận phòng &amp; Trả phòng</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 12px;" class="policyGridResponsive">
        <div style="padding: 16px; border-radius: 12px; background: rgba(0,0,0,0.4); border: 1px solid rgba(200, 137, 34, 0.2);">
          <strong style="color: #ffe2a0; display: block; margin-bottom: 6px;">Khung giờ theo giờ:</strong>
          <span style="font-size: 13px; color: #d4d4d8;">Linh hoạt 24/24h theo thời gian khách hàng đến nhận chìa khóa. Tính theo block 2 giờ đầu và cộng dồn các giờ tiếp theo.</span>
        </div>
        <div style="padding: 16px; border-radius: 12px; background: rgba(0,0,0,0.4); border: 1px solid rgba(200, 137, 34, 0.2);">
          <strong style="color: #ffe2a0; display: block; margin-bottom: 6px;">Khung giờ qua đêm:</strong>
          <span style="font-size: 13px; color: #d4d4d8;">Nhận phòng từ 21:00 tối hôm trước và trả phòng trước 12:00 trưa hôm sau (hoặc linh hoạt theo thỏa thuận trước với lễ tân).</span>
        </div>
      </div>
    </div>

    <!-- Box 3 -->
    <div class="mixPolicyBox">
      <div class="mixPolicyBoxTitle">
        <span>🔄</span>
        <span>3. Thay đổi lịch &amp; Hủy đặt phòng</span>
      </div>
      <p style="font-size: 14px; margin: 0; line-height: 1.7;">
        Trường hợp quý khách có việc đột xuất cần đổi giờ hoặc hủy phòng, xin vui lòng thông báo trước cho Mix Hotel qua hotline/Zalo ít nhất <strong>02 tiếng</strong> trước giờ hẹn để được hỗ trợ chuyển ngày hoặc hoàn cọc theo quy chế dịch vụ.
      </p>
    </div>

    <!-- Box 4: Force Majeure -->
    <div class="mixPolicyNotice">
      <span style="font-size: 24px; flex-shrink: 0;">⚠️</span>
      <div>
        <strong style="color: #ffe2a0; display: block; margin-bottom: 4px;">Trường hợp bất khả kháng:</strong>
        Nếu phát sinh sự cố kỹ thuật về thiết bị (máy lạnh, bồn Jacuzzi) trong phòng, Mix Hotel sẽ lập tức nâng cấp miễn phí cho quý khách lên hạng phòng cao hơn hoặc hoàn trả 100% chi phí.
      </div>
    </div>
  </div>
</main>

<style>
@media (max-width: 767px) {
  .policyGridResponsive {
    grid-template-columns: 1fr !important;
  }
}
</style>
<!-- /wp:html -->
