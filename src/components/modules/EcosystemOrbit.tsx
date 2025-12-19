"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, LineChart, BrainCircuit } from "lucide-react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Chip
} from "@heroui/react";
import { useState } from "react";

const agents = [
    {
        id: "sdr",
        name: "Agente SDR",
        role: "Qualificação",
        icon: <MessageSquare className="w-6 h-6" />,
        color: "cyan",
        desc: "Qualifica leads em tempo real, 24/7. Responde perguntas, quebra objeções e agenda reuniões automaticamente.",
        stats: ["Tempo de Resposta: <1 min", "Taxa de Engajamento: +40%"]
    },
    {
        id: "closer",
        name: "Agente Closer",
        role: "Fechamento",
        icon: <Users className="w-6 h-6" />,
        color: "blue",
        desc: "Acompanha o lead quente até a assinatura. Envia propostas, cobra feedbacks e garante que nada esfrie.",
        stats: ["Follow-up Automático", "Recuperação de Vendas"]
    },
    {
        id: "analyst",
        name: "Agente Analyst",
        role: "Inteligência",
        icon: <LineChart className="w-6 h-6" />,
        color: "purple",
        desc: "Analisa conversas e extrai insights. Identifica padrões de objeção e sugere melhorias no script de vendas.",
        stats: ["Análise de Sentimento", "Scoring de Leads"]
    }
];

export default function EcosystemOrbit() {
    const [selectedAgent, setSelectedAgent] = useState(agents[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAgentClick = (agent: typeof agents[0]) => {
        setSelectedAgent(agent);
        setIsModalOpen(true);
    };

    return (
        <section className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Radial Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 text-center mb-16"
            >
                <Chip variant="flat" color="warning" className="mb-4">Ecosystem</Chip>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">A Nova Ordem</h2>
                <p className="text-white/60">Seu time de elite trabalhando 24/7.</p>
            </motion.div>

            {/* Orbit Container */}
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center z-10">
                {/* Center Core */}
                <div className="absolute w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.2)]">
                    <BrainCircuit className="w-10 h-10 animate-pulse" style={{ color: 'var(--color-accent-tech)' }} />
                </div>

                {/* Orbit Rings */}
                <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-16 border border-dashed border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                {/* Agents */}
                {agents.map((agent, index) => {
                    const angle = (index / agents.length) * 2 * Math.PI;
                    // Positioning on a circle
                    const radius = 180;

                    return (
                        <motion.button
                            key={agent.id}
                            className="absolute w-16 h-16 rounded-full bg-black/60 border border-white/20 hover:border-[#00E5FF] hover:scale-110 transition-all flex items-center justify-center backdrop-blur-md group"
                            style={{
                                top: `calc(50% + ${Math.sin(angle) * radius}px - 32px)`,
                                left: `calc(50% + ${Math.cos(angle) * radius}px - 32px)`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            onClick={() => handleAgentClick(agent)}
                        >
                            <div className="text-white/80 group-hover:text-[#00E5FF] transition-colors">
                                {agent.icon}
                            </div>
                            <span className="absolute -bottom-8 text-xs font-medium text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                {agent.name}
                            </span>
                        </motion.button>
                    )
                })}
            </div>

            {/* Modal Detail */}
            <Modal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                backdrop="blur"
                classNames={{
                    base: "bg-black/80 border border-white/10 text-white",
                    header: "border-b border-white/10",
                    footer: "border-t border-white/10"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-4 items-center">
                                <div className="p-2 bg-white/5 rounded-lg">
                                    {selectedAgent.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold">{selectedAgent.name}</span>
                                    <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-accent-tech)' }}>{selectedAgent.role}</span>
                                </div>
                            </ModalHeader>
                            <ModalBody className="py-6">
                                <p className="text-white/80 leading-relaxed mb-4">
                                    {selectedAgent.desc}
                                </p>
                                <div className="space-y-2">
                                    {selectedAgent.stats.map((stat, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-tech)' }} />
                                            {stat}
                                        </div>
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </section>
    );
}
