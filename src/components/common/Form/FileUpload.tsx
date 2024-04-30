import React from 'react';
import { Field, getIn, useFormikContext } from 'formik';
import cx from 'classnames';

import { InputFieldProps } from './Input';
import styles from './Form.module.css';

export const FileUploadInput: React.FC<InputFieldProps> = ({
  className,
  name,
  label,
  inputClassName,
  accept
}) => {
  const formik = useFormikContext<{ [key: string]: string }>();
  const error = getIn(formik.errors, name);
  const touch = getIn(formik.touched, name);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    formik.setFieldValue(name, file);
  };

  return (
    <div className={className}>
      {label && <label className={styles.label}>{label}</label>}

      <Field
        name={name}
        type="file"
        className={cx(
          styles.input,
          {
            [styles['input-error'] as string]: touch && error,
          },
          inputClassName,
        )}
        onChange={handleChange}
        accept={accept}
      />

      {touch && error && <p className={styles.error}>{error}</p>}
    </div>
  );
};