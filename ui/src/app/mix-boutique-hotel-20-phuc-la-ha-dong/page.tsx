import React from "react";
import { Metadata } from "next";
import BranchDetailTemplate from "@/components/branch/BranchDetailTemplate";
import { BRANCH_FULL_DATA } from "@/data/branchFullData";

export const metadata: Metadata = {
  title: "Mix Boutique Hotel 20 Phúc La Hà Đông | Khách Sạn Tình Yêu Hà Đông",
  description: "Cơ sở Mix Boutique Hotel 20 Phúc La, Hà Đông với 11 phòng concept độc đáo, bồn tắm đôi, ghế Tantra, máy chiếu Full HD, kín đáo và tiện nghi.",
};

export default function MixBoutiquePhucLaPage() {
  const branch = BRANCH_FULL_DATA["mix-boutique-hotel-20-phuc-la-ha-dong"];
  return <BranchDetailTemplate branch={branch} />;
}
