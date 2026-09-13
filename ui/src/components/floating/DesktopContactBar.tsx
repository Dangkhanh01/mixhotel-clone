"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

interface DesktopContactBarProps {
  onOpenContact: (type: "messenger" | "zalo" | "phone") => void;
}

export default function DesktopContactBar({ onOpenContact }: DesktopContactBarProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Cụm liên hệ nhanh"
      className="hidden md:flex fixed right-3 top-2/3 -translate-y-1/2 z-[80] flex-col items-center gap-3 bg-[#17171c]/90 backdrop-blur-md p-2 rounded-2xl border border-[#2b2b36] shadow-2xl"
    >
      {/* Messenger */}
      <button
        onClick={() => onOpenContact("messenger")}
        aria-label="Chat Messenger"
        className="group relative flex flex-col items-center cursor-pointer"
      >
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-2 shadow-lg group-hover:scale-110 transition-transform">
          <Image
            src="/images/icon-messenger.webp"
            alt="Messenger"
            fill
            className="object-contain p-1.5"
          />
        </div>
        <span className="text-[10px] font-medium text-zinc-300 mt-0.5 group-hover:text-white">
          Chat Face
        </span>
      </button>

      {/* Zalo */}
      <button
        onClick={() => onOpenContact("zalo")}
        aria-label="Chat Zalo"
        className="group relative flex flex-col items-center cursor-pointer"
      >
        <div className="relative w-10 h-10 rounded-full bg-blue-600 p-2 shadow-lg group-hover:scale-110 transition-transform">
          <Image
            src="/images/icon-zalo.webp"
            alt="Zalo"
            fill
            className="object-contain p-1.5"
          />
        </div>
        <span className="text-[10px] font-medium text-zinc-300 mt-0.5 group-hover:text-white">
          Chat Zalo
        </span>
      </button>

      {/* Phone */}
      <button
        onClick={() => onOpenContact("phone")}
        aria-label="Gọi điện thoại"
        className="group relative flex flex-col items-center cursor-pointer"
      >
        <div className="relative w-10 h-10 rounded-full bg-[#c5a880] p-2 shadow-lg group-hover:scale-110 transition-transform">
          <Image
            src="/images/icon-phone-bar.svg"
            alt="Phone"
            fill
            className="object-contain p-2"
          />
        </div>
        <span className="text-[10px] font-medium text-zinc-300 mt-0.5 group-hover:text-white">
          Gọi Điện
        </span>
      </button>

      {/* Back to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Về đầu trang"
          className="mt-1 w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-[#c5a880] text-zinc-300 hover:text-black flex items-center justify-center transition-all animate-bounce-up cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </aside>
  );
}
