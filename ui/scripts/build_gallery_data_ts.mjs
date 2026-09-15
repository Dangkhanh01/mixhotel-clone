import fs from 'fs';

const rawGallery = JSON.parse(fs.readFileSync('scratch/all_gallery_data.json', 'utf8'));
const allRooms = JSON.parse(fs.readFileSync('scratch/all_rooms_detail.json', 'utf8'));

// Build list of all 32 items with clean titles, branches, and verified local images
const branchMapping = {
  // Branch 1: Premium
  'cloud-nine': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'VIP Suite' },
  'karma': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'Superior' },
  'galaxy': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'Superior' },
  'bad-girl': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'Deluxe' },
  'inferno': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'VIP Suite' },
  'master-n-slave': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'Deluxe' },
  'eden': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'VIP Suite' },
  'lolita': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'Deluxe' },
  '303-scarlet': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'VIP Suite' },
  'katana': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'VIP Suite' },
  'amora': { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'Deluxe' },

  // Branch 2: Dang Tien Dong
  'hidden-frenzy': { branchId: 'dang-tien-dong', branchName: '256B Đặng Tiến Đông', badge: 'Superior' },
  'after-sunset': { branchId: 'dang-tien-dong', branchName: '256B Đặng Tiến Đông', badge: 'Superior' },
  'lollipop': { branchId: 'dang-tien-dong', branchName: '256B Đặng Tiến Đông', badge: 'Superior' },
  'blowj-up': { branchId: 'dang-tien-dong', branchName: '256B Đặng Tiến Đông', badge: 'Superior' },
  'lalaland': { branchId: 'dang-tien-dong', branchName: '256B Đặng Tiến Đông', badge: 'Superior' },
  'bad-boy': { branchId: 'dang-tien-dong', branchName: '256B Đặng Tiến Đông', badge: 'Superior' },
  'oasis': { branchId: 'dang-tien-dong', branchName: '256B Đặng Tiến Đông', badge: 'Deluxe' },
  'kissing': { branchId: 'dang-tien-dong', branchName: '256B Đặng Tiến Đông', badge: 'Deluxe' },
  'lover': { branchId: 'dang-tien-dong', branchName: '256B Đặng Tiến Đông', badge: 'VIP Suite' },
  'on-top': { branchId: 'dang-tien-dong', branchName: '256B Đặng Tiến Đông', badge: 'VIP Suite' },

  // Branch 3: Phuc La
  'naive': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'Superior' },
  'confession': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'Superior' },
  'hollywood': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'Superior' },
  'honeymoon': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'Deluxe' },
  'flame': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'Deluxe' },
  'passion': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'Deluxe' },
  'whisper': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'Deluxe' },
  'wake-up': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'Deluxe' },
  'rhett-butler': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'VIP Suite' },
  'get-high': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'VIP Suite' },
  'the-lust': { branchId: 'phuc-la', branchName: '20 Phúc La Hà Đông', badge: 'VIP Suite' }
};

const allRawItems = [...rawGallery.page1, ...rawGallery.page2, ...rawGallery.page3];
const uniqueItems = [];
const seenSlugs = new Set();

for (const it of allRawItems) {
  const match = it.link.match(/\/khach-san-tinh-yeu\/([^\/]+)\/?/);
  const slug = match ? match[1] : '';
  if (!slug || seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);

  // Clean title
  let cleanTitle = it.title.split('\n')[0].trim();
  cleanTitle = cleanTitle.replace(/\s+/g, ' ');

  const meta = branchMapping[slug] || { branchId: 'premium', branchName: '186 Hoàng Ngân', badge: 'Deluxe' };

  uniqueItems.push({
    id: slug,
    slug,
    title: cleanTitle,
    link: `/khach-san-tinh-yeu/${slug}/`,
    image: it.image,
    branchId: meta.branchId,
    branchName: meta.branchName,
    badge: meta.badge
  });
}

// Check if any room from branchMapping is missing, add it
for (const [slug, meta] of Object.entries(branchMapping)) {
  if (!seenSlugs.has(slug)) {
    const roomInfo = allRooms[slug];
    const img = roomInfo?.heroImg || roomInfo?.galleryImages?.[0] || '';
    uniqueItems.push({
      id: slug,
      slug,
      title: roomInfo?.title || slug,
      link: `/khach-san-tinh-yeu/${slug}/`,
      image: img,
      branchId: meta.branchId,
      branchName: meta.branchName,
      badge: meta.badge
    });
  }
}

const tsContent = `export interface GalleryItem {
  id: string;
  slug: string;
  title: string;
  link: string;
  image: string;
  branchId: string;
  branchName: string;
  badge: string;
}

export const GALLERY_ITEMS: GalleryItem[] = ${JSON.stringify(uniqueItems, null, 2)};

export const GALLERY_BRANCH_TABS = [
  { id: "all", name: "Tất cả cơ sở", label: "Tất Cả", url: "/gallery" },
  { id: "premium", name: "Gallery Mix Boutique Hotel 186 Hoàng Ngân", label: "186 Hoàng Ngân", url: "/gallery-mix-boutique-hotel-186-hoang-ngan/" },
  { id: "dang-tien-dong", name: "Gallery Mix Boutique Hotel 256B Đặng Tiến Đông", label: "256B Đặng Tiến Đông", url: "/gallery-mix-boutique-hotel-256b-dang-tien-dong/" },
  { id: "phuc-la", name: "Gallery Mix Boutique Hotel 20 Phúc La Hà Đông", label: "20 Phúc La Hà Đông", url: "/gallery-mix-boutique-hotel-20-phuc-la-ha-dong/" }
];
`;

fs.writeFileSync('src/data/galleryData.ts', tsContent);
console.log(`Generated src/data/galleryData.ts with ${uniqueItems.length} gallery items!`);
