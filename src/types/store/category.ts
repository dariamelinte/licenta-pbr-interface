import type { CategoryApiType } from '@/types/common/api';
import type { CategoryType } from '@/types/common/category';

export type CategoryStoreType = {
  category: {
    categories: CategoryApiType[];
    loading: boolean;

    setLoading: (loading: boolean) => void;

    getCategories: () => void;
    getCategoryById: (id: string) => Promise<CategoryApiType | null>;
    deleteCategory: (id: string) => void;

    createCategory: (category: CategoryType) => void;
    updateCategory: (category: CategoryApiType) => void;
  };
};
