import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { Button } from '@/components/common';
import { ProfileForm } from '@/components/forms';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';

const Index = () => {
  const router = useRouter();
  const { signOut } = useStore(useCallback((state) => state.auth, []));

  return (
    <VerticalMenuPage>
      <div className="w-full p-16">
        <div className="card">
          <ProfileForm />
          <div className="mt-3 flex w-full">
            <Button
              theme="base"
              className="mr-5 w-full"
              onClick={async () => {
                await signOut();
                router.push('/');
              }}
            >
              Log out
            </Button>
            <Button theme="secondary" className="w-full">
              Change password
            </Button>
          </div>
        </div>
      </div>
    </VerticalMenuPage>
  );
};

export default Index;
