import { useEffect, useState } from 'react';

import { Dialog, Loading, Table } from '@/components/common';
import { categoryColumns } from '@/components/common/Tables';
import { confirm } from '@/constants/confirm-dialog';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';
import type { CategoryApiType } from '@/types/common/api';
import type { ConfirmDialogType } from '@/types/store/dialog';

const Index = () => {
  const [category, setCategory] = useState<CategoryApiType | null>(null);

  const { open, setOpen, setOnConfirm } = useStore((state) => state.dialog);
  const {
    categories,
    loading,
    getCategories,
    deleteCategory,
    createCategory,
    updateCategory,
  } = useStore((state) => state.category);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (loading) {
    return (
      <VerticalMenuPage module="admin">
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  return (
    <VerticalMenuPage module="admin">
      <Table.Table<CategoryApiType>
        title="Categories"
        data={categories}
        columns={(columnHelper) =>
          categoryColumns({
            columnHelper,
            onDelete: (id: string) => {
              setOpen('confirm-delete');
              setOnConfirm(() => deleteCategory(id));
            },
            onEdit: (cat) => {
              setCategory(cat);
              setOpen('category-edit');
              setOnConfirm((catt: CategoryApiType) => {
                updateCategory(catt);
                setCategory(null);
              });
            },
          })
        }
        onAddData={() => {
          setOpen('category-create');
          setOnConfirm(createCategory);
        }}
      />
      {open === 'confirm-delete' && (
        <Dialog.Confirmation {...(confirm.delete as ConfirmDialogType)} />
      )}
      {(open === 'category-create' || open === 'category-edit') && (
        <Dialog.Category category={category} />
      )}
    </VerticalMenuPage>
  );
};

export default Index;
