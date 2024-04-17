import { StateCreator } from "zustand";
import { toast } from "react-toastify";

import * as service from "@/services/api/category";
import { CategoryStoreType } from "@/types/store/category";
import { ERROR_MESSAGE } from "@/constants/messages";
import { CategoryType } from "@/types/common/category";
import { CategoryApiType } from "@/types/common/api";

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

    createCategory: async (category: CategoryType) => {
      try {
        const { data } = await service.createCategory(category);

        if (!data.success) throw Error(data.error);

        set({
          category: {
            ...get().category,
            categories: [...get().category.categories, data.data],
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    updateCategory: async (category: CategoryApiType) => {
      // try {
      //   const { data } = await service.updateCategory(category);
      //   if (!data.success) throw Error(data.error);
      //   get().category.getCategories();
      //   toast.info(data.message);
      // } catch (error: any) {
      //   toast.error(error || ERROR_MESSAGE.default);
      // }
    },
  },
});
