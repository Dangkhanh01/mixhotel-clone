"use client";

import React, { useEffect } from "react";
import { useModal, ContactChannel } from "@/context/ModalContext";

interface BranchContactInfo {
  name: string;
  phone: string;
  zalo: string;
  messenger: string;
  sms: string;
  hidden?: boolean;
}

const branches: BranchContactInfo[] = [
  {
    name: "Mix Boutique Premium",
    phone: "tel:+84383104010",
    zalo: "https://zalo.me/+84383104010",
    messenger: "https://m.me/602986296805550/",
    sms: "sms:+84383104010",
  },
  {
    name: "Mix Boutique Hotel 256B Đặng Tiến Đông",
    phone: "tel:+84393307030",
    zalo: "https://zalo.me/+84393307030",
    messenger: "https://m.me/111428390604292/",
    sms: "sms:+84393307030",
  },
  {
    name: "Mix Boutique Hotel 104B Nguyễn Khuyến",
    phone: "tel:0334060906",
    zalo: "https://zalo.me/0334060906",
    messenger: "https://m.me/111386644041404/",
    sms: "sms:0334060906",
    hidden: true,
  },
  {
    name: "Mix Boutique Hotel 20 Phúc La Hà Đông",
    phone: "tel:+84353660966",
    zalo: "https://zalo.me/+84353660966",
    messenger: "https://m.me//114361207416511",
    sms: "sms:+84353660966",
  },
];

export default function BranchSelectModal() {
  const { isBranchModalOpen, branchContactStyle, closeBranchModal } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBranchModal();
    };
    if (isBranchModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isBranchModalOpen, closeBranchModal]);

  if (!isBranchModalOpen) return null;

  const getTargetHref = (branch: BranchContactInfo, style: ContactChannel) => {
    switch (style) {
      case "phone":
        return branch.phone;
      case "messenger":
        return branch.messenger;
      case "sms":
        return branch.sms;
      case "zalo":
      default:
        return branch.zalo;
    }
  };

  return (
    <div
      className="modal fade in show"
      id="popupContact_1"
      role="dialog"
      tabIndex={-1}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 99999999,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        paddingBottom: "100px",
      }}
      onClick={closeBranchModal}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{
          maxWidth: "420px",
          width: "90%",
          margin: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="titlePart">
            <a
              className="close closeItem"
              onClick={closeBranchModal}
              title="Đóng"
            >
              x
            </a>
          </div>
          <div className="SelectLocate">
            {branches.map((branch, idx) => {
              if (branch.hidden) return null;
              const targetHref = getTargetHref(branch, branchContactStyle);
              return (
                <div key={idx} className="smallPart">
                  <a
                    href={targetHref}
                    target="_blank"
                    rel="nofollow"
                    onClick={closeBranchModal}
                    className="text-[#212529] hover:text-[#ffffff] font-bold text-[15px]"
                  >
                    {branch.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
