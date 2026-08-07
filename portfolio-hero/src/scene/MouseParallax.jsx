import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function MouseParallax({ groupRef, strength = 0.16 }) {
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef?.current) {
      return;
    }

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * strength,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * strength * 0.5,
      0.04
    );
  });

  return null;
}
