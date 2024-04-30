import type { CategoryType } from "@/types/common/category";
import { ObjectModelInputType } from "@/types/common/objectModel";

export const INITIAL_CATEGORY: CategoryType = {
  name: "",
};

export const INITIAL_OBJECT_MODEL: ObjectModelInputType = {
  name: "",
  category: '',
  model: null,
};
