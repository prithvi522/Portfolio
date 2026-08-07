import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function OrbitParticles() {
  const ref = useRef();

  const positions = useMemo(() => {
    const count = 350;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius =
        3.0 + Math.random() * 4.5;

      const angle =
        Math.random() * Math.PI * 2;

      array[i * 3] =
        Math.cos(angle) * radius;

      array[i * 3 + 1] =
        (Math.random() - 0.5) * 4.5;

      array[i * 3 + 2] =
        (Math.random() - 0.5) * 2;
    }

    return array;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y =
      state.clock.elapsedTime * 0.025;

    ref.current.rotation.z =
      Math.sin(
        state.clock.elapsedTime * 0.12
      ) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#8b5cf6"
        size={0.018}
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}