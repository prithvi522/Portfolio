export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.18} />

      <pointLight
        position={[0, 1, 3]}
        intensity={8}
        distance={8}
        color="#00c8ff"
      />

      <pointLight
        position={[2, 1, 2]}
        intensity={10}
        distance={7}
        color="#a855f7"
      />

      <pointLight
        position={[-2, -1, 2]}
        intensity={5}
        distance={6}
        color="#3867ff"
      />
    </>
  );
}