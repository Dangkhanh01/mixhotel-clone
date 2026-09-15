import fs from 'fs';

const html = fs.readFileSync('scratch/content_frame_cleaned.html', 'utf8');
const toc = JSON.parse(fs.readFileSync('scratch/content_frame_toc.json', 'utf8'));

const tsContent = `export interface TocItem {
  title: string;
  href: string;
  isSub: boolean;
}

export const KHACH_SAN_TINH_YEU_TOC: TocItem[] = ${JSON.stringify(toc, null, 2)};

export const KHACH_SAN_TINH_YEU_CONTENT_HTML = ${JSON.stringify(html)};
`;

fs.writeFileSync('src/data/khachSanTinhYeuArticle.ts', tsContent, 'utf8');
console.log('Successfully generated src/data/khachSanTinhYeuArticle.ts');
