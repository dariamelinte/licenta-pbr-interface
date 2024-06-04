import cx from 'classnames';
import { useEffect, useMemo } from 'react';

import { Form as CommonForm } from '@/components/common';
import { testStatuses } from '@/constants/constants';
import { testLabels } from '@/constants/labels';
import useStore from '@/stores';

import styles from '../Form.module.css';

type TestFormProps = {};

export const TestInformationForm: React.FC<TestFormProps> = () => {
  const { token } = useStore((state) => state.auth);
  const { groups, getGroups } = useStore((state) => state.group);

  const groupOptions = useMemo(
    () => [
      { value: undefined, name: testLabels.group },
      ...groups.map((group) => ({ value: group._id, name: group.name })),
    ],
    [groups],
  );

  useEffect(() => {
    if (token) {
      getGroups(token);
    }
  }, [getGroups, token]);

  return (
    <>
      <div className={styles.row}>
        <CommonForm.InputField
          name="name"
          label={testLabels.name}
          placeholder={testLabels.name}
          className={styles.field}
        />
      </div>
      <div className={styles.row}>
        <CommonForm.SelectField
          options={Object.entries(testStatuses).map(([key, value]) => ({
            value: key,
            name: value,
          }))}
          name="status"
          label={testLabels.status}
          placeholder={testLabels.status}
          className={styles.field}
        />
      </div>
      <div className={styles.row}>
        <CommonForm.SelectField
          options={groupOptions}
          name="group"
          label={testLabels.group}
          placeholder={testLabels.group}
          className={styles.field}
        />
      </div>
      <div className={styles.row}>
        <CommonForm.TextAreaField
          name="description"
          label={testLabels.description}
          placeholder={testLabels.description}
          className={styles.field}
          rows={10}
        />
      </div>
      <div className={styles.row}>
        <CommonForm.InputField
          name="min_score"
          label={testLabels.min_score}
          placeholder={testLabels.min_score}
          className={styles.field}
          type="number"
        />
        <CommonForm.InputField
          name="max_score"
          label={testLabels.max_score}
          placeholder={testLabels.max_score}
          className={cx(styles.field, 'ml-3 md:0')}
          type="number"
        />
      </div>
      <div className={styles.row}>
        <CommonForm.InputField
          name="start_date"
          label={testLabels.start_date}
          placeholder={testLabels.start_date}
          className={cx(styles.field, 'mr-3 md:0')}
          type="date"
        />
        <CommonForm.InputField
          name="due_date"
          label={testLabels.due_date}
          placeholder={testLabels.due_date}
          className={styles.field}
          type="date"
        />
      </div>
    </>
  );
};
