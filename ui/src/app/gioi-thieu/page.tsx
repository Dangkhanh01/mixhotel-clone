"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Wifi, Bath, Tv, Sparkles, Wine, ShieldCheck } from "lucide-react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileActionBar from "@/components/floating/MobileActionBar";
import FooterSection from "@/components/sections/FooterSection";
import { useModal } from "@/context/ModalContext";

export default function GioiThieuPage() {
  const { openBranchSelect } = useModal();

  const amenities = [
    { name: "WIFI NHANH", desc: "Tốc độ cao 100Mbps riêng từng phòng", icon: Wifi },
    { name: "BỒN TẮM ĐÔI", desc: "Bồn sục massage Jacuzzi lãng mạn", icon: Bath },
    { name: "TRANG PHỤC COSPLAY", desc: "Đa dạng phong cách tình yêu quyến rũ", icon: Sparkles },
    { name: "GHẾ TÌNH YÊU TANTRA", desc: "Thiết kế uốn lượn chuẩn ergonomics", icon: ShieldCheck },
    { name: "SMART TV & NETFLIX", desc: "Màn hình lớn chuẩn 4K xem phim thả ga", icon: Tv },
    { name: "ĐỒ UỐNG & COCKTAIL", desc: "Menu vang Pháp và mocktail say đắm", icon: Wine },
  ];

  const reviews = [
    {
      name: "NGUYỄN MINH ANH",
      role: "Khách hàng thân thiết",
      rating: 5,
      content: "Mix Hotel thực sự mang lại cảm xúc khác biệt hoàn toàn so với các khách sạn thông thường. Không gian cực kỳ riêng tư, phòng ốc thơm tho, sạch sẽ, decor tinh tế và nhân viên rất tôn trọng sự riêng tư của khách.",
    },
    {
      name: "TRẦN QUỐC BẢO",
      role: "Doanh nhân",
      rating: 5,
      content: "Mình đặt phòng kỷ niệm 2 năm yêu nhau ở chi nhánh Đặng Tiến Đông. Dịch vụ setup nến và hoa tươi xuất sắc ngoài mong đợi. Bạn gái mình đã khóc vì bất ngờ và hạnh phúc. Cảm ơn Mix Hotel rất nhiều!",
    },
    {
      name: "LÊ HOÀNG YẾN",
      role: "Designer",
      rating: 5,
      content: "Góc nhìn của một người làm thiết kế: Từng chi tiết ánh sáng, gam màu đỏ nhung và tranh treo tường Kamasutra ở phòng Karma đều có gu thẩm mỹ rất cao. Đáng đồng tiền bát gạo!",
    },
    {
      name: "HÀ MY",
      role: "HR Manager",
      rating: 5,
      content: "Khách sạn tình yêu văn minh, lịch sự số 1 Hà Nội. Thủ tục check-in kín đáo, bồn tắm sục đôi rất thư giãn. Chắc chắn sẽ quay lại nhiều lần cùng người yêu.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070503] text-[#fff8ec] selection:bg-[#c88922] selection:text-black">
      <DesktopHeader />
      <MobileHeader />

      {/* Breadcrumbs */}
      <div className="pt-24 pb-4 border-b border-[#c88922]/15 bg-[#0f0b08]">
        <div className="max-w-[1200px] mx-auto px-5 flex items-center gap-2 text-xs font-semibold text-zinc-400">
          <Link href="/" className="text-[#ffe2a0]/80 hover:text-[#ffe2a0] transition-colors font-medium">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-[#ffe2a0]">Giới thiệu</span>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-5 py-12 md:py-16">
        {/* Story Section */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[#c88922] uppercase mb-3 font-philosopher">
            GIỚI THIỆU VỀ HỆ THỐNG
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-philosopher tracking-tight text-[#fff8ec] mb-6 leading-tight">
            VỀ KHÁCH SẠN TÌNH YÊU MIX BOUTIQUE
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#c88922] to-transparent mx-auto mb-8" />

          <p className="text-xl md:text-2xl font-bold italic font-philosopher text-[#ffe2a0] mb-6">
            &ldquo;ĐỪNG ĐỂ TÌNH YÊU CỦA BẠN CHỈ CÓ MỘT MÀU!&rdquo;
          </p>

          <div className="text-left md:text-justify text-zinc-300 space-y-4 text-base md:text-lg leading-relaxed font-light">
            <p>
              Ở <strong>Mix Boutique Hotel</strong>, chúng tôi giúp bạn vẽ bức tranh tình yêu của chính mình bằng những sắc màu tươi mới, để mỗi phút giây bên nhau đều như <span className="text-[#ffe2a0] font-semibold">&ldquo;Phút yêu đầu&rdquo;</span>.
            </p>
            <p>
              Chúng tôi, những người yêu nhau luôn tìm kiếm một nơi thật sự riêng tư, có không gian lãng mạn để tận hưởng cảm giác bên nhau trọn vẹn nhất. Tuy nhiên ở chốn Hà Nội tấp nập, ngoài các khách sạn rập khuôn và trung tâm thương mại đông đúc, chúng ta gần như không còn sự lựa chọn nào khác cho cảm xúc đôi lứa.
            </p>
            <p>
              Lấy ý tưởng từ những câu chuyện tình bất tử trong các bộ phim kinh điển mang phong vị Châu Âu và nét huyền bí Á Đông, chúng tôi đã tạo dựng từng concept phòng độc bản. Chúng tôi phát triển dịch vụ tiêu chuẩn cùng hình thức thuê phòng linh hoạt theo giờ và qua đêm, tập trung hoàn toàn vào cảm xúc thăng hoa của khách hàng.
            </p>
            <p>
              Và Mix Boutique Hotel ra đời. Với hơn 4 cơ sở tại các quận trung tâm Hà Nội, chúng tôi tự hào là điểm đến số 1 được các cặp đôi lựa chọn để gìn giữ ngọn lửa tình yêu nồng say.
            </p>
          </div>
        </section>

        {/* Feature Image Banner */}
        <div className="relative w-full h-[320px] md:h-[540px] rounded-3xl overflow-hidden border border-[#c88922]/30 shadow-2xl mb-20 group">
          <Image
            src="/images/mixhotel-gt-.webp"
            alt="Mix Boutique Hotel Giới Thiệu"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-left">
            <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d8a85a] to-[#f3cb82] text-[#151008] font-bold text-xs font-philosopher tracking-wider uppercase inline-block mb-2 shadow-lg">
              Boutique Mood
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-philosopher text-[#fff8ec]">
              Không Gian Riêng Tư &bull; Cảm Xúc Thăng Hoa
            </h2>
          </div>
        </div>

        {/* 6 Core Amenities */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-[#c88922] uppercase font-philosopher">
              ĐẶC QUYỀN KHÁCH HÀNG
            </span>
            <h2 className="text-3xl md:text-4xl font-black font-philosopher text-[#fff8ec] mt-2">
              TRẢI NGHIỆM TIỆN NGHI CAO CẤP
            </h2>
            <div className="w-20 h-0.5 bg-[#c88922]/60 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-gradient-to-b from-[#15100c] to-[#0d0907] border border-[#c88922]/20 hover:border-[#c88922]/60 transition-all duration-300 hover:-translate-y-1 shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#c88922]/15 border border-[#c88922]/30 flex items-center justify-center text-[#ffe2a0] mb-4 group-hover:bg-[#c88922] group-hover:text-[#151008] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-philosopher text-[#fff8ec] mb-2 tracking-wide">
                    {item.name}
                  </h3>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-[#c88922] uppercase font-philosopher">
              ĐÁNH GIÁ THỰC TẾ
            </span>
            <h2 className="text-3xl md:text-4xl font-black font-philosopher text-[#fff8ec] mt-2">
              KHÁCH HÀNG NÓI GÌ VỀ MIX HOTEL
            </h2>
            <div className="w-20 h-0.5 bg-[#c88922]/60 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#140e0a] border border-[#c88922]/25 shadow-xl flex flex-col justify-between"
              >
                <div className="flex items-center gap-1 text-[#ffe2a0] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-zinc-300 italic mb-6 leading-relaxed">
                  &ldquo;{rev.content}&rdquo;
                </p>
                <div className="border-t border-[#c88922]/15 pt-3">
                  <p className="font-bold text-sm text-[#fff8ec] font-philosopher tracking-wide">
                    {rev.name}
                  </p>
                  <p className="text-xs text-[#c88922]">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-3xl p-8 md:p-12 text-center bg-gradient-to-r from-[#20150d] via-[#2d1b0f] to-[#1a0f08] border border-[#c88922]/40 shadow-2xl">
          <h2 className="text-2xl md:text-4xl font-bold font-philosopher text-[#fff8ec] mb-4">
            Sẵn Sàng Cho Phút Yêu Thăng Hoa Cùng Người Ấy?
          </h2>
          <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto mb-8 font-light">
            Đặt phòng trước 15-30 phút để nhận trọn gói ưu đãi giảm 10% và chuẩn bị phòng ốc chỉn chu nhất.
          </p>
          <button
            type="button"
            onClick={() => openBranchSelect("zalo")}
            className="callContactLocate px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c88922] via-[#ffe2a0] to-[#d9a83a] text-[#1a0f05] font-philosopher font-bold text-base shadow-xl hover:scale-105 transition-transform cursor-pointer tracking-wider uppercase border-none"
          >
            ĐẶT PHÒNG NGAY
          </button>
        </section>
      </main>

      <FooterSection />
      <DesktopContactBar />
      <MobileActionBar />
    </div>
  );
}
