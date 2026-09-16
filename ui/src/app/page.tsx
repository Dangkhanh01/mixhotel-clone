"use client";

import React from "react";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import DesktopContactBar from "@/components/floating/DesktopContactBar";
import MobileActionBar from "@/components/floating/MobileActionBar";

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
  return (
    <div className="relative min-h-screen bg-[#0f0f12] text-white selection:bg-[#c5a880] selection:text-black">
      {/* Navigation Headers */}
      <DesktopHeader />
      <MobileHeader />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Banner with Quick Stats & Booking Form */}
        <HeroSection />

        {/* 2. Real Photos Grid & Featured Room Stage */}
        <RealPhotosSection />

        {/* 3. Video Shorts & Channel Showcase */}
        <VideoSection />

        {/* 4. Highlighted Concept Rooms with Detailed Features */}
        <ConceptRoomsSection />

        {/* 5. 3 Hanoi Branches & Direct Location Contacts */}
        <BranchesSection />

        {/* 6. Why Choose Mix (Core Value Propositions) */}
        <WhyChooseUsSection />

        {/* 7. Transparent Pricing Matrix (Superior, Deluxe, VIP) */}
        <PricingSection />

        {/* 8. Romantic Event Setup & Decoration Packages */}
        <EventsSection />

        {/* 9. 3-Step Simple Booking Flow */}
        <BookingStepsSection />

        {/* 10. Frequently Asked Questions (FAQ Accordion) */}
        <FaqSection />

        {/* 11. Final Re-engagement Call-to-Action */}
        <FinalCtaSection />

        {/* 12. Full Agency-Standard Footer */}
        <FooterSection />
      </main>

      {/* Floating & Sticky Contact Controls */}
      <DesktopContactBar />
      <MobileActionBar />
    </div>
  );
}
