import { Dialog } from '@headlessui/react';

import { ObjectModelForm } from '@/components/forms';
import type { ObjectModelApiType } from '@/types/common/api';

import { CustomDialog } from '../Dialog';
import styles from './ObjectModel.module.css';

type ObjectModelProps = {
  objectModel: ObjectModelApiType | null;
};

export const ObjectModel: React.FC<ObjectModelProps> = ({ objectModel }) => {
  return (
    <CustomDialog>
      <Dialog.Panel className={styles.panel}>
        <Dialog.Title as="h3" className={styles.title}>
          {objectModel ? 'Update' : 'Create new'} object model
        </Dialog.Title>

        <ObjectModelForm objectModel={objectModel} />
      </Dialog.Panel>
    </CustomDialog>
  );
};
