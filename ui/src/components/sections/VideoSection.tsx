"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X, ExternalLink, MessageSquare, CheckCircle } from "lucide-react";

interface VideoSectionProps {
  onOpenZalo: () => void;
}

export default function VideoSection({ onOpenZalo }: VideoSectionProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <section id="videos" className="py-20 md:py-28 bg-[#0f0f12] relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-[#c5a880]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#c92a2a]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 2 Vertical Shorts */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {/* Short 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#c5a880]">01</span>
                <p className="text-xs font-semibold text-zinc-300 line-clamp-1">
                  Đêm ngàn sao cho đôi tình nhân
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
                    <Play className="w-6 h-6 fill-current ml-1" />
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
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#c5a880]">02</span>
                <p className="text-xs font-semibold text-zinc-300 line-clamp-1">
                  Together - Phút yêu đầu
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
                    <Play className="w-6 h-6 fill-current ml-1" />
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
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold">
                Video từ kênh Mix
              </span>
              <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-white tracking-tight">
                Video phòng thật giúp bạn yên tâm đặt phòng
              </h2>
              <p className="text-sm md:text-base text-zinc-400">
                Cảm nhận rõ không gian, ánh sáng, bồn tắm, giường ngủ và toàn bộ tiện nghi thực tế trước khi đến.
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300">
                  Video quay trực tiếp tại từng hạng phòng, hình ảnh chân thực 100%.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300">
                  Lựa chọn không gian, tiện nghi và concept bạn yêu thích trước khi đặt.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300">
                  Nhắn Zalo ngay dưới video để được tư vấn và giữ phòng nhanh chóng.
                </p>
              </div>
            </div>

            {/* Channel Highlight Card */}
            <div
              onClick={() => setActiveVideoId("Ts4seBpirOA")}
              className="relative h-44 md:h-48 rounded-2xl overflow-hidden border border-zinc-800 group cursor-pointer shadow-2xl"
            >
              <Image
                src="/images/yt-channel.jpg"
                alt="Kênh YouTube Mix Boutique Hotel"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#c5a880] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <p className="text-xs font-semibold text-white line-clamp-1">
                  Mixboutique nâng cấp TRÊN TÌNH BẠN DƯỚI TÌNH YÊU
                </p>
                <span className="text-[11px] font-mono text-[#c5a880] font-bold">Watch more</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onOpenZalo}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black font-semibold text-xs tracking-wider uppercase shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Nhắn Zalo Chọn Phòng</span>
              </button>
              <a
                href="https://www.youtube.com/@hotelmixboutique1110"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-white font-semibold text-xs tracking-wider uppercase border border-zinc-700 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Xem Kênh YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
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
