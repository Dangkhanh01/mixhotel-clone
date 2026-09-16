"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

interface HeroSectionProps {
  onOpenContact?: (type: "phone" | "zalo" | "booking") => void;
}

export default function HeroSection({ onOpenContact }: HeroSectionProps) {
  const { openBranchSelect, openConnectConfirm } = useModal();
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    branch: "Mix Boutique Premium (Huỳnh Thúc Kháng)",
    roomType: "Nghỉ giờ (từ 2h)",
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenContact) {
      onOpenContact("booking");
    } else {
      openConnectConfirm(
        "Chat Zalo Giữ Phòng",
        `https://zalo.me/0383104010?text=${encodeURIComponent(
          `Chào Mix, tôi là ${bookingData.name} (${bookingData.phone}), muốn đặt phòng tại ${bookingData.branch}, gói: ${bookingData.roomType}`
        )}`
      );
    }
  };

  const handleZalo = () => {
    if (onOpenContact) {
      onOpenContact("zalo");
    } else {
      openBranchSelect("zalo");
    }
  };

  const handlePhone = () => {
    if (onOpenContact) {
      onOpenContact("phone");
    } else {
      openBranchSelect("phone");
    }
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
            <div className="mixLuxuryKicker">
              KHÁCH SẠN TÌNH YÊU TẠI HÀ NỘI
            </div>

            <h1 className="mixLuxuryDisplay">
              Mix Boutique Hotel phòng concept{" "}
              <span className="mixLuxuryGold">riêng tư</span> cho hai người
            </h1>

            <p className="mixLuxuryLead">
              Xem ảnh thật, video phòng thật, chọn concept hợp gu và nhắn Zalo để giữ phòng nhanh tại 3 chi nhánh Hà Nội.
            </p>

            {/* Actions */}
            <div className="mixLuxuryActions">
              <button
                type="button"
                onClick={handleZalo}
                className="mixLuxuryBtn mixLuxuryBtnPrimary callContactLocate cursor-pointer border-none"
              >
                <i className="fa fa-commenting text-lg"></i>
                <span>Nhắn Zalo Tư Vấn</span>
              </button>

              <button
                type="button"
                onClick={handlePhone}
                className="mixLuxuryBtn mixLuxuryBtnOutline callContactLocate cursor-pointer border-none"
              >
                <i className="fa fa-phone text-lg"></i>
                <span>Gọi Ngay</span>
              </button>
            </div>

            {/* 4 Stats Cards */}
            <div className="mixLuxuryStats">
              <div className="mixLuxuryStat">
                <span className="mixLuxuryStatNumber">3</span>
                <span className="mixLuxuryStatText">
                  chi nhánh Hà Nội dễ di chuyển
                </span>
              </div>

              <div className="mixLuxuryStat">
                <span className="mixLuxuryStatNumber">32+</span>
                <span className="mixLuxuryStatText">
                  phòng concept đổi gió cho cặp đôi
                </span>
              </div>

              <div className="mixLuxuryStat">
                <span className="mixLuxuryStatNumber">199k</span>
                <span className="mixLuxuryStatText">
                  giá từ 199k / 2h đầu
                </span>
              </div>

              <div className="mixLuxuryStat">
                <span className="mixLuxuryStatNumber">Kín đáo</span>
                <span className="mixLuxuryStatText">
                  riêng tư, an tâm, không lo thông tin
                </span>
              </div>
            </div>

            {/* Mini preview shots */}
            <div className="mixLuxuryMobileShots grid grid-cols-3 gap-3 mt-6 max-w-md">
              <div className="relative h-20 rounded-xl overflow-hidden border border-[#c88922]/30 shadow-md">
                <Image src="/images/thu-vien-1.webp" alt="Phòng Mix 1" fill className="object-cover" />
              </div>
              <div className="relative h-20 rounded-xl overflow-hidden border border-[#c88922]/30 shadow-md">
                <Image src="/images/thu-vien-2.webp" alt="Phòng Mix 2" fill className="object-cover" />
              </div>
              <div className="relative h-20 rounded-xl overflow-hidden border border-[#c88922]/30 shadow-md">
                <Image src="/images/thu-vien-3.webp" alt="Phòng Mix 3" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Form Card */}
          <div className="mixLuxuryReserve">
            <h2 className="mixLuxuryReserveTitle">
              TƯ VẤN TỨC THÌ
            </h2>
            <p className="mixLuxuryReserveText">
              Giữ Phòng Nhanh Nhất &bull; Gửi nhu cầu, Mix sẽ liên hệ xác nhận tình trạng phòng trống ngay.
            </p>

            <form onSubmit={handleBookingSubmit} className="mixLuxuryReserveForm">
              <input
                type="text"
                placeholder="Họ tên *"
                required
                value={bookingData.name}
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                className="mixLuxuryInput"
              />

              <input
                type="tel"
                placeholder="Điện thoại *"
                required
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                className="mixLuxuryInput"
              />

              <select
                value={bookingData.branch}
                onChange={(e) => setBookingData({ ...bookingData, branch: e.target.value })}
                className="mixLuxuryInput"
              >
                <option value="CS1: Huỳnh Thúc Kháng (Mix Premium)">CS1: Huỳnh Thúc Kháng (Mix Premium)</option>
                <option value="CS2: 256B Đặng Tiến Đông, Đống Đa">CS2: 256B Đặng Tiến Đông, Đống Đa</option>
                <option value="CS3: 20 Phúc La, Hà Đông">CS3: 20 Phúc La, Hà Đông</option>
              </select>

              <select
                value={bookingData.roomType}
                onChange={(e) => setBookingData({ ...bookingData, roomType: e.target.value })}
                className="mixLuxuryInput"
              >
                <option value="Nghỉ giờ (từ 2h)">Nghỉ giờ (từ 2h)</option>
                <option value="Nghỉ qua đêm">Nghỉ qua đêm</option>
                <option value="Trang trí sinh nhật / kỷ niệm">Trang trí sinh nhật / kỷ niệm</option>
                <option value="Tư vấn concept phù hợp">Tư vấn concept phù hợp</option>
              </select>

              <button
                type="submit"
                className="mixLuxuryBtn mixLuxuryBtnPrimary uppercase mt-2 w-full justify-center tracking-wider cursor-pointer border-none"
              >
                GỬI YÊU CẦU GIỮ PHÒNG
              </button>
            </form>

            <p className="mixLuxuryNote text-center">
              Chưa đặt cọc: Mix hỗ trợ giữ phòng 15 - 20 phút tùy tình trạng phòng.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
