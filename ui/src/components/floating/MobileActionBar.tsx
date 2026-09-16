"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

interface MobileActionBarProps {
  onOpenContact?: (type: "messenger" | "zalo" | "phone" | "sms") => void;
}

export default function MobileActionBar({ onOpenContact }: MobileActionBarProps) {
  const { openBranchSelect } = useModal();

  const handleAction = (type: "messenger" | "zalo" | "phone" | "sms") => {
    if (onOpenContact) {
      onOpenContact(type);
    } else {
      openBranchSelect(type);
    }
  };

  return (
    <div id="menuNKTA_MOBILE" className="lg:hidden">
      <nav
        aria-label="Thanh thao tác cố định mobile"
        className="menuEndPage flex items-center justify-around fixed bottom-0 left-0 w-full z-[9999] bg-[#f2f2f2] pt-2 pb-1 border-t border-[#e2e2e2] shadow-[0_-3px_10px_rgba(0,0,0,0.15)]"
      >
        {/* 1. Trang chủ */}
        <div className="smallPart homePart flex-1 text-center">
          <Link href="/" className="aTag block w-6 h-6 mx-auto mb-1">
            <Image
              src="/images/icon-home.svg"
              alt="Trang chủ"
              width={24}
              height={24}
              className="object-contain mx-auto"
            />
          </Link>
          <div className="textUnderItem text-[10px] text-[#777777] font-medium leading-none">
            Trang chủ
          </div>
        </div>

        {/* 2. Messenger */}
        <div className="smallPart messFacePart flex-1 text-center">
          <button
            onClick={() => handleAction("messenger")}
            className="aTag callContactLocate block w-6 h-6 mx-auto mb-1 bg-transparent border-none p-0 cursor-pointer"
          >
            <Image
              src="/images/icon-messenger-bottom.svg"
              alt="Messenger"
              width={24}
              height={24}
              className="object-contain mx-auto"
            />
          </button>
          <div className="textUnderItem text-[10px] text-[#777777] font-medium leading-none">
            Messenger
          </div>
        </div>

        {/* 3. Phone (Nút tròn vàng nhô cao ở chính giữa có pulse và wobble) */}
        <div className="smallPart centerPart phonePart relative flex-1 flex flex-col items-center">
          <div className="relative -top-5">
            <button
              onClick={() => handleAction("phone")}
              aria-label="Gọi điện ngay"
              className="relative w-14 h-14 rounded-full bg-[#f3bf01] border-2 border-white flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(243,191,1,0.5)]"
            >
              <div className="relative w-7 h-7 animate-wobble-phone">
                <Image
                  src="/images/icon-phone-bottom.svg"
                  alt="Phone"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </button>
          </div>
          <div className="textUnderItem text-[10px] text-[#777777] font-medium leading-none -mt-4">
            Phone
          </div>
        </div>

        {/* 4. Zalo */}
        <div className="smallPart zaloPart flex-1 text-center">
          <button
            onClick={() => handleAction("zalo")}
            className="aTag callContactLocate block w-6 h-6 mx-auto mb-1 bg-transparent border-none p-0 cursor-pointer"
          >
            <Image
              src="/images/icon-zalo-bottom.png"
              alt="Zalo"
              width={24}
              height={24}
              className="object-contain mx-auto"
            />
          </button>
          <div className="textUnderItem text-[10px] text-[#777777] font-medium leading-none">
            Zalo
          </div>
        </div>

        {/* 5. Tin nhắn */}
        <div className="smallPart inboxPart flex-1 text-center">
          <button
            onClick={() => handleAction("sms")}
            className="aTag callContactLocate block w-6 h-6 mx-auto mb-1 bg-transparent border-none p-0 cursor-pointer"
          >
            <Image
              src="/images/icon-sms.svg"
              alt="Tin nhắn"
              width={24}
              height={24}
              className="object-contain mx-auto"
            />
          </button>
          <div className="textUnderItem text-[10px] text-[#777777] font-medium leading-none">
            Tin nhắn
          </div>
        </div>
      </nav>
    </div>
  );
}
