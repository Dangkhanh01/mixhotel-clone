"use client";

import React from "react";
import { useModal } from "@/context/ModalContext";
import type { PricingTier } from "@/types/mixhotel";

interface PricingSectionProps {
  onAskTier?: (tierName: string) => void;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Superior",
    badge: "Tiết kiệm",
    price: "199k",
    unit: "2h đầu",
    isHot: false,
    extraHour: "50k / h",
    overnight: "500k",
    dayNight: "700k",
  },
  {
    name: "Deluxe",
    badge: "Phổ biến",
    price: "300k",
    unit: "2h đầu",
    isHot: true,
    extraHour: "50k / h",
    overnight: "600k",
    dayNight: "800k",
  },
  {
    name: "VIP",
    badge: "Cao cấp",
    price: "400k",
    unit: "2h đầu",
    isHot: false,
    extraHour: "80k / h",
    overnight: "800k",
    dayNight: "1.000k",
  },
];

export default function PricingSection({ onAskTier }: PricingSectionProps) {
  const { openBranchSelect } = useModal();

  const handleAsk = (tierName: string) => {
    if (onAskTier) {
      onAskTier(tierName);
    } else {
      openBranchSelect("zalo");
    }
  };

  return (
    <section id="prices" className="mixPrices py-20 md:py-28 bg-[#0f0f12] relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#c5a880]/10 blur-[130px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Head */}
        <div className="mixPricesHead text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="mixPricesLabel text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
            BẢNG GIÁ MINH BẠCH
          </div>
          <h2 className="mixPricesTitle text-3xl md:text-5xl font-bold text-white tracking-tight">
            Giá từ <span className="mixPricesGold text-[#c5a880]">199k / 2h</span> rõ ràng trước khi đặt
          </h2>
          <p className="mixPricesDesc text-sm md:text-base text-zinc-400">
            Giá niêm yết rõ ràng theo giờ, qua đêm và cả ngày đêm. Nhắn Zalo để được tư vấn và giữ phòng tức thì.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="mixPricesGrid grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <article
              key={tier.name}
              className={`mixPricesCard relative rounded-2xl flex flex-col justify-between p-7 md:p-8 transition-all duration-300 shadow-2xl ${
                tier.isHot
                  ? "mixPricesCardHot bg-gradient-to-b from-[#22222d] to-[#17171f] border-2 border-[#c5a880] md:-translate-y-2"
                  : "bg-[#17171c] border border-[#272733] hover:border-zinc-700"
              }`}
            >
              {tier.isHot && (
                <div className="mixPricesRibbon absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black font-bold text-xs uppercase tracking-wider shadow-lg">
                  Được chọn nhiều
                </div>
              )}

              {/* Header & Main Price */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                    <span className="text-xs text-zinc-400 font-medium">{tier.badge}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-zinc-800/80 text-[#c5a880]">
                    Concept Hot
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-extrabold text-[#c5a880]">
                    {tier.price}
                  </span>
                  <span className="text-sm text-zinc-400">/ {tier.unit}</span>
                </div>

                {/* Rates Detail Table */}
                <div className="space-y-3 pt-2 border-t border-zinc-800/80 text-sm">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="flex items-center gap-2">
                      <i className="fa fa-clock-o text-[#c5a880]"></i>
                      Thêm mỗi giờ
                    </span>
                    <strong className="font-semibold text-white">{tier.extraHour}</strong>
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="flex items-center gap-2">
                      <i className="fa fa-moon-o text-[#c5a880]"></i>
                      Nghỉ qua đêm
                    </span>
                    <strong className="font-semibold text-white">{tier.overnight}</strong>
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="flex items-center gap-2">
                      <i className="fa fa-sun-o text-[#c5a880]"></i>
                      Cả ngày đêm
                    </span>
                    <strong className="font-semibold text-white">{tier.dayNight}</strong>
                  </div>
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleAsk(tier.name)}
                  className={`callContactLocate w-full py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border-none shadow-lg ${
                    tier.isHot
                      ? "bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black hover:brightness-110"
                      : "bg-[#252530] text-white hover:bg-[#2f2f3d] border border-zinc-700"
                  }`}
                >
                  <i className="fa fa-commenting"></i>
                  <span>Hỏi phòng {tier.name}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
