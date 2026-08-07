import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Crystal({
  position = [0, 0, 0],
  scale = 1,
  color = "#86e7ff",
  accent = "#b98cff",
  floatOffset = 0,
}) {
  const groupRef = useRef(null);

  const crystalGeometry = useMemo(() => {
    const geometry = new THREE.ConeGeometry(0.48, 1.58, 6, 1);
    geometry.translate(0, -0.16, 0);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const capGeometry = useMemo(() => {
    const geometry = new THREE.OctahedronGeometry(0.46, 0);
    geometry.scale(0.82, 0.34, 0.82);
    geometry.translate(0, 0.64, 0);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime + floatOffset;
    groupRef.current.rotation.y = Math.sin(elapsed * 0.34) * 0.34;
    groupRef.current.rotation.z = Math.sin(elapsed * 0.27) * 0.08;
  });

  return (
    <Float speed={1.05} rotationIntensity={0.18} floatIntensity={0.28} floatingRange={[-0.08, 0.08]}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh castShadow receiveShadow geometry={crystalGeometry}>
          <meshPhysicalMaterial
            color={color}
            emissive={accent}
            emissiveIntensity={0.16}
            roughness={0.18}
            metalness={0.08}
            transmission={0.18}
            thickness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.14}
            flatShading
          />
        </mesh>

        <mesh castShadow geometry={capGeometry} rotation={[0, Math.PI / 6, 0]}>
          <meshPhysicalMaterial
            color={accent}
            emissive={color}
            emissiveIntensity={0.14}
            roughness={0.22}
            metalness={0.12}
            transmission={0.12}
            clearcoat={1}
            flatShading
          />
        </mesh>

        <mesh scale={[1.04, 1.04, 1.04]} geometry={crystalGeometry}>
          <meshBasicMaterial color={accent} transparent opacity={0.08} wireframe />
        </mesh>
      </group>
    </Float>
  );
}
