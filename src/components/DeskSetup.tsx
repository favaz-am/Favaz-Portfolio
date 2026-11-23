"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DeskSetupProps {
  handNode?: THREE.Object3D;
}

export default function DeskSetup({ handNode }: DeskSetupProps) {
  const setupRef = useRef<THREE.Group>(null);
  const deskRef = useRef<THREE.Group>(null);
  const mouseRef = useRef<THREE.Group>(null);

  // Reusable vector to avoid garbage collection every frame
  const handPos = useRef(new THREE.Vector3());

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

    // --- REALISTIC MOUSE TRACKING ---
    if (handNode && deskRef.current && mouseRef.current && current > 0.5) {
      // Convert the avatar's right hand world position into the desk's local space
      handNode.getWorldPosition(handPos.current);
      deskRef.current.worldToLocal(handPos.current);

      // Check how close the hand is to the mouse's resting zone [-0.50, -0.01]
      const dx = handPos.current.x - -0.5;
      const dz = handPos.current.z - -0.01;
      const dist = Math.hypot(dx, dz);

      // When hand is over the mouse zone, glide the mouse under the PALM (not the wrist)
      if (dist < 0.24) {
        // Offset X (+0.02) and Z (+0.055) shifts the mouse forward under his fingers
        const targetX = THREE.MathUtils.clamp(handPos.current.x + 0.02, -0.56, -0.38);
        const targetZ = THREE.MathUtils.clamp(handPos.current.z + 0.075, -0.08, 0.12);

        mouseRef.current.position.x = THREE.MathUtils.lerp(
          mouseRef.current.position.x,
          targetX,
          0.25
        );
        mouseRef.current.position.z = THREE.MathUtils.lerp(
          mouseRef.current.position.z,
          targetZ,
          0.25
        );
      }
    }
  });

  return (
    <group ref={setupRef}>
      {/* =========================================
          1. DESK, DESK MAT, KEYBOARD, ERGONOMIC MOUSE & MONITOR
         ========================================= */}
      <group ref={deskRef} position={[0.1, 0.87, 0.78]}>
        {/* Tabletop */}
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

        {/* Sleek Extended Desk Mat (Covers Keyboard + Right-Hand Mouse Zone) */}
        <group position={[-0.1, 0.02, -0.02]}>
          {/* Subtle Burgundy Stitched Edge */}
          <mesh position={[0, -0.001, 0]}>
            <boxGeometry args={[0.98, 0.003, 0.36]} />
            <meshStandardMaterial
              color="#7a1e22"
              emissive="#b32624"
              emissiveIntensity={0.35}
              roughness={0.8}
            />
          </mesh>
          {/* Matte Micro-Weave Surface */}
          <mesh position={[0, 0.001, 0]}>
            <boxGeometry args={[0.96, 0.004, 0.34]} />
            <meshStandardMaterial color="#100f14" roughness={0.92} metalness={0.05} />
          </mesh>
        </group>

        {/* Desk Legs */}
        <mesh position={[-0.6, -0.46, 0]}>
          <boxGeometry args={[0.036, 0.92, 0.54]} />
          <meshStandardMaterial color="#0e0d11" roughness={0.5} metalness={0.7} />
        </mesh>
        <mesh position={[0.6, -0.46, 0]}>
          <boxGeometry args={[0.036, 0.92, 0.54]} />
          <meshStandardMaterial color="#0e0d11" roughness={0.5} metalness={0.7} />
        </mesh>

        {/* Keyboard */}
        <group position={[0.02, 0.032, -0.02]} rotation={[0.05, 0, 0]}>
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

        {/* Ergonomic Wireless Mouse */}
        <group
          ref={mouseRef}
          position={[-0.48, 0.023, 0.04]}
          rotation={[0, 0.24, 0]} // Angled inward to match his forearm
          scale={[1.45, 1.55, 1.5]} // Slightly taller hump to fill his palm
        >
          {/* Matte Dark Baseplate (Sits flush on the desk mat) */}
          <mesh position={[0, 0.004, 0]} scale={[1, 0.25, 1.55]}>
            <cylinderGeometry args={[0.038, 0.04, 0.02, 24]} />
            <meshStandardMaterial color="#141318" roughness={0.6} metalness={0.3} />
          </mesh>

          {/* Sculpted Ergonomic Shell */}
          <mesh position={[0, 0.008, -0.004]} scale={[1, 0.62, 1.52]}>
            <sphereGeometry args={[0.04, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#23222b" roughness={0.35} metalness={0.45} />
          </mesh>

          {/* Subtle Metallic Scroll Wheel */}
          <mesh position={[0, 0.028, 0.026]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.006, 0.006, 0.007, 16]} />
            <meshStandardMaterial color="#484654" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>

        {/* Monitor Stand Base */}
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