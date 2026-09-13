"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown, Phone } from "lucide-react";

interface MobileHeaderProps {
  onOpenBooking: () => void;
}

export default function MobileHeader({ onOpenBooking }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 z-[90] bg-[#0f0f12]/95 backdrop-blur-md border-b border-[#22222a] px-4 flex items-center justify-between shadow-lg">
        <Link href="/" className="relative block w-28 h-8">
          <Image
            src="/images/logo.png"
            alt="Mix Boutique Hotel"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded-md bg-[#c5a880] text-black font-semibold text-xs uppercase"
          >
            Đặt Phòng
          </button>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Mở menu"
            className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Slide-in Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[150] flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={closeDrawer}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm h-full bg-[#141418] border-r border-[#262630] shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="relative w-28 h-7">
                <Image
                  src="/images/logo.png"
                  alt="Mix Boutique Hotel"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Đóng menu"
                className="w-8 h-8 rounded-full bg-[#c92a2a] text-white flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <nav className="p-4 space-y-1 divide-y divide-zinc-800/60 flex-1">
              <a
                href="#top"
                onClick={closeDrawer}
                className="block py-3 text-sm font-semibold text-zinc-200 hover:text-[#c5a880] transition-colors"
              >
                TRANG CHỦ
              </a>

              <a
                href="#why"
                onClick={closeDrawer}
                className="block py-3 text-sm font-semibold text-zinc-200 hover:text-[#c5a880] transition-colors"
              >
                GIỚI THIỆU
              </a>

              {/* Submenu: Khách sạn tình yêu */}
              <div className="pt-2">
                <button
                  onClick={() => toggleSubmenu("rooms")}
                  className="w-full flex items-center justify-between py-2 text-sm font-semibold text-zinc-200 hover:text-[#c5a880] transition-colors"
                >
                  <span>KHÁCH SẠN TÌNH YÊU</span>
                  {openSubmenu === "rooms" ? (
                    <ChevronDown className="w-4 h-4 text-[#c5a880]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  )}
                </button>
                {openSubmenu === "rooms" && (
                  <div className="pl-4 py-2 space-y-2 border-l-2 border-[#c5a880]/30 ml-1">
                    <a
                      href="#branches"
                      onClick={closeDrawer}
                      className="block text-xs font-medium text-zinc-400 hover:text-[#c5a880]"
                    >
                      MIX BOUTIQUE PREMIUM
                    </a>
                    <a
                      href="#branches"
                      onClick={closeDrawer}
                      className="block text-xs font-medium text-zinc-400 hover:text-[#c5a880]"
                    >
                      MIX 256B ĐẶNG TIẾN ĐÔNG
                    </a>
                    <a
                      href="#branches"
                      onClick={closeDrawer}
                      className="block text-xs font-medium text-zinc-400 hover:text-[#c5a880]"
                    >
                      MIX 20 PHÚC LA HÀ ĐÔNG
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#real-photos"
                onClick={closeDrawer}
                className="block py-3 text-sm font-semibold text-zinc-200 hover:text-[#c5a880] transition-colors"
              >
                ẢNH THẬT PHÒNG THẬT
              </a>

              <a
                href="#videos"
                onClick={closeDrawer}
                className="block py-3 text-sm font-semibold text-zinc-200 hover:text-[#c5a880] transition-colors"
              >
                VIDEO REVIEW
              </a>

              <a
                href="#prices"
                onClick={closeDrawer}
                className="block py-3 text-sm font-semibold text-zinc-200 hover:text-[#c5a880] transition-colors"
              >
                BẢNG GIÁ
              </a>

              <a
                href="#events"
                onClick={closeDrawer}
                className="block py-3 text-sm font-semibold text-zinc-200 hover:text-[#c5a880] transition-colors"
              >
                TRANG TRÍ SỰ KIỆN
              </a>

              <a
                href="#branches"
                onClick={closeDrawer}
                className="block py-3 text-sm font-semibold text-zinc-200 hover:text-[#c5a880] transition-colors"
              >
                HỆ THỐNG CHI NHÁNH
              </a>

              <a
                href="#faq"
                onClick={closeDrawer}
                className="block py-3 text-sm font-semibold text-zinc-200 hover:text-[#c5a880] transition-colors"
              >
                CÂU HỎI THƯỜNG GẶP (FAQ)
              </a>
            </nav>

            {/* Quick Hotline Footer in Drawer */}
            <div className="p-4 border-t border-zinc-800 bg-[#0f0f12]">
              <button
                onClick={() => {
                  closeDrawer();
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black font-semibold text-sm shadow-lg"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>LIÊN HỆ ĐẶT PHÒNG</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
