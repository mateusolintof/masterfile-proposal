"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import DistortionPlane from "./DistortionPlane";

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0 bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={["#050505"]} />
                    {/* 
            TODO: Pass dynamic texture based on scroll index.
            For MVP/Phase 1 verify, we use a single plane.
            In Phase 2/3 we will manage strictly triggering textures based on store.
          */}
                    <DistortionPlane textureUrl="https://placehold.co/1920x1080/101010/404040/png" speed={0} />
                    <ambientLight intensity={0.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}
