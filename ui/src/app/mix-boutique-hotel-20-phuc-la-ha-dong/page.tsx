import React from "react";
import { Metadata } from "next";
import BranchDetailTemplate, { BranchConfig } from "@/components/branch/BranchDetailTemplate";
import { BRANCHES_DATA } from "@/data/branchesData";

export const metadata: Metadata = {
  title: "Mix Boutique Hotel 20 Phúc La Hà Đông | Khách Sạn Tình Yêu Hà Đông",
  description: "Cơ sở Mix Boutique Hotel 20 Phúc La, Hà Đông với 11 phòng concept độc đáo, bồn tắm đôi, ghế Tantra, máy chiếu Full HD, kín đáo và tiện nghi.",
};

const branch3Data = BRANCHES_DATA[2];

const branch3Config: BranchConfig = {
  slug: "mix-boutique-hotel-20-phuc-la-ha-dong",
  name: branch3Data.name,
  badge: "Mix Phúc La Hà Đông",
  area: "Phúc La, Hà Đông",
  address: branch3Data.address,
  phone: "0383 104 010",
  zalo: "https://zalo.me/0383104010",
  heroImage: branch3Data.image,
  heroDesc: "Không gian hẹn hò lãng mạn, hiện đại bậc nhất khu vực Hà Đông - Thanh Xuân. Nổi bật với các phòng concept điện ảnh và nghệ thuật như Hollywood, Honeymoon, Flame, The Lust và Get High.",
  rooms: branch3Data.rooms,
  pricing: {
    superior: { hourly: "199.000 VND", extraHour: "60.000 VND", overnight: "500.000 VND", fullDay: "800.000 VND" },
    deluxe: { hourly: "300.000 VND", extraHour: "70.000 VND", overnight: "600.000 VND", fullDay: "950.000 VND" },
    vip: { hourly: "400.000 VND", extraHour: "80.000 VND", overnight: "750.000 VND", fullDay: "1.200.000 VND" },
  },
  introHtml: `
    <p>
      <strong>Mix Boutique Hotel 20 Phúc La Hà Đông</strong> là thiên đường hẹn hò dành cho các cặp đôi khu vực phía Tây Nam Hà Nội. Sở hữu vị trí đắc địa, mặt ngõ rộng rãi, yên tĩnh và cực kỳ kín đáo.
    </p>
    <p>
      Cơ sở được thiết kế hiện đại với 11 phòng concept đỉnh cao lấy cảm hứng từ các tác phẩm nghệ thuật và điện ảnh kinh điển: <em>Hollywood</em> hào nhoáng, <em>Flame</em> rực lửa đam mê, <em>Honeymoon</em> ngọt ngào như tuần trăng mật, và <em>The Lust</em> quyến rũ bất tận.
    </p>
    <p>
      Phòng nghỉ được trang bị bồn tắm sục đôi, máy chiếu màn lớn, ghế Tantra, dịch vụ cho mượn cosplay, boardgame miễn phí và hỗ trợ trang trí tiệc kỷ niệm chu đáo.
    </p>
  `,
  faqs: [
    {
      question: "Cơ sở Phúc La Hà Đông có bãi đỗ xe ô tô không?",
      answer: "Có! Cơ sở có chỗ đỗ ô tô và xe máy rộng rãi, kín đáo, có camera giám sát và nhân viên túc trực 24/24.",
    },
    {
      question: "Giá phòng tại Mix Phúc La có phụ thu vào ngày lễ hoặc cuối tuần không?",
      answer: "Mix Boutique Hotel luôn công khai bảng giá rõ ràng và minh bạch. Vào các dịp lễ đặc biệt, bạn nên liên hệ trước qua Zalo để được tư vấn chính sách giá chuẩn xác.",
    },
    {
      question: "Tôi có thể yêu cầu chuẩn bị bồn tắm tạo bọt sẵn trước khi nhận phòng không?",
      answer: "Có! Bạn chỉ cần ghi chú hoặc nhắn tin trước qua Zalo khoảng 15 phút, nhân viên sẽ xả nước nóng và tạo bọt bồn tắm sẵn sàng đón bạn.",
    },
  ],
};

export default function MixBoutiquePhucLaPage() {
  return <BranchDetailTemplate branch={branch3Config} />;
}
