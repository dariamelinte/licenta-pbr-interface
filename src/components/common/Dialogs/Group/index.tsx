import { Dialog } from '@headlessui/react';

import { GroupForm } from '@/components/forms';
import type { GroupFormType } from '@/types/common/group';

import { CustomDialog } from '../Dialog';
import styles from './Group.module.css';

type GroupProps = {
  group: GroupFormType | null;
};

export const Group: React.FC<GroupProps> = ({ group }) => {
  return (
    <CustomDialog>
      <Dialog.Panel className={styles.panel}>
        <Dialog.Title as="h3" className={styles.title}>
          {group ? 'Update' : 'Create new'} group
        </Dialog.Title>

        <GroupForm group={group} />
      </Dialog.Panel>
    </CustomDialog>
  );
};
