import type { TestType } from '@/types/common/test';
import { TestApiType } from '@/types/common/api';

export type TestStoreType = {
  test: {
    tests: TestApiType[];
    loading: boolean;

    setLoading: (loading: boolean) => void;
    setTests: (tests: TestApiType[]) => void;

    getTests: (accessToken: string) => void;
    getTestById: (
      accessToken: string,
      id: string,
    ) => Promise<TestApiType | null>;
    deleteTest: (accessToken: string, id: string) => void;

    createTest: (accessToken: string, test: TestType) => void;
    updateTest: (
      accessToken: string,
      test: Partial<TestApiType>,
      onSuccess?: () => void,
    ) => void;
  };
};
