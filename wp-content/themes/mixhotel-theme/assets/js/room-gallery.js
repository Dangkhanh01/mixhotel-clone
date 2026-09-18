/**
 * Room Gallery — Click thumbnail → swap main image
 * Mix Boutique Hotel Theme
 *
 * @package MixHotelTheme
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var mainImage = document.getElementById('room-active-image');
    var galleryGrid = document.getElementById('room-gallery-grid');

    if (!mainImage || !galleryGrid) {
      return;
    }

    var thumbs = galleryGrid.querySelectorAll('.mixDetailGalleryThumb');

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var fullSrc = this.getAttribute('data-full-src');
        var alt = this.getAttribute('data-alt') || '';

        if (!fullSrc) return;

        // Swap main image with fade transition
        mainImage.style.opacity = '0';

        setTimeout(function () {
          mainImage.src = fullSrc;
          mainImage.alt = alt;
          mainImage.style.opacity = '1';
        }, 200);

        // Update active state
        thumbs.forEach(function (t) {
          t.classList.remove('is-active');
        });
        this.classList.add('is-active');
      });
    });

    // Add CSS transition to main image if not already set
    mainImage.style.transition = 'opacity 0.2s ease';
  });
})();
