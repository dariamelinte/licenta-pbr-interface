import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { TestForm } from '@/components/forms';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';
import type { TestType } from '@/types/common/test';

const Index = () => {
  const router = useRouter();
  const { token } = useStore(useCallback((state) => state.auth, []));
  const { createTest } = useStore(useCallback((state) => state.test, []));
  const { createResult } = useStore(useCallback((state) => state.result, []));
  const { instances, linkages, scale } = useStore(
    useCallback((state) => state.playground, []),
  );

  const handleSubmit = async (values: TestType) => {
    if (!(Object.keys(instances).length && linkages.length)) {
      toast.error('You need to create a board in order to create a test!');
      return;
    }

    const test = await createTest(token as string, values);

    if (!test) return;

    await createResult(token as string, {
      instances,
      linkages,
      scale,
      test: test._id,
      submission_time: new Date(),
    });

    router.push(`/app/tests/${test._id}`);
  };

  return (
    <VerticalMenuPage className="max-h-screen max-w-[100vw] overflow-hidden">
      <TestForm onSubmit={handleSubmit} shouldResetBoard />
    </VerticalMenuPage>
  );
};

export default Index;
