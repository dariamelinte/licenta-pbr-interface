import type { AxiosPromise } from 'axios';

import { httpService } from '@/services';
import type {
  AddApiType,
  CompleteGroupApiType,
  DeleteApiType,
  GetAllApiType,
  GetByApiType,
  GroupApiType,
  UpdateApiType,
} from '@/types/common/api';
import type {
  GroupFormType,
  GroupType,
  JoinGroupFormType,
} from '@/types/common/group';

export const createGroup = async (
  accessToken: string,
  group: GroupFormType,
): AxiosPromise<AddApiType<GroupApiType>> => {
  return httpService.post('/groups', group, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getGroups = async (
  accessToken: string,
): AxiosPromise<GetAllApiType<GroupApiType>> => {
  return httpService.get('/groups', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getGroupById = async (
  accessToken: string,
  id: string,
): AxiosPromise<GetByApiType<CompleteGroupApiType>> => {
  return httpService.get(`/groups/id/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateGroup = async (
  accessToken: string,
  id: string,
  group: Partial<GroupType>,
): AxiosPromise<UpdateApiType<GroupApiType>> => {
  return httpService.patch(`/groups/id/${id}`, group, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteGroup = async (
  accessToken: string,
  id: string,
): AxiosPromise<DeleteApiType> => {
  return httpService.delete(`/groups/id/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const joinGroup = async (
  accessToken: string,
  group: JoinGroupFormType,
): AxiosPromise<AddApiType<GroupApiType>> => {
  return httpService.post('/groups/join', group, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
