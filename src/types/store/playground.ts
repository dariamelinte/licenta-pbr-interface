import type { coordinatesAxes } from '@/constants/constants';
import type { ConnectionPointType } from '@/types/common/connectionPoint';
import type { LinkageType } from '@/types/common/linkage';
import type { ObjectInstanceType } from '@/types/common/objectInstance';
import type {
  BoardType,
  CoordinatesObjectType,
  PointType,
} from '@/types/common/playground';

export type PlaygroundStoreType = {
  playground: {
    focusedAxe: keyof typeof coordinatesAxes;
    cameraPerspective: number[];
    instances: { [key: string]: ObjectInstanceType };
    scale: number;
    linkages: LinkageType[];

    setScale: (scale: number) => void;
    setFocusedAxe: (focusedAxe: keyof typeof coordinatesAxes) => void;
    setCameraPerspective: (cameraPerspective: number[]) => void;
    addObjectInstance: (id: string, objectModelId: string, position: PointType) => void;
    addConnectionPoint: (connectionPoint: ConnectionPointType) => void;
    changeObjectInstancePosition: (
      id: string,
      position: CoordinatesObjectType<PointType>,
    ) => void;
    removeLinkage: (first: string, second: string) => void;
    removeInstance: (id: string) => void;
    resetPlayground: () => void;
    loadPlayground: (board: BoardType) => void;
  };
};
