import type { PropsWithChildren } from 'react';
import React from 'react';

import { VerticalMenu } from '@/components/common';
import type { ModuleType } from '@/constants/menu-tabs';

import type { PageProps } from './Page';
import { Page } from './Page';

type VerticalMenuPageProps = PageProps & {
  module: ModuleType;
};

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
