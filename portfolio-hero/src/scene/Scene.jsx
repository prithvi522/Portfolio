import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import Bloom from "./Bloom";
import CameraRig from "./CameraRig";
import Crystal from "./Crystal";
import GalaxyRibbon from "./GalaxyRibbon";
import Lights from "./Lights";
import MouseParallax from "./MouseParallax";
import Particles from "./Particles";
import TorusModel from "./TorusModel";

export default function Scene() {
  const sceneGroupRef = useRef(null);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{
        position: [3.35, 1.28, 7.2],
        fov: 35,
        near: 0.1,
        far: 80,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.08,
      }}
    >
      <color attach="background" args={["#050512"]} />
      <fog attach="fog" args={["#050512", 9, 22]} />

      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.28} />
        <CameraRig />
        <Lights />

        <group ref={sceneGroupRef} position={[0.48, -0.08, 0]} rotation={[0.02, -0.18, 0]}>
          <MouseParallax groupRef={sceneGroupRef} strength={0.08} />
          <GalaxyRibbon />
          <Particles />
          <TorusModel position={[0.56, 0.18, -0.34]} />

          <Crystal
            position={[-1.48, 1.62, 0.2]}
            scale={0.56}
            color="#8adfff"
            accent="#b98cff"
            floatOffset={0.1}
          />
          <Crystal
            position={[1.88, 0.18, 0.42]}
            scale={0.72}
            color="#b18cff"
            accent="#ff72e8"
            floatOffset={1.8}
          />
          <Crystal
            position={[-0.88, -1.56, 0.18]}
            scale={0.5}
            color="#56d9ff"
            accent="#7b63ff"
            floatOffset={3.1}
          />
        </group>

        <Bloom />
      </Suspense>
    </Canvas>
  );
}
