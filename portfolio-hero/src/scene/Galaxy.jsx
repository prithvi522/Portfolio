import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createRibbon(seed, count = 1800) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const cyan = new THREE.Color("#22d3ee");
  const blue = new THREE.Color("#6366f1");
  const purple = new THREE.Color("#c026d3");
  const pink = new THREE.Color("#ec4899");

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);

    // Wide horizontal galaxy path
    const x = (t - 0.5) * 13;

    // Different wave for every ribbon
    const wave =
      Math.sin(t * Math.PI * 2.5 + seed) * 1.05 +
      Math.sin(t * Math.PI * 5.2 + seed * 1.7) * 0.35;

    const y =
      wave +
      Math.sin(t * Math.PI * 9 + seed) * 0.08;

    // Natural thickness
    const spread =
      (Math.random() - 0.5) *
      (0.16 + Math.sin(t * Math.PI) * 0.28);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y + spread;
    positions[i * 3 + 2] =
      (Math.random() - 0.5) * 1.5;

    // Gradient color along ribbon
    const colorPosition =
      (t + seed * 0.13) % 1;

    const color = new THREE.Color();

    if (colorPosition < 0.33) {
      color.lerpColors(
        cyan,
        blue,
        colorPosition / 0.33
      );
    } else if (colorPosition < 0.66) {
      color.lerpColors(
        blue,
        purple,
        (colorPosition - 0.33) / 0.33
      );
    } else {
      color.lerpColors(
        purple,
        pink,
        (colorPosition - 0.66) / 0.34
      );
    }

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return { positions, colors };
}

function Ribbon({ index }) {
  const pointsRef = useRef();

  const data = useMemo(
    () => createRibbon(index * 1.7),
    [index]
  );

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;

    /*
      Continuous flowing movement.

      Each ribbon has a different speed,
      direction and phase so they don't
      look synchronized.
    */
    pointsRef.current.rotation.y =
      Math.sin(time * (0.08 + index * 0.015)) * 0.18;

    pointsRef.current.rotation.z =
      Math.sin(time * (0.12 + index * 0.01) + index) *
      0.025;

    pointsRef.current.position.y =
      Math.sin(
        time * 0.35 + index * 1.4
      ) * 0.12;

    pointsRef.current.position.x =
      Math.sin(
        time * 0.18 + index
      ) * 0.18;

    // Slowly pulse particle size
    const material = pointsRef.current.material;

    material.size =
      0.018 +
      Math.sin(
        time * 1.2 + index
      ) * 0.004;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        data.positions,
        3
      )
    );

    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(
        data.colors,
        3
      )
    );

    return geo;
  }, [data]);

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      rotation={[
        index * 0.12,
        index * 0.18,
        index * 0.08,
      ]}
    >
      <pointsMaterial
        size={0.018}
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

export default function Galaxy() {
  return (
    <group
      position={[0, 0, -0.8]}
      scale={[1, 1, 1]}
    >
      {/* Main flowing ribbons */}
      <Ribbon index={0} />
      <Ribbon index={1} />
      <Ribbon index={2} />
      <Ribbon index={3} />
      <Ribbon index={4} />
      <Ribbon index={5} />

      {/* Additional thinner distant ribbons */}
      <group scale={1.08} opacity={0.65}>
        <Ribbon index={6} />
        <Ribbon index={7} />
      </group>
    </group>
  );
}