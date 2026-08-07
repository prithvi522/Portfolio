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

      // Very subtle natural movement
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

      // Pulsing glow
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
            MAIN TORUS
        ===================================== */}
        <mesh
          ref={mainRef}
          rotation={[0.92, 0, -0.38]}
        >
          <torusGeometry
            args={[
              0.9,
              0.13,
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
            SOFT CYAN GLOW
        ===================================== */}
        <mesh
          ref={glowRef}
          rotation={[0.92, 0, -0.38]}
          scale={1.045}
        >
          <torusGeometry
            args={[
              0.9,
              0.155,
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
            OUTER ENERGY RING
        ===================================== */}
        <mesh
          ref={outerRef}
          rotation={[0.92, 0, -0.38]}
          scale={1.085}
        >
          <torusGeometry
            args={[
              0.9,
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
            INNER ENERGY RING
        ===================================== */}
        <mesh
          rotation={[0.92, 0, -0.38]}
          scale={0.88}
        >
          <torusGeometry
            args={[
              0.9,
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