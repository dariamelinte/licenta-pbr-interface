import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Loading } from '@/components/common';
import { Board } from '@/components/playground';
import { AuthPage } from '@/layouts';
import useStore from '@/stores';

const Index = () => {
  const { loading, getObjectModels } = useStore((state) => state.objectModel);
  const { addObjectInstance, instances, linkages } = useStore((state) => state.playground);

  useEffect(() => {
    getObjectModels();
  }, [getObjectModels]);

  // console.log({ instances, linkages})

  if (loading) {
    return <Loading size='large' />
  }

  return (
    <AuthPage className="max-w-[100vw] overflow-hidden">
      <Board onAddInstance={(id, position) => addObjectInstance(uuidv4(), id, position)} />
    </AuthPage>
  );
};

export default Index;
