"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProposalStore } from "@/store/useProposalStore";
import { Button } from "@heroui/react";
import { Sparkles } from "lucide-react";

export default function IntroGate() {
    const { isIntroComplete, completeIntro } = useProposalStore();

    return (
        <AnimatePresence>
            {!isIntroComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center space-y-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase">
                            The Glass Journey
                        </h1>
                        <p className="text-white/60 text-sm tracking-[0.2em] uppercase">
                            Convert.AI Proposal
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                variant="primary"
                                onPress={completeIntro}
                                className="bg-white text-black font-semibold tracking-wide px-12 py-8 text-lg rounded-none border border-white/20 hover:bg-white/90"
                            >
                                INICIAR EXPERIÊNCIA
                                <Sparkles size={20} />
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
