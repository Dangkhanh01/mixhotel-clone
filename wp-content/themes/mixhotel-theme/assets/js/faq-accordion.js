/**
 * FAQ Accordion Interaction
 * Mix Boutique Hotel Theme
 *
 * Provides smooth, deterministic single-open accordion behavior
 * across all browsers, addressing WebKit/Blink flex summary activation quirks.
 */

(function () {
  'use strict';

  function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.mixLuxuryFaqItem');
    console.log('[FAQ Accordion] initFaqAccordion found items:', faqItems.length);
    if (!faqItems.length) return;

    faqItems.forEach(function (item, idx) {
      // Sync initial state on load
      if (item.hasAttribute('open') || item.open) {
        item.classList.add('is-open');
      } else {
        item.classList.remove('is-open');
      }

      var summary = item.querySelector('.mixLuxuryFaqQuestion');
      if (!summary) return;

      summary.addEventListener('click', function (e) {
        e.preventDefault();

        var isCurrentlyOpen = item.hasAttribute('open') || item.open;
        var willOpen = !isCurrentlyOpen;
        console.log('[FAQ Accordion] Clicked item #' + (idx + 1) + ', currently open:', isCurrentlyOpen, 'will open:', willOpen);

        // Close all other items for single-accordion UX
        faqItems.forEach(function (otherItem, otherIdx) {
          if (otherItem !== item) {
            otherItem.removeAttribute('open');
            otherItem.open = false;
            otherItem.classList.remove('is-open');
          }
        });

        // Toggle current item
        if (willOpen) {
          item.setAttribute('open', '');
          item.open = true;
          item.classList.add('is-open');
          console.log('[FAQ Accordion] Item #' + (idx + 1) + ' opened. Classlist:', item.className);
        } else {
          item.removeAttribute('open');
          item.open = false;
          item.classList.remove('is-open');
          console.log('[FAQ Accordion] Item #' + (idx + 1) + ' closed. Classlist:', item.className);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqAccordion);
  } else {
    initFaqAccordion();
  }
})();



