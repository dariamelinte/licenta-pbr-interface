import type { CompleteTestType, TestFormType, TestType } from '@/types/common/test';

export type TestStoreType = {
  test: {
    tests: TestType[];
    wipTest: TestFormType;
    loading: boolean;

    setLoading: (loading: boolean) => void;
    setTests: (tests: TestType[]) => void;
    setWipTest: (test: TestFormType) => void;

    getTests: (accessToken: string) => void;
    getTestById: (
      accessToken: string,
      id: string,
    ) => Promise<CompleteTestType | null>;
    deleteTest: (accessToken: string, id: string) => void;

    createTest: (accessToken: string, test: TestFormType) => void;
    updateTest: (
      accessToken: string,
      test: Partial<TestType>,
      onSuccess?: () => void,
    ) => void;
  };
};
