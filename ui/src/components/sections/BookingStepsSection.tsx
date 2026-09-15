"use client";

import React from "react";
import { MessageSquareText, CheckCircle2, BookmarkCheck } from "lucide-react";

const steps = [
  {
    number: "1",
    label: "Step 01",
    icon: MessageSquareText,
    title: "Gửi nhu cầu",
    desc: "Nhắn Zalo chi nhánh, khung giờ dự kiến, hạng phòng hoặc concept bạn yêu thích.",
  },
  {
    number: "2",
    label: "Step 02",
    icon: CheckCircle2,
    title: "Mix xác nhận",
    desc: "Lễ tân phản hồi phòng còn trống ngay tức thì, báo giá rõ ràng và gửi ảnh thực tế.",
  },
  {
    number: "3",
    label: "Step 03",
    icon: BookmarkCheck,
    title: "Giữ phòng",
    desc: "Chưa cọc giữ phòng 15 - 20 phút. Nghỉ dài, qua đêm hoặc cuối tuần cọc 50% để giữ chắc phòng.",
  },
];

export default function BookingStepsSection() {
  return (
    <section id="bookingSteps" className="py-20 md:py-28 bg-[#0f0f12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Head */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold">
            Quy trình đặt phòng
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            3 bước gọn để có phòng phù hợp
          </h2>
          <p className="text-sm md:text-base text-zinc-400">
            Nhanh chóng, tiện lợi, đảm bảo tính riêng tư tối đa từ lúc liên hệ đến khi nhận phòng.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-8 rounded-2xl bg-[#17171c] border border-[#272733] hover:border-[#c5a880]/50 shadow-xl space-y-5 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#c5a880]/15 text-[#c5a880] flex items-center justify-center group-hover:bg-[#c5a880] group-hover:text-[#110d0a] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-heading font-extrabold text-[#c5a880]">
                    0{step.number}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                    {step.label}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-[#c5a880] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                    {step.desc}
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
