import Cookies from 'js-cookie';
import isEqual from 'lodash/isEqual';
import { toast } from 'react-toastify';
import type { StateCreator } from 'zustand';

import { INITIAL_PROFILE_FORM } from '@/constants/initial-objects';
import { ERROR_MESSAGE } from '@/constants/messages';
import * as service from '@/services/api/auth';
import type { ProfileType } from '@/types/common/user';
import type { AuthStoreType } from '@/types/store/auth';
import { parseJwt } from '@/utils/parseJwt';

export const authSlice: StateCreator<AuthStoreType, [], [], AuthStoreType> = (
  set,
  get,
) => ({
  auth: {
    user: INITIAL_PROFILE_FORM,
    token: null,
    loading: false,

    credential: null,
    expiration_time: null,
    email: null,
    has_profile: false,

    setToken: (token) => {
      const { credential, expiration_time, email, has_profile } =
        parseJwt(token);

      console.log({ credential, expiration_time, email });

      set({
        auth: {
          ...get().auth,
          token,
          credential,
          expiration_time,
          email,
          has_profile,
        },
      });
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

        get().auth.setToken(data.data.token);
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
        await Cookies.remove(process.env.SECRET_TOKEN, {
          path: '',
        });

        set({
          auth: {
            ...get().auth,
            user: INITIAL_PROFILE_FORM,
            token: null,
            loading: false,

            credential: null,
            expiration_time: null,
            email: null,
            has_profile: false,
          },
        });
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      } finally {
        get().auth.setLoading(false);
      }
    },

    getProfile: async (accessToken: string) => {
      if (!isEqual(get().auth.user, INITIAL_PROFILE_FORM)) {
        return get().auth.user;
      }

      try {
        const {
          data: {
            success,
            data: { _id, ...profile },
            error,
            message,
          },
        } = await service.getProfile(accessToken);

        if (!success) throw Error(error);

        set({
          auth: {
            ...get().auth,
            user: profile,
          },
        });
        toast.info(message);

        return profile;
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
        return null;
      }
    },

    updateProfile: async (accessToken: string, values: ProfileType) => {
      try {
        const {
          data: {
            success,
            data: { _id, ...profile },
            error,
            message,
          },
        } = await service.updateProfile(accessToken, values);

        if (!success) throw Error(error);

        set({
          auth: {
            ...get().auth,
            user: profile,
          },
        });

        toast.info(message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },
  },
});
