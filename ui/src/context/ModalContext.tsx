"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ContactChannel = "zalo" | "phone" | "messenger" | "sms";

interface ModalContextType {
  // Popup 1: Chọn cơ sở kết nối (#popupContact_1)
  isBranchModalOpen: boolean;
  branchContactStyle: ContactChannel;
  openBranchSelect: (stylecontact?: ContactChannel) => void;
  closeBranchModal: () => void;

  // Popup 2: Xác nhận kết nối (#popupWhenClickContact)
  isConfirmModalOpen: boolean;
  confirmText: string;
  confirmHref: string;
  openConnectConfirm: (contactText: string, dataHref: string) => void;
  closeConfirmModal: () => void;

  // Helper
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [branchContactStyle, setBranchContactStyle] = useState<ContactChannel>("zalo");

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("Chat Zalo");
  const [confirmHref, setConfirmHref] = useState("");

  const openBranchSelect = (stylecontact: ContactChannel = "zalo") => {
    setBranchContactStyle(stylecontact);
    setIsBranchModalOpen(true);
    setIsConfirmModalOpen(false);
  };

  const closeBranchModal = () => {
    setIsBranchModalOpen(false);
  };

  const openConnectConfirm = (contactText: string, dataHref: string) => {
    setConfirmText(contactText || "Chat Zalo");
    setConfirmHref(dataHref || "#");
    setIsConfirmModalOpen(true);
    setIsBranchModalOpen(false);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeAllModals = () => {
    setIsBranchModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isBranchModalOpen,
        branchContactStyle,
        openBranchSelect,
        closeBranchModal,
        isConfirmModalOpen,
        confirmText,
        confirmHref,
        openConnectConfirm,
        closeConfirmModal,
        closeAllModals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
