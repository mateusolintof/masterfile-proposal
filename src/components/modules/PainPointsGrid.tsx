"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, Activity } from "lucide-react";
import { Card, CardHeader, CardBody, Chip, Tooltip } from "@heroui/react";

const painPoints = [
    {
        id: 1,
        title: "Leads Esfriando",
        desc: "Boa parte dos contatos abandona quando a resposta passa de 5 min.",
        icon: <Clock className="w-6 h-6 text-orange-400" />,
        stat: "-38% Conversao",
        tooltip: "Tempo medio de resposta atual: 3h12m"
    },
    {
        id: 2,
        title: "Custo Operacional",
        desc: "Equipe humana escala linearmente e pressiona margem.",
        icon: <DollarSign className="w-6 h-6 text-red-400" />,
        stat: "R$ 4k/SDR",
        tooltip: "Custos sobem conforme a demanda de leads"
    },
    {
        id: 3,
        title: "Atendimento Limitado",
        desc: "Pacientes pesquisam e decidem fora do horario comercial.",
        icon: <Activity className="w-6 h-6 text-amber-400" />,
        stat: "Janelas Perdidas",
        tooltip: "52% dos acessos fora do horario comercial"
    }
];

const baselineMetrics = [
    { label: "Resposta media", value: "3h12m" },
    { label: "Conversao atual", value: "7,8%" },
    { label: "No-show", value: "18%" },
];

export default function PainPointsGrid() {
    return (
        <section className="h-full w-full flex flex-col items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-12"
            >
                <Chip variant="flat" color="danger" className="mb-4">DIAGNÓSTICO</Chip>
                <h2 className="text-4xl font-bold text-white mb-4">O Problema da Escala</h2>
                <p className="text-white/60 max-w-lg mx-auto">
                    Escalar vendas com humanos é linear e custoso. A tecnologia rompe essa barreira.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl w-full mb-8">
                {baselineMetrics.map((metric) => (
                    <div key={metric.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-xs uppercase tracking-widest text-white/40">{metric.label}</p>
                        <p className="text-2xl font-semibold text-white mt-2">{metric.value}</p>
                    </div>
                ))}
            </div>
            <div className="max-w-6xl w-full mb-8">
                <div className="bg-white/5 border border-red-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-red-300/70">Custo do atraso</p>
                        <p className="text-white/80 text-sm">Estimativa de receita perdida por demora no atendimento.</p>
                    </div>
                    <p className="text-2xl font-semibold text-red-300">R$ 48.000/mes</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
                {painPoints.map((point, index) => (
                    <motion.div
                        key={point.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Tooltip content={point.tooltip} className="max-w-xs">
                            <div className="h-full">
                                <Card className="h-full bg-white/5 border border-white/10 hover:border-red-500/50 transition-colors p-6 cursor-help">
                                    <CardHeader className="flex gap-4 pb-4">
                                        <div className="p-3 bg-white/5 rounded-lg">
                                            {point.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{point.title}</h3>
                                            <p className="text-xs text-red-400 font-mono">{point.stat}</p>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="text-white/60 leading-relaxed">
                                            {point.desc}
                                        </p>
                                    </CardBody>
                                </Card>
                            </div>
                        </Tooltip>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
