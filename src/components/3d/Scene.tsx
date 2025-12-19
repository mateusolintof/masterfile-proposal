"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import DistortionPlane from "./DistortionPlane";
import { useProposalStore } from "@/store/useProposalStore";

export default function Scene() {
    const scrollSpeed = useProposalStore((state) => state.scrollSpeed);
    const activeSlide = useProposalStore((state) => state.activeSlide);

    const textures = [
        "/textures/node_01.png",
        "/textures/node_02.png",
        "/textures/node_03.png",
        "/textures/node_04.png",
        "/textures/node_05.png",
        "/textures/node_06.png",
    ];

    const currentTexture = textures[Math.min(activeSlide, textures.length - 1)] || textures[0];

    return (
        <div className="fixed inset-0 z-0 bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={["#050505"]} />
                    <DistortionPlane
                        textureUrl={currentTexture}
                        speed={scrollSpeed}
                    />
                    <ambientLight intensity={0.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}
