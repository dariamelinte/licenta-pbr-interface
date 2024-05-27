import type { StateCreator } from "zustand";

import { PlaygroundStoreType } from "@/types/store/playground";
import { getCameraPerspective } from "@/constants/constants";

export const playgroundSlice: StateCreator<
  PlaygroundStoreType,
  [],
  [],
  PlaygroundStoreType
> = (set, get) => ({
  playground: {
    focusedAxe: "ox",
    objectInstances: {},
    cameraPerspective: getCameraPerspective("ox"),

    setFocusedAxe: (focusedAxe) =>
      set({
        playground: {
          ...get().playground,
          focusedAxe,
        },
      }),

    setCameraPerspective: (cameraPerspective) =>
      set({
        playground: {
          ...get().playground,
          cameraPerspective,
        },
      }),

    addObjectInstance: (id, objectModelId) =>
      set({
        playground: {
          ...get().playground,
          objectInstances: {
            ...get().playground.objectInstances,
            [id]: {
              _id: id,
              _id_object_model: objectModelId,
              rotation: [0, 0, 0],
            },
          },
        },
      }),
  },
});
