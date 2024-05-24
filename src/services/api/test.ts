import type { AxiosPromise } from 'axios';

import { httpService } from '@/services';
import type {
  AddApiType,
  CompleteTestApiType,
  DeleteApiType,
  GetAllApiType,
  GetByApiType,
  TestApiType,
  UpdateApiType,
} from '@/types/common/api';
import { TestFormType, TestType } from '@/types/common/test';

export const createTest = async (
  accessToken: string,
  test: TestFormType,
): AxiosPromise<AddApiType<TestApiType>> => {
  return httpService.post('/tests', test, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getTests = async (
  accessToken: string,
): AxiosPromise<GetAllApiType<TestApiType>> => {
  return httpService.get('/tests', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getTestById = async (
  accessToken: string,
  id: string,
): AxiosPromise<GetByApiType<CompleteTestApiType>> => {
  return httpService.get(`/tests/id/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateTest = async (
  accessToken: string,
  id: string,
  test: Partial<TestType>,
): AxiosPromise<UpdateApiType<TestApiType>> => {
  return httpService.patch(`/tests/id/${id}`, test, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteTest = async (
  accessToken: string,
  id: string,
): AxiosPromise<DeleteApiType> => {
  return httpService.delete(`/tests/id/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
