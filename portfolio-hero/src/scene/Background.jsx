import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Background() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.025;
    }
  });

  return (
    <mesh ref={meshRef} position={[0.8, 0, -4.6]} scale={[8.2, 8.2, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial color="#0b0a2b" transparent opacity={0.34} depthWrite={false} />
    </mesh>
  );
}
