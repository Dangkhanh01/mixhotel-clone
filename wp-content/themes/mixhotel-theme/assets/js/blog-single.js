/**
 * Blog Single Post TOC Generator
 * Mix Boutique Hotel
 */
(function() {
  function initSingleBlog() {
    const content = document.getElementById('mixMainArticleBody');
    const tocBox = document.getElementById('mixArticleTocBox');
    const tocList = document.getElementById('mixArticleTocList');
    if (!content || !tocBox || !tocList) return;

    const headings = content.querySelectorAll('h2, h3');
    if (headings.length >= 2) {
      tocBox.style.display = 'block';
      tocList.innerHTML = '';
      headings.forEach((h, idx) => {
        const id = 'toc-heading-' + idx;
        h.id = id;
        const li = document.createElement('li');
        li.style.marginLeft = (h.tagName.toLowerCase() === 'h3') ? '16px' : '0';
        const a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = (idx + 1) + '. ' + h.textContent.trim();
        li.appendChild(a);
        tocList.appendChild(li);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSingleBlog);
  } else {
    initSingleBlog();
  }
})();
