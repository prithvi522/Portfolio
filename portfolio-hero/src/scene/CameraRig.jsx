import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export default function CameraRig() {
  const { camera, pointer } = useThree();
  const lookTarget = useMemo(() => new THREE.Vector3(0.28, -0.04, 0), []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const targetX = 3.35 + pointer.x * 0.28;
    const targetY = 1.28 + pointer.y * 0.18 + Math.sin(elapsed * 0.22) * 0.035;
    const targetZ = 7.2;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.045);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.045);
    camera.lookAt(lookTarget);
  });

  return null;
}
