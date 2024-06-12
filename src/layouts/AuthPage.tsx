import Cookies from "js-cookie";
import { useRouter } from "next/router";
import type { PropsWithChildren } from "react";
import React, { useCallback, useEffect } from "react";

import { Navbar } from "@/components/common";
import useStore from "@/stores";
import { parseJwt } from "@/utils/parseJwt";

import { Page, type PageProps } from "./Page";

export function AuthPage({
  children,
  ...pageProps
}: PropsWithChildren<PageProps>) {
  const router = useRouter();
  const { token, expiration_time, setToken } = useStore(useCallback((state) => state.auth, []));

  const handleAuthUser = useCallback(() => {
    const cookieToken = Cookies.get(process.env.SECRET_TOKEN || "");
    let valid = false;

    if (token) {
      valid = Date.now() + 2 * 60 <= (expiration_time || 0) * 1000;
    } else if (cookieToken) {
      const { expiration_time: exp } = parseJwt(cookieToken);
      valid = Date.now() + 2 * 60 <= (exp || 0) * 1000;
    }

    if (!valid) {
      router.push("/");
      Cookies.remove(process.env.SECRET_TOKEN || "");
      return;
    }

    if (!token && cookieToken) {
      setToken(cookieToken);
    }
  }, [token, router, setToken, expiration_time]);

  useEffect(() => {
    handleAuthUser();
  }, [handleAuthUser]);

  useEffect(() => {}, [expiration_time]);

  return (
    <Page {...pageProps}>
      <Navbar />
      {children}
    </Page>
  );
}
