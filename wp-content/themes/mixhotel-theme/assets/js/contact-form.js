/**
 * Mix Boutique Hotel — Contact Form JS
 * Vanilla JS: Client validation + AJAX submit + UI feedback
 *
 * @package MixHotelTheme
 * @since 1.0.0
 */

(function () {
  'use strict';

  // ============================================================
  // CONSTANTS & STATE
  // ============================================================
  const FORM_ID         = 'mixhotel-contact-form';
  const SUBMIT_BTN_ID   = 'mixContactFormSubmit';
  const RESULT_ID       = 'mixContactFormResult';
  const VN_PHONE_REGEX  = /^(0[35789])\d{8}$/;
  const EMAIL_REGEX     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isSubmitting = false;

  // ============================================================
  // DOM HELPERS
  // ============================================================
  function getEl(id) {
    return document.getElementById(id);
  }

  function showFieldError(fieldId, message) {
    const field = getEl(fieldId);
    const errorEl = getEl(fieldId + '_error');
    if (field) {
      field.classList.add('mixContactFormInput--error');
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', fieldId + '_error');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.removeAttribute('hidden');
    }
  }

  function clearFieldError(fieldId) {
    const field = getEl(fieldId);
    const errorEl = getEl(fieldId + '_error');
    if (field) {
      field.classList.remove('mixContactFormInput--error');
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.setAttribute('hidden', '');
    }
  }

  function showResult(message, type) {
    const el = getEl(RESULT_ID);
    if (!el) return;
    el.className = 'mixContactFormResult mixContactFormResult--' + type;
    el.textContent = message;
    el.removeAttribute('hidden');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideResult() {
    const el = getEl(RESULT_ID);
    if (el) {
      el.setAttribute('hidden', '');
      el.className = 'mixContactFormResult';
      el.textContent = '';
    }
  }

  function setLoading(isLoading) {
    const btn = getEl(SUBMIT_BTN_ID);
    if (!btn) return;

    const textEl    = btn.querySelector('.mixContactFormBtnText');
    const loadingEl = btn.querySelector('.mixContactFormBtnLoading');

    btn.disabled  = isLoading;
    isSubmitting  = isLoading;

    if (textEl)    textEl.hidden    = isLoading;
    if (loadingEl) loadingEl.hidden = !isLoading;

    if (isLoading) {
      btn.setAttribute('aria-busy', 'true');
    } else {
      btn.removeAttribute('aria-busy');
    }
  }

  // ============================================================
  // VALIDATION
  // ============================================================
  function validateForm(formData) {
    let valid = true;

    // Họ tên
    clearFieldError('contact_name');
    const name = (formData.get('contact_name') || '').trim();
    if (!name || name.length < 2) {
      showFieldError('contact_name', 'Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự).');
      valid = false;
    }

    // Số điện thoại
    clearFieldError('contact_phone');
    const phone = (formData.get('contact_phone') || '').replace(/\D/g, '');
    if (!VN_PHONE_REGEX.test(phone)) {
      showFieldError('contact_phone', 'Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 số, bắt đầu 03, 05, 07, 08, 09).');
      valid = false;
    }

    // Email (tùy chọn nhưng nếu điền phải hợp lệ)
    clearFieldError('contact_email');
    const email = (formData.get('contact_email') || '').trim();
    if (email && !EMAIL_REGEX.test(email)) {
      showFieldError('contact_email', 'Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại.');
      valid = false;
    }

    return valid;
  }

  // ============================================================
  // AJAX SUBMIT
  // ============================================================
  function handleFormSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.target;
    const formData = new FormData(form);

    // Thêm action AJAX
    formData.append('action', 'mixhotel_submit_contact');

    // Thêm nonce từ MixHotelData (localized)
    if (window.MixHotelData && window.MixHotelData.contactNonce) {
      formData.set('_mixhotel_contact_nonce', window.MixHotelData.contactNonce);
    }

    // Client-side validation
    hideResult();
    if (!validateForm(formData)) {
      // Focus trên field đầu tiên có lỗi
      const firstError = form.querySelector('.mixContactFormInput--error');
      if (firstError) firstError.focus();
      return;
    }

    // Loading state
    setLoading(true);

    // AJAX request
    const ajaxUrl = (window.MixHotelData && window.MixHotelData.ajaxUrl)
      ? window.MixHotelData.ajaxUrl
      : '/wp-admin/admin-ajax.php';

    fetch(ajaxUrl, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        setLoading(false);

        if (data.success) {
          showResult(
            data.data && data.data.message
              ? data.data.message
              : 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.',
            'success'
          );
          form.reset();

          // Clear all field errors
          ['contact_name', 'contact_phone', 'contact_email'].forEach(clearFieldError);

        } else {
          const errorMsg = (data.data && data.data.message)
            ? data.data.message
            : 'Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp hotline.';
          showResult(errorMsg, 'error');
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error('[MixHotel Contact Form] AJAX Error:', error);
        showResult(
          'Không thể kết nối máy chủ. Vui lòng liên hệ trực tiếp qua hotline: 038 310 4010',
          'error'
        );
      });
  }

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    const form = getEl(FORM_ID);
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Real-time validation: xóa error khi user bắt đầu gõ lại
    ['contact_name', 'contact_phone', 'contact_email'].forEach(function (fieldId) {
      const field = getEl(fieldId);
      if (field) {
        field.addEventListener('input', function () {
          clearFieldError(fieldId);
        });
      }
    });
  }

  // Khởi chạy sau khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
