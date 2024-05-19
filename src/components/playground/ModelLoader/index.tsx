import { useFBX } from '@react-three/drei';

import { modelEntensions } from "@/constants/models";

type ModelLoaderType = {
    url: string;
    extension: typeof modelEntensions[number];
    scale?: number[];
}

export const ModelLoader: React.FC<ModelLoaderType> = ({ url, extension, scale }) => {
    const fbx = useFBX(url);
    return (
        <primitive object={fbx} scale={scale} />
    );
}