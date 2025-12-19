"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ElegantNetworkProps {
    particleCount?: number;
    connectionDistance?: number;
    speed?: number;
}

// Simple noise function for organic movement
function noise3D(x: number, y: number, z: number): number {
    const n = Math.sin(x * 1.27 + y * 3.43 + z * 2.17) * 43758.5453;
    return (n - Math.floor(n)) * 2 - 1;
}

export default function ElegantNetwork({
    particleCount = 150,
    connectionDistance = 2.5,
    speed = 0.0005,
}: ElegantNetworkProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const timeRef = useRef(0);

    // Generate initial particle positions
    const { positions, velocities } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            // Spread particles in a wide area
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 12;
            positions[i3 + 2] = (Math.random() - 0.5) * 8;

            // Initial velocities
            velocities[i3] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        return { positions, velocities };
    }, [particleCount]);

    // Create geometry for particles
    const particleGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
        return geometry;
    }, [positions]);

    // Create geometry for lines (connections)
    const lineGeometry = useMemo(() => {
        // Max possible connections
        const maxConnections = particleCount * particleCount;
        const linePositions = new Float32Array(maxConnections * 6);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
        geometry.setDrawRange(0, 0);
        return geometry;
    }, [particleCount]);

    // Animation loop
    useFrame(() => {
        if (!pointsRef.current || !linesRef.current) return;

        timeRef.current += speed;
        const time = timeRef.current;

        const pointPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;

        // Update particle positions with organic noise-based movement
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Apply noise-based movement
            const noiseX = noise3D(positions[i3] * 0.1, time, i * 0.1) * 0.01;
            const noiseY = noise3D(positions[i3 + 1] * 0.1, time + 100, i * 0.1) * 0.01;
            const noiseZ = noise3D(positions[i3 + 2] * 0.1, time + 200, i * 0.1) * 0.005;

            positions[i3] += velocities[i3] + noiseX;
            positions[i3 + 1] += velocities[i3 + 1] + noiseY;
            positions[i3 + 2] += velocities[i3 + 2] + noiseZ;

            // Boundary wrapping
            if (positions[i3] > 10) positions[i3] = -10;
            if (positions[i3] < -10) positions[i3] = 10;
            if (positions[i3 + 1] > 6) positions[i3 + 1] = -6;
            if (positions[i3 + 1] < -6) positions[i3 + 1] = 6;
            if (positions[i3 + 2] > 4) positions[i3 + 2] = -4;
            if (positions[i3 + 2] < -4) positions[i3 + 2] = 4;

            // Update point geometry
            pointPositions[i3] = positions[i3];
            pointPositions[i3 + 1] = positions[i3 + 1];
            pointPositions[i3 + 2] = positions[i3 + 2];
        }

        // Calculate connections
        let lineIndex = 0;
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const i3 = i * 3;
                const j3 = j * 3;

                const dx = positions[i3] - positions[j3];
                const dy = positions[i3 + 1] - positions[j3 + 1];
                const dz = positions[i3 + 2] - positions[j3 + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < connectionDistance) {
                    const lineI = lineIndex * 6;
                    linePositions[lineI] = positions[i3];
                    linePositions[lineI + 1] = positions[i3 + 1];
                    linePositions[lineI + 2] = positions[i3 + 2];
                    linePositions[lineI + 3] = positions[j3];
                    linePositions[lineI + 4] = positions[j3 + 1];
                    linePositions[lineI + 5] = positions[j3 + 2];
                    lineIndex++;
                }
            }
        }

        // Update geometries
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        linesRef.current.geometry.attributes.position.needsUpdate = true;
        linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    });

    return (
        <group>
            {/* Particles */}
            <points ref={pointsRef} geometry={particleGeometry}>
                <pointsMaterial
                    color="#FFFFFF"
                    size={0.05}
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    depthWrite={false}
                />
            </points>

            {/* Connections */}
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial
                    color="#4F4F4F"
                    transparent
                    opacity={0.4}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}
