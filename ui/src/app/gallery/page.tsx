"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Eye, X } from "lucide-react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileBottomNav from "@/components/floating/MobileBottomNav";
import ContactModal from "@/components/ui/ContactModal";
import FooterSection from "@/components/sections/FooterSection";

export default function GalleryPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 1,
      name: "VIP Room 469 - Cloud Nine",
      branch: "hoang-ngan",
      branchName: "186 Hoàng Ngân",
      image: "/images/469-moonlit-love.jpg",
      tag: "VIP Suite",
    },
    {
      id: 2,
      name: "Room 302 - Karma Kamasutra",
      branch: "dang-tien-dong",
      branchName: "256B Đặng Tiến Đông",
      image: "/images/302-karma.jpg",
      tag: "BDSM Mood",
    },
    {
      id: 3,
      name: "Room 202 - Galaxy Starlight",
      branch: "phuc-la",
      branchName: "20 Phúc La",
      image: "/images/202-galaxy.jpg",
      tag: "Trần ngàn sao",
    },
    {
      id: 4,
      name: "Bồn Tắm Sục Jacuzzi Đôi Lãng Mạn",
      branch: "hoang-ngan",
      branchName: "186 Hoàng Ngân",
      image: "/images/tvha-1.webp",
      tag: "Jacuzzi",
    },
    {
      id: 5,
      name: "Không Gian Tiệc Kỷ Niệm Nến & Hoa",
      branch: "dang-tien-dong",
      branchName: "256B Đặng Tiến Đông",
      image: "/images/tvha-2.webp",
      tag: "Sự kiện",
    },
    {
      id: 6,
      name: "Room 401 - Katana Nhật Bản",
      branch: "phuc-la",
      branchName: "20 Phúc La",
      image: "/images/tvha-3.webp",
      tag: "Geisha Style",
    },
    {
      id: 7,
      name: "Phòng Eden Ánh Sáng Tự Nhiên",
      branch: "hoang-ngan",
      branchName: "186 Hoàng Ngân",
      image: "/images/tvha-4.webp",
      tag: "Eden",
    },
    {
      id: 8,
      name: "Chi Tiết Ghế Tình Yêu Tantra Độc Bản",
      branch: "dang-tien-dong",
      branchName: "256B Đặng Tiến Đông",
      image: "/images/tvha-5.webp",
      tag: "Tantra",
    },
    {
      id: 9,
      name: "Góc Rượu Vang & Đèn Ngủ Cổ Điển",
      branch: "phuc-la",
      branchName: "20 Phúc La",
      image: "/images/tvha-6.webp",
      tag: "Lãng mạn",
    },
  ];

  const filteredItems =
    selectedBranch === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.branch === selectedBranch);

  return (
    <div className="min-h-screen bg-[#070503] text-[#fff8ec] selection:bg-[#c88922] selection:text-black">
      <DesktopHeader onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileHeader onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Breadcrumbs */}
      <div className="pt-24 pb-4 border-b border-[#c88922]/15 bg-[#0f0b08]">
        <div className="max-w-[1240px] mx-auto px-5 flex items-center gap-2 text-xs font-semibold text-zinc-400">
          <Link href="/" className="text-[#ffe2a0]/80 hover:text-[#ffe2a0] transition-colors font-medium">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-[#ffe2a0]">Gallery</span>
        </div>
      </div>

      <main className="max-w-[1240px] mx-auto px-5 py-12 md:py-16">
        <div className="text-center mb-10">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[#c88922] uppercase mb-2 font-philosopher">
            HÌNH ẢNH THỰC TẾ 100%
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-philosopher text-[#fff8ec] tracking-tight">
            GALLERY PHÒNG CONCEPT
          </h1>
          <div className="w-20 h-0.5 bg-[#c88922]/60 mx-auto mt-4" />
        </div>

        {/* Branch Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          <button
            onClick={() => setSelectedBranch("all")}
            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold font-philosopher tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              selectedBranch === "all"
                ? "bg-gradient-to-r from-[#c88922] to-[#ffe2a0] text-[#1a0f05] shadow-lg scale-105"
                : "bg-[#140e0a] border border-[#c88922]/30 text-zinc-300 hover:border-[#c88922] hover:text-[#ffe2a0]"
            }`}
          >
            Tất Cả Hình Ảnh
          </button>
          <button
            onClick={() => setSelectedBranch("hoang-ngan")}
            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold font-philosopher tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              selectedBranch === "hoang-ngan"
                ? "bg-gradient-to-r from-[#c88922] to-[#ffe2a0] text-[#1a0f05] shadow-lg scale-105"
                : "bg-[#140e0a] border border-[#c88922]/30 text-zinc-300 hover:border-[#c88922] hover:text-[#ffe2a0]"
            }`}
          >
            CS1: 186 Hoàng Ngân
          </button>
          <button
            onClick={() => setSelectedBranch("dang-tien-dong")}
            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold font-philosopher tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              selectedBranch === "dang-tien-dong"
                ? "bg-gradient-to-r from-[#c88922] to-[#ffe2a0] text-[#1a0f05] shadow-lg scale-105"
                : "bg-[#140e0a] border border-[#c88922]/30 text-zinc-300 hover:border-[#c88922] hover:text-[#ffe2a0]"
            }`}
          >
            CS2: 256B Đặng Tiến Đông
          </button>
          <button
            onClick={() => setSelectedBranch("phuc-la")}
            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold font-philosopher tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              selectedBranch === "phuc-la"
                ? "bg-gradient-to-r from-[#c88922] to-[#ffe2a0] text-[#1a0f05] shadow-lg scale-105"
                : "bg-[#140e0a] border border-[#c88922]/30 text-zinc-300 hover:border-[#c88922] hover:text-[#ffe2a0]"
            }`}
          >
            CS3: 20 Phúc La Hà Đông
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item.image)}
              className="rounded-3xl overflow-hidden bg-[#140e0a] border border-[#c88922]/25 shadow-xl hover:border-[#c88922]/70 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative w-full h-64 md:h-72 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#ffe2a0] border border-[#c88922]/30 text-xs font-bold font-philosopher">
                  {item.tag}
                </span>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#c88922]/80 backdrop-blur-md flex items-center justify-center text-black shadow-xl">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-5 text-center">
                <h3 className="text-base md:text-lg font-bold font-philosopher text-[#fff8ec] group-hover:text-[#ffe2a0] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-[#c88922] mt-1 font-medium">{item.branchName}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full h-[65vh] rounded-2xl overflow-hidden border border-[#c88922]/40"
          >
            <Image
              src={lightboxImage}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <FooterSection />
      <DesktopContactBar onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileBottomNav onOpenBooking={() => setIsBookingOpen(true)} />
      <ContactModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
