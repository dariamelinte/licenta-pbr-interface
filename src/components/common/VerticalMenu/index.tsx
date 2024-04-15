import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import type { ModuleType } from '@/constants/menu-tabs';
import { tabs } from '@/constants/menu-tabs';
import styles from './VerticalMenu.module.css';

type VerticalMenuProps = {
  module: ModuleType;
};

export const VerticalMenu: React.FC<VerticalMenuProps> = ({ module }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {tabs[module].map(({ url, text }) => (
        <Link key={url} href={url} onClick={() => router.push(url)}>
          <p
            className={cx(styles.tab, {
              'bg-gray-800': router.asPath === url,
            })}
          >
            {text}
          </p>
        </Link>
      ))}
    </div>
  );
};
