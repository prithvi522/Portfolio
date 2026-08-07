import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Torus({
  position = [0, 0, 0],
  scale = 1,
}) {
  const mainRef = useRef(null);
  const glowRef = useRef(null);
  const outerRef = useRef(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // ==========================================
    // MAIN RING — FAST + SMOOTH ROTATION
    // ==========================================
    if (mainRef.current) {
      mainRef.current.rotation.y += delta * 1.45;

      mainRef.current.rotation.x =
        0.92 + Math.sin(time * 0.8) * 0.025;

      mainRef.current.rotation.z =
        -0.38 + Math.sin(time * 0.55) * 0.018;
    }

    // ==========================================
    // CYAN GLOW RING — COUNTER ROTATION
    // ==========================================
    if (glowRef.current) {
      glowRef.current.rotation.y -= delta * 1.05;

      glowRef.current.rotation.x =
        0.92 + Math.sin(time * 0.65) * 0.02;

      glowRef.current.rotation.z =
        -0.38 + Math.sin(time * 0.5) * 0.015;

      glowRef.current.material.opacity =
        0.12 + Math.sin(time * 2.2) * 0.035;
    }

    // ==========================================
    // OUTER WIRE RING — FASTEST
    // ==========================================
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 1.8;
      outerRef.current.rotation.x -= delta * 0.12;
    }
  });

  return (
    <Float
      speed={0.65}
      rotationIntensity={0.025}
      floatIntensity={0.08}
      floatingRange={[-0.035, 0.035]}
    >
      <group
        position={position}
        scale={scale}
      >

        {/* =====================================
            MAIN TORUS — LARGER
        ===================================== */}
        <mesh
          ref={mainRef}
          rotation={[0.92, 0, -0.38]}
          scale={1.28}
        >
          <torusGeometry
            args={[
              1.05,
              0.145,
              64,
              192,
            ]}
          />

          <meshStandardMaterial
            color="#20dff2"
            emissive="#0bbcd5"
            emissiveIntensity={2.8}
            roughness={0.18}
            metalness={0.35}
          />
        </mesh>


        {/* =====================================
            SOFT CYAN GLOW — LARGER
        ===================================== */}
        <mesh
          ref={glowRef}
          rotation={[0.92, 0, -0.38]}
          scale={1.32}
        >
          <torusGeometry
            args={[
              1.05,
              0.17,
              48,
              160,
            ]}
          />

          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.13}
            wireframe
          />
        </mesh>


        {/* =====================================
            OUTER ENERGY RING — LARGER
        ===================================== */}
        <mesh
          ref={outerRef}
          rotation={[0.92, 0, -0.38]}
          scale={1.37}
        >
          <torusGeometry
            args={[
              1.05,
              0.018,
              24,
              160,
            ]}
          />

          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.5}
          />
        </mesh>


        {/* =====================================
            INNER ENERGY RING — LARGER
        ===================================== */}
        <mesh
          rotation={[0.92, 0, -0.38]}
          scale={1.08}
        >
          <torusGeometry
            args={[
              1.05,
              0.012,
              20,
              128,
            ]}
          />

          <meshBasicMaterial
            color="#c026d3"
            transparent
            opacity={0.35}
          />
        </mesh>

      </group>
    </Float>
  );
}