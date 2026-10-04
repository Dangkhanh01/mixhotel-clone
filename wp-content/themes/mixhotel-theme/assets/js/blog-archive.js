/**
 * Blog Archive Filtering & Pagination Handler
 * Mix Boutique Hotel
 */
(function() {
  const ITEMS_PER_PAGE = 6;
  let currentCat = 'all';
  let currentPage = 1;

  function initBlog() {
    const tabs = document.querySelectorAll('#mixBlogCatTabs .mixBlogCategoryPill');
    const container = document.getElementById('mixBlogGridContainer');
    const pagContainer = document.getElementById('mixBlogPagination');
    const titleEl = document.getElementById('mixBlogTitle');
    const subtitleEl = document.getElementById('mixBlogSubtitle');

    if (!container || !tabs.length) return;

    const allCards = Array.from(container.querySelectorAll('.mixBlogCard'));

    function render() {
      const matched = allCards.filter(card => {
        const c = card.getAttribute('data-cat') || '';
        return currentCat === 'all' || c === currentCat;
      });

      const totalPages = Math.ceil(matched.length / ITEMS_PER_PAGE) || 1;
      if (currentPage > totalPages) currentPage = 1;

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      allCards.forEach(c => c.style.display = 'none');
      matched.forEach((c, idx) => {
        if (idx >= startIndex && idx < endIndex) {
          c.style.display = 'flex';
        }
      });

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

    tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentCat = this.getAttribute('data-cat') || 'all';
        if (titleEl && this.getAttribute('data-title')) {
          titleEl.innerText = this.getAttribute('data-title');
        }
        if (subtitleEl && this.getAttribute('data-subtitle')) {
          subtitleEl.innerText = this.getAttribute('data-subtitle');
        }
        currentPage = 1;
        render();
      });
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog);
  } else {
    initBlog();
  }
})();
