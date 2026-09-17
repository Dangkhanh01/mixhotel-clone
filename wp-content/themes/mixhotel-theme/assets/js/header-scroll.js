/**
 * Header Scroll & Mobile Navigation Handler
 * Mix Boutique Hotel Theme
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Sticky Header Scroll Detection
    var desktopHeader = document.getElementById('menuMixPremiumDesktop');

    function handleHeaderScroll() {
      if (!desktopHeader) return;
      if (window.scrollY > 30) {
        desktopHeader.classList.add('mixPremiumMenuScrolled');
      } else {
        desktopHeader.classList.remove('mixPremiumMenuScrolled');
      }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Run once initially

    // 2. Mobile Drawer Controls
    var btnOpen = document.getElementById('btnOpenMobileMenu');
    var btnClose = document.getElementById('btnCloseMobileMenu');
    var drawer = document.getElementById('mobileDrawer');

    function openMobileDrawer() {
      if (!drawer) return;
      drawer.classList.add('is-open');
      document.body.classList.add('modal-open');
    }

    function closeMobileDrawer() {
      if (!drawer) return;
      drawer.classList.remove('is-open');
      document.body.classList.remove('modal-open');
    }

    if (btnOpen) {
      btnOpen.addEventListener('click', openMobileDrawer);
    }

    if (btnClose) {
      btnClose.addEventListener('click', closeMobileDrawer);
    }

    // 3. Submenu Toggles in Mobile Drawer
    var toggles = document.querySelectorAll('.catePartToggle');
    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var parent = toggle.closest('.catePart');
        if (parent) {
          parent.classList.toggle('active');
          var isExpanded = parent.classList.contains('active');
          toggle.innerHTML = isExpanded ? '&#9652;' : '&#9662;';
        }
      });
    });

    // 4. Close drawer on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
        closeMobileDrawer();
      }
    });

    // 5. Close drawer when clicking any link inside
    if (drawer) {
      var links = drawer.querySelectorAll('a');
      links.forEach(function (link) {
        link.addEventListener('click', function () {
          closeMobileDrawer();
        });
      });
    }
  });
})();
