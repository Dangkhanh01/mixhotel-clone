"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

interface DesktopContactBarProps {
  onOpenContact?: (type: "messenger" | "zalo" | "phone") => void;
  onOpenBooking?: () => void;
}

export default function DesktopContactBar({ onOpenContact, onOpenBooking }: DesktopContactBarProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (type: "messenger" | "zalo" | "phone") => {
    if (onOpenContact) {
      onOpenContact(type);
    } else if (onOpenBooking) {
      onOpenBooking();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="contactBtnBlock"
      className="hidden md:flex flex-col items-center fixed top-[65%] -translate-y-1/2 right-3 z-50 bg-[#16100b]/95 backdrop-blur-md border border-[#c88922]/40 rounded-2xl p-2 shadow-2xl select-none min-w-[64px]"
    >
      {/* Messenger */}
      <div
        className="smallBlock messengerBlock text-center cursor-pointer p-1.5 rounded-xl hover:bg-[#c88922]/15 transition-colors group"
        onClick={() => handleClick("messenger")}
      >
        <div className="imgPart relative w-[34px] h-[34px] mx-auto mb-1 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
          <Image
            src="/images/24-icon-2.webp"
            alt="Messenger"
            fill
            className="object-contain"
          />
        </div>
        <p className="textPart text-[11px] font-bold text-[#ffe2a0] m-0 font-philosopher">
          Chat face
        </p>
      </div>

      {/* Zalo */}
      <div
        className="smallBlock zaloBlock text-center cursor-pointer p-1.5 rounded-xl hover:bg-[#c88922]/15 transition-colors group mt-2"
        onClick={() => handleClick("zalo")}
      >
        <div className="imgPart relative w-[34px] h-[34px] mx-auto mb-1 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
          <Image
            src="/images/24-icon-3.webp"
            alt="Zalo"
            fill
            className="object-contain"
          />
        </div>
        <p className="textPart text-[11px] font-bold text-[#ffe2a0] m-0 font-philosopher">
          Chat Zalo
        </p>
      </div>

      {/* Phone */}
      <div
        className="smallBlock phoneBlock text-center cursor-pointer p-1.5 rounded-xl hover:bg-[#c88922]/15 transition-colors group mt-2"
        onClick={() => handleClick("phone")}
      >
        <div className="imgPart relative w-[34px] h-[34px] mx-auto mb-1 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
          <Image
            src="/images/phone_item_2.svg"
            alt="Phone"
            fill
            className="object-contain"
          />
        </div>
        <p className="textPart text-[11px] font-bold text-[#ffe2a0] m-0 font-philosopher">
          Hotline
        </p>
      </div>

      {/* Page Up */}
      {showScrollTop && (
        <div
          className="smallBlock pageUp text-center cursor-pointer mt-2 pt-2 border-t border-[#c88922]/20 w-full"
          onClick={scrollToTop}
        >
          <div className="w-[30px] h-[30px] mx-auto rounded-full bg-[#c88922]/20 text-[#ffe2a0] border border-[#c88922]/40 flex items-center justify-center hover:bg-[#c88922] hover:text-[#110d0a] transition-colors">
            <ChevronUp className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
}
