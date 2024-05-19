import cx from "classnames";
import Head from "next/head";
import type { PropsWithChildren } from "react";
import React from "react";
import { ToastContainer } from "react-toastify";

const TITLE = "CSP Interface";

export interface PageProps {
  title?: string;
  errorMessage?: string;
  className?: string;
}

export function PageMeta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("min-h-screen bg-slate-200", className)}>{children}</div>
  );
}

export function Page({
  children,
  title = TITLE,
  errorMessage,
  className,
}: PropsWithChildren<PageProps>) {
  let content = children;

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
      <PageMeta className={className}>
        {content}
        <ToastContainer />
      </PageMeta>
    </>
  );
}
