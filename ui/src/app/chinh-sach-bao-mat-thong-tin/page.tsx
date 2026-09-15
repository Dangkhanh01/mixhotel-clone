"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, UserCheck } from "lucide-react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileBottomNav from "@/components/floating/MobileBottomNav";
import ContactModal from "@/components/ui/ContactModal";
import FooterSection from "@/components/sections/FooterSection";

export default function ChinhSachBaoMatPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070503] text-[#fff8ec] selection:bg-[#c88922] selection:text-black">
      <DesktopHeader onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileHeader onOpenBooking={() => setIsBookingOpen(true)} />

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
          <span className="text-[#ffe2a0]">Chính sách bảo mật thông tin</span>
        </div>
      </div>

      <main className="max-w-[960px] mx-auto px-5 py-12 md:py-16">
        <div className="text-center mb-12">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[#c88922] uppercase mb-2 font-philosopher">
            CAM KẾT BẢO VỆ DỮ LIỆU
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-philosopher text-[#fff8ec] tracking-tight">
            CHÍNH SÁCH BẢO MẬT THÔNG TIN
          </h1>
          <div className="w-20 h-0.5 bg-[#c88922]/60 mx-auto mt-4" />
        </div>

        <div className="rounded-3xl p-8 md:p-12 bg-[#140e0a] border border-[#c88922]/25 shadow-2xl space-y-8 text-zinc-300 leading-relaxed font-light">
          <div>
            <h2 className="text-xl font-bold font-philosopher text-[#ffe2a0] mb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#c88922]" />
              <span>1. Mục đích và phạm vi thu thập thông tin</span>
            </h2>
            <p className="text-sm leading-relaxed">
              Mix Boutique Hotel chỉ thu thập những thông tin cơ bản cần thiết cho việc đặt giữ phòng, bao gồm: Họ tên (hoặc biệt danh), Số điện thoại liên hệ và Thời gian nhận phòng. Chúng tôi không bao giờ thu thập thông tin đời tư không liên quan đến kỳ nghỉ của quý khách.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-philosopher text-[#ffe2a0] mb-3 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-[#c88922]" />
              <span>2. Phạm vi sử dụng thông tin</span>
            </h2>
            <p className="text-sm leading-relaxed">
              Thông tin thu thập chỉ được sử dụng nội bộ để:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm pl-4 list-disc marker:text-[#c88922]">
              <li>Xác nhận tình trạng phòng trống và thông báo cho khách hàng qua điện thoại/Zalo.</li>
              <li>Hỗ trợ khách hàng đổi ngày giờ hoặc tiếp nhận yêu cầu setup hoa nến trang trí sự kiện.</li>
              <li>Xử lý các tình huống khẩn cấp hoặc gửi đồ khách hàng để quên khi trả phòng.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold font-philosopher text-[#ffe2a0] mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#c88922]" />
              <span>3. Thời gian lưu trữ & Bảo mật tuyệt đối</span>
            </h2>
            <p className="text-sm leading-relaxed">
              Dữ liệu số điện thoại đặt phòng được mã hóa và tự động xóa khỏi danh bạ lưu trữ sau khi khách hoàn tất lưu trú. Chúng tôi cam kết tuyệt đối không bán, chia sẻ hay tiết lộ thông tin khách hàng cho bất kỳ tổ chức hay cá nhân thứ ba nào vì mục đích thương mại.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-philosopher text-[#ffe2a0] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#c88922]" />
              <span>4. Đơn vị thu thập và quản lý thông tin</span>
            </h2>
            <div className="p-4 rounded-xl bg-[#1c140e] border border-[#c88922]/20 text-sm space-y-1">
              <p><strong>Đơn vị:</strong> Hộ Kinh Doanh Mix Boutique / Công ty TNHH TM & DV Linh Khanh</p>
              <p><strong>GPKD Số:</strong> 01E8034179</p>
              <p><strong>Địa chỉ:</strong> Số 186 phố Hoàng Ngân, Phường Trung Hòa, Cầu Giấy, Hà Nội</p>
              <p><strong>Hotline bảo mật:</strong> 038 310 4010 - Email: mixhotel.vn@gmail.com</p>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
      <DesktopContactBar onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileBottomNav onOpenBooking={() => setIsBookingOpen(true)} />
      <ContactModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
