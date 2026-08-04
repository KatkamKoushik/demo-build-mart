"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

function FloatingBlock({
  position,
  size,
  color,
  speed,
  distort,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  speed: number;
  distort: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.15;
    meshRef.current.rotation.y += speed * 0.002;
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.4}
      floatIntensity={0.6}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function FloatingCylinder({
  position,
  radius,
  height,
  color,
  speed,
}: {
  position: [number, number, number];
  radius: number;
  height: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
    meshRef.current.rotation.x += speed * 0.001;
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} castShadow>
        <cylinderGeometry args={[radius, radius, height, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({
  position,
  radius,
  tube,
  color,
  speed,
}: {
  position: [number, number, number];
  radius: number;
  tube: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.3;
    meshRef.current.rotation.y += speed * 0.003;
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} castShadow>
        <torusGeometry args={[radius, tube, 16, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.65}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF8A50"
        size={0.03}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#FFFFFF"
        castShadow
      />
      <pointLight position={[-3, 2, -2]} intensity={0.4} color="#FF8A50" />
      <pointLight position={[4, -1, 3]} intensity={0.3} color="#F59E0B" />

      {/* Construction Material Primitives */}
      {/* Concrete blocks */}
      <FloatingBlock
        position={[-2.5, 0.8, -1]}
        size={[0.8, 0.8, 0.8]}
        color="#8D99AE"
        speed={1.2}
        distort={0.15}
      />
      <FloatingBlock
        position={[2.8, -0.5, -0.5]}
        size={[0.6, 1, 0.6]}
        color="#6B7A8D"
        speed={0.9}
        distort={0.1}
      />
      <FloatingBlock
        position={[0.5, 1.2, -2]}
        size={[1, 0.5, 0.5]}
        color="#1F2937"
        speed={1.5}
        distort={0.08}
      />

      {/* Steel bars / pipes */}
      <FloatingCylinder
        position={[-1.5, -1, 0.5]}
        radius={0.08}
        height={2.5}
        color="#4A5568"
        speed={1.1}
      />
      <FloatingCylinder
        position={[1.8, 0.5, -1.5]}
        radius={0.06}
        height={2}
        color="#718096"
        speed={0.7}
      />
      <FloatingCylinder
        position={[-0.5, 1.5, 0]}
        radius={0.1}
        height={1.8}
        color="#2D3748"
        speed={1.3}
      />

      {/* Washers / rings */}
      <FloatingTorus
        position={[3, 1, -1]}
        radius={0.4}
        tube={0.12}
        color="#F59E0B"
        speed={1.0}
      />
      <FloatingTorus
        position={[-2, -1.2, 1]}
        radius={0.3}
        tube={0.08}
        color="#FF8A50"
        speed={1.4}
      />

      {/* Accent block with blue glow */}
      <FloatingBlock
        position={[0, -0.3, 1]}
        size={[0.5, 0.5, 0.5]}
        color="#F59E0B"
        speed={0.6}
        distort={0.2}
      />

      {/* Particles */}
      <Particles />

      {/* Removed heavy postprocessing to improve performance */}
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-60" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
