import { StateCreator } from "zustand";

import * as service from "@/services/api/category";
import { CategoryStoreType } from "@/types/store/category";
import { toast } from "react-toastify";
import { ERROR_MESSAGE } from "@/constants/messages";

export const categorySlice: StateCreator<
  CategoryStoreType,
  [],
  [],
  CategoryStoreType
> = (set, get) => ({
  category: {
    categories: [],
    loading: true,

    getCategories: async () => {
      if (get().category.categories.length) {
        return;
      }

      try {
        const { data } = await service.getCategories();

        if (!data.success) throw Error(data.error);

        set({
          category: {
            ...get().category,
            categories: data.data,
            loading: false,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    deleteCategory: async (id: string) => {
      try {
        const { data } = await service.deleteCategory(id);

        if (!data.success) throw Error(data.error);

        const updatedCategories = get().category.categories.filter(
          ({ _id: { $oid } }) => $oid !== id
        );

        set({
          category: {
            ...get().category,
            categories: updatedCategories,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },
  },
});
