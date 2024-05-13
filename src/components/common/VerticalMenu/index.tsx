import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { tabs } from '@/constants/menu-tabs';
import type { UserRoleType } from '@/types/common/user';

import styles from './VerticalMenu.module.css';

type VerticalMenuProps = {
  module: UserRoleType;
};

export const VerticalMenu: React.FC<VerticalMenuProps> = ({ module }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {tabs[module].map(({ url, text, icon }) => {
        return (
          <Link key={url} href={url} onClick={() => router.push(url)}>
            <div
              className={cx(styles.tab, {
                'bg-blue-800': router.asPath === url,
              })}
            >
              {icon}
              <p className={cx({ 'pl-4': icon })}>{text}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
