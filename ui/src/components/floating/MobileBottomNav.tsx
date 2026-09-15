"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface MobileBottomNavProps {
  onOpenBooking?: () => void;
  onOpenContact?: (type: "messenger" | "zalo" | "phone" | "sms") => void;
}

export default function MobileBottomNav({ onOpenBooking, onOpenContact }: MobileBottomNavProps) {
  const handleContact = (type: "messenger" | "zalo" | "phone" | "sms") => {
    if (onOpenContact) {
      onOpenContact(type);
    } else if (onOpenBooking) {
      onOpenBooking();
    }
  };

  return (
    <nav
      aria-label="Thanh thao tác cố định mobile"
      className="md:hidden fixed bottom-0 left-0 w-full z-[999] bg-[#140e0a]/95 backdrop-blur-lg border-t border-[#c88922]/25 py-1.5 px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.8)] font-philosopher"
    >
      <div className="grid grid-cols-5 items-center text-center">
        {/* Home */}
        <Link href="/" className="flex flex-col items-center justify-center py-1">
          <div className="relative w-6 h-6">
            <Image
              src="/images/u1214.svg"
              alt="Trang chủ"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-zinc-300 mt-1 font-semibold tracking-wider">Trang chủ</span>
        </Link>

        {/* Messenger */}
        <button
          onClick={() => handleContact("messenger")}
          className="flex flex-col items-center justify-center py-1 cursor-pointer"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/images/24-icon-2.webp"
              alt="Messenger"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-zinc-300 mt-1 font-semibold tracking-wider">Messenger</span>
        </button>

        {/* Phone Center Button */}
        <div className="relative flex justify-center -top-4">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-[#c88922]/40 animate-ping" />
            <button
              onClick={() => handleContact("phone")}
              aria-label="Gọi điện ngay"
              className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#c88922] via-[#ffe2a0] to-[#d9a83a] shadow-[0_4px_15px_rgba(200,137,34,0.6)] border-2 border-[#140e0a] flex items-center justify-center cursor-pointer"
            >
              <div className="relative w-7 h-7 animate-wobble-phone">
                <Image
                  src="/images/phone_item.svg"
                  alt="Gọi điện"
                  fill
                  className="object-contain"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Zalo */}
        <button
          onClick={() => handleContact("zalo")}
          className="flex flex-col items-center justify-center py-1 cursor-pointer"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/images/24-icon-3.webp"
              alt="Zalo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-zinc-300 mt-1 font-semibold tracking-wider">Zalo</span>
        </button>

        {/* Đặt phòng / SMS */}
        <button
          onClick={() => handleContact("sms")}
          className="flex flex-col items-center justify-center py-1 cursor-pointer"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/images/phone_item_2.svg"
              alt="Đặt phòng"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-zinc-300 mt-1 font-semibold tracking-wider">Đặt phòng</span>
        </button>
      </div>
    </nav>
  );
}
