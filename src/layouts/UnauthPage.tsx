import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';
import React, { useCallback, useEffect } from 'react';

import useStore from '@/stores';

import { Page, type PageProps } from './Page';

export function UnauthPage({
  children,
  ...pageProps
}: PropsWithChildren<PageProps>) {
  const router = useRouter();
  const { token, expiration_time, setToken } = useStore((state) => state.auth);

  const handleAuthUser = useCallback(() => {
    // const isAboutToExpire = (Date.now() + 10 * 60 * 1000) >= (expiration_time || 0) * 1000

    // if (isAboutToExpire) {
    //   return;
    // }

    if (token) {
      router.push('/app');
      return;
    }

    const cookieToken = Cookies.get(process.env.SECRET_TOKEN);

    if (cookieToken) {
      setToken(cookieToken);
      router.push('/app');
    }
  }, [token, router, setToken, expiration_time]);

  useEffect(() => {
    handleAuthUser();
  }, [handleAuthUser]);

  return <Page {...pageProps}>{children}</Page>;
}
