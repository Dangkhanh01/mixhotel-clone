"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Newspaper, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileActionBar from "@/components/floating/MobileActionBar";
import FooterSection from "@/components/sections/FooterSection";

const CATEGORIES = [
  { id: "all", label: "Tất Cả Bài Viết", title: "TIN TỨC & BÀI VIẾT", subtitle: "CHIA SẺ & CẨM NANG HẸN HÒ" },
  { id: "review", label: "Review Khách Sạn", title: "REVIEW KHÁCH SẠN TÌNH YÊU", subtitle: "TRẢI NGHIỆM THỰC TẾ CÁC PHÒNG CONCEPT" },
  { id: "hen-ho", label: "Địa Điểm Hẹn Hò", title: "ĐỊA ĐIỂM HẸN HÒ DÀNH CHO CẶP ĐÔI", subtitle: "CHỐN HẸN HÒ LÃNG MẠN TẠI HÀ NỘI" },
  { id: "di-choi", label: "Địa Điểm Đi Chơi", title: "ĐỊA ĐIỂM ĐI CHƠI CHO CẶP ĐÔI", subtitle: "GỢI Ý ĐỊA ĐIỂM HẸN HÒ CUỐI TUẦN" },
  { id: "qua-tang", label: "Gợi Ý Quà Tặng", title: "GỢI Ý QUÀ TẶNG CÁC DỊP LỄ", subtitle: "SET QUÀ TẶNG & SETUP LÃNG MẠN" },
  { id: "kien-thuc", label: "Kiến Thức Khách Sạn", title: "KIẾN THỨC VỀ KHÁCH SẠN", subtitle: "QUY CHUẨN DỊCH VỤ & BẢO MẬT MIX BOUTIQUE" },
  { id: "cam-nang", label: "Cẩm Nang Tình Yêu", title: "CẨM NANG TÌNH YÊU", subtitle: "BÍ QUYẾT GIỮ LỬA & THĂNG HOA CẢM XÚC" },
  { id: "dia-chi", label: "Địa Chỉ Khách Sạn", title: "CÁC ĐỊA CHỈ KHÁCH SẠN TÌNH YÊU", subtitle: "HỆ THỐNG 3 CHI NHÁNH MIX BOUTIQUE HOTEL" },
];

