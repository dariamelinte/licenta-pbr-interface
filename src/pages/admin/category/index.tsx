import { useEffect } from "react";

import { Loading, Table, ConfirmationDialog } from "@/components/common";
import { CategoryApiType } from "@/types/common/api";
import useStore from "@/stores";
import { VerticalMenuPage } from "@/layouts";
import { categoryColumns } from "@/components/common/Tables";
import { confirm } from "@/constants/confirm-dialog";
import { ConfirmDialogType } from "@/types/store/confirmDialog";

const Index = () => {
  const { setContent, setIsOpen, setOnConfirm } = useStore(
    (state) => state.confirmDialog
  );

  const { categories, loading, getCategories, deleteCategory } = useStore(
    (state) => state.category
  );

  useEffect(() => {
    getCategories();
  }, []);

  const handleConfirmDelete = (id: string) => {
    setIsOpen(true);
    setContent(confirm.delete as ConfirmDialogType);
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
      <ConfirmationDialog />
    </VerticalMenuPage>
  );
};

export default Index;
