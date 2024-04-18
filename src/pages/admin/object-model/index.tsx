import { useEffect } from "react";

import { Dialog, Loading, Table } from "@/components/common";
import { objectModelColumns } from "@/components/common/Tables";
import { confirm } from "@/constants/confirm-dialog";
import { VerticalMenuPage } from "@/layouts";
import useStore from "@/stores";
import type { ObjectModelInfoApiType } from "@/types/common/api";
import { ConfirmDialogType } from "@/types/store/dialog";

const Index = () => {
  const { open, setOpen, setOnConfirm } = useStore((state) => state.dialog);
  const { objectModels, loading, getObjectModels, deleteObjectModel } =
    useStore((state) => state.objectModel);

  useEffect(() => {
    getObjectModels("info");
  }, [getObjectModels]);

  if (loading) {
    return (
      <VerticalMenuPage module="admin">
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  return (
    <VerticalMenuPage module="admin">
      <Table.Table<ObjectModelInfoApiType>
        title="Object models"
        data={objectModels as ObjectModelInfoApiType[]}
        columns={(columnHelper) =>
          objectModelColumns({
            columnHelper,
            onDelete: (id: string) => {
              setOpen("confirm-delete");
              setOnConfirm(() => deleteObjectModel(id));
            },
            onEdit: (id: string) => {
              console.log({ id });
            },
          })
        }
        onAddData={() => {
          console.log("add");
        }}
      />
      {open === "confirm-delete" && (
        <Dialog.Confirmation {...(confirm.delete as ConfirmDialogType)} />
      )}
    </VerticalMenuPage>
  );
};

export default Index;
