"use client";

import { Card, CardBody, Chip } from "@heroui/react";

export default function CoverSummary() {
    return (
        <section className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 items-center">
                <div className="space-y-6">
                    <Chip variant="flat" color="success">EXECUTIVE SUMMARY</Chip>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        CM Remedios - Transformacao Comercial com IA
                    </h2>
                    <p className="text-white/70 text-lg">
                        Proposta completa para elevar conversao, reduzir tempo de resposta e consolidar CRM em um fluxo unico.
                    </p>
                    <div className="text-white/70 text-sm space-y-2">
                        <div>Escopo: agentes IA, CRM e integracoes criticas.</div>
                        <div>Foco: acelerar atendimento e aumentar conversao do funil.</div>
                        <div>Entrega: onboarding rapido com metas de 90 dias.</div>
                    </div>
                </div>
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6 space-y-4">
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
