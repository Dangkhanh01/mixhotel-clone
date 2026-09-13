"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Eye } from "lucide-react";
import type { RoomConcept } from "@/types/mixhotel";

interface ConceptRoomsSectionProps {
  onAskRoom: (roomTitle: string) => void;
}

const conceptRooms: RoomConcept[] = [
  {
    id: "karma",
    roomNumber: "01",
    name: "Room 302 - Karma",
    subtitle: "Boutique room",
    tags: ["Smart Tivi có Netflix", "Giường tròn", "Cosplay"],
    description:
      "Karma được thiết kế theo phong cách gợi cảm và huyền bí, với tông màu đỏ nóng bỏng làm chủ đạo. Điểm nhấn độc đáo của căn phòng là những bức tranh Kamasutra được sắp xếp dọc theo bức tường phía đầu giường và trên trần nhà, tạo nên một không gian đầy tính nghệ thuật và kích thích. Chiếc giường tròn lớn màu trắng tinh khôi tương phản nổi bật với tông đỏ của căn phòng. Các chi tiết trang trí như đèn chùm pha lê và gương phản chiếu khắp nơi càng làm tăng thêm vẻ sang trọng và lãng mạn.",
    mainImage: "/images/room-302-karma.jpg",
    thumbnails: ["/images/karma-thumb-1.webp", "/images/karma-thumb-2.webp"],
    badgeNumber: "01",
  },
  {
    id: "katana",
    roomNumber: "02",
    name: "VIP Room 401 - Katana",
    subtitle: "Boutique room",
    tags: ["Ghế tình yêu", "Bồn tắm", "Smart Tivi có Netflix", "Dụng cụ BDSM", "Cosplay"],
    description:
      "Katana được thiết kế theo phong cách Nhật Bản truyền thống nhưng cũng không kém phần hiện đại và lãng mạn. Căn phòng lấy tông màu đỏ đậm và đen làm chủ đạo, tạo nên một không gian ấm cúng và gợi cảm. Điểm nhấn là bức tranh Geisha lớn phía đầu giường và những chiếc đèn lồng đỏ trắng đặc trưng, gợi nhớ văn hóa xứ Phù Tang. Chiếc giường thấp theo kiểu Nhật, kết hợp với các chi tiết trang trí như những tấm gỗ ghép hay biểu tượng chữ X phát sáng, tạo nên một sự hòa quyện độc đáo giữa truyền thống và hiện đại.",
    mainImage: "/images/room-401-katana.jpg",
    thumbnails: ["/images/katana-thumb-1.webp", "/images/katana-thumb-2.jpg"],
    badgeNumber: "02",
  },
  {
    id: "amora",
    roomNumber: "03",
    name: "Room 402 - Amora",
    subtitle: "Boutique room",
    tags: ["Cosplay", "Trần sao lung linh", "Cửa kính thiên nhiên"],
    description:
      "Amora mang đến một không gian lãng mạn và gần gũi với thiên nhiên. Căn phòng được thiết kế theo phong cách ấm áp, với trần nhà bằng gỗ và những dây đèn lấp lánh như bầu trời sao, tạo cảm giác thư giãn và mơ mộng. Điểm độc đáo của phòng là chiếc cửa kính lớn nhìn ra một khu vườn nhỏ với những viên đá và cây xanh, mang thiên nhiên vào trong không gian riêng tư. Nội thất tối giản với chiếc giường lớn tạo nên một không gian thoáng đãng và tinh tế.",
    mainImage: "/images/room-402-amora.jpg",
    thumbnails: ["/images/amora-thumb-1.webp", "/images/amora-thumb-2.webp"],
    badgeNumber: "03",
  },
  {
    id: "cloud-nine",
    roomNumber: "04",
    name: "VIP Room 469 - Cloud Nine",
    subtitle: "Boutique room",
    tags: ["Bồn tắm Jacuzzi", "Máy chiếu phim", "Cosplay"],
    description:
      "Cloud Nine mang đến một không gian lãng mạn và hiện đại, lấy cảm hứng từ bầu trời đêm đầy sao. Căn phòng được thiết kế với trần nhà ốp gỗ và trang trí bằng hàng trăm chiếc đèn nhỏ lấp lánh, tạo cảm giác như đang nằm dưới dải ngân hà. Điểm đặc biệt của phòng là một chiếc bồn tắm lớn đặt ngay trong không gian mở, đối diện với giường ngủ. Ngoài ra, chiếc máy chiếu lớn với màn hình chiếu cực rộng mang lại trải nghiệm xem phim chân thực như rạp chiếu phim ngay trong phòng.",
    mainImage: "/images/room-469-cloudnine.jpg",
    thumbnails: [
      "/images/cloudnine-thumb-1.webp",
      "/images/cloudnine-thumb-2.webp",
      "/images/cloudnine-thumb-3.jpg",
    ],
    badgeNumber: "04",
  },
];

