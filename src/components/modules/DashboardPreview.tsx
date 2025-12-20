"use client";

import { Card, CardBody, Tabs, Tab } from "@heroui/react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import SlideShell from "@/components/ui/SlideShell";

const colors = {
    tech: "#00E5FF",
    success: "#00FF94",
    danger: "#FF4D4D",
};

const filters = ["Período: 30d", "Canal: WhatsApp", "Pipeline: Atendimento IA", "Unidade: Matriz"];

const overviewTrend = [
    { week: "S1", conversao: 7.2, receita: 92 },
    { week: "S2", conversao: 8.4, receita: 104 },
    { week: "S3", conversao: 9.1, receita: 118 },
    { week: "S4", conversao: 12.4, receita: 148 },
];

const overviewKpis = [
    { label: "SLA médio", value: "42s" },
    { label: "Conversão", value: "+27%" },
    { label: "Receita", value: "R$ 148.000/mês" },
    { label: "No-show", value: "-8 p.p." },
];

const funnelData = [
    { stage: "Leads", value: 1200 },
    { stage: "Qualificados", value: 620 },
    { stage: "Agendados", value: 340 },
    { stage: "Fechados", value: 180 },
];

const iaVolume = [
    { day: "Seg", total: 180, qualificados: 92, escalados: 24 },
    { day: "Ter", total: 210, qualificados: 118, escalados: 31 },
    { day: "Qua", total: 190, qualificados: 104, escalados: 28 },
    { day: "Qui", total: 240, qualificados: 132, escalados: 34 },
    { day: "Sex", total: 220, qualificados: 126, escalados: 30 },
];

const vendorPerformance = [
    { name: "Marina", deals: 38 },
    { name: "Caio", deals: 29 },
    { name: "Lívia", deals: 24 },
    { name: "Paulo", deals: 18 },
];

const clients = [
    { name: "Carla Souza", stage: "Qualificado", temp: "Alta", score: 86 },
    { name: "Rafael Lima", stage: "Agendado", temp: "Média", score: 74 },
    { name: "Julia Araújo", stage: "Follow-up", temp: "Média", score: 68 },
    { name: "Denis Alves", stage: "Contato", temp: "Baixa", score: 52 },
];

const insights = [
    { title: "Horários com maior conversão", detail: "Tarde (14h-17h) gera 32% mais agendas." },
    { title: "Gargalo identificado", detail: "WhatsApp sem resposta em 1h perde 18% do pipeline." },
    { title: "Sugerido pela IA", detail: "Script com 2 etapas aumenta qualificação em 12%." },
];

const lossReasons = [
    { label: "Preço", value: 42 },
    { label: "Horário", value: 28 },
    { label: "Concorrência", value: 18 },
    { label: "Sem retorno", value: 12 },
];

const lossColors = [colors.danger, colors.tech, colors.success, "#5a5a5a"];

