"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody, Avatar, Chip } from "@heroui/react";
import { MoreVertical, Phone, Video, Search } from "lucide-react";

type Message = {
    id: number;
    role: "lead" | "ai";
    text: string;
};

const script: Message[] = [
    { id: 1, role: "lead", text: "Oi, gostaria de agendar uma consulta de avaliacao." },
    { id: 2, role: "ai", text: "Ola! Claro. Posso sugerir horarios para amanha. Prefere manha ou tarde?" },
    { id: 3, role: "lead", text: "Pode ser a tarde." },
    { id: 4, role: "ai", text: "Perfeito. Tenho 14:30 ou 16:00. Qual fica melhor?" },
    { id: 5, role: "lead", text: "16:00 por favor." },
    { id: 6, role: "ai", text: "Agendado! Te enviei a confirmacao no WhatsApp. Ate la!" },
];

export default function LiveCRM() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [step, setStep] = useState(0);
    const [column, setColumn] = useState("new"); // new, negotiating, scheduled

    useEffect(() => {
        if (step < script.length) {
            const timeout = setTimeout(() => {
                setMessages((prev) => [...prev, script[step]]);
                setStep((prev) => prev + 1);

                // Move card logic based on script progress
                if (step === 2) setColumn("negotiating");
                if (step === 5) setColumn("scheduled");

            }, step % 2 === 0 ? 1000 : 2000); // Varied typing speed simulation
            return () => clearTimeout(timeout);
        } else {
            // Reset for loop effect
            const reset = setTimeout(() => {
                setMessages([]);
                setStep(0);
                setColumn("new");
            }, 3000);
            return () => clearTimeout(reset);
        }
    }, [step]);

    return (
        <section className="h-full w-full flex flex-col items-center justify-center p-8 relative">
            <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-8"
            >
                <Chip variant="flat" color="warning" className="mb-4">LIVE DEMO</Chip>
                <h2 className="text-3xl font-bold text-white mb-2">CRM em Tempo Real</h2>
                <p className="text-white/50">Assista a IA trabalhando enquanto você descansa.</p>
            </motion.div>

            <div className="flex w-full max-w-6xl h-[600px] gap-6">
                {/* KANBAN BOARD */}
                <div className="w-1/3 h-full flex flex-col gap-4">
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex-1 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-white/50 uppercase">Novas Conversas</span>
                            <Chip size="sm" variant="flat">12</Chip>
                        </div>
                        {/* Ghost Cards */}
                        <div className="space-y-2 opacity-30">
                            <div className="h-16 bg-white/10 rounded-lg"></div>
                            <div className="h-16 bg-white/10 rounded-lg"></div>
                        </div>

                        {/* Active Lead Card Simulation */}
                        <AnimatePresence>
                            {column === "new" && (
                                <motion.div
                                    layoutId="lead-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="h-20 bg-white/10 rounded-lg border-l-4 border-blue-500 mt-2 p-3 flex items-center gap-3"
                                >
                                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
                                    <div>
                                        <p className="text-sm font-bold text-white">Carlos Silva</p>
                                        <p className="text-xs text-white/50">Interesse: Consulta</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Other Columns (Visual only) */}
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex-1 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold uppercase" style={{ color: 'rgba(0, 229, 255, 0.5)' }}>Em Qualificacao</span>
                        </div>
                        <AnimatePresence>
                            {column === "negotiating" && (
                                <motion.div
                                    layoutId="lead-card"
                                    className="h-20 bg-white/10 rounded-lg border-l-4 p-3 flex items-center gap-3"
                                    style={{ borderLeftColor: 'var(--color-accent-tech)' }}
                                >
                                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
                                    <div>
                                        <p className="text-sm font-bold text-white">Carlos Silva</p>
                                        <p className="text-xs" style={{ color: 'var(--color-accent-tech)' }}>Respondendo...</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex-1 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold uppercase" style={{ color: 'rgba(0, 255, 148, 0.5)' }}>Agendados</span>
                        </div>
                        <AnimatePresence>
                            {column === "scheduled" && (
                                <motion.div
                                    layoutId="lead-card"
                                    className="h-20 rounded-lg border-l-4 p-3 flex items-center gap-3"
                                    style={{ backgroundColor: 'rgba(0, 255, 148, 0.2)', borderLeftColor: 'var(--color-accent-success)' }}
                                >
                                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
                                    <div>
                                        <p className="text-sm font-bold text-white">Carlos Silva</p>
                                        <p className="text-xs" style={{ color: 'var(--color-accent-success)' }}>Reunião: Amanhã 16h</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* CHAT INTERFACE */}
                <Card className="flex-2 w-2/3 h-full bg-[#111] border border-white/10">
                    <CardBody className="p-0 h-full flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                            <div className="flex items-center gap-3">
                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <div>
                                    <p className="font-bold text-white">Carlos Silva</p>
                                    <p className="text-xs flex items-center gap-1" style={{ color: 'var(--color-accent-success)' }}>
                                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent-success)' }} /> Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 text-white/40">
                                <Phone size={20} />
                                <Video size={20} />
                                <Search size={20} />
                                <MoreVertical size={20} />
                            </div>
                        </div>

                        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.role === 'ai' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'ai' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] p-4 rounded-2xl ${msg.role === 'ai'
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : 'bg-white/10 text-white rounded-tl-none'
                                        }`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <span className="text-[10px] opacity-50 block mt-1 text-right">
                                            Agora
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                            {step % 2 !== 0 && step < script.length && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-white/5 bg-white/5">
                            <div className="h-10 bg-black/20 rounded-lg border border-white/10 flex items-center px-4 text-white/30 text-sm">
                                IA está respondendo...
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}
