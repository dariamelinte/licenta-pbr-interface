import { useEffect } from "react";

import { Loading, Table, Dialog } from "@/components/common";
import { CategoryApiType } from "@/types/common/api";
import useStore from "@/stores";
import { VerticalMenuPage } from "@/layouts";
import { categoryColumns } from "@/components/common/Tables";
import { confirm } from "@/constants/confirm-dialog";

const Index = () => {
  const { setIsOpen, setOnConfirm } = useStore(
    (state) => state.dialog
  );

  const { categories, loading, getCategories, deleteCategory } = useStore(
    (state) => state.category
  );

  useEffect(() => {
    getCategories();
  }, []);

  const handleConfirmDelete = (id: string) => {
    setIsOpen(true);
    setOnConfirm(() => deleteCategory(id));
  };

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
            onDelete: handleConfirmDelete,
            onEdit: (id) => console.log(`here ${id}`),
          })
        }
      />
      <Dialog.Confirmation {...confirm.delete} />
    </VerticalMenuPage>
  );
};

export default Index;
