"use client";

import { Card, CardBody } from "@heroui/react";
import { useProposalStore } from "@/store/useProposalStore";
import SlideShell from "@/components/ui/SlideShell";

const addons = [
    "Integração com pagamentos",
    "Relatórios executivos",
    "Treinamento extra de equipe",
];

export default function OfferPricing() {
    const setupCost = useProposalStore((state) => state.setupCost);
    const monthlyOpex = useProposalStore((state) => state.monthlyOpex);

    return (
        <SlideShell
            eyebrow="Oferta & Pricing"
            chipColor="success"
            title="Setup único + operação mensal"
            subtitle="Separação clara entre implantação e operação para reforçar valor contínuo."
            size="compact"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6">
                        <p className="text-xs uppercase tracking-widest text-white/40">Setup</p>
                        <p className="text-4xl font-bold text-white mt-2">R$ {setupCost.toLocaleString("pt-BR")}</p>
                        <p className="text-white/60 mt-2">Integrações, treinamento e go-live.</p>
                    </CardBody>
                </Card>
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6">
                        <p className="text-xs uppercase tracking-widest text-white/40">Operação</p>
                        <p className="text-4xl font-bold text-white mt-2">R$ {monthlyOpex.toLocaleString("pt-BR")}/mês</p>
                        <p className="text-white/60 mt-2">Monitoramento, ajustes e suporte.</p>
                    </CardBody>
                </Card>
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6">
                        <p className="text-xs uppercase tracking-widest text-white/40">Add-ons</p>
                        <ul className="mt-4 space-y-2 text-white/70 text-sm">
                            {addons.map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </SlideShell>
    );
}
