import type { ColumnHelper } from "@tanstack/react-table";

import { Options } from "@/components/common";
import { CategoryApiType } from "@/types/common/api";

type CategoryColumnsProps = {
  columnHelper: ColumnHelper<CategoryApiType>;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export const categoryColumns = ({
  columnHelper,
  onDelete,
  onEdit,
}: CategoryColumnsProps) => [
  columnHelper.accessor("name", {
    header: "Name",
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
