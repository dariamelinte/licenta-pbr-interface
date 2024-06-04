import { toast } from 'react-toastify';

import { TestForm } from '@/components/forms';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';
import type { TestInfoType } from '@/types/common/test';

const Index = () => {
  const { token } = useStore((state) => state.auth);
  const { createTest } = useStore((state) => state.test);
  const { instances, linkages, scale } = useStore((state) => state.playground);

  const handleSubmit = (values: TestInfoType) => {
    if (!(Object.keys(instances).length && linkages.length)) {
      toast.error('You need to create a board in order to create a test!');
      return;
    }

    createTest(token as string, {
      ...values,
      instances,
      linkages,
      scale,
    });
  };

  return (
    <VerticalMenuPage className="max-h-screen max-w-[100vw] overflow-hidden">
      <TestForm onSubmit={handleSubmit} />
    </VerticalMenuPage>
  );
};

export default Index;
