import type { PropsWithChildren } from 'react';
import React from 'react';

import { VerticalMenu } from '@/components/common';
import useStore from '@/stores';

import { AuthPage } from './AuthPage';
import type { PageProps } from './Page';

export function VerticalMenuPage({
  children,
  ...pageProps
}: PropsWithChildren<PageProps>) {
  const { email } = useStore(state => state.auth)

  return (
    <AuthPage {...pageProps}>
      <div className="flex">
        {email && <VerticalMenu module={"admin"} />}
        {children}
      </div>
    </AuthPage>
  );
}
