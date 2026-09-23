<?php
/**
 * Title: Liên Hệ - Form Liên Hệ
 * Slug: mixhotel/contact-form
 * Categories: mixhotel
 * Keywords: contact, lien he, form
 * Block Types: core/group
 * Post Types: page
 */
?>
<!-- wp:html -->
<div class="mixContactFormWrap" id="contact-form-section">
  <div class="mixContactFormHeader">
    <p class="mixSectionKicker">LIÊN HỆ</p>
    <h2 class="mixContactFormTitle">GỬI TIN NHẮN CHO CHÚNG TÔI</h2>
    <p class="mixContactFormSubtitle">Chúng tôi sẽ phản hồi trong thời gian sớm nhất</p>
  </div>

  <!-- Thông báo kết quả (Ẩn mặc định, JS hiển thị) -->
  <div id="mixContactFormResult" class="mixContactFormResult" aria-live="polite" aria-atomic="true" hidden></div>

  <form 
    id="mixhotel-contact-form" 
    class="mixContactForm" 
    novalidate
    aria-label="Form liên hệ Mix Boutique Hotel"
  >
    <!-- Honeypot fields (ẩn hoàn toàn với CSS, không ẩn bằng display:none để bot không nhận ra) -->
    <div class="mixHoneypotField" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;pointer-events:none;">
      <label for="mixhotel_hp_email">Để trống trường này</label>
      <input type="text" id="mixhotel_hp_email" name="mixhotel_hp_email" tabindex="-1" autocomplete="off" />
      <input type="text" name="website_url" tabindex="-1" autocomplete="off" />
    </div>

    <!-- Nonce field (Tuân thủ BUG-03 / AGENTS.md §3.1) -->
    <?php wp_nonce_field('mixhotel_contact_nonce', '_mixhotel_contact_nonce'); ?>

    <!-- Họ tên -->
    <div class="mixContactFormField">
      <label for="contact_name" class="mixContactFormLabel">
        Họ và Tên <span class="mixContactFormRequired" aria-label="Bắt buộc">*</span>
      </label>
      <input 
        type="text" 
        id="contact_name" 
        name="contact_name" 
        class="mixContactFormInput"
        placeholder="Ví dụ: Nguyễn Văn An"
        required
        autocomplete="name"
        maxlength="100"
      />
      <span class="mixContactFormError" id="contact_name_error" role="alert"></span>
    </div>

    <!-- Số điện thoại -->
    <div class="mixContactFormField">
      <label for="contact_phone" class="mixContactFormLabel">
        Số Điện Thoại <span class="mixContactFormRequired" aria-label="Bắt buộc">*</span>
      </label>
      <input 
        type="tel" 
        id="contact_phone" 
        name="contact_phone" 
        class="mixContactFormInput"
        placeholder="Ví dụ: 0901234567"
        required
        autocomplete="tel"
        pattern="[0-9]{10}"
        maxlength="10"
      />
      <span class="mixContactFormError" id="contact_phone_error" role="alert"></span>
    </div>

    <!-- Email -->
    <div class="mixContactFormField">
      <label for="contact_email" class="mixContactFormLabel">
        Email
      </label>
      <input 
        type="email" 
        id="contact_email" 
        name="contact_email" 
        class="mixContactFormInput"
        placeholder="Ví dụ: email@example.com"
        autocomplete="email"
        maxlength="100"
      />
      <span class="mixContactFormError" id="contact_email_error" role="alert"></span>
    </div>

    <!-- Nội dung -->
    <div class="mixContactFormField">
      <label for="contact_message" class="mixContactFormLabel">
        Nội Dung
      </label>
      <textarea 
        id="contact_message" 
        name="contact_message" 
        class="mixContactFormTextarea"
        placeholder="Bạn muốn hỏi về điều gì? Đặt phòng, giá cả, tiện nghi, hay dịch vụ trang trí..."
        rows="5"
        maxlength="2000"
      ></textarea>
    </div>

    <!-- Submit Button -->
    <button type="submit" id="mixContactFormSubmit" class="mixContactFormBtn">
      <span class="mixContactFormBtnText">GỬI TIN NHẮN</span>
      <span class="mixContactFormBtnLoading" hidden>
        <span class="mixContactFormSpinner" aria-hidden="true"></span>
        Đang gửi...
      </span>
    </button>

    <p class="mixContactFormNote">
      * Dữ liệu được bảo mật tuyệt đối và chỉ dùng để liên lạc với bạn.
    </p>
  </form>
</div>
<!-- /wp:html -->
