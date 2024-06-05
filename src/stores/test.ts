import { toast } from 'react-toastify';
import type { StateCreator } from 'zustand';

import { ERROR_MESSAGE } from '@/constants/messages';
import * as service from '@/services/api/test';
import type { TestStoreType } from '@/types/store/test';

export const testSlice: StateCreator<TestStoreType, [], [], TestStoreType> = (
  set,
  get,
) => ({
  test: {
    tests: [],
    loading: false,

    setLoading: (loading) =>
      set({
        test: {
          ...get().test,
          loading,
        },
      }),

    setTests: (tests) =>
      set({
        test: {
          ...get().test,
          tests,
        },
      }),

    getTests: async (accessToken) => {
      if (get().test.tests.length) {
        return;
      }

      try {
        get().test.setLoading(true);
        const { data } = await service.getTests(accessToken);

        if (!data.success) throw Error(data.error);

        set({
          test: {
            ...get().test,
            tests: data.data,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      } finally {
        get().test.setLoading(false);
      }
    },

    getTestById: async (accessToken, id) => {
      const test = get().test.tests.find(({ _id }) => _id === id);
      if (test) return test;

      try {
        get().test.setLoading(true);
        const {
          data: { success, data, error, message },
        } = await service.getTestById(accessToken, id);

        if (!success) throw Error(error);

        toast.info(message);

        get().test.setLoading(false);
        return data;
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
        get().test.setLoading(false);
        return null;
      }
    },

    deleteTest: async (accessToken, id: string) => {
      try {
        const { data } = await service.deleteTest(accessToken, id);

        if (!data.success) throw Error(data.error);

        const updatedTests = get().test.tests.filter(({ _id }) => _id !== id);

        set({
          test: {
            ...get().test,
            tests: updatedTests,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    createTest: async (accessToken, test) => {
      try {
        const { data } = await service.createTest(accessToken, test);

        if (!data.success) throw Error(data.error);

        set({
          test: {
            ...get().test,
            tests: [...get().test.tests, data.data],
          },
        });

        toast.info(data.message);
        return data.data;
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
        return null;
      }
    },

    updateTest: async (accessToken, { _id, ...rest }, onSuccess) => {
      try {
        const { data } = await service.updateTest(
          accessToken,
          _id as string,
          rest,
        );
        if (!data.success) throw Error(data.error);

        const { tests } = get().test;

        const updatedTestIndex = tests.findIndex((test) => test._id === _id);

        tests[updatedTestIndex] = data.data;

        // tests: [...tests] was done in order to make React recognize
        // that there is a new object, otherwise it's considered a ref to the initial
        // tests, and the state will not be updated in the store
        set({ test: { ...get().test, tests: [...tests] } });
        if (onSuccess) {
          onSuccess();
        }

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },
  },
});
