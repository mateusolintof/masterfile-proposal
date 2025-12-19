"use client";

import { Card, CardBody, Chip } from "@heroui/react";

export default function CoverSummary() {
    return (
        <section className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-5xl w-full text-center space-y-6">
                <div className="flex justify-center">
                    <Chip variant="flat" color="success">EXECUTIVE SUMMARY</Chip>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    CM Remedios - Transformacao Comercial com IA
                </h2>
                <p className="text-white/60 text-lg">
                    Proposta completa para elevar conversao, reduzir tempo de resposta e consolidar CRM em um fluxo unico.
                </p>
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40">Escopo</p>
                            <p className="text-white/80">Agentes + CRM + Integracoes</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40">Resultados</p>
                            <p className="text-white/80">Resposta &lt; 1 min - +Conversao</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40">Timeline</p>
                            <p className="text-white/80">Go-Live em 3 semanas</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}
