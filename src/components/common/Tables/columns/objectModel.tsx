import type { ColumnHelper } from "@tanstack/react-table";

import { Options } from "@/components/common";
import type { ObjectModelInfoApiType } from "@/types/common/api";
import useStore from "@/stores";

type ObjectModelColumnsProps = {
  columnHelper: ColumnHelper<ObjectModelInfoApiType>;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export const objectModelColumns = ({
  columnHelper,
  onDelete,
  onEdit,
}: ObjectModelColumnsProps) => {
  const { categories } = useStore((state) => state.category);
  console.log(categories);

  return [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("category_id.$oid", {
      header: "Category",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("_id.$oid", {
      header: "",
      cell: (info) => (
        <Options
          onEdit={() => onEdit(info.getValue())}
          onDelete={() => onDelete(info.getValue())}
        />
      ),
    }),
  ];
};
