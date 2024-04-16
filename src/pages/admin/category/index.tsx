import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Loading, Table, ConfirmationDialog } from "@/components/common";
import { ERROR_MESSAGE } from "@/constants/messages";
import { deleteCategory, getCategories } from "@/services/api/category";
import { CategoryApiType } from "@/types/common/api";
import useStore from "@/stores";
import { VerticalMenuPage } from "@/layouts";
import { categoryColumns } from "@/components/common/Tables";
import { confirm } from "@/constants/confirm-dialog";
import { ConfirmDialogType } from "@/types/store/confirmDialog";

const Index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryApiType[]>([]);

  const { setContent, setIsOpen, setOnConfirm } = useStore(
    (state) => state.confirmDialog
  );

  const handleGetCategories = async () => {
    try {
      const { data } = await getCategories();

      if (!data.success) throw Error(data.error);

      setCategories(data.data);
      setLoading(false);
      toast.info(data.message);
    } catch (error: any) {
      toast.error(error || ERROR_MESSAGE.default);
    }
  };

  const handleDeleteCategories = async (id: string) => {
    try {
      const { data } = await deleteCategory(id);

      if (!data.success) throw Error(data.error);

      const updatedCategories = categories.filter(
        ({ _id: { $oid } }) => $oid !== id
      );
      setCategories(updatedCategories);

      toast.info(data.message);
    } catch (error: any) {
      toast.error(error || ERROR_MESSAGE.default);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  const handleConfirmDelete = (id: string) => {
    setIsOpen(true);
    setContent(confirm.delete as ConfirmDialogType);
    setOnConfirm(() => handleDeleteCategories(id));
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
