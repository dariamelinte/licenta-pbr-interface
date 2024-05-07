import type { AxiosPromise } from 'axios';

import { httpService } from '@/services';
import type {
  ApiResponseType,
  GetByApiType,
  LoginApiType,
  OidType,
} from '@/types/common/api';
import type {
  ForgotPasswordFormType,
  LoginFormType,
  RegisterFormType,
} from '@/types/common/auth';
import type { ProfileType } from '@/types/common/user';

export const register = async (
  values: Omit<RegisterFormType, 'confirm_password'>,
): AxiosPromise<ApiResponseType> => {
  return httpService.post('/auth/register', values);
};

export const login = async (
  values: LoginFormType,
): AxiosPromise<LoginApiType> => {
  return httpService.post('/auth/login', values);
};

export const forgotPassword = async (
  values: ForgotPasswordFormType,
): AxiosPromise<ApiResponseType> => {
  return httpService.post('/auth/forgot-password', values);
};

export const getProfile = async (
  accessToken: string,
): AxiosPromise<GetByApiType<ProfileType & OidType>> => {
  return httpService.get('/user/profile', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateProfile = async (
  accessToken: string,
  values: ProfileType,
): AxiosPromise<GetByApiType<ProfileType & OidType>> => {
  return httpService.post('/user/profile', values, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
