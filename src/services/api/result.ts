import type { AxiosPromise } from "axios";

import { httpService } from "@/services";
import type {
  AddApiType,
  DeleteApiType,
  GetAllApiType,
  GetByApiType,
  ResultApiType,
  UpdateApiType,
} from "@/types/common/api";
import type { ResultType } from "@/types/common/result";

export const createResult = async (
  accessToken: string,
  result: ResultType
): AxiosPromise<AddApiType<ResultApiType>> => {
  return httpService.post("/results", result, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getResults = async (
  accessToken: string
): AxiosPromise<GetAllApiType<ResultApiType>> => {
  return httpService.get("/results", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getResultById = async (
  accessToken: string,
  id: string
): AxiosPromise<GetByApiType<ResultApiType>> => {
  return httpService.get(`/results/id/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getResultsByTest = async (
  accessToken: string,
  test: string,
  own?: boolean
): AxiosPromise<GetByApiType<ResultApiType[]>> => {
  return httpService.get(`/results/test/${test}?${own ? "own=true" : ""}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateResult = async (
  accessToken: string,
  id: string,
  result: Partial<ResultApiType>
): AxiosPromise<UpdateApiType<ResultApiType>> => {
  return httpService.patch(`/results/id/${id}`, result, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteResult = async (
  accessToken: string,
  id: string
): AxiosPromise<DeleteApiType> => {
  return httpService.delete(`/results/id/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
