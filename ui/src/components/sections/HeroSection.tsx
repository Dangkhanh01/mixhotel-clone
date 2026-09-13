"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, Phone, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  onOpenContact: (type: "zalo" | "phone") => void;
}

export default function HeroSection({ onOpenContact }: HeroSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    branch: "",
    need: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.branch || !formData.need) {
      alert("Vui lòng điền đầy đủ các thông tin có dấu *");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="top" className="relative min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden flex items-center">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Mix Boutique Hotel"
          fill
          className="object-cover object-center brightness-40 scale-105"
          priority
        />
        {/* Gradients and Luxury Aura */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-black/70" />
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-[#c5a880]/15 blur-[120px] pointer-events-none animate-pulse-aura" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Copy & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30 text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
              <span>✦</span> Khách sạn tình yêu tại Hà Nội
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight tracking-tight">
              Mix Boutique Hotel phòng concept{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-[#dfc299] to-[#c5a880]">
                riêng tư
              </span>{" "}
              cho hai người
            </h1>

            <p className="text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Xem ảnh thật, video phòng thật, chọn concept hợp gu và nhắn Zalo để giữ phòng nhanh tại 3 chi nhánh Hà Nội.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onOpenContact("zalo")}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black font-semibold text-sm shadow-[0_10px_25px_rgba(197,168,128,0.3)] hover:scale-105 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Nhắn Zalo Tư Vấn</span>
              </button>

              <button
                onClick={() => onOpenContact("phone")}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi Ngay</span>
              </button>
            </div>

            {/* 4 Stats Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-800/80">
              <div className="p-3 rounded-xl bg-[#17171c]/60 border border-zinc-800">
                <span className="text-2xl font-heading font-bold text-[#c5a880]">3</span>
                <p className="text-xs text-zinc-400 mt-0.5">chi nhánh Hà Nội dễ di chuyển</p>
              </div>
              <div className="p-3 rounded-xl bg-[#17171c]/60 border border-zinc-800">
                <span className="text-2xl font-heading font-bold text-[#c5a880]">32+</span>
                <p className="text-xs text-zinc-400 mt-0.5">phòng concept đổi gió cho cặp đôi</p>
              </div>
              <div className="p-3 rounded-xl bg-[#17171c]/60 border border-zinc-800">
                <span className="text-2xl font-heading font-bold text-[#c5a880]">199k</span>
                <p className="text-xs text-zinc-400 mt-0.5">giá từ 199k / 2h đầu</p>
              </div>
              <div className="p-3 rounded-xl bg-[#17171c]/60 border border-zinc-800">
                <span className="text-2xl font-heading font-bold text-[#c5a880]">Kín đáo</span>
                <p className="text-xs text-zinc-400 mt-0.5">riêng tư, an tâm, không lo thông tin</p>
              </div>
            </div>

            {/* Mobile Shots Preview */}
            <div className="flex gap-3 pt-2 overflow-x-auto pb-2 scrollbar-none">
              <div className="relative w-28 h-20 rounded-lg overflow-hidden shrink-0 border border-zinc-700/60">
                <Image src="/images/thu-vien-1.webp" alt="Phòng Mix 1" fill className="object-cover" />
              </div>
              <div className="relative w-28 h-20 rounded-lg overflow-hidden shrink-0 border border-zinc-700/60">
                <Image src="/images/thu-vien-2.webp" alt="Phòng Mix 2" fill className="object-cover" />
              </div>
              <div className="relative w-28 h-20 rounded-lg overflow-hidden shrink-0 border border-zinc-700/60">
                <Image src="/images/thu-vien-3.webp" alt="Phòng Mix 3" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Right Column: "Giữ phòng nhanh nhất" Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#17171c]/90 border border-[#2b2b36] shadow-2xl backdrop-blur-xl">
              <div className="mb-5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold">
                  Tư vấn tức thì
                </span>
                <h3 className="text-2xl font-heading font-bold text-white mt-1">
                  Giữ Phòng Nhanh Nhất
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Gửi nhu cầu, Mix sẽ liên hệ xác nhận tình trạng phòng trống ngay.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Đã Gửi Yêu Cầu Thành Công!
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Lễ tân Mix Boutique Hotel đang liên hệ qua SĐT{" "}
                    <span className="text-[#c5a880] font-bold">{formData.phone}</span> để xác nhận phòng.
                  </p>
                  <a
                    href="https://zalo.me/+84383104010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 rounded-lg bg-[#c5a880] text-black font-semibold text-xs uppercase hover:bg-[#dfc299]"
                  >
                    Nhắn Zalo Xác Nhận Ngay (Ưu tiên)
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ tên *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#202027] border border-[#2d2d38] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a880] transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Điện thoại *"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#202027] border border-[#2d2d38] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a880] transition-colors"
                    />
                  </div>

                  <div>
                    <select
                      aria-label="Chi nhánh mong muốn"
                      required
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#202027] border border-[#2d2d38] text-sm text-zinc-300 focus:outline-none focus:border-[#c5a880] transition-colors"
                    >
                      <option value="">Chi nhánh mong muốn *</option>
                      <option value="Mix Boutique Premium - Huỳnh Thúc Kháng">
                        Mix Boutique Premium - Huỳnh Thúc Kháng
                      </option>
                      <option value="Mix Boutique Hotel - 256B Đặng Tiến Đông">
                        Mix Boutique Hotel - 256B Đặng Tiến Đông
                      </option>
                      <option value="Mix Boutique Hotel - 20 Phúc La Hà Đông">
                        Mix Boutique Hotel - 20 Phúc La Hà Đông
                      </option>
                    </select>
                  </div>

                  <div>
                    <select
                      aria-label="Nhu cầu đặt phòng"
                      required
                      value={formData.need}
                      onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#202027] border border-[#2d2d38] text-sm text-zinc-300 focus:outline-none focus:border-[#c5a880] transition-colors"
                    >
                      <option value="">Nhu cầu *</option>
                      <option value="Nghỉ giờ">Nghỉ giờ</option>
                      <option value="Qua đêm">Qua đêm</option>
                      <option value="Trang trí sinh nhật / kỷ niệm">
                        Trang trí sinh nhật / kỷ niệm
                      </option>
                      <option value="Tư vấn concept phù hợp">Tư vấn concept phù hợp</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black font-semibold text-sm uppercase tracking-wide hover:shadow-[0_10px_25px_rgba(197,168,128,0.3)] hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    Gửi Yêu Cầu Giữ Phòng
                  </button>

                  <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
                    Chưa đặt cọc: Mix hỗ trợ giữ phòng 15 - 20 phút tùy tình trạng phòng.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
