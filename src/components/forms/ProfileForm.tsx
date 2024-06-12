import cx from 'classnames';
import { Form, Formik } from 'formik';
import { useCallback, useEffect } from 'react';

import { Button, Form as CommonForm } from '@/components/common';
import { profileLabels } from '@/constants/labels';
import { profileSchema } from '@/constants/validation-schemas';
import useStore from '@/stores';
import type { ProfileType } from '@/types/common/user';
import arrayToOptions from '@/utils/arrayToOptions';

import styles from './Form.module.css';

export const ProfileForm = () => {
  const { user, getProfile, updateProfile, token } = useStore(useCallback((state) => state.auth, []))
  useEffect(() => {
    if (token) {
      getProfile(token);
    }
  }, [token, getProfile]);

  return (
    <Formik<ProfileType>
      initialValues={user}
      validationSchema={profileSchema}
      onSubmit={(values) => updateProfile(token as string, values)}
    >
      <Form className="w-full">
        <p className="title">User profile</p>
        <div className="py-6">
          <div className={cx(styles.row, 'my-2')}>
            <CommonForm.InputField
              name="last_name"
              placeholder={profileLabels.last_name}
              label={profileLabels.last_name}
              className={cx(styles.field, 'mr-4')}
            />
            <CommonForm.InputField
              name="first_name"
              placeholder={profileLabels.first_name}
              label={profileLabels.first_name}
              className={styles.field}
            />
          </div>
          <div className={cx(styles.row, 'my-2')}>
            <CommonForm.InputField
              name="phone_number"
              placeholder={profileLabels.phone_number}
              label={profileLabels.phone_number}
              className={cx(styles.field, 'mr-4')}
            />
            <CommonForm.SelectField
              options={arrayToOptions(['student', 'professor'])}
              name="role"
              placeholder={profileLabels.role}
              label={profileLabels.role}
              className={styles.field}
            />
          </div>
          <CommonForm.InputField
            name="institution"
            placeholder={profileLabels.institution}
            label={profileLabels.institution}
            className={styles.field}
          />
        </div>
        <Button type="submit" className="mb-2 w-full">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};
