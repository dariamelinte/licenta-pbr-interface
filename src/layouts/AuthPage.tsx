import type { PropsWithChildren } from 'react';
import React, { useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';

import { Navbar } from '@/components/common';

import { Page, type PageProps } from './Page';
import useStore from '@/stores';
import { useRouter } from 'next/router';

export function AuthPage({
  children,
  ...pageProps
}: PropsWithChildren<PageProps>) {
  const router = useRouter()
  const { token, expiration_time, setToken } = useStore(state => state.auth);
  
  const handleAuthUser = useCallback(() => {
    const isAboutToExpire = (Date.now() + 10 * 60 * 1000) >= (expiration_time || 0) * 1000
    if (isAboutToExpire) {
      router.push('/')
    }

    if (token) {
      return
    }

    const cookieToken = Cookies.get(process.env.SECRET_TOKEN);

    if (cookieToken) {
      setToken(cookieToken)
      return
    }

    router.push('/')
  }, [token, router, setToken])

  useEffect(() => {
    handleAuthUser();
  }, [handleAuthUser])

  useEffect(() => {

  }, [expiration_time])

  return (
    <Page {...pageProps}>
      <Navbar />
      {children}
    </Page>
  );
}
