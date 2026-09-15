"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Eye,
  ChevronRight,
  Home,
  Newspaper,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { Article } from "@/data/articlesData";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileBottomNav from "@/components/floating/MobileBottomNav";
import ContactModal from "@/components/ui/ContactModal";
import FooterSection from "@/components/sections/FooterSection";
import TableOfContents from "./TableOfContents";
import ArticleShareButtons from "./ArticleShareButtons";
import ArticleBookingCta from "./ArticleBookingCta";

interface ArticleDetailClientProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleDetailClient({
  article,
  relatedArticles,
}: ArticleDetailClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070503] text-[#fff8ec] selection:bg-[#c88922] selection:text-black">
      {/* Navigation Headers */}
      <DesktopHeader onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileHeader onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Container */}
      <main className="pt-28 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs md:text-sm text-zinc-400 mb-6 overflow-x-auto whitespace-nowrap scrollbar-none py-1"
          >
            <Link
              href="/"
              className="hover:text-[#ffe2a0] transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5 text-[#c88922]" />
              <span>Trang chủ</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
            <Link
              href="/tin-tuc"
              className="hover:text-[#ffe2a0] transition-colors"
            >
              Tin tức
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
            <Link
              href={`/tin-tuc?cat=${article.category}`}
              className="hover:text-[#ffe2a0] transition-colors text-zinc-300"
            >
              {article.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
            <span className="text-[#ffe2a0] truncate max-w-[200px] md:max-w-none">
              {article.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c88922]/15 border border-[#c88922]/30 text-[#ffe2a0] text-xs font-bold font-philosopher uppercase tracking-wider mb-4">
              <Newspaper className="w-3.5 h-3.5 text-[#c88922]" />
              <span>{article.categoryName}</span>
            </div>

            <h1
              style={{ color: "#fff8ec" }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-philosopher text-[#fff8ec] leading-[1.25] tracking-tight mb-5"
            >
              {article.title}
            </h1>

            {/* Meta Information Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-zinc-400 pb-6 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500 font-medium">Bởi:</span>
                <span className="text-[#ffe2a0] font-semibold">
                  {article.author}
                </span>
              </div>

              <span className="text-zinc-700">•</span>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c88922]" />
                <span>{article.publishedAt}</span>
              </div>

              <span className="text-zinc-700">•</span>

              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c88922]" />
                <span>{article.readTime}</span>
              </div>

              <span className="text-zinc-700">•</span>

              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#c88922]" />
                <span>{article.views.toLocaleString()} lượt xem</span>
              </div>
            </div>

            {/* Sapo / Lead Paragraph */}
            {article.excerpt && (
              <div className="mt-6 p-5 rounded-2xl bg-[#140e0a] border-l-4 border-[#c88922] border-y border-r border-[#c88922]/20 shadow-lg">
                <p className="text-base md:text-lg text-[#f5ebd7] font-medium leading-relaxed italic">
                  {article.excerpt}
                </p>
              </div>
            )}
          </header>

          {/* Table of Contents */}
          {article.tableOfContents && article.tableOfContents.length > 0 && (
            <TableOfContents items={article.tableOfContents} />
          )}

          {/* Main Article Content Body */}
          <article
            className="article-rich-content text-[#f5ebd7]/90 leading-relaxed text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Booking CTA Section inside Article */}
          <ArticleBookingCta />

          {/* Social Share Buttons */}
          <ArticleShareButtons title={article.title} />

          {/* Related Articles Section */}
          {relatedArticles && relatedArticles.length > 0 && (
            <section className="mt-16 pt-10 border-t border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 text-[#c88922] text-xs font-bold font-philosopher uppercase tracking-widest mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Khám phá thêm</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black font-philosopher text-[#fff8ec] uppercase tracking-tight">
                    Bài viết liên quan
                  </h2>
                </div>

                <Link
                  href="/tin-tuc"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold font-philosopher text-[#ffe2a0] hover:text-[#c88922] uppercase tracking-wider transition-colors"
                >
                  <span>Xem tất cả</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/tin-tuc/${rel.slug}`}
                    className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-[#140e0a] border border-[#c88922]/25 shadow-lg hover:border-[#c88922]/70 transition-all duration-300"
                  >
                    <div>
                      <div className="relative w-full h-44 overflow-hidden">
                        <Image
                          src={rel.thumbnail}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[#ffe2a0] border border-[#c88922]/40 text-[11px] font-bold font-philosopher">
                          {rel.categoryName}
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2">
                          <Calendar className="w-3 h-3 text-[#c88922]" />
                          <span>{rel.publishedAt}</span>
                        </div>

                        <h3 className="text-base font-bold font-philosopher text-[#fff8ec] group-hover:text-[#ffe2a0] transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <span className="inline-flex items-center gap-1 text-xs font-bold font-philosopher text-[#ffe2a0] group-hover:text-[#c88922] transition-colors">
                        <span>Đọc tiếp</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Floating CTA elements */}
      <DesktopContactBar onOpenBooking={() => setIsBookingOpen(true)} />
      <MobileBottomNav onOpenBooking={() => setIsBookingOpen(true)} />
      <ContactModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Global Footer */}
      <FooterSection />
    </div>
  );
}
