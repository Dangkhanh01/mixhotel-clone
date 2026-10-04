/**
 * Room Archive Landing Page Interactions
 * Mix Boutique Hotel Theme
 */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // 1. Branch Tab Navigation
    const tabs = document.querySelectorAll('#cateBranchTabsContainer .cateBranchTab');
    if (tabs.length) {
      tabs.forEach(function(tab) {
        tab.addEventListener('click', function(e) {
          e.preventDefault();
          tabs.forEach(function(t) { t.classList.remove('cateBranchTabActive'); });
          this.classList.add('cateBranchTabActive');
          const targetId = this.getAttribute('data-target');
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }

    // 2. TOC toggle
    const tocHeader = document.getElementById('tocToggleHeader');
    const bookmarkList = document.getElementById('bookmark-list');
    const tocIcon = document.getElementById('tocToggleIcon');
    if (tocHeader && bookmarkList) {
      tocHeader.addEventListener('click', function() {
        if (bookmarkList.style.display === 'none') {
          bookmarkList.style.display = 'block';
          if (tocIcon) tocIcon.textContent = '▾';
        } else {
          bookmarkList.style.display = 'none';
          if (tocIcon) tocIcon.textContent = '▸';
        }
      });
    }

    // 3. Consultation Form room selector update by branch
    const branchSelect = document.getElementById('landing_branch');
    const roomSelect = document.getElementById('landing_room');
    const formRoomsData = window.MixHotelLandingRooms || {};

    if (branchSelect && roomSelect) {
      branchSelect.addEventListener('change', function() {
        const selected = this.value;
        const opts = formRoomsData[selected] || formRoomsData['All'] || [];
        roomSelect.innerHTML = '<option value="">Chọn phòng nếu đã có ý thích</option>';
        opts.forEach(function(opt) {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.text;
          roomSelect.appendChild(option);
        });
      });
    }

    // 4. Form Submit Handler
    const form = document.getElementById('mixLandingBookingForm');
    const successBox = document.getElementById('mixLandingFormSuccess');
    const submitBtn = document.getElementById('landingSubmitBtn');

    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nameInput = document.getElementById('landing_name');
        const phoneInput = document.getElementById('landing_phone');
        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';

        if (!name || !phone) {
          alert('Vui lòng nhập họ và tên cùng số điện thoại!');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Đang gửi...';
        }

        setTimeout(function() {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Gửi yêu cầu';
          }
          if (successBox) {
            successBox.style.display = 'block';
            form.reset();
            successBox.scrollIntoView({ behavior: 'smooth' });
            setTimeout(function() {
              successBox.style.display = 'none';
            }, 8000);
          }
        }, 1000);
      });
    }
  });
})();
