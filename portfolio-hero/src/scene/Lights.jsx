export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} color="#7766ff" />

      <directionalLight
        castShadow
        color="#9b7cff"
        intensity={2.45}
        position={[2.8, 4.2, 3.2]}
        shadow-mapSize={[1024, 1024]}
      />

      <pointLight color="#2bcbff" intensity={3.2} distance={9} position={[-3.35, 1.25, 2.4]} />
      <pointLight color="#ff3cf7" intensity={2.2} distance={7} position={[3.25, -1.8, 1.8]} />
      <pointLight color="#6d5cff" intensity={1.75} distance={8} position={[0.2, 2.6, -2.6]} />

      <spotLight
        color="#71e5ff"
        intensity={2.1}
        angle={0.45}
        penumbra={0.8}
        distance={10}
        position={[-2.8, 3.4, 4.6]}
      />
    </>
  );
}
