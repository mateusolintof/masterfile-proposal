"use client";

import { Card, CardBody, Chip } from "@heroui/react";

export default function AIWorkflow() {
    return (
        <section className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-5xl w-full space-y-6">
                <Chip variant="flat" color="primary">AI WORKFLOW</Chip>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Roteamento inteligente com guardrails
                </h2>
                <p className="text-white/60 text-lg">
                    Fluxo visual de canais, ferramentas, handoffs humanos e escrita no CRM.
                </p>
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6">
                        <p className="text-white/70">
                            Placeholder para diagrama com @xyflow/react: Entrada (WhatsApp, Site) -&gt; Router -&gt; Tools
                            (Agenda, CRM, Pagamento) -&gt; Handoff humano -&gt; Analytics.
                        </p>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}
