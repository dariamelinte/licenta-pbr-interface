import type { PropsWithChildren } from 'react';
import React, { useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';

import { Page, type PageProps } from './Page';
import useStore from '@/stores';
import { useRouter } from 'next/router';

export function UnauthPage({
  children,
  ...pageProps
}: PropsWithChildren<PageProps>) {
  const router = useRouter()
  const { token, setToken } = useStore(state => state.auth)

  const handleAuthUser = useCallback(() => {
    if (token) {
      router.push('/app');
      return
    }

    const cookieToken = Cookies.get(process.env.SECRET_TOKEN);

    console.log({ cookieToken, boop: process.env.SECRET_TOKEN, poob: process.env.API_URL })

    if (cookieToken) {
      setToken(cookieToken)
      router.push('/app')
    }
  }, [token, router, setToken])

  useEffect(() => {
    handleAuthUser();
  }, [handleAuthUser])

  return (
    <Page {...pageProps}>
      {children}
    </Page>
  );
}
