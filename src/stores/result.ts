import { toast } from 'react-toastify';
import type { StateCreator } from 'zustand';

import { ERROR_MESSAGE } from '@/constants/messages';
import * as service from '@/services/api/result';
import type { ResultStoreType } from '@/types/store/result';

export const resultSlice: StateCreator<
  ResultStoreType,
  [],
  [],
  ResultStoreType
> = (set, get) => ({
  result: {
    results: [],
    loading: false,
    resultId: undefined,

    setLoading: (loading) =>
      set({
        result: {
          ...get().result,
          loading,
        },
      }),

    setResults: (results) =>
      set({
        result: {
          ...get().result,
          results,
        },
      }),
    
    setResultId: (resultId) =>
      set({
        result: {
          ...get().result,
          resultId,
        },
      }),

    getResults: async (accessToken) => {
      try {
        get().result.setLoading(true);
        const { data } = await service.getResults(accessToken);

        if (!data.success) throw Error(data.error);

        set({
          result: {
            ...get().result,
            results: data.data,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      } finally {
        get().result.setLoading(false);
      }
    },

    getResultById: async (accessToken, id) => {
      try {
        get().result.setLoading(true);
        const {
          data: { success, data, error, message },
        } = await service.getResultById(accessToken, id);

        if (!success) throw Error(error);

        toast.info(message);

        get().result.setLoading(false);
        return data;
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
        get().result.setLoading(false);
        return null;
      }
    },

    getResultsByTest: async (accessToken, test, own) => {
      try {
        get().result.setLoading(true);
        const {
          data: { success, data, error, message },
        } = await service.getResultsByTest(accessToken, test, own);

        if (!success) throw Error(error);

        set({
          result: {
            ...get().result,
            results: data,
          },
        });

        toast.info(message);

        get().result.setLoading(false);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
        get().result.setLoading(false);
      }
    },

    deleteResult: async (accessToken, id: string) => {
      try {
        const { data } = await service.deleteResult(accessToken, id);

        if (!data.success) throw Error(data.error);

        const updatedResults = get().result.results.filter(
          ({ _id }) => _id !== id,
        );

        set({
          result: {
            ...get().result,
            results: updatedResults,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    deleteResultInstance: async (accessToken, id: string, instance: string) => {
      try {
        const { data } = await service.deleteResultInstance(accessToken, id, instance);

        if (!data.success) throw Error(data.error);

        const updatedResults = get().result.results.filter(
          ({ _id }) => _id !== id,
        );

        set({
          result: {
            ...get().result,
            results: updatedResults,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    deleteResultLinkage: async (accessToken, id: string, linkage: string) => {
      try {
        const { data } = await service.deleteResultLinkage(accessToken, id, linkage);

        if (!data.success) throw Error(data.error);

        const updatedResults = get().result.results.filter(
          ({ _id }) => _id !== id,
        );

        set({
          result: {
            ...get().result,
            results: updatedResults,
          },
        });

        toast.info(data.message);
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
      }
    },

    createResult: async (accessToken, result) => {
      try {
        const { data } = await service.createResult(accessToken, result);

        if (!data.success) throw Error(data.error);

        set({
          result: {
            ...get().result,
            results: [...get().result.results, data.data],
          },
        });

        toast.info(data.message);
        return data.data;
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
        return null;
      }
    },

    updateResult: async (accessToken, { _id, ...rest }, onSuccess) => {
      try {
        const { data } = await service.updateResult(
          accessToken,
          _id as string,
          rest,
        );
        if (!data.success) throw Error(data.error);

        const { results } = get().result;

        const updatedResultIndex = results.findIndex(
          (result) => result._id === _id,
        );

        results[updatedResultIndex] = data.data;

        // results: [...results] was done in order to make React recognize
        // that there is a new object, otherwise it's considered a ref to the initial
        // results, and the state will not be updated in the store
        set({ result: { ...get().result, results: [...results] } });
        if (onSuccess) {
          onSuccess();
        }

        toast.info(data.message);
        return data.data;
      } catch (error: any) {
        toast.error(error || ERROR_MESSAGE.default);
        return null;
      }
    },

    solveResult: async (accessToken, result) => {
      console.log({ accessToken, result });
    },

    saveResult: async (accessToken, result) => {
      console.log({ accessToken, result });
    },
  },
});
