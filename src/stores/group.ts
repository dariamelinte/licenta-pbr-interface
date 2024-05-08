import { toast } from 'react-toastify';
import type { StateCreator } from 'zustand';

import { ERROR_MESSAGE } from '@/constants/messages';
import * as service from '@/services/api/group';
import type { GroupApiType } from '@/types/common/api';
import type { GroupStoreType } from '@/types/store/group';

export const groupSlice: StateCreator<
  GroupStoreType,
  [],
  [],
  GroupStoreType
> = (set, get) => ({
  group: {
    groups: [],
    loading: false,

    setLoading: (loading) =>
      set({
        group: {
          ...get().group,
          loading,
        },
      }),

    getGroups: async (accessToken) => {
      if (get().group.groups.length) {
        return;
      }

      try {
        get().group.setLoading(true);
        const { data } = await service.getGroups(accessToken);

        if (!data.success) throw Error(data.error);

        set({
          group: {
            ...get().group,
            groups: data.data,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      } finally {
        get().group.setLoading(false)
      }
    },

    getGroupById: async (accessToken, id) => {
      const group = get().group.groups.find(({ _id }) => _id === id);

      if (group) {
        return group;
      }

      try {
        get().group.setLoading(true)
        const {
          data: { success, data, error, message },
        } = await service.getGroupById(accessToken, id);

        if (!success) throw Error(error);

        set({
          group: {
            ...get().group,
            groups: [data],
          },
        });
        toast.info(message);

        get().group.setLoading(false)
        return data;
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
        get().group.setLoading(false)
        return null;
      }
    },

    deleteGroup: async (accessToken, id: string) => {
      try {
        const { data } = await service.deleteGroup(accessToken, id);

        if (!data.success) throw Error(data.error);

        const updatedGroups = get().group.groups.filter(
          ({ _id }) => _id !== id,
        );

        set({
          group: {
            ...get().group,
            groups: updatedGroups,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    createGroup: async (accessToken, group) => {
      try {
        const { data } = await service.createGroup(accessToken, group);

        if (!data.success) throw Error(data.error);

        set({
          group: {
            ...get().group,
            groups: [...get().group.groups, data.data],
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    updateGroup: async (accessToken, { _id, code, name }: GroupApiType) => {
      try {
        const { data } = await service.updateGroup(accessToken, _id, { code, name });
        if (!data.success) throw Error(data.error);

        const { groups } = get().group;

        const updatedGroupIndex = groups.findIndex(
          (group) => group._id === _id,
        );

        groups[updatedGroupIndex] = data.data;

        // groups: [...groups] was done in order to make React recognize
        // that there is a new object, otherwise it's considered a ref to the initial
        // groups, and the state will not be updated in the store
        set({ group: { ...get().group, groups: [...groups] } });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },
  },
});
