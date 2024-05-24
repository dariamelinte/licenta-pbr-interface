import type { StateCreator } from "zustand";

import { PlaygroundStoreType } from "@/types/store/playground";

export const playgroundSlice: StateCreator<
  PlaygroundStoreType,
  [],
  [],
  PlaygroundStoreType
> = (set, get) => ({
  playground: {
    focusedAxe: "ox",
    objectInstances: {},

    setFocusedAxe: (focusedAxe) =>
      set({
        playground: {
          ...get().playground,
          focusedAxe,
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
