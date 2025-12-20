"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, Activity } from "lucide-react";
import { Card, CardHeader, CardBody, Tooltip } from "@heroui/react";
import SlideShell from "@/components/ui/SlideShell";

const painPoints = [
    {
        id: 1,
        title: "Leads Esfriando",
        desc: "Boa parte dos contatos abandona quando a resposta passa de 5 min.",
        icon: <Clock className="w-6 h-6 text-orange-400" />,
        stat: "-38% Conversão",
        tooltip: "Tempo médio de resposta atual: 3h12m"
    },
    {
        id: 2,
        title: "Custo Operacional",
        desc: "Equipe humana escala linearmente e pressiona margem.",
        icon: <DollarSign className="w-6 h-6 text-red-400" />,
        stat: "R$ 4.000/SDR",
        tooltip: "Custos sobem conforme a demanda de leads"
    },
    {
        id: 3,
        title: "Atendimento Limitado",
        desc: "Pacientes pesquisam e decidem fora do horário comercial.",
        icon: <Activity className="w-6 h-6 text-amber-400" />,
        stat: "Janelas Perdidas",
        tooltip: "52% dos acessos fora do horário comercial"
    }
];

const baselineMetrics = [
    { label: "Resposta média", value: "3h12m" },
    { label: "Conversão atual", value: "7,8%" },
    { label: "No-show", value: "18%" },
];

export default function PainPointsGrid() {
    return (
        <SlideShell
            eyebrow="Diagnóstico"
            chipColor="danger"
            title="O problema da escala"
            subtitle="Escalar vendas com humanos é linear e custoso. A tecnologia rompe essa barreira."
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {baselineMetrics.map((metric) => (
                    <div key={metric.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-xs uppercase tracking-widest text-white/40">{metric.label}</p>
                        <p className="text-2xl font-semibold text-white mt-2">{metric.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 w-full">
                <div className="bg-white/5 border border-red-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-red-300/70">Custo do atraso</p>
                        <p className="text-white/80 text-sm">Estimativa de receita perdida por demora no atendimento.</p>
                    </div>
                    <p className="text-2xl font-semibold text-red-300">R$ 48.000/mês</p>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {painPoints.map((point, index) => (
                    <motion.div
                        key={point.id}
                        initial={{ opacity: 0, scale: 0.94 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
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
        </SlideShell>
    );
}
