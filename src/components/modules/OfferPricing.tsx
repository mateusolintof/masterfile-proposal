"use client";

import { Card, CardBody, Chip } from "@heroui/react";

export default function OfferPricing() {
    return (
        <section className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-5xl w-full space-y-6">
                <Chip variant="flat" color="success">OFERTA & PRICING</Chip>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Setup unico + operacao mensal
                </h2>
                <p className="text-white/60 text-lg">
                    Separacao clara entre implantacao e operacao para reforcar valor continuo.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                        <CardBody className="p-6">
                            <p className="text-xs uppercase tracking-widest text-white/40">Setup</p>
                            <p className="text-4xl font-bold text-white mt-2">R$ 8.000</p>
                            <p className="text-white/60 mt-2">Integracoes, treinamento e go-live.</p>
                        </CardBody>
                    </Card>
                    <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                        <CardBody className="p-6">
                            <p className="text-xs uppercase tracking-widest text-white/40">Operacao</p>
                            <p className="text-4xl font-bold text-white mt-2">R$ 2.500/mes</p>
                            <p className="text-white/60 mt-2">Monitoramento, ajustes e suporte.</p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </section>
    );
}
