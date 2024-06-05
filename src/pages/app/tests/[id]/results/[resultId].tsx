import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { Loading } from '@/components/common';
import { Board } from '@/components/playground';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';

const Index = () => {
  const router = useRouter();

  const { token } = useStore((state) => state.auth);
  const { getResultById, loading } = useStore((state) => state.result);
  const { loadPlayground } = useStore((state) => state.playground);

  const handleResult = useCallback(async () => {
    const { resultId } = router.query;
    if (!resultId || !token) return;

    const result = await getResultById(token, resultId as string);

    if (!result) return;

    const { instances, linkages, scale } = result;
    loadPlayground({ instances, linkages, scale });
  }, [getResultById, token, loadPlayground]);

  useEffect(() => {
    if (router.query.resultId) {
      handleResult();
    }
  }, [handleResult, router.query.resultId]);

  if (loading) {
    return (
      <VerticalMenuPage>
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  return (
    <VerticalMenuPage className="max-h-screen max-w-[100vw] overflow-hidden">
      <div className="w-full">
        <Board onAddInstance={() => {}} disabled />
      </div>
    </VerticalMenuPage>
  );
};

export default Index;
