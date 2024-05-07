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
  const { token, setToken } = useStore(state => state.auth);
  
  const handleAuthUser = useCallback(() => {
    // TODO: check if the token is expired or close to expiration
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

  return (
    <Page {...pageProps}>
      <Navbar />
      {children}
    </Page>
  );
}
