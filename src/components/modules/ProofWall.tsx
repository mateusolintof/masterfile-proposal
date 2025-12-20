"use client";

import { Card, CardBody } from "@heroui/react";
import SlideShell from "@/components/ui/SlideShell";

const proofs = [
    {
        title: "Clínica Alpha",
        segment: "Dermato",
        metrics: ["+31% conversão", "SLA 52s", "No-show -9 p.p."],
        quote: "Centralizamos o atendimento e o time ganhou previsibilidade.",
    },
    {
        title: "Rede Beta",
        segment: "Odonto",
        metrics: ["45s resposta", "+22% pipeline", "ROI 4,2x"],
        quote: "O fluxo com IA virou nosso padrão de escala.",
    },
    {
        title: "Operação Gamma",
        segment: "Clínica popular",
        metrics: ["R$ 220.000/mês", "Conversão 12,8%", "SLA 38s"],
        quote: "As confirmações reduziram o no-show em semanas.",
    },
];

export default function ProofWall() {
    return (
        <SlideShell
            eyebrow="Prova"
            chipColor="success"
            title="Credibilidade com casos reais"
            subtitle="Cases e depoimentos para reforçar confiança antes da decisão."
            size="compact"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {proofs.map((proof) => (
                    <Card key={proof.title} className="bg-white/5 border border-white/10 backdrop-blur-md">
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between text-xs text-white/40 uppercase tracking-widest">
                                <span>{proof.title}</span>
                                <span>{proof.segment}</span>
                            </div>
                            <div className="mt-4 space-y-2 text-white/80 text-sm">
                                {proof.metrics.map((metric) => (
                                    <div key={metric} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94]" />
                                        {metric}
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/60 mt-4 text-sm">&quot;{proof.quote}&quot;</p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </SlideShell>
    );
}
