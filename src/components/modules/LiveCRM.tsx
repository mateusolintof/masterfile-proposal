"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody, Avatar, Chip } from "@heroui/react";
import { MoreVertical, Phone, Search, SlidersHorizontal } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Message = {
    id: number;
    role: "lead" | "ai";
    text: string;
};

const script: Message[] = [
    { id: 1, role: "lead", text: "Oi, gostaria de agendar consulta de avaliacao." },
    { id: 2, role: "ai", text: "Ola! Ja registrei seu lead no CRM. Prefere manha ou tarde?" },
    { id: 3, role: "lead", text: "Pode ser a tarde." },
    { id: 4, role: "ai", text: "Tenho 14:30 ou 16:00. Se quiser, posso escalar para humano." },
    { id: 5, role: "lead", text: "16:00 por favor." },
    { id: 6, role: "ai", text: "Agendado! CRM atualizado e confirmacao enviada no WhatsApp." },
];

const pipelineTabs = ["Atendimento IA", "Atendimento Humano", "Follow-up"];
const conversations = [
    { name: "Carlos Silva", tag: "IA", last: "Agendado para 16:00" },
    { name: "Bianca Moraes", tag: "Humano", last: "Aguardando retorno" },
    { name: "Rafael Costa", tag: "IA", last: "Perguntou sobre valores" },
    { name: "Marina Alves", tag: "Follow-up", last: "Reagendou consulta" },
];

const contacts = [
    { name: "Ana Paula", segment: "Ortodontia", stage: "Qualificado" },
    { name: "Lucas Rocha", segment: "Dermato", stage: "Agendado" },
    { name: "Paula Nunes", segment: "Implante", stage: "Follow-up" },
];

const overviewSeries = [
    { day: "Seg", deals: 18 },
    { day: "Ter", deals: 26 },
    { day: "Qua", deals: 22 },
    { day: "Qui", deals: 34 },
    { day: "Sex", deals: 29 },
];

const flowSteps = [
    "Lead entrou",
    "IA respondeu",
    "Qualificacao",
    "Escalado",
    "Agendado + CRM",
];

