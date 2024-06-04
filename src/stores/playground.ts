import type { StateCreator } from "zustand";

import { PlaygroundStoreType } from "@/types/store/playground";
import { getCameraPerspective } from "@/constants/constants";
import { ObjectInstanceType } from "@/types/common/objectInstance";
import { toast } from "react-toastify";

export const playgroundSlice: StateCreator<
  PlaygroundStoreType,
  [],
  [],
  PlaygroundStoreType
> = (set, get) => ({
  playground: {
    focusedAxe: "ox",
    instances: {},
    cameraPerspective: getCameraPerspective("ox"),
    scale: 1,
    linkages: [],

    setFocusedAxe: (focusedAxe) =>
      set({
        playground: {
          ...get().playground,
          focusedAxe,
          linkages: [...get().playground.linkages],
          instances: { ...get().playground.instances },
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
          instances: {
            ...get().playground.instances,
            [id]: {
              uuid: id,
              object_model: objectModelId,
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
        set({
          playground: {
            ...get().playground,
            linkages: [...linkages, { first_connection: connectionPoint }],
          },
        });
        return;
      }

      linkages[linkages.length - 1] = {
        first_connection,
        second_connection: connectionPoint,
      };

      // it means only one connection point is added
      if (first_connection?.instance === connectionPoint.instance) {
        linkages.pop();
        set({ playground: { ...get().playground, linkages } });
        toast.error("Cannot link an object to itself");
        return;
      }

      set({ playground: { ...get().playground, linkages } });
    },

    changeObjectInstancePosition: (id, position) => {
      set({
        playground: {
          ...get().playground,
          instances: {
            ...get().playground.instances,
            [id]: {
              ...(get().playground.instances[id] as ObjectInstanceType),
              position,
            },
          },
        },
      });
    },

    removeLinkage: (first, second) => {
      const linkages = [...get().playground.linkages];

      const updatedLinkages = linkages.filter(
        ({ first_connection: f, second_connection: s }) =>
          (f?.instance === first && s?.instance === second) ||
          (f?.instance === second && s?.instance === second)
      );

      set({
        playground: {
          ...get().playground,
          linkages: updatedLinkages,
        },
      });
    },

    resetPlayground: () =>
      set({
        playground: {
          ...get().playground,
          focusedAxe: "ox",
          instances: {},
          cameraPerspective: getCameraPerspective("ox"),
          scale: 1,
          linkages: [],
        },
      }),

    loadPlayground: (board) =>
      set({
        playground: {
          ...get().playground,
          ...board,
        },
      }),
  },
});
