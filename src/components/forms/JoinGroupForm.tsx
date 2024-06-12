import { Form, Formik } from 'formik';

import { Form as CommonForm } from '@/components/common';
import { INITIAL_JOIN_GROUP } from '@/constants/initial-objects';
import { groupLabels } from '@/constants/labels';
import { joinGroupSchema } from '@/constants/validation-schemas';
import useStore from '@/stores';
import type { JoinGroupFormType } from '@/types/common/group';

import styles from './Form.module.css';
import { useCallback } from 'react';

export const JoinGroupForm: React.FC = () => {
  const { setOpen, onConfirm } = useStore(useCallback((state) => state.dialog, []));

  return (
    <Formik<JoinGroupFormType>
      initialValues={INITIAL_JOIN_GROUP}
      validationSchema={joinGroupSchema}
      onSubmit={(values) => {
        onConfirm(values);
        setOpen(null);
      }}
    >
      <Form className="w-full">
        <div className="my-4">
          <CommonForm.InputField
            name="code"
            label={groupLabels.code}
            placeholder={groupLabels.code}
            className={styles.field}
          />
        </div>
        <CommonForm.ActionButtons onCancel={() => setOpen(null)} />
      </Form>
    </Formik>
  );
};
