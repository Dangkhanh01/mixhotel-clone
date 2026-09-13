# Mix Hotel — Frontend UI (Next.js Prototype)

Thư mục này chứa mã nguồn giao diện clone hoàn chỉnh của Mix Hotel, được xây dựng bằng Next.js (App Router), Tailwind CSS và TypeScript. Thư mục này phục vụ như tài liệu tham chiếu trực quan và prototype tính năng cho việc phát triển WordPress Block Theme & Custom Plugin.

## 🚀 Khởi chạy Local Development

```bash
# Cài đặt dependencies (nếu chưa có)
npm install

# Khởi chạy dev server (port 3000)
npm run dev
```

Truy cập: `http://localhost:3000`

## 📁 Cấu trúc Thư mục

- `src/app/`: App router, layout, và trang chủ (`page.tsx`)
- `src/components/`:
  - `navigation/`: Header desktop và mobile (drawer menu, hotline, đặt phòng)
  - `sections/`: Toàn bộ các sections (Hero, Concept Rooms, Branches, Price List, Real Photos, Video, Booking Steps, FAQ, Events, Final CTA, Footer)
  - `floating/`: Thanh liên hệ desktop & mobile bar cố định dưới màn hình, modal popup liên hệ
- `src/types/`: Type definitions (`mixhotel.ts`) cho phòng, chi nhánh, bảng giá
- `public/images/`: Toàn bộ hình ảnh, banner, icon SVG/WebP thực tế từ mixhotel.vn
- `docs/research/mixhotel-vn/`: Tài liệu đặc tả design tokens, hành vi tương tác và topology trang
