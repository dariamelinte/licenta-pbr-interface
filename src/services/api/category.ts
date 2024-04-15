import type { AxiosPromise } from "axios";

import { httpService } from "@/services";
import {
  AddApiType,
  CategoryApiType,
  DeleteApiType,
  GetAllApiType,
  GetByIdApiType,
  UpdateApiType,
} from "@/types/common/api";
import { CategoryType } from "@/types/common/category";

export const getCategories = async (): AxiosPromise<
  GetAllApiType<CategoryApiType>
> => {
  return httpService.get("/category/all");
};

export const getCategoryById = async (
  id: string
): AxiosPromise<GetByIdApiType<CategoryApiType>> => {
  return httpService.get(`/category/${id}`);
};

export const createCategory = async (
  category: CategoryType
): AxiosPromise<AddApiType<CategoryApiType>> => {
  return httpService.post("/category", { category });
};

export const updateCategory = async (
  id: string,
  category: Partial<CategoryType>
): AxiosPromise<UpdateApiType<CategoryApiType>> => {
  return httpService.patch(`/category/${id}`, { category });
};

export const deleteCategory = async (
  id: string
): AxiosPromise<DeleteApiType> => {
  return httpService.delete(`/category/${id}`);
};
