"use client";

import { Card, CardBody, Chip } from "@heroui/react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const trendData = [
    { week: "S1", response: 190 },
    { week: "S2", response: 140 },
    { week: "S3", response: 85 },
    { week: "S4", response: 45 },
];

const kpis = [
    { label: "SLA medio", value: "42s" },
    { label: "Conversao", value: "+27%" },
    { label: "Receita", value: "R$ 148k/mes" },
    { label: "No-show", value: "-8 p.p." },
];

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                        <CardBody className="p-6">
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
                                SLA de resposta (segundos)
                            </p>
                            <div className="h-[220px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trendData}>
                                        <XAxis dataKey="week" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                                            contentStyle={{ backgroundColor: "#0b0f16", border: "1px solid #1f2937", borderRadius: 8 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="response"
                                            stroke="#00E5FF"
                                            strokeWidth={2}
                                            dot={{ r: 3, fill: "#00E5FF" }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                        <CardBody className="p-6 grid grid-cols-2 gap-4">
                            {kpis.map((kpi) => (
                                <div key={kpi.label} className="bg-black/30 border border-white/10 rounded-lg p-4">
                                    <p className="text-xs uppercase tracking-widest text-white/40">{kpi.label}</p>
                                    <p className="text-white/80 text-xl mt-2">{kpi.value}</p>
                                </div>
                            ))}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </section>
    );
}
