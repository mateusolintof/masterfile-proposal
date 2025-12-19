"use client";

import { Card, CardBody, Chip } from "@heroui/react";

const proofs = [
    {
        title: "Clinica Alpha",
        segment: "Dermato",
        metrics: ["+31% conversao", "SLA 52s", "No-show -9 p.p."],
        quote: "Centralizamos o atendimento e o time ganhou previsibilidade.",
    },
    {
        title: "Rede Beta",
        segment: "Odonto",
        metrics: ["45s resposta", "+22% pipeline", "ROI 4,2x"],
        quote: "O fluxo com IA virou nosso padrao de escala.",
    },
    {
        title: "Operacao Gamma",
        segment: "Clinica popular",
        metrics: ["R$ 220k/mes", "Conversao 12,8%", "SLA 38s"],
        quote: "As confirmacoes reduziram o no-show em semanas.",
    },
];

export default function ProofWall() {
    return (
        <section className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-5xl w-full space-y-6">
                <Chip variant="flat" color="success">PROVA</Chip>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Credibilidade com casos reais
                </h2>
                <p className="text-white/60 text-lg">
                    Cases e depoimentos para reforcar confianca antes da decisao.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                <p className="text-white/60 mt-4 text-sm">"{proof.quote}"</p>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
