import React from "react";
import { Metadata } from "next";
import BranchDetailTemplate, { BranchConfig } from "@/components/branch/BranchDetailTemplate";
import { BRANCHES_DATA } from "@/data/branchesData";

export const metadata: Metadata = {
  title: "Mix Boutique Hotel 256B Đặng Tiến Đông | Khách Sạn Tình Yêu Đống Đa",
  description: "Cơ sở Mix Boutique Hotel 256B Đặng Tiến Đông, quận Đống Đa với 10 phòng concept lãng mạn, ghế tình yêu Tantra, bồn tắm đôi, riêng tư 100%.",
};

const branch2Data = BRANCHES_DATA[1];

const branch2Config: BranchConfig = {
  slug: "mix-boutique-hotel-256b-dang-tien-dong",
  name: branch2Data.name,
  badge: "Mix Đặng Tiến Đông",
  area: "Chợ Dừa, Đống Đa",
  address: branch2Data.address,
  phone: "0383 104 010",
  zalo: "https://zalo.me/0383104010",
  heroImage: branch2Data.image,
  heroDesc: "Tọa lạc tại trung tâm quận Đống Đa, gần hồ Hoàng Cầu thơ mộng. Điểm hẹn hò quen thuộc của giới trẻ Hà Thành với các concept ấn tượng như Lalaland, Blowj Up, Lollipop, Lover và On Top.",
  rooms: branch2Data.rooms,
  pricing: {
    superior: { hourly: "199.000 VND", extraHour: "60.000 VND", overnight: "500.000 VND", fullDay: "800.000 VND" },
    deluxe: { hourly: "300.000 VND", extraHour: "70.000 VND", overnight: "600.000 VND", fullDay: "950.000 VND" },
    vip: { hourly: "400.000 VND", extraHour: "80.000 VND", overnight: "750.000 VND", fullDay: "1.200.000 VND" },
  },
  introHtml: `
    <p>
      <strong>Mix Boutique Hotel 256B Đặng Tiến Đông</strong> là một trong những điểm dừng chân lý tưởng và lãng mạn nhất tại quận Đống Đa. Nằm ngay sát hồ Hoàng Cầu, cơ sở mang đến bầu không khí thoáng đãng, lãng mạn và vô cùng kín đáo.
    </p>
    <p>
      Với 10 phòng concept mang nhiều sắc thái cảm xúc: từ ngọt ngào như <em>Lollipop</em>, thơ mộng như <em>Lalaland</em>, đến nồng nhiệt và thăng hoa tại <em>Lover</em> hay <em>On Top</em>. Tất cả các phòng đều được chăm chút kỹ lưỡng về vệ sinh, mùi hương và tiện nghi cao cấp.
    </p>
    <p>
      Khách sạn phục vụ 24/7, có bãi đỗ xe an toàn, thủ tục nhận phòng kín đáo chỉ trong 1 phút và bảo mật thông tin tuyệt đối.
    </p>
  `,
  faqs: [
    {
      question: "Cơ sở Đặng Tiến Đông có gần ga tàu điện Cát Linh - Hà Đông không?",
      answer: "Rất gần! Cơ sở chỉ cách ga Hoàng Cầu khoảng 300m, cực kỳ tiện lợi cho các bạn di chuyển bằng tàu điện hoặc xe máy.",
    },
    {
      question: "Khách sạn có dịch vụ trang trí sinh nhật hoặc kỷ niệm tại phòng không?",
      answer: "Có! Cơ sở nhận setup nến, hoa hồng, bóng bay và bánh kem theo yêu cầu. Bạn chỉ cần liên hệ trước 2-4 tiếng qua Zalo.",
    },
    {
      question: "Thời gian nhận phòng qua đêm tại 256B Đặng Tiến Đông bắt đầu từ mấy giờ?",
      answer: "Khung giờ qua đêm áp dụng từ 21:00 tối đến 12:00 trưa hôm sau.",
    },
  ],
};

export default function MixBoutiqueDangTienDongPage() {
  return <BranchDetailTemplate branch={branch2Config} />;
}
