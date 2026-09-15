"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ChevronDown } from "lucide-react";

interface DesktopHeaderProps {
  onOpenBooking?: () => void;
}

export default function DesktopHeader({ onOpenBooking }: DesktopHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header
      className={`hidden lg:block fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-[#110d0a]/95 backdrop-blur-md border-b border-[#c88922]/20 py-3 shadow-2xl"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 border-b border-transparent"
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative block w-40 h-12 flex-shrink-0 group">
          <Image
            src="/images/mix-boutique-logo.png"
            alt="Mix Boutique Hotel"
            fill
            className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-7">
          {/* GIỚI THIỆU */}
          <Link
            href="/gioi-thieu"
            className="text-[14.5px] font-bold tracking-[0.05em] !text-[#fff8ec] hover:!text-[#ffe2a0] transition-colors font-philosopher uppercase"
          >
            GIỚI THIỆU
          </Link>

          {/* KHÁCH SẠN TÌNH YÊU */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("rooms")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/khach-san-tinh-yeu"
              onClick={closeDropdown}
              className={`text-[14.5px] font-bold tracking-[0.05em] transition-colors flex items-center gap-1.5 font-philosopher uppercase ${
                activeDropdown === "rooms" ? "!text-[#ffe2a0]" : "!text-[#fff8ec] hover:!text-[#ffe2a0]"
              }`}
            >
              KHÁCH SẠN TÌNH YÊU
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 text-[#ffe2a0] ${
                  activeDropdown === "rooms" ? "rotate-180" : ""
                }`}
              />
            </Link>
            <ul
              className={`absolute top-full left-0 w-72 rounded-xl bg-[#140e0a]/98 border border-[#c88922]/30 shadow-2xl py-2 transition-all duration-200 transform z-50 backdrop-blur-md ${
                activeDropdown === "rooms"
                  ? "opacity-100 visible translate-y-0 pointer-events-auto"
                  : "opacity-0 invisible translate-y-2 pointer-events-none"
              }`}
            >
              <li>
                <Link
                  href="/mix-boutique-premium-hotel"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  MIX BOUTIQUE PREMIUM
                </Link>
              </li>
              <li>
                <Link
                  href="/mix-boutique-hotel-256b-dang-tien-dong"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  MIX BOUTIQUE HOTEL 256B ĐẶNG TIẾN ĐÔNG
                </Link>
              </li>
              <li>
                <Link
                  href="/mix-boutique-hotel-20-phuc-la-ha-dong"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  MIX BOUTIQUE HOTEL 20 PHÚC LA HÀ ĐÔNG
                </Link>
              </li>
            </ul>
          </div>

          {/* GALLERY */}
          <Link
            href="/gallery"
            className="text-[14.5px] font-bold tracking-[0.05em] !text-[#fff8ec] hover:!text-[#ffe2a0] transition-colors font-philosopher uppercase"
          >
            GALLERY
          </Link>

          {/* TIN TỨC */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("news")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/tin-tuc"
              onClick={closeDropdown}
              className={`text-[14.5px] font-bold tracking-[0.05em] transition-colors flex items-center gap-1.5 font-philosopher uppercase ${
                activeDropdown === "news" ? "!text-[#ffe2a0]" : "!text-[#fff8ec] hover:!text-[#ffe2a0]"
              }`}
            >
              TIN TỨC
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 text-[#ffe2a0] ${
                  activeDropdown === "news" ? "rotate-180" : ""
                }`}
              />
            </Link>
            <ul
              className={`absolute top-full left-0 w-80 rounded-xl bg-[#140e0a]/98 border border-[#c88922]/30 shadow-2xl py-2 transition-all duration-200 transform z-50 backdrop-blur-md ${
                activeDropdown === "news"
                  ? "opacity-100 visible translate-y-0 pointer-events-auto"
                  : "opacity-0 invisible translate-y-2 pointer-events-none"
              }`}
            >
              <li>
                <Link
                  href="/tin-tuc?cat=review"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  REVIEW KHÁCH SẠN TÌNH YÊU
                </Link>
              </li>
              <li>
                <Link
                  href="/tin-tuc?cat=hen-ho"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  ĐỊA ĐIỂM HẸN HÒ DÀNH CHO CẶP ĐÔI
                </Link>
              </li>
              <li>
                <Link
                  href="/tin-tuc?cat=di-choi"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  ĐỊA ĐIỂM ĐI CHƠI CHO CẶP ĐÔI
                </Link>
              </li>
              <li>
                <Link
                  href="/tin-tuc?cat=qua-tang"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  GỢI Ý QUÀ TẶNG CÁC DỊP LỄ
                </Link>
              </li>
              <li>
                <Link
                  href="/tin-tuc?cat=kien-thuc"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  KIẾN THỨC VỀ KHÁCH SẠN
                </Link>
              </li>
              <li>
                <Link
                  href="/tin-tuc?cat=cam-nang"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  CẨM NANG TÌNH YÊU
                </Link>
              </li>
              <li>
                <Link
                  href="/tin-tuc?cat=dia-chi"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  CÁC ĐỊA CHỈ KHÁCH SẠN TÌNH YÊU
                </Link>
              </li>
            </ul>
          </div>

          {/* SỰ KIỆN */}
          <Link
            href="/su-kien"
            className="text-[14.5px] font-bold tracking-[0.05em] !text-[#fff8ec] hover:!text-[#ffe2a0] transition-colors font-philosopher uppercase"
          >
            SỰ KIỆN
          </Link>

          {/* CHÍNH SÁCH */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("policies")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/chinh-sach"
              onClick={closeDropdown}
              className={`text-[14.5px] font-bold tracking-[0.05em] transition-colors flex items-center gap-1.5 font-philosopher uppercase ${
                activeDropdown === "policies" ? "!text-[#ffe2a0]" : "!text-[#fff8ec] hover:!text-[#ffe2a0]"
              }`}
            >
              CHÍNH SÁCH
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 text-[#ffe2a0] ${
                  activeDropdown === "policies" ? "rotate-180" : ""
                }`}
              />
            </Link>
            <ul
              className={`absolute top-full left-0 w-72 rounded-xl bg-[#140e0a]/98 border border-[#c88922]/30 shadow-2xl py-2 transition-all duration-200 transform z-50 backdrop-blur-md ${
                activeDropdown === "policies"
                  ? "opacity-100 visible translate-y-0 pointer-events-auto"
                  : "opacity-0 invisible translate-y-2 pointer-events-none"
              }`}
            >
              <li>
                <Link
                  href="/chinh-sach-thanh-toan"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  CHÍNH SÁCH THANH TOÁN
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-bao-mat-thong-tin"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  CHÍNH SÁCH BẢO MẬT THÔNG TIN
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-dat-tra-phong"
                  onClick={closeDropdown}
                  className="block px-4 py-2.5 text-[13px] font-bold !text-[#fff8ec] hover:!text-[#ffe2a0] hover:bg-[#c88922]/10 transition-colors font-philosopher tracking-wide uppercase"
                >
                  CHÍNH SÁCH ĐẶT TRẢ PHÒNG
                </Link>
              </li>
            </ul>
          </div>

          {/* LIÊN HỆ */}
          <Link
            href="/lien-he"
            className="text-[14.5px] font-bold tracking-[0.05em] !text-[#fff8ec] hover:!text-[#ffe2a0] transition-colors font-philosopher uppercase"
          >
            LIÊN HỆ
          </Link>
        </nav>

        {/* CTA Button ĐẶT PHÒNG */}
        <button
          onClick={onOpenBooking}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d8a85a] via-[#f3cb82] to-[#b88a3e] hover:from-[#e2b86e] hover:via-[#ffdd99] hover:to-[#c8984c] text-[#1a1309] font-bold font-philosopher tracking-wider text-[14px] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(200,137,34,0.35)] hover:shadow-[0_6px_25px_rgba(200,137,34,0.55)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Phone className="w-4 h-4 fill-current text-[#1a1309]" />
          <span>ĐẶT PHÒNG</span>
        </button>
      </div>
    </header>
  );
}
