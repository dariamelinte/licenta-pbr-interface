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
  const { token } = useStore((state) => state.auth)
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
      <VerticalMenuPage>
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  return (
    <VerticalMenuPage>
      <Table.Table<CategoryApiType>
        className="m-8"
        title="Categories"
        data={categories}
        columns={(columnHelper) =>
          categoryColumns({
            columnHelper,
            onDelete: (id: string) => {
              setOpen('confirm-delete');
              setOnConfirm(() => deleteCategory(token as string, id));
            },
            onEdit: (cat) => {
              setCategory(cat);
              setOpen('category');
              setOnConfirm((catt: CategoryApiType) => {
                updateCategory(token as string, catt);
                setCategory(null);
              });
            },
          })
        }
        onAddData={() => {
          setCategory(null);
          setOpen('category');
          setOnConfirm((values) => createCategory(token as string, values));
        }}
      />
      {open === 'confirm-delete' && (
        <Dialog.Confirmation {...(confirm.delete as ConfirmDialogType)} />
      )}
      {open === 'category' && <Dialog.Category category={category} />}
    </VerticalMenuPage>
  );
};

export default Index;
