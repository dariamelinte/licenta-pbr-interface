import type { ColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

import { Options } from "@/components/common";
import { CategoryApiType } from "@/types/common/api";

export type IdColProps = {
  check?: boolean;
  options?: boolean;
};

type ColumnsProps = IdColProps & {
  columnHelper: ColumnHelper<CategoryApiType>;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export const columns = ({ columnHelper, onDelete, onEdit }: ColumnsProps) => [
  columnHelper.accessor("name", {
    header: "Category",
    cell: (info) => (
      <Link href={`/admin/category/${info.row.original._id.$oid}`}>
        {info.getValue()}
      </Link>
    ),
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
