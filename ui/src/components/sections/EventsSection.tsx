"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, MessageSquare } from "lucide-react";
import type { EventPackage } from "@/types/mixhotel";

interface EventsSectionProps {
  onOpenConsult: () => void;
}

const eventPackages: EventPackage[] = [
  { name: "Nến - hoa - bóng bay, tặng 1 chai vang", price: "1.490k - 1.990k" },
  { name: "Set rượu vang - hoa hồng - nến lung linh", price: "590k" },
  { name: "Set nến nghệ thuật + hoa tươi + bánh kem", price: "650k" },
  { name: "Set bánh kem sinh nhật / khay trái cây", price: "350k / 300k" },
];

export default function EventsSection({ onOpenConsult }: EventsSectionProps) {
  return (
    <section id="events" className="py-20 md:py-28 bg-[#121216] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] rounded-full bg-[#c92a2a]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Pricing Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold">
                Trang trí sự kiện
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
                Thêm bất ngờ cho sinh nhật, kỷ niệm hoặc cầu hôn
              </h2>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                Mix Boutique Hotel hỗ trợ chuẩn bị trọn gói các set nến thơm, cánh hoa, bóng bay, bánh kem và rượu vang ngọt ngào. (Giá trang trí chưa bao gồm tiền phòng).
              </p>
            </div>

            {/* Price Table Card */}
            <div className="p-6 rounded-2xl bg-[#17171c] border border-[#2b2b36] shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-heading font-bold text-white text-base">Bảng giá trang trí mẫu</h3>
                <span className="text-[11px] text-zinc-400">Giá tham khảo theo set</span>
              </div>

              <div className="space-y-3 divide-y divide-zinc-800/60">
                {eventPackages.map((pkg, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs md:text-sm">
                    <span className="text-zinc-300 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                      {pkg.name}
                    </span>
                    <strong className="text-[#c5a880] font-semibold whitespace-nowrap">
                      {pkg.price}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenConsult}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(197,168,128,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Tư Vấn Set Trang Trí Riêng</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Asymmetric Real Event Photos */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] col-span-2 rounded-2xl overflow-hidden border border-zinc-800 group shadow-lg">
              <Image
                src="/images/event-1.jpg"
                alt="Trang trí phòng Mix Boutique"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 group shadow-lg">
              <Image
                src="/images/event-2.jpg"
                alt="Trang trí nến hoa"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 group shadow-lg">
              <Image
                src="/images/event-3.jpg"
                alt="Trang trí bóng bay lãng mạn"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
