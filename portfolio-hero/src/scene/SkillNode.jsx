import { Float, Text } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SkillNode({
  name,
  position,
  color = "#22d3ee",
}) {

  const groupRef = useRef();

  useFrame((state) => {

    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    groupRef.current.rotation.y =
      Math.sin(time * 0.7 + position[0]) * 0.15;

    groupRef.current.rotation.x =
      Math.cos(time * 0.5 + position[1]) * 0.08;

  });


  return (

    <Float
      speed={1.2}
      rotationIntensity={0.15}
      floatIntensity={0.25}
    >

      <group
        ref={groupRef}
        position={position}
      >

        {/* =================================
            GLOW BACK PLANE
        ================================= */}

        <mesh scale={[1.15, 0.58, 0.05]}>

          <planeGeometry args={[1, 1]} />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.06}
          />

        </mesh>


        {/* =================================
            GLASS CARD
        ================================= */}

        <mesh>

          <boxGeometry
            args={[
              1.65,
              0.65,
              0.08,
            ]}
          />

          <meshPhysicalMaterial
            color="#080b20"
            transparent
            opacity={0.82}
            roughness={0.18}
            metalness={0.35}
            transmission={0.15}
            emissive={color}
            emissiveIntensity={0.12}
          />

        </mesh>


        {/* =================================
            CARD BORDER
        ================================= */}

        <mesh position={[0, 0, 0.055]}>

          <boxGeometry
            args={[
              1.68,
              0.68,
              0.025,
            ]}
          />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.45}
            wireframe
          />

        </mesh>


        {/* =================================
            TEXT
        ================================= */}

        <Text
          position={[0, 0, 0.12]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>

      </group>

    </Float>
  );
}