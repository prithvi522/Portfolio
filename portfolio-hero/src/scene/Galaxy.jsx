import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Galaxy() {
  const groupRef = useRef();

  /*
   * ==========================================
   * GALAXY TIMING
   * ==========================================
   *
   * Increase these numbers = slower animation
   *
   * 8   = fast
   * 15  = medium
   * 25  = slow
   * 40  = very slow / cinematic
   */

  const ROTATION_TIME = 40;
  const FLOW_TIME = 18;
  const WAVE_TIME = 12;

  const particles = useMemo(() => {
    const count = 6500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color("#22d3ee");
    const color2 = new THREE.Color("#6366f1");
    const color3 = new THREE.Color("#d946ef");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const t = Math.random();
      const angle = t * Math.PI * 2;

      /*
       * Large flowing ribbon shape
       */
      const radius =
        1.2 +
        Math.random() * 3.5;

      const wave =
        Math.sin(angle * 2.2) * 0.75 +
        Math.sin(angle * 4.0) * 0.3;

      const x =
        Math.cos(angle) * radius;

      const z =
        Math.sin(angle) * radius;

      const y =
        wave +
        (Math.random() - 0.5) * 0.18;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      /*
       * Cyan → blue → purple
       */
      const colorT = Math.random();

      let color;

      if (colorT < 0.45) {
        color = color1.clone().lerp(
          color2,
          colorT / 0.45
        );
      } else {
        color = color2.clone().lerp(
          color3,
          (colorT - 0.45) / 0.55
        );
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return {
      positions,
      colors,
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const elapsed = state.clock.elapsedTime;

    /*
     * ==========================================
     * MAIN GALAXY ROTATION
     * ==========================================
     *
     * 40 seconds for one complete rotation.
     */
    groupRef.current.rotation.y =
      (elapsed / ROTATION_TIME) *
      Math.PI *
      2;

    /*
     * ==========================================
     * SLOW VERTICAL MOTION
     * ==========================================
     */
    groupRef.current.position.y =
      Math.sin(
        (elapsed / WAVE_TIME) *
          Math.PI *
          2
      ) * 0.08;

    /*
     * ==========================================
     * VERY SUBTLE SIDE MOVEMENT
     * ==========================================
     */
    groupRef.current.position.x =
      Math.sin(
        (elapsed / FLOW_TIME) *
          Math.PI *
          2
      ) * 0.12;
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, -0.8]}
      rotation={[0.15, 0, -0.18]}
      scale={1.18}
    >
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />

          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.82}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}