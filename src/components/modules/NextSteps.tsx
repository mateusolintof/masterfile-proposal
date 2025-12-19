"use client";

import { Button, Card, CardBody, Chip } from "@heroui/react";
import { ArrowRight } from "lucide-react";

export default function NextSteps() {
    return (
        <section className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-4xl w-full text-center space-y-6">
                <Chip variant="flat" color="primary">NEXT STEPS</Chip>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Vamos iniciar em ate 10 dias
                </h2>
                <p className="text-white/60 text-lg">
                    Assinatura, onboarding rapido e kick-off com o time da CM Remedios.
                </p>
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6 space-y-4">
                        <div className="text-white/70">
                            1) Confirmar escopo e dados de acesso.
                            <br />
                            2) Agendar kickoff com stakeholders.
                            <br />
                            3) Iniciar integracoes e treinamento.
                        </div>
                        <Button
                            size="lg"
                            className="w-full font-semibold text-lg"
                            color="success"
                            endContent={<ArrowRight />}
                        >
                            INICIAR PROJETO
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}
