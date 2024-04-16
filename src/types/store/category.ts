import { CategoryApiType } from "@/types/common/api";

export type CategoryStoreType = {
  category: {
    categories: CategoryApiType[];
  
    getCategories: () => CategoryApiType[];
    deleteCategory: (id: string) => void;
  }
};
