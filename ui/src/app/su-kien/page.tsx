"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, CheckCircle2, Phone, Calendar, Wine, Gift } from "lucide-react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileBottomNav from "@/components/floating/MobileBottomNav";
import ContactModal from "@/components/ui/ContactModal";
import FooterSection from "@/components/sections/FooterSection";

export default function SuKienPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const packages = [
    {
      id: 1,
      name: "GÓI CẦU HÔN VĨNH CỬU (MARRY ME)",
      price: "1.990.000đ",
      badge: "Đặc biệt nhất",
      popular: true,
      features: [
        "Chữ đèn LED neon 'MARRY ME' khổ lớn 1m5",
        "Con đường rải cánh hoa hồng nhung tươi & nến phát sáng",
        "99 đóa hoa hồng đỏ Ecuador cao cấp nhập khẩu",
        "1 chai rượu vang đỏ Pháp hảo hạng kèm 2 ly pha lê",
        "Bánh kem thiết kế riêng khắc tên hai bạn",
        "Bóng bay khí heli trần & dải ruy băng ánh kim",
      ],
      image: "/images/event-1.jpg",
    },
    {
      id: 2,
      name: "GÓI KỶ NIỆM NGÀY YÊU (ANNIVERSARY)",
      price: "1.490.000đ",
      badge: "Bán chạy nhất",
      popular: false,
      features: [
        "Khung ảnh kỷ niệm 12 khoảnh khắc đáng nhớ",
        "Dải nến tealight trái tim lớn giữa phòng",
        "Hoa tươi trang trí bàn trà & bồn tắm sục",
        "Set rượu vang vang nổ Sparkling lấp lánh",
        "Thiệp chúc mừng viết tay phong cách hoàng gia",
        "Trang trí giường nệm phủ cánh hoa nghệ thuật",
      ],
      image: "/images/event-2.jpg",
    },
    {
      id: 3,
      name: "GÓI SINH NHẬT NGỌT NGÀO (HAPPY BIRTHDAY)",
      price: "650.000đ",
      badge: "Ấm cúng & Tinh tế",
      popular: false,
      features: [
        "Bộ chữ bóng nhũ 'HAPPY BIRTHDAY' ánh vàng",
        "Bóng số tuổi kết hợp bóng trái tim bay",
        "Set nến thơm thư giãn tinh dầu lavender",
        "Bánh sinh nhật mini xinh xắn chuẩn vị Pháp",
        "Hoa hồng cắm bình phong cách vintage",
      ],
      image: "/images/event-3.jpg",
    },
    {
      id: 4,
      name: "GÓI SETUP CẢM XÚC CƠ BẢN",
      price: "350.000đ",
      badge: "Tiết kiệm",
      popular: false,
      features: [
        "Rải cánh hoa hồng nhung hình trái tim trên giường",
        "Hệ thống 20 nến điện tử lung linh an toàn",
        "Thiệp tình yêu cá nhân hóa lời nhắn gửi",
        "Thắp tinh dầu thơm hương gỗ trầm ấm cúng",
      ],
      image: "/images/event-4.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070503] text-[#fff8ec] selection:bg-[#c88922] selection:text-black">
      <DesktopHeader onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileHeader onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Breadcrumbs */}
      <div className="pt-24 pb-4 border-b border-[#c88922]/15 bg-[#0f0b08]">
        <div className="max-w-[1240px] mx-auto px-5 flex items-center gap-2 text-xs font-semibold text-zinc-400">
          <Link href="/" className="text-[#ffe2a0]/80 hover:text-[#ffe2a0] transition-colors font-medium">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-[#ffe2a0]">Sự kiện</span>
        </div>
      </div>

      <main className="max-w-[1240px] mx-auto px-5 py-12 md:py-16">
        {/* Header Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[#c88922] uppercase mb-2 font-philosopher">
            KHOẢNH KHẮC BẤT TỬ
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-philosopher text-[#fff8ec] tracking-tight mb-4 leading-tight">
            DỊCH VỤ TRANG TRÍ SỰ KIỆN LÃNG MẠN
          </h1>
          <div className="w-20 h-0.5 bg-[#c88922]/60 mx-auto mb-6" />
          <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed">
            Biến dịp kỷ niệm, sinh nhật hay khoảnh khắc cầu hôn trọng đại thành kỷ niệm khó phai nhất cuộc đời với các gói setup chuyên nghiệp, chỉn chu đến từng ngọn nến.
          </p>
        </div>

        {/* Event Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl overflow-hidden bg-[#140e0a] border shadow-2xl flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? "border-[#c88922] shadow-[0_0_30px_rgba(200,137,34,0.25)]"
                  : "border-[#c88922]/25 hover:border-[#c88922]/60"
              }`}
            >
              <div>
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#d8a85a] to-[#f3cb82] text-[#151008] font-bold text-xs font-philosopher uppercase tracking-wider shadow-md">
                    {pkg.badge}
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-baseline justify-between gap-4 mb-4 pb-4 border-b border-[#c88922]/15">
                    <h3 className="text-xl md:text-2xl font-bold font-philosopher text-[#fff8ec]">
                      {pkg.name}
                    </h3>
                    <span className="text-xl md:text-2xl font-black font-philosopher text-[#ffe2a0] shrink-0">
                      {pkg.price}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#c88922] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#c88922] via-[#ffe2a0] to-[#d9a83a] text-[#1a0f05] font-philosopher font-bold text-sm tracking-wider uppercase shadow-lg hover:scale-102 transition-transform cursor-pointer"
                >
                  Đặt Gói Trang Trí Này
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#17100b] via-[#21140d] to-[#120c08] border border-[#c88922]/30 text-center">
          <Sparkles className="w-10 h-10 text-[#ffe2a0] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#fff8ec] mb-3">
            Quy Trình Chuẩn Bị Hoàn Hảo & Bí Mật
          </h2>
          <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto mb-6 font-light leading-relaxed">
            Chúng tôi hoàn tất trang trí trước giờ nhận phòng 30 phút. Nhiệt độ phòng, mùi hương tinh dầu và ánh nến sẽ được bật sẵn ngay khoảnh khắc bạn mở cửa cùng người ấy.
          </p>
          <a
            href="tel:0383104010"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c88922] text-[#ffe2a0] font-philosopher font-bold text-sm uppercase hover:bg-[#c88922]/15 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Tư Vấn Trực Tiếp: 038 310 4010</span>
          </a>
        </div>
      </main>

      <FooterSection />
      <DesktopContactBar onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileBottomNav onOpenBooking={() => setIsBookingOpen(true)} />
      <ContactModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
