"use client";

import { Card, CardBody, Chip } from "@heroui/react";

const proofs = [
    { title: "Clinica Alpha", result: "+31% conversao em 60 dias" },
    { title: "Rede Beta", result: "Tempo de resposta caiu para 45s" },
    { title: "Operacao Gamma", result: "R$ 220k/mes recuperados" },
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
                                <p className="text-white/80 font-semibold">{proof.title}</p>
                                <p className="text-white/60 mt-2">{proof.result}</p>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
