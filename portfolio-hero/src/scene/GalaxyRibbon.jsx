import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function GalaxyRibbon({
  index = 0,
  count = 900,
  width = 7.5,
  height = 2.8,
}) {
  const pointsRef = useRef();

  const { positions, basePositions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorA = new THREE.Color("#22d3ee");
    const colorB = new THREE.Color("#6366f1");
    const colorC = new THREE.Color("#d946ef");

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);

      // Spread ribbon across the COMPLETE scene
      const x = (t - 0.5) * width * 2.2;

      // Main flowing wave
      const wave =
        Math.sin(t * Math.PI * 2.4 + index * 0.8) * height * 0.22 +
        Math.sin(t * Math.PI * 5.2 + index) * height * 0.08;

      // Different vertical lanes
      const lane =
        (index - 2) * 0.48;

      // Small particle thickness
      const y =
        wave +
        lane +
        (Math.random() - 0.5) * 0.14;

      const z =
        Math.sin(t * Math.PI * 3.0 + index) * 0.25 +
        (Math.random() - 0.5) * 0.35;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      // Cyan -> blue -> purple -> pink
      const c = new THREE.Color();

      if (t < 0.5) {
        c.copy(colorA).lerp(colorB, t * 2);
      } else {
        c.copy(colorB).lerp(colorC, (t - 0.5) * 2);
      }

      // Slight random variation
      c.offsetHSL(
        (Math.random() - 0.5) * 0.03,
        0,
        (Math.random() - 0.5) * 0.08
      );

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return {
      positions,
      basePositions,
      colors,
    };
  }, [count, width, height, index]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const elapsed = state.clock.elapsedTime;
    const position = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const originalX = basePositions[i3];
      const originalY = basePositions[i3 + 1];
      const originalZ = basePositions[i3 + 2];

      // VERY strong continuous horizontal flow
      const flow =
        Math.sin(elapsed * 0.85 + originalX * 0.75 + index) *
        0.42;

      // Large traveling wave
      const wave =
        Math.sin(
          originalX * 1.15 -
            elapsed * 1.25 +
            index * 0.8
        ) *
        0.32;

      // Secondary wave
      const wave2 =
        Math.sin(
          originalX * 2.4 -
            elapsed * 1.8 +
            index
        ) *
        0.08;

      position.array[i3] =
        originalX +
        Math.sin(elapsed * 0.45 + originalY) * 0.12;

      position.array[i3 + 1] =
        originalY +
        flow +
        wave +
        wave2;

      position.array[i3 + 2] =
        originalZ +
        Math.sin(
          originalX * 1.5 -
            elapsed * 0.9
        ) * 0.22;
    }

    position.needsUpdate = true;

    // Slowly rotate the complete ribbon field
    pointsRef.current.rotation.z =
      Math.sin(elapsed * 0.12 + index) * 0.035;

    pointsRef.current.rotation.y =
      Math.sin(elapsed * 0.1 + index) * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.035 + index * 0.004}
        vertexColors
        transparent
        opacity={0.82}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}