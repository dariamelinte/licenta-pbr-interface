import { useFBX } from "@react-three/drei";
import * as THREE from "three";
import React, { useEffect } from "react";

import { modelEntensions } from "@/constants/constants";

type ModelLoaderType = {
  url: string;
  extension: (typeof modelEntensions)[number];
  scale?: number[];

  onBoundingBoxCalculated?: (boundingBox: THREE.Box3) => void;
};

export const ModelLoader: React.FC<ModelLoaderType> = ({
  url,
  extension,
  scale,
//   onBoundingBoxCalculated,
}) => {
  const fbx = useFBX(url);

  useEffect(() => {
    if (fbx) {
      const boundingBox = new THREE.Box3().setFromObject(fbx);
      console.log({ boundingBox })
    //   onBoundingBoxCalculated?.(boundingBox);
    }
  }, [fbx]);

  return <primitive object={fbx} scale={scale} />;
};
