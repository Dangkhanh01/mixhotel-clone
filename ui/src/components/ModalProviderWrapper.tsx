"use client";

import React, { ReactNode } from "react";
import { ModalProvider } from "@/context/ModalContext";
import BranchSelectModal from "@/components/floating/BranchSelectModal";
import ConnectConfirmModal from "@/components/floating/ConnectConfirmModal";

export default function ModalProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      {children}
      <BranchSelectModal />
      <ConnectConfirmModal />
    </ModalProvider>
  );
}
