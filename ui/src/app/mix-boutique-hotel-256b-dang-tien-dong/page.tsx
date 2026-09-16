import React from "react";
import { Metadata } from "next";
import BranchDetailTemplate from "@/components/branch/BranchDetailTemplate";
import { BRANCH_FULL_DATA } from "@/data/branchFullData";

export const metadata: Metadata = {
  title: "Mix Boutique Hotel 256B Đặng Tiến Đông | Khách Sạn Tình Yêu Đống Đa",
  description: "Cơ sở Mix Boutique Hotel 256B Đặng Tiến Đông, quận Đống Đa với 10 phòng concept lãng mạn, ghế tình yêu Tantra, bồn tắm đôi, riêng tư 100%.",
};

export default function MixBoutiqueDangTienDongPage() {
  const branch = BRANCH_FULL_DATA["mix-boutique-hotel-256b-dang-tien-dong"];
  return <BranchDetailTemplate branch={branch} />;
}
