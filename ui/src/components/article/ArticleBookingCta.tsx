"use client";

import React from "react";
import { useModal } from "@/context/ModalContext";

export default function ArticleBookingCta() {
  const { openBranchSelect, openConnectConfirm } = useModal();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#c88922]/40 bg-gradient-to-br from-[#24170d] via-[#16100a] to-[#0d0905] p-6 md:p-10 my-12 shadow-2xl">
      {/* Glow background effects */}
      <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#c88922]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-[#c88922]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c88922]/20 border border-[#c88922]/40 text-[#ffe2a0] text-xs font-bold font-philosopher uppercase tracking-wider mb-4">
          <i className="fa fa-star text-[#c88922]" />
          <span>Mix Boutique Hotel</span>
        </div>

        <h3 className="text-xl md:text-3xl font-black font-philosopher text-[#fff8ec] tracking-tight uppercase mb-3">
          Trải nghiệm không gian hẹn hò thăng hoa cảm xúc
        </h3>

        <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed mb-6">
          Hơn 50+ phòng concept tình yêu độc đáo tại Hà Nội với bồn tắm sục đôi cỡ lớn, máy chiếu phim rạp, ghế tình yêu Tantra và dịch vụ bảo mật danh tính tuyệt đối.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={() => openBranchSelect("zalo")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c88922] via-[#e5a638] to-[#ffe2a0] text-[#1a0f05] font-bold font-philosopher uppercase text-xs md:text-sm tracking-wider shadow-lg hover:shadow-[#c88922]/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="fa fa-calendar-check-o" />
            <span>Đặt phòng ngay hôm nay</span>
          </button>

          <button
            type="button"
            onClick={() => openConnectConfirm("0243.533.2266", "tel:02435332266")}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#1c140d] border border-[#c88922]/40 text-[#ffe2a0] hover:border-[#c88922] hover:text-[#ffffff] font-bold font-philosopher uppercase text-xs md:text-sm tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fa fa-phone text-[#c88922]" />
            <span>Hotline: 0243.533.2266</span>
          </button>
        </div>
      </div>
    </div>
  );
}
