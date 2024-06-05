import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { Loading } from "@/components/common";
import { TestForm } from "@/components/forms";
import { VerticalMenuPage } from "@/layouts";
import useStore from "@/stores";
import type { TestType } from "@/types/common/test";
import { timestampToDate } from "@/utils/timestampToDate";
import { ResultApiType, TestApiType } from "@/types/common/api";
import { ERROR_MESSAGE } from "@/constants/messages";
import { ResultType } from "@/types/common/result";

const Index = () => {
  const router = useRouter();
  const [test, setTest] = useState<TestApiType | null>(null);
  const [result, setResult] = useState<Partial<ResultApiType> | null>(null);
  const [isFirst, setIsFirst] = useState(true);

  const { token, user } = useStore((state) => state.auth);
  const {
    getTestById,
    loading: loadingT,
    updateTest,
  } = useStore((state) => state.test);
  const {
    getResultsByTest,
    loading: loadingR,
    updateResult,
    createResult,
  } = useStore((state) => state.result);
  const { instances, linkages, scale, loadPlayground } = useStore(
    (state) => state.playground
  );

  const isStudent = useMemo(() => user.role === "student", [user.role]);

  const handleTest = useCallback(async () => {
    const test = await getTestById(token as string, router.query.id as string);

    if (!test) return;

    const results = await getResultsByTest(token as string, test._id, true);

    if (results?.[0]) {
      loadPlayground({
        linkages: results[0].linkages,
        instances: results[0].instances,
        scale: results[0].scale,
      });
      setResult(results[0]);
      setIsFirst(false);
    } else {
      setResult({ linkages, instances, scale, test: test._id });
    }

    const { start_date, due_date, ...restTest } = test;

    setTest({
      ...restTest,
      start_date: timestampToDate(Number(start_date)),
      due_date: timestampToDate(Number(due_date)),
    });
  }, [getTestById, token, router.query.id, setTest, loadPlayground]);

  useEffect(() => {
    handleTest();
  }, [handleTest]);

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
      test: test?._id,
      instances,
      linkages,
      scale,
      status: "submitted",
      submission_time: new Date(),
    };

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
      test: test?._id,
      instances,
      linkages,
      scale,
      status: "saved",
      submission_time: new Date(),
    };

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
