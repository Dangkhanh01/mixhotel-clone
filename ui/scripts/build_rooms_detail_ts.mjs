import fs from 'fs';
import * as cheerio from 'cheerio';

const allRooms = JSON.parse(fs.readFileSync('scratch/all_rooms_detail.json', 'utf8'));

// Branch info
const BRANCH_INFO = {
  premium: {
    id: 'branch-mix-boutique-premium-hotel',
    name: 'Mix Boutique Premium',
    address: 'Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội',
    phone: '0383 104 010',
    zalo: 'https://zalo.me/0383104010',
    slugs: ['bad-girl', 'inferno', 'master-n-slave', 'galaxy', 'eden', 'lolita', 'karma', '303-scarlet', 'katana', 'amora', 'cloud-nine']
  },
  dangTienDong: {
    id: 'branch-mix-boutique-hotel-256b-dang-tien-dong',
    name: 'Mix Boutique Hotel 256B Đặng Tiến Đông',
    address: '256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội',
    phone: '0383 104 010',
    zalo: 'https://zalo.me/0383104010',
    slugs: ['hidden-frenzy', 'after-sunset', 'lollipop', 'blowj-up', 'lalaland', 'bad-boy', 'oasis', 'kissing', 'lover', 'on-top']
  },
  phucLa: {
    id: 'branch-mix-boutique-hotel-20-phuc-la-ha-dong',
    name: 'Mix Boutique Hotel 20 Phúc La Hà Đông',
    address: '20, P. Phúc La, Hà Đông, Hà Nội',
    phone: '0383 104 010',
    zalo: 'https://zalo.me/0383104010',
    slugs: ['naive', 'confession', 'hollywood', 'honeymoon', 'flame', 'passion', 'whisper', 'wake-up', 'rhett-butler', 'get-high', 'the-lust']
  }
};

function getBranchForSlug(slug) {
  for (const b of Object.values(BRANCH_INFO)) {
    if (b.slugs.includes(slug)) return b;
  }
  return BRANCH_INFO.premium;
}

const ROOM_PRICING = {
  Superior: { hourly: '199.000 VND/2h', extraHour: '60.000 VND/h', overnight: '500.000 VND', fullDay: '800.000 VND' },
  Deluxe: { hourly: '300.000 VND/2h', extraHour: '70.000 VND/h', overnight: '600.000 VND', fullDay: '950.000 VND' },
  VIP: { hourly: '400.000 VND/2h', extraHour: '80.000 VND/h', overnight: '750.000 VND', fullDay: '1.200.000 VND' }
};

const VIP_SLUGS = ['cloud-nine', 'inferno', 'eden', '303-scarlet', 'katana', 'lover', 'on-top', 'rhett-butler', 'get-high', 'the-lust'];
const SUPERIOR_SLUGS = ['karma', 'galaxy', 'hidden-frenzy', 'after-sunset', 'lollipop', 'blowj-up', 'lalaland', 'bad-boy', 'naive', 'confession', 'hollywood'];

const detailedRooms = {};

