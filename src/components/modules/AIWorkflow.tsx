"use client";

import { useMemo } from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const baseNodeStyle = {
    background: "rgba(2, 4, 10, 0.8)",
    color: "#EDEDED",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 12,
    fontSize: 12,
};

export default function AIWorkflow() {
    const initialNodes = useMemo(
        () => [
            {
                id: "whatsapp",
                type: "input",
                position: { x: 0, y: 80 },
                data: { label: "WhatsApp" },
                style: { ...baseNodeStyle, borderColor: "rgba(0, 255, 148, 0.6)" },
            },
            {
                id: "site",
                type: "input",
                position: { x: 0, y: 200 },
                data: { label: "Site / Landing" },
                style: { ...baseNodeStyle },
            },
            {
                id: "router",
                position: { x: 240, y: 140 },
                data: { label: "Router IA" },
                style: { ...baseNodeStyle, borderColor: "rgba(0, 229, 255, 0.6)" },
            },
            {
                id: "handoff",
                position: { x: 240, y: 280 },
                data: { label: "Handoff Humano" },
                style: { ...baseNodeStyle },
            },
            {
                id: "crm",
                type: "output",
                position: { x: 520, y: 60 },
                data: { label: "CRM" },
                style: { ...baseNodeStyle },
            },
            {
                id: "agenda",
                type: "output",
                position: { x: 520, y: 160 },
                data: { label: "Agenda" },
                style: { ...baseNodeStyle },
            },
            {
                id: "pagamento",
                type: "output",
                position: { x: 520, y: 260 },
                data: { label: "Pagamento" },
                style: { ...baseNodeStyle },
            },
            {
                id: "analytics",
                type: "output",
                position: { x: 520, y: 360 },
                data: { label: "Analytics" },
                style: { ...baseNodeStyle },
            },
        ],
        []
    );

    const initialEdges = useMemo(
        () => [
            { id: "e1", source: "whatsapp", target: "router", animated: true },
            { id: "e2", source: "site", target: "router", animated: true },
            { id: "e3", source: "router", target: "crm" },
            { id: "e4", source: "router", target: "agenda" },
            { id: "e5", source: "router", target: "pagamento" },
            { id: "e6", source: "router", target: "handoff", animated: true },
            { id: "e7", source: "router", target: "analytics" },
            { id: "e8", source: "handoff", target: "crm" },
        ],
        []
    );

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <section className="h-full w-full flex items-center justify-center p-8">
            <div className="max-w-6xl w-full space-y-6">
                <Chip variant="flat" color="primary">AI WORKFLOW</Chip>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Roteamento inteligente com guardrails
                </h2>
                <p className="text-white/60 text-lg">
                    Visualizacao do fluxo entre canais, ferramentas, handoffs humanos e CRM.
                </p>
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
                    <CardBody className="p-4">
                        <div className="h-[420px] w-full">
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                fitView
                                fitViewOptions={{ padding: 0.2 }}
                                nodesDraggable={false}
                                nodesConnectable={false}
                                elementsSelectable={false}
                                panOnDrag={false}
                                panOnScroll={false}
                                zoomOnScroll={false}
                                zoomOnDoubleClick={false}
                                proOptions={{ hideAttribution: true }}
                            >
                                <Background />
                                <MiniMap zoomable={false} pannable={false} />
                                <Controls showInteractive={false} />
                            </ReactFlow>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}