export default function DashboardPreview() {
    const selectedClient = clients[0];

    return (
        <SlideShell
            eyebrow="Dashboard"
            chipColor="success"
            title="Visão operacional com IA aplicada"
            subtitle="KPIs, funis, performance e insights para tomada de decisão."
            size="compact"
            contentClassName="flex flex-col min-h-0"
        >
            <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <span key={filter} className="text-xs text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                            {filter}
                        </span>
                    ))}
            </div>

            <Card className="mt-4 bg-[#0b0f16] border border-white/10 h-[min(60vh,520px)] overflow-hidden">
                <CardBody className="p-4 h-full min-h-0">
                        <Tabs
                            aria-label="Dashboard Tabs"
                            color="success"
                            variant="underlined"
                            classNames={{
                                tabList: "w-full justify-start border-b border-white/10",
                                cursor: "w-full bg-[#00FF94]",
                                tab: "max-w-fit px-6 h-10",
                                tabContent: "group-data-[selected=true]:text-[#00FF94]",
                            }}
                        >
                            <Tab key="overview" title="Visão Geral">
                                <div className="grid grid-cols-12 gap-3 py-3">
                                    <Card className="col-span-8 bg-white/5 border border-white/10">
                                        <CardBody className="p-3">
                                            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
                                                Receita e conversão
                                            </p>
                                            <div className="h-[clamp(140px,20vh,200px)] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={overviewTrend}>
                                                        <XAxis dataKey="week" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                                        <Tooltip
                                                            cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                                                            contentStyle={{ backgroundColor: "#0b0f16", border: "1px solid #1f2937", borderRadius: 8 }}
                                                        />
                                                        <Line type="monotone" dataKey="receita" stroke={colors.success} strokeWidth={2} dot={false} />
                                                        <Line type="monotone" dataKey="conversao" stroke={colors.tech} strokeWidth={2} dot={false} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Card className="col-span-4 bg-white/5 border border-white/10">
                                        <CardBody className="p-3 grid grid-cols-2 gap-3">
                                            {overviewKpis.map((kpi) => (
                                                <div key={kpi.label} className="bg-black/30 border border-white/10 rounded-lg p-3">
                                                    <p className="text-xs uppercase tracking-widest text-white/40">{kpi.label}</p>
                                                    <p className="text-white/80 text-lg mt-2">{kpi.value}</p>
                                                </div>
                                            ))}
                                        </CardBody>
                                    </Card>
                                    <Card className="col-span-12 bg-white/5 border border-white/10">
                                        <CardBody className="p-3">
                                            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
                                                Funil de vendas
                                            </p>
                                            <div className="h-[clamp(110px,15vh,160px)] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                                                        <XAxis type="number" hide />
                                                        <YAxis dataKey="stage" type="category" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                                        <Tooltip
                                                            cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                                            contentStyle={{ backgroundColor: "#0b0f16", border: "1px solid #1f2937", borderRadius: 8 }}
                                                        />
                                                        <Bar dataKey="value" radius={[6, 6, 6, 6]} fill={colors.success} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Tab>

                            <Tab key="ai" title="Gestão IA">
                                <div className="grid grid-cols-12 gap-3 py-3">
                                    <Card className="col-span-7 bg-white/5 border border-white/10">
                                        <CardBody className="p-3">
                                            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
                                                Volume de atendimento IA
                                            </p>
                                            <div className="h-[clamp(140px,20vh,200px)] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={iaVolume}>
                                                        <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                                        <Tooltip
                                                            cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                                                            contentStyle={{ backgroundColor: "#0b0f16", border: "1px solid #1f2937", borderRadius: 8 }}
                                                        />
                                                        <Area type="monotone" dataKey="total" stroke={colors.tech} fill="rgba(0,229,255,0.2)" />
                                                        <Area type="monotone" dataKey="qualificados" stroke={colors.success} fill="rgba(0,255,148,0.2)" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Card className="col-span-5 bg-white/5 border border-white/10">
                                        <CardBody className="p-3 space-y-4">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-black/30 border border-white/10 rounded-lg p-3">
                                                    <p className="text-xs uppercase tracking-widest text-white/40">Qualificados</p>
                                                    <p className="text-white/80 text-lg mt-2">612</p>
                                                </div>
                                                <div className="bg-black/30 border border-white/10 rounded-lg p-3">
                                                    <p className="text-xs uppercase tracking-widest text-white/40">Escalados</p>
                                                    <p className="text-white/80 text-lg mt-2">128</p>
                                                </div>
                                                <div className="bg-black/30 border border-white/10 rounded-lg p-3">
                                                    <p className="text-xs uppercase tracking-widest text-white/40">SLA médio</p>
                                                    <p className="text-white/80 text-lg mt-2">38s</p>
                                                </div>
                                                <div className="bg-black/30 border border-white/10 rounded-lg p-3">
                                                    <p className="text-xs uppercase tracking-widest text-white/40">CSAT IA</p>
                                                    <p className="text-white/80 text-lg mt-2">4.6/5</p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-white/50">
                                                Escalonamento automático baseado em risco e intenção.
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Tab>

                            <Tab key="sales" title="Atendimento Vendedores">
                                <div className="grid grid-cols-12 gap-3 py-3">
                                    <Card className="col-span-7 bg-white/5 border border-white/10">
                                        <CardBody className="p-3">
                                            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
                                                Deals fechados por vendedor
                                            </p>
                                            <div className="h-[clamp(140px,20vh,200px)] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={vendorPerformance}>
                                                        <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                                        <Tooltip
                                                            cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                                            contentStyle={{ backgroundColor: "#0b0f16", border: "1px solid #1f2937", borderRadius: 8 }}
                                                        />
                                                        <Bar dataKey="deals" radius={[6, 6, 0, 0]} fill={colors.tech} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Card className="col-span-5 bg-white/5 border border-white/10">
                                        <CardBody className="p-3 grid grid-cols-2 gap-3">
                                            <div className="bg-black/30 border border-white/10 rounded-lg p-3">
                                                <p className="text-xs uppercase tracking-widest text-white/40">Score médio</p>
                                                <p className="text-white/80 text-lg mt-2">8.7</p>
                                            </div>
                                            <div className="bg-black/30 border border-white/10 rounded-lg p-3">
                                                <p className="text-xs uppercase tracking-widest text-white/40">Tempo médio</p>
                                                <p className="text-white/80 text-lg mt-2">9m</p>
                                            </div>
                                            <div className="bg-black/30 border border-white/10 rounded-lg p-3">
                                                <p className="text-xs uppercase tracking-widest text-white/40">Deals ganhos</p>
                                                <p className="text-white/80 text-lg mt-2">180</p>
                                            </div>
                                            <div className="bg-black/30 border border-white/10 rounded-lg p-3">
                                                <p className="text-xs uppercase tracking-widest text-white/40">% Fechados</p>
                                                <p className="text-white/80 text-lg mt-2">24%</p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Tab>

                            <Tab key="clients" title="Clientes">
                                <div className="grid grid-cols-12 gap-3 py-3">
                                    <Card className="col-span-6 bg-white/5 border border-white/10">
                                        <CardBody className="p-3">
                                            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
                                                Base qualificada
                                            </p>
                                            <div className="space-y-2">
                                                {clients.map((client) => (
                                                    <div
                                                        key={client.name}
                                                        className={`flex items-center justify-between rounded-lg p-3 border ${client.name === selectedClient.name
                                                            ? "border-[#00FF94]/60 bg-[#00FF94]/10"
                                                            : "border-white/10 bg-white/5"
                                                            }`}
                                                    >
                                                        <div>
                                                            <p className="text-sm text-white/80">{client.name}</p>
                                                            <p className="text-[10px] text-white/40">{client.stage}</p>
                                                        </div>
                                                        <span className="text-[10px] uppercase tracking-widest text-white/60">{client.temp}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Card className="col-span-6 bg-white/5 border border-white/10">
                                        <CardBody className="p-3 space-y-4">
                                            <p className="text-xs uppercase tracking-widest text-white/40">Análise IA</p>
                                            <div>
                                                <p className="text-lg text-white/80">{selectedClient.name}</p>
                                                <p className="text-xs text-white/50">Temperatura: {selectedClient.temp}</p>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                <p className="text-xs uppercase tracking-widest text-white/40">Score</p>
                                                <p className="text-3xl text-white/80 mt-2">{selectedClient.score}</p>
                                                <div className="h-2 rounded-full bg-white/10 mt-3">
                                                    <div className="h-full bg-[#00FF94]" style={{ width: `${selectedClient.score}%` }} />
                                                </div>
                                            </div>
                                            <div className="text-xs text-white/50">
                                                IA detectou alta intenção e risco baixo de no-show.
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Tab>

                            <Tab key="insights" title="Insights + Relatórios">
                                <div className="grid grid-cols-12 gap-3 py-3">
                                    <Card className="col-span-7 bg-white/5 border border-white/10">
                                        <CardBody className="p-3 space-y-3">
                                            <p className="text-xs uppercase tracking-widest text-white/40">Insights gerados por IA</p>
                                            {insights.map((insight) => (
                                                <div key={insight.title} className="bg-white/5 border border-white/10 rounded-lg p-3">
                                                    <p className="text-white/80 text-sm font-semibold">{insight.title}</p>
                                                    <p className="text-white/60 text-xs mt-2">{insight.detail}</p>
                                                </div>
                                            ))}
                                        </CardBody>
                                    </Card>
                                    <Card className="col-span-5 bg-white/5 border border-white/10">
                                        <CardBody className="p-3">
                                            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
                                                Motivos de perda
                                            </p>
                                            <div className="h-[clamp(140px,20vh,200px)] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie data={lossReasons} dataKey="value" innerRadius={50} outerRadius={80}>
                                                            {lossReasons.map((entry, index) => (
                                                                <Cell key={entry.label} fill={lossColors[index]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip
                                                            contentStyle={{ backgroundColor: "#0b0f16", border: "1px solid #1f2937", borderRadius: 8 }}
                                                        />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Tab>
                        </Tabs>
                </CardBody>
            </Card>
        </SlideShell>
    );
}
