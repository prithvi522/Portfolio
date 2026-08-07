import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Crystal({
  position = [0, 0, 0],
  scale = 1,
}) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    groupRef.current.rotation.x =
      Math.sin(t * 0.45) * 0.18;

    groupRef.current.rotation.y += 0.004;

    groupRef.current.rotation.z =
      Math.sin(t * 0.32) * 0.12;
  });

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.35}
      floatIntensity={0.55}
      floatingRange={[-0.18, 0.18]}
    >
      <group
        ref={groupRef}
        position={position}
        scale={scale}
      >
        {/* Main crystal */}
        <mesh>
          <icosahedronGeometry args={[0.58, 1]} />

          <meshStandardMaterial
            color="#4f46e5"
            emissive="#6d28d9"
            emissiveIntensity={1.8}
            roughness={0.18}
            metalness={0.55}
            transparent
            opacity={0.94}
          />
        </mesh>

        {/* Inner glowing crystal */}
        <mesh scale={0.72}>
          <icosahedronGeometry args={[0.58, 1]} />

          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.16}
            wireframe
          />
        </mesh>

        {/* Outer energy shell */}
        <mesh scale={1.08}>
          <icosahedronGeometry args={[0.58, 1]} />

          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.12}
            wireframe
          />
        </mesh>

        {/* Small point light */}
        <pointLight
          color="#7c3aed"
          intensity={1.8}
          distance={3}
        />
      </group>
    </Float>
  );
}