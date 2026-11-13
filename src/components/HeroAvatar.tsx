"use client";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Avatar from "./Avatar"; 

export default function HeroAvatar() {
  return (
    // Make sure pointerEvents: "none" is on both the wrapper div AND the Canvas!
    <div style={{ width: "100%", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas style={{ pointerEvents: "none" }} camera={{ position: [0, 0, 3.2], fov: 35 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 2]} intensity={2} />
        <Avatar />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}