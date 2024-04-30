import { toast } from "react-toastify";
import type { StateCreator } from "zustand";

import { ERROR_MESSAGE } from "@/constants/messages";
import * as service from "@/services/api/objectModel";
import type {
  ObjectModelApiType,
} from "@/types/common/api";
import type { ObjectModelStoreType } from "@/types/store/objectModel";
import { ObjectModelInputType } from "@/types/common/objectModel";

export const objectModelSlice: StateCreator<
  ObjectModelStoreType,
  [],
  [],
  ObjectModelStoreType
> = (set, get) => ({
  objectModel: {
    objectModels: [],
    loading: true,

    setLoading: (loading) =>
      set({
        objectModel: {
          ...get().objectModel,
          loading,
        },
      }),

    getObjectModels: async () => {
      if (get().objectModel.objectModels.length) {
        return;
      }

      try {
        get().objectModel.setLoading(true);

        const {
          data: { success, error, message, data },
        } = await service.getObjectModels();

        if (!success) throw Error(error);

        set({
          objectModel: {
            ...get().objectModel,
            objectModels: data as ObjectModelApiType[],
          },
        });

        toast.info(message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      } finally {
        get().objectModel.setLoading(false);
      }
    },

    deleteObjectModel: async (id: string) => {
      try {
        const { data } = await service.deleteObjectModel(id);

        if (!data.success) throw Error(data.error);

        const updatedObjectModels = get().objectModel.objectModels.filter(
          ({ _id  }) => _id !== id
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

    createObjectModel: async ({ model, ...rest }: ObjectModelInputType) => {
      try {
        const formData = new FormData();
        formData.append("model", model as File);

        const { data: dataUpload } = await service.uploadModel(formData);
        if (!dataUpload.success) throw Error(dataUpload.error)

        const { data } = await service.createObjectModel({ ...rest, model: dataUpload.data.model });
        if (!data.success) throw Error(data.error);  

        set({
          objectModel: {
            ...get().objectModel,
            objectModels: [
              ...get().objectModel.objectModels,
              data.data,
            ],
          },
        });

        // toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    updateObjectModel: async (objectModel: ObjectModelApiType) => {
      try {
        // const { data } = await service.updateObjectModel(_id, objectModel);
        // if (!data.success) throw Error(data.error);

        // TODO

        // toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },
  },
});
