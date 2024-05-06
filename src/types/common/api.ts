import type { CategoryType } from './category';
import type { ObjectModelInputType } from './objectModel';

export type OidType = { _id: string };

export type ApiResponseType = {
  success: boolean;
  message?: string;
  error?: string;
};

// REST
export type AddApiType<T> = ApiResponseType & { data: T };

export type GetAllApiType<T> = ApiResponseType & { data: T[] };

export type GetByIdApiType<T> = ApiResponseType & { data: T };

export type UpdateApiType<T> = ApiResponseType & { data: T };

export type DeleteApiType = ApiResponseType & { data: null };

// category
export type CategoryApiType = CategoryType & OidType;

// object model
export type ModelType = {
  model: {
    object_id: string;
    url: string;
  };
};

export type ObjectModelApiType = Omit<
  ObjectModelInputType,
  'category' | 'model'
> &
  OidType &
  ModelType & {
    category: OidType & {
      name?: string;
    };
  };

export type CreateObjectModelApiType = Omit<ObjectModelInputType, 'model'> &
  ModelType;

// auth
export type LoginApiType = ApiResponseType & {
  data: {
    token: string;
  };
};
