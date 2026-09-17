/**
 * Contact Modal & Interaction Dispatcher
 * Mix Boutique Hotel Theme
 * Tuân thủ 100% contracts/modal-interaction.contract.json và contracts/booking-form.contract.json
 */

(function () {
  'use strict';

  var BRANCH_DATA = {
    'branch-premium': {
      name: 'Mix Boutique Premium',
      phone: '038 310 4010',
      phoneTel: 'tel:+84383104010',
      zaloUrl: 'https://zalo.me/0383104010',
      messengerUrl: 'https://m.me/602986296805550/',
      smsTel: 'sms:+84383104010'
    },
    'branch-dangtiendong': {
      name: 'Mix Boutique Hotel 256B Đặng Tiến Đông',
      phone: '039 330 7030',
      phoneTel: 'tel:+84393307030',
      zaloUrl: 'https://zalo.me/0393307030',
      messengerUrl: 'https://m.me/111428390604292/',
      smsTel: 'sms:+84393307030'
    },
    'branch-phucla': {
      name: 'Mix Boutique Hotel 20 Phúc La Hà Đông',
      phone: '035 366 0966',
      phoneTel: 'tel:+84353660966',
      zaloUrl: 'https://zalo.me/0353660966',
      messengerUrl: 'https://m.me/114361207416511',
      smsTel: 'sms:+84353660966'
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('popupContact_1');
    if (!modal) return;

    var overlay = modal.querySelector('.mix-contact-modal__overlay');
    var closeBtn = modal.querySelector('.mix-contact-modal__close');
    var branchItems = modal.querySelectorAll('.mix-contact-modal__branch-item');
    var modalDesc = document.getElementById('mix-modal-desc');
    var lastFocusedElement = null;

    // 1. Open Modal Function
    function openModal(contactType, roomTitle, prefilledMessage) {
      contactType = contactType || 'zalo';
      lastFocusedElement = document.activeElement;

      // Update branch links & labels according to contactType
      branchItems.forEach(function (item) {
        var branchId = item.getAttribute('data-branch-id');
        var data = BRANCH_DATA[branchId];
        if (!data) return;

        var labelEl = item.querySelector('.mix-action-label');
        var targetUrl = data.zaloUrl;
        var labelText = 'Nhắn Zalo Tư Vấn';

        if (contactType === 'phone') {
          targetUrl = data.phoneTel;
          labelText = 'Gọi: ' + data.phone;
        } else if (contactType === 'messenger') {
          targetUrl = data.messengerUrl;
          labelText = 'Chat Messenger';
        } else if (contactType === 'sms') {
          targetUrl = data.smsTel;
          labelText = 'Gửi SMS: ' + data.phone;
        } else {
          // zalo or booking
          if (prefilledMessage) {
            targetUrl = data.zaloUrl + '?text=' + encodeURIComponent(prefilledMessage);
          } else {
            targetUrl = data.zaloUrl;
          }
          labelText = 'Nhắn Zalo Tư Vấn';
        }

        item.setAttribute('href', targetUrl);
        if (labelEl) {
          labelEl.textContent = labelText;
        }
      });

      // Update description with roomTitle if present
      if (modalDesc) {
        if (roomTitle) {
          modalDesc.innerHTML = 'Bạn đang quan tâm: <span class="mix-contact-modal__room-tag">' + escapeHtml(roomTitle) + '</span>';
        } else {
          modalDesc.textContent = 'Mix sẵn sàng tư vấn phòng còn trống và gửi ảnh thực tế tức thì.';
        }
      }

      modal.classList.add('is-active');
      document.body.classList.add('modal-open');

      if (closeBtn) {
        closeBtn.focus();
      }

      // Dispatch open event
      var evt = new CustomEvent('mixhotel:modal:open', { detail: { contactType: contactType, roomTitle: roomTitle } });
      document.dispatchEvent(evt);
    }

    // 2. Close Modal Function
    function closeModal() {
      modal.classList.remove('is-active');
      document.body.classList.remove('modal-open');

      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }

      var evt = new CustomEvent('mixhotel:modal:close');
      document.dispatchEvent(evt);
    }

    // Close listeners
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });

    // 3. Delegate CTA buttons with [data-contact-action]
    document.addEventListener('click', function (e) {
      var target = e.target.closest('[data-contact-action]');
      if (!target) return;

      e.preventDefault();
      var actionType = target.getAttribute('data-contact-action') || 'zalo';
      var branchId = target.getAttribute('data-branch-id');
      var roomTitle = target.getAttribute('data-room-title');

      // If specific branch is targeted directly with a phone or zalo action:
      if (branchId && BRANCH_DATA[branchId]) {
        var b = BRANCH_DATA[branchId];
        if (actionType === 'phone') {
          window.location.href = b.phoneTel;
          return;
        } else if (actionType === 'zalo') {
          window.open(b.zaloUrl, '_blank', 'noopener,noreferrer');
          return;
        }
      }

      // Otherwise open branch select modal
      openModal(actionType, roomTitle);
    });

    function copyToClipboard(text) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).catch(function () {
          fallbackCopy(text);
        });
      } else {
        fallbackCopy(text);
      }
    }

    function fallbackCopy(text) {
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('[MixHotel] execCommand copy failed', err);
      }
      document.body.removeChild(textArea);
    }

    // 4. Hero Booking Form Handler (Spec 02 Behavior)
    var bookingForm = document.getElementById('hero-booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Check honeypot field
        var hp = bookingForm.querySelector('input[name="mixhotel_hp_email"]');
        if (hp && hp.value.trim() !== '') {
          return; // Bot detected, silently abort
        }

        var nameInput = bookingForm.querySelector('input[name="customer_name"]');
        var phoneInput = bookingForm.querySelector('input[name="customer_phone"]');
        var branchSelect = bookingForm.querySelector('select[name="branch_id"]');
        var demandSelect = bookingForm.querySelector('select[name="booking_demand"]');

        var name = nameInput ? nameInput.value.trim() : '';
        var phone = phoneInput ? phoneInput.value.trim() : '';
        var branchVal = branchSelect ? branchSelect.value : 'branch-premium';
        var branchText = branchSelect && branchSelect.selectedIndex >= 0 ? branchSelect.options[branchSelect.selectedIndex].text : '';
        var demandText = demandSelect && demandSelect.selectedIndex >= 0 ? demandSelect.options[demandSelect.selectedIndex].text : '';

        // Validate phone
        var phonePattern = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (!phonePattern.test(phone)) {
          alert('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, bắt đầu 03/05/07/08/09)');
          if (phoneInput) phoneInput.focus();
          return;
        }

        // Format prefilled message
        var msg = 'Chào Mix, tôi là ' + name + ' (' + phone + '), muốn đặt phòng tại ' + branchText + ', gói: ' + demandText;

        var branchData = BRANCH_DATA[branchVal] || BRANCH_DATA['branch-premium'];
        var targetZalo = branchData.zaloUrl + '?text=' + encodeURIComponent(msg);

        // Rich Console Diagnostics for debugging & verification
        console.group('%c[MixHotel] 🏨 THÔNG TIN ĐẶT PHÒNG TỪ HERO FORM', 'background: #c5a880; color: #000; font-weight: bold; font-size: 13px; padding: 4px 8px; border-radius: 4px;');
        console.log('%c👤 Khách hàng:%c ' + name, 'font-weight: bold; color: #c5a880;', 'color: #fff;');
        console.log('%c📞 Số điện thoại:%c ' + phone, 'font-weight: bold; color: #c5a880;', 'color: #fff;');
        console.log('%c🏢 Chi nhánh chọn:%c ' + branchText + ' (' + branchVal + ')', 'font-weight: bold; color: #c5a880;', 'color: #fff;');
        console.log('%c🎯 Nhu cầu phòng:%c ' + demandText, 'font-weight: bold; color: #c5a880;', 'color: #fff;');
        console.log('%c💬 Tin nhắn tự tạo (Message Body):%c\n' + msg, 'font-weight: bold; color: #dfc299;', 'color: #a0e0a0; font-style: italic;');
        console.log('%c🔗 URL Zalo mở ra:%c ' + targetZalo, 'font-weight: bold; color: #3b82f6;', 'color: #93c5fd;');
        console.warn('⚠️ LƯU Ý KỸ THUẬT VỀ ZALO: Zalo Web và Zalo App hiện tại KHÔNG hỗ trợ điền tự động nội dung tin nhắn qua tham số URL "?text=..." cho tài khoản cá nhân vì chính sách bảo mật/chống spam của VNG/Zalo.');
        console.info('📋 GIẢI PHÁP MIX BOUTIQUE: Hệ thống đã TỰ ĐỘNG SAO CHÉP (Copy) toàn bộ nội dung tin nhắn này vào Clipboard của bạn. Bạn chỉ việc mở Zalo và nhấn Dán (Ctrl + V / Paste) là gửi được ngay!');
        console.groupEnd();

        // 1. Automatically copy message to Clipboard
        copyToClipboard(msg);

        // 2. Show Toast Notification
        var toast = document.getElementById('mixBookingToast');
        var toastMsg = document.getElementById('mixBookingToastMsg');
        var btnCopyToast = document.getElementById('btnCopyBookingToast');
        var btnZaloToast = document.getElementById('btnOpenZaloToast');
        var btnCloseToast = document.getElementById('btnCloseBookingToast');

        if (toast) {
          if (toastMsg) toastMsg.textContent = msg;
          if (btnZaloToast) btnZaloToast.setAttribute('href', targetZalo);
          toast.classList.add('is-show');

          if (btnCopyToast) {
            btnCopyToast.onclick = function () {
              copyToClipboard(msg);
              btnCopyToast.innerHTML = '<span>✓</span> Đã sao chép!';
              setTimeout(function () {
                btnCopyToast.innerHTML = '<span>📋</span> Sao chép lại';
              }, 2000);
            };
          }

          if (btnCloseToast) {
            btnCloseToast.onclick = function () {
              toast.classList.remove('is-show');
            };
          }
        }

        // 3. Open Zalo chat
        window.open(targetZalo, '_blank', 'noopener,noreferrer');
      });
    }

    // 5. Desktop Contact Bar Scroll-To-Top
    var btnScrollTop = document.getElementById('btnScrollToTop');
    function handleScrollTopVisibility() {
      if (!btnScrollTop) return;
      if (window.scrollY > 200) {
        btnScrollTop.classList.add('is-visible');
      } else {
        btnScrollTop.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });
    handleScrollTopVisibility();

    if (btnScrollTop) {
      btnScrollTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    function escapeHtml(text) {
      var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return String(text).replace(/[&<>"']/g, function (m) { return map[m]; });
    }
  });
})();
