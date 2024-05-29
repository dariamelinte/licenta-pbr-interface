import type { StateCreator } from "zustand";

import { PlaygroundStoreType } from "@/types/store/playground";
import { getCameraPerspective } from "@/constants/constants";
import { ObjectInstanceApiType } from "@/types/common/objectInstance";

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
    scale: 1,

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

    setScale: (scale) =>
      set({
        playground: {
          ...get().playground,
          scale,
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
              position: {
                ox: { x: 0, y: 0 },
                oy: { x: 0, y: 0 },
                oz: { x: 0, y: 0 },
              },
            },
          },
        },
      }),

    changeObjectInstancePosition: (id, position) => {
      set({
        playground: {
          ...get().playground,
          objectInstances: {
            ...get().playground.objectInstances,
            [id]: {
              ...(get().playground.objectInstances[
                id
              ] as ObjectInstanceApiType),
              position,
            },
          },
        },
      });
    },
  },
});
