import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const scrapedDir = path.resolve('scratch/scraped_articles');
const imageMap = JSON.parse(fs.readFileSync(path.resolve('scratch/image_mapping.json'), 'utf8'));

const categoryMap = {
  'khach-san-vintage': { category: 'review', categoryName: 'Review khách sạn', date: '14/09/2026', readTime: '6 phút đọc', views: 3420 },
  'khach-san-phong-cach-tropical': { category: 'hen-ho', categoryName: 'Địa điểm hẹn hò', date: '12/09/2026', readTime: '5 phút đọc', views: 2890 },
  'khach-san-phong-cach-indochine': { category: 'review', categoryName: 'Review khách sạn', date: '10/09/2026', readTime: '7 phút đọc', views: 4150 },
  'khach-san-gan-lang-bac': { category: 'dia-chi', categoryName: 'Địa chỉ khách sạn', date: '08/09/2026', readTime: '6 phút đọc', views: 2180 },
  'so-sanh-khach-san': { category: 'kien-thuc', categoryName: 'Kiến thức khách sạn', date: '05/09/2026', readTime: '8 phút đọc', views: 5600 },
  'bang-noi-quy-khach-san': { category: 'kien-thuc', categoryName: 'Kiến thức khách sạn', date: '01/09/2026', readTime: '4 phút đọc', views: 6730 },
  'khach-san-gan-pho-co': { category: 'dia-chi', categoryName: 'Địa chỉ khách sạn', date: '28/08/2026', readTime: '5 phút đọc', views: 3840 },
  'khach-san-gan-ho-guom': { category: 'di-choi', categoryName: 'Địa điểm đi chơi', date: '25/08/2026', readTime: '7 phút đọc', views: 4920 },
};

const articleSlugs = Object.keys(categoryMap);

const articles = [];

