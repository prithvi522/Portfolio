import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function BloomEffects() {
  return (
    <EffectComposer
      multisampling={0}
      enableNormalPass={false}
    >
      <Bloom
        intensity={1.2}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.7}
        mipmapBlur
      />
    </EffectComposer>
  );
}