for (const [slug, data] of Object.entries(allRooms)) {
  const branch = getBranchForSlug(slug);
  let roomType = 'Deluxe';
  if (VIP_SLUGS.includes(slug)) roomType = 'VIP';
  if (SUPERIOR_SLUGS.includes(slug)) roomType = 'Superior';

  const pricing = ROOM_PRICING[roomType];

  // Clean title
  let cleanTitle = data.title.split('\n')[0].trim().replace(/\s+/g, ' ');
  if (!cleanTitle.includes('Room') && !cleanTitle.includes('Phòng')) {
    cleanTitle = `${roomType === 'VIP' ? 'VIP ' : ''}Room - ${cleanTitle}`;
  }

  // Clean subtitle & description
  let subtitle = data.heroSubtitle || data.conceptText || 'Không gian riêng tư, lãng mạn và tinh tế dành riêng cho hai người tại Mix Boutique Hotel.';
  if (subtitle.length > 250) {
    subtitle = subtitle.substring(0, 247) + '...';
  }

  // Ensure hero image exists locally
  let heroImage = data.heroImg;
  if (!heroImage || !fs.existsSync(`public${heroImage}`)) {
    // fallback to first gallery image
    heroImage = data.galleryImages?.find(img => fs.existsSync(`public${img}`)) || '/tassets/images/banner-home.jpg';
  }

  // Clean gallery images (only existing files)
  let galleryImages = (data.galleryImages || []).filter(img => {
    return img && (fs.existsSync(`public${img}`) || img.startsWith('/'));
  });
  if (galleryImages.length === 0 && heroImage) {
    galleryImages = [heroImage];
  }

  // Default perks
  const perks = [
    { title: 'Bồn tắm sục Jacuzzi đôi', desc: 'Không gian thư giãn đẳng cấp với bồn tắm sục lãng mạn, nước nóng ấm áp, bọt xà phòng hoa hồng.' },
    { title: 'Ghế tình yêu Tantra cao cấp', desc: 'Đường cong công thái học chuẩn chỉn chu, mang đến cảm xúc thăng hoa bất tận cho cặp đôi.' },
    { title: 'Máy chiếu phim Full HD / 4K', desc: 'Màn chiếu siêu rộng xem Netflix, YouTube, chill cùng bộ phim lãng mạn yêu thích.' },
    { title: 'Ánh sáng nghệ thuật Mood Light', desc: 'Hệ thống đèn neon, trần ngàn sao và tone màu đa sắc tạo nên không khí quyến rũ độc bản.' },
    { title: 'Miễn phí Cosplay & Đạo cụ', desc: 'Mượn trang phục hoá trang quyến rũ, đồ chơi tình yêu và Board Game gắn kết miễn phí.' },
    { title: 'Bảo mật thông tin 100%', desc: 'Thủ tục check-in kín đáo, nhận phòng riêng tư, bảo vệ thông tin khách hàng tuyệt đối.' }
  ];

  // Default FAQs
  const faqs = [
    {
      question: `Phòng ${cleanTitle} có sẵn bồn tắm và máy chiếu không?`,
      answer: `Phòng được trang bị đầy đủ tiện nghi cao cấp theo concept riêng, bao gồm bồn tắm thư giãn, ghế tình yêu Tantra, máy chiếu/Smart TV sắc nét và hệ thống đèn lãng mạn.`
    },
    {
      question: 'Tôi có cần đặt cọc trước khi đến nhận phòng không?',
      answer: 'Nếu bạn đến trong vòng 15-20 phút, Mix Hotel sẽ giữ phòng miễn phí không cần cọc. Nếu bạn đặt trước nhiều giờ hoặc qua đêm, vui lòng cọc trước để đảm bảo phòng được giữ 100%.'
    },
    {
      question: 'Mix Boutique Hotel có hỗ trợ trang trí tiệc kỷ niệm, sinh nhật không?',
      answer: 'Có! Mix Hotel có 4 gói decor chuyên nghiệp gồm nến, hoa hồng, bong bóng, bánh kem và rượu vang ngoại nhập. Hãy báo trước ít nhất 2-4 tiếng để nhân viên setup hoàn hảo nhất.'
    },
    {
      question: 'Khách sạn có cho mượn đồ Cosplay và Board Game tình yêu không?',
      answer: 'Mix Hotel hoàn toàn miễn phí mượn trang phục Cosplay quyến rũ, phụ kiện BDSM tinh tế và bộ Board Game thử thách tình yêu cho tất cả khách hàng lưu trú.'
    }
  ];

  detailedRooms[slug] = {
    slug,
    name: cleanTitle,
    roomType,
    badge: `${roomType} Suite`,
    branchId: branch.id,
    branchName: branch.name,
    branchAddress: branch.address,
    branchPhone: branch.phone,
    branchZalo: branch.zalo,
    heroImage,
    heroSubtitle: subtitle,
    youtubeUrl: data.youtubeIframe || '',
    galleryImages: galleryImages.slice(0, 12),
    pricing,
    conceptTitle: `Concept Độc Bản: ${cleanTitle}`,
    conceptDesc: data.conceptText || subtitle,
    perks,
    faqs,
    storyHtml: data.contentHtml || `<p>Chào mừng bạn đến với <strong>${cleanTitle}</strong> tại ${branch.name}. Nơi mang đến trải nghiệm lãng mạn, kín đáo và khó quên nhất cho tình yêu của bạn.</p>`
  };
}

const outputTs = `export interface RoomDetail {
  slug: string;
  name: string;
  roomType: string;
  badge: string;
  branchId: string;
  branchName: string;
  branchAddress: string;
  branchPhone: string;
  branchZalo: string;
  heroImage: string;
  heroSubtitle: string;
  youtubeUrl: string;
  galleryImages: string[];
  pricing: {
    hourly: string;
    extraHour: string;
    overnight: string;
    fullDay: string;
  };
  conceptTitle: string;
  conceptDesc: string;
  perks: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  storyHtml: string;
}

export const ROOMS_DETAIL_DATA: Record<string, RoomDetail> = ${JSON.stringify(detailedRooms, null, 2)};
`;

fs.writeFileSync('src/data/roomsDetailData.ts', outputTs);
console.log(`Generated src/data/roomsDetailData.ts with ${Object.keys(detailedRooms).length} rooms!`);
