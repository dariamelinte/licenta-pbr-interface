import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

import { ModelLoader } from "../ModelLoader";
import useStore from "@/stores";

type ModelViewProps = {
  model: string;
  disableControls?: boolean;
  width?: number;
  height?: number;
  defaultScale?: number[];
};

export const ModelView: React.FC<ModelViewProps> = ({
  model,
  disableControls,
  width,
  height,
  defaultScale,
}) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [boundingBox, setBoundingBox] = useState<THREE.Box3 | null>(null);
  const [scale, setScale] = useState<number[]>(defaultScale || [1, 1, 1]);
  const { focusedAxe } = useStore((state) => state.playground);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

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

    return () => URL.revokeObjectURL(url);
  }, [model, setModelUrl]);

  const handleBoundingBoxCalculated = (box: THREE.Box3) => {
    setBoundingBox(box);
  };

  useEffect(() => {
    if (boundingBox) {
      const size = new THREE.Vector3();
      boundingBox.getSize(size);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);

      // Adjust the scale based on the bounding box size
      const scaleFactor = Math.max(size.x, size.y, size.z);
      setScale([scaleFactor / 100, scaleFactor / 100, scaleFactor / 100]);

      if (cameraRef.current) {
        const camera = cameraRef.current;

        // Calculate the distance and adjust the field of view
        const distance = scaleFactor * 1.5;
        const fov = 2 * Math.atan(size.y / (2 * distance)) * (180 / Math.PI);

        // Set camera position based on the focused axis
        switch (focusedAxe) {
          case "ox":
            camera.position.set(distance, center.y, center.z);
            break;
          case "oy":
            camera.position.set(center.x, distance, center.z);
            break;
          case "oz":
            camera.position.set(center.x, center.y, distance);
            break;
        }

        camera.lookAt(center);
        camera.fov = fov;
        camera.updateProjectionMatrix();

        console.log({ boundingBox, size, center, distance, fov, focusedAxe });
      }
    }
  }, [boundingBox, focusedAxe]);

  return (
    <Canvas style={{ width: width || '100%', height: height || '100%' }}>
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 10]} intensity={4} />
      <directionalLight position={[-5, 5, 5]} intensity={4} />
      <spotLight position={[15, 20, 5]} angle={0.3} intensity={4} castShadow />
      {modelUrl && (
        <ModelLoader
          url={modelUrl}
          extension=".fbx"
          scale={scale}
          onBoundingBoxCalculated={handleBoundingBoxCalculated}
        />
      )}
      <OrbitControls
        enableRotate={!disableControls}
        enableZoom={!disableControls}
        enableDamping={!disableControls}
        enablePan={!disableControls}
        enabled={!disableControls}
      />
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
      />
    </Canvas>
  );
};
