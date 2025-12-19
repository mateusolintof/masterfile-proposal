"use client";

import { Card, CardBody, Chip } from "@heroui/react";

const phases = [
    { title: "Discovery", desc: "Mapeamento de processos, dados e metas clinicas." },
    { title: "Integracoes", desc: "WhatsApp API, agenda, CRM e conectores essenciais." },
    { title: "Treinamento", desc: "Calibracao de tom, intents, scripts e handoffs." },
    { title: "QA + Go-Live", desc: "Testes, ajustes finais e monitoramento assistido." },
    { title: "Otimizacao", desc: "A/B de mensagens, melhorias e metas trimestrais." },
];

export default function ImplementationPlan() {
    return (
        <section className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-5xl w-full space-y-6">
                <Chip variant="flat" color="warning">IMPLEMENTACAO</Chip>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Plano de implantacao em fases
                </h2>
                <p className="text-white/60 text-lg">
                    Estrutura clara para reduzir risco e acelerar valor entregue, com SLA e suporte continuo.
                </p>
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {phases.map((phase) => (
                            <div key={phase.title} className="space-y-2">
                                <p className="text-sm uppercase tracking-widest text-white/40">{phase.title}</p>
                                <p className="text-white/80">{phase.desc}</p>
                            </div>
                        ))}
                    </CardBody>
                </Card>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white/70 text-sm">
                    SLA proposto: resposta em ate 2h para ajustes e suporte em dias uteis.
                </div>
            </div>
        </section>
    );
}
