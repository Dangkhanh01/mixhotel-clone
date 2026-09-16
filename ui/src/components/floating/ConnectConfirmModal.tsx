"use client";

import React, { useEffect } from "react";
import { useModal } from "@/context/ModalContext";

export default function ConnectConfirmModal() {
  const { isConfirmModalOpen, confirmText, confirmHref, closeConfirmModal } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeConfirmModal();
    };
    if (isConfirmModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isConfirmModalOpen, closeConfirmModal]);

  if (!isConfirmModalOpen) return null;

  return (
    <div
      className="modal fade in show popupAskContact"
      id="popupWhenClickContact"
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={closeConfirmModal}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{
          maxWidth: "480px",
          width: "90%",
          margin: "auto",
          backgroundColor: "#ffffff",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 5px 25px rgba(0,0,0,0.5)",
          color: "#333333",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content" style={{ border: "none", backgroundColor: "#ffffff" }}>
          <div
            className="modal-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              borderBottom: "1px solid #e9ecef",
            }}
          >
            <p className="modal-title" style={{ margin: 0, fontWeight: 700, fontSize: "18px", color: "#333" }}>
              KẾT NỐI
            </p>
            <button
              aria-label="Close"
              className="close"
              type="button"
              onClick={closeConfirmModal}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                fontWeight: 700,
                color: "#888",
                cursor: "pointer",
                padding: "0 5px",
                lineHeight: 1,
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            className="modal-body"
            style={{
              padding: "20px",
              fontSize: "15px",
              color: "#444444",
              lineHeight: 1.5,
            }}
          >
            Bạn có muốn kết nối với tư vấn viên của chúng tôi?
          </div>
          <div
            className="modal-footer"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              borderTop: "1px solid #e9ecef",
            }}
          >
            <a
              className="btnType_1"
              onClick={closeConfirmModal}
              style={{
                cursor: "pointer",
                padding: "8px 20px",
                borderRadius: "4px",
                fontSize: "14px",
                minWidth: "90px",
                textAlign: "center",
              }}
            >
              Hủy
            </a>
            <a
              className="btnType_1 btnContact"
              href={confirmHref}
              rel="nofollow"
              target="_blank"
              onClick={closeConfirmModal}
              style={{
                cursor: "pointer",
                padding: "8px 20px",
                borderRadius: "4px",
                fontSize: "14px",
                minWidth: "100px",
                textAlign: "center",
              }}
            >
              {confirmText || "Chat Zalo"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
