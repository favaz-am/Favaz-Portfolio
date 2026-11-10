"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
// Import the component that gltfjsx just generated for you!
import Avatar from "./Avatar"; 

export default function HeroAvatar() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "absolute", top: 0, left: 0, zIndex: 10, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        {/* Basic lighting so your avatar isn't pitch black */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 2]} intensity={2} />
        
        <Center>
           {/* This is your generated GLB mesh */}
           <Avatar />
        </Center>

        {/* Adds realistic reflections to the materials */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}