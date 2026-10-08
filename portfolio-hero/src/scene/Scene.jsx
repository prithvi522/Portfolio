import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import CameraRig from "./CameraRig";
import Crystal from "./Crystal";
import Galaxy from "./Galaxy";
import Lights from "./Lights";
import OrbitParticles from "./OrbitParticles";
import Stars from "./Stars";
import Torus from "./Torus";
import Bloom from "./Bloom";

function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <Lights />

      {/* Camera */}
      <CameraRig />

      {/* Deep space stars */}
      <Stars />

      {/* MAIN MOVING GALAXY */}
      <Galaxy />

      {/* =========================================
          CENTRAL TORUS
      ========================================= */}

      <Torus
        position={[1.15, -0.08, 0]}
        scale={1.05}
      />


      {/* =========================================
          FLOATING CRYSTALS
      ========================================= */}


      {/* Extra orbit particles */}
      <OrbitParticles />


      {/* Bloom */}
      <Bloom />
    </>
  );
}


export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{
        position: [0, 0, 7.5],
        fov: 44,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <SceneContent />
    </Canvas>
  );
}