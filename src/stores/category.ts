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

    updateCategory: async ({ _id, ...category }: CategoryApiType) => {
      try {
        const { data } = await service.updateCategory(_id.$oid, category);
        if (!data.success) throw Error(data.error);

        const categories = get().category.categories;

        const updatedCategoryIndex = categories.findIndex(
          ({ _id: { $oid } }) => $oid === _id.$oid
        );

        categories[updatedCategoryIndex] = data.data;

        // categories: [...categories] was done in order to make React recognize
        // that there is a new object, otherwise it's considered a ref to the initial
        // categories, and the state will not be updated in the store
        set({ category: { ...get().category, categories: [...categories] } });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },
  },
});
