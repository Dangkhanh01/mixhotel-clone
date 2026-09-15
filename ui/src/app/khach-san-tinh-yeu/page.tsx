"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, Clock, Shield, Sparkles, CheckCircle2 } from "lucide-react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileBottomNav from "@/components/floating/MobileBottomNav";
import ContactModal from "@/components/ui/ContactModal";
import FooterSection from "@/components/sections/FooterSection";

export default function KhachSanTinhYeuPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const branches = [
    {
      id: "branch-mix-boutique-premium-hotel",
      name: "MIX BOUTIQUE PREMIUM - HUỲNH THÚC KHÁNG",
      code: "CS1",
      address: "Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, Đống Đa, Hà Nội",
      hotline: "038 310 4010",
      description: "Tọa lạc tại khu vực trung tâm Đống Đa, Mix Premium là cơ sở flagship với 14 phòng concept cao cấp trang bị bồn sục Jacuzzi đôi ngắm view thành phố.",
      image: "/images/469-moonlit-love.jpg",
      rooms: [
        {
          name: "Room 469 - Cloud Nine VIP",
          priceHourly: "400.000đ / 2h đầu",
          priceOvernight: "950.000đ / đêm",
          tags: ["Bồn tắm sục đôi", "Trần ngàn sao", "Ghế Tantra", "Smart TV 65 inch"],
          image: "/images/469-moonlit-love.jpg",
        },
        {
          name: "Room 302 - Karma BDSM Mood",
          priceHourly: "350.000đ / 2h đầu",
          priceOvernight: "850.000đ / đêm",
          tags: ["Tranh trần Kamasutra", "Dụng cụ bondage", "Đèn neon đỏ quyến rũ"],
          image: "/images/302-karma.jpg",
        },
        {
          name: "Room 202 - Galaxy Starlight",
          priceHourly: "300.000đ / 2h đầu",
          priceOvernight: "750.000đ / đêm",
          tags: ["Dải ngân hà phát sáng", "Giường tròn 2m2", "Netflix 4K"],
          image: "/images/202-galaxy.jpg",
        },
      ],
    },
    {
      id: "branch-mix-boutique-hotel-256b-dang-tien-dong",
      name: "MIX BOUTIQUE HOTEL - 256B ĐẶNG TIẾN ĐÔNG",
      code: "CS2",
      address: "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
      hotline: "039 330 7030",
      description: "Nằm cạnh hồ Hoàng Cầu thơ mộng, mang phong cách lãng mạn Châu Âu với hệ thống phòng tắm kính view panorama tuyệt đỉnh cho các dịp kỷ niệm.",
      image: "/images/302-karma.jpg",
      rooms: [
        {
          name: "Room 401 - Katana Geisha Style",
          priceHourly: "350.000đ / 2h đầu",
          priceOvernight: "850.000đ / đêm",
          tags: ["Phong cách Nhật Bản", "Đèn lồng đỏ", "Bồn gỗ thảo mộc", "Cosplay Kimono"],
          image: "/images/302-karma.jpg",
        },
        {
          name: "Room 301 - Moulin Rouge",
          priceHourly: "300.000đ / 2h đầu",
          priceOvernight: "700.000đ / đêm",
          tags: ["Rèm nhung cổ điển", "Bồn tắm lộ thiên", "Ghế tình yêu cao cấp"],
          image: "/images/202-galaxy.jpg",
        },
      ],
    },
    {
      id: "branch-mix-boutique-hotel-20-phuc-la-ha-dong",
      name: "MIX BOUTIQUE HOTEL - 20 PHÚC LA HÀ ĐÔNG",
      code: "CS3",
      address: "20 Phố Phúc La, Phúc La, Hà Đông, Hà Nội",
      hotline: "035 366 0966",
      description: "Cơ sở mới nhất với khuôn viên rộng rãi, bãi đỗ ô tô kín đáo tuyệt đối, không gian hiện đại và đa dạng concept từ trẻ trung đến nồng say.",
      image: "/images/202-galaxy.jpg",
      rooms: [
        {
          name: "Room 501 - Eden Garden Luxury",
          priceHourly: "400.000đ / 2h đầu",
          priceOvernight: "950.000đ / đêm",
          tags: ["Vườn kính trong phòng", "Bồn sục massage", "Máy chiếu phim 120 inch"],
          image: "/images/469-moonlit-love.jpg",
        },
        {
          name: "Room 205 - Neon Romance",
          priceHourly: "250.000đ / 2h đầu",
          priceOvernight: "600.000đ / đêm",
          tags: ["Tone màu tím hồng", "Giường bọc da", "Minibar miễn phí nước"],
          image: "/images/302-karma.jpg",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#070503] text-[#fff8ec] selection:bg-[#c88922] selection:text-black">
      <DesktopHeader onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileHeader onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 md:py-28 overflow-hidden bg-gradient-to-b from-[#140e0a] via-[#0d0907] to-[#070503] border-b border-[#c88922]/20">
        <div className="max-w-[1240px] mx-auto px-5 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[#c88922] uppercase mb-3 font-philosopher">
              KHÁCH SẠN TÌNH YÊU HÀ NỘI
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-philosopher tracking-tight text-[#fff8ec] mb-4 leading-tight">
              Chọn Đúng Chi Nhánh Khách Sạn Tình Yêu
            </h1>
            <p className="text-base md:text-lg text-zinc-300 mb-8 font-light leading-relaxed">
              3 cơ sở tại Đống Đa & Hà Đông với hơn 60 phòng concept độc bản. Hãy chọn chi nhánh phù hợp để Mix Hotel kiểm tra phòng trống và đón tiếp chu đáo nhất.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="https://zalo.me/0383104010"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c88922] via-[#ffe2a0] to-[#d9a83a] text-[#1a0f05] font-philosopher font-bold text-sm shadow-xl hover:scale-105 transition-transform uppercase"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Nhắn Zalo Tư Vấn</span>
              </a>
              <a
                href="tel:0383104010"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-[#c88922]/40 text-[#fff8ec] font-philosopher font-bold text-sm transition-colors uppercase"
              >
                <Phone className="w-4 h-4 text-[#ffe2a0]" />
                <span>Gọi Hotline</span>
              </a>
            </div>

            {/* Stats Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#140e0a]/80 border border-[#c88922]/30 backdrop-blur-md">
              <div>
                <strong className="block text-2xl md:text-3xl font-black text-[#ffe2a0] font-philosopher">
                  3
                </strong>
                <span className="text-xs text-zinc-400">Chi nhánh Hà Nội</span>
              </div>
              <div>
                <strong className="block text-2xl md:text-3xl font-black text-[#ffe2a0] font-philosopher">
                  199k
                </strong>
                <span className="text-xs text-zinc-400">Giá từ / 2h đầu</span>
              </div>
              <div>
                <strong className="block text-2xl md:text-3xl font-black text-[#ffe2a0] font-philosopher">
                  15-20&apos;
                </strong>
                <span className="text-xs text-zinc-400">Giữ phòng không cọc</span>
              </div>
              <div>
                <strong className="block text-2xl md:text-3xl font-black text-[#ffe2a0] font-philosopher">
                  18+
                </strong>
                <span className="text-xs text-zinc-400">Đảm bảo kín đáo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Branches List */}
      <main className="max-w-[1240px] mx-auto px-5 py-16 space-y-24">
        {branches.map((branch, bIdx) => (
          <section key={bIdx} id={branch.id} className="scroll-mt-28">
            {/* Branch Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#c88922]/20 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#d8a85a] to-[#f3cb82] text-[#151008] font-bold text-xs font-philosopher shadow-md">
                    {branch.code}
                  </span>
                  <span className="text-xs font-semibold text-[#ffe2a0] tracking-wider uppercase">
                    HỆ THỐNG PHÒNG NGHỈ
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black font-philosopher text-[#fff8ec]">
                  {branch.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-zinc-400 mt-2">
                  <MapPin className="w-4 h-4 text-[#c88922] shrink-0" />
                  <span>{branch.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${branch.hotline.replace(/\s+/g, "")}`}
                  className="px-4 py-2 rounded-full border border-[#c88922]/50 text-[#ffe2a0] text-xs font-bold font-philosopher hover:bg-[#c88922]/15 transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{branch.hotline}</span>
                </a>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#d8a85a] to-[#f3cb82] text-[#151008] text-xs font-bold font-philosopher hover:brightness-110 transition-all uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Đặt Phòng Cơ Sở Này
                </button>
              </div>
            </div>

            {/* Room Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {branch.rooms.map((room, rIdx) => (
                <div
                  key={rIdx}
                  className="rounded-3xl overflow-hidden bg-[#140e0a] border border-[#c88922]/25 shadow-xl hover:border-[#c88922]/60 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-64 overflow-hidden">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#ffe2a0] border border-[#c88922]/30 text-xs font-bold font-philosopher">
                        {room.name.split("-")[0]}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold font-philosopher text-[#fff8ec] mb-3">
                        {room.name}
                      </h3>

                      {/* Pricing pills */}
                      <div className="flex items-center gap-3 mb-4 text-xs font-semibold">
                        <span className="px-3 py-1 rounded-lg bg-[#c88922]/15 text-[#ffe2a0] border border-[#c88922]/30">
                          {room.priceHourly}
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300">
                          {room.priceOvernight}
                        </span>
                      </div>

                      {/* Amenities checklist */}
                      <ul className="space-y-1.5 text-xs text-zinc-300 mb-4">
                        {room.tags.map((tag, tIdx) => (
                          <li key={tIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#c88922] shrink-0" />
                            <span>{tag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#c88922]/10 mt-auto">
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#c88922]/20 to-[#ffe2a0]/20 hover:from-[#c88922] hover:to-[#ffe2a0] hover:text-[#151008] border border-[#c88922]/40 text-[#ffe2a0] font-philosopher font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
                    >
                      Giữ Phòng Ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <FooterSection />
      <DesktopContactBar onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileBottomNav onOpenBooking={() => setIsBookingOpen(true)} />
      <ContactModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
