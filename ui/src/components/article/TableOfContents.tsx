"use client";

import React, { useState, useEffect } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";
import type { TocItem } from "@/data/articlesData";

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  const scrollToHeading = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-[#c88922]/30 bg-[#120d08]/90 backdrop-blur-md p-5 md:p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c88922]/20 text-[#ffe2a0]">
            <List className="h-4 w-4 text-[#c88922]" />
          </div>
          <h3 className="font-philosopher text-lg md:text-xl font-bold uppercase tracking-wide text-[#fff8ec]">
            Mục lục bài viết
          </h3>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-xs font-semibold text-[#ffe2a0] hover:text-[#c88922] transition-colors cursor-pointer px-2.5 py-1 rounded-md hover:bg-white/5"
          aria-label={isOpen ? "Thu gọn mục lục" : "Mở rộng mục lục"}
        >
          <span>{isOpen ? "Thu gọn" : "Mở rộng"}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <nav className="mt-4 pt-4 border-t border-[#c88922]/15">
          <ul className="space-y-2.5 text-sm">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li
                  key={item.id}
                  className={`${item.level === 3 ? "pl-5 text-xs md:text-sm" : ""}`}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToHeading(item.id, e)}
                    className={`inline-block transition-all duration-200 leading-snug ${
                      isActive
                        ? "text-[#ffe2a0] font-bold translate-x-1"
                        : "text-[#f5ebd7]/80 hover:text-[#ffe2a0] hover:translate-x-0.5"
                    }`}
                  >
                    <span className="mr-2 text-[#c88922]">
                      {item.level === 3 ? "•" : "▸"}
                    </span>
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
