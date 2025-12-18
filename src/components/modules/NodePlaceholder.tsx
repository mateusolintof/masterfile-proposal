import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NodePlaceholderProps {
    title: string;
    className?: string;
    children?: ReactNode;
}

export default function NodePlaceholder({ title, className, children }: NodePlaceholderProps) {
    return (
        <div className={cn("w-screen h-screen flex-shrink-0 flex items-center justify-center p-8", className)}>
            <div className="max-w-4xl w-full bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-2xl shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">{title}</h2>
                <div className="text-white/70 text-lg">
                    {children || <p>Componente em desenvolvimento...</p>}
                </div>
            </div>
        </div>
    );
}
