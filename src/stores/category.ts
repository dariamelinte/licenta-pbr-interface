import { toast } from 'react-toastify';
import type { StateCreator } from 'zustand';

import { ERROR_MESSAGE } from '@/constants/messages';
import * as service from '@/services/api/category';
import type { CategoryApiType } from '@/types/common/api';
import type { CategoryType } from '@/types/common/category';
import type { CategoryStoreType } from '@/types/store/category';

export const categorySlice: StateCreator<
  CategoryStoreType,
  [],
  [],
  CategoryStoreType
> = (set, get) => ({
  category: {
    categories: [],
    loading: true,

    setLoading: (loading) =>
      set({
        category: {
          ...get().category,
          loading,
        },
      }),

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

    getCategoryById: async (id: string) => {
      const category = get().category.categories.find(({ _id }) => _id === id);

      if (category) {
        return category;
      }

      try {
        const {
          data: { success, data, error, message },
        } = await service.getCategoryById(id);

        if (!success) throw Error(error);

        set({
          category: {
            ...get().category,
            categories: [data],
          },
        });
        toast.info(message);

        return data;
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
        return null;
      }
    },

    deleteCategory: async (id: string) => {
      try {
        const { data } = await service.deleteCategory(id);

        if (!data.success) throw Error(data.error);

        const updatedCategories = get().category.categories.filter(
          ({ _id }) => _id !== id,
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
        const { data } = await service.updateCategory(_id, category);
        if (!data.success) throw Error(data.error);

        const { categories } = get().category;

        const updatedCategoryIndex = categories.findIndex(
          (category) => category._id === _id,
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
