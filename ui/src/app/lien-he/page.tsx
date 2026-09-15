"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileBottomNav from "@/components/floating/MobileBottomNav";
import ContactModal from "@/components/ui/ContactModal";
import FooterSection from "@/components/sections/FooterSection";

export default function LienHePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          <span className="text-[#ffe2a0]">Liên hệ</span>
        </div>
      </div>

      <main className="max-w-[1240px] mx-auto px-5 py-12 md:py-16">
        <div className="text-center mb-12">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[#c88922] uppercase mb-2 font-philosopher">
            HỖ TRỢ 24/7
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-philosopher text-[#fff8ec] tracking-tight">
            THÔNG TIN LIÊN HỆ
          </h1>
          <div className="w-20 h-0.5 bg-[#c88922]/60 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 rounded-3xl p-8 md:p-10 bg-[#140e0a] border border-[#c88922]/25 shadow-2xl">
            <h2 className="text-2xl font-bold font-philosopher text-[#fff8ec] mb-2">
              Gửi Yêu Cầu Tư Vấn & Đặt Phòng
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 mb-6 font-light">
              Quý khách có thể liên hệ số hotline: <strong className="text-[#ffe2a0]">038 310 4010</strong> hoặc điền thông tin bên dưới để được nhân viên hỗ trợ nhanh nhất.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#c88922]/10 border border-[#c88922]/40 text-center">
                <CheckCircle2 className="w-12 h-12 text-[#ffe2a0] mx-auto mb-3" />
                <h3 className="text-xl font-bold font-philosopher text-[#fff8ec] mb-2">
                  Cảm Ơn Quý Khách!
                </h3>
                <p className="text-sm text-zinc-300">
                  Thông tin của bạn đã được gửi thành công. Tư vấn viên của Mix Hotel sẽ liên hệ lại trong vòng 5 - 10 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-philosopher uppercase tracking-wider">
                    Họ Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập họ và tên của bạn..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0806] border border-[#c88922]/30 text-[#fff8ec] text-sm focus:outline-none focus:border-[#ffe2a0] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-philosopher uppercase tracking-wider">
                      Số Điện Thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="038 310 4010"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0c0806] border border-[#c88922]/30 text-[#fff8ec] text-sm focus:outline-none focus:border-[#ffe2a0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-philosopher uppercase tracking-wider">
                      Email Liên Hệ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0c0806] border border-[#c88922]/30 text-[#fff8ec] text-sm focus:outline-none focus:border-[#ffe2a0] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-philosopher uppercase tracking-wider">
                    Nội Dung Ghi Chú
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Loại phòng mong muốn, thời gian check-in hoặc yêu cầu setup trang trí sự kiện..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0806] border border-[#c88922]/30 text-[#fff8ec] text-sm focus:outline-none focus:border-[#ffe2a0] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#c88922] via-[#ffe2a0] to-[#d9a83a] text-[#1a0f05] font-philosopher font-bold text-sm tracking-wider uppercase shadow-xl hover:scale-102 transition-transform cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Thông Tin Liên Hệ</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Address & Branches Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl p-8 bg-[#140e0a] border border-[#c88922]/25 shadow-xl space-y-6">
              <h2 className="text-xl font-bold font-philosopher text-[#fff8ec] pb-3 border-b border-[#c88922]/15">
                Hệ Thống Cơ Sở Tại Hà Nội
              </h2>

              <div className="space-y-4 text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c88922] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#ffe2a0]">CS1: Mix Premium</strong>
                    <span>Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, Đống Đa, Hà Nội</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c88922] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#ffe2a0]">CS2: 256B Đặng Tiến Đông</strong>
                    <span>256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c88922] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#ffe2a0]">CS3: 20 Phúc La Hà Đông</strong>
                    <span>20 Phố Phúc La, Phúc La, Hà Đông, Hà Nội</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#c88922]/15 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Phone className="w-4 h-4 text-[#c88922]" />
                  <span>Hotline: <strong className="text-[#ffe2a0]">038 310 4010</strong></span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail className="w-4 h-4 text-[#c88922]" />
                  <span>Email: <strong className="text-[#ffe2a0]">mixhotel.vn@gmail.com</strong></span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Clock className="w-4 h-4 text-[#c88922]" />
                  <span>Thời gian hoạt động: <strong className="text-[#ffe2a0]">24/24h Hàng Ngày</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Zalo Box */}
            <div className="rounded-3xl p-6 bg-gradient-to-r from-[#17100b] to-[#20150d] border border-[#c88922]/30 text-center">
              <p className="text-xs text-[#ffe2a0] font-bold font-philosopher uppercase tracking-wider mb-2">
                Hỗ Trợ Kín Đáo & Nhanh Chóng
              </p>
              <h3 className="text-lg font-bold font-philosopher text-[#fff8ec] mb-4">
                Chat Trực Tiếp Qua Zalo Mix Hotel
              </h3>
              <a
                href="https://zalo.me/0383104010"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d8a85a] to-[#f3cb82] text-[#151008] font-philosopher font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
              >
                Mở Zalo Ngay
              </a>
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
