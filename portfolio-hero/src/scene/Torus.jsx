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
  const innerRef = useRef(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    /* ==========================================
       MAIN RING
       Smooth continuous rotation
    ========================================== */

    if (mainRef.current) {
      mainRef.current.rotation.y += delta * 1.15;

      mainRef.current.rotation.x =
        0.92 +
        Math.sin(time * 0.65) * 0.035;

      mainRef.current.rotation.z =
        -0.38 +
        Math.cos(time * 0.45) * 0.025;
    }


    /* ==========================================
       CYAN GLOW RING
       Smooth counter rotation
    ========================================== */

    if (glowRef.current) {
      glowRef.current.rotation.y -= delta * 0.85;

      glowRef.current.rotation.x =
        0.92 +
        Math.sin(time * 0.55 + 1.5) * 0.025;

      glowRef.current.rotation.z =
        -0.38 +
        Math.cos(time * 0.4 + 1) * 0.02;

      /* Smooth glow pulse */
      glowRef.current.material.opacity =
        0.10 +
        Math.sin(time * 1.8) * 0.035;
    }


    /* ==========================================
       OUTER ENERGY RING
       Faster but still smooth
    ========================================== */

    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 1.45;

      outerRef.current.rotation.x =
        0.92 +
        Math.sin(time * 0.35) * 0.04;

      outerRef.current.rotation.z =
        -0.38 +
        Math.cos(time * 0.3) * 0.025;
    }


    /* ==========================================
       INNER ENERGY RING
       Slow counter movement
    ========================================== */

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.65;

      innerRef.current.rotation.x =
        0.92 +
        Math.cos(time * 0.5) * 0.025;

      innerRef.current.rotation.z =
        -0.38 +
        Math.sin(time * 0.4) * 0.02;
    }
  });


  return (
    <Float
      speed={0.55}
      rotationIntensity={0.018}
      floatIntensity={0.055}
      floatingRange={[-0.025, 0.025]}
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
            SOFT CYAN GLOW
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
            OUTER ENERGY RING
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
            INNER ENERGY RING
        ===================================== */}

        <mesh
          ref={innerRef}
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