import { coordinatesAxes } from "@/constants/constants";
import { ObjectInstanceApiType } from "@/types/common/objectInstance";
import { CoordinatesObjectType, PointType } from "@/types/common/playground";
import { ConnectionPointType } from "@/types/common/connectionPoint";
import { LinkageType } from "@/types/common/linkage";

export type PlaygroundStoreType = {
  playground: {
    focusedAxe: keyof typeof coordinatesAxes;
    cameraPerspective: number[];
    objectInstances: { [key: string]: ObjectInstanceApiType };
    scale: number;
    linkages: LinkageType[];

    setScale: (scale: number) => void;
    setFocusedAxe: (focusedAxe: keyof typeof coordinatesAxes) => void;
    setCameraPerspective: (cameraPerspective: number[]) => void;
    addObjectInstance: (id: string, objectModelId: string) => void;
    addConnectionPoint: (connectionPoint: ConnectionPointType) => void;
    changeObjectInstancePosition: (id: string, position: CoordinatesObjectType<PointType>) => void;
  };
};
