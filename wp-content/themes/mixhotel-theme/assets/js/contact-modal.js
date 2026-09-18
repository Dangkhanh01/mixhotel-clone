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

    // 4. Hero Booking Form is handled by booking-engine.js (Feature 04)


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
