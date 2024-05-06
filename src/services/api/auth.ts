import type { AxiosPromise } from 'axios';

import { httpService } from '@/services';
import type { ApiResponseType, LoginApiType } from '@/types/common/api';
import type {
  ForgotPasswordFormType,
  LoginFormType,
  RegisterFormType,
} from '@/types/common/auth';

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
