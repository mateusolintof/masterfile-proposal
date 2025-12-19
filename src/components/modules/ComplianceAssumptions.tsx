"use client";

import { Card, CardBody, Chip } from "@heroui/react";

const items = [
    { title: "LGPD", desc: "Consentimento, minimizacao de dados e logs de acesso." },
    { title: "WhatsApp API", desc: "Uso oficial com templates aprovados e janela de 24h." },
    { title: "Seguranca", desc: "Criptografia em transito e controles de acesso por perfil." },
    { title: "Assumptions", desc: "Acesso a CRM, agenda e historico de mensagens." },
    { title: "SLA", desc: "Tempo de resposta e monitoramento continuo definidos." },
    { title: "Retencao", desc: "Politica de armazenamento alinhada ao contrato." },
];

export default function ComplianceAssumptions() {
    return (
        <section className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-5xl w-full space-y-6">
                <Chip variant="flat" color="warning">RISCOS & COMPLIANCE</Chip>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Assumptions, seguranca e conformidade
                </h2>
                <p className="text-white/60 text-lg">
                    Regras e premissas para garantir previsibilidade juridica e tecnica.
                </p>
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.map((item) => (
                            <div key={item.title} className="space-y-2">
                                <p className="text-xs uppercase tracking-widest text-white/40">{item.title}</p>
                                <p className="text-white/80">{item.desc}</p>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}
