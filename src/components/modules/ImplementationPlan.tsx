"use client";

import { Card, CardBody } from "@heroui/react";
import SlideShell from "@/components/ui/SlideShell";

const phases = [
    { title: "Discovery", desc: "Mapeamento de processos, dados e metas clínicas." },
    { title: "Integrações", desc: "WhatsApp API, agenda, CRM e conectores essenciais." },
    { title: "Treinamento", desc: "Calibração de tom, intents, scripts e handoffs." },
    { title: "QA + Go-Live", desc: "Testes, ajustes finais e monitoramento assistido." },
    { title: "Otimização", desc: "A/B de mensagens, melhorias e metas trimestrais." },
];

export default function ImplementationPlan() {
    return (
        <SlideShell
            eyebrow="Implementação"
            chipColor="warning"
            title="Plano de implantação em fases"
            subtitle="Estrutura clara para reduzir risco e acelerar valor entregue, com SLA e suporte contínuo."
            size="compact"
        >
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
            <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4 text-white/70 text-sm">
                SLA proposto: resposta em até 2h para ajustes e suporte em dias úteis.
            </div>
        </SlideShell>
    );
}
