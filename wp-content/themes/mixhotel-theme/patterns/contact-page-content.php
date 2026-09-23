<?php
/**
 * Title: Liên Hệ - Toàn Bộ Nội Dung Trang Dark Luxury
 * Slug: mixhotel/contact-page-content
 * Categories: mixhotel
 * Keywords: contact, lien he, form, info, dark luxury
 * Block Types: core/group
 * Post Types: page
 */
?>
<!-- wp:html -->
<div class="mixLuxuryBreadcrumbs">
  <div class="inner">
    <a href="<?php echo esc_url(home_url('/')); ?>">Trang chủ</a>
    <span>/</span>
    <span class="current">Liên hệ</span>
  </div>
</div>

<main class="mixLuxuryContainer" style="padding-top: 48px; padding-bottom: 60px;">
  <!-- Heading & Kicker -->
  <div class="mixLuxuryHeading">
    <span class="mixLuxuryKicker">HỖ TRỢ 24/7</span>
    <h1 class="mixLuxuryTitle">THÔNG TIN LIÊN HỆ</h1>
    <div class="mixLuxuryTitleDivider"></div>
  </div>

  <div class="mixContactGrid">
    <!-- Left Column (7 cols): Contact Form -->
    <div class="mixContactFormCard">
      <h2>Gửi Yêu Cầu Tư Vấn &amp; Đặt Phòng</h2>
      <p class="lead">
        Quý khách có thể liên hệ số hotline: <strong style="color: #ffe2a0;">038 310 4010</strong> hoặc điền thông tin bên dưới để được nhân viên hỗ trợ nhanh nhất.
      </p>

      <!-- Kết quả thông báo AJAX -->
      <div id="mixContactFormResult" class="mixContactFormResult" aria-live="polite" aria-atomic="true" hidden style="margin-bottom: 20px; padding: 14px; border-radius: 12px; font-size: 14px;"></div>

      <form id="mixhotel-contact-form" class="mixContactForm" novalidate aria-label="Form liên hệ Mix Boutique Hotel">
        <!-- Honeypot -->
        <div aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;pointer-events:none;">
          <input type="text" id="mixhotel_hp_email_c" name="mixhotel_hp_email" tabindex="-1" autocomplete="off" />
          <input type="text" name="website_url" tabindex="-1" autocomplete="off" />
        </div>

        <!-- Nonce field -->
        <?php wp_nonce_field('mixhotel_contact_nonce', '_mixhotel_contact_nonce'); ?>

        <div style="margin-bottom: 16px;">
          <label for="contact_name">Họ Tên <span style="color: #ef4444;">*</span></label>
          <input 
            type="text" 
            id="contact_name" 
            name="contact_name" 
            required 
            placeholder="Nhập họ và tên của bạn..." 
            autocomplete="name" 
            maxlength="100" 
          />
          <span class="mixContactFormError" id="contact_name_error" role="alert" style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;" hidden></span>
        </div>

        <div class="mixContactFormRow">
          <div>
            <label for="contact_phone">Số Điện Thoại <span style="color: #ef4444;">*</span></label>
            <input 
              type="tel" 
              id="contact_phone" 
              name="contact_phone" 
              required 
              placeholder="038 310 4010" 
              autocomplete="tel" 
              maxlength="12" 
            />
            <span class="mixContactFormError" id="contact_phone_error" role="alert" style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;" hidden></span>
          </div>

          <div>
            <label for="contact_email">Email Liên Hệ <span style="color: #ef4444;">*</span></label>
            <input 
              type="email" 
              id="contact_email" 
              name="contact_email" 
              required 
              placeholder="email@example.com" 
              autocomplete="email" 
              maxlength="100" 
            />
            <span class="mixContactFormError" id="contact_email_error" role="alert" style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;" hidden></span>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <label for="contact_message">Nội Dung Ghi Chú</label>
          <textarea 
            id="contact_message" 
            name="contact_message" 
            rows="4" 
            placeholder="Loại phòng mong muốn, thời gian check-in hoặc yêu cầu setup trang trí sự kiện..."
            maxlength="1000"
          ></textarea>
          <span class="mixContactFormError" id="contact_message_error" role="alert" style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;" hidden></span>
        </div>

        <button 
          type="submit" 
          id="mixContactFormSubmit"
          class="mixCtaBtn" 
          style="width: 100%; border-radius: 9999px; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" x2="11" y1="2" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          <span class="mixContactFormBtnText">Gửi Thông Tin Liên Hệ</span>
          <span class="mixContactFormBtnLoading" hidden>Đang gửi...</span>
        </button>
      </form>
    </div>

    <!-- Right Column (5 cols): Address & Branches Info -->
    <div>
      <div class="mixContactSidebarCard">
        <h3 style="font-size: 20px; font-weight: 700; font-family: 'Philosopher', serif; color: #fff8ec; padding-bottom: 12px; border-bottom: 1px solid rgba(200, 137, 34, 0.2); margin: 0 0 20px;">
          Hệ Thống Cơ Sở Tại Hà Nội
        </h3>

        <div class="mixContactBranchItem">
          <span class="icon">📍</span>
          <div>
            <strong>CS1: Mix Premium</strong>
            <span>Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, Đống Đa, Hà Nội</span>
          </div>
        </div>

        <div class="mixContactBranchItem">
          <span class="icon">📍</span>
          <div>
            <strong>CS2: 256B Đặng Tiến Đông</strong>
            <span>256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội</span>
          </div>
        </div>

        <div class="mixContactBranchItem">
          <span class="icon">📍</span>
          <div>
            <strong>CS3: 20 Phúc La Hà Đông</strong>
            <span>20 Phố Phúc La, Phúc La, Hà Đông, Hà Nội</span>
          </div>
        </div>

        <div style="border-top: 1px solid rgba(200, 137, 34, 0.2); padding-top: 16px; margin-top: 20px; font-size: 14px; color: #d4d4d8;">
          <div style="margin-bottom: 10px;">
            <span>Hotline: <strong style="color: #ffe2a0;">038 310 4010</strong></span>
          </div>
          <div style="margin-bottom: 10px;">
            <span>Email: <strong style="color: #ffe2a0;">mixhotel.vn@gmail.com</strong></span>
          </div>
          <div>
            <span>Thời gian hoạt động: <strong style="color: #ffe2a0;">24/24h Hàng Ngày</strong></span>
          </div>
        </div>
      </div>

      <!-- Quick Zalo Box -->
      <div class="mixContactZaloBox">
        <p style="font-size: 11px; color: #ffe2a0; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'Philosopher', serif; margin: 0 0 6px;">
          Hỗ Trợ Kín Đáo &amp; Nhanh Chóng
        </p>
        <h4 style="font-size: 18px; font-weight: 700; font-family: 'Philosopher', serif; color: #fff8ec; margin: 0 0 16px;">
          Chat Trực Tiếp Qua Zalo Mix Hotel
        </h4>
        <a 
          href="https://zalo.me/0383104010" 
          target="_blank" 
          rel="noreferrer" 
          class="mixContactZaloBtn"
        >
          Mở Zalo Ngay
        </a>
      </div>
    </div>
  </div>
</main>
<!-- /wp:html -->
