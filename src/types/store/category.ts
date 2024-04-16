import { CategoryApiType } from "@/types/common/api";

export type CategoryStoreType = {
  category: {
    categories: CategoryApiType[];
    loading: boolean;
  
    getCategories: () => void;
    deleteCategory: (id: string) => void;
  }
};
