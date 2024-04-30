import { Dialog } from '@headlessui/react';
import cx from 'classnames';
import { Form, Formik } from 'formik';

import { Button, Form as CommonForm } from '@/components/common';
import { INITIAL_CATEGORY } from '@/constants/initial-objects';
import { categoryLabels } from '@/constants/labels';
import { categorySchema } from '@/constants/validation-schemas';
import useStore from '@/stores';
import type { CategoryApiType } from '@/types/common/api';
import type { CategoryType } from '@/types/common/category';

import { CustomDialog } from '../Dialog';
import styles from './Category.module.css';

type CategoryProps = {
  category: CategoryApiType | null;
};

export const Category: React.FC<CategoryProps> = ({ category }) => {
  const { setOpen, onConfirm } = useStore((state) => state.dialog);

  return (
    <CustomDialog>
      <Dialog.Panel className={styles.panel}>
        <Dialog.Title as="h3" className={styles.title}>
          {category ? 'Update' : 'Create new'} category
        </Dialog.Title>

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
      </Dialog.Panel>
    </CustomDialog>
  );
};