export default function LiveCRM() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [step, setStep] = useState(0);
    const [column, setColumn] = useState("new");

    useEffect(() => {
        if (step < script.length) {
            const timeout = setTimeout(() => {
                setMessages((prev) => [...prev, script[step]]);
                setStep((prev) => prev + 1);

                if (step === 2) setColumn("negotiating");
                if (step === 5) setColumn("scheduled");
            }, step % 2 === 0 ? 1000 : 2000);
            return () => clearTimeout(timeout);
        }
        const reset = setTimeout(() => {
            setMessages([]);
            setStep(0);
            setColumn("new");
        }, 3000);
        return () => clearTimeout(reset);
    }, [step]);

    const activeFlowIndex = useMemo(() => {
        if (step < 2) return 0;
        if (step < 3) return 1;
        if (step < 4) return 2;
        if (step < 5) return 3;
        return 4;
    }, [step]);

    return (
        <section className="h-full w-full flex flex-col items-center justify-center p-8 relative">
            <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-6"
            >
                <Chip variant="flat" color="warning" className="mb-4">CRM & INBOX</Chip>
                <h2 className="text-3xl font-bold text-white mb-2">CRM em Tempo Real</h2>
                <p className="text-white/60">Pipelines, inbox e analytics no mesmo lugar.</p>
            </motion.div>

            <div className="w-full max-w-6xl h-[620px] bg-black/30 border border-white/10 rounded-2xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                        {pipelineTabs.map((tab, index) => (
                            <Chip
                                key={tab}
                                variant="flat"
                                color={index === 0 ? "success" : "default"}
                            >
                                {tab}
                            </Chip>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                            <SlidersHorizontal size={12} />
                            Periodo 7d
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1">Canal: WhatsApp</div>
                        <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1">Unidade: Matriz</div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 h-[calc(100%-52px)]">
                    <div className="col-span-5 flex flex-col gap-4 h-full">
                        <Card className="flex-1 bg-[#0b0f16] border border-white/10">
                            <CardBody className="p-4 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs uppercase tracking-widest text-white/40">Pipelines de Vendas</p>
                                    <span className="text-xs text-white/40">Drag & drop</span>
                                </div>
                                <div className="grid grid-cols-3 gap-3 flex-1">
                                    {["Entrada IA", "Atendimento Humano", "Follow-up"].map((stage, index) => (
                                        <div key={stage} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-2">
                                            <div className="flex items-center justify-between text-xs text-white/50">
                                                <span>{stage}</span>
                                                <span>{index === 0 ? 12 : index === 1 ? 6 : 9}</span>
                                            </div>
                                            <div className="space-y-2 opacity-40">
                                                <div className="h-12 rounded-lg bg-white/10" />
                                                <div className="h-12 rounded-lg bg-white/10" />
                                            </div>
                                            <AnimatePresence>
                                                {column === (index === 0 ? "new" : index === 1 ? "negotiating" : "scheduled") && (
                                                    <motion.div
                                                        layoutId="lead-card"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        className="h-16 rounded-lg border border-white/10 bg-black/40 p-3 flex items-center gap-3"
                                                    >
                                                        <Avatar src="https://i.pravatar.cc/150?u=crm" size="sm" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-white">Carlos Silva</p>
                                                            <p className="text-[10px] text-white/50">
                                                                {index === 0 ? "IA atendendo" : index === 1 ? "Escalado" : "Agendado"}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="flex-1 bg-[#0b0f16] border border-white/10">
                            <CardBody className="p-4 h-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <p className="text-xs uppercase tracking-widest text-white/40">Gestao de Contatos</p>
                                    <div className="space-y-2">
                                        {contacts.map((lead) => (
                                            <div key={lead.name} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3">
                                                <div>
                                                    <p className="text-sm text-white/80">{lead.name}</p>
                                                    <p className="text-[10px] text-white/40">{lead.segment}</p>
                                                </div>
                                                <span className="text-[10px] uppercase tracking-widest text-white/60">{lead.stage}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-xs uppercase tracking-widest text-white/40">Visao Geral</p>
                                    <div className="h-[160px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={overviewSeries}>
                                                <XAxis dataKey="day" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                                                    contentStyle={{ backgroundColor: "#0b0f16", border: "1px solid #1f2937", borderRadius: 8 }}
                                                />
                                                <Area type="monotone" dataKey="deals" stroke="#00FF94" fill="rgba(0,255,148,0.25)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="text-xs text-white/50">
                                        Atendimentos diarios e deals em andamento.
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <Card className="col-span-7 bg-[#0b0f16] border border-white/10">
                        <CardBody className="p-0 h-full flex flex-col">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                                <div>
                                    <p className="text-sm font-semibold text-white">Inbox Unificado</p>
                                    <p className="text-xs text-white/40">Central de atendimento e historico</p>
                                </div>
                                <div className="flex gap-3 text-white/40">
                                    <Phone size={18} />
                                    <Search size={18} />
                                    <MoreVertical size={18} />
                                </div>
                            </div>

                            <div className="px-4 py-3 border-b border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {flowSteps.map((label, index) => (
                                        <span
                                            key={label}
                                            className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border ${index <= activeFlowIndex
                                                ? "border-[#00FF94] text-[#00FF94]"
                                                : "border-white/10 text-white/40"
                                                }`}
                                        >
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-[1fr_2fr_1fr] gap-0">
                                <div className="border-r border-white/5 p-4 space-y-3">
                                    <div className="text-[10px] uppercase tracking-widest text-white/40 flex items-center justify-between">
                                        Conversas
                                        <span className="text-white/30">Retratil</span>
                                    </div>
                                    {conversations.map((item) => (
                                        <div key={item.name} className="bg-white/5 border border-white/10 rounded-lg p-3">
                                            <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                                                <span>{item.name}</span>
                                                <span>{item.tag}</span>
                                            </div>
                                            <p className="text-[11px] text-white/50">{item.last}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between p-4 border-b border-white/5">
                                        <div className="flex items-center gap-3">
                                            <Avatar src="https://i.pravatar.cc/150?u=crm" />
                                            <div>
                                                <p className="font-semibold text-white">Carlos Silva</p>
                                                <p className="text-xs text-white/50">Canal: WhatsApp</p>
                                            </div>
                                        </div>
                                        <Chip size="sm" variant="flat" color="success">IA ativa</Chip>
                                    </div>
                                    <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                                        {messages.map((msg) => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, x: msg.role === "ai" ? 20 : -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`flex ${msg.role === "ai" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.role === "ai"
                                                        ? "bg-[#0f2b30] text-white rounded-tr-none border border-[#00E5FF]/30"
                                                        : "bg-white/5 text-white rounded-tl-none border border-white/10"
                                                        }`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </motion.div>
                                        ))}
                                        {step % 2 !== 0 && step < script.length && (
                                            <div className="flex justify-start">
                                                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none">
                                                    <div className="flex gap-1">
                                                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 border-t border-white/5 text-xs text-white/40">
                                        IA em execucao. Escala para humano quando ha risco clinico ou pedido de preco.
                                    </div>
                                </div>

                                <div className="border-l border-white/5 p-4 space-y-3">
                                    <div className="text-[10px] uppercase tracking-widest text-white/40 flex items-center justify-between">
                                        Lead Info
                                        <span className="text-white/30">Retratil</span>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2">
                                        <p className="text-sm text-white/80">Status</p>
                                        <p className="text-xs text-white/60">
                                            {column === "new" ? "IA atendendo" : column === "negotiating" ? "Escalado" : "Agendado"}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2">
                                        <p className="text-sm text-white/80">Tags</p>
                                        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-widest text-white/50">
                                            <span className="px-2 py-1 rounded-full border border-white/10">Consulta</span>
                                            <span className="px-2 py-1 rounded-full border border-white/10">Alta Intencao</span>
                                            <span className="px-2 py-1 rounded-full border border-white/10">WhatsApp</span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2">
                                        <p className="text-sm text-white/80">Temperatura</p>
                                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                            <div className="h-full bg-[#00FF94] w-[70%]" />
                                        </div>
                                        <p className="text-[11px] text-white/50">Score IA: 84/100</p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </section>
    );
}
