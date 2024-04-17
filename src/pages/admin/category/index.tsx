import { useEffect } from "react";

import { Loading, Table, Dialog } from "@/components/common";
import { CategoryApiType } from "@/types/common/api";
import useStore from "@/stores";
import { VerticalMenuPage } from "@/layouts";
import { categoryColumns } from "@/components/common/Tables";
import { confirm } from "@/constants/confirm-dialog";

const Index = () => {
  const { open, setOpen, setOnConfirm } = useStore((state) => state.dialog);

  const { categories, loading, getCategories, deleteCategory, createCategory } =
    useStore((state) => state.category);

  useEffect(() => {
    getCategories();
  }, []);

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
              setOpen("confirm-delete");
              setOnConfirm(() => deleteCategory(id));
            },
            onEdit: (id) => console.log(`here ${id}`),
          })
        }
        onAddData={() => {
          setOpen("category-create");
          setOnConfirm(createCategory);
        }}
      />
      {open === "confirm-delete" && <Dialog.Confirmation {...confirm.delete} />}
      {open === "category-create" && <Dialog.Category />}
    </VerticalMenuPage>
  );
};

export default Index;
