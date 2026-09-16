"use client";

import React from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

interface FinalCtaSectionProps {
  onOpenContact?: (type: "zalo" | "phone") => void;
}

export default function FinalCtaSection({ onOpenContact }: FinalCtaSectionProps) {
  const { openBranchSelect } = useModal();

  const handleZalo = () => {
    if (onOpenContact) {
      onOpenContact("zalo");
    } else {
      openBranchSelect("zalo");
    }
  };

  const handlePhone = () => {
    if (onOpenContact) {
      onOpenContact("phone");
    } else {
      openBranchSelect("phone");
    }
  };

  return (
    <section id="finalCta" className="mixFinalCta relative py-24 md:py-32 overflow-hidden flex items-center justify-center">
      {/* Background Image & Lines */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/final-cta-bg.jpg"
          alt="Mix Boutique Hotel đặt phòng"
          fill
          className="object-cover object-center brightness-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-black/80 to-[#141419]" />
        <div className="mixFinalCtaLineTop absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/50 to-transparent" />
        <div className="mixFinalCtaLineBottom absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/50 to-transparent" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center space-y-6">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold px-4 py-1.5 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30">
          ĐẶT PHÒNG HÔM NAY
        </span>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Muốn xem phòng còn trống? Nhắn Zalo để Mix gửi ảnh &amp; báo giá ngay
        </h2>

        <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Tư vấn nhanh chóng, kín đáo, ưu tiên ảnh thật và concept phù hợp nhất cho buổi hẹn của hai người.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={handleZalo}
            className="callContactLocate flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black font-semibold text-sm uppercase tracking-wider shadow-[0_10px_30px_rgba(197,168,128,0.4)] hover:scale-105 transition-all cursor-pointer border-none"
          >
            <i className="fa fa-commenting text-base"></i>
            <span>Nhắn Zalo Tư Vấn</span>
          </button>

          <button
            type="button"
            onClick={handlePhone}
            className="callContactLocate flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm uppercase tracking-wider backdrop-blur-sm transition-all cursor-pointer"
          >
            <i className="fa fa-phone text-base"></i>
            <span>Gọi Ngay</span>
          </button>
        </div>
      </div>
    </section>
  );
}
