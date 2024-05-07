import { Dialog } from '@headlessui/react';

import { CategoryForm } from '@/components/forms';
import type { CategoryApiType } from '@/types/common/api';

import { CustomDialog } from '../Dialog';
import styles from './Category.module.css';

type CategoryProps = {
  category: CategoryApiType | null;
};

export const Category: React.FC<CategoryProps> = ({ category }) => {
  return (
    <CustomDialog>
      <Dialog.Panel className={styles.panel}>
        <Dialog.Title as="h3" className={styles.title}>
          {category ? 'Update' : 'Create new'} category
        </Dialog.Title>

        <CategoryForm category={category} />
      </Dialog.Panel>
    </CustomDialog>
  );
};
