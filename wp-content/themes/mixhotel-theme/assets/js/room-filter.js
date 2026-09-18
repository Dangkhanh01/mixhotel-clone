/**
 * Room Filter — Click amenity tag → filter cards by data-amenity attribute
 * Mix Boutique Hotel Theme
 *
 * Spec US2: Bấm vào tag tiện nghi → chỉ hiển thị phòng có taxonomy tương ứng
 *
 * @package MixHotelTheme
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var filterBar = document.getElementById('room-filter-bar');
    var grid = document.getElementById('room-archive-grid');

    if (!filterBar || !grid) {
      return;
    }

    var filterTags = filterBar.querySelectorAll('.mixArchiveFilterTag');
    var cards = grid.querySelectorAll('.mixArchiveCard');

    filterTags.forEach(function (tag) {
      tag.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');

        // Update active tag
        filterTags.forEach(function (t) {
          t.classList.remove('is-active');
        });
        this.classList.add('is-active');

        // Filter cards
        cards.forEach(function (card) {
          var cardAmenities = (card.getAttribute('data-amenities') || '').split(',');

          if (filter === 'all' || cardAmenities.indexOf(filter) !== -1) {
            // Show card with fade-in
            card.classList.remove('is-hidden');
            card.classList.add('is-visible');
            card.style.display = '';
          } else {
            // Hide card with fade-out
            card.classList.remove('is-visible');
            card.classList.add('is-hidden');
            // Use timeout to allow CSS transition before display:none
            setTimeout(function () {
              if (card.classList.contains('is-hidden')) {
                card.style.display = 'none';
              }
            }, 300);
          }
        });
      });
    });
  });
})();
