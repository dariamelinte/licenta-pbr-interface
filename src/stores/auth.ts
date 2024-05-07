import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import type { StateCreator } from 'zustand';

import { ERROR_MESSAGE } from '@/constants/messages';
import * as service from '@/services/api/auth';
import type { AuthStoreType } from '@/types/store/auth';
import { parseJwt } from '@/utils/parseJwt';


export const authSlice: StateCreator<AuthStoreType, [], [], AuthStoreType> = (
  set,
  get,
) => ({
  auth: {
    user: null,
    token: null,
    loading: false,

    credential: null,
    expiration_time: null,
    profile: false,

    setToken: (token) => {
      const { credential, expiration_time, profile } = parseJwt(token);

      console.log({ credential, expiration_time, profile })

      set({
        auth: {
          ...get().auth,
          token,
          credential,
          expiration_time,
          profile
        },
      })
    },

    setLoading: (loading) =>
      set({
        auth: {
          ...get().auth,
          loading,
        },
      }),

    register: async (values, onSuccess) => {
      get().auth.setLoading(true);

      try {
        const { data } = await service.register(values);

        if (!data.success) throw Error(data.error);

        toast.info(data.message);
        onSuccess();
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      } finally {
        get().auth.setLoading(false);
      }
    },

    login: async (values, onSuccess) => {
      get().auth.setLoading(true);

      try {
        const { data } = await service.login(values);

        if (!data.success) throw Error(data.error);

        get().auth.setToken(data.data.token)
        Cookies.set(process.env.SECRET_TOKEN, data.data.token);

        toast.info(data.message);
        onSuccess();
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      } finally {
        get().auth.setLoading(false);
      }
    },

    forgotPassword: async (values) => {
      get().auth.setLoading(true);

      try {
        console.log(values);
        // const { data } = await service.forgotPassword(values);

        // if (!data.success) throw Error(data.error);

        // console.log(data)

        // set({
        //   auth: {
        //     ...get().auth,
        //     categories: data.data,
        //     loading: false,
        //   },
        // });

        // toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      } finally {
        get().auth.setLoading(false);
      }
    },

    signOut: async () => {
      get().auth.setLoading(true);

      try {
        console.log('signing out');
        // const { data } = await service.register(values);

        // if (!data.success) throw Error(data.error);

        // console.log(data)

        // set({
        //   auth: {
        //     ...get().auth,
        //     categories: data.data,
        //     loading: false,
        //   },
        // });

        // toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      } finally {
        get().auth.setLoading(false);
      }
    },
  },
});
