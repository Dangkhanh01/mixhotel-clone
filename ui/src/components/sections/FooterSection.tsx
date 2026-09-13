"use client";

import React from "react";
import Image from "next/image";
import { Building, Phone, Mail, Globe } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function FooterSection() {
  return (
    <footer className="bg-[#0b0b0e] text-zinc-400 text-xs border-t border-[#1f1f28] pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Col 1: Thông tin khách sạn */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              THÔNG TIN KHÁCH SẠN
            </h3>

            <div className="flex items-start gap-2.5 text-zinc-300">
              <Building className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <p className="font-medium">CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ LINH KHANH</p>
            </div>

            <div className="space-y-1.5 text-zinc-400 pl-6 border-l border-zinc-800">
              <p>GPKD: 0108646173 (Cấp ngày 13/03/2019)</p>
              <p>Nơi cấp: Sở Kế Hoạch Đầu Tư TP. Hà Nội</p>
              <p>CS1: Ngách 29 Ngõ 49 Huỳnh Thúc Kháng, Láng, Hà Nội</p>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href="tel:0383104010"
                className="flex items-center gap-2.5 text-zinc-300 hover:text-[#c5a880] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#c5a880]" />
                <span>038 310 4010</span>
              </a>

              <a
                href="mailto:Mixboutique.marketing@gmail.com"
                className="flex items-center gap-2.5 text-zinc-300 hover:text-[#c5a880] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#c5a880]" />
                <span>Mixboutique.marketing@gmail.com</span>
              </a>

              <div className="flex items-center gap-2.5 text-zinc-300">
                <Globe className="w-4 h-4 text-[#c5a880]" />
                <span>https://mixhotel.vn/</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-4 pt-2">
              <div className="relative w-28 h-7">
                <Image
                  src="/images/dmca-badge.png"
                  alt="DMCA Protected"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-28 h-9">
                <Image
                  src="/images/bo-cong-thuong.webp"
                  alt="Đã thông báo Bộ Công Thương"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Col 2: Thông tin hỗ trợ & Social */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              THÔNG TIN HỖ TRỢ
            </h3>

            <ul className="space-y-2.5">
              <li>
                <a href="#top" className="hover:text-[#c5a880] transition-colors">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#why" className="hover:text-[#c5a880] transition-colors">
                  Giới thiệu Mix Boutique
                </a>
              </li>
              <li>
                <a href="#concept" className="hover:text-[#c5a880] transition-colors">
                  Danh sách phòng concept
                </a>
              </li>
              <li>
                <a href="#branches" className="hover:text-[#c5a880] transition-colors">
                  Hệ thống 3 chi nhánh
                </a>
              </li>
              <li>
                <a href="#prices" className="hover:text-[#c5a880] transition-colors">
                  Bảng giá phòng & Thêm giờ
                </a>
              </li>
            </ul>

            <div className="pt-4 space-y-2">
              <span className="text-xs font-heading font-bold text-white uppercase tracking-wider block">
                FOLLOW ME
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/mixhotel.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@hotelmixboutique1110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-pink-600 text-white flex items-center justify-center transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Chính sách */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              CHÍNH SÁCH
            </h3>

            <ul className="space-y-2.5">
              <li>
                <a href="#" className="hover:text-[#c5a880] transition-colors">
                  Chính sách thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c5a880] transition-colors">
                  Chính sách bảo mật thông tin
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c5a880] transition-colors">
                  Chính sách đặt trả phòng
                </a>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5 mt-4">
              <span className="font-bold text-white block">Hộ Kinh Doanh Mix Boutique:</span>
              <p>GPKD Số: 01E8034179</p>
              <p>Địa điểm: Số 186 phố Hoàng Ngân, P. Trung Hòa, Q. Cầu Giấy, TP. Hà Nội</p>
            </div>
          </div>

          {/* Col 4: Kết nối Facebook */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              KẾT NỐI MIX BOUTIQUE
            </h3>

            <a
              href="https://www.facebook.com/mixhotel.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-[16/10] rounded-xl overflow-hidden border border-zinc-800 group shadow-lg"
            >
              <Image
                src="/images/facebook-preview.png"
                alt="Mix Boutique Hotel Fanpage"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center text-xs text-zinc-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            Copyright © 2020 mixhotel.vn. All Rights Reserved.
          </p>
          <p>
            Design web and SEO by{" "}
            <a
              href="https://fagoagency.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a880] font-semibold hover:underline"
            >
              FAGO AGENCY
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
