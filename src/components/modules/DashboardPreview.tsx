"use client";

import { Card, CardBody, Chip } from "@heroui/react";

export default function DashboardPreview() {
    return (
        <section className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-5xl w-full space-y-6">
                <Chip variant="flat" color="success">DASHBOARD</Chip>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Indicadores entregues para lideranca
                </h2>
                <p className="text-white/60 text-lg">
                    KPIs conectados ao ROI: tempo de resposta, conversao, pipeline e receita recuperada.
                </p>
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40">SLA</p>
                            <p className="text-white/80">Median: 42s</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40">Conversao</p>
                            <p className="text-white/80">+27%</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40">Receita</p>
                            <p className="text-white/80">R$ 148k/mes</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}
