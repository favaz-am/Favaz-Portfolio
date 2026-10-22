"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Torus } from "@react-three/drei";
import * as THREE from "three";

function CyberTotemHead() {
  const headGroupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!headGroupRef.current) return;

    // Smoothly interpolate head rotation toward mouse coordinates
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 6;

    headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      headGroupRef.current.rotation.y,
      targetX,
      0.08
    );
    headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      headGroupRef.current.rotation.x,
      -targetY,
      0.08
    );

    // Move the burgundy rim light with the cursor
    if (lightRef.current) {
      lightRef.current.position.x = state.pointer.x * 4;
      lightRef.current.position.y = state.pointer.y * 4;
    }
  });

  return (
    <group>
      {/* Cursor-following Desaturated Burgundy Rim Light */}
      <pointLight ref={lightRef} position={[2, 2, 3]} intensity={35} color="#9E4758" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[-3, 5, 2]} intensity={1.2} color="#EDEDEF" />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
        <group ref={headGroupRef}>
          {/* Matte Obsidian Cyber-Head Core */}
          <RoundedBox args={[1.6, 2.0, 1.4]} radius={0.25} smoothness={4}>
            <meshStandardMaterial color="#121113" metalness={0.85} roughness={0.25} />
          </RoundedBox>

          {/* Visor / Eye Recess */}
          <RoundedBox args={[1.4, 0.45, 0.2]} radius={0.08} position={[0, 0.25, 0.68]}>
            <meshStandardMaterial color="#0A0A0C" metalness={0.9} roughness={0.1} />
          </RoundedBox>

          {/* Glowing Left & Right Burgundy Eyes */}
          <mesh position={[-0.35, 0.25, 0.79]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color="#9E4758" />
          </mesh>
          <mesh position={[0.35, 0.25, 0.79]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color="#9E4758" />
          </mesh>

          {/* Outer Halo Ring */}
          <Torus args={[1.6, 0.03, 16, 64]} rotation={[Math.PI / 2.2, 0, 0]}>
            <meshStandardMaterial color="#6E2635" emissive="#6E2635" emissiveIntensity={0.6} />
          </Torus>
        </group>
      </Float>
    </group>
  );
}

export default function HeroTotem3D() {
  return (
    <div className="relative h-[380px] w-full md:h-[480px]">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <CyberTotemHead />
      </Canvas>
    </div>
  );
}