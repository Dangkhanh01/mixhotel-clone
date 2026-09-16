"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

interface DesktopHeaderProps {
  onOpenBooking?: () => void;
}

export default function DesktopHeader({ onOpenBooking }: DesktopHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { openBranchSelect } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      openBranchSelect("zalo");
    }
  };

  return (
    <div id="menuNKTA" className="hidden lg:block">
      <header
        id="menuMixPremiumDesktop"
        className={isScrolled ? "mixPremiumMenuScrolled" : ""}
      >
        <div className="mixPremiumMenuWrap">
          <div className="container">
            <div className="mixPremiumMenuInner">
              {/* Logo */}
              <div className="mixPremiumLogoBox">
                <Link href="/" className="mixPremiumLogoLink" title="home">
                  <Image
                    src="/images/mix-boutique-logo.png"
                    alt="mixhotel"
                    width={160}
                    height={52}
                    className="mixPremiumLogoImg"
                    priority
                  />
                </Link>
              </div>

              {/* Navigation Menu */}
              <nav className="mixPremiumNavBox">
                {/* GIỚI THIỆU */}
                <div className="mixPremiumNavItem">
                  <Link href="/gioi-thieu" className="mixPremiumNavLink">
                    <span>GIỚI THIỆU</span>
                  </Link>
                </div>

                {/* KHÁCH SẠN TÌNH YÊU */}
                <div
                  className={`mixPremiumNavItem mixPremiumHasDrop ${activeDropdown === "rooms" ? "open" : ""}`}
                  onMouseEnter={() => setActiveDropdown("rooms")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href="/khach-san-tinh-yeu" className="mixPremiumNavLink">
                    <span>KHÁCH SẠN TÌNH YÊU</span>
                    <i className="fa fa-angle-down"></i>
                  </Link>
                  <ul className="mixPremiumDropList">
                    <li className="mixPremiumDropItem">
                      <Link href="/mix-boutique-premium-hotel" className="mixPremiumDropLink">
                        MIX BOUTIQUE PREMIUM
                      </Link>
                    </li>
                    <li className="mixPremiumDropItem">
                      <Link href="/mix-boutique-hotel-256b-dang-tien-dong" className="mixPremiumDropLink">
                        MIX BOUTIQUE HOTEL 256B ĐẶNG TIẾN ĐÔNG
                      </Link>
                    </li>
                    <li className="mixPremiumDropItem">
                      <Link href="/mix-boutique-hotel-20-phuc-la-ha-dong" className="mixPremiumDropLink">
                        MIX BOUTIQUE HOTEL 20 PHÚC LA HÀ ĐÔNG
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* GALLERY */}
                <div className="mixPremiumNavItem">
                  <Link href="/gallery" className="mixPremiumNavLink">
                    <span>GALLERY</span>
                  </Link>
                </div>

                {/* TIN TỨC */}
                <div
                  className={`mixPremiumNavItem mixPremiumHasDrop ${activeDropdown === "news" ? "open" : ""}`}
                  onMouseEnter={() => setActiveDropdown("news")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href="/tin-tuc" className="mixPremiumNavLink">
                    <span>TIN TỨC</span>
                    <i className="fa fa-angle-down"></i>
                  </Link>
                  <ul className="mixPremiumDropList">
                    <li className="mixPremiumDropItem">
                      <Link href="/review-khach-san-tinh-yeu" className="mixPremiumDropLink">
                        REVIEW KHÁCH SẠN TÌNH YÊU
                      </Link>
                    </li>
                    <li className="mixPremiumDropItem">
                      <Link href="/dia-diem-hen-ho-danh-cho-cap-doi" className="mixPremiumDropLink">
                        ĐỊA ĐIỂM HẸN HÒ DÀNH CHO CẶP ĐÔI
                      </Link>
                    </li>
                    <li className="mixPremiumDropItem">
                      <Link href="/dia-diem-di-choi-cho-cap-doi" className="mixPremiumDropLink">
                        ĐỊA ĐIỂM ĐI CHƠI CHO CẶP ĐÔI
                      </Link>
                    </li>
                    <li className="mixPremiumDropItem">
                      <Link href="/goi-y-qua-tang-cac-diep-le" className="mixPremiumDropLink">
                        GỢI Ý QUÀ TẶNG CÁC DỊP LỄ
                      </Link>
                    </li>
                    <li className="mixPremiumDropItem">
                      <Link href="/kien-thuc-ve-khach-san" className="mixPremiumDropLink">
                        KIẾN THỨC VỀ KHÁCH SẠN
                      </Link>
                    </li>
                    <li className="mixPremiumDropItem">
                      <Link href="/cam-nang-tinh-yeu" className="mixPremiumDropLink">
                        CẨM NANG TÌNH YÊU
                      </Link>
                    </li>
                    <li className="mixPremiumDropItem">
                      <Link href="/cac-dia-chi-khach-san-tinh-yeu" className="mixPremiumDropLink">
                        CÁC ĐỊA CHỈ KHÁCH SẠN TÌNH YÊU
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* SỰ KIỆN */}
                <div className="mixPremiumNavItem">
                  <Link href="/su-kien" className="mixPremiumNavLink">
                    <span>SỰ KIỆN</span>
                  </Link>
                </div>

                {/* CHÍNH SÁCH */}
                <div
                  className={`mixPremiumNavItem mixPremiumHasDrop ${activeDropdown === "policies" ? "open" : ""}`}
                  onMouseEnter={() => setActiveDropdown("policies")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href="/chinh-sach-thanh-toan" className="mixPremiumNavLink">
                    <span>CHÍNH SÁCH</span>
                    <i className="fa fa-angle-down"></i>
                  </Link>
                  <ul className="mixPremiumDropList">
                    <li className="mixPremiumDropItem">
                      <Link href="/chinh-sach-thanh-toan" className="mixPremiumDropLink">
                        CHÍNH SÁCH THANH TOÁN
                      </Link>
                    </li>
                    <li className="mixPremiumDropItem">
                      <Link href="/chinh-sach-bao-mat-thong-tin" className="mixPremiumDropLink">
                        CHÍNH SÁCH BẢO MẬT THÔNG TIN
                      </Link>
                    </li>
                    <li className="mixPremiumDropItem">
                      <Link href="/chinh-sach-dat-tra-phong" className="mixPremiumDropLink">
                        CHÍNH SÁCH ĐẶT TRẢ PHÒNG
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* LIÊN HỆ */}
                <div className="mixPremiumNavItem">
                  <Link href="/lien-he" className="mixPremiumNavLink">
                    <span>LIÊN HỆ</span>
                  </Link>
                </div>
              </nav>

              {/* Action Box: ĐẶT PHÒNG */}
              <div className="mixPremiumActionBox">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="mixPremiumContactBtn cursor-pointer"
                >
                  <i className="fa fa-phone"></i>
                  <span>ĐẶT PHÒNG</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
