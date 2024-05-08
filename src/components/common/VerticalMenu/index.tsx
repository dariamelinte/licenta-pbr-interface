import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { tabs } from "@/constants/menu-tabs";

import styles from "./VerticalMenu.module.css";
import { UserRoleType } from "@/types/common/user";

type VerticalMenuProps = {
  module: UserRoleType;
};

export const VerticalMenu: React.FC<VerticalMenuProps> = ({ module }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {tabs[module].map(({ url, text, icon }) => {
        console.log(router.asPath, url, router.asPath === url);
        return (
          <Link key={url} href={url} onClick={() => router.push(url)}>
            <div
              className={cx(styles.tab, {
                "bg-blue-800": router.asPath === url,
              })}
            >
              {icon}
              <p className={cx({ "pl-4": icon })}>{text}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
