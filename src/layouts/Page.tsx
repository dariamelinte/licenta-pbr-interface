import Head from 'next/head';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { Navbar } from '@/components/common';

const TITLE = 'CSP Interface';

interface PageProps {
  title?: string;
  errorMessage?: string;
}

export function PageMeta({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-200">{children}</div>;
}

function Page({
  children,
  title = TITLE,
  errorMessage, 
}: PropsWithChildren<PageProps>) {
  let content = (
    <>
      <Navbar />
      {children}
    </>
  );

  if (errorMessage) {
    content = <PageMeta>{errorMessage}</PageMeta>;
  }

  return (
    <>
      <Head>
        {title && (
          <title>{title === TITLE ? TITLE : `${title} - ${TITLE}`}</title>
        )}
        <meta key="title" property="og:title" content="My page title" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <PageMeta>{content}</PageMeta>
    </>
  );
}

export default Page;
