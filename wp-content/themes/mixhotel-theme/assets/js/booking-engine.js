/**
 * Mix Boutique Hotel - Frontend Booking Engine
 *
 * Vanilla JS xử lý AJAX submit cho form đặt phòng (Hero & Chi tiết phòng),
 * kiểm tra hợp lệ dữ liệu, hiển thị loading spinner, và mở Modal xác nhận giữ phòng.
 *
 * @package MixHotelTheme
 * @since 1.0.0
 */

(function () {
  'use strict';

  // Chờ DOM sẵn sàng
  document.addEventListener('DOMContentLoaded', initBookingEngine);

  function initBookingEngine() {
    var heroForm = document.getElementById('hero-booking-form');
    var roomForm = document.getElementById('mixhotel-booking-form');

    if (heroForm) {
      setupFormHandler(heroForm, 'hero');
    }
    if (roomForm) {
      setupFormHandler(roomForm, 'detail');
    }

    setupModalCloseHandlers();
  }

  /**
   * Thiết lập listener cho từng form
   */
  function setupFormHandler(form, formType) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      var nameInput = form.querySelector('input[name="customer_name"]');
      var phoneInput = form.querySelector('input[name="customer_phone"]');

      // 1. Client-side Validation
      var name = nameInput ? nameInput.value.trim() : '';
      var phone = phoneInput ? phoneInput.value.trim().replace(/[^0-9]/g, '') : '';

      if (!name || name.length < 2) {
        showError(form, 'Vui lòng nhập họ và tên của bạn (tối thiểu 2 ký tự).');
        if (nameInput) nameInput.focus();
        return;
      }

      // Kiểm tra chuẩn SĐT Việt Nam: 10 chữ số, bắt đầu 03, 05, 07, 08, 09
      var phonePattern = /^(0[35789])[0-9]{8}$/;
      if (!phonePattern.test(phone)) {
        showError(form, 'Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số (bắt đầu bằng 03, 05, 07, 08, 09).');
        if (phoneInput) phoneInput.focus();
        return;
      }

      // Xóa thông báo lỗi cũ nếu có
      clearError(form);

      // 2. Trạng thái Loading
      var originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('data-original-text', originalBtnHtml);
        submitBtn.innerHTML = '<span class="mix-spinner"></span> Đang gửi yêu cầu...';
      }

      // 3. Chuẩn bị FormData
      var formData = new FormData(form);

      // Đảm bảo action đúng
      if (!formData.get('action')) {
        formData.append('action', 'mixhotel_submit_booking');
      }

      // Bổ sung nonce từ MixHotelData nếu form chưa có
      if (window.MixHotelData && window.MixHotelData.nonce) {
        if (!formData.get('mixhotel_booking_nonce') && !formData.get('mixhotel_booking_security')) {
          formData.append('mixhotel_booking_nonce', window.MixHotelData.nonce);
        }
      }

      // Endpoint AJAX của WordPress
      var ajaxUrl = (window.MixHotelData && window.MixHotelData.ajaxUrl)
        ? window.MixHotelData.ajaxUrl
        : '/wp-admin/admin-ajax.php';

      // 4. Gửi AJAX request
      fetch(ajaxUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          // Khôi phục nút submit
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || originalBtnHtml;
          }

          if (res && res.success) {
            handleBookingSuccess(res.data, form, formType);
          } else {
            var errMsg = (res && res.data && res.data.message)
              ? res.data.message
              : 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại hoặc gọi Hotline!';
            showError(form, errMsg);
          }
        })
        .catch(function (err) {
          console.error('[MixHotel Booking Engine] AJAX Error:', err);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || originalBtnHtml;
          }
          showError(form, 'Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng hoặc liên hệ qua Hotline!');
        });
    });
  }

  /**
   * Xử lý sau khi gửi đơn thành công
   */
  function handleBookingSuccess(data, form, formType) {
    // 1. Reset form
    form.reset();

    // 2. Nếu ở trang chi tiết phòng và có sẵn box thông báo inline
    var inlineSuccess = document.getElementById('booking-success-msg');
    if (inlineSuccess) {
      inlineSuccess.style.display = 'block';
    }

    // 3. Kích hoạt và điền dữ liệu vào Booking Confirmation Modal (#mixhotel-booking-modal)
    var modal = document.getElementById('mixhotel-booking-modal');
    if (modal) {
      var codeEl = modal.querySelector('[data-booking-code]');
      var branchEl = modal.querySelector('[data-booking-branch]');
      var hotlineEl = modal.querySelector('[data-booking-hotline]');
      var zaloBtn = modal.querySelector('[data-booking-zalo-btn]');
      var callBtn = modal.querySelector('[data-booking-call-btn]');
      var sandboxNotice = modal.querySelector('[data-booking-sandbox-notice]');

      if (codeEl && data.lead_code) {
        codeEl.textContent = data.lead_code;
      }
      if (branchEl && data.branch_name) {
        branchEl.textContent = data.branch_name;
      }
      if (hotlineEl && data.branch_hotline) {
        hotlineEl.textContent = data.branch_hotline;
      }
      if (zaloBtn && data.branch_zalo) {
        zaloBtn.href = data.branch_zalo;
      }
      if (callBtn && data.branch_hotline) {
        callBtn.href = 'tel:' + data.branch_hotline.replace(/\s+/g, '');
      }
      if (sandboxNotice) {
        sandboxNotice.style.display = data.is_demo ? 'block' : 'none';
      }

      openBookingModal(modal);
    } else {
      // Fallback nếu modal chưa được render trong template
      alert(
        'Yêu cầu giữ phòng thành công!\nMã đơn: ' + (data.lead_code || '') +
        '\nChi nhánh: ' + (data.branch_name || '') +
        '\nPhòng của bạn được giữ tạm thời trong 15 phút. Nhân viên sẽ liên hệ lại ngay!'
      );
    }
  }

  /**
   * Mở Modal xác nhận
   */
  function openBookingModal(modal) {
    modal.classList.add('is-active');
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');

    // Bắt focus vào nút đóng đầu tiên
    var closeBtn = modal.querySelector('.mix-modal__close, [data-booking-modal-close]');
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  /**
   * Đóng Modal xác nhận
   */
  function closeBookingModal() {
    var modal = document.getElementById('mixhotel-booking-modal');
    if (modal) {
      modal.classList.remove('is-active');
      document.body.classList.remove('modal-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Thiết lập sự kiện đóng Modal (click backdrop, nút x, phím Esc)
   */
  function setupModalCloseHandlers() {
    var modal = document.getElementById('mixhotel-booking-modal');
    if (!modal) return;

    // Click nút đóng hoặc overlay
    modal.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-booking-modal-close') || e.target.closest('[data-booking-modal-close]')) {
        e.preventDefault();
        closeBookingModal();
      }
    });

    // Phím Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        if (modal.classList.contains('is-active')) {
          closeBookingModal();
        }
      }
    });
  }

  /**
   * Hiển thị thông báo lỗi thân thiện trên form
   */
  function showError(form, message) {
    clearError(form);

    var errEl = document.createElement('div');
    errEl.className = 'mix-form-error-alert';
    errEl.innerHTML = '<span class="dashicons dashicons-warning" style="margin-right:6px;"></span>' + escapeHtml(message);

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn && submitBtn.parentNode) {
      submitBtn.parentNode.insertBefore(errEl, submitBtn);
    } else {
      form.appendChild(errEl);
    }
  }

  /**
   * Xóa thông báo lỗi
   */
  function clearError(form) {
    var existing = form.querySelector('.mix-form-error-alert');
    if (existing) {
      existing.remove();
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
