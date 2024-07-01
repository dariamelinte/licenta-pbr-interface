import { Form, Formik } from 'formik';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Form as CommonForm } from '@/components/common';
import { INITIAL_GROUP } from '@/constants/initial-objects';
import { groupLabels } from '@/constants/labels';
import { groupSchema } from '@/constants/validation-schemas';
import useStore from '@/stores';
import type { GroupFormType } from '@/types/common/group';

import styles from './Form.module.css';

type GroupFormProps = {
  group: GroupFormType | null;
};

export const GroupForm: React.FC<GroupFormProps> = ({ group }) => {
  const { setOpen, onConfirm } = useStore(
    useCallback((state) => state.dialog, []),
  );

  return (
    <Formik<GroupFormType>
      initialValues={group || INITIAL_GROUP(uuidv4())}
      validationSchema={groupSchema}
      onSubmit={(values) => {
        onConfirm(values);
        setOpen(null);
      }}
    >
      <Form className="w-full">
        <div className="my-4">
          <CommonForm.InputField
            name="name"
            label={groupLabels.name}
            placeholder={groupLabels.name}
            className={styles.field}
          />
          <CommonForm.InputField
            name="code"
            label={groupLabels.code}
            placeholder={groupLabels.code}
            className={styles.field}
            disabled
          />
        </div>
        <CommonForm.ActionButtons onCancel={() => setOpen(null)} />
      </Form>
    </Formik>
  );
};
