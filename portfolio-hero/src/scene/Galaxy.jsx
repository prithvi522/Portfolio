import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 1800;

export default function Galaxy() {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);

  const { positions, colors } = useMemo(() => {
    const positionArray = new Float32Array(PARTICLE_COUNT * 3);
    const colorArray = new Float32Array(PARTICLE_COUNT * 3);
    const blue = new THREE.Color("#2bcbff");
    const violet = new THREE.Color("#7b63ff");
    const pink = new THREE.Color("#ff3cf7");

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const progress = index / (PARTICLE_COUNT - 1);
      const ribbon = Math.floor(index % 6);
      const ribbonOffset = (ribbon - 2.5) * 0.08;
      const angle = progress * Math.PI * 4.2 + ribbon * 0.24;
      const radius = 0.75 + progress * 2.65;
      const wave = Math.sin(progress * Math.PI * 3.4) * 0.34;

      positionArray[index * 3] = -2.72 + progress * 5.46 + Math.cos(angle) * (0.12 + ribbon * 0.008);
      positionArray[index * 3 + 1] = -1.54 + progress * 3.18 + wave + ribbonOffset;
      positionArray[index * 3 + 2] = -1.82 + Math.sin(angle) * radius * 0.18 + ribbonOffset * 0.45;

      const mixed = progress < 0.52
        ? blue.clone().lerp(violet, progress / 0.52)
        : violet.clone().lerp(pink, (progress - 0.52) / 0.48);

      colorArray[index * 3] = mixed.r;
      colorArray[index * 3 + 1] = mixed.g;
      colorArray[index * 3 + 2] = mixed.b;
    }

    return { positions: positionArray, colors: colorArray };
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    if (pointsRef.current) {
      pointsRef.current.rotation.z = Math.sin(elapsed * 0.12) * 0.055 - 0.1;
      pointsRef.current.rotation.y = Math.sin(elapsed * 0.1) * 0.05;
      pointsRef.current.position.y = Math.sin(elapsed * 0.18) * 0.08;
    }

    if (materialRef.current) {
      materialRef.current.opacity = 0.64 + Math.sin(elapsed * 0.55) * 0.08;
    }
  });

  return (
    <points ref={pointsRef} position={[0.05, 0.1, -0.42]} rotation={[0.04, -0.18, -0.1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        size={0.032}
        sizeAttenuation
        opacity={0.68}
      />
    </points>
  );
}
