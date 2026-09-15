"use client";

import React, { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";

interface ArticleShareButtonsProps {
  title: string;
}

export default function ArticleShareButtons({ title }: ArticleShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleShareFacebook = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=450");
    }
  };

  const handleShareZalo = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://sp.zalo.me/share_inline?link=${url}&title=${encodeURIComponent(title)}`, "_blank", "width=600,height=450");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-[#c88922]/20 my-10">
      <div className="flex items-center gap-2 text-sm font-philosopher font-semibold text-[#ffe2a0]">
        <Share2 className="w-4 h-4 text-[#c88922]" />
        <span>Chia sẻ bài viết này:</span>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={handleShareFacebook}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all text-xs font-semibold cursor-pointer"
          title="Chia sẻ lên Facebook"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Facebook</span>
        </button>

        <button
          onClick={handleShareZalo}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0068FF]/20 border border-[#0068FF]/40 text-[#0088FF] hover:bg-[#0068FF] hover:text-white transition-all text-xs font-semibold cursor-pointer"
          title="Chia sẻ lên Zalo"
        >
          <span className="font-bold text-xs">Zalo</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#c88922]/20 border border-[#c88922]/40 text-[#ffe2a0] hover:bg-[#c88922] hover:text-[#120d08] transition-all text-xs font-semibold cursor-pointer"
          title="Sao chép liên kết"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
          <span>{copied ? "Đã sao chép!" : "Copy link"}</span>
        </button>
      </div>
    </div>
  );
}
