import { CategoryApiType } from "@/types/common/api";
import { CategoryType } from "@/types/common/category";

export type CategoryStoreType = {
  category: {
    categories: CategoryApiType[];
    loading: boolean;
  
    getCategories: () => void;
    deleteCategory: (id: string) => void;

    createCategory: (category: CategoryType) => void;
    updateCategory: (category: CategoryApiType) => void;
  }
};
