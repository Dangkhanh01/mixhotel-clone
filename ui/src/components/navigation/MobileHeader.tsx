"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown, Phone } from "lucide-react";

interface MobileHeaderProps {
  onOpenBooking?: () => void;
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
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 z-[90] bg-[#110d0a]/95 backdrop-blur-md border-b border-[#c88922]/20 px-4 flex items-center justify-between shadow-lg">
        <Link href="/" className="relative block w-32 h-10">
          <Image
            src="/images/mix-boutique-logo.png"
            alt="Mix Boutique Hotel"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#c88922] to-[#ffe2a0] text-[#1a0f05] font-bold text-xs uppercase font-philosopher shadow-md tracking-wider"
          >
            ĐẶT PHÒNG
          </button>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Mở menu"
            className="p-2 rounded-lg text-[#ffe2a0] hover:text-white hover:bg-zinc-800 transition-colors"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={closeDrawer}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm h-full bg-[#140e0a] border-r border-[#c88922]/30 shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#c88922]/20 bg-[#0d0907]">
              <div className="relative w-28 h-8">
                <Image
                  src="/images/mix-boutique-logo.png"
                  alt="Mix Boutique Hotel"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Đóng menu"
                className="w-8 h-8 rounded-full bg-[#c88922]/20 text-[#ffe2a0] flex items-center justify-center hover:bg-[#c88922]/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <nav className="p-4 space-y-1 divide-y divide-[#c88922]/10 flex-1 font-philosopher">
              <Link
                href="/"
                onClick={closeDrawer}
                style={{ color: '#fff8ec' }}
                className="block py-3 text-sm font-bold hover:text-[#ffe2a0] transition-colors uppercase tracking-wider"
              >
                TRANG CHỦ
              </Link>

              <Link
                href="/gioi-thieu"
                onClick={closeDrawer}
                style={{ color: '#fff8ec' }}
                className="block py-3 text-sm font-bold hover:text-[#ffe2a0] transition-colors uppercase tracking-wider"
              >
                GIỚI THIỆU
              </Link>

              {/* Submenu: Khách sạn tình yêu */}
              <div className="pt-2">
                <button
                  onClick={() => toggleSubmenu("rooms")}
                  style={{ color: '#fff8ec' }}
                  className="w-full flex items-center justify-between py-2 text-sm font-bold hover:text-[#ffe2a0] transition-colors uppercase tracking-wider"
                >
                  <span>KHÁCH SẠN TÌNH YÊU</span>
                  {openSubmenu === "rooms" ? (
                    <ChevronDown className="w-4 h-4 text-[#ffe2a0]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#ffe2a0]/60" />
                  )}
                </button>
                {openSubmenu === "rooms" && (
                  <div className="pl-4 py-2 space-y-2 border-l-2 border-[#c88922]/40 ml-1">
                    <Link
                      href="/khach-san-tinh-yeu"
                      onClick={closeDrawer}
                      style={{ color: '#ffe2a0' }}
                      className="block text-xs font-bold hover:underline uppercase"
                    >
                      TẤT CẢ CHI NHÁNH & PHÒNG
                    </Link>
                    <Link
                      href="/mix-boutique-premium-hotel"
                      onClick={closeDrawer}
                      style={{ color: '#d4d4d8' }}
                      className="block text-xs font-medium hover:text-[#ffe2a0] uppercase"
                    >
                      MIX BOUTIQUE PREMIUM
                    </Link>
                    <Link
                      href="/mix-boutique-hotel-256b-dang-tien-dong"
                      onClick={closeDrawer}
                      style={{ color: '#d4d4d8' }}
                      className="block text-xs font-medium hover:text-[#ffe2a0] uppercase"
                    >
                      MIX 256B ĐẶNG TIẾN ĐÔNG
                    </Link>
                    <Link
                      href="/mix-boutique-hotel-20-phuc-la-ha-dong"
                      onClick={closeDrawer}
                      style={{ color: '#d4d4d8' }}
                      className="block text-xs font-medium hover:text-[#ffe2a0] uppercase"
                    >
                      MIX 20 PHÚC LA HÀ ĐÔNG
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/gallery"
                onClick={closeDrawer}
                style={{ color: '#fff8ec' }}
                className="block py-3 text-sm font-bold hover:text-[#ffe2a0] transition-colors uppercase tracking-wider"
              >
                GALLERY
              </Link>

              {/* Submenu: Tin tức */}
              <div className="pt-2">
                <button
                  onClick={() => toggleSubmenu("news")}
                  style={{ color: '#fff8ec' }}
                  className="w-full flex items-center justify-between py-2 text-sm font-bold hover:text-[#ffe2a0] transition-colors uppercase tracking-wider"
                >
                  <span>TIN TỨC</span>
                  {openSubmenu === "news" ? (
                    <ChevronDown className="w-4 h-4 text-[#ffe2a0]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#ffe2a0]/60" />
                  )}
                </button>
                {openSubmenu === "news" && (
                  <div className="pl-4 py-2 space-y-2 border-l-2 border-[#c88922]/40 ml-1">
                    <Link
                      href="/tin-tuc"
                      onClick={closeDrawer}
                      className="block text-xs font-bold text-[#ffe2a0] hover:underline uppercase"
                    >
                      TẤT CẢ BÀI VIẾT
                    </Link>
                    <Link
                      href="/tin-tuc?cat=review"
                      onClick={closeDrawer}
                      className="block text-xs font-medium text-zinc-300 hover:text-[#ffe2a0] uppercase"
                    >
                      REVIEW KHÁCH SẠN TÌNH YÊU
                    </Link>
                    <Link
                      href="/tin-tuc?cat=hen-ho"
                      onClick={closeDrawer}
                      className="block text-xs font-medium text-zinc-300 hover:text-[#ffe2a0] uppercase"
                    >
                      ĐỊA ĐIỂM HẸN HÒ DÀNH CHO CẶP ĐÔI
                    </Link>
                    <Link
                      href="/tin-tuc?cat=di-choi"
                      onClick={closeDrawer}
                      className="block text-xs font-medium text-zinc-300 hover:text-[#ffe2a0] uppercase"
                    >
                      ĐỊA ĐIỂM ĐI CHƠI CHO CẶP ĐÔI
                    </Link>
                    <Link
                      href="/tin-tuc?cat=qua-tang"
                      onClick={closeDrawer}
                      className="block text-xs font-medium text-zinc-300 hover:text-[#ffe2a0] uppercase"
                    >
                      GỢI Ý QUÀ TẶNG CÁC DỊP LỄ
                    </Link>
                    <Link
                      href="/tin-tuc?cat=kien-thuc"
                      onClick={closeDrawer}
                      className="block text-xs font-medium text-zinc-300 hover:text-[#ffe2a0] uppercase"
                    >
                      KIẾN THỨC VỀ KHÁCH SẠN
                    </Link>
                    <Link
                      href="/tin-tuc?cat=cam-nang"
                      onClick={closeDrawer}
                      className="block text-xs font-medium text-zinc-300 hover:text-[#ffe2a0] uppercase"
                    >
                      CẨM NANG TÌNH YÊU
                    </Link>
                    <Link
                      href="/tin-tuc?cat=dia-chi"
                      onClick={closeDrawer}
                      className="block text-xs font-medium text-zinc-300 hover:text-[#ffe2a0] uppercase"
                    >
                      CÁC ĐỊA CHỈ KHÁCH SẠN TÌNH YÊU
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/su-kien"
                onClick={closeDrawer}
                style={{ color: '#fff8ec' }}
                className="block py-3 text-sm font-bold hover:text-[#ffe2a0] transition-colors uppercase tracking-wider"
              >
                SỰ KIỆN
              </Link>

              {/* Submenu: Chính sách */}
              <div className="pt-2">
                <button
                  onClick={() => toggleSubmenu("policies")}
                  style={{ color: '#fff8ec' }}
                  className="w-full flex items-center justify-between py-2 text-sm font-bold hover:text-[#ffe2a0] transition-colors uppercase tracking-wider"
                >
                  <span>CHÍNH SÁCH</span>
                  {openSubmenu === "policies" ? (
                    <ChevronDown className="w-4 h-4 text-[#ffe2a0]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#ffe2a0]/60" />
                  )}
                </button>
                {openSubmenu === "policies" && (
                  <div className="pl-4 py-2 space-y-2 border-l-2 border-[#c88922]/40 ml-1">
                    <Link
                      href="/chinh-sach-thanh-toan"
                      onClick={closeDrawer}
                      style={{ color: '#d4d4d8' }}
                      className="block text-xs font-medium hover:text-[#ffe2a0] uppercase"
                    >
                      CHÍNH SÁCH THANH TOÁN
                    </Link>
                    <Link
                      href="/chinh-sach-bao-mat-thong-tin"
                      onClick={closeDrawer}
                      style={{ color: '#d4d4d8' }}
                      className="block text-xs font-medium hover:text-[#ffe2a0] uppercase"
                    >
                      CHÍNH SÁCH BẢO MẬT THÔNG TIN
                    </Link>
                    <Link
                      href="/chinh-sach-dat-tra-phong"
                      onClick={closeDrawer}
                      style={{ color: '#d4d4d8' }}
                      className="block text-xs font-medium hover:text-[#ffe2a0] uppercase"
                    >
                      CHÍNH SÁCH ĐẶT TRẢ PHÒNG
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/lien-he"
                onClick={closeDrawer}
                style={{ color: '#fff8ec' }}
                className="block py-3 text-sm font-bold hover:text-[#ffe2a0] transition-colors uppercase tracking-wider"
              >
                LIÊN HỆ
              </Link>
            </nav>

            {/* Quick Hotline Footer in Drawer */}
            <div className="p-4 border-t border-[#c88922]/20 bg-[#0d0907]">
              <button
                onClick={() => {
                  closeDrawer();
                  if (onOpenBooking) onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#c88922] to-[#ffe2a0] text-[#1a0f05] font-bold text-sm shadow-lg font-philosopher tracking-wider uppercase"
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
