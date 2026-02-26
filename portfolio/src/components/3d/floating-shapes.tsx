"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── R3F JSX Primitives Bypass ───────────────────────────────────────────────
const Mesh = "mesh" as any;
const IcosahedronGeometry = "icosahedronGeometry" as any;
const TorusGeometry = "torusGeometry" as any;
const OctahedronGeometry = "octahedronGeometry" as any;
const DodecahedronGeometry = "dodecahedronGeometry" as any;
const AmbientLight = "ambientLight" as any;
const PointLight = "pointLight" as any;

// ─── Individual Shape ────────────────────────────────────────────────────────

function FloatingShape({
    geometry,
    position,
    color,
    speed,
    distort,
    scale,
}: {
    geometry: "icosahedron" | "torus" | "octahedron" | "dodecahedron";
    position: [number, number, number];
    color: string;
    speed: number;
    distort: number;
    scale: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state: any) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x =
            Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
        meshRef.current.rotation.y += speed * 0.002;
    });

    const geometryNode = useMemo(() => {
        switch (geometry) {
            case "icosahedron":
                return <IcosahedronGeometry args={[1, 1]} />;
            case "torus":
                return <TorusGeometry args={[1, 0.4, 16, 32]} />;
            case "octahedron":
                return <OctahedronGeometry args={[1, 0]} />;
            case "dodecahedron":
                return <DodecahedronGeometry args={[1, 0]} />;
        }
    }, [geometry]);

    return (
        <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
            <Mesh ref={meshRef} position={position} scale={scale}>
                {geometryNode}
                <MeshDistortMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    wireframe
                    distort={distort}
                    speed={speed * 0.5}
                />
            </Mesh>
        </Float>
    );
}

// ─── Mouse Parallax Rig ──────────────────────────────────────────────────────

function MouseParallaxRig() {
    const { camera } = useThree();
    const targetX = useRef(0);
    const targetY = useRef(0);

    useFrame(({ pointer }: any) => {
        targetX.current = pointer.x * 0.5;
        targetY.current = pointer.y * 0.3;

        camera.position.x += (targetX.current - camera.position.x) * 0.05;
        camera.position.y += (targetY.current - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// ─── Scene ───────────────────────────────────────────────────────────────────

function Scene() {
    return (
        <>
            <AmbientLight intensity={0.5} />
            <PointLight position={[10, 10, 10]} intensity={0.3} />

            <FloatingShape
                geometry="icosahedron"
                position={[-3, 1.5, -2]}
                color="#8b5cf6"
                speed={1.2}
                distort={0.4}
                scale={1.8}
            />
            <FloatingShape
                geometry="torus"
                position={[3.5, -1, -3]}
                color="#6366f1"
                speed={0.8}
                distort={0.3}
                scale={1.5}
            />
            <FloatingShape
                geometry="octahedron"
                position={[-1.5, -2, -1]}
                color="#a78bfa"
                speed={1.5}
                distort={0.2}
                scale={1.2}
            />
            <FloatingShape
                geometry="dodecahedron"
                position={[2, 2.5, -4]}
                color="#7c3aed"
                speed={1}
                distort={0.35}
                scale={1}
            />
            <FloatingShape
                geometry="icosahedron"
                position={[0, -0.5, -6]}
                color="#818cf8"
                speed={0.6}
                distort={0.5}
                scale={2.5}
            />

            <MouseParallaxRig />
        </>
    );
}

// ─── Exported Component ──────────────────────────────────────────────────────

export default function FloatingShapes() {
    return (
        <div className="absolute inset-0 -z-5" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
