"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface MobileHeaderProps {
  onOpenBooking?: () => void;
}

export default function MobileHeader({}: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <div id="menuNKTA_MOBILE" className="lg:hidden">
      {/* Top Page Header (Logo + Hamburger Bars only - NO ĐẶT PHÒNG button) */}
      <div className="menuTopPage flex items-center justify-between px-4 fixed top-0 left-0 w-full z-[90] bg-[#ffffff] shadow-[0_3px_10px_0px_rgba(0,0,0,0.2)] min-h-[60px]">
        <div className="logoPart w-[100px]">
          <Link href="/">
            <Image
              src="/images/mix-boutique-logo.png"
              alt="Mix Boutique Hotel"
              width={100}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <div className="barsPart">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Mở menu"
            className="aTag aTagBars flex flex-col items-center justify-center p-1 cursor-pointer bg-transparent border-none text-[#333333]"
          >
            <i className="fa fa-bars text-2xl text-[#333333]"></i>
            <div className="textUnderItem text-[11px] text-[#888888] mt-0.5">Menu</div>
          </button>
        </div>
      </div>

      {/* Drawer Menu trượt toàn màn hình */}
      {isOpen && (
        <div
          className="blockCateMobile fixed inset-0 z-[999999] bg-[#ffffff] text-[#333333] overflow-y-auto pt-10 pb-20 px-4"
          style={{ display: "block" }}
        >
          {/* Nút đóng màu đỏ góc trên phải */}
          <div className="hideBlock fixed top-0 right-0 z-20">
            <button
              onClick={closeDrawer}
              aria-label="Đóng menu"
              className="xItem bg-[#e52325] text-[#ffffff] px-3 py-2 rounded-l font-bold text-xl cursor-pointer border-none shadow-md"
            >
              x
            </button>
          </div>

          <div className="wrapCateParts divide-y divide-dashed divide-[#cdcdcd] mt-4">
            {/* TRANG CHỦ */}
            <div className="catePart py-2">
              <Link href="/" onClick={closeDrawer} className="link1 block text-[15px] font-bold text-[#333333]">
                TRANG CHỦ
              </Link>
            </div>

            {/* GIỚI THIỆU */}
            <div className="catePart py-2">
              <Link href="/gioi-thieu" onClick={closeDrawer} className="link1 block text-[15px] font-bold text-[#333333]">
                GIỚI THIỆU
              </Link>
            </div>

            {/* KHÁCH SẠN TÌNH YÊU */}
            <div className={`catePart py-2 relative ${openSubmenu === "rooms" ? "active" : ""}`}>
              <div className="flex items-center justify-between">
                <Link href="/khach-san-tinh-yeu" onClick={closeDrawer} className="link1 block text-[15px] font-bold text-[#333333]">
                  KHÁCH SẠN TÌNH YÊU
                </Link>
                <button
                  type="button"
                  onClick={() => toggleSubmenu("rooms")}
                  className="p-2 cursor-pointer bg-transparent border-none text-[#555555]"
                >
                  <i className={`fa ${openSubmenu === "rooms" ? "fa-angle-down" : "fa-angle-right"} text-lg`}></i>
                </button>
              </div>
              {openSubmenu === "rooms" && (
                <ul className="blockLevel2 pl-4 py-2 space-y-2 bg-[#f9f9f9] rounded my-2 list-none border-l-2 border-[#f3bf01]">
                  <li>
                    <Link href="/mix-boutique-premium-hotel" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      MIX BOUTIQUE PREMIUM
                    </Link>
                  </li>
                  <li>
                    <Link href="/mix-boutique-hotel-256b-dang-tien-dong" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      MIX BOUTIQUE HOTEL 256B ĐẶNG TIẾN ĐÔNG
                    </Link>
                  </li>
                  <li>
                    <Link href="/mix-boutique-hotel-20-phuc-la-ha-dong" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      MIX BOUTIQUE HOTEL 20 PHÚC LA HÀ ĐÔNG
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* GALLERY */}
            <div className="catePart py-2">
              <Link href="/gallery" onClick={closeDrawer} className="link1 block text-[15px] font-bold text-[#333333]">
                GALLERY
              </Link>
            </div>

            {/* TIN TỨC */}
            <div className={`catePart py-2 relative ${openSubmenu === "news" ? "active" : ""}`}>
              <div className="flex items-center justify-between">
                <Link href="/tin-tuc" onClick={closeDrawer} className="link1 block text-[15px] font-bold text-[#333333]">
                  TIN TỨC
                </Link>
                <button
                  type="button"
                  onClick={() => toggleSubmenu("news")}
                  className="p-2 cursor-pointer bg-transparent border-none text-[#555555]"
                >
                  <i className={`fa ${openSubmenu === "news" ? "fa-angle-down" : "fa-angle-right"} text-lg`}></i>
                </button>
              </div>
              {openSubmenu === "news" && (
                <ul className="blockLevel2 pl-4 py-2 space-y-2 bg-[#f9f9f9] rounded my-2 list-none border-l-2 border-[#f3bf01]">
                  <li>
                    <Link href="/review-khach-san-tinh-yeu" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      REVIEW KHÁCH SẠN TÌNH YÊU
                    </Link>
                  </li>
                  <li>
                    <Link href="/dia-diem-hen-ho-danh-cho-cap-doi" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      ĐỊA ĐIỂM HẸN HÒ DÀNH CHO CẶP ĐÔI
                    </Link>
                  </li>
                  <li>
                    <Link href="/dia-diem-di-choi-cho-cap-doi" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      ĐỊA ĐIỂM ĐI CHƠI CHO CẶP ĐÔI
                    </Link>
                  </li>
                  <li>
                    <Link href="/goi-y-qua-tang-cac-diep-le" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      GỢI Ý QUÀ TẶNG CÁC DỊP LỄ
                    </Link>
                  </li>
                  <li>
                    <Link href="/kien-thuc-ve-khach-san" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      KIẾN THỨC VỀ KHÁCH SẠN
                    </Link>
                  </li>
                  <li>
                    <Link href="/cam-nang-tinh-yeu" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      CẨM NANG TÌNH YÊU
                    </Link>
                  </li>
                  <li>
                    <Link href="/cac-dia-chi-khach-san-tinh-yeu" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      CÁC ĐỊA CHỈ KHÁCH SẠN TÌNH YÊU
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* SỰ KIỆN */}
            <div className="catePart py-2">
              <Link href="/su-kien" onClick={closeDrawer} className="link1 block text-[15px] font-bold text-[#333333]">
                SỰ KIỆN
              </Link>
            </div>

            {/* CHÍNH SÁCH */}
            <div className={`catePart py-2 relative ${openSubmenu === "policy" ? "active" : ""}`}>
              <div className="flex items-center justify-between">
                <Link href="/chinh-sach-thanh-toan" onClick={closeDrawer} className="link1 block text-[15px] font-bold text-[#333333]">
                  CHÍNH SÁCH
                </Link>
                <button
                  type="button"
                  onClick={() => toggleSubmenu("policy")}
                  className="p-2 cursor-pointer bg-transparent border-none text-[#555555]"
                >
                  <i className={`fa ${openSubmenu === "policy" ? "fa-angle-down" : "fa-angle-right"} text-lg`}></i>
                </button>
              </div>
              {openSubmenu === "policy" && (
                <ul className="blockLevel2 pl-4 py-2 space-y-2 bg-[#f9f9f9] rounded my-2 list-none border-l-2 border-[#f3bf01]">
                  <li>
                    <Link href="/chinh-sach-thanh-toan" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      CHÍNH SÁCH THANH TOÁN
                    </Link>
                  </li>
                  <li>
                    <Link href="/chinh-sach-bao-mat-thong-tin" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      CHÍNH SÁCH BẢO MẬT THÔNG TIN
                    </Link>
                  </li>
                  <li>
                    <Link href="/chinh-sach-dat-tra-phong" onClick={closeDrawer} className="link2 block py-1.5 text-sm text-[#444444] font-medium">
                      CHÍNH SÁCH ĐẶT TRẢ PHÒNG
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* LIÊN HỆ */}
            <div className="catePart py-2">
              <Link href="/lien-he" onClick={closeDrawer} className="link1 block text-[15px] font-bold text-[#333333]">
                LIÊN HỆ
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
