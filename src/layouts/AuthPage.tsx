import type { PropsWithChildren } from 'react';
import React from 'react';

import { Navbar } from '@/components/common';

import { Page, type PageProps } from './Page';

export function AuthPage({
  children,
  ...pageProps
}: PropsWithChildren<PageProps>) {
  return (
    <Page {...pageProps}>
      <Navbar />
      {children}
    </Page>
  );
}