export default function ConceptRoomsSection({ onAskRoom }: ConceptRoomsSectionProps) {
  const [selectedImage, setSelectedImage] = useState<{ [key: string]: string }>({
    karma: "/images/room-302-karma.jpg",
    katana: "/images/room-401-katana.jpg",
    amora: "/images/room-402-amora.jpg",
    "cloud-nine": "/images/room-469-cloudnine.jpg",
  });

  const handleThumbClick = (roomId: string, img: string) => {
    setSelectedImage((prev) => ({ ...prev, [roomId]: img }));
  };

  return (
    <section id="concept" className="py-20 md:py-28 bg-[#121216] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#c5a880]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#c92a2a]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Head */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] font-semibold">
            Concept phòng nổi bật
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            Lãng mạn và huyền bí
          </h2>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            Mỗi căn phòng là một concept riêng biệt, được thiết kế để biến mọi khoảnh khắc hẹn hò trở nên thăng hoa và đáng nhớ.
          </p>
        </div>

        {/* Room Articles Stack */}
        <div className="space-y-14">
          {conceptRooms.map((room, idx) => (
            <article
              key={room.id}
              className="rounded-2xl bg-[#17171c]/95 border border-[#2b2b36] overflow-hidden shadow-2xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Info Column */}
                <div className={`lg:col-span-6 space-y-5 ${idx % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span>Concept riêng tư</span>
                      <span>•</span>
                      <strong className="text-[#c5a880] font-semibold">Mix Boutique Hotel</strong>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight">
                      {room.name}
                    </h3>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {room.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#24242d] border border-zinc-700/60 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Copy */}
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed text-justify">
                    {room.description}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => onAskRoom(room.name)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#c5a880] to-[#dfc299] text-black font-semibold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 fill-current" />
                      <span>Hỏi phòng {room.name}</span>
                    </button>

                    <button
                      onClick={() => onAskRoom(room.name)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem ảnh & Tư vấn</span>
                    </button>
                  </div>
                </div>

                {/* Right Visual Column */}
                <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                  {/* Main Large Image */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800 shadow-xl group">
                    <Image
                      src={selectedImage[room.id] || room.mainImage}
                      alt={room.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Room Number Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/65 backdrop-blur-md border border-zinc-700/60 flex items-center gap-2">
                      <span className="text-xs font-mono text-[#c5a880] font-bold">
                        {room.badgeNumber}
                      </span>
                      <span className="text-[11px] text-zinc-300 uppercase font-semibold tracking-wider">
                        {room.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleThumbClick(room.id, room.mainImage)}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImage[room.id] === room.mainImage
                          ? "border-[#c5a880] scale-105"
                          : "border-zinc-800 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={room.mainImage} alt="Main" fill className="object-cover" />
                    </button>

                    {room.thumbnails.map((thumb, tIdx) => (
                      <button
                        key={tIdx}
                        onClick={() => handleThumbClick(room.id, thumb)}
                        className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedImage[room.id] === thumb
                            ? "border-[#c5a880] scale-105"
                            : "border-zinc-800 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image src={thumb} alt={`Thumb ${tIdx}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
