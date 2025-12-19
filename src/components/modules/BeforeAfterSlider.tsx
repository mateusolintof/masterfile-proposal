"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { GripVertical } from "lucide-react";
import { Chip } from "@heroui/react";

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

    // Map x to percentage string for clip-path
    const clipPath = useTransform(x, [0, width], ["inset(0 100% 0 0)", "inset(0 0 0 0)"]);

    const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, _info: PanInfo) => {
        // Constraints handled by framer-motion dragConstraints
    };

    return (
        <section className="h-full w-full flex flex-col items-center justify-center p-8 relative">
            <Chip variant="flat" color="warning" className="mb-4">TRANSFORMAÇÃO</Chip>
            <h2 className="text-4xl font-bold text-white mb-12 z-10">O Fim do Trabalho Manual</h2>

            <div ref={containerRef} className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10">
                {/* "BEFORE" Image/Content (Background) */}
                <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center grayscale">
                    <div className="grid grid-cols-2 w-full h-full p-12 gap-8 opacity-50">
                        <div className="space-y-4">
                            <div className="h-8 w-3/4 bg-white/10 rounded animate-pulse" />
                            <div className="h-4 w-full bg-white/10 rounded" />
                            <div className="h-4 w-5/6 bg-white/10 rounded" />
                            <div className="h-32 w-full bg-white/5 rounded border border-white/10 p-4 font-mono text-xs text-red-400">
                                [ERROR] Lead perdu...
                                <br />
                                [TIMEOUT] Response &gt; 4h
                                <br />
                                [MANUAL] Spreadsheet.xls
                            </div>
                        </div>
                        <div className="flex items-center justify-center border border-dashed border-white/20 rounded-xl">
                            <span className="text-4xl font-bold text-white/20">MANUAL</span>
                        </div>
                    </div>
                </div>

                {/* "AFTER" Image/Content (Foreground - Clipped) */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ clipPath, background: 'linear-gradient(to bottom right, rgba(0, 80, 100, 0.8), rgba(0, 40, 80, 0.8))' }}
                >
                    <div className="grid grid-cols-2 w-full h-full p-12 gap-8">
                        <div className="space-y-4">
                            <div className="h-8 w-3/4 rounded" style={{ backgroundColor: 'rgba(0, 229, 255, 0.2)' }} />
                            <div className="h-4 w-full rounded" style={{ backgroundColor: 'rgba(0, 229, 255, 0.1)' }} />
                            <div className="h-4 w-5/6 rounded" style={{ backgroundColor: 'rgba(0, 229, 255, 0.1)' }} />
                            <div className="h-32 w-full rounded p-4 font-mono text-xs shadow-[0_0_30px_rgba(0,229,255,0.1)]" style={{ backgroundColor: 'rgba(0, 50, 80, 0.5)', border: '1px solid rgba(0, 229, 255, 0.3)', color: 'var(--color-accent-tech)' }}>
                                [SUCCESS] Lead qualified
                                <br />
                                [INSTANT] Response: 500ms
                                <br />
                                [AUTO] CRM Updated
                            </div>
                        </div>
                        <div className="flex items-center justify-center rounded-xl backdrop-blur-sm" style={{ border: '1px solid rgba(0, 229, 255, 0.5)', backgroundColor: 'rgba(0, 229, 255, 0.05)' }}>
                            <span className="text-4xl font-bold drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" style={{ color: 'var(--color-accent-tech)' }}>AUTOMÁTICO</span>
                        </div>
                    </div>
                </motion.div>

                {/* Drag Handle */}
                <motion.div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center"
                    style={{ x }}
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDrag={handleDrag}
                >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2">
                        <GripVertical className="text-black w-5 h-5" />
                    </div>
                </motion.div>

                {/* Labels */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-black/50 backdrop-blur rounded text-xs font-bold text-white/50 border border-white/10 pointer-events-none">
                    ANTES
                </div>
                <div className="absolute top-6 right-6 px-3 py-1 backdrop-blur rounded text-xs font-bold pointer-events-none" style={{ backgroundColor: 'rgba(0, 229, 255, 0.2)', color: 'var(--color-accent-tech)', border: '1px solid rgba(0, 229, 255, 0.3)' }}>
                    DEPOIS
                </div>
            </div>
        </section>
    );
}
