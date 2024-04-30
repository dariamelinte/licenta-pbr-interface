import { useEffect, useState } from "react";

import { Dialog, Loading, Table } from "@/components/common";
import { objectModelColumns } from "@/components/common/Tables";
import { confirm } from "@/constants/confirm-dialog";
import { VerticalMenuPage } from "@/layouts";
import useStore from "@/stores";
import type {
  ObjectModelApiType,
} from "@/types/common/api";
import type { ConfirmDialogType } from "@/types/store/dialog";
import { ObjectModelInputType } from "@/types/common/objectModel";

const Index = () => {
  const [objectModel, setObjectModel] = useState<ObjectModelApiType | null>(
    null
  );

  const { open, setOpen, setOnConfirm } = useStore((state) => state.dialog);
  const {
    objectModels,
    loading,
    getObjectModels,
    deleteObjectModel,
    createObjectModel,
  } = useStore((state) => state.objectModel);

  useEffect(() => {
    getObjectModels();
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
      <Table.Table<ObjectModelApiType>
        title="Object models"
        data={objectModels}
        columns={(columnHelper) =>
          objectModelColumns({
            columnHelper,
            onDelete: (id: string) => {
              setOpen("confirm-delete");
              setOnConfirm(() => deleteObjectModel(id));
            },
            onEdit: (objectM) => {
              setObjectModel(objectM);
              setOpen("object-model");
              setOnConfirm((objM) => {
                console.log(objM);
                // update(ombjM);
                // setCategory(null);
              });
            },
          })
        }
        onAddData={() => {
          setObjectModel(null);
          setOpen("object-model");
          setOnConfirm(createObjectModel);
        }}
      />
      {open === "confirm-delete" && (
        <Dialog.Confirmation {...(confirm.delete as ConfirmDialogType)} />
      )}
      {open === "object-model" && (
        <Dialog.ObjectModel objectModel={objectModel} />
      )}
    </VerticalMenuPage>
  );
};

export default Index;
