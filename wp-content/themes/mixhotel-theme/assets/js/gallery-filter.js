/**
 * Gallery Filter & Pagination Handler
 * Mix Boutique Hotel
 */
(function() {
  const ITEMS_PER_PAGE = 12;
  let currentBranch = 'all';
  let currentPage = 1;

  function initGallery() {
    const tabs = document.querySelectorAll('#mixGalleryBranchTabs .subcateName');
    const container = document.getElementById('mixGalleryGridContainer');
    const pagContainer = document.getElementById('mixGalleryPagination');
    if (!container || !tabs.length) return;

    const allCards = Array.from(container.querySelectorAll('.galleryItemCol'));

    function render() {
      // Filter cards
      const matched = allCards.filter(card => {
        const b = card.getAttribute('data-branch') || '';
        return currentBranch === 'all' || b === currentBranch || b.includes(currentBranch);
      });

      const totalPages = Math.ceil(matched.length / ITEMS_PER_PAGE) || 1;
      if (currentPage > totalPages) currentPage = 1;

      // Show/hide cards
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      allCards.forEach(c => {
        c.style.setProperty('display', 'none', 'important');
      });
      matched.forEach((c, idx) => {
        if (idx >= startIndex && idx < endIndex) {
          c.style.setProperty('display', 'flex', 'important');
        }
      });

      // Render pagination
      if (!pagContainer) return;
      if (totalPages <= 1) {
        pagContainer.innerHTML = '';
        return;
      }

      let pagHtml = '';
      if (currentPage > 1) {
        pagHtml += '<button type="button" class="pageBtn prevBtn">&lsaquo;</button>';
      }

      for (let p = 1; p <= totalPages; p++) {
        pagHtml += '<button type="button" class="pageBtn ' + (p === currentPage ? 'active' : '') + '" data-page="' + p + '">' + p + '</button>';
      }

      if (currentPage < totalPages) {
        pagHtml += '<button type="button" class="pageBtn nextBtn">&rsaquo;</button>';
      }

      pagContainer.innerHTML = pagHtml;

      // Attach pagination events
      pagContainer.querySelectorAll('.pageBtn').forEach(btn => {
        btn.addEventListener('click', function() {
          if (this.classList.contains('prevBtn')) {
            currentPage--;
          } else if (this.classList.contains('nextBtn')) {
            currentPage++;
          } else {
            currentPage = parseInt(this.getAttribute('data-page'), 10) || 1;
          }
          render();
          container.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }

    // Tab click events
    tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentBranch = this.getAttribute('data-branch') || 'all';
        currentPage = 1;
        render();
      });
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
