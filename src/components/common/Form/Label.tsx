import React from 'react';

import styles from './Form.module.css';


export type LabelProps = {
    text: string;
}

export const Label: React.FC<LabelProps> = ({ text }) => {
  return <label className={styles.label}>{text}</label>;
};