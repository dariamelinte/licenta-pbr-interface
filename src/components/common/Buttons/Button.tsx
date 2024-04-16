/* eslint-disable */

import cx from 'classnames';
import React from 'react';

import { Loading } from '@/components/common/Loading';

import styles from './Button.module.css';

export type ButtonTheme = 'default' | 'secondary' | 'base' | 'danger';

export type ButtonSize = 'md' | 'sm' | 'text';

export const DEFAULT_THEME = 'default';
export const DEFAULT_SIZE = 'md';

export type ButtonProps = {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconEnd?: React.ReactNode;
  disabled?: boolean;
  underlined?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
  rounded?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      icon,
      iconEnd,
      size = DEFAULT_SIZE,
      theme = DEFAULT_THEME,
      type = "button",
      disabled,
      underlined,
      loading = false,
      rounded = false,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cx(
        {
          // [styles.hasIcon as string]: icon || iconEnd,
          [styles.button as string]: !underlined,
          [styles[theme] as string]: !underlined,
          [styles['underlined-button'] as string]: underlined,
          [styles[`underlined-${theme}`] as string]: underlined,
          [styles.rounded as string]: rounded,
        },
        styles[size],
        className
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {loading ? (
        <Loading className='h-5' />
      ): (
        <>
          {icon}
          {children}
          {iconEnd}
        </>
      )}
    </button>
  )
);