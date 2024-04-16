import type { PropsWithChildren } from 'react';
import React from 'react';

import { VerticalMenu } from '@/components/common';
import { ModuleType } from '@/constants/menu-tabs';

import { Page, PageProps } from './Page';

type VerticalMenuPageProps = PageProps & {
  module: ModuleType;
}

export function VerticalMenuPage({
  module,
  children,
  ...pageProps
}: PropsWithChildren<VerticalMenuPageProps>) {
  return (
    <Page {...pageProps}>
      <div className="flex">
        <VerticalMenu module={module} />
        {children}
      </div>
    </Page>
  );
}

