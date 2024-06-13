import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { Loading } from "@/components/common";
import { TestForm } from "@/components/forms";
import { ERROR_MESSAGE } from "@/constants/messages";
import { VerticalMenuPage } from "@/layouts";
import useStore from "@/stores";
import type { ResultApiType, TestApiType } from "@/types/common/api";
import type { ResultType } from "@/types/common/result";
import type { TestType } from "@/types/common/test";
import { timestampToDate } from "@/utils/timestampToDate";

const Index = () => {
  const router = useRouter();
  const [test, setTest] = useState<TestApiType | null>(null);
  const [result, setResult] = useState<Partial<ResultApiType> | null>(null);
  const [isFirst, setIsFirst] = useState(true);

  const { token, user } = useStore(useCallback((state) => state.auth, []));
  const {
    getTestById,
    loading: loadingT,
    updateTest,
  } = useStore(useCallback((state) => state.test, []));
  const {
    results,
    getResultsByTest,
    loading: loadingR,
    updateResult,
    createResult,
    setResultId,
    resultId
  } = useStore(useCallback((state) => state.result, []));;
  const { instances, linkages, scale, loadPlayground, resetPlayground } = useStore(
    useCallback((state) => state.playground, [])
  );

  const isStudent = useMemo(() => user.role === "student", [user.role]);

  console.log(results, result);

  const handleTest = useCallback(async () => {
    const test = await getTestById(token as string, router.query.id as string);

    if (!test) return;

    await getResultsByTest(token as string, test._id, true);

    const { start_date, due_date, ...restTest } = test;

    setTest({
      ...restTest,
      start_date: timestampToDate(Number(start_date)),
      due_date: timestampToDate(Number(due_date)),
    });
  }, [getTestById, token, router.query.id, setTest]);

  const handleResult = useCallback(() => {
    const [fetchedResult] = results;
    if (fetchedResult) {
      loadPlayground({
        linkages: fetchedResult.linkages,
        instances: fetchedResult.instances,
        scale: fetchedResult.scale,
      });
      setResultId(fetchedResult._id);
      setResult(fetchedResult);
      setIsFirst(false);
    } else {
      setResult({ linkages, instances, scale, test: test?._id });
    }
  }, [loadPlayground, setResultId, setResult, setIsFirst, results]);

  useEffect(() => {
    resetPlayground();
    setResultId(undefined);
    handleTest();
  }, [handleTest]);

  useEffect(() => {
    handleResult();
  }, [handleResult]);

  useEffect(() => {
    setResultId(result?._id)
  }, [result, setResultId])

  const handleSubmit = async (values: TestType) => {
    if (!(Object.keys(instances).length && linkages.length)) {
      toast.error("You need to have a board in order to update a test!");
      return;
    }

    if (!test?._id) {
      toast.error(ERROR_MESSAGE.default);
      return;
    }

    if (!isStudent) {
      updateTest(token as string, values);
      updateResult(token as string, {
        ...result,
        instances,
        linkages,
        scale,
        submission_time: new Date(),
      });
    }

    const payload: ResultType = {
      ...result,
      _id: resultId,
      test: test?._id,
      instances,
      linkages,
      scale,
      status: "submitted",
      submission_time: new Date(),
    };

    console.log({ payload })

    if (isFirst) {
      const result = await createResult(token as string, payload);
      console.log(1, { result })
      if (result) {
        setIsFirst(false);
        setResult(result);
      }
    } else {
      const result = await updateResult(token as string, payload);
      console.log(2, { result })
      if (result) setResult(result);
    }
  };

  const handleSave = async () => {
    if (!test?._id) {
      toast.error(ERROR_MESSAGE.default);
      return;
    }

    if (!(Object.keys(instances).length && linkages.length)) {
      toast.error("You need to have a board in order to update a test!");
      return;
    }

    const payload: ResultType = {
      ...result,
      _id: resultId,
      test: test?._id,
      instances,
      linkages,
      scale,
      status: "saved",
      submission_time: new Date(),
    };
    
    console.log(test, payload)

    if (isFirst) {
      const result = await createResult(token as string, payload);
      if (result) {
        setIsFirst(false);
        setResult(result);
      }
    } else {
      const result = await updateResult(token as string, payload);
      if (result) setResult(result);
    }
  };

  if (!test || loadingT || loadingR) {
    return (
      <VerticalMenuPage>
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  return (
    <VerticalMenuPage className="max-h-screen max-w-[100vw] overflow-hidden">
      <TestForm
        onSubmit={handleSubmit}
        initialTest={test}
        onSave={isStudent ? handleSave : undefined}
        disabled={
          user.role === "student" &&
          (result?.status === "submitted" ||
            new Date() > new Date(test.due_date))
        }
      />
    </VerticalMenuPage>
  );
};

export default Index;
