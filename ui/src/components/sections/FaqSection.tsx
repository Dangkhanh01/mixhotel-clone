"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/types/mixhotel";

const faqs: FaqItem[] = [
  {
    question: "Mix có nhận khách dưới 18 tuổi không?",
    answer: "Không. Mix Boutique Hotel chỉ nhận khách từ 18 tuổi trở lên để đảm bảo quy định và sự riêng tư.",
  },
  {
    question: "Chưa đặt cọc có giữ phòng được không?",
    answer: "Có thể giữ phòng khoảng 15 - 20 phút tùy tình trạng phòng thực tế tại thời điểm liên hệ. Nếu thời tiết xấu hoặc có lý do đặc biệt, lễ tân có thể hỗ trợ linh hoạt hơn.",
  },
  {
    question: "Có cần đặt cọc trước không?",
    answer: "Nghỉ giờ dưới 4 tiếng thông thường không cần cọc. Đối với các trường hợp nghỉ trên 4 tiếng, nghỉ qua đêm, ngày đêm hoặc đặt phòng vào cuối tuần/dịp lễ, khách cần cọc 50% tổng tiền phòng để chắc chắn giữ phòng.",
  },
  {
    question: "Có được mang đồ ăn vào phòng không?",
    answer: "Khách được thoải mái mang đồ ăn thức uống riêng vào phòng, tuy nhiên nên hạn chế các món có mùi nồng nặng. Một số hạng mục setup như hoa tươi, bánh kem sinh nhật hoặc rượu vang nên báo trước để Mix hỗ trợ ly, đĩa và trang trí đẹp mắt.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#141419] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        {/* Head */}
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            Những câu hỏi khách thường hỏi trước khi đặt
          </h2>
          <p className="text-sm md:text-base text-zinc-400">
            Giải đáp nhanh chóng, minh bạch mọi băn khoăn để bạn hoàn toàn an tâm trải nghiệm.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#1c1c24] border-[#c5a880]/60 shadow-xl"
                    : "bg-[#17171c] border-[#272733] hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-heading font-semibold text-base md:text-lg text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#c5a880] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
