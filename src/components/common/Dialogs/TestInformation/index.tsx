import { Dialog } from '@headlessui/react';

import { TestInformationForm } from '@/components/forms/TestForm/TestInformationForm';
import { TestInfoType } from '@/types/common/test';

import { CustomDialog } from '../Dialog';

import styles from './TestInformation.module.css';

type TestInformationProps = {
};

export const TestInformation: React.FC<TestInformationProps> = () => {
  return (
    <CustomDialog>
      <Dialog.Panel className={styles.panel}>
        <Dialog.Title as="h3" className={styles.title}>
          Complete test information
        </Dialog.Title>

        <TestInformationForm />
      </Dialog.Panel>
    </CustomDialog>
  );
};
