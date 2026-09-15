"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileBottomNav from "@/components/floating/MobileBottomNav";
import ContactModal from "@/components/ui/ContactModal";
import FooterSection from "@/components/sections/FooterSection";
import { RoomDetail } from "@/data/roomsDetailData";

interface Props {
  room: RoomDetail;
}

export default function RoomDetailClient({ room }: Props) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string>(room.heroImage);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    bookingDate: new Date().toISOString().split("T")[0],
    bookingTime: "14:00",
    bookingDemand: "Theo giờ (2 giờ đầu)",
    note: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 6000);
  };

  const scrollToBooking = () => {
    const el = document.getElementById("booking-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c080a] text-[#fff8ec]">
      <DesktopHeader onOpenBooking={() => setIsBookingModalOpen(true)} />
      <MobileHeader onOpenBooking={() => setIsBookingModalOpen(true)} />

      {/* 1. MIX DETAIL HERO */}
      <section className="mixDetailHero relative pt-24 md:pt-32 pb-16 px-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={room.heroImage}
            alt={room.name}
            fill
            priority
            className="object-cover opacity-25 filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c080a] via-[#0c080a]/80 to-[#0c080a]/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-[#c88922] mb-4">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <span>/</span>
            <Link href="/khach-san-tinh-yeu" className="hover:underline">Khách sạn tình yêu</Link>
            <span>/</span>
            <span className="text-[#eee4d3]">{room.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-[#c88922]/20 border border-[#c88922]/50 text-[#ffe2a0] text-xs font-bold rounded-full uppercase tracking-wider">
                  {room.badge}
                </span>
                <span className="px-3 py-1 bg-white/10 text-white/90 text-xs font-medium rounded-full">
                  <i className="fa fa-map-marker text-[#c88922] mr-1.5" />
                  {room.branchName}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-philosopher text-[#ffe2a0] leading-tight">
                {room.name}
              </h1>

              <p className="text-sm md:text-base text-[#eee4d3] leading-relaxed max-w-xl">
                {room.heroSubtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="px-6 py-3 bg-gradient-to-r from-[#c88922] to-[#e5a73e] text-black font-bold rounded-xl text-sm md:text-base shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                >
                  <i className="fa fa-calendar-check-o" />
                  Giữ phòng nhanh
                </button>
                <a
                  href={room.branchZalo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-blue-600/20 border border-blue-500/40 text-blue-200 font-semibold rounded-xl text-sm md:text-base hover:bg-blue-600/30 transition-all flex items-center gap-2"
                >
                  <i className="fa fa-comment" />
                  Nhắn Zalo tư vấn
                </a>
                <a
                  href={`tel:${room.branchPhone.replace(/\s+/g, "")}`}
                  className="px-5 py-3 bg-white/5 border border-white/15 text-white/90 font-medium rounded-xl text-sm md:text-base hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <i className="fa fa-phone" />
                  Hotline
                </a>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                <div className="text-center p-2 rounded-lg bg-black/40 border border-white/5">
                  <strong className="block text-sm md:text-base text-[#ffe2a0]">100%</strong>
                  <span className="text-[11px] text-[#c5b8a5]">Kín đáo, riêng tư</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-black/40 border border-white/5">
                  <strong className="block text-sm md:text-base text-[#ffe2a0]">15-20&apos;</strong>
                  <span className="text-[11px] text-[#c5b8a5]">Giữ phòng không cọc</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-black/40 border border-white/5">
                  <strong className="block text-sm md:text-base text-[#ffe2a0]">Free</strong>
                  <span className="text-[11px] text-[#c5b8a5]">Cosplay & Board Game</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-black/40 border border-white/5">
                  <strong className="block text-sm md:text-base text-[#ffe2a0]">24/7</strong>
                  <span className="text-[11px] text-[#c5b8a5]">Hỗ trợ nhận phòng</span>
                </div>
              </div>
            </div>

            {/* Main Featured Photo */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#c88922]/40 shadow-2xl">
                <Image
                  src={activeImage}
                  alt={room.name}
                  fill
                  className="object-cover transition-all duration-300"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ROOM GALLERY SECTION */}
      {room.galleryImages && room.galleryImages.length > 0 && (
        <section className="roomImageDetailGallery py-12 px-4 bg-[#110d0a] border-y border-[#c88922]/15">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
                Album Ảnh Thật 100%
              </span>
              <h2 className="text-xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
                Không Gian Thực Tế Của {room.name}
              </h2>
              <p className="text-sm text-[#c5b8a5] mt-2 max-w-xl mx-auto">
                Bấm vào từng ảnh nhỏ để xem hình lớn, kiểm tra chi tiết không gian, góc giường và ánh sáng thực tế.
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {room.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                    activeImage === img
                      ? "border-[#e5a73e] scale-105 shadow-lg shadow-[#c88922]/20"
                      : "border-white/10 hover:border-[#c88922]/60"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${room.name} ảnh ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. VIDEO SHOWCASE (IF AVAILABLE) */}
      {room.youtubeUrl && (
        <section className="roomYoutubeDetail py-12 px-4 bg-[#0c080a]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Trải Nghiệm Thực Tế
            </span>
            <h2 className="text-xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1 mb-6">
              Video Review Không Gian Phòng
            </h2>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#c88922]/30 shadow-2xl">
              <iframe
                src={room.youtubeUrl}
                title={`Video ${room.name}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* 4. DETAIL CONCEPT & PERKS */}
      <section className="detailConceptPremium py-16 px-4 bg-[#140e0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Điểm Nhấn Độc Quyền
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
              {room.conceptTitle}
            </h2>
            <p className="text-sm md:text-base text-[#eee4d3] max-w-2xl mx-auto mt-3">
              {room.conceptDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {room.perks.map((perk, pIdx) => (
              <div
                key={pIdx}
                className="p-6 rounded-2xl bg-[#0c080a] border border-[#c88922]/20 hover:border-[#c88922]/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c88922]/15 border border-[#c88922]/30 flex items-center justify-center text-[#ffe2a0] text-xl mb-4 group-hover:scale-110 transition-transform">
                  <i className="fa fa-heart" />
                </div>
                <h3 className="text-lg font-bold text-[#ffe2a0] mb-2 font-philosopher">
                  {perk.title}
                </h3>
                <p className="text-sm text-[#c5b8a5] leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING TABLE */}
      <section className="detailPricePremium py-16 px-4 bg-[#0c080a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Bảng Giá Rõ Ràng Minh Bạch
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
              Báo Giá Phòng {room.name}
            </h2>
            <p className="text-sm text-[#c5b8a5] mt-2">
              Áp dụng tại cơ sở {room.branchName}. Không phát sinh phụ phí ẩn.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-[#140e0a] border border-[#c88922]/30 text-center flex flex-col justify-between">
              <span className="text-xs text-[#c5b8a5] uppercase font-semibold">2 Giờ Đầu</span>
              <div className="my-4">
                <span className="text-2xl md:text-3xl font-bold text-[#ffe2a0]">
                  {room.pricing.hourly.split("/")[0]}
                </span>
                <span className="text-xs text-white/60 block mt-1">/ 2 giờ</span>
              </div>
              <span className="text-xs text-[#c88922]">Khung giờ hẹn hò nhanh</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#140e0a] border border-white/10 text-center flex flex-col justify-between">
              <span className="text-xs text-[#c5b8a5] uppercase font-semibold">Thêm Giờ</span>
              <div className="my-4">
                <span className="text-2xl md:text-3xl font-bold text-[#fff8ec]">
                  {room.pricing.extraHour.split("/")[0]}
                </span>
                <span className="text-xs text-white/60 block mt-1">/ mỗi giờ tiếp theo</span>
              </div>
              <span className="text-xs text-white/60">Linh hoạt theo nhu cầu</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#140e0a] border border-[#c88922]/40 text-center flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#c88922] text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                Phổ biến
              </div>
              <span className="text-xs text-[#c5b8a5] uppercase font-semibold">Qua Đêm</span>
              <div className="my-4">
                <span className="text-2xl md:text-3xl font-bold text-[#ffe2a0]">
                  {room.pricing.overnight}
                </span>
                <span className="text-xs text-white/60 block mt-1">Tối đến 12h trưa hôm sau</span>
              </div>
              <span className="text-xs text-[#c88922]">Trọn đêm lãng mạn</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#140e0a] border border-white/10 text-center flex flex-col justify-between">
              <span className="text-xs text-[#c5b8a5] uppercase font-semibold">Cả Ngày Đêm</span>
              <div className="my-4">
                <span className="text-2xl md:text-3xl font-bold text-[#fff8ec]">
                  {room.pricing.fullDay}
                </span>
                <span className="text-xs text-white/60 block mt-1">24 giờ trọn vẹn</span>
              </div>
              <span className="text-xs text-white/60">Thoải mái nghỉ dưỡng</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOOKING CONSULTATION FORM */}
      <section id="booking-form" className="detailBookingPremium py-16 px-4 bg-[#140e0a] border-y border-[#c88922]/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Đặt Phòng Kín Đáo
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
              Giữ Phòng {room.name}
            </h2>
            <p className="text-sm text-[#eee4d3] mt-2">
              Để lại thông tin, lễ tân Mix Hotel sẽ liên hệ xác nhận tình trạng phòng trống trong 5-10 phút.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#0c080a] border border-[#c88922]/30 shadow-2xl">
            {formSubmitted ? (
              <div className="p-8 text-center bg-[#c88922]/15 border border-[#c88922] rounded-xl space-y-3">
                <i className="fa fa-check-circle text-4xl text-[#ffe2a0]" />
                <h3 className="text-xl font-bold text-[#ffe2a0]">Đã Gửi Yêu Cầu Giữ Phòng!</h3>
                <p className="text-sm text-[#eee4d3]">
                  Cảm ơn bạn! Lễ tân tại cơ sở <strong>{room.branchName}</strong> sẽ liên hệ ngay qua số điện thoại/Zalo để giữ phòng <strong>{room.name}</strong> cho bạn.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                      Họ tên / Biệt danh
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Anh Nam"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-white/15 text-white focus:border-[#c88922] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                      Số điện thoại / Zalo
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-white/15 text-white focus:border-[#c88922] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                      Cơ sở
                    </label>
                    <input
                      type="text"
                      disabled
                      value={room.branchName}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                      Phòng đã chọn
                    </label>
                    <input
                      type="text"
                      disabled
                      value={room.name}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#ffe2a0] font-semibold text-sm cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                      Nhu cầu lưu trú
                    </label>
                    <select
                      value={formData.bookingDemand}
                      onChange={(e) => setFormData({ ...formData, bookingDemand: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-white/15 text-white focus:border-[#c88922] focus:outline-none text-sm"
                    >
                      <option value="Theo giờ (2 giờ đầu)">Theo giờ (2 giờ đầu)</option>
                      <option value="Qua đêm">Nghỉ qua đêm</option>
                      <option value="Cả ngày đêm">Cả ngày đêm</option>
                      <option value="Trang trí sự kiện kỷ niệm">Setup sự kiện kỷ niệm</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                      Ngày nhận phòng
                    </label>
                    <input
                      type="date"
                      value={formData.bookingDate}
                      onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-white/15 text-white focus:border-[#c88922] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                      Giờ dự kiến đến
                    </label>
                    <input
                      type="time"
                      value={formData.bookingTime}
                      onChange={(e) => setFormData({ ...formData, bookingTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-white/15 text-white focus:border-[#c88922] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                    Yêu cầu đặc biệt (tuỳ chọn)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Cần mượn cosplay, chuẩn bị bồn tắm sục, setup nến hoa kỷ niệm..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-white/15 text-white focus:border-[#c88922] focus:outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#c88922] via-[#e5a73e] to-[#c88922] text-black font-bold rounded-xl text-base shadow-lg hover:brightness-110 transition-all cursor-pointer uppercase tracking-wider"
                >
                  Xác Nhận Giữ Phòng Tức Thì
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. DECOR EVENT PACKAGES */}
      <section className="detailMemorySection py-16 px-4 bg-[#0c080a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Gói Trang Trí Kỷ Niệm
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
              Tạo Bất Ngờ Ngọt Ngào Cùng {room.name}
            </h2>
            <p className="text-sm text-[#c5b8a5] mt-2">
              Biến buổi hẹn thành kỷ niệm đáng nhớ với các gói trang trí chỉn chu chuẩn bị sẵn trước khi bạn đến.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#140e0a] border border-[#c88922]/20">
              <h3 className="text-base font-bold text-[#ffe2a0] mb-2 font-philosopher">Nến - Hoa - Bóng</h3>
              <p className="text-xs text-[#c5b8a5] mb-3">Con đường hoa hồng, nến tealight lung linh và bong bóng bay lãng mạn.</p>
              <span className="text-xs font-semibold text-[#c88922]">Setup theo yêu cầu</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#140e0a] border border-[#c88922]/20">
              <h3 className="text-base font-bold text-[#ffe2a0] mb-2 font-philosopher">Rượu Vang & Nến</h3>
              <p className="text-xs text-[#c5b8a5] mb-3">Set rượu vang đỏ nhập khẩu kèm ly pha lê cao cấp và khay hoa nến.</p>
              <span className="text-xs font-semibold text-[#c88922]">Setup theo yêu cầu</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#140e0a] border border-[#c88922]/20">
              <h3 className="text-base font-bold text-[#ffe2a0] mb-2 font-philosopher">Bánh Kem Sinh Nhật</h3>
              <p className="text-xs text-[#c5b8a5] mb-3">Bánh kem tươi hương vị tinh tế, viết tên và lời chúc ngọt ngào theo ý bạn.</p>
              <span className="text-xs font-semibold text-[#c88922]">Setup theo yêu cầu</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#140e0a] border border-[#c88922]/20">
              <h3 className="text-base font-bold text-[#ffe2a0] mb-2 font-philosopher">Rượu & Trái Cây</h3>
              <p className="text-xs text-[#c5b8a5] mb-3">Đĩa trái cây tươi theo mùa cắt tỉa nghệ thuật cùng vang hảo hạng.</p>
              <span className="text-xs font-semibold text-[#c88922]">Setup theo yêu cầu</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ROOM FAQ */}
      <section className="detailFaqSection py-16 px-4 bg-[#140e0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Giải Đáp Thắc Mắc
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
              Câu Hỏi Thường Gặp Về Phòng {room.name}
            </h2>
          </div>

          <div className="space-y-3">
            {room.faqs.map((faq, fIdx) => (
              <details
                key={fIdx}
                className="group p-4 rounded-xl bg-[#0c080a] border border-[#c88922]/25 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm md:text-base text-[#ffe2a0]">
                  <span>{faq.question}</span>
                  <i className="fa fa-chevron-down text-xs text-[#c88922] transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-[#eee4d3] leading-relaxed pt-3 border-t border-white/10">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA */}
      <section className="detailBookingCtaSection py-14 px-4 bg-[#0c080a] border-t border-[#c88922]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0]">
            Sẵn Sàng Cho Đêm Hẹn Hò Đáng Nhớ?
          </h2>
          <p className="text-sm md:text-base text-[#eee4d3] max-w-xl mx-auto">
            Liên hệ ngay với Mix Boutique Hotel tại {room.branchName} để được hỗ trợ giữ phòng {room.name} nhanh chóng và bảo mật nhất.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={room.branchZalo}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#c88922] text-black font-bold rounded-xl text-sm md:text-base hover:brightness-110 transition-all flex items-center gap-2"
            >
              <i className="fa fa-comment" />
              Chat Zalo Ngay
            </a>
            <a
              href={`tel:${room.branchPhone.replace(/\s+/g, "")}`}
              className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl text-sm md:text-base hover:bg-white/15 transition-all flex items-center gap-2"
            >
              <i className="fa fa-phone" />
              Gọi Hotline {room.branchPhone}
            </a>
          </div>
        </div>
      </section>

      {/* 10. STORY / SEO ARTICLE */}
      <article className="py-12 px-4 bg-[#140e0a]">
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-2xl border border-[#c88922]/20 bg-[#0c080a] text-[#eee4d3] leading-relaxed text-sm md:text-base">
          <header className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#ffe2a0] font-philosopher">
              Cảm Nhận & Câu Chuyện Của {room.name}
            </h2>
            <div className="w-16 h-0.5 bg-[#c88922] mt-2" />
          </header>
          <div
            className="data_contents space-y-4 text-justify"
            dangerouslySetInnerHTML={{ __html: room.storyHtml }}
          />
        </section>
      </article>

      <FooterSection />
      <DesktopContactBar />
      <MobileBottomNav onOpenBooking={() => setIsBookingModalOpen(true)} />
      <ContactModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
}
