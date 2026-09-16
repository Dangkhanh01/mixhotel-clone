"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

interface DesktopContactBarProps {
  onOpenContact?: (type: "messenger" | "zalo" | "phone") => void;
}

export default function DesktopContactBar({ onOpenContact }: DesktopContactBarProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { openBranchSelect, openConnectConfirm } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMessenger = () => {
    if (onOpenContact) {
      onOpenContact("messenger");
    } else {
      openBranchSelect("messenger");
    }
  };

  const handleZalo = () => {
    if (onOpenContact) {
      onOpenContact("zalo");
    } else {
      openBranchSelect("zalo");
    }
  };

  const handlePhone = () => {
    if (onOpenContact) {
      onOpenContact("phone");
    } else {
      openConnectConfirm("Gọi điện", "tel:0383104010");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="contactBtnBlock"
      className="hidden md:flex flex-col items-center fixed top-[60%] -translate-y-1/2 right-3 z-50 bg-[#16100b]/95 backdrop-blur-md border border-[#c88922]/40 rounded-2xl p-2.5 shadow-2xl select-none min-w-[64px]"
    >
      {/* 1. Messenger */}
      <div
        className="smallBlock messengerBlock text-center cursor-pointer p-1.5 rounded-xl hover:bg-[#c88922]/15 transition-colors group mb-3"
        onClick={handleMessenger}
      >
        <div className="imgPart relative w-[35px] h-[35px] mx-auto mb-1 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
          <Image
            src="/images/24-icon-2.webp"
            alt="Messenger"
            fill
            className="object-contain"
          />
        </div>
        <p className="textPart text-[11px] font-bold text-[#ffe2a0] m-0">
          Chat face
        </p>
      </div>

      {/* 2. Zalo */}
      <div
        className="smallBlock zaloBlock text-center cursor-pointer p-1.5 rounded-xl hover:bg-[#c88922]/15 transition-colors group mb-3"
        onClick={handleZalo}
      >
        <div className="imgPart relative w-[35px] h-[35px] mx-auto mb-1 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
          <Image
            src="/images/24-icon-3.webp"
            alt="Zalo"
            fill
            className="object-contain"
          />
        </div>
        <p className="textPart text-[11px] font-bold text-[#ffe2a0] m-0">
          Chat Zalo
        </p>
      </div>

      {/* 3. Phone (mở popup #popupWhenClickContact) */}
      <div
        className="smallBlock phoneBlock text-center cursor-pointer p-1.5 rounded-xl hover:bg-[#c88922]/15 transition-colors group mb-2"
        onClick={handlePhone}
      >
        <div className="imgPart relative w-[35px] h-[35px] mx-auto mb-1 rounded-full overflow-hidden group-hover:scale-110 transition-transform bg-[#043d6d]">
          <Image
            src="/images/phone_item_2.svg"
            alt="Phone"
            fill
            className="object-contain p-1.5"
          />
        </div>
        <p className="textPart text-[11px] font-bold text-[#ffe2a0] m-0">
          Phone
        </p>
      </div>

      {/* 4. Page Up */}
      {showScrollTop && (
        <div
          className="smallBlock pageUp text-center cursor-pointer pt-2 border-t border-[#c88922]/20 w-full"
          onClick={scrollToTop}
          title="Về đầu trang"
        >
          <div className="pageUpImg text-[#ffe2a0] hover:text-[#ffffff] transition-colors">
            <i className="fa fa-angle-double-up text-2xl"></i>
          </div>
        </div>
      )}
    </div>
  );
}
