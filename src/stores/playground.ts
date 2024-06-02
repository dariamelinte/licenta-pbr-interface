import type { StateCreator } from "zustand";

import { PlaygroundStoreType } from "@/types/store/playground";
import { INITIAL_LINKAGE } from "@/constants/initial-objects";
import { getCameraPerspective } from "@/constants/constants";
import { ObjectInstanceApiType } from "@/types/common/objectInstance";
import { toast } from "react-toastify";

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
    linkages: [],

    setFocusedAxe: (focusedAxe) =>
      set({
        playground: {
          ...get().playground,
          focusedAxe,
          linkages: [...get().playground.linkages],
          objectInstances: {...get().playground.objectInstances}
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

    addConnectionPoint: (connectionPoint) => {
      const linkages = [...get().playground.linkages];
      const { first_connection, second_connection } =
        linkages[linkages.length - 1] || {};

      if ((first_connection && second_connection) || linkages.length === 0) {
        console.log("first case");
        set({
          playground: {
            ...get().playground,
            linkages: [
              ...linkages,
              { ...INITIAL_LINKAGE, first_connection: connectionPoint },
            ],
          },
        });
        return;
      }

      linkages[linkages.length - 1] = {
        first_connection,
        second_connection: connectionPoint,
        distance: [0, 0, 0], //TODO: calculate value
        angle: [0, 0, 0], //TODO: calculate value
      };

      console.log({ linkages });

      // it means only one connection point is added
      if (first_connection?.instance === connectionPoint.instance) {
        linkages.pop();
        set({ playground: { ...get().playground, linkages } });
        console.log("Cannot link an object to itself");
        toast.error("Cannot link an object to itself");
        return;
      }

      console.log("last case");
      set({ playground: { ...get().playground, linkages } });
    },

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
