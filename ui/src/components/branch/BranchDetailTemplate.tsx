"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileActionBar from "@/components/floating/MobileActionBar";
import FooterSection from "@/components/sections/FooterSection";
import { useModal } from "@/context/ModalContext";
import { BranchFullConfig } from "@/data/branchFullData";

interface Props {
  branch: BranchFullConfig;
}

export default function BranchDetailTemplate({ branch }: Props) {
  const { openConnectConfirm } = useModal();
  const [selectedRoomName, setSelectedRoomName] = useState(branch.rooms[0]?.title || "");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [highlightBooking, setHighlightBooking] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("14:00");
  const [demand, setDemand] = useState("Theo giờ (2 giờ đầu)");
  const [note, setNote] = useState("");

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const scrollToBooking = (roomName?: string) => {
    if (roomName) setSelectedRoomName(roomName);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "#form-lien-he");
    }
    const el = document.getElementById("form-lien-he");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setHighlightBooking(true);
      setTimeout(() => setHighlightBooking(false), 2500);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#form-lien-he") {
      const el = document.getElementById("form-lien-he");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          setHighlightBooking(true);
          setTimeout(() => setHighlightBooking(false), 2500);
        }, 300);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0c080a] text-[#fff8ec]">
      <DesktopHeader />
      <MobileHeader />

      {/* 1. MIX BOUTIQUE HERO */}
      <section className="mixBoutiqueHero">
        <div className="mixBoutiqueHeroBg">
          <Image
            src={branch.hero.bgImage || "/tassets/images/banner-home.jpg"}
            alt={branch.name}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="mixBoutiqueHeroOverlay" />
        <div className="mixBoutiqueHeroGlow" />
        <div className="container">
          <div className="mixBoutiqueHeroGrid">
            <div className="mixBoutiqueHeroContent">
              <div className="mixBoutiqueHeroKicker">
                <span />
                <div>{branch.hero.kicker}</div>
              </div>

              <h1 className="mixBoutiqueHeroTitle">
                {branch.hero.titleParts.map((part, idx) => (
                  <React.Fragment key={idx}>
                    <span>{part}</span>
                    {idx < branch.hero.titleParts.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>

              <div className="mixBoutiqueHeroDesc">{branch.hero.desc}</div>

              <div className="mixBoutiqueHeroActions">
                <button
                  type="button"
                  onClick={() => openConnectConfirm("Chat Zalo", branch.zalo)}
                  className="mixBoutiqueHeroBtn mixBoutiqueHeroBtnPrimary cursor-pointer"
                >
                  <span className="mixBoutiqueHeroBtnIcon">◌</span>
                  <span>Nhắn Zalo tư vấn</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openConnectConfirm("Gọi điện", `tel:${branch.phone.replace(/\s+/g, "")}`)
                  }
                  className="mixBoutiqueHeroBtn mixBoutiqueHeroBtnOutline cursor-pointer"
                >
                  <span className="mixBoutiqueHeroBtnIcon">☎</span>
                  <span>Gọi điện</span>
                </button>
                <a href="#danh-sach-phong" className="mixBoutiqueHeroBtn mixBoutiqueHeroBtnOutline cursor-pointer">
                  <span className="mixBoutiqueHeroBtnIcon">▤</span>
                  <span>Xem phòng</span>
                </a>
              </div>

              <div className="mixBoutiqueHeroStats">
                {branch.hero.stats.map((st, sIdx) => (
                  <div key={sIdx} className="mixBoutiqueHeroStat">
                    <strong>{st.value}</strong>
                    <span>{st.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mixBoutiqueHeroCar">
              <div className="mixBoutiqueHeroPrice">{branch.hero.cardPrice}</div>
              <div className="mixBoutiqueHeroCardTitle">{branch.hero.cardTitle}</div>
              <div className="mixBoutiqueHeroCardText">{branch.hero.cardAddress}</div>
              <div className="mixBoutiqueHeroList">
                {branch.hero.cardItems.map((item, iIdx) => (
                  <div key={iIdx} className="mixBoutiqueHeroListItem">
                    <span>✦</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <div className="mixBoutiqueHeroCardLine" />
              <div className="mixBoutiqueHeroMini">
                <span>Tư vấn nhanh</span>
                <strong>24/7</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MIX ROOM SHOWCASE */}
      <section className="mixRoomShowcase" id="rooms">
        <div className="mixRoomShowcaseAura" />
        <div className="container">
          <div className="mixRoomShowcaseHead">
            <div className="mixRoomShowcaseKicker">
              <span />
              <div>{branch.showcase.kicker}</div>
            </div>
            <div className="mixRoomShowcaseTitle">
              <div>{branch.showcase.title1}</div>
              <br />
              <span>{branch.showcase.title2}</span>
            </div>
            <div className="mixRoomShowcaseDesc">{branch.showcase.desc}</div>
          </div>

          {/* Featured Room Panel (if present) */}
          {branch.showcase.featuredRoom && (
            <div className="mixRoomShowcasePanel">
              <div className="mixRoomShowcaseMedia">
                <div className="mixRoomShowcaseFrame relative aspect-[16/10]">
                  <Image
                    src={branch.showcase.featuredRoom.mediaImage}
                    alt={branch.showcase.featuredRoom.roomName}
                    fill
                    className="object-cover"
                  />
                  <div className="mixRoomShowcaseMediaShade" />
                  <div className="mixRoomShowcaseMediaBadge">
                    <span>{branch.showcase.featuredRoom.badgeTag}</span>
                    <strong>{branch.showcase.featuredRoom.badgeName}</strong>
                  </div>
                </div>
              </div>

              <div className="mixRoomShowcaseContent">
                <div className="mixRoomShowcaseContentTop">
                  <div className="mixRoomShowcaseTag">{branch.showcase.featuredRoom.tag}</div>
                  <div className="mixRoomShowcasePrice">{branch.showcase.featuredRoom.price}</div>
                </div>
                <div className="mixRoomShowcaseRoomName">
                  {branch.showcase.featuredRoom.roomName}
                </div>
                <div className="mixRoomShowcaseMeta">{branch.showcase.featuredRoom.meta}</div>
                <div className="mixRoomShowcaseText">{branch.showcase.featuredRoom.text}</div>

                <div className="mixRoomShowcaseBenefits">
                  {branch.showcase.featuredRoom.benefits.map((bn, bIdx) => (
                    <div key={bIdx} className="mixRoomShowcaseBenefit">
                      <div className="mixRoomShowcaseBenefitIcon">
                        <Image
                          src={bn.icon}
                          alt={bn.title}
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      </div>
                      <div className="mixRoomShowcaseBenefitInfo">
                        <strong>{bn.title}</strong>
                        <span>{bn.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mixRoomShowcaseActions">
                  <button
                    type="button"
                    onClick={() =>
                      openConnectConfirm(
                        `ĐẶT PHÒNG ${branch.showcase.featuredRoom?.roomName.toUpperCase()}`,
                        branch.zalo
                      )
                    }
                    className="mixRoomShowcaseBtn mixRoomShowcaseBtnMain cursor-pointer"
                  >
                    <span>◌</span>
                    <em>Liên hệ</em>
                  </button>
                  <Link
                    href={branch.showcase.featuredRoom.detailLink}
                    className="mixRoomShowcaseBtn mixRoomShowcaseBtnLine"
                  >
                    <span>▣</span>
                    <em>Chi tiết</em>
                  </Link>
                  <a
                    href="#form-lien-he"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToBooking(branch.showcase.featuredRoom?.roomName);
                    }}
                    className="mixRoomShowcaseBtn mixRoomShowcaseBtnGhost cursor-pointer"
                  >
                    <span>✧</span>
                    <em>Giữ phòng</em>
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="mixRoomShowcaseMini">
            {branch.showcase.miniItems.map((item, mIdx) => (
              <div key={mIdx} className="mixRoomShowcaseMiniItem">
                <span>{item.num}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VIDEO PREVIEW (if branch has video data) */}
      {branch.video && (
        <section className="mixVideoPremium" id="video-phong">
          <div className="mixVideoPremiumDecor" />
          <div className="container">
            <div className="mixVideoPremiumBox">
              <div className="mixVideoPremiumHead">
                <div className="mixVideoPremiumHeadText">
                  <div className="mixVideoPremiumKicker">
                    <span />
                    <em>{branch.video.kicker}</em>
                  </div>
                  <div className="mixVideoPremiumTitle">
                    <span>{branch.video.titleLines[0]}</span>
                    <br />
                    <span>{branch.video.titleLines[1]}</span>
                    <br />
                    <span>{branch.video.titleLines[2]}</span>
                  </div>
                  <div className="mixVideoPremiumDesc">
                    <span>{branch.video.desc}</span>
                  </div>
                </div>
                <a
                  className="mixVideoPremiumChannel"
                  href={branch.video.channelUrl}
                  rel="nofollow noopener"
                  target="_blank"
                >
                  Xem kênh Mix
                </a>
              </div>

              <div className="mixVideoPremiumGrid">
                {branch.video.cards.map((card, cIdx) => (
                  <div key={cIdx} className="mixVideoPremiumCard">
                    <a
                      href={`https://www.youtube.com/watch?v=${card.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mixVideoPremiumFrame js-mix-video-frame block relative aspect-video"
                    >
                      <Image
                        src={card.thumb}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                      <div className="mixVideoPremiumShade" />
                      <button aria-label="Phát video" className="mixVideoPremiumPlay" type="button">
                        <i className="fa fa-play" />
                      </button>
                      <div className="mixVideoPremiumTag">{card.tag}</div>
                    </a>
                    <div className="mixVideoPremiumInfo">
                      <div className="mixVideoPremiumInfoText">
                        <div className="mixVideoPremiumName">{card.title}</div>
                        <div className="mixVideoPremiumNote">{card.note}</div>
                      </div>
                      <a
                        className="mixVideoPremiumYoutube"
                        href={`https://www.youtube.com/watch?v=${card.id}`}
                        rel="nofollow noopener"
                        target="_blank"
                      >
                        YouTube
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mixVideoPremiumBottom">
                <div className="mixVideoPremiumItem">
                  <span>01</span>
                  <p>Xem ánh sáng thật của từng phòng</p>
                </div>
                <div className="mixVideoPremiumItem">
                  <span>02</span>
                  <p>Cảm nhận layout, bồn tắm, máy chiếu rõ hơn ảnh</p>
                </div>
                <div className="mixVideoPremiumItem">
                  <span>03</span>
                  <p>Nhắn Zalo để kiểm tra phòng đang trống</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. THE HUGE ROOM SHOWCASE CARDS (ALTERNATING FULL-WIDTH SHOWCASE BLOCKS) */}
      <div id="danh-sach-phong">
        {branch.rooms.map((room, rIdx) => {
          const isSecond = rIdx % 2 !== 0;
          return (
            <section
              key={rIdx}
              className={`mixRoomPremium ${isSecond ? "mixRoomPremiumSecond" : ""}`}
            >
              <div className="mixRoomPremiumDecor" />
              <div className="container">
                <div className={`mixRoomPremiumBlock ${isSecond ? "mixRoomPremiumBlockReverse" : ""}`}>
                  {/* Content (Text + Amenities + Prices + Buttons) */}
                  <div className="mixRoomPremiumContent">
                    <div className="mixRoomPremiumKicker">
                      <span />
                      {room.kicker}
                    </div>

                    <h2 className="mixRoomPremiumTitle">{room.title}</h2>

                    <div className="mixRoomPremiumDesc">{room.desc}</div>

                    <div className="mixRoomPremiumLine" />

                    {/* Amenities with icons */}
                    <div className="mixRoomPremiumAmenities">
                      {room.amenities.map((am, aIdx) => (
                        <div key={aIdx} className="mixRoomPremiumAmenity">
                          <div className="mixRoomPremiumAmenityIcon">{am.icon}</div>
                          <span>{am.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* 3 Pricing Columns */}
                    <div className="mixRoomPremiumPrices">
                      {room.prices.map((pr, pIdx) => (
                        <div key={pIdx} className="mixRoomPremiumPrice">
                          <span>{pr.label}</span>
                          <strong>{pr.value}</strong>
                          <em>{pr.sub}</em>
                        </div>
                      ))}
                    </div>

                    {/* 3 Action Buttons */}
                    <div className="mixRoomPremiumActions">
                      <a
                        href="#form-lien-he"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToBooking(room.title);
                        }}
                        className="mixRoomPremiumBtn mixRoomPremiumBtnMain cursor-pointer"
                      >
                        <span>◌</span>
                        Đặt phòng {room.title}
                      </a>
                      <Link href={room.link} className="mixRoomPremiumBtn mixRoomPremiumBtnDetail">
                        <span>▣</span>
                        Xem chi tiết phòng
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          openConnectConfirm(
                            "Gọi điện",
                            `tel:${branch.phone.replace(/\s+/g, "")}`
                          )
                        }
                        className="mixRoomPremiumBtn mixRoomPremiumBtnLine cursor-pointer"
                      >
                        <span>☎</span>
                        Gọi tư vấn
                      </button>
                    </div>
                  </div>

                  {/* Visual with Floating Glass Badge */}
                  <div className="mixRoomPremiumVisual">
                    <Link className="mixRoomPremiumPhoto relative block aspect-[16/11]" href={room.link}>
                      <Image
                        src={room.photo}
                        alt={room.title}
                        fill
                        className="object-cover"
                      />
                      <div className="mixRoomPremiumPhotoShade" />
                      <div className="mixRoomPremiumBadge">
                        <span>{room.badge.span}</span>
                        <strong>{room.badge.strong}</strong>
                      </div>
                    </Link>

                    <div className="mixRoomPremiumFloat">
                      <div className="mixRoomPremiumFloatName">{room.float.name}</div>
                      <div className="mixRoomPremiumFloatMeta">{room.float.meta}</div>
                      <div className="mixRoomPremiumFloatMini">
                        {room.float.tags.map((tg, tIdx) => (
                          <span key={tIdx}>{tg}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 5. PRICING SECTION */}
      <section className="mixPricePremium" id="bang-gia">
        <div className="mixPricePremiumDecor" />
        <div className="container">
          <div className="mixPricePremiumHead">
            <div className="mixPricePremiumKicker">
              <span />
              {branch.priceSec.kicker}
            </div>
            <h2 className="mixPricePremiumTitle">
              {branch.priceSec.title}
              <span>tại {branch.name}</span>
            </h2>
            <p className="mixPricePremiumDesc">{branch.priceSec.desc}</p>
          </div>

          <div className="mixPricePremiumGrid">
            {branch.priceSec.columns.map((col, cIdx) => (
              <div
                key={cIdx}
                className={`mixPricePremiumCard ${col.isPopular ? "mixPricePremiumCardVip" : ""}`}
              >
                {col.isPopular && <div className="mixPricePremiumRibbon">{col.badge}</div>}
                <div className="mixPricePremiumCardTop">
                  <div className="mixPricePremiumName">{col.name}</div>
                  {!col.isPopular && <div className="mixPricePremiumTag">{col.badge}</div>}
                </div>

                <div className="mixPricePremiumHour mb-4">
                  <div className="text-2xl md:text-3xl font-bold font-philosopher text-[#f1d828]">
                    {col.price2h}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">{col.extra}</div>
                </div>

                <div className="space-y-1.5 py-3 border-y border-white/10 text-xs text-zinc-300 mb-4">
                  <div>
                    <strong className="text-white">Qua đêm:</strong> {col.overnight}
                  </div>
                  <div>
                    <strong className="text-white">Cả ngày:</strong> {col.fullday}
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300 mb-6">
                  {col.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <span className="text-[#f1d828]">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openConnectConfirm(`TƯ VẤN ${col.name.toUpperCase()}`, branch.zalo)}
                  className="w-full py-3 rounded-xl bg-[#f1d828] text-black font-bold uppercase text-xs tracking-wider hover:brightness-110 transition-all cursor-pointer"
                >
                  Chọn Hạng Phòng Này
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOOKING FORM & STEPS (mixCateBooking) */}
      <section className="mixCateBooking" id="form-lien-he" style={{ scrollMarginTop: "90px" }}>
        <div className="container">
          <div className="mixCateBookingWrap">
            <div className="mixCateBookingVisual">
              <div className="mixCateBookingBadge">
                <span />
                <em>Gửi yêu cầu giữ phòng</em>
              </div>
              <h2 className="mixCateBookingTitle">
                <span>Đặt phòng nhanh.</span>
                <strong>Mix kiểm tra lịch và giữ phòng ngay</strong>
              </h2>
              <div className="mixCateBookingDesc">
                Chỉ mất 1 phút để gửi yêu cầu. Tư vấn viên sẽ liên hệ ngay qua điện thoại hoặc Zalo để
                xác nhận tình trạng phòng trống và hỗ trợ bạn chu đáo.
              </div>

              <div className="mixCateBookingTrust">
                <div className="mixCateBookingTrustItem">
                  <div className="mixCateBookingTrustIcon">⏱</div>
                  <div className="mixCateBookingTrustText">
                    <strong>15-20p</strong>
                    <span>Giữ phòng chưa cọc</span>
                  </div>
                </div>
                <div className="mixCateBookingTrustItem">
                  <div className="mixCateBookingTrustIcon">🔒</div>
                  <div className="mixCateBookingTrustText">
                    <strong>100%</strong>
                    <span>Bảo mật danh tính</span>
                  </div>
                </div>
                <div className="mixCateBookingTrustItem">
                  <div className="mixCateBookingTrustIcon">◌</div>
                  <div className="mixCateBookingTrustText">
                    <strong>24/7</strong>
                    <span>Phục vụ linh hoạt</span>
                  </div>
                </div>
              </div>

              <div className="mixCateBookingMini">
                <div className="mixCateBookingMiniItem">
                  <span>01</span>
                  <p>Điền thông tin và chọn phòng mong muốn</p>
                </div>
                <div className="mixCateBookingMiniLine" />
                <div className="mixCateBookingMiniItem">
                  <span>02</span>
                  <p>Lễ tân kiểm tra tình trạng phòng trống</p>
                </div>
                <div className="mixCateBookingMiniLine" />
                <div className="mixCateBookingMiniItem">
                  <span>03</span>
                  <p>Nhận xác nhận giữ phòng qua Zalo/Điện thoại</p>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div
              className={`mixCateBookingCard transition-all duration-700 ${
                highlightBooking
                  ? "ring-2 ring-[#f1d828] shadow-[0_0_50px_rgba(241,216,40,0.45)] scale-[1.01]"
                  : ""
              }`}
            >
              <div className="mixCateBookingCardGlow" />
              <div className="mixCateBookingCardHead">
                <div className="mixCateBookingCardKicker">Ưu đãi hôm nay</div>
                <h3>Thông Tin Giữ Phòng</h3>
              </div>

              {formSubmitted && (
                <div className="p-4 mx-4 mb-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-sm">
                  ✓ Yêu cầu giữ phòng đã được gửi! Lễ tân {branch.name} sẽ liên hệ trong 5 phút.
                </div>
              )}

              <form className="mixCateBookingForm" onSubmit={handleBookingSubmit}>
                <div className="mixCateBookingGrid">
                  <div className="mixCateBookingField">
                    <label>Họ tên của bạn</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Anh Nam / Chị Linh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mixCateBookingField">
                    <label>Số điện thoại / Zalo</label>
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="mixCateBookingField">
                    <label>Cơ sở</label>
                    <input type="text" disabled value={branch.name} />
                  </div>

                  <div className="mixCateBookingField">
                    <label>Phòng muốn đặt</label>
                    <div className="mixCateBookingSelectWrap">
                      <select
                        value={selectedRoomName}
                        onChange={(e) => setSelectedRoomName(e.target.value)}
                      >
                        {branch.rooms.some((r) => r.title === selectedRoomName) ? null : selectedRoomName ? (
                          <option value={selectedRoomName}>{selectedRoomName}</option>
                        ) : null}
                        {branch.rooms.map((r, rIdx) => (
                          <option key={rIdx} value={r.title}>
                            {r.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mixCateBookingField">
                    <label>Nhu cầu lưu trú</label>
                    <div className="mixCateBookingSelectWrap">
                      <select value={demand} onChange={(e) => setDemand(e.target.value)}>
                        <option value="Theo giờ (2 giờ đầu)">Theo giờ (2 giờ đầu)</option>
                        <option value="Qua đêm (22h - 12h)">Qua đêm (22h - 12h)</option>
                        <option value="Cả ngày (14h - 12h)">Cả ngày (14h - 12h)</option>
                        <option value="Setup sự kiện kỷ niệm">Setup sự kiện kỷ niệm</option>
                      </select>
                    </div>
                  </div>

                  <div className="mixCateBookingField">
                    <label>Ngày nhận phòng</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="mixCateBookingField">
                    <label>Giờ dự kiến đến</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>

                  <div className="mixCateBookingFieldFullGrid mixCateBookingField">
                    <label>Ghi chú yêu cầu (nếu có)</label>
                    <textarea
                      rows={2}
                      placeholder="Ví dụ: Giữ phòng 15 phút, mượn đồ cosplay, chuẩn bị rượu vang..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mixCateBookingActions">
                  <button type="submit" className="mixCateBookingBtn mixCateBookingBtnPrimary cursor-pointer">
                    <span>Gửi Yêu Cầu Giữ Phòng</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openConnectConfirm("Chat Zalo", branch.zalo)}
                    className="mixCateBookingBtn mixCateBookingBtnZalo cursor-pointer"
                  >
                    <span>Nhắn Zalo Trực Tiếp</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GALLERY PHOTOS (mixCateGallery) */}
      <section className="mixCateGallery">
        <div className="container">
          <div className="mixCateGalleryHead">
            <div className="mixCateGalleryText">
              <div className="mixCateGalleryLabel">
                <span />
                <em>Ảnh thật tại chi nhánh</em>
              </div>
              <div className="mixCateGalleryTitle">
                <span>Xem nhanh không gian</span>
                <strong>trước khi giữ phòng</strong>
              </div>
              <div className="mixCateGalleryDesc">
                Ảnh được chọn để khách nhìn rõ các điểm đáng tiền: bồn tắm, máy chiếu, giường tròn, trần gương, ánh sáng và mức độ riêng tư của từng concept.
              </div>
            </div>

            <div className="mixCateGalleryAction">
              <button
                type="button"
                onClick={() => openConnectConfirm("Hỏi phòng trống", branch.zalo)}
                className="mixCateGalleryBtn cursor-pointer"
              >
                <span>✦</span>
                <em>Hỏi phòng trống</em>
              </button>
            </div>
          </div>

          <div className="mixCateGalleryBody">
            <div className="mixCateGalleryMain">
              <div className="mixCateGalleryItem mixCateGalleryItemLarge relative aspect-[16/10] overflow-hidden rounded-2xl block">
                <Image
                  src={branch.galleryPhotos[0]?.src || "/tassets/images/thu-vien-1.webp"}
                  alt={branch.galleryPhotos[0]?.name || branch.name}
                  fill
                  className="object-cover"
                />
                <div className="mixCateGalleryOverlay">
                  <div className="mixCateGalleryTag">{branch.galleryPhotos[0]?.tag || "Concept nổi bật"}</div>
                  <div className="mixCateGalleryName">{branch.galleryPhotos[0]?.name || "Không gian riêng tư"}</div>
                  <div className="mixCateGalleryMore">Xem chi tiết</div>
                </div>
              </div>
            </div>

            <div className="mixCateGalleryList">
              {branch.galleryPhotos.slice(1, 4).map((item, gIdx) => (
                <div
                  key={gIdx}
                  className="mixCateGalleryItem relative aspect-[16/10] overflow-hidden rounded-xl block"
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="mixCateGalleryOverlay">
                    <div className="mixCateGalleryTag">{item.tag}</div>
                    <div className="mixCateGalleryName">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. SPECIAL FEATURES (mixCatePremium) */}
      <section className="mixCatePremium">
        <div className="container">
          <div className="mixCatePremiumWrap">
            <div className="mixCatePremiumMedia">
              <div className="mixCatePremiumPhoto relative aspect-[4/3] rounded-2xl overflow-hidden block">
                <Image
                  src={branch.galleryPhotos[0]?.src || "/tassets/images/thu-vien-1.webp"}
                  alt="Không gian phòng Premium"
                  fill
                  className="object-cover"
                />
                <div className="mixCatePremiumPhotoShade" />
                <div className="mixCatePremiumTag">
                  <span>{branch.badge}</span>
                  <strong>{branch.name}</strong>
                </div>
              </div>
              <div className="mixCatePremiumFloat">
                <div className="mixCatePremiumFloatIcon">✦</div>
                <div className="mixCatePremiumFloatText">
                  <strong>Ảnh thật tại chi nhánh</strong>
                  <span>Không gian được chọn lọc theo từng concept</span>
                </div>
              </div>
            </div>

            <div className="mixCatePremiumContent">
              <div className="mixCatePremiumLabel">
                <span />
                <em>Vì sao chọn {branch.name}</em>
              </div>
              <div className="mixCatePremiumTitle">
                <span>Một chi nhánh cho</span>
                <strong>những buổi hẹn có gu và kín đáo</strong>
              </div>
              <div className="mixCatePremiumDesc">
                {branch.name} phù hợp với cặp đôi muốn đổi gió ở khu trung tâm: dễ di chuyển, nhiều phòng concept từ lãng mạn nhẹ nhàng đến ấn tượng, có ảnh thật để xem trước và có thể đặt thêm trang trí nếu muốn tạo bất ngờ.
              </div>

              <div className="mixCatePremiumFeatures">
                {branch.features.map((feat, fIdx) => (
                  <div key={fIdx} className="mixCatePremiumFeature">
                    <div className="mixCatePremiumIcon">{feat.icon}</div>
                    <div className="mixCatePremiumFeatureName">{feat.name}</div>
                    <div className="mixCatePremiumFeatureText">{feat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DECOR PACKAGES (mixCateDecor) */}
      <section className="mixCateDecor">
        <div className="container">
          <div className="mixCateDecorWrap">
            <div className="mixCateDecorMedia">
              <div className="mixCateDecorPhoto relative aspect-[4/3] rounded-2xl overflow-hidden block">
                <Image
                  src={branch.galleryPhotos[2]?.src || "/tassets/images/thu-vien-4.webp"}
                  alt="Trang trí sự kiện lãng mạn"
                  fill
                  className="object-cover"
                />
                <div className="mixCateDecorPhotoOverlay" />
                <div className="mixCateDecorPhotoTag">
                  <span>Add-on Premium</span>
                  <strong>Trang trí riêng theo dịp</strong>
                </div>
              </div>
              <div className="mixCateDecorMini">
                <div className="mixCateDecorMiniIcon">✦</div>
                <div className="mixCateDecorMiniText">
                  <strong>Set up trước giờ nhận phòng</strong>
                  <span>Mix chuẩn bị theo nhu cầu sau khi xác nhận lịch.</span>
                </div>
              </div>
            </div>

            <div className="mixCateDecorContent">
              <div className="mixCateDecorLabel">
                <span />
                <em>Thêm bất ngờ cho người thương</em>
              </div>
              <div className="mixCateDecorTitle">
                <span>Trang trí sinh nhật,</span>
                <strong>kỷ niệm, cầu hôn ngay trong phòng</strong>
              </div>
              <div className="mixCateDecorDesc">
                Khi đã chọn được phòng phù hợp, bạn có thể nâng trải nghiệm bằng gói nến, hoa, bóng, bánh kem hoặc rượu vang. Phù hợp cho những dịp cần một khoảnh khắc riêng tư nhưng vẫn chỉn chu.
              </div>

              <div className="mixCateDecorPackages">
                {branch.decorPackages.map((dp, dIdx) => (
                  <div key={dIdx} className="mixCateDecorPackage">
                    <div className="mixCateDecorPackageTop">
                      <div className="mixCateDecorPackageName">{dp.name}</div>
                      <div className="mixCateDecorPackageType">{dp.type}</div>
                    </div>
                    <div className="mixCateDecorPrice">{dp.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. POLICIES (mixCatePolicy) */}
      <section className="mixCatePolicy">
        <div className="container">
          <div className="mixCatePolicyHead">
            <div className="mixCatePolicyLabel">
              <span />
              <em>Chính sách rõ ràng</em>
            </div>
            <div className="mixCatePolicyTitle">
              <span>Giữ phòng dễ,</span>
              <strong>cọc rõ, không phát sinh mơ hồ</strong>
            </div>
            <div className="mixCatePolicyDesc">
              Những thông tin quan trọng được nói trước để khách yên tâm khi liên hệ: giữ phòng bao lâu, khi nào cần cọc, thanh toán thế nào và có thể đổi lịch ra sao.
            </div>
          </div>

          <div className="mixCatePolicyBody">
            {branch.policies.map((pol, pIdx) => (
              <div key={pIdx} className="mixCatePolicyCard">
                <div className="mixCatePolicyCardTop">
                  <div className="mixCatePolicyCardIcon">{pol.icon}</div>
                  <div className="mixCatePolicyCardName">{pol.title}</div>
                </div>
                <div className="mixCatePolicyList">
                  {pol.items.map((it, itIdx) => (
                    <div key={itIdx} className="mixCatePolicyItem">
                      <div className="mixCatePolicyItemIcon">⏱</div>
                      <div className="mixCatePolicyItemText">{it}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQS ACCORDION (mixCateFaq) */}
      <section className="mixCateFaq">
        <div className="container">
          <div className="mixCateFaqHead">
            <div className="mixCateFaqLabel">
              <span />
              <em>Câu hỏi thường gặp</em>
            </div>
            <div className="mixCateFaqTitle">
              <span>Giải tỏa lo lắng</span>
              <strong>trước khi đặt phòng</strong>
            </div>
            <div className="mixCateFaqDesc">
              Một vài thông tin khách thường hỏi trước khi giữ phòng: độ kín đáo, cọc giữ lịch, phát sinh chi phí, tiện ích phòng và các gói trang trí đi kèm.
            </div>
          </div>

          <div className="mixCateFaqList">
            {branch.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="mixCateFaqItem">
                <details open={fIdx === 0}>
                  <summary>
                    <div className="mixCateFaqQuestion">{faq.q}</div>
                    <div className="mixCateFaqMark">+</div>
                  </summary>
                  <div className="mixCateFaqAnswer">{faq.a}</div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. BOTTOM CTA (catePremiumCta) */}
      <section className="catePremiumCta" id="booking">
        <div className="catePremiumCtaWrap">
          <div
            className="catePremiumCtaBg"
            style={{
              backgroundImage: `url(${branch.hero.bgImage || "/tassets/images/banner-home.jpg"})`,
            }}
          />
          <div className="catePremiumCtaShade" />
          <div className="catePremiumCtaContent">
            <div className="catePremiumCtaKicker">
              <span />
              <em>Đặt phòng hôm nay</em>
            </div>
            <div className="catePremiumCtaTitle">
              <span>Chọn {branch.name},</span>
              <br />
              <span>Mix tư vấn phòng phù hợp</span>
              <br />
              <span>trong vài phút</span>
            </div>
            <div className="catePremiumCtaText">
              Nhận ảnh thật, giá rõ ràng, tư vấn kín đáo và giữ phòng nhanh qua Zalo hoặc hotline.
            </div>
            <div className="catePremiumCtaActions">
              <button
                type="button"
                onClick={() => openConnectConfirm("Chat Zalo", branch.zalo)}
                className="catePremiumCtaBtn catePremiumCtaBtnMain cursor-pointer"
              >
                <span>◌</span>
                <span>Nhắn Zalo giữ phòng</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  openConnectConfirm("Gọi điện", `tel:${branch.phone.replace(/\s+/g, "")}`)
                }
                className="catePremiumCtaBtn catePremiumCtaBtnLine cursor-pointer"
              >
                <span>☎</span>
                <span>Gọi hotline {branch.phone}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. SEO ARTICLE (content-frame-section) */}
      {branch.articleHtml && (
        <section className="content-frame-section">
          <div className="container">
            <div
              className="content-frame"
              dangerouslySetInnerHTML={{ __html: branch.articleHtml }}
            />
          </div>
        </section>
      )}

      <FooterSection />
      <DesktopContactBar />
      <MobileActionBar />
    </div>
  );
}
