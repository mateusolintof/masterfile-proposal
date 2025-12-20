"use client";

import { useMemo, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/react";
import { ArrowRight } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";
import { useProposalStore } from "@/store/useProposalStore";

export default function NextSteps() {
    const setupCost = useProposalStore((state) => state.setupCost);
    const monthlyOpex = useProposalStore((state) => state.monthlyOpex);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);

    const kickoffMessage = useMemo(() => {
        return [
            "Olá! Quero iniciar o projeto Convert.AI.",
            "",
            "Próximos passos:",
            "1) Confirmar escopo e dados de acesso.",
            "2) Agendar kick-off com stakeholders.",
            "3) Iniciar integrações e treinamento.",
            "",
            `Setup: R$ ${setupCost.toLocaleString("pt-BR")}`,
            `Operação: R$ ${monthlyOpex.toLocaleString("pt-BR")}/mês`,
        ].join("\n");
    }, [monthlyOpex, setupCost]);

    const copyKickoffMessage = async () => {
        try {
            await navigator.clipboard.writeText(kickoffMessage);
            setHasCopied(true);
            window.setTimeout(() => setHasCopied(false), 2500);
        } catch {
            setHasCopied(false);
        }
    };

    return (
        <SlideShell
            eyebrow="Próximos passos"
            chipColor="success"
            title="Vamos iniciar em até 10 dias"
            subtitle="Assinatura, onboarding rápido e kick-off com o time da CM Remédios."
            align="center"
            size="compact"
            contentClassName="flex items-center justify-center"
        >
            <Card className="w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                <CardBody className="p-6 md:p-8 space-y-6">
                    <ol className="text-white/70 text-sm md:text-base space-y-2 text-left">
                        <li>1) Confirmar escopo e dados de acesso.</li>
                        <li>2) Agendar kick-off com stakeholders.</li>
                        <li>3) Iniciar integrações e treinamento.</li>
                    </ol>
                    <Button
                        size="lg"
                        className="w-full font-semibold text-lg h-14 justify-center gap-3"
                        color="success"
                        endContent={<ArrowRight />}
                        onPress={() => setIsModalOpen(true)}
                    >
                        Iniciar projeto
                    </Button>
                </CardBody>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                backdrop="blur"
                size="2xl"
                scrollBehavior="inside"
                classNames={{
                    base: "bg-black/80 border border-white/10 text-white",
                    header: "border-b border-white/10",
                    footer: "border-t border-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <span className="text-lg font-semibold">Iniciar projeto</span>
                                <span className="text-sm text-white/60">Copie a mensagem abaixo e envie no canal que preferir.</span>
                            </ModalHeader>
                            <ModalBody className="py-5">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white/80 whitespace-pre-wrap" data-allow-vertical-scroll>
                                    {kickoffMessage}
                                </div>
                            </ModalBody>
                            <ModalFooter className="gap-2">
                                <Button
                                    color="success"
                                    onPress={copyKickoffMessage}
                                >
                                    {hasCopied ? "Mensagem copiada" : "Copiar mensagem"}
                                </Button>
                                <Button variant="light" onPress={onClose}>
                                    Fechar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </SlideShell>
    );
}
