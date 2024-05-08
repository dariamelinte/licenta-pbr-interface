import { Dialog } from '@headlessui/react';

import { JoinGroupForm } from '@/components/forms';

import { CustomDialog } from '../Dialog';
import styles from './Group.module.css';

export const JoinGroup: React.FC = () => {
  return (
    <CustomDialog>
      <Dialog.Panel className={styles.panel}>
        <Dialog.Title as="h3" className={styles.title}>
          Join group
        </Dialog.Title>

        <JoinGroupForm />
      </Dialog.Panel>
    </CustomDialog>
  );
};