const ARTICLES = [
  {
    id: 1,
    slug: "khach-san-vintage",
    category: "review",
    categoryName: "Review khách sạn",
    title: "Trải nghiệm phòng khách sạn vintage tại Mix Hotel: Đâu là lựa chọn cho cảm xúc của bạn?",
    excerpt: "Khám phá phòng khách sạn phong cách vintage hoài cổ, mộc mạc và điện ảnh tại Mix Hotel. Hướng dẫn chọn phòng theo đúng mood, tiện ích bồn tắm và ngân sách cho cặp đôi.",
    image: "/images/articles/khach-san-vintage-thumb.jpg",
    date: "14/09/2026",
  },
  {
    id: 2,
    slug: "khach-san-phong-cach-tropical",
    category: "hen-ho",
    categoryName: "Địa điểm hẹn hò",
    title: "Khách sạn phong cách tropical: Trải nghiệm chọn phòng đúng 'gu' cho buổi hẹn hò",
    excerpt: "Gợi ý phòng khách sạn phong cách nhiệt đới tropical theo vibe thiên nhiên tươi mát, cây xanh, ánh sáng tự nhiên và bảng giá phòng linh hoạt.",
    image: "/images/articles/khach-san-phong-cach-tropical-thumb.jpg",
    date: "12/09/2026",
  },
  {
    id: 3,
    slug: "khach-san-phong-cach-indochine",
    category: "review",
    categoryName: "Review khách sạn",
    title: "Phòng khách sạn phong cách Indochine tại Mix Hotel: Cách tìm đúng \"gu\" cho trải nghiệm riêng tư",
    excerpt: "Bạn tìm khách sạn phong cách indochine nhưng phân vân giữa các hạng phòng? Hướng dẫn chọn phòng theo gu, tiện ích bồn tắm và bảng giá chi tiết.",
    image: "/images/articles/khach-san-phong-cach-indochine-thumb.jpg",
    date: "10/09/2026",
  },
  {
    id: 4,
    slug: "khach-san-gan-lang-bac",
    category: "dia-chi",
    categoryName: "Địa chỉ khách sạn",
    title: "Top 7 khách sạn gần Lăng Bác dễ di chuyển, giá theo giờ/qua đêm",
    excerpt: "Tổng hợp các khách sạn gần Lăng Bác đáp ứng tiêu chí: vị trí thuận tiện, giá rõ ràng, phòng sạch sẽ và phù hợp cho cặp đôi nghỉ ngơi.",
    image: "/images/articles/khach-san-gan-lang-bac-thumb.jpg",
    date: "08/09/2026",
  },
  {
    id: 5,
    slug: "so-sanh-khach-san",
    category: "kien-thuc",
    categoryName: "Kiến thức khách sạn",
    title: "So sánh khách sạn tình yêu và khách sạn truyền thống: Đâu là lựa chọn phù hợp cho bạn?",
    excerpt: "So sánh khách sạn tình yêu và khách sạn truyền thống về giá cả, tiện nghi và quy trình check-in để bạn lựa chọn đúng nhu cầu hẹn hò.",
    image: "/images/articles/so-sanh-khach-san-thumb.jpg",
    date: "05/09/2026",
  },
  {
    id: 6,
    slug: "bang-noi-quy-khach-san",
    category: "kien-thuc",
    categoryName: "Kiến thức khách sạn",
    title: "Nội Quy Khách Sạn Tình Yêu & Những Lưu Ý Quan Trọng Để Cặp Đôi Trải Nghiệm Trọn Vẹn",
    excerpt: "Bảng nội quy khách sạn tình yêu về thủ tục check-in, quy định độ tuổi và các lưu ý quan trọng để bạn và người ấy có buổi hẹn hò trọn vẹn.",
    image: "/images/articles/bang-noi-quy-khach-san-thumb.jpg",
    date: "01/09/2026",
  },
  {
    id: 7,
    slug: "khach-san-gan-pho-co",
    category: "dia-chi",
    categoryName: "Địa chỉ khách sạn",
    title: "Top 5 khách sạn gần phố cổ: Lựa chọn tinh tế cho cặp đôi tìm kiếm sự riêng tư và thoải mái",
    excerpt: "So sánh chi tiết ưu nhược điểm khi ở trong và gần Phố Cổ Hà Nội để chọn khách sạn phù hợp cho cặp đôi tìm kiếm sự lãng mạn và riêng tư.",
    image: "/images/articles/khach-san-gan-pho-co-thumb.jpg",
    date: "28/08/2026",
  },
  {
    id: 8,
    slug: "khach-san-gan-ho-guom",
    category: "di-choi",
    categoryName: "Địa điểm đi chơi",
    title: "Top 7 Khách Sạn Gần Hồ Gươm Đẹp, Sang Trọng Và Lãng Mạn",
    excerpt: "Bạn đang tìm khách sạn gần Hồ Gươm? Khám phá ngay danh sách các khách sạn từ 5 sao sang trọng đến boutique lãng mạn cho buổi tối hẹn hò.",
    image: "/images/articles/khach-san-gan-ho-guom-thumb.webp",
    date: "25/08/2026",
  },
  {
    id: 9,
    slug: "khach-san-phong-cach-indochine",
    category: "qua-tang",
    categoryName: "Gợi ý quà tặng",
    title: "Gợi ý set quà tặng lãng mạn trong phòng khách sạn khiến người ấy tan chảy",
    excerpt: "Dịch vụ decor phòng tiệc sinh nhật, kỷ niệm với rượu vang Pháp, dâu tây nhúng socola và hoa tươi được ưa chuộng nhất tại Mix Hotel.",
    image: "/images/469-moonlit-love.jpg",
    date: "01/09/2026",
  },
  {
    id: 10,
    slug: "khach-san-vintage",
    category: "qua-tang",
    categoryName: "Gợi ý quà tặng",
    title: "Bật mí 5 món quà bất ngờ dành cho chàng và nàng trong đêm kỷ niệm tình yêu",
    excerpt: "Những ý tưởng quà tặng tinh tế kết hợp cùng không gian phòng trang trí nến và cánh hoa hồng tạo nên kỷ niệm khó quên.",
    image: "/images/event-3.jpg",
    date: "30/08/2026",
  },
  {
    id: 11,
    slug: "so-sanh-khach-san",
    category: "kien-thuc",
    categoryName: "Kiến thức khách sạn",
    title: "Quy chuẩn vệ sinh và khử khuẩn bồn tắm Jacuzzi chuẩn 5 sao tại Mix Boutique",
    excerpt: "Tìm hiểu quy trình tiệt trùng nước, bồn tắm massage và drap trải giường nghiêm ngặt bảo đảm an toàn tuyệt đối cho mọi khách hàng.",
    image: "/images/photo-tile-bathtub.webp",
    date: "28/08/2026",
  },
  {
    id: 12,
    slug: "bang-noi-quy-khach-san",
    category: "cam-nang",
    categoryName: "Cẩm nang tình yêu",
    title: "Bí quyết tạo bất ngờ cho bạn gái nhân dịp kỷ niệm ngày yêu nhau",
    excerpt: "Từ việc chọn concept phòng có bồn sục Jacuzzi đôi, setup hoa hồng nến lung linh đến chuẩn bị quà tặng tinh tế khiến nàng nhớ mãi.",
    image: "/images/tvha-2.webp",
    date: "24/08/2026",
  },
  {
    id: 13,
    slug: "khach-san-phong-cach-tropical",
    category: "cam-nang",
    categoryName: "Cẩm nang tình yêu",
    title: "Nghệ thuật thăng hoa cảm xúc: Hướng dẫn trải nghiệm không gian lãng mạn đúng cách",
    excerpt: "Bí quyết tận dụng thiết kế bồn tắm thư giãn cùng trang phục gợi cảm để làm mới ngọn lửa tình yêu.",
    image: "/images/photo-tile-tantra.webp",
    date: "22/08/2026",
  },
  {
    id: 14,
    slug: "khach-san-gan-lang-bac",
    category: "dia-chi",
    categoryName: "Địa chỉ khách sạn",
    title: "Tổng hợp 3 chi nhánh Mix Boutique Hotel tại Hà Nội: Địa chỉ và chỉ đường",
    excerpt: "Thông tin vị trí chi tiết các chi nhánh Huỳnh Thúc Kháng, Đặng Tiến Đông và Phúc La - Hà Đông kèm số hotline đặt phòng nhanh.",
    image: "/images/branch-huynhthuckhang.webp",
    date: "20/08/2026",
  },
  {
    id: 15,
    slug: "khach-san-gan-pho-co",
    category: "dia-chi",
    categoryName: "Địa chỉ khách sạn",
    title: "Khám phá chi nhánh Mix Boutique Hotel 20 Phúc La - Hà Đông: Điểm hẹn lãng mạn mới",
    excerpt: "Chi nhánh sở sở hữu các phòng concept hiện đại, bồn tắm sục đôi cỡ lớn và bãi đỗ xe ô tô kín đáo riêng tư.",
    image: "/images/branch-phucla.webp",
    date: "18/08/2026",
  },
];

