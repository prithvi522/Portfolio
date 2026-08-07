import { EffectComposer, Bloom as BloomEffect } from "@react-three/postprocessing";


export default function Bloom(){

return (
    <EffectComposer>
        <BloomEffect
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
        />
    </EffectComposer>
);

}