"use client";

import { useEffect, useMemo } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Slider, Card, CardBody, Tab, Tabs } from "@heroui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { Users, Bot, DollarSign } from "lucide-react";
import { useProposalStore } from "@/store/useProposalStore";
import SlideShell from "@/components/ui/SlideShell";

export default function ROICalculator() {
    const leads = useProposalStore((state) => state.leadsPerMonth);
    const setLeads = useProposalStore((state) => state.setLeadsPerMonth);
    const ticket = useProposalStore((state) => state.avgTicket);
    const setTicket = useProposalStore((state) => state.setAvgTicket);
    const upliftFactor = useProposalStore((state) => state.upliftFactor);
    const setUpliftFactor = useProposalStore((state) => state.setUpliftFactor);
    const setupCost = useProposalStore((state) => state.setupCost);
    const monthlyOpex = useProposalStore((state) => state.monthlyOpex);

    const conversionRate = 0.078;
    const delayLossRate = 0.45;

    const leadsLostByDelay = leads * delayLossRate;
    const revenueCurrent = (leads - leadsLostByDelay) * conversionRate * ticket;
    const revenueAI = leads * conversionRate * upliftFactor * ticket;
    const monthlyGain = revenueAI - revenueCurrent - monthlyOpex;
    const paybackIsValid = monthlyGain > 0;
    const paybackMonths = paybackIsValid ? setupCost / monthlyGain : 0;

    const revenueMotion = useMotionValue(revenueAI);
    const savingsMotion = useMotionValue(monthlyGain * 12);
    const paybackMotion = useMotionValue(paybackMonths);

    const formatCurrency = useMemo(
        () =>
            new Intl.NumberFormat("pt-BR", {
                maximumFractionDigits: 0,
            }),
        []
    );

    const formatPercent = useMemo(
        () =>
            new Intl.NumberFormat("pt-BR", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
            }),
        []
    );

    const revenueDisplay = useTransform(revenueMotion, (value) => formatCurrency.format(value));
    const savingsDisplay = useTransform(savingsMotion, (value) => formatCurrency.format(value));
    const paybackDisplay = useTransform(paybackMotion, (value) => value.toFixed(1));

    useEffect(() => {
        const revenueControls = animate(revenueMotion, revenueAI, { duration: 0.6, ease: "easeOut" });
        const savingsControls = animate(savingsMotion, monthlyGain * 12, { duration: 0.6, ease: "easeOut" });
        const paybackControls = animate(paybackMotion, paybackMonths, { duration: 0.6, ease: "easeOut" });
        return () => {
            revenueControls.stop();
            savingsControls.stop();
            paybackControls.stop();
        };
    }, [revenueAI, monthlyGain, paybackMonths, revenueMotion, savingsMotion, paybackMotion]);

    const chartData = [
        { name: "Atual", revenue: revenueCurrent },
        { name: "Com IA", revenue: revenueAI },
    ];

    const humanCostMonthly = 7500;
    const aiCostMonthly = monthlyOpex;

    return (
        <SlideShell
            eyebrow="Viabilidade"
            chipColor="success"
            title="Matemática do lucro"
            subtitle="Ajuste os parâmetros e veja impacto em receita, economia e payback."
            align="center"
            size="compact"
            contentClassName="flex items-center justify-center"
        >
            <div className="w-full max-w-5xl h-[min(60vh,520px)] flex gap-6">
                {/* Control Panel */}
                <Card className="w-1/3 h-full bg-black/40 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-6 flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Parâmetros</h3>
                            <div className="space-y-8">
                                <div>
                                    <label className="text-sm text-white/60 mb-2 block">Leads Mensais</label>
                                    <div className="text-2xl font-bold text-white mb-2">{leads.toLocaleString('pt-BR')}</div>
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
                                    <div className="text-2xl font-bold text-white mb-2">R$ {ticket.toLocaleString('pt-BR')}</div>
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
                                <div>
                                    <label className="text-sm text-white/60 mb-2 block">Ganho de conversão</label>
                                    <div className="text-2xl font-bold text-white mb-2">{(upliftFactor * 100 - 100).toFixed(0)}%</div>
                                    <Slider
                                        size="sm"
                                        step={0.05}
                                        minValue={1.1}
                                        maxValue={1.7}
                                        value={upliftFactor}
                                        onChange={(v) => setUpliftFactor(Number(v))}
                                        aria-label="Ganho de conversão"
                                        color="success"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-xs text-white/50 space-y-2">
                            <div>Fórmula: Leads x Conversão x Ticket</div>
                            <div>Perda por atraso: {(delayLossRate * 100).toFixed(0)}%</div>
                            <div>Conversão base: {formatPercent.format(conversionRate * 100)}%</div>
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
                                tabList: "p-3 w-full justify-start border-b border-white/10",
                                cursor: "w-full bg-[#00FF94]",
                                tab: "max-w-fit px-8 h-10",
                                tabContent: "group-data-[selected=true]:text-[#00FF94]"
                            }}
                        >
                            <Tab key="performance" title="Performance">
                                <div className="p-6 h-full flex flex-col">
                                    <div className="flex-1 w-full min-h-[240px]">
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
                                            R$ <motion.span>{revenueDisplay}</motion.span>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab key="savings" title="Economia">
                                <div className="p-6 h-full flex flex-col items-center justify-center gap-6">
                                    <div className="flex items-center gap-12">
                                        <div className="text-center opacity-50">
                                            <div className="flex gap-2 justify-center mb-4">
                                                <Users size={32} />
                                                <Users size={32} />
                                                <Users size={32} />
                                            </div>
                                            <p className="text-sm">3 SDRs Humanos</p>
                                            <p className="text-xl font-bold text-red-400">R$ {humanCostMonthly.toLocaleString("pt-BR")}/mês</p>
                                        </div>
                                        <div className="text-2xl font-bold text-white/20">vs</div>
                                        <div className="text-center">
                                            <div className="flex justify-center mb-4" style={{ color: 'var(--color-accent-success)' }}>
                                                <Bot size={48} />
                                            </div>
                                            <p className="text-sm" style={{ color: 'var(--color-accent-success)' }}>1 AI Squad</p>
                                            <p className="text-xl font-bold" style={{ color: 'var(--color-accent-success)' }}>
                                                R$ {aiCostMonthly.toLocaleString("pt-BR")}/mês
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl p-6 w-full text-center" style={{ backgroundColor: 'rgba(0, 255, 148, 0.1)', border: '1px solid rgba(0, 255, 148, 0.2)' }}>
                                        <p className="text-white/60 mb-2 uppercase tracking-widest text-xs">Economia Anual Projetada</p>
                                        <div className="text-5xl font-bold flex items-center justify-center gap-2" style={{ color: 'var(--color-accent-success)' }}>
                                            <DollarSign size={32} />
                                            <motion.span>{savingsDisplay}</motion.span>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab key="payback" title="Payback">
                                <div className="p-6 h-full flex flex-col items-center justify-center gap-6 text-center">
                                    <p className="text-white/60 text-sm uppercase tracking-widest">Tempo de retorno</p>
                                    {paybackIsValid ? (
                                        <div className="text-6xl font-bold" style={{ color: 'var(--color-accent-success)' }}>
                                            <motion.span>{paybackDisplay}</motion.span> meses
                                        </div>
                                    ) : (
                                        <div className="text-4xl font-bold text-white/50">
                                            Não aplicável
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                            <p className="text-xs uppercase tracking-widest text-white/40">Setup</p>
                                            <p className="text-white/80 text-lg mt-2">R$ {setupCost.toLocaleString("pt-BR")}</p>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                            <p className="text-xs uppercase tracking-widest text-white/40">Opex Mensal</p>
                                            <p className="text-white/80 text-lg mt-2">R$ {monthlyOpex.toLocaleString("pt-BR")}</p>
                                        </div>
                                    </div>
                                    <p className="text-white/50 text-sm">
                                        Baseado no ganho mensal projetado menos o Opex recorrente.
                                    </p>
                                </div>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </SlideShell>
    );
}
