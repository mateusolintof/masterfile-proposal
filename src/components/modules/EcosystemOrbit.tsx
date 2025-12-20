"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, LineChart, BrainCircuit } from "lucide-react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import SlideShell from "@/components/ui/SlideShell";
import {
    Background,
    BackgroundVariant,
    ReactFlow,
    useEdgesState,
    useNodesState,
    type Edge,
    type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const ORBIT_RADIUS = "clamp(90px, 12vw, 145px)";
const AGENT_ANGLES = [0, 120, 240];

const agents = [
    {
        id: "sdr",
        name: "Agente SDR",
        role: "Qualificação",
        icon: <MessageSquare className="w-6 h-6" />,
        color: "cyan",
        desc: "Qualifica leads em tempo real, 24/7. Responde perguntas, quebra objeções e agenda reuniões automaticamente.",
        stats: ["Tempo de Resposta: <1 min", "Taxa de Engajamento: +40%"]
    },
    {
        id: "closer",
        name: "Agente Closer",
        role: "Fechamento",
        icon: <Users className="w-6 h-6" />,
        color: "blue",
        desc: "Acompanha o lead quente até a assinatura. Envia propostas, cobra feedbacks e garante que nada esfrie.",
        stats: ["Follow-up Automático", "Recuperação de Vendas"]
    },
    {
        id: "analyst",
        name: "Agente Analyst",
        role: "Inteligência",
        icon: <LineChart className="w-6 h-6" />,
        color: "purple",
        desc: "Analisa conversas e extrai insights. Identifica padrões de objeção e sugere melhorias no script de vendas.",
        stats: ["Análise de Sentimento", "Scoring de Leads"]
    }
];

const workflowNotes = [
    {
        title: "Handoffs",
        desc: "Escala para humano quando há objeção crítica, pedido de preço ou falta de resposta."
    },
    {
        title: "Ferramentas",
        desc: "Agenda, CRM, templates WhatsApp, pagamento e base de conhecimento."
    },
    {
        title: "Guardrails",
        desc: "LGPD, limites de risco clínico e confirmação humana em casos sensíveis."
    }
];

const baseNodeStyle = {
    background: "rgba(2, 4, 10, 0.8)",
    color: "#EDEDED",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 8,
    fontSize: 11,
};

const agentFlows: Record<string, { nodes: Node[]; edges: Edge[] }> = {
    sdr: {
        nodes: [
            { id: "lead", type: "input", position: { x: 0, y: 40 }, data: { label: "Lead inbound" }, style: baseNodeStyle },
            { id: "triage", position: { x: 180, y: 40 }, data: { label: "Qualificação IA" }, style: baseNodeStyle },
            { id: "agenda", position: { x: 360, y: 0 }, data: { label: "Agenda" }, style: baseNodeStyle },
            { id: "crm", position: { x: 360, y: 90 }, data: { label: "CRM atualizado" }, style: baseNodeStyle },
            { id: "handoff", position: { x: 180, y: 120 }, data: { label: "Escala humano" }, style: baseNodeStyle },
        ],
        edges: [
            { id: "e1", source: "lead", target: "triage", animated: true, style: { stroke: "rgba(0, 229, 255, 0.6)" } },
            { id: "e2", source: "triage", target: "agenda", style: { stroke: "rgba(0, 255, 148, 0.6)" } },
            { id: "e3", source: "triage", target: "crm", style: { stroke: "rgba(0, 255, 148, 0.6)" } },
            { id: "e4", source: "triage", target: "handoff", animated: true, style: { stroke: "rgba(255, 255, 255, 0.4)" } },
        ],
    },
    closer: {
        nodes: [
            { id: "qualified", type: "input", position: { x: 0, y: 40 }, data: { label: "Lead qualificado" }, style: baseNodeStyle },
            { id: "followup", position: { x: 180, y: 20 }, data: { label: "Follow-up" }, style: baseNodeStyle },
            { id: "proposal", position: { x: 360, y: 0 }, data: { label: "Proposta" }, style: baseNodeStyle },
            { id: "closing", position: { x: 360, y: 90 }, data: { label: "Fechamento" }, style: baseNodeStyle },
            { id: "crm", position: { x: 540, y: 45 }, data: { label: "CRM + Financeiro" }, style: baseNodeStyle },
        ],
        edges: [
            { id: "c1", source: "qualified", target: "followup", animated: true, style: { stroke: "rgba(0, 229, 255, 0.6)" } },
            { id: "c2", source: "followup", target: "proposal", style: { stroke: "rgba(0, 255, 148, 0.6)" } },
            { id: "c3", source: "followup", target: "closing", style: { stroke: "rgba(0, 255, 148, 0.6)" } },
            { id: "c4", source: "proposal", target: "crm", style: { stroke: "rgba(0, 229, 255, 0.5)" } },
            { id: "c5", source: "closing", target: "crm", style: { stroke: "rgba(0, 229, 255, 0.5)" } },
        ],
    },
    analyst: {
        nodes: [
            { id: "logs", type: "input", position: { x: 0, y: 40 }, data: { label: "Transcrições" }, style: baseNodeStyle },
            { id: "sentiment", position: { x: 180, y: 20 }, data: { label: "Sentimento" }, style: baseNodeStyle },
            { id: "insights", position: { x: 360, y: 0 }, data: { label: "Insights IA" }, style: baseNodeStyle },
            { id: "dash", position: { x: 360, y: 90 }, data: { label: "Dashboard" }, style: baseNodeStyle },
            { id: "alerts", position: { x: 540, y: 45 }, data: { label: "Alertas & Relatórios" }, style: baseNodeStyle },
        ],
        edges: [
            { id: "a1", source: "logs", target: "sentiment", animated: true, style: { stroke: "rgba(0, 229, 255, 0.6)" } },
            { id: "a2", source: "sentiment", target: "insights", style: { stroke: "rgba(0, 255, 148, 0.6)" } },
            { id: "a3", source: "sentiment", target: "dash", style: { stroke: "rgba(0, 255, 148, 0.6)" } },
            { id: "a4", source: "insights", target: "alerts", style: { stroke: "rgba(0, 229, 255, 0.5)" } },
            { id: "a5", source: "dash", target: "alerts", style: { stroke: "rgba(0, 229, 255, 0.5)" } },
        ],
    },
};

export default function EcosystemOrbit() {
    const [selectedAgent, setSelectedAgent] = useState(agents[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const handleAgentClick = (agent: typeof agents[0]) => {
        setSelectedAgent(agent);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const flow = agentFlows[selectedAgent.id];
        if (!flow) return;
        setNodes(flow.nodes);
        setEdges(flow.edges);
    }, [selectedAgent, setNodes, setEdges]);

	    return (
	        <SlideShell
	            eyebrow="Solução"
	            chipColor="warning"
	            title="A nova ordem"
	            subtitle="Seu time de elite trabalhando 24/7."
	            align="center"
	            size="compact"
	            className="relative overflow-hidden"
	            background={
	                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />
	            }
	        >
	            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 w-full items-center">
	                {/* Orbit Container */}
	                <div className="relative w-[min(420px,48vh)] h-[min(420px,48vh)] flex items-center justify-center z-10 mx-auto">
	                    {/* Center Core */}
	                    <div className="absolute w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.2)]">
	                        <BrainCircuit className="w-10 h-10 animate-pulse" style={{ color: "var(--color-accent-tech)" }} />
	                    </div>

                    {/* Orbit Rings */}
                    <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="absolute inset-16 border border-dashed border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

	                    {/* Agents */}
	                    {agents.map((agent, index) => {
	                        const angle = AGENT_ANGLES[index] ?? 0;

	                        return (
	                            <div
	                                key={agent.id}
	                                className="absolute top-1/2 left-1/2"
	                                style={{
	                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${ORBIT_RADIUS}) rotate(-${angle}deg)`,
	                                }}
	                            >
	                                <motion.button
	                                    type="button"
	                                    className="w-16 h-16 rounded-full bg-black/60 border border-white/20 hover:border-[#00E5FF] transition-all flex items-center justify-center backdrop-blur-md group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/60"
	                                    initial={{ opacity: 0, scale: 0 }}
	                                    whileInView={{ opacity: 1, scale: 1 }}
	                                    whileHover={{ scale: 1.1 }}
	                                    whileTap={{ scale: 0.98 }}
	                                    viewport={{ once: true, amount: 0.4 }}
	                                    transition={{ delay: 0.2 + index * 0.1 }}
	                                    onClick={() => handleAgentClick(agent)}
	                                >
	                                    <div className="text-white/80 group-hover:text-[#00E5FF] transition-colors">
	                                        {agent.icon}
	                                    </div>
	                                    <span className="absolute -bottom-8 text-xs font-medium text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
	                                        {agent.name}
	                                    </span>
	                                </motion.button>
	                            </div>
	                        );
	                    })}
	                </div>

	                <div className="space-y-4 text-left w-full">
	                    {workflowNotes.map((note) => (
	                        <div key={note.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
	                            <p className="text-xs uppercase tracking-widest text-white/40">{note.title}</p>
	                            <p className="text-white/70 mt-2 text-sm leading-relaxed">{note.desc}</p>
	                        </div>
	                    ))}
	                </div>
	            </div>

            {/* Modal Detail */}
            <Modal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                backdrop="blur"
                size="5xl"
                scrollBehavior="inside"
                classNames={{
                    base: "bg-black/80 border border-white/10 text-white",
                    header: "border-b border-white/10",
                    footer: "border-t border-white/10"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-4 items-center">
                                <div className="p-2 bg-white/5 rounded-lg">
                                    {selectedAgent.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold">{selectedAgent.name}</span>
                                    <span className="text-xs uppercase tracking-wider" style={{ color: "var(--color-accent-tech)" }}>{selectedAgent.role}</span>
                                </div>
                            </ModalHeader>
                            <ModalBody className="py-6">
                                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
                                    <div>
                                        <p className="text-white/80 leading-relaxed mb-4">
                                            {selectedAgent.desc}
                                        </p>
                                        <div className="space-y-2">
                                            {selectedAgent.stats.map((stat, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent-tech)" }} />
                                                    {stat}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                                        <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
                                            Fluxo do agente
                                        </p>
                                        <div className="h-[280px] w-full">
                                            <ReactFlow
                                                nodes={nodes}
                                                edges={edges}
                                                onNodesChange={onNodesChange}
                                                onEdgesChange={onEdgesChange}
                                                fitView
                                                fitViewOptions={{ padding: 0.2 }}
                                                nodesDraggable
                                                nodesConnectable={false}
                                                panOnDrag
                                                zoomOnScroll={false}
                                                proOptions={{ hideAttribution: true }}
                                                className="bg-[#0b0f16] rounded-lg"
                                            >
                                                <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="rgba(255,255,255,0.12)" />
                                            </ReactFlow>
                                        </div>
                                        <p className="text-[11px] text-white/50 mt-2">
                                            Arraste os nodes para explorar o fluxo.
                                        </p>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
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
