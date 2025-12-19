"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import IntroGate from "@/components/modules/IntroGate";
import PainPointsGrid from "@/components/modules/PainPointsGrid";
import EcosystemOrbit from "@/components/modules/EcosystemOrbit";
import BeforeAfterSlider from "@/components/modules/BeforeAfterSlider";
import ROICalculator from "@/components/modules/ROICalculator";
import LiveCRM from "@/components/modules/LiveCRM";
import TimelineScroller from "@/components/modules/TimelineScroller";
import { useProposalStore } from "@/store/useProposalStore";

// Dynamically import Scene with no SSR
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollLeft = useRef(0);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const setScrollSpeed = useProposalStore((state) => state.setScrollSpeed);
  const setActiveSlide = useProposalStore((state) => state.setActiveSlide);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const currentScrollLeft = containerRef.current.scrollLeft;
    const delta = currentScrollLeft - lastScrollLeft.current;
    const speed = Math.min(Math.abs(delta) * 0.1, 5); // Clamp speed between 0-5

    setScrollSpeed(speed);
    lastScrollLeft.current = currentScrollLeft;

    // Calculate active slide
    const slideWidth = containerRef.current.offsetWidth;
    const activeIndex = Math.round(currentScrollLeft / slideWidth);
    setActiveSlide(activeIndex);

    // Decay speed when not scrolling
    const decayInterval = setInterval(() => {
      setScrollSpeed(0);
    }, 150);

    return () => clearInterval(decayInterval);
  }, [setScrollSpeed, setActiveSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <main className="h-screen w-screen bg-[#050505] text-white relative overflow-hidden">
      <IntroGate />

      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <Scene />
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex flex-row h-full w-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory relative z-10 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex-shrink-0 w-screen h-full snap-center"><PainPointsGrid /></div>
        <div className="flex-shrink-0 w-screen h-full snap-center"><EcosystemOrbit /></div>
        <div className="flex-shrink-0 w-screen h-full snap-center"><BeforeAfterSlider /></div>
        <div className="flex-shrink-0 w-screen h-full snap-center"><ROICalculator /></div>
        <div className="flex-shrink-0 w-screen h-full snap-center"><LiveCRM /></div>
        <div className="flex-shrink-0 w-screen h-full snap-center"><TimelineScroller /></div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E5FF] to-[#00FF94] origin-left z-40"
        style={{ scaleX: scrollXProgress }}
      />
    </main>
  );
}
