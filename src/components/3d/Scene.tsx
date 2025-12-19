"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import ElegantNetwork from "./ElegantNetwork";

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0 bg-[#02040A]">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={["#02040A"]} />
                    <ElegantNetwork
                        particleCount={150}
                        connectionDistance={2.5}
                        speed={0.0005}
                    />
                    <ambientLight intensity={0.3} />

                    {/* Post-processing effects */}
                    <EffectComposer>
                        <Bloom
                            intensity={0.3}
                            luminanceThreshold={0.8}
                            luminanceSmoothing={0.9}
                        />
                        <Vignette
                            offset={0.3}
                            darkness={0.7}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}
