import type { AxiosPromise } from 'axios';

import { httpService } from '@/services';
import type {
  AddApiType,
  CategoryApiType,
  DeleteApiType,
  GetAllApiType,
  GetByApiType,
  UpdateApiType,
} from '@/types/common/api';
import type { CategoryType } from '@/types/common/category';

export const createCategory = async (
  accessToken: string,
  category: CategoryType,
): AxiosPromise<AddApiType<CategoryApiType>> => {
  return httpService.post('/categories', category, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCategories = async (): AxiosPromise<
  GetAllApiType<CategoryApiType>
> => {
  return httpService.get('/categories');
};

export const getCategoryById = async (
  id: string,
): AxiosPromise<GetByApiType<CategoryApiType>> => {
  return httpService.get(`/categories/id/${id}`);
};

export const updateCategory = async (
  accessToken: string,
  id: string,
  category: Partial<CategoryType>,
): AxiosPromise<UpdateApiType<CategoryApiType>> => {
  return httpService.patch(`/categories/id/${id}`, category, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteCategory = async (
  accessToken: string,
  id: string,
): AxiosPromise<DeleteApiType> => {
  return httpService.delete(`/categories/id/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
