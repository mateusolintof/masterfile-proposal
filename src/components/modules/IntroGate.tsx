"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProposalStore } from "@/store/useProposalStore";
import { Button, Card, CardBody } from "@heroui/react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const objectives = [
    "Atendimento imediato (< 1min)",
    "Qualificação automática de convênios",
    "Redução da taxa de No-Show",
];

const execSummary = [
    { label: "Escopo", value: "Agentes IA + CRM + Integrações" },
    { label: "ROI estimado", value: "3-5x em 90 dias" },
    { label: "Timeline", value: "Go-Live em 3 semanas" },
];

export default function IntroGate() {
    const { isIntroComplete, completeIntro } = useProposalStore();

    return (
        <AnimatePresence>
            {!isIntroComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center text-white px-8 md:px-16 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050c12] via-[#02040A] to-[#050505]" />
                    <div className="absolute inset-0 tech-grid opacity-40" />
                    <div className="scanline" />

                    <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Badge */}
                            <div className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF]">
                                Plano de Expansão Comercial
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                Agentes Inteligentes & Gestão Unificada
                            </h1>

                            {/* Description */}
                            <p className="text-white/70 text-lg leading-relaxed">
                                Transforme 35.000 interações mensais em resultados.
                                Uma solução integrada que combina IA conversacional
                                com gestão de relacionamento para maximizar conversões.
                            </p>

                            {/* Divider + Meta */}
                            <div className="pt-4 border-t border-white/10">
                                <div className="flex flex-wrap gap-6 text-sm text-white/40">
                                    <span>
                                        <span className="font-medium text-white/60">CLIENTE:</span> CM Remédios
                                    </span>
                                    <span>
                                        <span className="font-medium text-white/60">VALIDADE:</span> 30 dias
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Glass Card */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <Card
                                className="border border-white/10 bg-[#060e14]/70 backdrop-blur-xl"
                            >
                                <CardBody className="p-8 space-y-6">
                                    <h3 className="text-xl font-semibold text-white">
                                        Objetivos do Projeto
                                    </h3>

                                    {/* Checklist */}
                                    <ul className="space-y-4">
                                        {objectives.map((objective, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                                className="flex items-center gap-3 text-white/80"
                                            >
                                                <CheckCircle2
                                                    size={20}
                                                    style={{ color: "#00FF94" }}
                                                    className="flex-shrink-0"
                                                />
                                                <span>{objective}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 }}
                                        className="pt-4"
                                    >
                                        <Button
                                            size="lg"
                                            onPress={completeIntro}
                                            className="w-full font-semibold tracking-wide h-14 text-lg border border-[#00E5FF]/40 bg-[#0a1b24] text-[#E6FBFF] hover:bg-[#0f2532] shadow-[0_0_24px_rgba(0,229,255,0.25)]"
                                            endContent={<ArrowRight size={20} />}
                                        >
                                            INICIAR EXPERIÊNCIA
                                        </Button>
                                        <p className="text-xs text-white/40 text-center mt-3">
                                            Dica: use o scroll horizontal, arraste ou use as setas ←/→.
                                        </p>
                                    </motion.div>
                                </CardBody>
                            </Card>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-white/60">
                                {execSummary.map((item) => (
                                    <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <p className="uppercase tracking-widest text-white/40">{item.label}</p>
                                        <p className="text-white/80 mt-2">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
