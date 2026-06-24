'use client';

import { Environment, Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Droplet() {
  const mesh = useRef<THREE.Mesh>(null);
  const shape = useMemo(() => new THREE.SphereGeometry(1.28, 48, 48), []);
  useFrame(({ pointer, clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = pointer.y * 0.22 + Math.sin(clock.elapsedTime * .7) * .04;
    mesh.current.rotation.y = pointer.x * 0.34 + clock.elapsedTime * .12;
    mesh.current.scale.setScalar(1 + Math.sin(clock.elapsedTime) * .025);
  });
  return <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
    <mesh ref={mesh} geometry={shape} scale={[.92, 1.18, .92]}>
      <MeshTransmissionMaterial thickness={0.7} roughness={0.08} transmission={0.96} ior={1.35} chromaticAberration={0.06} anisotropy={0.18} color="#a9fbff" />
    </mesh>
    <mesh position={[0, 1.05, 0]} scale={[.36, .58, .36]}><sphereGeometry args={[1, 32, 32]} /><meshBasicMaterial color="#75ff8a" transparent opacity={0.12} /></mesh>
  </Float>;
}

export default function HeroOrb() {
  return <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={1.2} />
    <pointLight position={[3, 3, 4]} intensity={35} color="#28f2ff" />
    <pointLight position={[-4, -2, 2]} intensity={18} color="#8b5cf6" />
    <Droplet />
    <Sparkles count={28} scale={4} size={1.6} speed={0.25} color="#75ff8a" />
    <Environment preset="city" />
  </Canvas>;
}
