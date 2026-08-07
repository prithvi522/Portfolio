import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function CameraRig() {
  const { camera } = useThree();

  const target = useRef({
    x: 0,
    y: 0,
  });

  useFrame((state) => {
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    target.current.x +=
      (mouseX * 0.16 -
        target.current.x) *
      0.025;

    target.current.y +=
      (mouseY * 0.10 -
        target.current.y) *
      0.025;

    camera.position.x =
      target.current.x;

    camera.position.y =
      target.current.y;

    camera.lookAt(0, 0, 0);
  });

  return null;
}