import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

import { ModelLoader } from "../ModelLoader";
import useStore from "@/stores";
import { getCameraPerspective } from "@/constants/constants";

type ModelViewProps = {
  model: string;
  disableControls?: boolean;
};

export const ModelView: React.FC<ModelViewProps> = ({
  model,
  disableControls,
}) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [boundingBox, setBoundingBox] = useState<THREE.Box3 | null>(null);

  const { focusedAxe } = useStore((state) => state.playground);

  useEffect(() => {
    const binaryString = window.atob(model);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    setModelUrl(url);

    // Cleanup the URL object when the component unmounts
    return () => URL.revokeObjectURL(url);
  }, [model, setModelUrl]);
  
  const handleBoundingBoxCalculated = (box: THREE.Box3) => {
    setBoundingBox(box);
    console.log("Bounding Box:", box.min, box.max, box);
  };

  return (
    <Canvas>
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <directionalLight position={[-5, 5, 5]} intensity={2} />
      <spotLight position={[15, 20, 5]} angle={0.3} intensity={2} castShadow />
      {modelUrl && (
        <ModelLoader
          url={modelUrl}
          extension=".fbx"
          scale={[0.08, 0.08, 0.08]}
          onBoundingBoxCalculated={handleBoundingBoxCalculated}
        />
      )}
      <OrbitControls enabled={disableControls} />
      <PerspectiveCamera position={getCameraPerspective(focusedAxe)} manual={false} />
    </Canvas>
  );
};
