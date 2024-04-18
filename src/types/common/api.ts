import type { CategoryType } from './category';
import { ObjectModelGeometryType, ObjectModelInfoType, ObjectModelType } from './objectModel';

export type OidType = { _id: { $oid: string } };

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
export type ObjectModelApiType = ObjectModelType & OidType;

export type ObjectModelInfoApiType = ObjectModelInfoType & OidType;

export type ObjectModelGeometryApiType = ObjectModelGeometryType & OidType;

export type ObjectModelIndecisiveApiType = ObjectModelApiType | ObjectModelInfoApiType | ObjectModelGeometryApiType;

// 
