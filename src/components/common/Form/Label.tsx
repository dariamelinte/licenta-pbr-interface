import cx from 'classnames';
import React from 'react';

import styles from './Form.module.css';

export type LabelProps = {
  text: string;
  className?: string;
};

export const Label: React.FC<LabelProps> = ({ text, className }) => {
  return <label className={cx(styles.label, className)}>{text}</label>;
};
