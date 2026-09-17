/**
 * YouTube Lite Embed (Facade Pattern)
 * Mix Boutique Hotel Theme
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('videoModalLite');
    var iframeWrap = document.getElementById('videoModalIframeWrap');
    var closeBtn = document.getElementById('btnCloseVideoModal');

    function openVideo(videoId) {
      if (!modal || !iframeWrap || !videoId) return;

      iframeWrap.innerHTML =
        '<iframe src="https://www.youtube-nocookie.com/embed/' +
        encodeURIComponent(videoId) +
        '?autoplay=1&rel=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>';

      modal.classList.add('is-active');
      document.body.classList.add('modal-open');
    }

    function closeVideo() {
      if (!modal) return;
      modal.classList.remove('is-active');
      document.body.classList.remove('modal-open');
      if (iframeWrap) {
        iframeWrap.innerHTML = ''; // Stop video playback
      }
    }

    // Delegate click on any [data-youtube-id]
    document.addEventListener('click', function (e) {
      var target = e.target.closest('[data-youtube-id]');
      if (!target) return;

      var videoId = target.getAttribute('data-youtube-id');
      if (videoId) {
        e.preventDefault();
        openVideo(videoId);
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeVideo);
    }

    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          closeVideo();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
        closeVideo();
      }
    });
  });
})();
