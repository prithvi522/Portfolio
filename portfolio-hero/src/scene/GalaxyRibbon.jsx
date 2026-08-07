import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 2200;

export default function GalaxyRibbon() {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const progress = new Float32Array(PARTICLE_COUNT);
    const offsets = new Float32Array(PARTICLE_COUNT);

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const t = index / (PARTICLE_COUNT - 1);
      const lane = (index % 9) - 4;
      const angle = t * Math.PI * 4.8 + lane * 0.18;
      const laneOffset = lane * 0.038;
      const radius = 0.82 + t * 2.2;
      const wave = Math.sin(t * Math.PI * 3.2) * 0.34;

      positions[index * 3] = -2.8 + t * 5.58 + Math.cos(angle) * 0.13;
      positions[index * 3 + 1] = -1.48 + t * 3.12 + wave + laneOffset;
      positions[index * 3 + 2] = -1.76 + Math.sin(angle) * radius * 0.18 + laneOffset;
      progress[index] = t;
      offsets[index] = Math.random();
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    bufferGeometry.setAttribute("aProgress", new THREE.BufferAttribute(progress, 1));
    bufferGeometry.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));
    return bufferGeometry;
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color("#2bcbff") },
        uColorB: { value: new THREE.Color("#7b63ff") },
        uColorC: { value: new THREE.Color("#ff3cf7") },
      },
      vertexShader: `
        attribute float aProgress;
        attribute float aOffset;
        varying float vProgress;
        varying float vAlpha;
        uniform float uTime;

        void main() {
          vec3 transformed = position;
          float flow = sin((aProgress * 16.0) - (uTime * 0.75) + (aOffset * 6.2831));
          transformed.y += flow * 0.045;
          transformed.z += cos((aProgress * 12.0) + (uTime * 0.45)) * 0.045;

          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
          gl_PointSize = (18.0 + flow * 3.0) * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          vProgress = aProgress;
          vAlpha = 0.35 + smoothstep(0.0, 0.18, aProgress) * smoothstep(1.0, 0.78, aProgress) * 0.65;
        }
      `,
      fragmentShader: `
        varying float vProgress;
        varying float vAlpha;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float circle = 1.0 - smoothstep(0.18, 0.5, length(uv));
          vec3 color = mix(uColorA, uColorB, smoothstep(0.0, 0.58, vProgress));
          color = mix(color, uColorC, smoothstep(0.54, 1.0, vProgress));
          gl_FragColor = vec4(color, circle * vAlpha);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    if (pointsRef.current) {
      const elapsed = state.clock.elapsedTime;
      pointsRef.current.rotation.z = -0.11 + Math.sin(elapsed * 0.1) * 0.04;
      pointsRef.current.rotation.y = -0.16 + Math.sin(elapsed * 0.09) * 0.035;
      pointsRef.current.position.y = Math.sin(elapsed * 0.16) * 0.055;
    }
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      position={[0.06, 0.08, -0.42]}
      rotation={[0.03, -0.16, -0.11]}
      onUpdate={() => {
        materialRef.current = material;
      }}
    />
  );
}
