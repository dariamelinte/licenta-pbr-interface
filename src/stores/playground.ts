import { toast } from 'react-toastify';
import type { StateCreator } from 'zustand';

import { getCameraPerspective } from '@/constants/constants';
import type { ObjectInstanceType } from '@/types/common/objectInstance';
import type { PlaygroundStoreType } from '@/types/store/playground';

export const playgroundSlice: StateCreator<
  PlaygroundStoreType,
  [],
  [],
  PlaygroundStoreType
> = (set, get) => ({
  playground: {
    focusedAxe: 'oz',
    instances: {},
    cameraPerspective: getCameraPerspective('oz'),
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

    setLinkages: (linkages) =>
      set({
        playground: {
          ...get().playground,
          linkages,
        },
      }),

    addObjectInstance: (id, objectModelId, position) =>
      set({
        playground: {
          ...get().playground,
          instances: {
            ...get().playground.instances,
            [id]: {
              uuid: id,
              object_model: objectModelId,
              position: {
                ox: position,
                oy: position,
                oz: position,
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
        toast.error('Cannot link an object to itself');
        return;
      }

      set({ playground: { ...get().playground, linkages } });
    },

    changeObjectInstancePosition: (id, position) => {
      // console.log({ id, position, axis: get().playground.focusedAxe})
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
          !(f?.uuid === first && s?.uuid === second) &&
          !(f?.uuid === second && s?.uuid === second),
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
          focusedAxe: 'oz',
          instances: {},
          cameraPerspective: getCameraPerspective('oz'),
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

    removeInstance: (id) => {
      const { instances, linkages } = get().playground;

      const updatedInstances = { ...instances };
      delete updatedInstances[id];

      const updatedLinkages = linkages.filter(
        ({ first_connection, second_connection }) =>
          first_connection?.instance !== id &&
          second_connection?.instance !== id,
      );

      set({
        playground: {
          ...get().playground,
          instances: updatedInstances,
          linkages: updatedLinkages,
        },
      });
    },
  },
});
