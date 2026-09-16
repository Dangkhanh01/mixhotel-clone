"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

interface VideoSectionProps {
  onOpenZalo?: () => void;
}

export default function VideoSection({ onOpenZalo }: VideoSectionProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const { openBranchSelect } = useModal();

  const handleZalo = () => {
    if (onOpenZalo) {
      onOpenZalo();
    } else {
      openBranchSelect("zalo");
    }
  };

  return (
    <section id="videos" className="mixLuxuryVideos py-20 md:py-28 bg-[#0f0f12] relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-[#c5a880]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#c92a2a]/10 blur-[130px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 2 Vertical Shorts */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {/* Short 1 */}
            <div className="mixLuxuryShortItem space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#c5a880]">01</span>
                <p className="text-xs font-semibold text-zinc-300 line-clamp-1">
                  Đêm ngàn sao cho đôi tình nhân THĂNG HOA RẠO RỰC Mixboutique Hotel
                </p>
              </div>
              <div
                onClick={() => setActiveVideoId("qyeqmaNJYbY")}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-zinc-800 group cursor-pointer shadow-xl"
              >
                <Image
                  src="/images/yt-short-1.jpg"
                  alt="Đêm ngàn sao"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#c5a880]/90 text-black flex items-center justify-center shadow-[0_0_25px_rgba(197,168,128,0.5)] group-hover:scale-110 transition-transform">
                    <i className="fa fa-play text-lg ml-0.5"></i>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="text-[11px] font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Xem video ngắn
                  </span>
                </div>
              </div>
            </div>

            {/* Short 2 */}
            <div className="mixLuxuryShortItem space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#c5a880]">02</span>
                <p className="text-xs font-semibold text-zinc-300 line-clamp-1">
                  TOGETHER and to Mixboutique Hotel đưa nhau lên tới &apos;đỉnh chóp&apos;
                </p>
              </div>
              <div
                onClick={() => setActiveVideoId("_3pSDfR8Ccw")}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-zinc-800 group cursor-pointer shadow-xl"
              >
                <Image
                  src="/images/yt-short-2.jpg"
                  alt="Together Mix Boutique"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#c5a880]/90 text-black flex items-center justify-center shadow-[0_0_25px_rgba(197,168,128,0.5)] group-hover:scale-110 transition-transform">
                    <i className="fa fa-play text-lg ml-0.5"></i>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="text-[11px] font-medium text-white/90 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Xem video ngắn
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Video Info & Channel Card */}
          <div className="mixLuxuryVideoPanel lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold">
                VIDEO TỪ KÊNH MIX
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                Video phòng thật giúp bạn yên tâm đặt phòng
              </h2>
              <p className="text-sm md:text-base text-zinc-400">
                Cảm nhận rõ không gian, ánh sáng, bồn tắm, giường ngủ và toàn bộ tiện nghi thực tế trước khi đến.
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <i className="fa fa-check-circle text-[#c5a880] text-base shrink-0 mt-1"></i>
                <p className="text-sm text-zinc-300">
                  Video quay trực tiếp tại từng hạng phòng, hình ảnh chân thực 100%.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <i className="fa fa-check-circle text-[#c5a880] text-base shrink-0 mt-1"></i>
                <p className="text-sm text-zinc-300">
                  Lựa chọn không gian, tiện nghi và concept bạn yêu thích trước khi đặt.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <i className="fa fa-check-circle text-[#c5a880] text-base shrink-0 mt-1"></i>
                <p className="text-sm text-zinc-300">
                  Nhắn Zalo ngay dưới video để được tư vấn và giữ phòng nhanh chóng.
                </p>
              </div>
            </div>

            {/* Video preview channel player */}
            <div
              onClick={() => setActiveVideoId("Ts4seBpirOA")}
              className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 group cursor-pointer shadow-xl"
            >
              <Image
                src="https://img.youtube.com/vi/Ts4seBpirOA/maxresdefault.jpg"
                alt="Mix Boutique Hotel Channel Preview"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#c5a880] text-black flex items-center justify-center shadow-[0_0_30px_rgba(197,168,128,0.6)] group-hover:scale-110 transition-transform">
                  <i className="fa fa-play text-2xl ml-1"></i>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleZalo}
                className="callContactLocate inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c5a880] hover:bg-[#dfc299] text-black font-semibold text-sm transition-colors shadow-lg cursor-pointer border-none"
              >
                <i className="fa fa-commenting text-base"></i>
                <span>Nhắn Zalo Chọn Phòng</span>
              </button>

              <a
                href="https://www.youtube.com/@mixboutiquehotel921"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#17171c] hover:bg-[#202027] text-white border border-zinc-700/80 font-medium text-sm transition-colors"
              >
                <span>Xem Kênh YouTube</span>
                <i className="fa fa-external-link text-xs text-zinc-400"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-zinc-700 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer border-none"
            >
              <i className="fa fa-times text-lg"></i>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
