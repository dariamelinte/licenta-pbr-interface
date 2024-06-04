import { VerticalMenuPage } from "@/layouts";
import { TestForm } from "@/components/forms";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useStore from "@/stores";
import { Loading } from "@/components/common";
import { toast } from "react-toastify";
import { TestInfoType } from "@/types/common/test";
import { timestampToDate } from "@/utils/timestampToDate";

const Index = () => {
  const router = useRouter();
  const [test, setTest] = useState<TestInfoType | null>(null);

  const { token, user } = useStore((state) => state.auth);
  const { getTestById, loading, updateTest } = useStore((state) => state.test);
  const { instances, linkages, scale, loadPlayground } = useStore(
    (state) => state.playground
  );

  const handleTest = useCallback(async () => {
    const result = await getTestById(
      token as string,
      router.query.id as string
    );

    if (!result) return;

    const { linkages, instances, scale, start_date, due_date, ...rest } =
      result;

    setTest({
      ...rest,
      start_date: timestampToDate(Number(start_date)),
      due_date: timestampToDate(Number(due_date)),
    });
    loadPlayground({ linkages, instances, scale });
  }, [getTestById, token, router.query.id, setTest]);

  useEffect(() => {
    handleTest();
  }, [handleTest]);

  if (!test || loading) {
    return (
      <VerticalMenuPage>
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  const handleSubmit = (values: TestInfoType) => {
    if (!(Object.keys(instances).length && linkages.length)) {
      toast.error("You need to have a board in order to update a test!");
      return;
    }

    if (user.role === "student") {
      // TODO: call for submitting the results
    } else {
      updateTest((token as string), {
        ...values,
        instances: instances,
        linkages,
        scale,
      });
    }
  };

  return (
    <VerticalMenuPage className="max-w-[100vw] max-h-[100vh] overflow-hidden">
      <TestForm onSubmit={handleSubmit} initialTest={test} />
    </VerticalMenuPage>
  );
};

export default Index;
