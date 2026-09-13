"use client";

import React from "react";
import Image from "next/image";
import { MessageSquare, Phone, MapPin, Sparkles } from "lucide-react";
import type { Branch } from "@/types/mixhotel";

interface BranchesSectionProps {
  onSelectBranch: (branch: Branch) => void;
}

const branches: Branch[] = [
  {
    id: "branch-1",
    number: "01",
    badge: "Chi nhánh nổi bật",
    name: "Huỳnh Thúc Kháng",
    shortLocation: "Khu vực Đống Đa / Láng",
    address: "Ngách 29 Ngõ 49 Phố Huỳnh Thúc Kháng, Thành Công, Láng, Hà Nội",
    features: ["Nhiều hạng phòng concept", "Kiểm tra phòng trống qua Zalo", "Khu trung tâm dễ tìm"],
    image: "/images/branch-huynhthuckhang.webp",
    phone: "038 310 4010",
    zalo: "https://zalo.me/+84383104010",
    messenger: "https://m.me/602986296805550/",
    sms: "sms:+84383104010",
  },
  {
    id: "branch-2",
    number: "02",
    badge: "Khu Đống Đa",
    name: "256B Đặng Tiến Đông",
    shortLocation: "Gần Hoàng Cầu, Ô Chợ Dừa",
    address: "256B Phố Đặng Tiến Đông, Ô Chợ Dừa, Đống Đa, Hà Nội",
    features: ["Khu vực Đống Đa trung tâm", "Di chuyển thuận tiện, kín đáo", "Nghỉ giờ & Qua đêm"],
    image: "/images/branch-dangtiendong.webp",
    phone: "039 330 7030",
    zalo: "https://zalo.me/+84393307030",
    messenger: "https://m.me/111428390604292/",
    sms: "sms:+84393307030",
  },
  {
    id: "branch-3",
    number: "03",
    badge: "Hà Đông - Xa La",
    name: "20 Phúc La Hà Đông",
    shortLocation: "Khu đô thị Xa La, Hà Đông",
    address: "20 Phố Phúc La, Khu đô thị Xa La, Hà Đông, Hà Nội",
    features: ["Khu Hà Đông - Xa La yên tĩnh", "Phù hợp nghỉ theo giờ & party", "Bãi đậu xe rộng rãi"],
    image: "/images/branch-phucla.webp",
    phone: "035 366 0966",
    zalo: "https://zalo.me/+84353660966",
    messenger: "https://m.me/114361207416511",
    sms: "sms:+84353660966",
  },
];

export default function BranchesSection({ onSelectBranch }: BranchesSectionProps) {
  return (
    <section id="branches" className="py-20 md:py-28 bg-[#0f0f12] relative overflow-hidden">
      {/* Background radial decorations */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] rounded-full bg-[#c5a880]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Head */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold">
            3 chi nhánh Hà Nội
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            Chọn điểm gần bạn, Mix tư vấn phòng còn trống
          </h2>
          <p className="text-sm md:text-base text-zinc-400">
            Mỗi chi nhánh đều có nhiều hạng phòng và concept khác nhau. Nhắn Zalo để kiểm tra tình trạng phòng thực tế trước khi đến.
          </p>
        </div>

        {/* 3 Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch) => (
            <article
              key={branch.id}
              className="group rounded-2xl bg-[#17171c] border border-[#262632] hover:border-[#c5a880]/50 overflow-hidden shadow-2xl flex flex-col transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17171c] via-transparent to-black/40" />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-zinc-700/60 text-[11px] font-semibold text-[#c5a880]">
                  {branch.badge}
                </div>

                <div className="absolute top-4 right-4 text-xs font-mono font-bold text-white bg-black/60 px-2 py-1 rounded">
                  {branch.number}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-zinc-400 uppercase font-mono">
                      Mix Boutique Hotel
                    </span>
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-[#c5a880] transition-colors">
                      {branch.name}
                    </h3>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-zinc-300">
                    <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <p className="line-clamp-2 leading-relaxed">{branch.address}</p>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                    {branch.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-400">
                        <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <a
                    href={branch.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black font-semibold text-xs uppercase hover:brightness-110 transition-all shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>Hỏi phòng</span>
                  </a>

                  <button
                    onClick={() => onSelectBranch?.(branch)}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#252530] hover:bg-[#2e2e3d] text-white font-semibold text-xs uppercase border border-zinc-700 transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Gọi ngay</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
