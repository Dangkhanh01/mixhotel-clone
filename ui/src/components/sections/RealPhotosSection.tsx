"use client";

import React from "react";
import Image from "next/image";

interface RealPhotosSectionProps {
  onSelectPhoto?: (concept: string) => void;
}

const photoTiles = [
  {
    image: "/images/photo-tile-bdsm.webp",
    kicker: "HOT CONCEPT",
    title: "Dụng cụ BDSM",
    isLarge: true,
  },
  {
    image: "/images/photo-tile-bathtub.webp",
    kicker: "Bathtub room",
    title: "Bồn tắm Jacuzzi",
  },
  {
    image: "/images/photo-tile-cosplay.jpg",
    kicker: "Romantic",
    title: "Cosplay",
  },
  {
    image: "/images/photo-tile-tantra.webp",
    kicker: "Boutique mood",
    title: "Ghế tình yêu",
  },
  {
    image: "/images/photo-tile-netflix.webp",
    kicker: "Netflix & Chill",
    title: "Smart Tivi có Netflix",
  },
];

export default function RealPhotosSection({ onSelectPhoto }: RealPhotosSectionProps) {
  return (
    <section id="real-photos" className="py-20 md:py-28 bg-[#121216] relative overflow-hidden">
      {/* Subtle Auras */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#c5a880]/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#c92a2a]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Head */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold">
            Ảnh thật phòng thật
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-white tracking-tight">
            Xem ảnh thật 100% từng phòng để dễ dàng chọn không gian trước khi đặt
          </h2>
          <p className="text-sm md:text-base text-zinc-400">
            Mỗi hạng phòng đều có ảnh thực tế của bồn tắm, máy chiếu, ghế tình yêu, gương trần và các tiện nghi nổi bật.
          </p>
        </div>

        {/* Photo Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Featured Room */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-[380px] lg:min-h-[520px] group border border-zinc-800">
            <Image
              src="/images/photo-stage-featured.webp"
              alt="Ảnh thật phòng VIP Mix Boutique Hotel"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Badge */}
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-zinc-700/60 flex items-center gap-2">
              <span className="text-xs font-mono text-[#c5a880] font-bold">01</span>
              <span className="text-xs text-zinc-300 uppercase font-semibold tracking-wider">
                Featured room
              </span>
            </div>

            {/* Caption */}
            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                Ảnh nổi bật
              </span>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white">
                Không gian boutique riêng tư, ánh sáng rõ và có gu
              </h3>
            </div>
          </div>

          {/* 5-tile Subgrid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {photoTiles.map((tile) => (
              <div
                key={tile.title}
                onClick={() => onSelectPhoto?.(tile.title)}
                className={`relative rounded-xl overflow-hidden border border-zinc-800/80 group cursor-pointer ${
                  tile.isLarge ? "col-span-2 h-44 md:h-52" : "h-40 md:h-48"
                }`}
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-3.5 left-4 right-4">
                  <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                    tile.kicker.includes("HOT") ? "text-[#c92a2a]" : "text-[#c5a880]"
                  }`}>
                    {tile.kicker}
                  </span>
                  <strong className="text-sm md:text-base font-heading font-semibold text-white group-hover:text-[#c5a880] transition-colors">
                    {tile.title}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
