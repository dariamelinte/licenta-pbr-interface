import { CategoryType } from "./category";

export type OidType = { _id: { $oid: string } };

export type ApiResponseType = {
  success: boolean;
  message?: string;
  error?: string;
};

export type AddApiType<T> = ApiResponseType & { data: T };

export type GetAllApiType<T> = ApiResponseType & { data: T[] };

export type GetByIdApiType<T> = ApiResponseType & { data: T };

export type UpdateApiType<T> = ApiResponseType & { data: T };

export type DeleteApiType = ApiResponseType & { data: null };

export type CategoryApiType = CategoryType & OidType;
