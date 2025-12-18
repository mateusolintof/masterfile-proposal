"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { GripVertical } from "lucide-react";
import { Chip } from "@heroui/react";

export default function BeforeAfterSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0); // 0 to containerWidth
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const w = containerRef.current.offsetWidth;
            setWidth(w);
            x.set(w / 2); // Start in middle
        }
    }, []);

    // Map x to percentage string for clip-path
    const clipPath = useTransform(x, [0, width], ["inset(0 100% 0 0)", "inset(0 0 0 0)"]);

    const handleDrag = (_: any, info: any) => {
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
                    className="absolute inset-0 bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center"
                    style={{ clipPath }}
                >
                    <div className="grid grid-cols-2 w-full h-full p-12 gap-8">
                        <div className="space-y-4">
                            <div className="h-8 w-3/4 bg-cyan-400/20 rounded" />
                            <div className="h-4 w-full bg-cyan-400/10 rounded" />
                            <div className="h-4 w-5/6 bg-cyan-400/10 rounded" />
                            <div className="h-32 w-full bg-cyan-950/50 rounded border border-cyan-500/30 p-4 font-mono text-xs text-cyan-300 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
                                [SUCCESS] Lead qualified
                                <br />
                                [INSTANT] Response: 500ms
                                <br />
                                [AUTO] CRM Updated
                            </div>
                        </div>
                        <div className="flex items-center justify-center border border-cyan-500/50 bg-cyan-500/5 rounded-xl backdrop-blur-sm">
                            <span className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">AUTOMÁTICO</span>
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
                <div className="absolute top-6 right-6 px-3 py-1 bg-cyan-500/20 backdrop-blur rounded text-xs font-bold text-cyan-400 border border-cyan-500/30 pointer-events-none">
                    DEPOIS
                </div>
            </div>
        </section>
    );
}
