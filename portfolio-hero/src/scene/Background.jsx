import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function Background() {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color("#02030d");

    return () => {
      scene.background = null;
    };
  }, [scene]);

  return null;
}