import cx from 'classnames';
import { Field, getIn, useFormikContext } from 'formik';
import React from 'react';

import styles from './Form.module.css';

type HTMLTextAreaProps = JSX.IntrinsicElements['textarea'];

type TextAreaFieldProps = HTMLTextAreaProps & {
  name: string;
  placeholder: string;
  label?: string;
  className?: string;
  inputClassName?: string;
};

export const TextArea: React.FC<HTMLTextAreaProps> = ({
  className,
  ...rest
}) => {
  return <textarea className={cx(styles.input, className)} {...rest} />;
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  className,
  inputClassName,
  onChange,
  onBlur,
  ...rest
}) => {
  const formik = useFormikContext<{ [key: string]: string }>();
  const error = getIn(formik.errors, name);
  const touch = getIn(formik.touched, name);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      formik.setFieldValue(name, e.target.value, true);
    }
  };

  const handleFocus = () => {
    formik.setFieldTouched(name);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(e);
    } else {
      formik.handleBlur(e);
    }
  };

  return (
    <div className={className}>
      {label && <label className={styles.label}>{label}</label>}

      <Field
        as={TextArea}
        name={name}
        className={cx(
          styles.input,
          {
            [styles['input-error'] as string]: touch && error,
          },
          inputClassName,
        )}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />

      {touch && error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
