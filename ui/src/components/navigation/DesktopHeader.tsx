"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ChevronDown } from "lucide-react";

interface DesktopHeaderProps {
  onOpenBooking: () => void;
}

export default function DesktopHeader({ onOpenBooking }: DesktopHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`hidden lg:block fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-[#0f0f12]/95 backdrop-blur-md shadow-2xl py-3 border-b border-[#25252e]"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative flex items-center block w-32 h-10 transition-transform hover:scale-105">
          <Image
            src="/images/logo.png"
            alt="Mix Boutique Hotel"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-1">
          <a
            href="#top"
            className="px-3.5 py-2 text-sm font-medium text-zinc-200 hover:text-[#c5a880] transition-colors relative group"
          >
            TRANG CHỦ
            <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#c5a880] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>

          <a
            href="#why"
            className="px-3.5 py-2 text-sm font-medium text-zinc-200 hover:text-[#c5a880] transition-colors relative group"
          >
            GIỚI THIỆU
            <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#c5a880] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>

          {/* Dropdown: Khách sạn tình yêu */}
          <div className="relative group">
            <a
              href="#concept"
              className="px-3.5 py-2 text-sm font-medium text-zinc-200 group-hover:text-[#c5a880] transition-colors flex items-center gap-1"
            >
              KHÁCH SẠN TÌNH YÊU
              <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </a>
            <div className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-[#17171c] border border-[#2b2b36] shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <a
                href="#branches"
                className="block px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-[#c5a880] hover:bg-[#22222b] transition-colors"
              >
                MIX BOUTIQUE PREMIUM
              </a>
              <a
                href="#branches"
                className="block px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-[#c5a880] hover:bg-[#22222b] transition-colors"
              >
                MIX BOUTIQUE HOTEL 256B ĐẶNG TIẾN ĐÔNG
              </a>
              <a
                href="#branches"
                className="block px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-[#c5a880] hover:bg-[#22222b] transition-colors"
              >
                MIX BOUTIQUE HOTEL 20 PHÚC LA HÀ ĐÔNG
              </a>
            </div>
          </div>

          <a
            href="#real-photos"
            className="px-3.5 py-2 text-sm font-medium text-zinc-200 hover:text-[#c5a880] transition-colors relative group"
          >
            ẢNH THẬT
            <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#c5a880] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>

          <a
            href="#videos"
            className="px-3.5 py-2 text-sm font-medium text-zinc-200 hover:text-[#c5a880] transition-colors relative group"
          >
            VIDEO
            <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#c5a880] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>

          <a
            href="#prices"
            className="px-3.5 py-2 text-sm font-medium text-zinc-200 hover:text-[#c5a880] transition-colors relative group"
          >
            BẢNG GIÁ
            <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#c5a880] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>

          <a
            href="#events"
            className="px-3.5 py-2 text-sm font-medium text-zinc-200 hover:text-[#c5a880] transition-colors relative group"
          >
            SỰ KIỆN
            <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#c5a880] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>

          <a
            href="#branches"
            className="px-3.5 py-2 text-sm font-medium text-zinc-200 hover:text-[#c5a880] transition-colors relative group"
          >
            CHI NHÁNH
            <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#c5a880] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
        </nav>

        {/* CTA Button */}
        <button
          onClick={onOpenBooking}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <Phone className="w-4 h-4 fill-current" />
          <span>ĐẶT PHÒNG</span>
        </button>
      </div>
    </header>
  );
}
