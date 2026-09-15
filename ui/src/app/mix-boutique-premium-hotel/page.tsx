import React from "react";
import { Metadata } from "next";
import BranchDetailTemplate, { BranchConfig } from "@/components/branch/BranchDetailTemplate";
import { BRANCHES_DATA } from "@/data/branchesData";

export const metadata: Metadata = {
  title: "Mix Boutique Premium | Khách Sạn Tình Yêu Hà Nội",
  description: "Cơ sở Mix Boutique Premium tại Huỳnh Thúc Kháng / Hoàng Ngân với 11 phòng concept độc bản, bồn tắm sục đôi, máy chiếu phim sắc nét, riêng tư 100%.",
};

const branch1Data = BRANCHES_DATA[0];

const branch1Config: BranchConfig = {
  slug: "mix-boutique-premium-hotel",
  name: branch1Data.name,
  badge: "Mix Boutique Premium",
  area: "Huỳnh Thúc Kháng / Hoàng Ngân",
  address: branch1Data.address,
  phone: "0383 104 010",
  zalo: "https://zalo.me/0383104010",
  heroImage: branch1Data.image,
  heroDesc: "Không gian lãng mạn, kín đáo bậc nhất quận Ba Đình / Đống Đa. Sở hữu các phòng concept đình đám như VIP Room 469 Cloud Nine, VIP Room 102 Inferno, Master 'n' Slave và Eden.",
  rooms: branch1Data.rooms,
  pricing: {
    superior: { hourly: "199.000 VND", extraHour: "60.000 VND", overnight: "500.000 VND", fullDay: "800.000 VND" },
    deluxe: { hourly: "300.000 VND", extraHour: "70.000 VND", overnight: "600.000 VND", fullDay: "950.000 VND" },
    vip: { hourly: "400.000 VND", extraHour: "80.000 VND", overnight: "750.000 VND", fullDay: "1.200.000 VND" },
  },
  introHtml: `
    <p>
      <strong>Mix Boutique Premium</strong> là cơ sở cao cấp bậc nhất trong hệ thống khách sạn tình yêu Mix Hotel tại Hà Nội. Tọa lạc tại vị trí trung tâm, kín đáo, thuận tiện di chuyển nhưng vẫn đảm bảo sự yên tĩnh tuyệt đối cho các cặp đôi.
    </p>
    <p>
      Tại đây, mỗi căn phòng là một tác phẩm nghệ thuật kiến trúc độc bản được trau chuốt tỉ mỉ từ ánh sáng, bồn tắm sục đôi Jacuzzi ngập tràn bọt tuyết, ghế tình yêu Tantra cao cấp, đến màn chiếu phim Full HD / 4K giải trí đỉnh cao.
    </p>
    <p>
      Khách sạn cam kết bảo mật danh tính khách hàng 100%, thủ tục nhận phòng nhanh gọn và dịch vụ mượn đồ Cosplay, đạo cụ BDSM, Board Game tình yêu hoàn toàn miễn phí.
    </p>
  `,
  faqs: [
    {
      question: "Mix Boutique Premium có chỗ đỗ ô tô kín đáo không?",
      answer: "Có! Cơ sở có bãi đỗ xe ô tô và xe máy kín đáo, an toàn, có nhân viên hỗ trợ che biển số và chỉ dẫn chu đáo.",
    },
    {
      question: "Tôi có thể mượn trang phục Cosplay và Board Game tại cơ sở này không?",
      answer: "Hoàn toàn miễn phí! Mix Boutique Premium có sẵn hơn 20 bộ cosplay và bộ bài tình yêu để bạn và người thương thoải mái đổi gió.",
    },
    {
      question: "Chính sách đặt cọc giữ phòng tại Mix Boutique Premium như thế nào?",
      answer: "Mix Hotel hỗ trợ giữ phòng 15-20 phút không cần cọc khi bạn đang trên đường tới. Nếu đặt phòng trước nhiều giờ hoặc đặt qua đêm, bạn vui lòng cọc trước để được giữ phòng chính xác 100%.",
    },
  ],
};

export default function MixBoutiquePremiumPage() {
  return <BranchDetailTemplate branch={branch1Config} />;
}
