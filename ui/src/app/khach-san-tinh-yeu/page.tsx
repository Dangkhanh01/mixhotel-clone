"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileActionBar from "@/components/floating/MobileActionBar";
import FooterSection from "@/components/sections/FooterSection";
import { useModal } from "@/context/ModalContext";
import { BRANCHES_DATA, FORM_ROOMS_BY_BRANCH } from "@/data/branchesData";
import { KHACH_SAN_TINH_YEU_TOC, KHACH_SAN_TINH_YEU_CONTENT_HTML } from "@/data/khachSanTinhYeuArticle";

export default function KhachSanTinhYeuPage() {
  const { openConnectConfirm, openBranchSelect } = useModal();
  const [activeTab, setActiveTab] = useState<string>("branch-mix-boutique-premium-hotel");
  
  // Consultation Form state
  const [selectedBranch, setSelectedBranch] = useState<string>("All");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [demand, setDemand] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // TOC collapsible state
  const [isTocOpen, setIsTocOpen] = useState(true);

  // Active rooms dropdown options based on branch selection
  const availableRoomOptions = useMemo(() => {
    return FORM_ROOMS_BY_BRANCH[selectedBranch] || FORM_ROOMS_BY_BRANCH["All"] || [];
  }, [selectedBranch]);

  const handleBranchTabClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      alert("Vui lòng nhập họ và tên cùng số điện thoại!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 1000);
  };

  const handleOpenRoomBooking = (roomName: string, branchName: string) => {
    setSelectedBranch(branchName);
    setSelectedRoom(roomName);
    const branchZaloMap: Record<string, string> = {
      "Huỳnh Thúc Kháng": "https://zalo.me/0383104010",
      "Đặng Tiến Đông": "https://zalo.me/+84393307030",
      "Phúc La": "https://zalo.me/+84353660966",
      "Hoàng Ngân": "https://zalo.me/0383104010",
    };
    const matched = Object.entries(branchZaloMap).find(([k]) => branchName.includes(k));
    const zaloLink = matched ? matched[1] : "https://zalo.me/0383104010";
    openConnectConfirm(`ĐẶT PHÒNG ${roomName.toUpperCase()}`, zaloLink);
  };

  return (
    <div className="min-h-screen bg-[#0c080a] text-[#fff8ec]">
      <DesktopHeader />
      <MobileHeader />

      {/* 1. CATE MIX HERO */}
      <div className="cateMixHero">
        <Image
          src="/tassets/images/banner-home.jpg"
          alt="Phòng concept Eden Mix Boutique Hotel"
          fill
          priority
          className="cateMixHeroBg object-cover"
        />
        <div className="cateMixHeroOverlay" />
        <div className="cateMixHeroLight" />
        <div className="cateMixHeroWrap">
          <div className="cateMixHeroContent">
            <div className="cateMixHeroSub">
              <span />
              <em>KHÁCH SẠN TÌNH YÊU HÀ NỘI</em>
            </div>
            <div className="cateMixHeroTitle">
              <span>Chọn đúng chi nhánh</span>
              <br />
              <span>Khách sạn tình yêu</span>
            </div>
            <div className="cateMixHeroDesc">
              3 địa chỉ khác nhau, nhóm phòng khác nhau. Bạn hãy chọn chi nhánh trước để Mix Hotel tư vấn đúng phòng trống.
            </div>
            <div className="cateMixHeroActions">
              <button
                type="button"
                onClick={() => openConnectConfirm("Chat Zalo", "https://zalo.me/0383104010")}
                className="cateMixHeroBtn cateMixHeroBtnPrimary cursor-pointer border-none"
              >
                <i className="fa fa-comment-o" />
                <span>Nhắn Zalo tư vấn</span>
              </button>
              <button
                type="button"
                onClick={() => openConnectConfirm("Gọi điện", "tel:0383104010")}
                className="cateMixHeroBtn cursor-pointer border-none"
              >
                <i className="fa fa-phone" />
                <span>Gọi điện</span>
              </button>
              <a href="#chon-chi-nhanh" className="cateMixHeroBtn cursor-pointer">
                <i className="fa fa-map-marker" />
                <span>Chọn chi nhánh</span>
              </a>
            </div>
            <div className="cateMixHeroNumbers">
              <div className="cateMixHeroNumber">
                <strong>3</strong>
                <span>chi nhánh Hà Nội</span>
              </div>
              <div className="cateMixHeroNumber">
                <strong>199k</strong>
                <span>giá từ/ 2h đầu</span>
              </div>
              <div className="cateMixHeroNumber">
                <strong>15-20&apos;</strong>
                <span>giữ phòng khi chưa cọc</span>
              </div>
              <div className="cateMixHeroNumber">
                <strong>18+</strong>
                <span>chỉ nhận khách từ 18 tuổi</span>
              </div>
            </div>
            <div className="cateMixHeroBranchList">
              <a
                className="cateMixHeroBranch cursor-pointer"
                href="#branch-mix-boutique-premium-hotel"
                onClick={(e) => handleBranchTabClick(e, "branch-mix-boutique-premium-hotel")}
              >
                <strong>Premium</strong>
                <span>Số 8 ngách 29 ngõ 49 Huỳnh Thúc Kháng, phường Láng, Hà Nội</span>
              </a>
              <a
                className="cateMixHeroBranch cursor-pointer"
                href="#branch-mix-boutique-hotel-256b-dang-tien-dong"
                onClick={(e) => handleBranchTabClick(e, "branch-mix-boutique-hotel-256b-dang-tien-dong")}
              >
                <strong>256B Đặng Tiến Đông</strong>
                <span>256B Đặng Tiến Đông, Chợ Dừa, Đống Đa, Hà Nội, Việt Nam</span>
              </a>
              <a
                className="cateMixHeroBranch cursor-pointer"
                href="#branch-mix-boutique-hotel-20-phuc-la-ha-dong"
                onClick={(e) => handleBranchTabClick(e, "branch-mix-boutique-hotel-20-phuc-la-ha-dong")}
              >
                <strong>20 Phúc La Hà Đông</strong>
                <span>20, P. Phúc La, Hà Đông, Hà Nội, Việt Nam</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATE BRANCH SECTION */}
      <div className="cateBranchSection" id="chon-chi-nhanh">
        <div className="cateBranchDecor cateBranchDecorOne" />
        <div className="cateBranchDecor cateBranchDecorTwo" />
        <div className="cateBranchContainer">
          <div className="cateBranchHead">
            <div className="cateBranchHeadLeft">
              <div className="cateBranchSub">
                <span />
                <em>Chọn nhanh theo khu vực</em>
              </div>
              <div className="cateBranchTitle">
                <span>3 chi nhánh Mix Boutique</span>
                <br />
                <span>Hotel đang nhận khách</span>
              </div>
              <div className="cateBranchDesc">
                Tìm ngay chi nhánh Mix Boutique Hotel gần bạn, khám phá các hạng phòng đẹp và đặt phòng chỉ với vài thao tác đơn giản!
              </div>
            </div>
            <div className="cateBranchTabs">
              {BRANCHES_DATA.map((branch) => (
                <a
                  key={branch.id}
                  className={`cateBranchTab cursor-pointer ${
                    activeTab === branch.id ? "cateBranchTabActive" : ""
                  }`}
                  href={`#${branch.id}`}
                  onClick={(e) => handleBranchTabClick(e, branch.id)}
                >
                  {branch.name}
                </a>
              ))}
            </div>
          </div>

          {/* 3 Branch Cards */}
          {BRANCHES_DATA.map((branch) => (
            <div className="cateBranchCard" id={branch.id} key={branch.id}>
              <div className="cateBranchImageWrap relative w-full h-[280px] md:h-[360px]">
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  className="cateBranchImage object-cover"
                />
                <div className="cateBranchImageOverlay" />
                <div className="cateBranchBadge">{branch.badge}</div>
              </div>
              <div className="cateBranchInfo">
                <div className="cateBranchArea">{branch.area}</div>
                <div className="cateBranchName">{branch.name}</div>
                <div className="cateBranchAddress">{branch.address}</div>
                <div className="cateBranchNotice">
                  <i className="fa fa-map-marker" />
                  <span>{branch.notice}</span>
                </div>
                <div className="cateBranchTags">
                  {branch.tags.map((tag, tIdx) => (
                    <span key={tIdx}>{tag}</span>
                  ))}
                </div>
                <div className="cateBranchRoomTitle">{branch.roomTitle}</div>
                <div className="cateBranchRooms">
                  {branch.rooms.map((room, rIdx) => (
                    <div className="cateBranchRoom" key={rIdx}>
                      <Link
                        href={room.link}
                        className="cateBranchRoomImageLink relative block w-full h-48 cursor-pointer"
                        title={`Xem chi tiết ${room.name}`}
                      >
                        <Image
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover rounded-t-xl transition-transform duration-500 hover:scale-105"
                        />
                      </Link>
                      <div className="cateBranchRoomText">
                        <Link
                          href={room.link}
                          className="cateBranchRoomNameLink block cursor-pointer"
                          title={`Xem chi tiết ${room.name}`}
                        >
                          <strong>{room.name}</strong>
                        </Link>
                        <b>{room.price}</b>
                        <span>{room.desc}</span>
                        <Link
                          href={room.link}
                          className="cateBranchRoomDetail inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 text-left p-0"
                          title={`Xem chi tiết ${room.name}`}
                        >
                          Xem chi tiết phòng
                          <i className="fa fa-angle-right" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MIX CATE PRICE SECTION */}
      <section className="mixCatePrice" id="bang-gia">
        <div className="container">
          <div className="mixCatePriceInner">
            <div className="mixCatePriceGlow mixCatePriceGlowOne" />
            <div className="mixCatePriceGlow mixCatePriceGlowTwo" />
            <div className="mixCatePriceHead">
              <div className="mixCatePriceKicker">
                <span />
                <em>Giá hiển thị sớm</em>
              </div>
              <div className="mixCatePriceTitle">Bảng giá rõ để khách quyết định nhanh</div>
              <div className="mixCatePriceDesc">
                Giá áp dụng theo hạng phòng. Cuối tuần cần đặt cọc 50% trong các trường hợp nghỉ giờ trên 4 tiếng, qua đêm, ngày đêm hoặc đặt phòng cuối tuần.
              </div>
            </div>
            <div className="mixCatePriceGrid">
              {/* Superior */}
              <div className="mixCatePriceCard">
                <div className="mixCatePriceCardTop">
                  <div className="mixCatePriceName">Superior</div>
                  <div className="mixCatePriceBadge">Phổ biến</div>
                </div>
                <div className="mixCatePriceMain">
                  <span>199k</span>
                  <small>/ 2h</small>
                </div>
                <div className="mixCatePriceList">
                  <div className="mixCatePriceRow">
                    <span>Thêm giờ</span>
                    <b>50k/ h</b>
                  </div>
                  <div className="mixCatePriceRow">
                    <span>Qua đêm 22h-12h</span>
                    <b>500k</b>
                  </div>
                  <div className="mixCatePriceRow">
                    <span>Ngày đêm 14h-12h</span>
                    <b>700k</b>
                  </div>
                </div>
              </div>

              {/* Deluxe */}
              <div className="mixCatePriceCard mixCatePriceCardHot">
                <div className="mixCatePriceCardTop">
                  <div className="mixCatePriceName">Deluxe</div>
                  <div className="mixCatePriceBadge">Đáng chọn</div>
                </div>
                <div className="mixCatePriceMain">
                  <span>300k</span>
                  <small>/ 2h</small>
                </div>
                <div className="mixCatePriceList">
                  <div className="mixCatePriceRow">
                    <span>Thêm giờ</span>
                    <b>50k/ h</b>
                  </div>
                  <div className="mixCatePriceRow">
                    <span>Qua đêm 22h-12h</span>
                    <b>600k</b>
                  </div>
                  <div className="mixCatePriceRow">
                    <span>Ngày đêm 14h-12h</span>
                    <b>800k</b>
                  </div>
                </div>
              </div>

              {/* VIP */}
              <div className="mixCatePriceCard">
                <div className="mixCatePriceCardTop">
                  <div className="mixCatePriceName">Vip</div>
                  <div className="mixCatePriceBadge">Riêng tư</div>
                </div>
                <div className="mixCatePriceMain">
                  <span>400k</span>
                  <small>/ 2h</small>
                </div>
                <div className="mixCatePriceList">
                  <div className="mixCatePriceRow">
                    <span>Thêm giờ</span>
                    <b>80k/ h</b>
                  </div>
                  <div className="mixCatePriceRow">
                    <span>Qua đêm 22h-12h</span>
                    <b>800k</b>
                  </div>
                  <div className="mixCatePriceRow">
                    <span>Ngày đêm 14h-12h</span>
                    <b>1.000k</b>
                  </div>
                </div>
              </div>
            </div>

            <div className="mixCatePriceNote">
              <span>Lưu ý:</span>
              <span>
                Chưa đặt cọc giữ phòng 15-20 phút, có thể giữ đến 1 tiếng khi thời tiết xấu. Mix chỉ nhận khách từ 18 tuổi.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MIX CATE BRANCH (CHỌN ĐÚNG ĐỂ KHÔNG ĐẶT NHẦM) */}
      <section className="mixCateBranch" id="huong-dan-chon-chi-nhanh">
        <div className="container">
          <div className="mixCateBranchInner">
            <div className="mixCateBranchLight mixCateBranchLightLeft" />
            <div className="mixCateBranchLight mixCateBranchLightRight" />
            <div className="mixCateBranchHead">
              <div className="mixCateBranchKicker">
                <span />
                <em>Chọn đúng để không đặt nhầm</em>
              </div>
              <div className="mixCateBranchTitle">
                <span>Chọn chi nhánh trước,</span>
                <br />
                <span>chọn phòng sau</span>
              </div>
              <div className="mixCateBranchDesc">
                <span>Mỗi chi nhánh ở một khu vực khác nhau và sở hữu nhóm phòng concept khác nhau.</span>
                <span>Khi liên hệ, hãy gửi đủ “chi nhánh + tên phòng” để tư vấn viên kiểm tra đúng phòng trống.</span>
              </div>
            </div>
            <div className="mixCateBranchSteps">
              <div className="mixCateBranchStep">
                <div className="mixCateBranchNumber">01</div>
                <div className="mixCateBranchStepTitle">Xác định khu vực</div>
                <div className="mixCateBranchStepText">
                  Premium ở Huỳnh Thúc Kháng, 256B ở Đặng Tiến Đông, 20 Phúc La ở Hà Đông.
                </div>
              </div>
              <div className="mixCateBranchStep">
                <div className="mixCateBranchNumber">02</div>
                <div className="mixCateBranchStepTitle">Chọn phòng trong chi nhánh</div>
                <div className="mixCateBranchStepText">
                  Chỉ chọn các phòng đang nằm trong block chi nhánh tương ứng phía trên.
                </div>
              </div>
              <div className="mixCateBranchStep">
                <div className="mixCateBranchNumber">03</div>
                <div className="mixCateBranchStepTitle">Gửi đúng cú pháp</div>
                <div className="mixCateBranchStepText">
                  Ví dụ: “256B Đặng Tiến Đông - After Sunset - 20h tối nay”.
                </div>
              </div>
            </div>
            <div className="mixCateBranchActions">
              <a
                className="mixCateBranchBtn mixCateBranchBtnMain cursor-pointer"
                href="#branch-mix-boutique-premium-hotel"
                onClick={(e) => handleBranchTabClick(e, "branch-mix-boutique-premium-hotel")}
              >
                Xem Premium
              </a>
              <a
                className="mixCateBranchBtn cursor-pointer"
                href="#branch-mix-boutique-hotel-256b-dang-tien-dong"
                onClick={(e) => handleBranchTabClick(e, "branch-mix-boutique-hotel-256b-dang-tien-dong")}
              >
                Xem 256B
              </a>
              <a
                className="mixCateBranchBtn cursor-pointer"
                href="#branch-mix-boutique-hotel-20-phuc-la-ha-dong"
                onClick={(e) => handleBranchTabClick(e, "branch-mix-boutique-hotel-20-phuc-la-ha-dong")}
              >
                Xem Phúc La
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MIX CATE VIDEO */}
      <section className="mixCateVideo" id="video-phong">
        <div className="container">
          <div className="mixCateVideoInner">
            <div className="mixCateVideoLight mixCateVideoLightLeft" />
            <div className="mixCateVideoLight mixCateVideoLightRight" />
            <div className="mixCateVideoContent">
              <div className="mixCateVideoKicker">
                <span />
                <em>Video phòng thực tế</em>
              </div>
              <div className="mixCateVideoTitle">
                <span>Xem nhanh không</span>
                <br />
                <span>gian trước khi</span>
                <br />
                <span>chọn phòng</span>
              </div>
              <div className="mixCateVideoDesc">
                <span>Video ngắn giúp bạn nhìn rõ ánh sáng, bố cục phòng và cảm giác thực tế hơn ảnh tĩnh.</span>
                <span>Khi nhắn Zalo, bạn có thể gửi kèm video hoặc tên phòng muốn xem thêm để Mix tư vấn đúng chi nhánh.</span>
              </div>
              <div className="mixCateVideoNotice">
                <div className="mixCateVideoNoticeIcon">
                  <i className="fa fa-play" />
                </div>
                <div className="mixCateVideoNoticeText">
                  <span>Landing page đang dùng video từ kênh YouTube Mix.</span>
                  <span>Có thể bổ sung thêm Shorts cho từng phòng hoặc từng chi nhánh khi có link mới.</span>
                </div>
              </div>
              <div className="mixCateVideoActions">
                <a
                  className="mixCateVideoBtn mixCateVideoBtnMain"
                  href="https://www.youtube.com/@hotelmixboutique1110"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  Xem kênh YouTube
                </a>
                <a
                  className="mixCateVideoBtn cursor-pointer"
                  href="https://zalo.me/0383104010"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-comment-o" />
                  <span>Hỏi video phòng</span>
                </a>
              </div>
            </div>
            <div className="mixCateVideoList">
              <a
                className="mixCateVideoCard"
                href="https://www.youtube.com/watch?v=_3pSDfR8Ccw"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                <div className="mixCateVideoThumb relative w-full h-[180px]">
                  <Image
                    src="/external/img.youtube.com/vi/_3pSDfR8Ccw/hqdefault.jpg"
                    alt="Video không gian Mix Boutique Hotel"
                    fill
                    className="object-cover"
                  />
                  <div className="mixCateVideoPlay">
                    <i className="fa fa-play" />
                  </div>
                  <div className="mixCateVideoTag">Shorts</div>
                </div>
                <div className="mixCateVideoInfo">
                  <div className="mixCateVideoName">
                    TOGETHER and to Mixboutique Hotel đưa nhau lên tới &quot;đỉnh chóp&quot; khiến nàng tuôn trào từng nhịp thở 😍
                  </div>
                  <div className="mixCateVideoText">
                    Xem trước không gian phòng dạng Shorts trước khi nhắn tư vấn.
                  </div>
                </div>
              </a>
              <a
                className="mixCateVideoCard"
                href="https://www.youtube.com/watch?v=Ts4seBpirOA"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                <div className="mixCateVideoThumb relative w-full h-[180px]">
                  <Image
                    src="/external/img.youtube.com/vi/Ts4seBpirOA/hqdefault.jpg"
                    alt="Video review Mix Boutique Hotel"
                    fill
                    className="object-cover"
                  />
                  <div className="mixCateVideoPlay">
                    <i className="fa fa-play" />
                  </div>
                  <div className="mixCateVideoTag">Review</div>
                </div>
                <div className="mixCateVideoInfo">
                  <div className="mixCateVideoName">
                    Mixboutique nâng cấp TRÊN TÌNH BẠN DƯỚI TÌNH YÊU bên trong là TÌNH NHÂN 😍
                  </div>
                  <div className="mixCateVideoText">
                    Xem trước không gian phòng dạng Shorts trước khi nhắn tư vấn.
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MIX FREE PERKS */}
      <section className="mixFreePerks">
        <div className="container">
          <div className="mixFreePerksWrap">
            <div className="mixFreePerksMedia">
              <div className="mixFreePerksGlow" />
              <div className="mixFreePerksImage mixFreePerksImageLarge relative h-72">
                <Image
                  src="/tassets/images/cate-1.jpg"
                  alt="Đồ cosplay miễn phí khi đặt phòng Mix Hotel"
                  fill
                  className="object-cover rounded-2xl"
                />
                <div className="mixFreePerksBadge">
                  <span>FREE</span>
                  <small>Mượn tại quầy</small>
                </div>
              </div>
              <div className="mixFreePerksImage mixFreePerksImageSmall relative h-48">
                <Image
                  src="/tassets/images/cate-2.jpg"
                  alt="Đồ BDSM miễn phí khi đặt phòng Mix Hotel"
                  fill
                  className="object-cover rounded-2xl"
                />
                <div className="mixFreePerksFloat">
                  <span>03+</span>
                  <small>nhóm vật dụng</small>
                </div>
              </div>
            </div>
            <div className="mixFreePerksContent">
              <div className="mixFreePerksKicker">
                <span />
                <em>Miễn phí khi đặt phòng</em>
              </div>
              <div className="mixFreePerksTitle">
                <span>Tiện ích miễn phí</span>
                <br />
                <span>khi đặt phòng</span>
              </div>
              <div className="mixFreePerksDesc">
                Mỗi phòng Mix đều có thể mượn thêm đồ cosplay, đồ BDSM và bộ bài Board Game tình yêu. Các vật dụng không để sẵn trong phòng để đảm bảo riêng tư và vệ sinh; khách vui lòng mượn tại quầy lễ tân khi checkin.
              </div>
              <div className="mixFreePerksGrid">
                <div className="mixFreePerksCard">
                  <div className="mixFreePerksIcon">
                    <i className="fa fa-magic" />
                  </div>
                  <div className="mixFreePerksCardTitle">Đồ cosplay</div>
                  <div className="mixFreePerksCardText">
                    Nhiều concept để đổi không khí buổi hẹn, nổi bật hơn khi nhận phòng.
                  </div>
                </div>
                <div className="mixFreePerksCard">
                  <div className="mixFreePerksIcon">
                    <i className="fa fa-heart-o" />
                  </div>
                  <div className="mixFreePerksCardTitle">Đồ BDSM</div>
                  <div className="mixFreePerksCardText">
                    Bộ phụ kiện trải nghiệm miễn phí, mượn theo nhu cầu và tình trạng còn sẵn.
                  </div>
                </div>
                <div className="mixFreePerksCard">
                  <div className="mixFreePerksIcon">
                    <i className="fa fa-th-large" />
                  </div>
                  <div className="mixFreePerksCardTitle">Board Game tình yêu</div>
                  <div className="mixFreePerksCardText">
                    Bộ bài gợi mở câu chuyện, phù hợp cho buổi hẹn vui và tự nhiên hơn.
                  </div>
                </div>
              </div>
              <div className="mixFreePerksNote">
                <div className="mixFreePerksNoteIcon">
                  <i className="fa fa-info" />
                </div>
                <div className="mixFreePerksNoteText">
                  <strong>Cách nhận:</strong>
                  <span>
                    {" "}báo lễ tân khi checkin để mượn miễn phí, và gửi lại quầy khi checkout. Vật dụng hỏng, rách hoặc bẩn nặng có thể phát sinh chi phí đền bù theo quy định tại quầy.
                  </span>
                </div>
              </div>
              <div className="mixFreePerksActions">
                <a
                  href="https://zalo.me/0383104010"
                  target="_blank"
                  rel="noreferrer"
                  className="mixFreePerksBtn mixFreePerksBtnPrimary cursor-pointer"
                >
                  <i className="fa fa-comment-o" />
                  <span>Hỏi đồ mượn qua Zalo</span>
                </a>
                <a href="#dat-phong" className="mixFreePerksBtn mixFreePerksBtnGhost cursor-pointer">
                  <i className="fa fa-paper-plane-o" />
                  <span>Ghi chú khi đặt phòng</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CATE EVENT DECOR */}
      <section className="cateEventDecor">
        <div className="container">
          <div className="cateEventDecorWrap">
            <div className="cateEventDecorImageBox">
              <div className="cateEventDecorImageGlow" />
              <div className="cateEventDecorImage relative h-80">
                <Image
                  src="/tassets/images/home-6.jpg"
                  alt="Trang trí sinh nhật kỷ niệm cầu hôn"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div className="cateEventDecorLabel">
                <span>Từ 350k</span>
                <small>Trang trí theo yêu cầu</small>
              </div>
            </div>
            <div className="cateEventDecorContent">
              <div className="cateEventDecorSub">
                <span />
                <em>Thêm bất ngờ</em>
              </div>
              <div className="cateEventDecorTitle">
                <span>Trang trí sinh nhật,</span>
                <br />
                <span>kỷ niệm, cầu hôn</span>
              </div>
              <div className="cateEventDecorDesc">
                Gói trang trí giúp tăng giá trị mỗi lần đặt phòng và biến buổi hẹn thành một kỷ niệm có chủ ý hơn. Giá dưới đây chưa bao gồm tiền phòng.
              </div>
              <div className="cateEventDecorList">
                <div className="cateEventDecorItem">
                  <div className="cateEventDecorItemTop">
                    <div className="cateEventDecorItemName">Nến - hoa - bóng</div>
                    <div className="cateEventDecorItemIcon">
                      <i className="fa fa-star-o" />
                    </div>
                  </div>
                  <div className="cateEventDecorItemPrice">Deluxe 1.490k, VIP 1.990k</div>
                </div>
                <div className="cateEventDecorItem">
                  <div className="cateEventDecorItemTop">
                    <div className="cateEventDecorItemName">Set rượu - hoa - nến</div>
                    <div className="cateEventDecorItemIcon">
                      <i className="fa fa-glass" />
                    </div>
                  </div>
                  <div className="cateEventDecorItemPrice">590k</div>
                </div>
                <div className="cateEventDecorItem">
                  <div className="cateEventDecorItemTop">
                    <div className="cateEventDecorItemName">Bánh kem</div>
                    <div className="cateEventDecorItemIcon">
                      <i className="fa fa-birthday-cake" />
                    </div>
                  </div>
                  <div className="cateEventDecorItemPrice">350k</div>
                </div>
                <div className="cateEventDecorItem">
                  <div className="cateEventDecorItemTop">
                    <div className="cateEventDecorItemName">Rượu + trái cây</div>
                    <div className="cateEventDecorItemIcon">
                      <i className="fa fa-heart-o" />
                    </div>
                  </div>
                  <div className="cateEventDecorItemPrice">600k</div>
                </div>
              </div>
              <div className="cateEventDecorNotice">
                <div className="cateEventDecorNoticeIcon">
                  <i className="fa fa-info" />
                </div>
                <div className="cateEventDecorNoticeText">
                  Tiền cọc event không hoàn lại khi hủy phòng.
                </div>
              </div>
              <div className="cateEventDecorActions">
                <a
                  href="https://zalo.me/0383104010"
                  target="_blank"
                  rel="noreferrer"
                  className="cateEventDecorBtn cateEventDecorBtnMain cursor-pointer"
                >
                  <i className="fa fa-comment-o" />
                  <span>Tư vấn gói trang trí</span>
                </a>
                <button
                  type="button"
                  onClick={() => openBranchSelect("zalo")}
                  className="cateEventDecorBtn cateEventDecorBtnLine cursor-pointer"
                >
                  <i className="fa fa-calendar-check-o" />
                  <span>Đặt phòng ngay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CATE BOOKING STEPS */}
      <section className="cateBookingSteps">
        <div className="container">
          <div className="cateBookingStepsHead">
            <div className="cateBookingStepsSub">
              <span />
              <em>Quy trình đặt phòng</em>
            </div>
            <div className="cateBookingStepsTitle">
              <span>3 bước để giữ</span>
              <br />
              <span>phòng nhanh</span>
            </div>
          </div>
          <div className="cateBookingStepsList">
            <div className="cateBookingStepsItem">
              <div className="cateBookingStepsNumber">01</div>
              <div className="cateBookingStepsName">Nhắn nhu cầu</div>
              <div className="cateBookingStepsText">
                Gửi chi nhánh, ngày, khung giờ và nhu cầu nghỉ giờ, qua đêm hoặc trang trí.
              </div>
            </div>
            <div className="cateBookingStepsItem">
              <div className="cateBookingStepsNumber">02</div>
              <div className="cateBookingStepsName">Nhận tư vấn</div>
              <div className="cateBookingStepsText">
                Mix kiểm tra phòng trống, gửi ảnh phòng phù hợp và báo giá rõ trước khi xác nhận.
              </div>
            </div>
            <div className="cateBookingStepsItem">
              <div className="cateBookingStepsNumber">03</div>
              <div className="cateBookingStepsName">Giữ phòng</div>
              <div className="cateBookingStepsText">
                Chưa cọc giữ 15-20 phút. Các ca nghỉ dài, qua đêm, ngày đêm hoặc cuối tuần cần cọc 50%.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CATE CONSULT FORM */}
      <section className="cateConsultForm" id="dat-phong">
        <div className="cateConsultFormLight cateConsultFormLightLeft" />
        <div className="cateConsultFormLight cateConsultFormLightRight" />
        <div className="container">
          <div className="cateConsultFormWrap">
            <div className="cateConsultFormContent">
              <div className="cateConsultFormSub">
                <span />
                <em>Tư vấn nhanh</em>
              </div>
              <div className="cateConsultFormTitle">
                <span>Gửi yêu cầu, Mix</span>
                <br />
                <span>xác nhận phòng trống</span>
              </div>
              <div className="cateConsultFormDesc">
                Form không tự động cam kết còn phòng. Tư vấn viên sẽ liên hệ lại để xác nhận tình trạng phòng, khung giờ phù hợp và hướng dẫn giữ phòng.
              </div>
              <div className="cateConsultFormBenefits">
                <div className="cateConsultFormBenefit">
                  <div className="cateConsultFormBenefitIcon">
                    <i className="fa fa-lock" />
                  </div>
                  <div className="cateConsultFormBenefitText">
                    Bảo mật thông tin khách hàng, không chia sẻ cho bên thứ ba.
                  </div>
                </div>
                <div className="cateConsultFormBenefit">
                  <div className="cateConsultFormBenefitIcon">
                    <i className="fa fa-credit-card" />
                  </div>
                  <div className="cateConsultFormBenefitText">
                    Thanh toán tiền mặt tại quầy hoặc chuyển khoản ngân hàng.
                  </div>
                </div>
                <div className="cateConsultFormBenefit">
                  <div className="cateConsultFormBenefitIcon">
                    <i className="fa fa-calendar-check-o" />
                  </div>
                  <div className="cateConsultFormBenefitText">
                    Đã đặt cọc có thể đổi giờ/ngày trong 1-15 ngày, tùy tình trạng phòng trống.
                  </div>
                </div>
              </div>
            </div>
            <div className="cateConsultFormBox">
              <div className="cateConsultFormGlow" />
              <form className="cateConsultFormMain" onSubmit={handleFormSubmit}>
                {submitSuccess && (
                  <div className="p-4 mb-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm">
                    ✓ Yêu cầu của bạn đã được gửi thành công! Mix Hotel sẽ liên hệ xác nhận phòng trong ít phút.
                  </div>
                )}
                <div className="cateConsultFormGrid">
                  <div className="cateConsultFormField">
                    <label htmlFor="name_base3">Họ và tên</label>
                    <input
                      id="name_base3"
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div className="cateConsultFormField">
                    <label htmlFor="phone_base3">Số điện thoại</label>
                    <input
                      id="phone_base3"
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="cateConsultFormField cateConsultFormFieldFull">
                    <label htmlFor="address_base3">Chi nhánh mong muốn</label>
                    <div className="cateConsultFormSelectWrap">
                      <select
                        id="address_base3"
                        className="orderAddress"
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                      >
                        <option value="All">Chọn chi nhánh</option>
                        <option value="Mix Boutique Premium">Mix Boutique Premium</option>
                        <option value="Mix Boutique Hotel 256B Đặng Tiến Đông ">Mix Boutique Hotel 256B Đặng Tiến Đông</option>
                        <option value="Mix Boutique Hotel 20 Phúc La Hà Đông ">Mix Boutique Hotel 20 Phúc La Hà Đông</option>
                      </select>
                    </div>
                  </div>
                  <div className="cateConsultFormField">
                    <label htmlFor="nhan_phong_3">Ngày nhận phòng</label>
                    <input
                      id="nhan_phong_3"
                      className="cateDateInput"
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>
                  <div className="cateConsultFormField">
                    <label htmlFor="tra_phong_3">Ngày trả phòng</label>
                    <input
                      id="tra_phong_3"
                      className="cateDateInput"
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                  </div>
                  <div className="cateConsultFormField">
                    <label htmlFor="gio_vao_3">Giờ vào</label>
                    <input
                      id="gio_vao_3"
                      className="cateTimeInput"
                      type="time"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                    />
                  </div>
                  <div className="cateConsultFormField">
                    <label htmlFor="gio_ra_3">Giờ ra</label>
                    <input
                      id="gio_ra_3"
                      className="cateTimeInput"
                      type="time"
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                    />
                  </div>
                  <div className="cateConsultFormField">
                    <label htmlFor="change3">Nhu cầu</label>
                    <div className="cateConsultFormSelectWrap">
                      <select
                        id="change3"
                        value={demand}
                        onChange={(e) => setDemand(e.target.value)}
                      >
                        <option value="">Chọn nhu cầu</option>
                        <option value="Nghỉ giờ">Nghỉ giờ</option>
                        <option value="Qua đêm">Qua đêm</option>
                        <option value="Theo ngày">Theo ngày</option>
                        <option value="Tổ chức kỷ niệm">Tổ chức kỷ niệm</option>
                      </select>
                    </div>
                  </div>
                  <div className="cateConsultFormField">
                    <label>Phòng quan tâm</label>
                    <div className="cateConsultFormSelectWrap cateRoomSelects">
                      <select
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                      >
                        <option value="">Chọn phòng nếu đã có ý thích</option>
                        {availableRoomOptions.map((opt, idx) => (
                          <option key={idx} value={opt.value}>
                            {opt.text}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="cateConsultFormField cateConsultFormFieldFull">
                    <label htmlFor="note_base3">Ghi chú</label>
                    <textarea
                      id="note_base3"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Dịp kỷ niệm, cần bồn tắm, máy chiếu, decor..."
                    />
                  </div>
                  <div className="cateConsultFormActions cateConsultFormFieldFull">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cateConsultFormBtn cateConsultFormBtnSubmit cursor-pointer"
                    >
                      <i className="fa fa-paper-plane-o" />
                      <span>{isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}</span>
                    </button>
                    <a
                      href="https://zalo.me/0383104010"
                      target="_blank"
                      rel="noreferrer"
                      className="cateConsultFormBtn cateConsultFormBtnZalo cursor-pointer"
                    >
                      <i className="fa fa-comment-o" />
                      <span>Nhắn Zalo</span>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CATE FAQ */}
      <section className="cateFaq">
        <div className="container">
          <div className="cateFaqHead">
            <div className="cateFaqSub">
              <span />
              <em>Câu hỏi thường gặp</em>
            </div>
            <div className="cateFaqTitle">
              <span>Gỡ các băn khoăn</span>
              <br />
              <span>trước khi đặt</span>
            </div>
            <div className="cateFaqDesc">
              Một số thông tin quan trọng giúp bạn chủ động hơn khi đặt phòng, giữ phòng và chuẩn bị cho buổi hẹn tại Mix.
            </div>
          </div>
          <div className="cateFaqGrid">
            <details className="cateFaqItem" open>
              <summary className="cateFaqQuestion cursor-pointer">
                <span>Có giữ phòng khi chưa đặt cọc không?</span>
                <i className="fa fa-plus" />
              </summary>
              <div className="cateFaqAnswer">
                Có. Mix giữ phòng 15-20 phút khi chưa cọc, có thể linh động đến 1 tiếng nếu thời tiết xấu.
              </div>
            </details>
            <details className="cateFaqItem" open>
              <summary className="cateFaqQuestion cursor-pointer">
                <span>Khi nào cần đặt cọc 50%?</span>
                <i className="fa fa-plus" />
              </summary>
              <div className="cateFaqAnswer">
                Nghỉ giờ trên 4 tiếng, qua đêm, ngày đêm và đặt phòng cuối tuần cần cọc 50% tổng tiền phòng.
              </div>
            </details>
            <details className="cateFaqItem" open>
              <summary className="cateFaqQuestion cursor-pointer">
                <span>Có phụ thu cuối tuần hoặc ngày lễ không?</span>
                <i className="fa fa-plus" />
              </summary>
              <div className="cateFaqAnswer">
                Theo thông tin hiện tại không có phụ thu cuối tuần/ngày lễ, nhưng cuối tuần cần đặt cọc để giữ phòng.
              </div>
            </details>
            <details className="cateFaqItem" open>
              <summary className="cateFaqQuestion cursor-pointer">
                <span>Khách có được mang đồ ăn/uống vào không?</span>
                <i className="fa fa-plus" />
              </summary>
              <div className="cateFaqAnswer">
                Có thể mang vào, hạn chế đồ nặng mùi. Hoa tươi, bánh sinh nhật, rượu từ ngoài có thể có phụ thu.
              </div>
            </details>
            <details className="cateFaqItem" open>
              <summary className="cateFaqQuestion cursor-pointer">
                <span>Mix có nhận khách dưới 18 tuổi không?</span>
                <i className="fa fa-plus" />
              </summary>
              <div className="cateFaqAnswer">
                Không. Mix chỉ nhận khách từ 18 tuổi.
              </div>
            </details>
            <details className="cateFaqItem" open>
              <summary className="cateFaqQuestion cursor-pointer">
                <span>Đặt cọc rồi có đổi lịch được không?</span>
                <i className="fa fa-plus" />
              </summary>
              <div className="cateFaqAnswer">
                Khách đã đặt cọc có thể đổi giờ hoặc ngày trong phạm vi 1-15 ngày, tùy tình trạng phòng trống.
              </div>
            </details>
          </div>
          <div className="cateFaqBottom">
            <div className="cateFaqBottomText">
              Chưa thấy câu hỏi bạn cần? Nhắn Mix để được tư vấn nhanh trước khi đặt phòng.
            </div>
            <a
              href="https://zalo.me/0383104010"
              target="_blank"
              rel="noreferrer"
              className="cateFaqBtn cursor-pointer"
            >
              <i className="fa fa-comment-o" />
              <span>Hỏi nhanh qua Zalo</span>
            </a>
          </div>
        </div>
      </section>

      {/* 11. CATE PREMIUM CTA */}
      <section className="catePremiumCta" id="booking">
        <div className="catePremiumCtaWrap relative">
          <Image
            src="/external/images.unsplash.com/photo-1618221195710-dd6b41faaea6"
            alt="Đặt phòng khách sạn tình yêu Mix Hotel"
            fill
            className="catePremiumCtaBg object-cover"
          />
          <div className="catePremiumCtaShade" />
          <div className="catePremiumCtaContent relative z-10">
            <div className="catePremiumCtaKicker">
              <span />
              <em>Đặt phòng hôm nay</em>
            </div>
            <div className="catePremiumCtaTitle">
              <span>Chọn chi nhánh gần bạn,</span>
              <br />
              <span>Mix tư vấn phòng phù hợp</span>
              <br />
              <span>trong vài phút</span>
            </div>
            <div className="catePremiumCtaText">
              Nhận ảnh thật, giá rõ ràng, tư vấn kín đáo và giữ phòng nhanh qua Zalo hoặc hotline.
            </div>
            <div className="catePremiumCtaActions">
              <a
                href="https://zalo.me/0383104010"
                target="_blank"
                rel="noreferrer"
                className="catePremiumCtaBtn catePremiumCtaBtnMain cursor-pointer"
              >
                <span className="catePremiumCtaBtnIcon">💬</span>
                <span>Nhắn Zalo tư vấn</span>
              </a>
              <a href="tel:0383104010" className="catePremiumCtaBtn catePremiumCtaBtnSub cursor-pointer">
                <span className="catePremiumCtaBtnIcon">☎</span>
                <span>Gọi ngay</span>
              </a>
            </div>
          </div>
          <div className="catePremiumCtaInfo relative z-10">
            <div className="catePremiumCtaInfoItem">
              <span>01</span>
              <p>Xem ảnh phòng thật</p>
            </div>
            <div className="catePremiumCtaInfoItem">
              <span>02</span>
              <p>Chọn chi nhánh gần nhất</p>
            </div>
            <div className="catePremiumCtaInfoItem">
              <span>03</span>
              <p>Giữ phòng nhanh qua Zalo</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CONTENT FRAME SECTION (SEO ARTICLE) */}
      <section className="content-frame-section py-16">
        <div className="container">
          <div className="content-frame">
            {/* Collapsible Table of Contents */}
            <div className="tableOfContent appearContent">
              <div
                className="title cursor-pointer flex items-center justify-between"
                onClick={() => setIsTocOpen(!isTocOpen)}
              >
                <span>Nội dung bài viết:</span>
                <i
                  aria-hidden="true"
                  className={`fa fa-angle-down clickToggle transition-transform duration-300 ${
                    isTocOpen ? "" : "-rotate-90"
                  }`}
                />
              </div>
              {isTocOpen && (
                <div className="mucLucPart" id="bookmark-list">
                  <ul>
                    {KHACH_SAN_TINH_YEU_TOC.map((item, idx) => (
                      <li key={idx} className={item.isSub ? "sub_data" : "data"}>
                        <a href={item.href}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Article Content Body */}
            <div
              className="content-body size-1vw data_contents mt-10"
              dangerouslySetInnerHTML={{ __html: KHACH_SAN_TINH_YEU_CONTENT_HTML }}
            />
          </div>
        </div>
      </section>

      <FooterSection />
      <DesktopContactBar />
      <MobileActionBar />
    </div>
  );
}
