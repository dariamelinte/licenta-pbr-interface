import { coordinatesAxes } from "@/constants/constants";
import { ObjectInstanceApiType } from "@/types/common/objectInstance";

export type PlaygroundStoreType = {
  playground: {
    focusedAxe?: keyof typeof coordinatesAxes;
    objectInstances: { [key: string]: ObjectInstanceApiType };

    setFocusedAxe: (focusedAxe?: keyof typeof coordinatesAxes) => void;
    addObjectInstance: (id: string, objectModelId: string) => void;
  };
};
