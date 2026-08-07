import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 96;

export default function OrbitParticles() {
  const meshRef = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, (_, index) => {
      const progress = index / COUNT;
      return {
        angle: progress * Math.PI * 2,
        radius: 1.9 + (index % 11) * 0.105,
        height: -1.2 + (index % 17) * 0.145,
        speed: 0.05 + (index % 9) * 0.006,
        size: 0.012 + (index % 5) * 0.004,
      };
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;

    particles.forEach((particle, index) => {
      const angle = particle.angle + elapsed * particle.speed;
      const wobble = Math.sin(elapsed * 0.42 + index) * 0.08;

      dummy.position.set(
        Math.cos(angle) * (particle.radius + wobble) + 0.36,
        particle.height + Math.sin(angle * 1.7) * 0.18,
        Math.sin(angle) * 0.62 - 0.34
      );
      dummy.scale.setScalar(particle.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, COUNT]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#9feaff" transparent opacity={0.72} />
    </instancedMesh>
  );
}
