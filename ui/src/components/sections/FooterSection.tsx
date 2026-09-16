"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

export default function FooterSection() {
  const { openConnectConfirm } = useModal();

  const handlePhone = (e: React.MouseEvent) => {
    e.preventDefault();
    openConnectConfirm("Gọi điện", "tel:0383104010");
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    openConnectConfirm("Gửi email", "mailto:Mixboutique.marketing@gmail.com");
  };

  const handleMap = (e: React.MouseEvent) => {
    e.preventDefault();
    openConnectConfirm("Chỉ đường", "https://maps.google.com/?q=Mix+Boutique+Hotel+Huynh+Thuc+Khang");
  };

  return (
    <footer id="footerNKTA" className="mixFooterPremium bg-[#0b0b0e] text-zinc-400 text-xs border-t border-[#1f1f28] pt-16 pb-24 md:pb-12">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Col 1: Thông tin khách sạn */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm tracking-wider uppercase">
              THÔNG TIN KHÁCH SẠN
            </h3>

            <div className="flex items-start gap-2.5 text-zinc-200">
              <i className="fa fa-building text-[#c5a880] text-sm shrink-0 mt-0.5"></i>
              <p className="font-semibold text-[#fff8ec]">CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ LINH KHANH</p>
            </div>

            <div className="space-y-1.5 text-zinc-300 pl-6 border-l border-zinc-700">
              <p>GPKD: 0108646173 (Cấp ngày 13/03/2019)</p>
              <p>Nơi cấp: Sở Kế Hoạch Đầu Tư TP. Hà Nội</p>
              <a
                href="#"
                onClick={handleMap}
                className="contactCallPopUp hover:text-[#ffe2a0] transition-colors block"
              >
                CS1: Ngách 29 Ngõ 49 Huỳnh Thúc Kháng, Láng, Hà Nội
              </a>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href="tel:0383104010"
                onClick={handlePhone}
                className="contactCallPopUp flex items-center gap-2.5 text-zinc-200 hover:text-[#ffe2a0] transition-colors"
              >
                <i className="fa fa-phone text-[#c5a880] text-sm"></i>
                <span className="font-medium">038 310 4010</span>
              </a>

              <a
                href="mailto:Mixboutique.marketing@gmail.com"
                onClick={handleEmail}
                className="contactCallPopUp flex items-center gap-2.5 text-zinc-200 hover:text-[#ffe2a0] transition-colors"
              >
                <i className="fa fa-envelope text-[#c5a880] text-sm"></i>
                <span>Mixboutique.marketing@gmail.com</span>
              </a>

              <div className="flex items-center gap-2.5 text-zinc-200">
                <i className="fa fa-globe text-[#c5a880] text-sm"></i>
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
            <h3 className="font-bold text-[#fff8ec] text-sm tracking-wider uppercase">
              THÔNG TIN HỖ TRỢ
            </h3>

            <ul className="space-y-2.5 text-[13px] list-none p-0">
              <li>
                <Link href="/" className="text-zinc-300 hover:text-[#ffe2a0] transition-colors block">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="text-zinc-300 hover:text-[#ffe2a0] transition-colors block">
                  Giới thiệu Mix Boutique
                </Link>
              </li>
              <li>
                <Link href="/khach-san-tinh-yeu" className="text-zinc-300 hover:text-[#ffe2a0] transition-colors block">
                  Danh sách phòng concept
                </Link>
              </li>
              <li>
                <Link href="/khach-san-tinh-yeu" className="text-zinc-300 hover:text-[#ffe2a0] transition-colors block">
                  Hệ thống 3 chi nhánh
                </Link>
              </li>
              <li>
                <Link href="/#prices" className="text-zinc-300 hover:text-[#ffe2a0] transition-colors block">
                  Bảng giá phòng &amp; Thêm giờ
                </Link>
              </li>
            </ul>

            <div className="pt-4 space-y-2">
              <span className="text-xs font-bold text-[#fff8ec] uppercase tracking-wider block">
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
                  <i className="fa fa-facebook text-sm"></i>
                </a>
                <a
                  href="https://www.youtube.com/@hotelmixboutique1110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                >
                  <i className="fa fa-youtube text-sm"></i>
                </a>
                <a
                  href="https://www.instagram.com/mixboutiquehotel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-pink-600 text-white flex items-center justify-center transition-colors"
                >
                  <i className="fa fa-instagram text-sm"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Chính sách */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#fff8ec] text-sm tracking-wider uppercase">
              CHÍNH SÁCH
            </h3>

            <ul className="space-y-2.5 text-[13px] list-none p-0">
              <li>
                <Link href="/chinh-sach-thanh-toan" className="text-zinc-300 hover:text-[#ffe2a0] transition-colors block">
                  Chính sách thanh toán
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat-thong-tin" className="text-zinc-300 hover:text-[#ffe2a0] transition-colors block">
                  Chính sách bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-dat-tra-phong" className="text-zinc-300 hover:text-[#ffe2a0] transition-colors block">
                  Chính sách đặt trả phòng
                </Link>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-700/80 space-y-1.5 mt-4 text-xs text-zinc-300 shadow-md">
              <span className="font-bold text-[#ffe2a0] block">Hộ Kinh Doanh Mix Boutique:</span>
              <p className="text-zinc-300">GPKD Số: 01E8034179</p>
              <p className="text-zinc-300">Địa điểm: Số 186 phố Hoàng Ngân, P. Trung Hòa, Q. Cầu Giấy, TP. Hà Nội</p>
            </div>
          </div>

          {/* Col 4: Kết nối Facebook */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#fff8ec] text-sm tracking-wider uppercase">
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
        <div className="pt-8 text-center text-xs text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            Copyright © 2020 mixhotel.vn. All Rights Reserved.
          </p>
          <p>
            Design web and SEO by{" "}
            <a
              href="https://fagoagency.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffe2a0] font-semibold hover:underline"
            >
              FAGO AGENCY
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
