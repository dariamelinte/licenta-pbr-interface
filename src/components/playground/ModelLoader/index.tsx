import { useFBX } from '@react-three/drei';
import React, { useEffect } from 'react';
import * as THREE from 'three';

type ModelLoaderType = {
  url: string;
  scale?: number[];
  rotation?: number[];

  onBoundingBoxCalculated?: (boundingBox: THREE.Box3) => void;
};

export const ModelLoader: React.FC<ModelLoaderType> = ({
  url,
  rotation,
  scale,
  onBoundingBoxCalculated,
}) => {
  const fbx = useFBX(url);

  useEffect(() => {
    if (fbx) {
      const boundingBox = new THREE.Box3().setFromObject(fbx);
      onBoundingBoxCalculated?.(boundingBox);
    }
  }, [fbx, onBoundingBoxCalculated]);

  return <primitive object={fbx} scale={scale} rotation={rotation} />;
};