for (const slug of articleSlugs) {
  const filePath = path.join(scrapedDir, `${slug}.html`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);

  // Title
  const title = $('h1').text().trim() || $('title').text().trim().replace(/ - Mix Boutique Hotel.*/i, '');

  // Excerpt / Sapo
  let excerpt = $('.size-1, .sapo, .lead').first().text().trim();
  if (!excerpt) {
    excerpt = $('meta[name="description"]').attr('content') || '';
  }

  // Thumbnail
  let thumbExt = fs.existsSync(path.resolve(`public/images/articles/${slug}-thumb.webp`)) ? '.webp' : '.jpg';
  const thumbnail = `/images/articles/${slug}-thumb${thumbExt}`;

  // Table of Contents
  const tableOfContents = [];
  $('.mucLucPart a').each((_, el) => {
    const rawHref = $(el).attr('href') || '';
    const id = rawHref.replace(/^#/, '');
    const tocText = $(el).text().trim();
    const isSub = rawHref.match(/#\d+-\d+/);
    if (id && tocText) {
      tableOfContents.push({
        id,
        title: tocText,
        level: isSub ? 3 : 2,
      });
    }
  });

  // Process data_contents
  const contentEl = $('.data_contents');

  // Remove any unwanted scripts, iframes, tracking or hidden forms
  contentEl.find('script, iframe, style, noscript, .social-share-buttons').remove();

  // Replace images
  contentEl.find('img').each((_, el) => {
    const rawSrc = $(el).attr('src') || '';
    let mapped = imageMap[rawSrc];
    if (!mapped && rawSrc.startsWith('https://mixhotel.vn')) {
      const rel = rawSrc.replace('https://mixhotel.vn', '');
      mapped = imageMap[rel];
    }
    if (mapped) {
      $(el).attr('src', mapped);
    }
    // Clean inline dimensions that distort aspect ratio
    $(el).removeAttr('width');
    $(el).removeAttr('height');
    $(el).removeAttr('loading');
    $(el).addClass('rounded-xl w-full h-auto object-cover my-6 shadow-md border border-white/5');
  });

  // Fix internal links
  contentEl.find('a').each((_, el) => {
    let href = $(el).attr('href') || '';
    for (const otherSlug of articleSlugs) {
      if (href.includes(`mixhotel.vn/${otherSlug}`) || href === `/${otherSlug}` || href === `/${otherSlug}/`) {
        href = `/tin-tuc/${otherSlug}`;
      }
    }
    if (href.includes('mixhotel.vn/khach-san-tinh-yeu')) {
      href = '/khach-san-tinh-yeu';
    } else if (href === 'https://mixhotel.vn' || href === 'https://mixhotel.vn/') {
      href = '/';
    }
    $(el).attr('href', href);
    $(el).addClass('text-[#c88922] hover:text-[#e0a43d] underline decoration-[#c88922]/50 hover:decoration-[#e0a43d] transition-colors');
  });

  // Ensure headings have proper IDs and classes
  contentEl.find('h2').each((_, el) => {
    const id = $(el).attr('id');
    $(el).addClass('text-2xl md:text-3xl font-bold text-[#fff8ec] mt-10 mb-4 tracking-tight scroll-mt-28');
  });
  contentEl.find('h3').each((_, el) => {
    const id = $(el).attr('id');
    $(el).addClass('text-xl md:text-2xl font-semibold text-[#f5ebd7] mt-8 mb-3 scroll-mt-28');
  });
  contentEl.find('p').each((_, el) => {
    $(el).addClass('text-[#f5ebd7]/90 text-base md:text-lg leading-relaxed mb-4');
  });
  contentEl.find('ul, ol').each((_, el) => {
    $(el).addClass('text-[#f5ebd7]/90 text-base md:text-lg space-y-2 mb-6 ml-6 list-disc');
  });
  contentEl.find('li').each((_, el) => {
    $(el).addClass('leading-relaxed');
  });
  contentEl.find('blockquote').each((_, el) => {
    $(el).addClass('border-l-4 border-[#c88922] bg-[#16120c] p-4 my-6 rounded-r-lg italic text-[#fff8ec]/90');
  });

  // Style tables for dark mode
  contentEl.find('table').each((_, el) => {
    $(el).addClass('w-full border-collapse my-6 text-sm md:text-base');
    $(el).find('th').addClass('bg-[#241c13] text-[#c88922] p-3 text-left font-semibold border border-white/10');
    $(el).find('td').addClass('p-3 border border-white/10 text-[#f5ebd7]/85 bg-[#120e0a]');
    // Wrap table in responsive scroll container
    $(el).wrap('<div class="overflow-x-auto rounded-xl border border-white/10 my-6"></div>');
  });

  // Clean inline styles that force black text or white backgrounds
  contentEl.find('*').each((_, el) => {
    const style = $(el).attr('style');
    if (style) {
      const cleanedStyle = style
        .replace(/color:\s*(#000|#000000|black|rgb\(0,\s*0,\s*0\));?/gi, '')
        .replace(/background(-color)?:\s*(#fff|#ffffff|white|rgb\(255,\s*255,\s*255\));?/gi, '')
        .replace(/font-family:[^;]+;?/gi, '');
      if (cleanedStyle.trim()) {
        $(el).attr('style', cleanedStyle);
      } else {
        $(el).removeAttr('style');
      }
    }
  });

  const contentHtml = contentEl.html() || '';

  // Related slugs: pick 3 others
  const relatedSlugs = articleSlugs.filter(s => s !== slug).slice(0, 3);

  const meta = categoryMap[slug];

  articles.push({
    slug,
    title,
    excerpt,
    category: meta.category,
    categoryName: meta.categoryName,
    publishedAt: meta.date,
    readTime: meta.readTime,
    views: meta.views,
    author: 'Mix Boutique Hotel',
    thumbnail,
    tableOfContents,
    contentHtml,
    relatedSlugs,
  });
}

// Generate TypeScript code
const tsCode = `export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryName: string;
  publishedAt: string;
  readTime: string;
  views: number;
  author: string;
  thumbnail: string;
  tableOfContents: TocItem[];
  contentHtml: string;
  relatedSlugs: string[];
}

export const ARTICLES_DATA: Article[] = ${JSON.stringify(articles, null, 2)};

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES_DATA.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES_DATA.map((a) => a.slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return ARTICLES_DATA.slice(0, limit);
  
  const related = ARTICLES_DATA.filter((a) => a.slug !== slug && a.category === current.category);
  if (related.length >= limit) return related.slice(0, limit);
  
  const others = ARTICLES_DATA.filter((a) => a.slug !== slug && !related.includes(a));
  return [...related, ...others].slice(0, limit);
}
`;

fs.writeFileSync(path.resolve('src/data/articlesData.ts'), tsCode, 'utf8');
console.log(`Generated src/data/articlesData.ts successfully with ${articles.length} articles!`);
