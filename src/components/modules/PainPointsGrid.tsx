"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, Activity } from "lucide-react";
import { Card, CardHeader, CardBody, Chip, Tooltip } from "@heroui/react";

const painPoints = [
    {
        id: 1,
        title: "Leads Esfriando",
        desc: "60% dos leads desistem se não atendidos em 5 min.",
        icon: <Clock className="w-6 h-6 text-orange-400" />,
        stat: "-40% Conversão",
        tooltip: "Tempo médio de resposta atual: 4h"
    },
    {
        id: 2,
        title: "Custo Operacional",
        desc: "SDRs humanos custam caro e escalam mal.",
        icon: <DollarSign className="w-6 h-6 text-red-400" />,
        stat: "R$ 4k/SDR",
        tooltip: "Custo aumenta linearmente com a demanda"
    },
    {
        id: 3,
        title: "Atendimento 8h/5",
        desc: "Seu cliente quer comprar sábado à noite.",
        icon: <Activity className="w-6 h-6 text-purple-400" />,
        stat: "Perda de Oportunidades",
        tooltip: "70% do tráfego ocorre fora do horário comercial"
    }
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
