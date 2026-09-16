"use client";

import React from "react";
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
  return (
    <section id="faq" className="mixFaq py-20 md:py-28 bg-[#141419] relative overflow-hidden">
      <div className="container max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        {/* Head */}
        <div className="mixFaqHead text-center mb-14 space-y-3">
          <div className="mixFaqLabel text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
            FAQ
          </div>
          <h2 className="mixFaqTitle text-3xl md:text-5xl font-bold text-white tracking-tight">
            Những câu hỏi khách thường hỏi trước khi đặt
          </h2>
          <p className="mixFaqDesc text-sm md:text-base text-zinc-400">
            Giải đáp nhanh chóng, minh bạch mọi băn khoăn để bạn hoàn toàn an tâm trải nghiệm.
          </p>
        </div>

        {/* Accordion Stack using native details & summary with BEM classes */}
        <div className="mixFaqList space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="mixFaqItem rounded-2xl border border-[#272733] bg-[#17171c] transition-all duration-300 overflow-hidden group"
            >
              <summary className="mixFaqQuestion list-none cursor-pointer p-6 flex items-center justify-between gap-4 font-semibold text-base md:text-lg text-white group-open:text-[#c5a880] transition-colors">
                <span>{faq.question}</span>
                <i className="fa fa-angle-down text-[#c5a880] text-lg transition-transform duration-300 group-open:rotate-180"></i>
              </summary>
              <div className="mixFaqAnswer px-6 pb-6 pt-1 text-xs md:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
