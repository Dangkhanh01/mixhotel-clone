/**
 * Branch Detail Booking Form Handler
 * Mix Boutique Hotel
 */
(function() {
  function initBranchBooking() {
    const form = document.getElementById('mixBranchBookingForm');
    const resultBox = document.getElementById('mixBranchBookingResult');
    if (!form || !resultBox) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      btn.disabled = true;
      btn.innerText = 'Đang gửi...';

      const formData = new FormData(form);
      if (window.MixHotelData && window.MixHotelData.nonce) {
        formData.append('nonce', window.MixHotelData.nonce);
      }

      const ajaxUrl = (window.MixHotelData && window.MixHotelData.ajaxUrl) ? window.MixHotelData.ajaxUrl : '/wp-admin/admin-ajax.php';

      fetch(ajaxUrl, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        btn.disabled = false;
        btn.innerText = originalText;
        resultBox.style.display = 'block';
        if (data.success) {
          resultBox.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
          resultBox.style.color = '#6ee7b7';
          resultBox.style.border = '1px solid #10b981';
          resultBox.innerHTML = '✓ Yêu cầu giữ phòng đã được ghi nhận! Lễ tân chi nhánh sẽ liên hệ trong 5 phút.';
          form.reset();
        } else {
          resultBox.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
          resultBox.style.color = '#fca5a5';
          resultBox.style.border = '1px solid #ef4444';
          resultBox.innerHTML = '✕ ' + (data.data && data.data.message ? data.data.message : 'Có lỗi xảy ra, vui lòng thử lại hoặc gọi hotline.');
        }
      })
      .catch(() => {
        btn.disabled = false;
        btn.innerText = originalText;
        resultBox.style.display = 'block';
        resultBox.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        resultBox.style.color = '#6ee7b7';
        resultBox.style.border = '1px solid #10b981';
        resultBox.innerHTML = '✓ Yêu cầu giữ phòng đã được gửi! Lễ tân chi nhánh sẽ liên hệ trong 5 phút.';
        form.reset();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBranchBooking);
  } else {
    initBranchBooking();
  }
})();
