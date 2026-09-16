import React from "react";
import { Metadata } from "next";
import BranchDetailTemplate from "@/components/branch/BranchDetailTemplate";
import { BRANCH_FULL_DATA } from "@/data/branchFullData";

export const metadata: Metadata = {
  title: "Mix Boutique Premium | Khách Sạn Tình Yêu Hà Nội",
  description: "Cơ sở Mix Boutique Premium tại Huỳnh Thúc Kháng / Hoàng Ngân với 11 phòng concept độc bản, bồn tắm sục đôi, máy chiếu phim sắc nét, riêng tư 100%.",
};

export default function MixBoutiquePremiumPage() {
  const branch = BRANCH_FULL_DATA["mix-boutique-premium-hotel"];
  return <BranchDetailTemplate branch={branch} />;
}
