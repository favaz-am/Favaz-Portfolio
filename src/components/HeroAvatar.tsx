"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Avatar from "./Avatar"; 

export default function HeroAvatar() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }}>
      {/* Portrait lens (fov: 35) leveled at Y: 0 for exact bust-shot framing */}
      <Canvas camera={{ position: [0, 0, 3.2], fov: 35 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 2]} intensity={2} />
        
        <Avatar />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}