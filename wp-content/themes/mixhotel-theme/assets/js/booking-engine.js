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
      setupRealtimeAvailability(roomForm);
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
      formData.set('action', 'mixhotel_submit_booking');

      // Luôn ghi đè nonce fresh từ MixHotelData (Fix BUG-17)
      if (window.MixHotelData && window.MixHotelData.nonce) {
        formData.set('mixhotel_booking_nonce', window.MixHotelData.nonce);
      }
      formData.delete('mixhotel_booking_security');

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
            var errCode = (res && res.data && res.data.code) ? res.data.code : '';
            showError(form, errMsg, errCode);
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
   * Thiết lập kiểm tra phòng trống thời gian thực cho trang chi tiết phòng (T019)
   */
  function setupRealtimeAvailability(form) {
    var dateInput = form.querySelector('input[name="booking_date"]');
    var timeInput = form.querySelector('input[name="booking_time"]');
    var demandSelect = form.querySelector('select[name="booking_demand"]');
    var roomIdInput = form.querySelector('input[name="room_id"]');

    if (!roomIdInput || !roomIdInput.value) return;

    var badge = document.createElement('div');
    badge.className = 'mix-room-avail-badge';
    badge.style.display = 'none';
    badge.style.margin = '10px 0';
    badge.style.padding = '8px 12px';
    badge.style.borderRadius = '4px';
    badge.style.fontSize = '13px';
    badge.style.fontWeight = '500';

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn && submitBtn.parentNode) {
      submitBtn.parentNode.insertBefore(badge, submitBtn);
    }

    var debounceTimer = null;
    function checkAvail() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        var date = dateInput ? dateInput.value : '';
        var time = timeInput ? timeInput.value : '';
        var demand = demandSelect ? demandSelect.value : '';
        var roomId = roomIdInput.value;

        if (!date) return;

        badge.style.display = 'block';
        badge.style.background = '#edf2f7';
        badge.style.color = '#4a5568';
        badge.style.border = '1px solid #cbd5e0';
        badge.innerHTML = '⏳ Đang kiểm tra phòng trống...';

        var ajaxUrl = (window.MixHotelData && window.MixHotelData.ajaxUrl)
          ? window.MixHotelData.ajaxUrl
          : '/wp-admin/admin-ajax.php';

        var url = ajaxUrl + '?action=mixhotel_check_availability&room_id=' + encodeURIComponent(roomId) +
                  '&booking_date=' + encodeURIComponent(date) +
                  '&booking_time=' + encodeURIComponent(time) +
                  '&booking_demand=' + encodeURIComponent(demand);

        fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res && res.success && res.data) {
              if (res.data.available) {
                badge.style.background = '#f0fff4';
                badge.style.color = '#276749';
                badge.style.border = '1px solid #9ae6b4';
                badge.innerHTML = '✅ <strong>Còn trống:</strong> Khung giờ ' + (res.data.check_in || '') + ' &rarr; ' + (res.data.check_out || '') + ' sẵn sàng!';
                if (submitBtn) submitBtn.disabled = false;
              } else {
                badge.style.background = '#fff5f5';
                badge.style.color = '#c53030';
                badge.style.border = '1px solid #feb2b2';
                badge.innerHTML = '🔴 <strong>Đã kín:</strong> ' + (res.data.message || 'Khung giờ này đã có khách giữ phòng. Vui lòng chọn giờ khác!');
              }
            }
          })
          .catch(function() {
            badge.style.display = 'none';
          });
      }, 350);
    }

    if (dateInput) dateInput.addEventListener('change', checkAvail);
    if (timeInput) timeInput.addEventListener('change', checkAvail);
    if (demandSelect) demandSelect.addEventListener('change', checkAvail);

    if (dateInput && dateInput.value) {
      checkAvail();
    }
  }

  /**
   * Xử lý sau khi gửi đơn thành công (T017)
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
      var timeRow = modal.querySelector('[data-booking-time-row]');
      var checkinEl = modal.querySelector('[data-booking-checkin]');
      var checkoutEl = modal.querySelector('[data-booking-checkout]');
      var holdTimeEl = modal.querySelector('[data-booking-hold-time]');
      var descEl = modal.querySelector('#mix-booking-modal-desc');

      if (codeEl && data.lead_code) {
        codeEl.textContent = data.lead_code;
      }
      if (branchEl && data.branch_name) {
        branchEl.textContent = data.branch_name;
      }
      if (hotlineEl && data.branch_hotline) {
        hotlineEl.textContent = data.branch_hotline;
      }
      if (holdTimeEl && data.hold_minutes) {
        holdTimeEl.textContent = data.hold_minutes + ' phút';
      }
      if (timeRow && (data.check_in || data.check_out)) {
        timeRow.style.display = 'flex';
        if (checkinEl && data.check_in) checkinEl.textContent = data.check_in;
        if (checkoutEl && data.check_out) checkoutEl.textContent = data.check_out;
      }
      if (descEl && data.message) {
        descEl.textContent = data.message;
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
      var holdText = data.hold_minutes ? ('\nThời gian giữ phòng: ' + data.hold_minutes + ' phút.') : '';
      var timeText = (data.check_in && data.check_out) ? ('\nKhung giờ: ' + data.check_in + ' - ' + data.check_out) : '';
      alert(
        'Yêu cầu giữ phòng thành công!\nMã đơn: ' + (data.lead_code || '') +
        '\nChi nhánh: ' + (data.branch_name || '') + timeText + holdText +
        '\nNhân viên sẽ liên hệ lại ngay!'
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
  function showError(form, message, errorCode) {
    clearError(form);

    var errEl = document.createElement('div');
    errEl.className = 'mix-form-error-alert';
    if (errorCode === 'room_unavailable') {
      errEl.style.background = '#fff5f5';
      errEl.style.borderLeft = '4px solid #e53e3e';
      errEl.style.color = '#c53030';
      errEl.style.padding = '12px 14px';
      errEl.style.borderRadius = '4px';
      errEl.style.marginBottom = '14px';
      errEl.innerHTML = '<strong style="display:block;margin-bottom:4px;">⚠️ Phòng đã kín lịch!</strong>' +
        '<span>' + escapeHtml(message) + '</span>' +
        '<div style="margin-top:8px;"><a href="tel:0383104010" style="color:#c5a880;font-weight:bold;text-decoration:underline;">Gọi Hotline 038 310 4010</a> để nhân viên hỗ trợ xếp phòng nhanh.</div>';
    } else {
      errEl.innerHTML = '<span class="dashicons dashicons-warning" style="margin-right:6px;"></span>' + escapeHtml(message);
    }

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
