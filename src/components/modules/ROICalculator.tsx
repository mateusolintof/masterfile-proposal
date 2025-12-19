"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Slider, Card, CardBody, Tab, Tabs, Chip } from "@heroui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { Users, Bot, DollarSign } from "lucide-react";

export default function ROICalculator() {
    const [leads, setLeads] = useState(1000);
    const [ticket, setTicket] = useState(500); // Standardize Ticket state if needed, unused in previous View but useful.

    // Constants
    const conversionRate = 0.05; // 5%
    // const ticket = 500; // Use state if we want to make it interactive later, but sticking to logic.
    // Actually, looking at previous code, ticket was hardcoded 500 in display but variable 'ticket' defined.
    // I will use state for ticket to make it better.

    // Calculations
    const leadsLostByDelay = leads * 0.60; // 60% lost due to delay
    const revenueCurrent = (leads - leadsLostByDelay) * conversionRate * ticket;
    const revenueAI = leads * (conversionRate * 1.5) * ticket; // +50% conversion efficiency

    const chartData = [
        { name: "Atual", revenue: revenueCurrent },
        { name: "Com IA", revenue: revenueAI },
    ];

    // Economy Tab - Annual savings calculation
    const humanCostMonthly = 7500; // 3 SDRs
    const aiCostMonthly = 1500;    // AI Squad
    const savings = (humanCostMonthly - aiCostMonthly) * 12;

    return (
        <section className="h-full w-full flex flex-col items-center justify-center p-8 relative">
            <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-8"
            >
                <Chip variant="flat" color="success" className="mb-4">VIABILIDADE</Chip>
                <h2 className="text-4xl font-bold text-white">Matemática do Lucro</h2>
            </motion.div>

            <div className="w-full max-w-4xl h-[550px] flex gap-8">
                {/* Control Panel */}
                <Card className="w-1/3 h-full bg-black/40 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-8 flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Parâmetros</h3>
                            <div className="space-y-8">
                                <div>
                                    <label className="text-sm text-white/60 mb-2 block">Leads Mensais</label>
                                    <div className="text-2xl font-bold text-white mb-2">{leads.toLocaleString()}</div>
                                    <Slider
                                        step={100}
                                        minValue={500}
                                        maxValue={5000}
                                        value={leads}
                                        onChange={(v) => setLeads(Number(v))}
                                        aria-label="Leads Mensais"
                                        color="success"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-white/60 mb-2 block">Ticket Médio</label>
                                    <div className="text-2xl font-bold text-white mb-2">R$ {ticket.toLocaleString()}</div>
                                    <Slider
                                        size="sm"
                                        step={50}
                                        minValue={100}
                                        maxValue={2000}
                                        value={ticket}
                                        onChange={(v) => setTicket(Number(v))}
                                        aria-label="Ticket Médio"
                                        color="success"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Visualize Panel */}
                <Card className="w-2/3 h-full bg-black/40 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-0 h-full">
                        <Tabs
                            aria-label="ROI Options"
                            color="success"
                            variant="underlined"
                            classNames={{
                                tabList: "p-4 w-full justify-start border-b border-white/10",
                                cursor: "w-full bg-green-400",
                                tab: "max-w-fit px-8 h-10",
                                tabContent: "group-data-[selected=true]:text-green-400"
                            }}
                        >
                            <Tab key="performance" title="Performance">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="flex-1 w-full min-h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData}>
                                                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                                <RechartsTooltip
                                                    cursor={{ fill: 'transparent' }}
                                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                                />
                                                <Bar dataKey="revenue" radius={[6, 6, 0, 0]} animationDuration={1000}>
                                                    {chartData.map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#555' : 'var(--color-accent-success)'} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <span className="text-white/40 text-sm">Receita Projetada (Mensal)</span>
                                        <div className="text-4xl font-bold" style={{ color: 'var(--color-accent-success)' }}>
                                            R$ {revenueAI.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab key="savings" title="Economia">
                                <div className="p-8 h-full flex flex-col items-center justify-center gap-8">
                                    <div className="flex items-center gap-12">
                                        <div className="text-center opacity-50">
                                            <div className="flex gap-2 justify-center mb-4">
                                                <Users size={32} />
                                                <Users size={32} />
                                                <Users size={32} />
                                            </div>
                                            <p className="text-sm">3 SDRs Humanos</p>
                                            <p className="text-xl font-bold text-red-400">R$ 7.500/mês</p>
                                        </div>
                                        <div className="text-2xl font-bold text-white/20">vs</div>
                                        <div className="text-center">
                                            <div className="flex justify-center mb-4" style={{ color: 'var(--color-accent-success)' }}>
                                                <Bot size={48} />
                                            </div>
                                            <p className="text-sm" style={{ color: 'var(--color-accent-success)' }}>1 AI Squad</p>
                                            <p className="text-xl font-bold" style={{ color: 'var(--color-accent-success)' }}>R$ 1.500/mês</p>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl p-8 w-full text-center" style={{ backgroundColor: 'rgba(0, 255, 148, 0.1)', border: '1px solid rgba(0, 255, 148, 0.2)' }}>
                                        <p className="text-white/60 mb-2 uppercase tracking-widest text-xs">Economia Anual Projetada</p>
                                        <div className="text-5xl font-bold flex items-center justify-center gap-2" style={{ color: 'var(--color-accent-success)' }}>
                                            <DollarSign size={32} />
                                            {savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}
