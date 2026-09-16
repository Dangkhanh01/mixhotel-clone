import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/review-khach-san-tinh-yeu", destination: "/tin-tuc?cat=review" },
      { source: "/review-khach-san-tinh-yeu/", destination: "/tin-tuc?cat=review" },
      { source: "/dia-diem-hen-ho-danh-cho-cap-doi", destination: "/tin-tuc?cat=hen-ho" },
      { source: "/dia-diem-hen-ho-danh-cho-cap-doi/", destination: "/tin-tuc?cat=hen-ho" },
      { source: "/dia-diem-di-choi-cho-cap-doi", destination: "/tin-tuc?cat=di-choi" },
      { source: "/dia-diem-di-choi-cho-cap-doi/", destination: "/tin-tuc?cat=di-choi" },
      { source: "/goi-y-qua-tang-cac-diep-le", destination: "/tin-tuc?cat=qua-tang" },
      { source: "/goi-y-qua-tang-cac-diep-le/", destination: "/tin-tuc?cat=qua-tang" },
      { source: "/kien-thuc-ve-khach-san", destination: "/tin-tuc?cat=kien-thuc" },
      { source: "/kien-thuc-ve-khach-san/", destination: "/tin-tuc?cat=kien-thuc" },
      { source: "/cam-nang-tinh-yeu", destination: "/tin-tuc?cat=cam-nang" },
      { source: "/cam-nang-tinh-yeu/", destination: "/tin-tuc?cat=cam-nang" },
      { source: "/cac-dia-chi-khach-san-tinh-yeu", destination: "/tin-tuc?cat=dia-chi" },
      { source: "/cac-dia-chi-khach-san-tinh-yeu/", destination: "/tin-tuc?cat=dia-chi" },
      { source: "/khach-san-vintage", destination: "/tin-tuc/khach-san-vintage" },
      { source: "/khach-san-vintage/", destination: "/tin-tuc/khach-san-vintage" },
      { source: "/khach-san-phong-cach-tropical", destination: "/tin-tuc/khach-san-phong-cach-tropical" },
      { source: "/khach-san-phong-cach-tropical/", destination: "/tin-tuc/khach-san-phong-cach-tropical" },
      { source: "/khach-san-phong-cach-indochine", destination: "/tin-tuc/khach-san-phong-cach-indochine" },
      { source: "/khach-san-phong-cach-indochine/", destination: "/tin-tuc/khach-san-phong-cach-indochine" },
      { source: "/khach-san-gan-lang-bac", destination: "/tin-tuc/khach-san-gan-lang-bac" },
      { source: "/khach-san-gan-lang-bac/", destination: "/tin-tuc/khach-san-gan-lang-bac" },
      { source: "/so-sanh-khach-san", destination: "/tin-tuc/so-sanh-khach-san" },
      { source: "/so-sanh-khach-san/", destination: "/tin-tuc/so-sanh-khach-san" },
      { source: "/bang-noi-quy-khach-san", destination: "/tin-tuc/bang-noi-quy-khach-san" },
      { source: "/bang-noi-quy-khach-san/", destination: "/tin-tuc/bang-noi-quy-khach-san" },
      { source: "/khach-san-gan-pho-co", destination: "/tin-tuc/khach-san-gan-pho-co" },
      { source: "/khach-san-gan-pho-co/", destination: "/tin-tuc/khach-san-gan-pho-co" },
      { source: "/khach-san-gan-ho-guom", destination: "/tin-tuc/khach-san-gan-ho-guom" },
      { source: "/khach-san-gan-ho-guom/", destination: "/tin-tuc/khach-san-gan-ho-guom" },
    ];
  },
};

export default nextConfig;
