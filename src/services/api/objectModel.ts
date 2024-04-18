import type { AxiosPromise } from "axios";

import { httpService } from "@/services";
import type {
  AddApiType,
  ObjectModelApiType,
  DeleteApiType,
  GetAllApiType,
  GetByIdApiType,
  UpdateApiType,
  ObjectModelIndecisiveApiType,
} from "@/types/common/api";
import type {
  ObjectModelFlagType,
  ObjectModelType,
} from "@/types/common/objectModel";

export const getObjectModels = async (
  flag?: ObjectModelFlagType
): AxiosPromise<GetAllApiType<ObjectModelIndecisiveApiType>> => {
  const flagAppend = flag ? `?${flag}=true` : "";
  return httpService.get(`/object-model/all${flagAppend}`);
};

export const getObjectModelById = async (
  id: string,
  flag?: ObjectModelFlagType
): AxiosPromise<GetByIdApiType<ObjectModelIndecisiveApiType>> => {
  const flagAppend = flag ? `?${flag}=true` : "";
  return httpService.get(`/object-model/${id}${flagAppend}`);
};

export const createObjectModel = async (
  objectModel: ObjectModelType
): AxiosPromise<AddApiType<ObjectModelApiType>> => {
  return httpService.post("/object-model", objectModel);
};

export const updateObjectModel = async (
  id: string,
  objectModel: Partial<ObjectModelType>
): AxiosPromise<UpdateApiType<ObjectModelApiType>> => {
  return httpService.patch(`/object-model/${id}`, objectModel);
};

export const deleteObjectModel = async (
  id: string
): AxiosPromise<DeleteApiType> => {
  return httpService.delete(`/object-model/${id}`);
};
