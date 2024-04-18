import { toast } from 'react-toastify';
import type { StateCreator } from 'zustand';

import { ERROR_MESSAGE } from '@/constants/messages';
import * as service from '@/services/api/objectModel';
import type { ObjectModelApiType } from '@/types/common/api';
import type { ObjectModelFlagType, ObjectModelType } from '@/types/common/objectModel';
import type { ObjectModelStoreType } from '@/types/store/objectModel';

export const objectModelSlice: StateCreator<
  ObjectModelStoreType,
  [],
  [],
  ObjectModelStoreType
> = (set, get) => ({
  objectModel: {
    objectModels: [],
    loading: true,

    getObjectModels: async (flag?: ObjectModelFlagType) => {
      if (get().objectModel.objectModels.length) {
        return;
      }

      try {
        const { data } = await service.getObjectModels(flag);

        if (!data.success) throw Error(data.error);

        set({
          objectModel: {
            ...get().objectModel,
            objectModels: data.data,
            loading: false,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    deleteObjectModel: async (id: string) => {
      try {
        const { data } = await service.deleteObjectModel(id);

        if (!data.success) throw Error(data.error);

        const updatedObjectModels = get().objectModel.objectModels.filter(
          ({ _id: { $oid } }) => $oid !== id,
        );

        set({
          objectModel: {
            ...get().objectModel,
            objectModels: updatedObjectModels,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    createObjectModel: async (objectModel: ObjectModelType) => {
      try {
        const { data } = await service.createObjectModel(objectModel);

        if (!data.success) throw Error(data.error);

        set({
          objectModel: {
            ...get().objectModel,
            objectModels: [...get().objectModel.objectModels, data.data],
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    updateObjectModel: async ({ _id, ...objectModel }: ObjectModelApiType) => {
      try {
        const { data } = await service.updateObjectModel(_id.$oid, objectModel);
        if (!data.success) throw Error(data.error);

        const { objectModels } = get().objectModel;

        const updatedObjectModelIndex = objectModels.findIndex(
          ({ _id: { $oid } }) => $oid === _id.$oid,
        );

        objectModels[updatedObjectModelIndex] = data.data;

        // objectModels: [...objectModels] was done in order to make React recognize
        // that there is a new object, otherwise it's considered a ref to the initial
        // objectModels, and the state will not be updated in the store
        set({ objectModel: { ...get().objectModel, objectModels: [...objectModels] } });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },
  },
});
