"use client";

import { motion } from "framer-motion";
import { CheckCircle, Rocket, Calendar, ArrowRight, BrainCircuit } from "lucide-react";
import { Button, Card, CardBody, Chip } from "@heroui/react";

const steps = [
    {
        week: "Semana 1",
        title: "Setup & Integração",
        desc: "Conexão com WhatsApp Business API e configuração do ambiente CRM.",
        icon: <Calendar className="w-5 h-5" />,
        status: "done"
    },
    {
        week: "Semana 2",
        title: "Treinamento IA",
        desc: "Ingestão de PDFs, FAQs e histórico de conversas para calibrar o tom de voz.",
        icon: <BrainCircuit className="w-5 h-5" />,
        status: "current"
    },
    {
        week: "Semana 3",
        title: "Go-Live",
        desc: "Virada de chave. Acompanhamento assistido por 7 dias.",
        icon: <Rocket className="w-5 h-5" />,
        status: "upcoming"
    }
];



export default function TimelineScroller() {
    return (
        <section className="h-full w-full flex flex-row items-center justify-center p-8 gap-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

            {/* Timeline Column */}
            <div className="w-1/3 flex flex-col gap-8 z-10">
                <div className="mb-4">
                    <Chip variant="flat" color="warning" className="mb-4">ROADMAP</Chip>
                    <h2 className="text-4xl font-bold text-white">Próximos Passos</h2>
                </div>

                <div className="relative border-l border-white/10 pl-8 space-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            <div
                                className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-black ${step.status === 'current' ? 'animate-pulse' : ''}`}
                                style={{
                                    backgroundColor: step.status === 'done'
                                        ? 'var(--color-accent-success)'
                                        : step.status === 'current'
                                            ? 'var(--color-accent-tech)'
                                            : 'rgba(255, 255, 255, 0.2)'
                                }}
                            />

                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{step.week}</span>
                            <h3 className="text-xl font-bold text-white my-1">{step.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Price Card Column */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-1/3 z-10"
            >
                <Card className="bg-white/5 border border-white/20 backdrop-blur-xl shadow-[0_0_100px_rgba(255,255,255,0.05)] overflow-visible">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Chip color="success" variant="flat" className="font-bold tracking-wider">OFERTA ESPECIAL</Chip>
                    </div>
                    <CardBody className="p-8 text-center">
                        <h3 className="text-lg font-medium text-white/60 mb-2">Investimento Único</h3>
                        <div className="flex items-start justify-center gap-1 mb-6">
                            <span className="text-2xl mt-2 text-white/40">R$</span>
                            <span className="text-6xl font-bold text-white tracking-tighter">5.000</span>
                            <span className="text-xl mt-8 text-white/40">,00</span>
                        </div>

                        <ul className="text-left space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-white/80">
                                <CheckCircle size={16} style={{ color: 'var(--color-accent-success)' }} />
                                Setup CRM Completo
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <CheckCircle size={16} style={{ color: 'var(--color-accent-success)' }} />
                                Treinamento Agentes IA
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <CheckCircle size={16} style={{ color: 'var(--color-accent-success)' }} />
                                Integração WhatsApp Oficial
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <CheckCircle size={16} style={{ color: 'var(--color-accent-success)' }} />
                                Dashboard de ROI em Tempo Real
                            </li>
                        </ul>

                        <Button
                            size="lg"
                            color="primary"
                            className="w-full font-bold text-lg h-14"
                            endContent={<ArrowRight />}
                        >
                            INICIAR PROJETO
                        </Button>
                        <p className="text-xs text-white/30 mt-4">Pagamento: 50% entrada / 50% entrega.</p>
                    </CardBody>
                </Card>
            </motion.div>
        </section>
    );
}
