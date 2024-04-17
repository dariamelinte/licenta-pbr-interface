import { Dialog } from '@headlessui/react';
import cx from 'classnames';

import { Button } from '@/components/common';
import useStore from '@/stores';
import type { ConfirmDialogType } from '@/types/store/dialog';

import { CustomDialog } from '../Dialog';
import styles from './Confirmation.module.css';

export const Confirmation: React.FC<ConfirmDialogType> = ({
  title,
  content,
  action,
}) => {
  const { setOpen, onConfirm } = useStore((state) => state.dialog);

  return (
    <CustomDialog>
      <Dialog.Panel className={styles.panel}>
        <Dialog.Title as="h3" className={styles.title}>
          {title}
        </Dialog.Title>
        <p className={styles.content}>{content}</p>

        <div className={styles.row}>
          <Button
            className={cx(styles.button, 'm-0 md:mr-4')}
            onClick={() => setOpen(null)}
            theme="base"
          >
            Cancel
          </Button>
          <Button
            className={styles.button}
            onClick={() => {
              onConfirm();
              setOpen(null);
            }}
          >
            {action}
          </Button>
        </div>
      </Dialog.Panel>
    </CustomDialog>
  );
};
