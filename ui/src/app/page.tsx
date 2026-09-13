"use client";

import React, { useState } from "react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileActionBar from "@/components/floating/MobileActionBar";
import ContactModal from "@/components/floating/ContactModal";

import HeroSection from "@/components/sections/HeroSection";
import RealPhotosSection from "@/components/sections/RealPhotosSection";
import VideoSection from "@/components/sections/VideoSection";
import ConceptRoomsSection from "@/components/sections/ConceptRoomsSection";
import BranchesSection from "@/components/sections/BranchesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import PricingSection from "@/components/sections/PricingSection";
import EventsSection from "@/components/sections/EventsSection";
import BookingStepsSection from "@/components/sections/BookingStepsSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contactType, setContactType] = useState<"phone" | "zalo" | "messenger" | "sms" | "booking">("zalo");
  const [activeRoomTitle, setActiveRoomTitle] = useState<string | undefined>(undefined);

  const openContact = (
    type: "phone" | "zalo" | "messenger" | "sms" | "booking" = "zalo",
    roomTitle?: string
  ) => {
    setContactType(type);
    setActiveRoomTitle(roomTitle);
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0f0f12] text-white selection:bg-[#c5a880] selection:text-black font-body">
      {/* Navigation Headers */}
      <DesktopHeader onOpenBooking={() => openContact("booking")} />
      <MobileHeader onOpenBooking={() => openContact("booking")} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Banner with Quick Stats & Booking Form */}
        <HeroSection onOpenContact={(type) => openContact(type)} />

        {/* 2. Real Photos Grid & Featured Room Stage */}
        <RealPhotosSection onSelectPhoto={(title) => openContact("zalo", `Ảnh concept: ${title}`)} />

        {/* 3. Video Shorts & Channel Showcase */}
        <VideoSection onOpenZalo={() => openContact("zalo", "Xem video phòng")} />

        {/* 4. Highlighted Concept Rooms with Detailed Features */}
        <ConceptRoomsSection onAskRoom={(roomName) => openContact("phone", roomName)} />

        {/* 5. 3 Hanoi Branches & Direct Location Contacts */}
        <BranchesSection onSelectBranch={(branch) => openContact("phone", branch.name)} />

        {/* 6. Why Choose Mix (Core Value Propositions) */}
        <WhyChooseUsSection />

        {/* 7. Transparent Pricing Matrix (Superior, Deluxe, VIP) */}
        <PricingSection onAskTier={(tier) => openContact("zalo", tier)} />

        {/* 8. Romantic Event Setup & Decoration Packages */}
        <EventsSection onOpenConsult={() => openContact("zalo", "Gói trang trí sự kiện")} />

        {/* 9. 3-Step Simple Booking Flow */}
        <BookingStepsSection />

        {/* 10. Frequently Asked Questions (FAQ Accordion) */}
        <FaqSection />

        {/* 11. Final Re-engagement Call-to-Action */}
        <FinalCtaSection onOpenContact={(type) => openContact(type)} />

        {/* 12. Full Agency-Standard Footer */}
        <FooterSection />
      </main>

      {/* Floating & Sticky Contact Controls */}
      <DesktopContactBar onOpenContact={(type) => openContact(type)} />
      <MobileActionBar onOpenContact={(type) => openContact(type)} />

      {/* Interactive Branch Selection Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        contactType={contactType}
        roomTitle={activeRoomTitle}
      />
    </div>
  );
}
