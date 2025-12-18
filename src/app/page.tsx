"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import IntroGate from "@/components/modules/IntroGate";
import PainPointsGrid from "@/components/modules/PainPointsGrid";
import EcosystemOrbit from "@/components/modules/EcosystemOrbit";
import BeforeAfterSlider from "@/components/modules/BeforeAfterSlider";
import ROICalculator from "@/components/modules/ROICalculator";
import LiveCRM from "@/components/modules/LiveCRM";
import TimelineScroller from "@/components/modules/TimelineScroller";

// Dynamically import Scene with no SSR
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  return (
    <main className="h-screen w-screen bg-black text-white relative overflow-hidden">
      <IntroGate />

      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <Scene />
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex flex-row h-full w-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory relative z-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex-shrink-0 w-screen h-full snap-center"><PainPointsGrid /></div>
        <div className="flex-shrink-0 w-screen h-full snap-center"><EcosystemOrbit /></div>
        <div className="flex-shrink-0 w-screen h-full snap-center"><BeforeAfterSlider /></div>
        <div className="flex-shrink-0 w-screen h-full snap-center"><ROICalculator /></div>
        <div className="flex-shrink-0 w-screen h-full snap-center"><LiveCRM /></div>
        <div className="flex-shrink-0 w-screen h-full snap-center"><TimelineScroller /></div>
      </div>

      {/* Progress Bar (Optional Visual Indicator) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-40"
        style={{ scaleX: scrollXProgress }}
      />
    </main>
  );
}
