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

const Index = () => {
  const router = useRouter();
  const [test, setTest] = useState<TestApiType | null>(null);
  const [result, setResult] = useState<ResultApiType | null>(null);

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
  } = useStore((state) => state.result);
  const { instances, linkages, scale, loadPlayground } = useStore(
    (state) => state.playground
  );

  const isStudent = useMemo(() => user.role === "student", [user.role]);

  const handleTest = useCallback(async () => {
    const test = await getTestById(token as string, router.query.id as string);

    if (!test) return;

    const results = await getResultsByTest(token as string, test._id, true);

    if (!results?.[0]) return;

    const { start_date, due_date, ...restTest } = test;
    const { linkages, instances, scale, ...restResult } = results[0];

    setTest({
      ...restTest,
      start_date: timestampToDate(Number(start_date)),
      due_date: timestampToDate(Number(due_date)),
    });
    loadPlayground({ linkages, instances, scale });
    setResult({ ...restResult, linkages, instances, scale });
  }, [getTestById, token, router.query.id, setTest, loadPlayground]);

  useEffect(() => {
    handleTest();
  }, [handleTest]);

  const handleSubmit = (values: TestType) => {
    if (!(Object.keys(instances).length && linkages.length)) {
      toast.error("You need to have a board in order to update a test!");
      return;
    }

    if (isStudent) {
      // TODO: call for submitting the results
      console.log({ values, instances, linkages, scale });
    } else {
      updateTest(token as string, values);
      updateResult(token as string, {
        ...result,
        instances,
        linkages,
        scale,
        submission_time: new Date(),
      });
    }
  };

  const handleSave = () => {
    if (!(Object.keys(instances).length && linkages.length)) {
      toast.error("You need to have a board in order to update a test!");
      return;
    }

    console.log("save");
    console.log({ instances, linkages, scale });
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
      />
    </VerticalMenuPage>
  );
};

export default Index;
