import cx from 'classnames';
import { Form, Formik } from 'formik';
import { useEffect, useMemo } from 'react';

import { Form as CommonForm } from '@/components/common';
import { INITIAL_OBJECT_MODEL } from '@/constants/initial-objects';
import { objectModelLabels } from '@/constants/labels';
import { objectModelSchema } from '@/constants/validation-schemas';
import useStore from '@/stores';
import type { ObjectModelApiType } from '@/types/common/api';
import type { ObjectModelInputType } from '@/types/common/objectModel';

import styles from './Form.module.css';

type ObjectModelProps = {
  objectModel: ObjectModelApiType | null;
};

export const ObjectModelForm: React.FC<ObjectModelProps> = ({
  objectModel,
}) => {
  const { setOpen, onConfirm } = useStore((state) => state.dialog);
  const { categories, getCategories } = useStore((state) => state.category);

  const optionsCategories = useMemo(
    () => [
      { value: undefined, name: objectModelLabels.category },
      ...categories.map(({ _id, name }) => ({ value: _id, name })),
    ],
    [categories],
  );

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Formik<ObjectModelInputType | ObjectModelApiType>
      initialValues={objectModel || INITIAL_OBJECT_MODEL}
      validationSchema={objectModelSchema}
      onSubmit={(values) => {
        onConfirm(values);
        setOpen(null);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="w-full">
          <div className={styles.row}>
            <CommonForm.InputField
              name="name"
              label={objectModelLabels.name}
              placeholder={objectModelLabels.name}
              className={styles.field}
            />
          </div>
          <div className={styles.row}>
            <CommonForm.SelectField
              name="category"
              label={objectModelLabels.category}
              placeholder={objectModelLabels.category}
              className={styles.field}
              options={optionsCategories}
            />
          </div>
          <div className={cx(styles.row, 'mb-3')}>
            <CommonForm.TextAreaField
              name="description"
              label={objectModelLabels.description}
              placeholder={objectModelLabels.description}
              className={styles.field}
              rows={10}
            />
          </div>
          <div>
            <CommonForm.Label text={objectModelLabels.model} />
            <CommonForm.Input
              type="file"
              accept=".glb, .gltf"
              className="flex-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.currentTarget.files && e.currentTarget.files[0];
                setFieldValue('model', file);
              }}
            />
          </div>
          <CommonForm.ActionButtons onCancel={() => setOpen(null)} />
        </Form>
      )}
    </Formik>
  );
};
