import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

import SkillNode from "./SkillNode";


const skills = [
  {
    name: "React",
    position: [0, 2.2, 0],
    color: "#22d3ee",
  },
  {
    name: "JavaScript",
    position: [1.9, 1.1, 0.4],
    color: "#facc15",
  },
  {
    name: "Python",
    position: [2.1, -0.8, 0],
    color: "#3b82f6",
  },
  {
    name: "Node.js",
    position: [0.8, -2.0, 0.3],
    color: "#22c55e",
  },
  {
    name: "MongoDB",
    position: [-1.4, -1.6, 0],
    color: "#22c55e",
  },
  {
    name: "Three.js",
    position: [-2.1, 0, 0.4],
    color: "#ffffff",
  },
  {
    name: "Git",
    position: [-1.5, 1.55, 0],
    color: "#f97316",
  },
  {
    name: "AI",
    position: [0, 0, 1.5],
    color: "#a855f7",
  },
];


function SphereCore() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.18;

    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.08;

    groupRef.current.rotation.z =
      Math.cos(state.clock.elapsedTime * 0.18) * 0.04;
  });

  return (
    <group
      ref={groupRef}
      position={[2.5, 0, 0]}
    >
      {/* MAIN ENERGY SPHERE */}
      <mesh>
        <sphereGeometry args={[2.35, 64, 64]} />

        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.035}
          wireframe
        />
      </mesh>

      {/* INNER GLOW */}
      <mesh>
        <sphereGeometry args={[2.15, 48, 48]} />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.025}
          wireframe
        />
      </mesh>

      {/* SKILL NODES */}
      {skills.map((skill) => (
        <SkillNode
          key={skill.name}
          name={skill.name}
          position={skill.position}
          color={skill.color}
        />
      ))}

      {/* ORBIT RINGS */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.65, 0.012, 16, 160]} />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh rotation={[0.65, 0.25, 0]}>
        <torusGeometry args={[2.85, 0.009, 16, 160]} />

        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh rotation={[1.15, -0.3, 0.5]}>
        <torusGeometry args={[3.05, 0.006, 12, 160]} />

        <meshBasicMaterial
          color="#c026d3"
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}

export default function SkillSphere() {

  return (

    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 45,
      }}

      dpr={[1, 1.5]}

      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >

      <ambientLight intensity={0.4} />

      <SphereCore />

      <Sparkles
        count={90}
        scale={[8, 6, 5]}
        size={1.4}
        speed={0.25}
      />

    </Canvas>

  );
}