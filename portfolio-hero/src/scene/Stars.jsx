import { useMemo } from "react";
import * as THREE from "three";

export default function Stars() {
  const count = 1300;

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      data[i * 3] =
        (Math.random() - 0.5) * 11;

      data[i * 3 + 1] =
        (Math.random() - 0.5) * 7;

      data[i * 3 + 2] =
        (Math.random() - 0.5) * 5 - 1;
    }

    return data;
  }, []);

  return (
    <points>

      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />

      </bufferGeometry>

      <pointsMaterial
        color="#b7eaff"
        size={0.018}
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />

    </points>
  );
}