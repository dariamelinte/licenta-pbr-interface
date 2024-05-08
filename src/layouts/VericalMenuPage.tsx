import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';

import { VerticalMenu } from '@/components/common';
import useStore from '@/stores';

import { AuthPage } from './AuthPage';
import type { PageProps } from './Page';

export function VerticalMenuPage({
  children,
  ...pageProps
}: PropsWithChildren<PageProps>) {
  const { user, getProfile, token } = useStore((state) => state.auth);

  useEffect(() => {
    getProfile(token as string)
  }, [getProfile, token])

  return (
    <AuthPage {...pageProps}>
      <div className="flex">
        {user.role ? <VerticalMenu module={user.role} /> : null}
        {children}
      </div>
    </AuthPage>
  );
}
