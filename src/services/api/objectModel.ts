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
  objectModel: CreateObjectModelApiType,
): AxiosPromise<AddApiType<ObjectModelApiType>> => {
  console.log(111, { objectModel });
  return httpService.post('/object-models', objectModel);
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
  id: string,
  objectModel: Partial<ObjectModelInputType>,
): AxiosPromise<UpdateApiType<ObjectModelApiType>> => {
  return httpService.patch(`/object-models/id/${id}`, objectModel);
};

export const deleteObjectModel = async (
  id: string,
): AxiosPromise<DeleteApiType> => {
  return httpService.delete(`/object-models/id/${id}`);
};

export const uploadModel = async (
  model: FormData,
): AxiosPromise<AddApiType<ModelType>> => {
  return httpService.post('/object-models/upload', model, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
