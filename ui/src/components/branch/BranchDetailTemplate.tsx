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
import { RoomItem } from "@/data/branchesData";

export interface BranchConfig {
  slug: string;
  name: string;
  badge: string;
  area: string;
  address: string;
  phone: string;
  zalo: string;
  heroImage: string;
  heroDesc: string;
  rooms: RoomItem[];
  pricing: {
    superior: { hourly: string; extraHour: string; overnight: string; fullDay: string };
    deluxe: { hourly: string; extraHour: string; overnight: string; fullDay: string };
    vip: { hourly: string; extraHour: string; overnight: string; fullDay: string };
  };
  introHtml: string;
  faqs: { question: string; answer: string }[];
}

interface Props {
  branch: BranchConfig;
}

export default function BranchDetailTemplate({ branch }: Props) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(branch.rooms[0]?.name || "");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: new Date().toISOString().split("T")[0],
    time: "14:00",
    demand: "Theo giờ (2 giờ đầu)",
    note: "",
  });

  const handleOpenRoomBooking = (roomName: string) => {
    setSelectedRoom(roomName);
    const el = document.getElementById("form-lien-he");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 6000);
  };

  return (
    <div className="min-h-screen bg-[#0c080a] text-[#fff8ec]">
      <DesktopHeader onOpenBooking={() => setIsBookingModalOpen(true)} />
      <MobileHeader onOpenBooking={() => setIsBookingModalOpen(true)} />

      {/* 1. MIX BOUTIQUE HERO */}
      <section className="mixBoutiqueHero relative pt-24 md:pt-32 pb-16 px-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={branch.heroImage}
            alt={branch.name}
            fill
            priority
            className="object-cover opacity-30 filter blur-xs scale-105"
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
            <span className="text-[#eee4d3]">{branch.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-[#c88922]/20 border border-[#c88922]/50 text-[#ffe2a0] text-xs font-bold rounded-full uppercase tracking-wider">
                  {branch.badge}
                </span>
                <span className="px-3 py-1 bg-white/10 text-white/90 text-xs font-medium rounded-full">
                  <i className="fa fa-map-marker text-[#c88922] mr-1.5" />
                  {branch.area}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-philosopher text-[#ffe2a0] leading-tight">
                {branch.name}
              </h1>

              <div className="flex items-center gap-2 text-sm text-[#eee4d3]">
                <i className="fa fa-map-marker text-[#c88922]" />
                <span>{branch.address}</span>
              </div>

              <p className="text-sm md:text-base text-[#eee4d3] leading-relaxed max-w-xl">
                {branch.heroDesc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#rooms"
                  className="px-6 py-3 bg-gradient-to-r from-[#c88922] to-[#e5a73e] text-black font-bold rounded-xl text-sm md:text-base shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                >
                  <i className="fa fa-bed" />
                  Khám phá {branch.rooms.length} phòng
                </a>
                <a
                  href={branch.zalo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-blue-600/20 border border-blue-500/40 text-blue-200 font-semibold rounded-xl text-sm md:text-base hover:bg-blue-600/30 transition-all flex items-center gap-2"
                >
                  <i className="fa fa-comment" />
                  Nhắn Zalo tư vấn
                </a>
                <a
                  href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                  className="px-5 py-3 bg-white/5 border border-white/15 text-white/90 font-medium rounded-xl text-sm md:text-base hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <i className="fa fa-phone" />
                  Hotline
                </a>
              </div>

              {/* 3 Core Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <strong className="block text-xs md:text-sm text-[#ffe2a0] mb-1">
                    <i className="fa fa-shield text-[#c88922] mr-1.5" />
                    Bảo Mật Tuyệt Đối
                  </strong>
                  <span className="text-[11px] text-[#c5b8a5]">Riêng tư, kín đáo, không lo lộ thông tin.</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <strong className="block text-xs md:text-sm text-[#ffe2a0] mb-1">
                    <i className="fa fa-bath text-[#c88922] mr-1.5" />
                    Concept Đỉnh Cao
                  </strong>
                  <span className="text-[11px] text-[#c5b8a5]">Bồn tắm sục, máy chiếu, ghế Tantra, cosplay.</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <strong className="block text-xs md:text-sm text-[#ffe2a0] mb-1">
                    <i className="fa fa-credit-card text-[#c88922] mr-1.5" />
                    Linh Hoạt Tiện Lợi
                  </strong>
                  <span className="text-[11px] text-[#c5b8a5]">Thanh toán tiền mặt hoặc chuyển khoản kín.</span>
                </div>
              </div>
            </div>

            {/* Branch Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#c88922]/40 shadow-2xl">
                <Image
                  src={branch.heroImage}
                  alt={branch.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs text-[#c88922] font-semibold uppercase tracking-wider block">
                      Chi nhánh trung tâm
                    </span>
                    <strong className="text-lg text-[#ffe2a0] font-philosopher">
                      {branch.name}
                    </strong>
                    <p className="text-xs text-white/80 mt-1">{branch.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ROOM SHOWCASE GRID */}
      <section id="rooms" className="mixRoomShowcase py-16 px-4 bg-[#110d0a] border-y border-[#c88922]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Danh Sách Phòng Concept
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
              Tất Cả {branch.rooms.length} Phòng Tại {branch.name}
            </h2>
            <p className="text-sm text-[#c5b8a5] mt-2">
              Khám phá không gian độc bản, kiểm tra hình ảnh thực tế và đặt phòng trực tiếp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branch.rooms.map((room, rIdx) => (
              <div
                key={rIdx}
                className="rounded-2xl overflow-hidden bg-[#140e0a] border border-[#c88922]/25 hover:border-[#c88922]/60 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <Link
                    href={room.link}
                    className="block relative w-full h-52 overflow-hidden"
                    title={room.name}
                  >
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-[#c88922]/40 text-[#ffe2a0] text-xs font-semibold px-2.5 py-1 rounded-full">
                      {room.price}
                    </div>
                  </Link>

                  <div className="p-5">
                    <Link
                      href={room.link}
                      className="text-lg font-bold font-philosopher text-[#ffe2a0] hover:text-white transition-colors block mb-2"
                      title={room.name}
                    >
                      {room.name}
                    </Link>
                    <p className="text-xs text-[#c5b8a5] line-clamp-3 leading-relaxed mb-4">
                      {room.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2 border-t border-white/5">
                  <Link
                    href={room.link}
                    className="flex-1 py-2.5 px-3 bg-[#c88922]/15 hover:bg-[#c88922]/30 border border-[#c88922]/40 text-[#ffe2a0] text-xs font-bold rounded-xl text-center transition-all flex items-center justify-center gap-1.5"
                  >
                    <i className="fa fa-eye" />
                    Xem chi tiết
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenRoomBooking(room.name)}
                    className="flex-1 py-2.5 px-3 bg-gradient-to-r from-[#c88922] to-[#e5a73e] text-black text-xs font-bold rounded-xl text-center hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <i className="fa fa-calendar-check-o" />
                    Giữ phòng
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BRANCH PRICING TABLE */}
      <section className="mixPricePremium py-16 px-4 bg-[#0c080a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Bảng Giá Cơ Sở
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
              Báo Giá Tại {branch.name}
            </h2>
            <p className="text-sm text-[#c5b8a5] mt-2">
              Bảng giá áp dụng chuẩn cho các hạng phòng Superior, Deluxe và VIP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Superior */}
            <div className="p-6 rounded-2xl bg-[#140e0a] border border-white/10 hover:border-[#c88922]/40 transition-all">
              <span className="text-xs uppercase font-bold text-[#c88922] tracking-wider block mb-1">
                Hạng Phòng
              </span>
              <h3 className="text-xl font-bold text-[#ffe2a0] font-philosopher mb-4">Superior Room</h3>
              <div className="space-y-3 text-sm text-[#eee4d3] border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">2 giờ đầu:</span>
                  <strong className="text-[#ffe2a0]">{branch.pricing.superior.hourly}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">Thêm mỗi giờ:</span>
                  <span>{branch.pricing.superior.extraHour}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">Nghỉ qua đêm:</span>
                  <strong className="text-[#ffe2a0]">{branch.pricing.superior.overnight}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">Cả ngày đêm:</span>
                  <span>{branch.pricing.superior.fullDay}</span>
                </div>
              </div>
            </div>

            {/* Deluxe */}
            <div className="p-6 rounded-2xl bg-[#140e0a] border border-[#c88922]/50 hover:border-[#c88922] transition-all relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 bg-[#c88922] text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Yêu thích nhất
              </div>
              <span className="text-xs uppercase font-bold text-[#c88922] tracking-wider block mb-1">
                Hạng Phòng
              </span>
              <h3 className="text-xl font-bold text-[#ffe2a0] font-philosopher mb-4">Deluxe Room</h3>
              <div className="space-y-3 text-sm text-[#eee4d3] border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">2 giờ đầu:</span>
                  <strong className="text-[#ffe2a0]">{branch.pricing.deluxe.hourly}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">Thêm mỗi giờ:</span>
                  <span>{branch.pricing.deluxe.extraHour}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">Nghỉ qua đêm:</span>
                  <strong className="text-[#ffe2a0]">{branch.pricing.deluxe.overnight}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">Cả ngày đêm:</span>
                  <span>{branch.pricing.deluxe.fullDay}</span>
                </div>
              </div>
            </div>

            {/* VIP */}
            <div className="p-6 rounded-2xl bg-[#140e0a] border border-white/10 hover:border-[#c88922]/40 transition-all">
              <span className="text-xs uppercase font-bold text-[#c88922] tracking-wider block mb-1">
                Hạng Phòng
              </span>
              <h3 className="text-xl font-bold text-[#ffe2a0] font-philosopher mb-4">VIP Suite Room</h3>
              <div className="space-y-3 text-sm text-[#eee4d3] border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">2 giờ đầu:</span>
                  <strong className="text-[#ffe2a0]">{branch.pricing.vip.hourly}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">Thêm mỗi giờ:</span>
                  <span>{branch.pricing.vip.extraHour}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">Nghỉ qua đêm:</span>
                  <strong className="text-[#ffe2a0]">{branch.pricing.vip.overnight}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5b8a5]">Cả ngày đêm:</span>
                  <span>{branch.pricing.vip.fullDay}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FORM BOOKING */}
      <section id="form-lien-he" className="mixCateBooking py-16 px-4 bg-[#140e0a] border-y border-[#c88922]/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Tư Vấn & Giữ Phòng
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
              Đặt Phòng Tại {branch.name}
            </h2>
            <p className="text-sm text-[#eee4d3] mt-2">
              Lễ tân sẽ liên hệ trong 5-10 phút để xác nhận phòng trống và hỗ trợ bạn nhận phòng nhanh nhất.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-[#0c080a] border border-[#c88922]/30 shadow-2xl">
            {formSubmitted ? (
              <div className="p-8 text-center bg-[#c88922]/15 border border-[#c88922] rounded-xl space-y-3">
                <i className="fa fa-check-circle text-4xl text-[#ffe2a0]" />
                <h3 className="text-xl font-bold text-[#ffe2a0]">Đã Gửi Yêu Cầu Giữ Phòng!</h3>
                <p className="text-sm text-[#eee4d3]">
                  Cảm ơn bạn! Lễ tân tại cơ sở <strong>{branch.name}</strong> sẽ liên hệ ngay qua số điện thoại/Zalo để giữ phòng <strong>{selectedRoom}</strong> cho bạn.
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
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                      value={branch.name}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                      Phòng muốn đặt
                    </label>
                    <select
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-white/15 text-white focus:border-[#c88922] focus:outline-none text-sm"
                    >
                      {branch.rooms.map((r, idx) => (
                        <option key={idx} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                      Nhu cầu lưu trú
                    </label>
                    <select
                      value={formData.demand}
                      onChange={(e) => setFormData({ ...formData, demand: e.target.value })}
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
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-white/15 text-white focus:border-[#c88922] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                      Giờ dự kiến đến
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-white/15 text-white focus:border-[#c88922] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#ffe2a0] mb-1.5 uppercase">
                    Ghi chú yêu cầu
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Giữ phòng 15 phút, mượn đồ cosplay, chuẩn bị rượu vang..."
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

      {/* 5. FREE PERKS & DECOR */}
      <section className="mixCatePremium py-16 px-4 bg-[#0c080a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Đặc Quyền Khách Hàng
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
              Dịch Vụ & Tiện Ích Miễn Phí
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#140e0a] border border-[#c88922]/20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#c88922]/20 border border-[#c88922]/40 mx-auto flex items-center justify-center text-2xl text-[#ffe2a0] mb-4">
                <i className="fa fa-female" />
              </div>
              <h3 className="text-lg font-bold text-[#ffe2a0] font-philosopher mb-2">Miễn Phí Cosplay</h3>
              <p className="text-xs text-[#c5b8a5] leading-relaxed">
                Hơn 20+ bộ trang phục cosplay quyến rũ được giặt là sạch sẽ, thơm tho, sẵn sàng phục vụ các cặp đôi đổi gió.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#140e0a] border border-[#c88922]/20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#c88922]/20 border border-[#c88922]/40 mx-auto flex items-center justify-center text-2xl text-[#ffe2a0] mb-4">
                <i className="fa fa-lock" />
              </div>
              <h3 className="text-lg font-bold text-[#ffe2a0] font-philosopher mb-2">Đạo Cụ BDSM Tinh Tế</h3>
              <p className="text-xs text-[#c5b8a5] leading-relaxed">
                Các phụ kiện cảm xúc an toàn, tinh tế giúp tình yêu thăng hoa và khám phá những chân trời cảm xúc mới lạ.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#140e0a] border border-[#c88922]/20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#c88922]/20 border border-[#c88922]/40 mx-auto flex items-center justify-center text-2xl text-[#ffe2a0] mb-4">
                <i className="fa fa-gamepad" />
              </div>
              <h3 className="text-lg font-bold text-[#ffe2a0] font-philosopher mb-2">Board Game Tình Yêu</h3>
              <p className="text-xs text-[#c5b8a5] leading-relaxed">
                Bộ bài thử thách sự thấu hiểu và gắn kết lãng mạn, mang đến những tiếng cười và khoảnh khắc khó quên.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="mixCateFaq py-16 px-4 bg-[#140e0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#c88922] font-semibold">
              Hỏi Đáp Cơ Sở
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0] mt-1">
              Câu Hỏi Thường Gặp Tại {branch.name}
            </h2>
          </div>

          <div className="space-y-3">
            {branch.faqs.map((faq, fIdx) => (
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

      {/* 7. BOTTOM CTA */}
      <section className="catePremiumCta py-14 px-4 bg-[#0c080a] border-t border-[#c88922]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold font-philosopher text-[#ffe2a0]">
            Đặt Phòng Riêng Tư Tại {branch.name}
          </h2>
          <p className="text-sm md:text-base text-[#eee4d3] max-w-xl mx-auto">
            Địa chỉ: {branch.address}. Liên hệ lễ tân để được đón tiếp chu đáo nhất!
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={branch.zalo}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#c88922] text-black font-bold rounded-xl text-sm md:text-base hover:brightness-110 transition-all flex items-center gap-2"
            >
              <i className="fa fa-comment" />
              Chat Zalo Lễ Tân
            </a>
            <a
              href={`tel:${branch.phone.replace(/\s+/g, "")}`}
              className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl text-sm md:text-base hover:bg-white/15 transition-all flex items-center gap-2"
            >
              <i className="fa fa-phone" />
              Gọi Hotline {branch.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 8. SEO ARTICLE */}
      <article className="py-12 px-4 bg-[#140e0a]">
        <section className="max-w-4xl mx-auto p-6 md:p-8 rounded-2xl border border-[#c88922]/20 bg-[#0c080a] text-[#eee4d3] leading-relaxed text-sm md:text-base">
          <header className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#ffe2a0] font-philosopher">
              Giới Thiệu Cơ Sở {branch.name}
            </h2>
            <div className="w-16 h-0.5 bg-[#c88922] mt-2" />
          </header>
          <div
            className="data_contents space-y-4 text-justify"
            dangerouslySetInnerHTML={{ __html: branch.introHtml }}
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
