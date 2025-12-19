"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import DistortionPlane from "./DistortionPlane";
import { useProposalStore } from "@/store/useProposalStore";

// Use a single texture for now until all textures are available
const DEFAULT_TEXTURE = "/textures/node_01.png";

export default function Scene() {
    const scrollSpeed = useProposalStore((state) => state.scrollSpeed);

    return (
        <div className="fixed inset-0 z-0 bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={["#050505"]} />
                    <DistortionPlane
                        textureUrl={DEFAULT_TEXTURE}
                        speed={scrollSpeed}
                    />
                    <ambientLight intensity={0.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}
