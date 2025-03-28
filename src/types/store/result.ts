import type { ResultApiType } from '@/types/common/api';
import type { ResultType } from '@/types/common/result';

export type ResultStoreType = {
  result: {
    results: ResultApiType[];
    loading: boolean;
    resultId?: string;

    setLoading: (loading: boolean) => void;
    setResults: (results: ResultApiType[]) => void;
    setResultId: (result?: string) => void;

    getResults: (accessToken: string) => void;
    getResultById: (
      accessToken: string,
      id: string,
    ) => Promise<ResultApiType | null>;
    getResultsByTest: (
      accessToken: string,
      test: string,
      own?: boolean,
    ) => Promise<void>;
    deleteResult: (accessToken: string, id: string) => void;
    deleteResultInstance: (accessToken: string, id: string, instance: string) => void;
    deleteResultLinkage: (accessToken: string, id: string, linkage: string) => void;

    createResult: (
      accessToken: string,
      result: ResultType,
    ) => Promise<ResultApiType | null>;
    updateResult: (
      accessToken: string,
      result: Partial<ResultApiType>,
      onSuccess?: () => void,
    ) => Promise<ResultApiType | null>;

    solveResult: (accessToken: string, result: Partial<ResultApiType>) => void;
    saveResult: (accessToken: string, result: Partial<ResultApiType>) => void;
  };
};
