"use client";

import { Card, CardBody } from "@heroui/react";
import SlideShell from "@/components/ui/SlideShell";

const items = [
    { title: "LGPD", desc: "Consentimento, minimização de dados e logs de acesso." },
    { title: "WhatsApp API", desc: "Uso oficial com templates aprovados e janela de 24h." },
    { title: "Segurança", desc: "Criptografia em trânsito e controles de acesso por perfil." },
    { title: "Premissas", desc: "Acesso a CRM, agenda e histórico de mensagens." },
    { title: "SLA", desc: "Tempo de resposta e monitoramento contínuo definidos." },
    { title: "Retenção", desc: "Política de armazenamento alinhada ao contrato." },
];

export default function ComplianceAssumptions() {
    return (
        <SlideShell
            eyebrow="Riscos & Compliance"
            chipColor="warning"
            title="Premissas, segurança e conformidade"
            subtitle="Regras e premissas para garantir previsibilidade jurídica e técnica."
            size="compact"
        >
            <Card className="bg-white/5 border border-white/10 backdrop-blur-md w-full">
                <CardBody className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item) => (
                        <div key={item.title} className="space-y-2">
                            <p className="text-xs uppercase tracking-widest text-white/40">{item.title}</p>
                            <p className="text-white/80">{item.desc}</p>
                        </div>
                    ))}
                </CardBody>
            </Card>
        </SlideShell>
    );
}
