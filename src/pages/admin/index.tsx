import { VerticalMenu } from '@/components/common/VerticalMenu';
import { Page } from '@/layouts/Page';

const Index = () => {
  return (
    <Page>
      <div className="flex">
        <VerticalMenu module="admin" />
        hello world
      </div>
    </Page>
  );
};

export default Index;
