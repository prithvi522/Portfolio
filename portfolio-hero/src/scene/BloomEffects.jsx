import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

export default function BloomEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.78}
        luminanceThreshold={0.18}
        luminanceSmoothing={0.72}
        mipmapBlur
        kernelSize={KernelSize.MEDIUM}
      />
      <Vignette blendFunction={BlendFunction.NORMAL} eskil={false} offset={0.22} darkness={0.58} />
    </EffectComposer>
  );
}
