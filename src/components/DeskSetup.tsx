"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DeskSetup() {
  const setupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!setupRef.current) return;

    const vh = window.scrollY / window.innerHeight;
    // Appears right as the About section finishes fading out (2.15vh -> 2.45vh)
    const t = THREE.MathUtils.clamp((vh - 2.15) / 0.3, 0, 1);

    // Matches the avatar's scale (1 / 1.35 ≈ 0.74) so proportions stay exact
    const targetScale = 0.74 * t;
    const current = THREE.MathUtils.lerp(setupRef.current.scale.x, targetScale, 0.14);
    setupRef.current.scale.set(current, current, current);
    setupRef.current.visible = current > 0.01;
  });

  return (
    <group ref={setupRef}>
      {/* =========================================
          1. DESK, KEYBOARD, MOUSE & MONITOR
          (Aligned directly under Avatar's fingertips)
         ========================================= */}
      <group position={[0.1, 0.86, 0.78]}>
        {/* Tabletop (Slightly deeper to give monitor & hands room) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.36, 0.036, 0.74]} />
          <meshStandardMaterial color="#18171c" roughness={0.35} metalness={0.4} />
        </mesh>

        {/* Burgundy Front Accent Strip */}
        <mesh position={[0, -0.004, 0.372]}>
          <boxGeometry args={[1.36, 0.01, 0.008]} />
          <meshStandardMaterial
            color="#e04845"
            emissive="#b32624"
            emissiveIntensity={1.6}
          />
        </mesh>

        {/* Desk Legs */}
        <mesh position={[-0.6, -0.46, 0]}>
          <boxGeometry args={[0.036, 0.92, 0.54]} />
          <meshStandardMaterial color="#0e0d11" roughness={0.5} metalness={0.7} />
        </mesh>
        <mesh position={[0.6, -0.46, 0]}>
          <boxGeometry args={[0.036, 0.92, 0.54]} />
          <meshStandardMaterial color="#0e0d11" roughness={0.5} metalness={0.7} />
        </mesh>

        {/* Keyboard (Moved forward from -0.18 to -0.02 so both hands type directly on the keys) */}
        <group position={[0.02, 0.03, -0.02]} rotation={[0.05, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.46, 0.018, 0.16]} />
            <meshStandardMaterial color="#24232c" roughness={0.4} metalness={0.5} />
          </mesh>
          {/* Underglow */}
          <mesh position={[0, -0.008, 0]}>
            <boxGeometry args={[0.47, 0.005, 0.17]} />
            <meshStandardMaterial
              color="#e04845"
              emissive="#e04845"
              emissiveIntensity={1.4}
            />
          </mesh>
          {/* 4 Raised Keycap Rows */}
          {[-0.048, -0.016, 0.016, 0.048].map((zOffset, idx) => (
            <mesh key={idx} position={[0, 0.013, zOffset]}>
              <boxGeometry args={[0.42, 0.009, 0.02]} />
              <meshStandardMaterial color="#484654" roughness={0.5} metalness={0.2} />
            </mesh>
          ))}
        </group>

        {/* Wireless Mouse */}
        <mesh position={[0.34, 0.024, -0.02]}>
          <boxGeometry args={[0.065, 0.018, 0.1]} />
          <meshStandardMaterial color="#2a2933" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Monitor Stand Base (Pushed back to 0.27 so fingers clear it completely) */}
        <mesh position={[0, 0.024, 0.27]}>
          <boxGeometry args={[0.18, 0.012, 0.12]} />
          <meshStandardMaterial color="#101014" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Monitor Neck */}
        <mesh position={[0, 0.14, 0.3]}>
          <boxGeometry args={[0.036, 0.22, 0.024]} />
          <meshStandardMaterial color="#101014" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Monitor Display */}
        <group position={[0, 0.29, 0.27]}>
          <mesh>
            <boxGeometry args={[0.56, 0.33, 0.022]} />
            <meshStandardMaterial color="#15141a" roughness={0.25} metalness={0.75} />
          </mesh>
          <mesh position={[0, 0, -0.013]}>
            <planeGeometry args={[0.52, 0.29]} />
            <meshStandardMaterial
              color="#2a1118"
              emissive="#b32624"
              emissiveIntensity={0.95}
            />
          </mesh>
          <mesh position={[0, 0, 0.013]}>
            <boxGeometry args={[0.2, 0.01, 0.006]} />
            <meshStandardMaterial
              color="#e04845"
              emissive="#e04845"
              emissiveIntensity={2.0}
            />
          </mesh>
        </group>
      </group>

      {/* =========================================
          2. CHAIR (Locked directly under Avatar)
         ========================================= */}
      <group position={[0, 0.52, -0.04]}>
        {/* Seat Cushion */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.48, 0.05, 0.46]} />
          <meshStandardMaterial color="#1c1b22" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Backrest */}
        <mesh position={[0, 0.28, -0.2]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[0.46, 0.52, 0.045]} />
          <meshStandardMaterial color="#1c1b22" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Burgundy Backrest Accent */}
        <mesh position={[0, 0.44, -0.225]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[0.26, 0.014, 0.008]} />
          <meshStandardMaterial
            color="#e04845"
            emissive="#b32624"
            emissiveIntensity={1.4}
          />
        </mesh>

        {/* 4 Angled Chair Legs */}
        <mesh position={[-0.2, -0.28, 0.19]} rotation={[0.08, 0, 0.08]}>
          <boxGeometry args={[0.032, 0.56, 0.032]} />
          <meshStandardMaterial color="#121116" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0.2, -0.28, 0.19]} rotation={[0.08, 0, -0.08]}>
          <boxGeometry args={[0.032, 0.56, 0.032]} />
          <meshStandardMaterial color="#121116" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[-0.2, -0.28, -0.17]} rotation={[-0.08, 0, 0.08]}>
          <boxGeometry args={[0.032, 0.56, 0.032]} />
          <meshStandardMaterial color="#121116" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0.2, -0.28, -0.17]} rotation={[-0.08, 0, -0.08]}>
          <boxGeometry args={[0.032, 0.56, 0.032]} />
          <meshStandardMaterial color="#121116" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}