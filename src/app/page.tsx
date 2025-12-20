"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import IntroGate from "@/components/modules/IntroGate";
import PainPointsGrid from "@/components/modules/PainPointsGrid";
import EcosystemOrbit from "@/components/modules/EcosystemOrbit";
import DashboardPreview from "@/components/modules/DashboardPreview";
import BeforeAfterSlider from "@/components/modules/BeforeAfterSlider";
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

// Avoid SSR for ROICalculator due to hydration mismatch in some environments.
const ROICalculator = dynamic(() => import("@/components/modules/ROICalculator"), {
  ssr: false,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const setActiveSlide = useProposalStore((state) => state.setActiveSlide);
  const activeSlide = useProposalStore((state) => state.activeSlide);
  const isIntroComplete = useProposalStore((state) => state.isIntroComplete);

  const slides = [
    { id: "diagnosis", label: "Diagnóstico", element: <PainPointsGrid /> },
    { id: "opportunity", label: "Oportunidade", element: <BeforeAfterSlider /> },
    { id: "solution", label: "Solução", element: <EcosystemOrbit /> },
    { id: "dashboard", label: "Dashboard", element: <DashboardPreview /> },
    { id: "demo", label: "Demo ao vivo", element: <LiveCRM /> },
    { id: "roi", label: "ROI", element: <ROICalculator /> },
    { id: "implementation", label: "Implementação", element: <ImplementationPlan /> },
    { id: "pricing", label: "Oferta", element: <OfferPricing /> },
    { id: "compliance", label: "Compliance", element: <ComplianceAssumptions /> },
    { id: "proof", label: "Prova", element: <ProofWall /> },
    { id: "next", label: "Próximos passos", element: <NextSteps /> },
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

    // Calculate active slide
    const slideWidth = containerRef.current.offsetWidth;
    const currentScrollLeft = containerRef.current.scrollLeft;
    const activeIndex = Math.max(
      0,
      Math.min(slides.length - 1, Math.round(currentScrollLeft / slideWidth))
    );
    setActiveSlide(activeIndex);
  }, [setActiveSlide, slides.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      if (!isIntroComplete) return;
      if (event.ctrlKey || event.metaKey) return;
      if (document.querySelector('[role="dialog"]')) return;

      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-allow-vertical-scroll]")) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (delta === 0) return;

      container.scrollLeft += delta;
      event.preventDefault();
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [isIntroComplete]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isIntroComplete) return;
      if (document.querySelector('[role="dialog"]')) return;

      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT"
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(activeSlide - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(activeSlide + 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        scrollToIndex(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        scrollToIndex(slides.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSlide, isIntroComplete, scrollToIndex, slides.length]);

  return (
    <main className="h-screen w-screen bg-[#02040A] text-white relative overflow-hidden">
      <IntroGate />

      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <Scene />
      </div>
      <div className="absolute inset-0 z-[1] bg-[#02040A]/40 pointer-events-none" />

      {/* Navigation */}
      <div className="fixed top-6 left-0 right-0 z-40 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-3 bg-black/40 border border-white/10 backdrop-blur px-3 py-2 rounded-full pointer-events-auto max-w-[90vw] overflow-x-auto scrollbar-hide">
          <button
            type="button"
            onClick={() => scrollToIndex(activeSlide - 1)}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white/70 disabled:cursor-not-allowed"
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
                aria-current={activeSlide === index ? "true" : undefined}
              />
            ))}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/60 hidden md:block">
            {activeSlide + 1}/{slides.length} - {slides[activeSlide]?.label}
          </div>
          <button
            type="button"
            onClick={() => scrollToIndex(activeSlide + 1)}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white/70 disabled:cursor-not-allowed"
            aria-label="Próximo slide"
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
        style={{ scrollBehavior: "smooth" }}
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