const ITEMS_PER_PAGE = 6;

function TinTucContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCat = searchParams.get("cat") || "all";
  const currentPage = parseInt(searchParams.get("page") || "1", 10) || 1;

  const handleSelectCat = (catId: string) => {
    const targetUrl = catId === "all" ? "/tin-tuc" : `/tin-tuc?cat=${catId}`;
    router.push(targetUrl, { scroll: false });
  };

  const handleSelectPage = (page: number) => {
    const base = selectedCat === "all" ? "/tin-tuc" : `/tin-tuc?cat=${selectedCat}`;
    const targetUrl = page === 1 ? base : `${base}${selectedCat === "all" ? "?" : "&"}page=${page}`;
    router.push(targetUrl, { scroll: false });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCat) || CATEGORIES[0];

  const filteredArticles =
    selectedCat === "all"
      ? ARTICLES
      : ARTICLES.filter((item) => item.category === selectedCat);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const pagedArticles = filteredArticles.slice(
    (validPage - 1) * ITEMS_PER_PAGE,
    validPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#070503] text-[#fff8ec] selection:bg-[#c88922] selection:text-black">
      <DesktopHeader />
      <MobileHeader />

      {/* Breadcrumbs */}
      <div className="pt-24 pb-4 border-b border-[#c88922]/15 bg-[#0f0b08]">
        <div className="max-w-[1240px] mx-auto px-5 flex items-center gap-2 text-xs font-semibold text-zinc-400">
          <Link href="/" className="text-[#ffe2a0]/80 hover:text-[#ffe2a0] transition-colors font-medium">
            Trang chủ
          </Link>
          <span>/</span>
          <button
            onClick={() => handleSelectCat("all")}
            className={`transition-colors font-medium cursor-pointer ${
              selectedCat === "all" ? "text-[#ffe2a0]" : "text-[#ffe2a0]/80 hover:text-[#ffe2a0]"
            }`}
          >
            Tin tức
          </button>
          {selectedCat !== "all" && (
            <>
              <span>/</span>
              <span className="text-[#ffe2a0]">{activeCategory.label}</span>
            </>
          )}
        </div>
      </div>

      <main className="max-w-[1240px] mx-auto px-5 py-12 md:py-16">
        {/* Page Heading & Kicker */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[#c88922] uppercase mb-2 font-philosopher">
            {activeCategory.subtitle}
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-philosopher text-[#fff8ec] tracking-tight uppercase">
            {activeCategory.title}
          </h1>
          <div className="w-20 h-0.5 bg-[#c88922]/60 mx-auto mt-4" />
        </div>

        {/* Category Pills (Tabs) */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectCat(cat.id)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold font-philosopher tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                selectedCat === cat.id
                  ? "bg-gradient-to-r from-[#c88922] to-[#ffe2a0] text-[#1a0f05] shadow-lg scale-105"
                  : "bg-[#140e0a] border border-[#c88922]/30 text-zinc-300 hover:border-[#c88922] hover:text-[#ffe2a0]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        {pagedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {pagedArticles.map((article) => (
              <Link
                key={article.id}
                href={article.slug ? `/tin-tuc/${article.slug}` : "#"}
                className="rounded-3xl overflow-hidden bg-[#140e0a] border border-[#c88922]/25 shadow-xl hover:border-[#c88922]/70 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#ffe2a0] border border-[#c88922]/40 text-xs font-bold font-philosopher inline-flex items-center gap-1.5">
                      <Newspaper className="w-3.5 h-3.5 text-[#c88922]" />
                      <span>{article.categoryName}</span>
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-[#c88922]" />
                      <span>{article.date}</span>
                    </div>

                    <h2 className="text-lg font-bold font-philosopher text-[#fff8ec] group-hover:text-[#ffe2a0] transition-colors line-clamp-2 mb-3 leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed font-light">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold font-philosopher text-[#ffe2a0] group-hover:text-[#c88922] transition-colors tracking-wide uppercase">
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#140e0a] rounded-3xl border border-[#c88922]/20 mb-12">
            <p className="text-zinc-400 font-philosopher text-lg mb-4">
              Chưa có bài viết trong danh mục này.
            </p>
            <button
              onClick={() => handleSelectCat("all")}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#c88922] to-[#ffe2a0] text-[#1a0f05] font-bold text-xs uppercase font-philosopher"
            >
              Xem tất cả bài viết
            </button>
          </div>
        )}

        {/* Pagination Section (Phân trang chuẩn như mixhotel.vn) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => handleSelectPage(Math.max(1, validPage - 1))}
              disabled={validPage === 1}
              aria-label="Trang trước"
              className="w-10 h-10 rounded-full border border-[#c88922]/30 flex items-center justify-center text-zinc-300 hover:border-[#c88922] hover:text-[#ffe2a0] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handleSelectPage(page)}
                className={`w-10 h-10 rounded-full font-bold text-sm font-philosopher transition-all duration-200 cursor-pointer ${
                  validPage === page
                    ? "bg-gradient-to-r from-[#c88922] to-[#ffe2a0] text-[#1a0f05] shadow-lg scale-105"
                    : "border border-[#c88922]/30 text-zinc-300 hover:border-[#c88922] hover:text-[#ffe2a0] bg-[#140e0a]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handleSelectPage(Math.min(totalPages, validPage + 1))}
              disabled={validPage === totalPages}
              aria-label="Trang tiếp theo"
              className="w-10 h-10 rounded-full border border-[#c88922]/30 flex items-center justify-center text-zinc-300 hover:border-[#c88922] hover:text-[#ffe2a0] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      <FooterSection />
      <DesktopContactBar />
      <MobileActionBar />
    </div>
  );
}

export default function TinTucPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070503] flex items-center justify-center text-[#ffe2a0]">
          Đang tải trang tin tức...
        </div>
      }
    >
      <TinTucContent />
    </Suspense>
  );
}
