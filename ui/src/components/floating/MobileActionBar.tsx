"use client";

import React from "react";
import Image from "next/image";

interface MobileActionBarProps {
  onOpenContact: (type: "messenger" | "zalo" | "phone" | "sms") => void;
}

export default function MobileActionBar({ onOpenContact }: MobileActionBarProps) {
  return (
    <nav
      aria-label="Thanh thao tác cố định mobile"
      className="md:hidden fixed bottom-0 left-0 w-full z-[999] bg-[#141418]/95 backdrop-blur-lg border-t border-[#262630] py-1.5 px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.6)]"
    >
      <div className="grid grid-cols-5 items-center text-center">
        {/* Home */}
        <a href="#top" className="flex flex-col items-center justify-center py-1">
          <div className="relative w-6 h-6">
            <Image
              src="/images/icon-home.svg"
              alt="Trang chủ"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-zinc-400 mt-1 font-medium">Trang chủ</span>
        </a>

        {/* Messenger */}
        <button
          onClick={() => onOpenContact("messenger")}
          className="flex flex-col items-center justify-center py-1 cursor-pointer"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/images/icon-messenger-bottom.svg"
              alt="Messenger"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-zinc-400 mt-1 font-medium">Messenger</span>
        </button>

        {/* Phone Pulsing Center Button */}
        <div className="relative flex justify-center -top-4">
          <div className="relative">
            {/* Outer pulsing glow */}
            <span className="absolute inset-0 rounded-full bg-[#c5a880]/40 animate-ping" />
            <button
              onClick={() => onOpenContact("phone")}
              aria-label="Gọi điện ngay"
              className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#c5a880] to-[#dfc299] shadow-[0_4px_15px_rgba(197,168,128,0.5)] border-2 border-[#141418] flex items-center justify-center cursor-pointer"
            >
              <div className="relative w-7 h-7 animate-wobble-phone">
                <Image
                  src="/images/icon-phone-bottom.svg"
                  alt="Gọi điện"
                  fill
                  className="object-contain brightness-0"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Zalo */}
        <button
          onClick={() => onOpenContact("zalo")}
          className="flex flex-col items-center justify-center py-1 cursor-pointer"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/images/icon-zalo-bottom.png"
              alt="Zalo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-zinc-400 mt-1 font-medium">Zalo</span>
        </button>

        {/* SMS */}
        <button
          onClick={() => onOpenContact("sms")}
          className="flex flex-col items-center justify-center py-1 cursor-pointer"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/images/icon-sms.svg"
              alt="Tin nhắn"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-zinc-400 mt-1 font-medium">Tin nhắn</span>
        </button>
      </div>
    </nav>
  );
}
