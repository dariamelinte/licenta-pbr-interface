import type { AxiosPromise } from 'axios';

import { httpService } from '@/services';
import type {
  AddApiType,
  CreateObjectModelApiType,
  DeleteApiType,
  GetAllApiType,
  GetByApiType,
  ModelType,
  ObjectModelApiType,
  UpdateApiType,
} from '@/types/common/api';
import type { ObjectModelInputType } from '@/types/common/objectModel';

export const createObjectModel = async (
  accessToken: string,
  objectModel: CreateObjectModelApiType,
): AxiosPromise<AddApiType<ObjectModelApiType>> => {
  console.log(111, { objectModel });
  return httpService.post('/object-models', objectModel, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getObjectModels = async (): AxiosPromise<
  GetAllApiType<ObjectModelApiType>
> => {
  return httpService.get(`/object-models`);
};

export const getObjectModelById = async (
  id: string,
): AxiosPromise<GetByApiType<ObjectModelApiType>> => {
  return httpService.get(`/object-models/id/${id}`);
};

export const updateObjectModel = async (
  accessToken: string,
  id: string,
  objectModel: Partial<ObjectModelInputType>,
): AxiosPromise<UpdateApiType<ObjectModelApiType>> => {
  return httpService.patch(`/object-models/id/${id}`, objectModel, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteObjectModel = async (
  accessToken: string,
  id: string,
): AxiosPromise<DeleteApiType> => {
  return httpService.delete(`/object-models/id/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const uploadModel = async (
  accessToken: string,
  model: FormData,
): AxiosPromise<AddApiType<ModelType>> => {
  return httpService.post('/object-models/upload', model, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
