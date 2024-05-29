import { coordinatesAxes } from "@/constants/constants";
import { ObjectInstanceApiType } from "@/types/common/objectInstance";
import { CoordinatesObjectType, PointType } from "@/types/common/playground";

export type PlaygroundStoreType = {
  playground: {
    focusedAxe: keyof typeof coordinatesAxes;
    cameraPerspective: number[];
    objectInstances: { [key: string]: ObjectInstanceApiType };
    scale: number;

    setScale: (scale: number) => void;
    setFocusedAxe: (focusedAxe: keyof typeof coordinatesAxes) => void;
    setCameraPerspective: (cameraPerspective: number[]) => void;
    addObjectInstance: (id: string, objectModelId: string) => void;
    changeObjectInstancePosition: (id: string, position: CoordinatesObjectType<PointType>) => void;
  };
};
