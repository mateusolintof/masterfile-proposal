"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";

interface DistortionPlaneProps {
    textureUrl: string;
    speed: number;
}

export default function DistortionPlane({ textureUrl, speed }: DistortionPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    // Using a placeholder texture if loading fails or for initial dev
    const texture = useTexture(textureUrl);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uSpeed: { value: 0 },
            uTexture: { value: texture },
        }),
        [texture]
    );

    useFrame((state) => {
        if (meshRef.current) {
            // access material as ShaderMaterial
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();
            material.uniforms.uSpeed.value = THREE.MathUtils.lerp(
                material.uniforms.uSpeed.value,
                speed,
                0.1
            );
        }
    });

    return (
        <mesh ref={meshRef} scale={[1.5, 1.5, 1]}>
            <planeGeometry args={[10, 10, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
}
