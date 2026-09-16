"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileActionBar from "@/components/floating/MobileActionBar";
import FooterSection from "@/components/sections/FooterSection";
import { GALLERY_ITEMS, GALLERY_BRANCH_TABS } from "@/data/galleryData";

const ITEMS_PER_PAGE = 12;

export default function GalleryPage() {
  const [activeBranch, setActiveBranch] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter items by branch
  const filteredItems = useMemo(() => {
    if (activeBranch === "all") {
      return GALLERY_ITEMS;
    }
    return GALLERY_ITEMS.filter((item) => item.branchId === activeBranch);
  }, [activeBranch]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleBranchChange = (branchId: string) => {
    setActiveBranch(branchId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0c080a] text-[#fff8ec]">
      <DesktopHeader />
      <MobileHeader />

      <main className="mb-md-5 pb-md-5 galerryMix pt-24 md:pt-32">
        <article className="secMainContent">
          <div className="py-4 md:py-8 container mx-auto px-4 max-w-7xl">
            {/* Title Block */}
            <div className="text-center mb-6">
              <div className="titleBlock_1">
                <a>
                  <p className="titleText">GALLERY</p>
                </a>
              </div>
              <p className="text-sm md:text-base text-[#c5b8a5] max-w-2xl mx-auto -mt-2 mb-8">
                Khám phá bộ sưu tập 32+ phòng concept lãng mạn, tinh tế với hình ảnh chụp thực tế 100% tại 3 cơ sở Mix Boutique Hotel.
              </p>
            </div>

            {/* Subcategory Branch Filters */}
            <div className="wrapSubcateBlock_1">
              <div className="subcateBlock_1">
                {GALLERY_BRANCH_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleBranchChange(tab.id)}
                    className={`subcateName cursor-pointer ${
                      activeBranch === tab.id ? "active" : ""
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 my-6">
              {paginatedItems.map((item) => (
                <div key={item.id} className="galleryItemCol group flex flex-col">
                  <figure className="gold-rectangle slideshow relative overflow-hidden rounded-xl">
                    <Link
                      href={item.link}
                      className="absolute inset-0 w-full h-full block"
                      title={item.title}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="text-xs font-semibold text-[#ffe2a0] bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                          Xem chi tiết phòng &rarr;
                        </span>
                      </div>
                    </Link>
                  </figure>
                  <p className="galleryCardTitle mt-3 text-center">
                    <Link
                      href={item.link}
                      className="text-sm md:text-base font-semibold text-[#fff8ec] hover:text-[#ffe2a0] transition-colors line-clamp-1 block"
                      title={item.title}
                    >
                      {item.title}
                    </Link>
                  </p>
                  <div className="text-center -mt-1">
                    <span className="text-[11px] text-[#c88922] font-medium tracking-wide uppercase">
                      {item.branchName} • {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="galleryPagination">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`pageBtn ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                  aria-label="Previous page"
                >
                  <i className="fa fa-angle-left" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`pageBtn ${currentPage === pageNum ? "active" : ""}`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`pageBtn ${
                    currentPage === totalPages ? "opacity-30 cursor-not-allowed" : ""
                  }`}
                  aria-label="Next page"
                >
                  <i className="fa fa-angle-right" />
                </button>
              </div>
            )}

            {/* Bottom Content Frame / SEO Article */}
            <article className="mt-12 mb-8 px-0">
              <section className="container mx-auto px-6 md:px-10 text-justify py-8 rounded-2xl border border-[#c88922]/25 bg-[#140e0a] shadow-xl">
                <header className="text-center md:text-left mb-6">
                  <h2 className="title-section text-xl md:text-2xl font-bold text-[#ffe2a0] font-philosopher">
                    Bộ Sưu Tập Hình Ảnh Khách Sạn Tình Yêu Mix Boutique Hotel
                  </h2>
                  <div className="w-20 h-0.5 bg-[#c88922] mt-2 mb-4 mx-auto md:mx-0" />
                </header>
                <div className="data_contents text-[#eee4d3] leading-relaxed text-sm md:text-base space-y-4">
                  <p>
                    Chào mừng bạn đến với bộ sưu tập hình ảnh thực tế của <strong>Mix Boutique Hotel</strong>. Tất cả hình ảnh trong Gallery được chụp trực tiếp tại 3 cơ sở của chúng tôi tại Hà Nội: <em>Mix Boutique Premium (186 Hoàng Ngân / Huỳnh Thúc Kháng)</em>, <em>Cơ sở 256B Đặng Tiến Đông</em>, và <em>Cơ sở 20 Phúc La - Hà Đông</em>.
                  </p>
                  <p>
                    Mỗi căn phòng tại Mix Hotel là một thế giới cảm xúc riêng biệt với hơn 32 concept độc bản: từ lãng mạn huyền ảo với trần ngàn sao <strong>Galaxy</strong>, bồng bềnh tiên cảnh tại <strong>Cloud Nine</strong>, nồng nhiệt thăng hoa cùng <strong>Inferno</strong>, đến những trải nghiệm kịch tính mới lạ tại <strong>Master &apos;n&apos; Slave</strong> hay sự dịu dàng của <strong>Eden</strong>.
                  </p>
                  <p>
                    Toàn bộ phòng đều được trang bị đầy đủ tiện nghi cao cấp: bồn tắm sục Jacuzzi đôi ngập tràn bọt tuyết, ghế tình yêu Tantra uốn lượn quyến rũ, màn chiếu phim Full HD / 4K siêu nét cùng dịch vụ cho mượn trang phục Cosplay và Board Game tình yêu hoàn toàn miễn phí. Hãy bấm vào từng thẻ phòng để xem chi tiết không gian, bảng giá và đặt phòng kín đáo, riêng tư 100%!
                  </p>
                </div>
              </section>
            </article>
          </div>
        </article>
      </main>

      <FooterSection />
      <DesktopContactBar />
      <MobileActionBar />
    </div>
  );
}
