"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreditCard, ShieldCheck, CalendarCheck, ArrowRight } from "lucide-react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileBottomNav from "@/components/floating/MobileBottomNav";
import ContactModal from "@/components/ui/ContactModal";
import FooterSection from "@/components/sections/FooterSection";

export default function ChinhSachPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const policies = [
    {
      title: "CHÍNH SÁCH THANH TOÁN",
      href: "/chinh-sach-thanh-toan",
      icon: CreditCard,
      description: "Quy định chi tiết về phương thức thanh toán tiền mặt trực tiếp tại quầy lễ tân và thanh toán qua thẻ ngân hàng ATM, Visa, Mastercard, chuyển khoản QR Code.",
    },
    {
      title: "CHÍNH SÁCH BẢO MẬT THÔNG TIN",
      href: "/chinh-sach-bao-mat-thong-tin",
      icon: ShieldCheck,
      description: "Cam kết bảo mật tuyệt đối 100% danh tính, số điện thoại và lịch sử đặt phòng của khách hàng. Không chia sẻ dữ liệu cho bất kỳ bên thứ ba nào.",
    },
    {
      title: "CHÍNH SÁCH ĐẶT TRẢ PHÒNG",
      href: "/chinh-sach-dat-tra-phong",
      icon: CalendarCheck,
      description: "Quy định về thời gian nhận phòng, trả phòng, chính sách giữ phòng không cần cọc trong 15-20 phút, thủ tục đổi giờ và hủy phòng linh hoạt.",
    },
  ];

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
          <span className="text-[#ffe2a0]">Chính sách</span>
        </div>
      </div>

      <main className="max-w-[1240px] mx-auto px-5 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[#c88922] uppercase mb-2 font-philosopher">
            QUY ĐỊNH & MINH BẠCH
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-philosopher text-[#fff8ec] tracking-tight mb-4 leading-tight">
            CHÍNH SÁCH & QUY ĐỊNH HOẠT ĐỘNG
          </h1>
          <div className="w-20 h-0.5 bg-[#c88922]/60 mx-auto mb-6" />
          <p className="text-base text-zinc-300 font-light leading-relaxed">
            Mix Boutique Hotel luôn đề cao tính minh bạch, bảo vệ quyền lợi và bảo mật thông tin tối đa cho mọi khách hàng trải nghiệm dịch vụ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {policies.map((p, idx) => {
            const Icon = p.icon;
            return (
              <Link
                key={idx}
                href={p.href}
                className="rounded-3xl p-8 bg-[#140e0a] border border-[#c88922]/25 shadow-xl hover:border-[#c88922] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#c88922]/15 border border-[#c88922]/30 flex items-center justify-center text-[#ffe2a0] mb-6 group-hover:bg-[#c88922] group-hover:text-[#151008] transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-bold font-philosopher text-[#fff8ec] group-hover:text-[#ffe2a0] transition-colors mb-4">
                    {p.title}
                  </h2>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold font-philosopher text-[#c88922] group-hover:text-[#ffe2a0] tracking-wider uppercase">
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <FooterSection />
      <DesktopContactBar onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileBottomNav onOpenBooking={() => setIsBookingOpen(true)} />
      <ContactModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
