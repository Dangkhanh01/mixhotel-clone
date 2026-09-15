"use client";

import React from "react";
import { ShieldCheck, Camera, Tag, PartyPopper } from "lucide-react";

const reasons = [
  {
    number: "1",
    icon: ShieldCheck,
    title: "Riêng tư",
    desc: "Tư vấn kín đáo, hỗ trợ khách chọn phòng phù hợp và tuyệt đối không làm phiền trải nghiệm riêng.",
  },
  {
    number: "2",
    icon: Camera,
    title: "Ảnh thật 100%",
    desc: "Ưu tiên hình ảnh thực tế rõ nét, nhiều góc phòng và video để khách biết chính xác không gian trước khi đến.",
  },
  {
    number: "3",
    icon: Tag,
    title: "Giá rõ ràng",
    desc: "Công khai giá theo hạng phòng, nghỉ giờ, qua đêm và ngày đêm minh bạch để khách dễ dàng quyết định.",
  },
  {
    number: "4",
    icon: PartyPopper,
    title: "Có event & setup",
    desc: "Cung cấp dịch vụ trang trí sinh nhật, kỷ niệm, cầu hôn với hoa tươi, nến, bánh kem và rượu vang lãng mạn.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why" className="py-20 md:py-28 bg-[#141419] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Head */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold">
            Vì sao chọn Mix
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            Tập trung vào điều khách lo trước khi đặt
          </h2>
          <p className="text-sm md:text-base text-zinc-400">
            Sự tin cậy, không gian tinh tế và cảm xúc của bạn là ưu tiên hàng đầu tại Mix Boutique Hotel.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 md:p-7 rounded-2xl bg-[#1a1a22] border border-[#272733] hover:border-[#c5a880]/50 shadow-xl flex flex-col justify-between space-y-4 group transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#c5a880]/15 text-[#c5a880] flex items-center justify-center group-hover:bg-[#c5a880] group-hover:text-[#110d0a] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-heading font-extrabold text-zinc-500 group-hover:text-[#c5a880]/60 transition-colors">
                    0{item.number}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-[#c5a880] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
