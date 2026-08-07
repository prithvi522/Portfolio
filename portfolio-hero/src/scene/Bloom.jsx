import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function BloomEffect() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={1.25}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.85}
        mipmapBlur
      />
    </EffectComposer>
  );
}