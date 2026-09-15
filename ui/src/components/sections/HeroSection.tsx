"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, Phone, Calendar, User, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onOpenContact: (type: "phone" | "zalo" | "booking") => void;
}

export default function HeroSection({ onOpenContact }: HeroSectionProps) {
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    branch: "cs1",
    roomType: "standard",
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenContact("booking");
  };

  return (
    <section className="mixLuxuryHero" id="top">
      {/* Background Image */}
      <div className="mixLuxuryHeroBg">
        <Image
          src="/images/hero-bg.webp"
          alt="Mix Boutique Hotel Không gian phòng concept"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Layer Veils & Aura */}
      <div aria-hidden="true" className="mixLuxuryHeroVeil" />
      <div aria-hidden="true" className="mixLuxuryHeroFloor" />
      <div aria-hidden="true" className="mixLuxuryHeroGlow" />

      <div className="mixLuxuryContainer">
        <div className="mixLuxuryHeroGrid">
          {/* Left Column: Hero Content */}
          <div className="mixLuxuryHeroContent">
            <div className="mixLuxuryKicker font-philosopher">
              KHÁCH SẠN TÌNH YÊU TẠI HÀ NỘI
            </div>

            <h1 className="mixLuxuryDisplay font-philosopher">
              Mix Boutique Hotel phòng concept{" "}
              <span className="mixLuxuryGold">riêng tư</span> cho hai người
            </h1>

            <p className="mixLuxuryLead font-philosopher">
              Xem ảnh thật, video phòng thật, chọn concept hợp gu và nhắn Zalo để giữ phòng nhanh tại 3 chi nhánh Hà Nội.
            </p>

            {/* Actions */}
            <div className="mixLuxuryActions">
              <a
                href="https://zalo.me/0383104010"
                target="_blank"
                rel="noreferrer"
                className="mixLuxuryBtn mixLuxuryBtnPrimary font-philosopher uppercase"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Nhắn Zalo Tư Vấn</span>
              </a>

              <a
                href="tel:0383104010"
                className="mixLuxuryBtn mixLuxuryBtnOutline font-philosopher uppercase"
              >
                <Phone className="w-4 h-4 text-[#ffe2a0]" />
                <span>Gọi Ngay</span>
              </a>
            </div>

            {/* 4 Stats Cards */}
            <div className="mixLuxuryStats">
              <div className="mixLuxuryStat">
                <span className="mixLuxuryStatNumber font-philosopher">3</span>
                <span className="mixLuxuryStatText font-philosopher">
                  chi nhánh Hà Nội dễ di chuyển
                </span>
              </div>

              <div className="mixLuxuryStat">
                <span className="mixLuxuryStatNumber font-philosopher">32+</span>
                <span className="mixLuxuryStatText font-philosopher">
                  phòng concept đổi gió cho cặp đôi
                </span>
              </div>

              <div className="mixLuxuryStat">
                <span className="mixLuxuryStatNumber font-philosopher">199k</span>
                <span className="mixLuxuryStatText font-philosopher">
                  giá từ 199k / 2h đầu
                </span>
              </div>

              <div className="mixLuxuryStat">
                <span className="mixLuxuryStatNumber font-philosopher">Kín đáo</span>
                <span className="mixLuxuryStatText font-philosopher">
                  riêng tư, an tâm, không lo thông tin
                </span>
              </div>
            </div>

            {/* Mini preview shots */}
            <div className="grid grid-cols-3 gap-3 mt-6 max-w-md">
              <div className="relative h-20 rounded-xl overflow-hidden border border-[#c88922]/30 shadow-md">
                <Image src="/images/469-moonlit-love.jpg" alt="Room 469" fill className="object-cover" />
              </div>
              <div className="relative h-20 rounded-xl overflow-hidden border border-[#c88922]/30 shadow-md">
                <Image src="/images/302-karma.jpg" alt="Room 302" fill className="object-cover" />
              </div>
              <div className="relative h-20 rounded-xl overflow-hidden border border-[#c88922]/30 shadow-md">
                <Image src="/images/202-galaxy.jpg" alt="Room 202" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Form Card */}
          <div className="mixLuxuryReserve">
            <h2 className="mixLuxuryReserveTitle font-philosopher">
              TƯ VẤN TỨC THÌ
            </h2>
            <p className="mixLuxuryReserveText font-philosopher">
              Giữ Phòng Nhanh Nhất &bull; Gửi nhu cầu, Mix sẽ liên hệ xác nhận tình trạng phòng trống ngay.
            </p>

            <form onSubmit={handleBookingSubmit} className="mixLuxuryReserveForm">
              <input
                type="text"
                placeholder="Họ tên *"
                required
                value={bookingData.name}
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                className="mixLuxuryInput font-philosopher"
              />

              <input
                type="tel"
                placeholder="Điện thoại *"
                required
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                className="mixLuxuryInput font-philosopher"
              />

              <select
                value={bookingData.branch}
                onChange={(e) => setBookingData({ ...bookingData, branch: e.target.value })}
                className="mixLuxuryInput font-philosopher"
              >
                <option value="cs1">CS1: Huỳnh Thúc Kháng (Mix Premium)</option>
                <option value="cs2">CS2: 256B Đặng Tiến Đông, Đống Đa</option>
                <option value="cs3">CS3: 20 Phúc La, Hà Đông</option>
              </select>

              <select
                value={bookingData.roomType}
                onChange={(e) => setBookingData({ ...bookingData, roomType: e.target.value })}
                className="mixLuxuryInput font-philosopher"
              >
                <option value="standard">Phòng Tiêu Chuẩn (từ 199k)</option>
                <option value="boutique">Phòng Boutique Concept (từ 300k)</option>
                <option value="vip">Phòng VIP Suite Bồn Sục (từ 400k)</option>
              </select>

              <button
                type="submit"
                className="mixLuxuryBtn mixLuxuryBtnPrimary font-philosopher uppercase mt-2 w-full justify-center tracking-wider"
              >
                GỬI YÊU CẦU GIỮ PHÒNG
              </button>
            </form>

            <p className="mixLuxuryNote font-philosopher text-center">
              Chưa đặt cọc: Mix hỗ trợ giữ phòng 15 - 20 phút tùy tình trạng phòng.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
