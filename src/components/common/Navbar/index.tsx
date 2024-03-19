import Link from 'next/link';
import React from 'react';

import { routes } from '@/constants/routes';

import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.container}>
      {routes.map(({ url, text, icon }) => (
        <Link href={url} key={url} className={styles.link}>
          {icon || text}
        </Link>
      ))}
    </nav>
  );
};
