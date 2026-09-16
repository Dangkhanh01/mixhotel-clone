"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreditCard, Banknote, ShieldCheck } from "lucide-react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileActionBar from "@/components/floating/MobileActionBar";
import FooterSection from "@/components/sections/FooterSection";

export default function ChinhSachThanhToanPage() {
  return (
    <div className="min-h-screen bg-[#070503] text-[#fff8ec] selection:bg-[#c88922] selection:text-black">
      <DesktopHeader />
      <MobileHeader />

      {/* Breadcrumbs */}
      <div className="pt-24 pb-4 border-b border-[#c88922]/15 bg-[#0f0b08]">
        <div className="max-w-[1240px] mx-auto px-5 flex items-center gap-2 text-xs font-semibold text-zinc-400">
          <Link href="/" className="text-[#ffe2a0]/80 hover:text-[#ffe2a0] transition-colors font-medium">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/chinh-sach" className="text-[#ffe2a0]/80 hover:text-[#ffe2a0] transition-colors font-medium">
            Chính sách
          </Link>
          <span>/</span>
          <span className="text-[#ffe2a0]">Chính sách thanh toán</span>
        </div>
      </div>

      <main className="max-w-[960px] mx-auto px-5 py-12 md:py-16">
        <div className="text-center mb-12">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[#c88922] uppercase mb-2 font-philosopher">
            QUY ĐỊNH THANH TOÁN
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-philosopher text-[#fff8ec] tracking-tight">
            CHÍNH SÁCH THANH TOÁN
          </h1>
          <div className="w-20 h-0.5 bg-[#c88922]/60 mx-auto mt-4" />
        </div>

        <div className="rounded-3xl p-8 md:p-12 bg-[#140e0a] border border-[#c88922]/25 shadow-2xl space-y-8 text-zinc-300 leading-relaxed font-light">
          <p className="text-base md:text-lg">
            Khách hàng khi sử dụng dịch vụ tại hệ thống <strong>Mix Boutique Hotel</strong> có thể lựa chọn các hình thức thanh toán thuận tiện, an toàn và bảo mật như sau:
          </p>

          {/* Method 1 */}
          <div className="p-6 rounded-2xl bg-[#1c140e] border border-[#c88922]/20">
            <div className="flex items-center gap-3 text-[#ffe2a0] font-bold text-lg font-philosopher mb-3">
              <Banknote className="w-6 h-6 text-[#c88922]" />
              <span>1. Thanh toán tiền mặt trực tiếp tại quầy lễ tân</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Khách hàng có thể thanh toán bằng tiền mặt trực tiếp tại bộ phận lễ tân tại 4 cơ sở sau khi kết thúc thời gian nghỉ hoặc thanh toán trước:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-zinc-300 pl-4 list-disc marker:text-[#c88922]">
              <li><strong>CS1:</strong> Mix Premium - Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng Hạ, quận Đống Đa, Hà Nội.</li>
              <li><strong>CS2:</strong> Mix Boutique Hotel - 256B Đặng Tiến Đông, phường Chợ Dừa, quận Đống Đa, Hà Nội.</li>
              <li><strong>CS3:</strong> Mix Boutique Hotel - 186 Hoàng Ngân, phường Trung Hòa, quận Cầu Giấy, Hà Nội.</li>
              <li><strong>CS4:</strong> Mix Boutique Hotel - 20 Phúc La, phường Phúc La, quận Hà Đông, Hà Nội.</li>
            </ul>
          </div>

          {/* Method 2 */}
          <div className="p-6 rounded-2xl bg-[#1c140e] border border-[#c88922]/20">
            <div className="flex items-center gap-3 text-[#ffe2a0] font-bold text-lg font-philosopher mb-3">
              <CreditCard className="w-6 h-6 text-[#c88922]" />
              <span>2. Thanh toán qua thẻ ngân hàng & chuyển khoản QR</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Mix Boutique Hotel hỗ trợ quý khách thanh toán qua máy POS bằng thẻ ATM nội địa, thẻ quốc tế Visa, Mastercard, JCB, và quét mã VietQR ngân hàng 24/7 không mất phí phụ thu.
            </p>
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#c88922]/10 border border-[#c88922]/30 text-zinc-300 text-sm">
            <ShieldCheck className="w-6 h-6 text-[#ffe2a0] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#ffe2a0] font-bold mb-1">Bảo mật giao dịch:</strong>
              Mọi sao kê hóa đơn, nội dung chuyển khoản tại quầy đều được che tên nhạy cảm, chỉ hiển thị dịch vụ lưu trú nhằm tôn trọng và bảo mật quyền riêng tư cá nhân của quý khách.
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
      <DesktopContactBar />
      <MobileActionBar />
    </div>
  );
}
