import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ROOMS_DETAIL_DATA } from "@/data/roomsDetailData";
import RoomDetailClient from "./RoomDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(ROOMS_DETAIL_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOMS_DETAIL_DATA[slug];

  if (!room) {
    return {
      title: "Chi Tiết Phòng - Mix Boutique Hotel",
    };
  }

  return {
    title: `${room.name} | Khách Sạn Tình Yêu Mix Hotel`,
    description: room.heroSubtitle,
    openGraph: {
      title: `${room.name} - Mix Boutique Hotel`,
      description: room.heroSubtitle,
      images: [room.heroImage],
    },
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const room = ROOMS_DETAIL_DATA[slug];

  if (!room) {
    notFound();
  }

  return <RoomDetailClient room={room} />;
}
