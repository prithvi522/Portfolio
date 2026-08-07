import { Stars as DreiStars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Stars() {
  const starsRef = useRef(null);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
      starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.025;
    }
  });

  return (
    <group ref={starsRef} position={[0.8, 0.1, -1.6]}>
      <DreiStars radius={8} depth={4} count={520} factor={2.4} saturation={0.6} fade speed={0.18} />
    </group>
  );
}
