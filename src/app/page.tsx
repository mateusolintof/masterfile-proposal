"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import IntroGate from "@/components/modules/IntroGate";
import CoverSummary from "@/components/modules/CoverSummary";
import PainPointsGrid from "@/components/modules/PainPointsGrid";
import EcosystemOrbit from "@/components/modules/EcosystemOrbit";
import AIWorkflow from "@/components/modules/AIWorkflow";
import DashboardPreview from "@/components/modules/DashboardPreview";
import BeforeAfterSlider from "@/components/modules/BeforeAfterSlider";
import ROICalculator from "@/components/modules/ROICalculator";
import LiveCRM from "@/components/modules/LiveCRM";
import ImplementationPlan from "@/components/modules/ImplementationPlan";
import OfferPricing from "@/components/modules/OfferPricing";
import ComplianceAssumptions from "@/components/modules/ComplianceAssumptions";
import ProofWall from "@/components/modules/ProofWall";
import NextSteps from "@/components/modules/NextSteps";
import { useProposalStore } from "@/store/useProposalStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dynamically import Scene with no SSR
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollLeft = useRef(0);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const setScrollSpeed = useProposalStore((state) => state.setScrollSpeed);
  const setActiveSlide = useProposalStore((state) => state.setActiveSlide);
  const activeSlide = useProposalStore((state) => state.activeSlide);

  const slides = [
    { id: "cover", label: "Resumo", element: <CoverSummary /> },
    { id: "diagnosis", label: "Diagnostico", element: <PainPointsGrid /> },
    { id: "opportunity", label: "Oportunidade", element: <BeforeAfterSlider /> },
    { id: "solution", label: "Solucao", element: <EcosystemOrbit /> },
    { id: "workflow", label: "Workflow", element: <AIWorkflow /> },
    { id: "dashboard", label: "Dashboard", element: <DashboardPreview /> },
    { id: "demo", label: "Live Demo", element: <LiveCRM /> },
    { id: "roi", label: "ROI", element: <ROICalculator /> },
    { id: "implementation", label: "Implementacao", element: <ImplementationPlan /> },
    { id: "pricing", label: "Oferta", element: <OfferPricing /> },
    { id: "compliance", label: "Compliance", element: <ComplianceAssumptions /> },
    { id: "proof", label: "Prova", element: <ProofWall /> },
    { id: "next", label: "Next Steps", element: <NextSteps /> },
  ];

  const scrollToIndex = useCallback((index: number) => {
    if (!containerRef.current) return;
    const slideWidth = containerRef.current.offsetWidth;
    const clampedIndex = Math.max(0, Math.min(slides.length - 1, index));
    containerRef.current.scrollTo({
      left: slideWidth * clampedIndex,
      behavior: "smooth",
    });
  }, [slides.length]);

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
    <main className="h-screen w-screen bg-[#02040A] text-white relative overflow-hidden">
      <IntroGate />

      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <Scene />
      </div>

      {/* Navigation */}
      <div className="fixed top-6 left-0 right-0 z-40 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-4 bg-black/40 border border-white/10 backdrop-blur px-4 py-2 rounded-full pointer-events-auto">
          <button
            type="button"
            onClick={() => scrollToIndex(activeSlide - 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Slide anterior"
            disabled={activeSlide === 0}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition ${activeSlide === index
                  ? "bg-[#00FF94]"
                  : "bg-white/30 hover:bg-white/60"
                  }`}
                aria-label={`Ir para ${slide.label}`}
              />
            ))}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/60">
            {activeSlide + 1}/{slides.length} - {slides[activeSlide]?.label}
          </div>
          <button
            type="button"
            onClick={() => scrollToIndex(activeSlide + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Proximo slide"
            disabled={activeSlide === slides.length - 1}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex flex-row h-full w-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory relative z-10 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="flex-shrink-0 w-screen h-full snap-center">
            {slide.element}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E5FF] to-[#00FF94] origin-left z-40"
        style={{ scaleX: scrollXProgress }}
      />
    </main>
  );
}
