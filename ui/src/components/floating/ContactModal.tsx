"use client";

import React, { useEffect } from "react";
import { X, Phone, MessageSquare, Send } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactType?: "phone" | "zalo" | "messenger" | "sms" | "booking";
  roomTitle?: string;
}

const branches = [
  {
    name: "Mix Boutique Premium",
    address: "Ngách 29 Ngõ 49 Huỳnh Thúc Kháng, Đống Đa, Hà Nội",
    phone: "038 310 4010",
    phoneUrl: "tel:+84383104010",
    zaloUrl: "https://zalo.me/+84383104010",
    messengerUrl: "https://m.me/602986296805550/",
    smsUrl: "sms:+84383104010",
  },
  {
    name: "Mix Boutique Hotel 256B Đặng Tiến Đông",
    address: "256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội",
    phone: "039 330 7030",
    phoneUrl: "tel:+84393307030",
    zaloUrl: "https://zalo.me/+84393307030",
    messengerUrl: "https://m.me/111428390604292/",
    smsUrl: "sms:+84393307030",
  },
  {
    name: "Mix Boutique Hotel 20 Phúc La Hà Đông",
    address: "20 Phúc La, KĐT Xa La, Hà Đông, Hà Nội",
    phone: "035 366 0966",
    phoneUrl: "tel:+84353660966",
    zaloUrl: "https://zalo.me/+84353660966",
    messengerUrl: "https://m.me/114361207416511",
    smsUrl: "sms:+84353660966",
  },
];

export default function ContactModal({
  isOpen,
  onClose,
  contactType = "zalo",
  roomTitle,
}: ContactModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getActionLink = (branch: typeof branches[0]) => {
    switch (contactType) {
      case "phone":
        return branch.phoneUrl;
      case "messenger":
        return branch.messengerUrl;
      case "sms":
        return branch.smsUrl;
      case "zalo":
      case "booking":
      default:
        return branch.zaloUrl;
    }
  };

  const getActionLabel = (branch: typeof branches[0]) => {
    switch (contactType) {
      case "phone":
        return `Gọi: ${branch.phone}`;
      case "messenger":
        return "Chat Messenger";
      case "sms":
        return `Gửi SMS: ${branch.phone}`;
      case "zalo":
      case "booking":
      default:
        return "Nhắn Zalo Tư Vấn";
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#17171c] border border-[#2d2d38] p-6 shadow-2xl transition-all duration-300 transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
            Kết nối ngay
          </span>
          <h3 className="text-xl md:text-2xl font-heading font-bold text-white mt-1">
            Chọn Chi Nhánh Gần Bạn
          </h3>
          {roomTitle ? (
            <p className="text-sm text-zinc-400 mt-1">
              Bạn đang quan tâm: <span className="text-[#c5a880] font-medium">{roomTitle}</span>
            </p>
          ) : (
            <p className="text-sm text-zinc-400 mt-1">
              Mix sẵn sàng tư vấn phòng còn trống và gửi ảnh thực tế tức thì.
            </p>
          )}
        </div>

        {/* Branches list */}
        <div className="space-y-3">
          {branches.map((branch, idx) => {
            const link = getActionLink(branch);
            return (
              <a
                key={branch.name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#202027] border border-[#2b2b36] hover:border-[#c5a880] hover:bg-[#262630] transition-all duration-200"
              >
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#c5a880]/15 text-[#c5a880] font-semibold">
                      0{idx + 1}
                    </span>
                    <h4 className="font-heading font-semibold text-white group-hover:text-[#c5a880] transition-colors text-base">
                      {branch.name}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                    {branch.address}
                  </p>
                </div>

                <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#c5a880] text-black group-hover:bg-[#dfc299] transition-all shadow-md">
                  {contactType === "phone" ? (
                    <Phone className="w-3.5 h-3.5" />
                  ) : contactType === "messenger" ? (
                    <MessageSquare className="w-3.5 h-3.5" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  {getActionLabel(branch)}
                </span>
              </a>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center border-t border-zinc-800 pt-4">
          <p className="text-xs text-zinc-500">
            Hỗ trợ giữ phòng 15 - 20 phút không cần cọc tùy tình trạng phòng.
          </p>
        </div>
      </div>
    </div>
  );
}
