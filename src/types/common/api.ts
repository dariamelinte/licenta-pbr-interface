import type { CategoryType } from './category';
import type { CompleteGroupType, GroupType } from './group';
import type { ObjectModelInputType } from './objectModel';
import { CompleteTestType, TestType } from './test';

export type OidType = { _id: string };

export type ApiResponseType = {
  success: boolean;
  message?: string;
  error?: string;
};

// REST
export type AddApiType<T> = ApiResponseType & { data: T };

export type GetAllApiType<T> = ApiResponseType & { data: T[] };

export type GetByApiType<T> = ApiResponseType & { data: T };

export type UpdateApiType<T> = ApiResponseType & { data: T };

export type DeleteApiType = ApiResponseType & { data: null };

// category
export type CategoryApiType = CategoryType & OidType;

// object model
export type ModelType = {
  model: string;
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

// group
export type GroupApiType = GroupType & OidType;

export type CompleteGroupApiType = CompleteGroupType & OidType;

// test
export type TestApiType = TestType & OidType;

export type CompleteTestApiType = CompleteTestType & OidType;