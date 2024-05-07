import { Dialog } from '@headlessui/react';
import cx from 'classnames';
import { Form, Formik } from 'formik';

import { Form as CommonForm } from '@/components/common';
import { INITIAL_CATEGORY } from '@/constants/initial-objects';
import { categoryLabels } from '@/constants/labels';
import { categorySchema } from '@/constants/validation-schemas';
import useStore from '@/stores';
import type { CategoryApiType } from '@/types/common/api';
import type { CategoryType } from '@/types/common/category';

import styles from './Form.module.css';

type CategoryFormProps = {
  category: CategoryApiType | null;
};

export const CategoryForm: React.FC<CategoryFormProps> = ({ category }) => {
  const { setOpen, onConfirm } = useStore((state) => state.dialog);

  return (
    <Formik<CategoryType>
      initialValues={category || INITIAL_CATEGORY}
      validationSchema={categorySchema}
      onSubmit={(values) => {
        onConfirm(values);
        setOpen(null);
      }}
    >
      <Form className="w-full">
        <div className={cx(styles.row, 'my-4')}>
          <CommonForm.InputField
            name="name"
            label={categoryLabels.name}
            placeholder={categoryLabels.name}
            className={styles.field}
          />
        </div>
        <CommonForm.ActionButtons onCancel={() => setOpen(null)} />
      </Form>
    </Formik>
  );
};
