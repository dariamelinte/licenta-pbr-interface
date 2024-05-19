import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { ObjectModelApiType } from "@/types/common/api";

import { ModelLoader } from "../ModelLoader";
import styles from "./ModelView.module.css";
import { Button } from "@/components/common";
import { Plus } from "@/components/icons";

type ModelViewProps = {
  objectModel: ObjectModelApiType;
};

export const ModelView: React.FC<ModelViewProps> = ({ objectModel }) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    const binaryString = window.atob(objectModel.model);
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
  }, [objectModel.model, setModelUrl]);

  return (
    <>
      <div className={styles.info}>
        <p className={styles.title}>{objectModel.name}</p>
        <Button className={styles.button} icon={<Plus className={styles.icon} />} onClick={() => console.log({ objectModel})} />
      </div>
      <Canvas>
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <directionalLight position={[-5, 5, 5]} intensity={2} />
        <spotLight position={[15, 20, 5]} angle={0.3} intensity={2} castShadow />
        {modelUrl && <ModelLoader url={modelUrl} extension=".fbx" scale={[0.06, 0.06, 0.06]} />}
        <OrbitControls />
      </Canvas>
    </>
  );
};
