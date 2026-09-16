"use client";

import React from "react";
import Link from "next/link";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileActionBar from "@/components/floating/MobileActionBar";
import FooterSection from "@/components/sections/FooterSection";

export default function ChinhSachDatTraPhongPage() {
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
          <Link href="/chinh-sach" className="text-[#ffe2a0]/80 hover:text-[#ffe2a0] transition-colors font-medium">
            Chính sách
          </Link>
          <span>/</span>
          <span className="text-[#ffe2a0]">Chính sách đặt trả phòng</span>
        </div>
      </div>

      <main className="max-w-[960px] mx-auto px-5 py-12 md:py-16">
        <div className="text-center mb-12">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-[#c88922] uppercase mb-2 font-philosopher">
            QUY ĐỊNH LƯU TRÚ
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-philosopher text-[#fff8ec] tracking-tight">
            CHÍNH SÁCH ĐẶT & TRẢ PHÒNG
          </h1>
          <div className="w-20 h-0.5 bg-[#c88922]/60 mx-auto mt-4" />
        </div>

        <div className="rounded-3xl p-8 md:p-12 bg-[#140e0a] border border-[#c88922]/25 shadow-2xl space-y-8 text-zinc-300 leading-relaxed font-light">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-bold font-philosopher text-[#ffe2a0] mb-3 flex items-center gap-2">
              <i className="fa fa-calendar-check-o text-[#c88922]" />
              <span>1. Quy định về đặt phòng & Giữ phòng</span>
            </h2>
            <ul className="space-y-2 text-sm pl-4 list-disc marker:text-[#c88922]">
              <li>
                <strong>Đặt theo giờ:</strong> Mix Hotel giữ phòng tối đa <strong>15 - 20 phút</strong> kể từ giờ hẹn mà không yêu cầu đặt cọc trước.
              </li>
              <li>
                <strong>Đặt qua đêm & ngày lễ:</strong> Quý khách vui lòng chuyển khoản đặt cọc tối thiểu 50% tiền phòng để hệ thống khóa phòng và bảo lưu chắc chắn cho quý khách.
              </li>
              <li>
                <strong>Độ tuổi quy định:</strong> Hệ thống khách sạn tình yêu chỉ phục vụ khách hàng từ <strong>đủ 18 tuổi trở lên</strong> có căn cước công dân hoặc giấy tờ tùy thân hợp lệ.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-bold font-philosopher text-[#ffe2a0] mb-3 flex items-center gap-2">
              <i className="fa fa-clock-o text-[#c88922]" />
              <span>2. Thời gian Nhận phòng & Trả phòng</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-sm">
              <div className="p-4 rounded-xl bg-[#1c140e] border border-[#c88922]/20">
                <strong className="block text-[#ffe2a0] font-bold mb-1">Khung giờ theo giờ:</strong>
                Linh hoạt 24/24h theo thời gian khách hàng đến nhận chìa khóa phòng. Tính theo block 2 giờ đầu tiên và cộng dồn các giờ tiếp theo.
              </div>
              <div className="p-4 rounded-xl bg-[#1c140e] border border-[#c88922]/20">
                <strong className="block text-[#ffe2a0] font-bold mb-1">Khung giờ qua đêm:</strong>
                Nhận phòng từ 21:00 tối hôm trước và trả phòng trước 12:00 trưa hôm sau (hoặc linh hoạt theo thỏa thuận trước với lễ tân).
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-bold font-philosopher text-[#ffe2a0] mb-3 flex items-center gap-2">
              <i className="fa fa-refresh text-[#c88922]" />
              <span>3. Thay đổi lịch & Hủy đặt phòng</span>
            </h2>
            <p className="text-sm leading-relaxed">
              Trường hợp quý khách có việc đột xuất cần đổi giờ hoặc hủy phòng, xin vui lòng thông báo trước cho Mix Hotel qua hotline/Zalo ít nhất <strong>02 tiếng</strong> trước giờ hẹn để được hỗ trợ chuyển ngày hoặc hoàn cọc theo quy chế dịch vụ.
            </p>
          </div>

          {/* Section 4 */}
          <div className="p-5 rounded-2xl bg-[#c88922]/10 border border-[#c88922]/30 flex items-start gap-3 text-sm text-zinc-300">
            <i className="fa fa-exclamation-triangle text-[#ffe2a0] text-lg shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#ffe2a0] font-bold mb-1">Trường hợp bất khả kháng:</strong>
              Nếu phát sinh sự cố kỹ thuật về thiết bị (máy lạnh, bồn Jacuzzi) trong phòng, Mix Hotel sẽ lập tức nâng cấp miễn phí cho quý khách lên hạng phòng cao hơn hoặc hoàn trả 100% chi phí.
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
      <DesktopContactBar />
      <MobileActionBar />
    </div>
  );
}
