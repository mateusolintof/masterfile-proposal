"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { GripVertical } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

export default function BeforeAfterSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const [width, setWidth] = useState(0);

    const initializePosition = useCallback(() => {
        if (containerRef.current) {
            const w = containerRef.current.offsetWidth;
            setWidth(w);
            x.set(w / 2);
        }
    }, [x]);

    useEffect(() => {
        initializePosition();

        // Handle resize
        const handleResize = () => initializePosition();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [initializePosition]);

    const leftWidth = x;
    const rightWidth = useTransform(x, (value) => Math.max(0, width - value));

    return (
        <SlideShell
            eyebrow="Oportunidade"
            chipColor="warning"
            title="Comparativo do funil: atual vs IA"
            align="center"
            size="compact"
            contentClassName="flex items-center justify-center"
        >
            <div
                ref={containerRef}
                className="relative w-full max-w-5xl h-[min(60vh,520px)] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            >
                <div className="absolute inset-0 flex">
                    <motion.div
                        className="relative h-full overflow-hidden grayscale bg-neutral-900"
                        style={{ width: leftWidth }}
                    >
                        <div className="relative h-full p-6 md:p-10">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[clamp(32px,6vw,56px)] font-bold text-white/10 tracking-tight">
                                    ATUAL
                                </span>
                            </div>

                            <div className="relative z-10 max-w-[520px] space-y-4 text-left">
                                <div className="text-sm uppercase tracking-widest text-white/30">Processo atual</div>
                                <div className="text-white/70 text-sm space-y-2">
                                    <div>Resposta média: 3h12m</div>
                                    <div>Conversão: 7,8%</div>
                                    <div>No-show: 18%</div>
                                </div>
                                <div className="h-32 w-full bg-white/5 rounded border border-white/10 p-4 font-mono text-xs text-red-400">
                                    [TIMEOUT] Resposta fora da janela
                                    <br />
                                    [MANUAL] Agenda fragmentada
                                    <br />
                                    [DROP] Lead sem follow-up
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative h-full overflow-hidden bg-gradient-to-br from-[#053844]/90 to-[#04224a]/90"
                        style={{ width: rightWidth }}
                    >
                        <div className="relative h-full p-6 md:p-10 flex justify-end">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span
                                    className="text-[clamp(32px,6vw,56px)] font-bold tracking-tight drop-shadow-[0_0_14px_rgba(0,229,255,0.18)]"
                                    style={{ color: "rgba(0, 229, 255, 0.18)" }}
                                >
                                    COM IA
                                </span>
                            </div>

                            <div className="relative z-10 max-w-[520px] space-y-4 text-left">
                                <div className="text-sm uppercase tracking-widest" style={{ color: "var(--color-accent-tech)" }}>
                                    Processo com IA
                                </div>
                                <div className="text-white/80 text-sm space-y-2">
                                    <div>Resposta média: 45s</div>
                                    <div>Conversão: 12,4%</div>
                                    <div>No-show: 10%</div>
                                </div>
                                <div
                                    className="h-32 w-full rounded p-4 font-mono text-xs shadow-[0_0_30px_rgba(0,229,255,0.1)]"
                                    style={{
                                        backgroundColor: "rgba(0, 50, 80, 0.5)",
                                        border: "1px solid rgba(0, 229, 255, 0.3)",
                                        color: "var(--color-accent-tech)",
                                    }}
                                >
                                    [SUCCESS] Lead qualificado
                                    <br />
                                    [INSTANT] Resposta em 45s
                                    <br />
                                    [AUTO] CRM atualizado
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Drag Handle */}
                <motion.div
                    className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize z-20 flex items-center justify-center"
                    style={{ x }}
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0}
                    dragMomentum={false}
                >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 border border-white/10 bg-black/60 backdrop-blur">
                        <GripVertical className="text-white/80 w-5 h-5" />
                    </div>
                </motion.div>

                {/* Labels */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-black/50 backdrop-blur rounded text-xs font-bold text-white/50 border border-white/10 pointer-events-none">
                    BASE ATUAL
                </div>
                <div className="absolute top-6 right-6 px-3 py-1 backdrop-blur rounded text-xs font-bold pointer-events-none" style={{ backgroundColor: 'rgba(0, 229, 255, 0.2)', color: 'var(--color-accent-tech)', border: '1px solid rgba(0, 229, 255, 0.3)' }}>
                    COM IA
                </div>
            </div>
        </SlideShell>
    );
}
