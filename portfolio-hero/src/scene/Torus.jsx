import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Torus({ position = [0, 0, 0] }) {
  const torusRef = useRef(null);
  const glowRef = useRef(null);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    if (torusRef.current) {
      torusRef.current.rotation.x = 0.92 + Math.sin(elapsed * 0.18) * 0.05;
      torusRef.current.rotation.y += 0.0028;
      torusRef.current.rotation.z = -0.38 + Math.sin(elapsed * 0.12) * 0.04;
    }

    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.0018;
      glowRef.current.material.opacity = 0.12 + Math.sin(elapsed * 0.7) * 0.025;
    }
  });

  return (
    <Float speed={0.85} rotationIntensity={0.08} floatIntensity={0.16} floatingRange={[-0.06, 0.06]}>
      <group position={position} scale={0.82}>
        <mesh ref={torusRef} castShadow receiveShadow>
          <torusGeometry args={[0.9, 0.13, 48, 160]} />
          <meshPhysicalMaterial
            color="#211c62"
            emissive="#4e34ff"
            emissiveIntensity={0.18}
            roughness={0.28}
            metalness={0.72}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>

        <mesh ref={glowRef} rotation={[0.92, 0, -0.38]} scale={1.035}>
          <torusGeometry args={[0.9, 0.145, 36, 128]} />
          <meshBasicMaterial color="#2bcbff" transparent opacity={0.13} wireframe />
        </mesh>
      </group>
    </Float>
  );
}
