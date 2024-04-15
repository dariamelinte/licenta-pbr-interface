import type { SortingState } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import cx from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

import { ConfirmationDialog, Pagination } from "@/components/common";
import { ChevronDown } from "@/components/icons";
import useStore from "@/stores";
import { confirm } from "@/constants/confirm-dialog";
import { CategoryApiType } from "@/types/common/api";
import type { ConfirmDialogType } from "@/types/common/ConfirmDialog";

import type { IdColProps } from "./columns/category";
import { columns } from "./columns/category";

import styles from "./Tables.module.css";

type CategoryTableProps = IdColProps & {
  categories: CategoryApiType[];
  onDeleteCategory: (categoryId: string) => void;
};

export default function CategoryTable({
  categories,
  onDeleteCategory,
  ...rest
}: CategoryTableProps) {
  const router = useRouter();
  const columnHelper =
    createColumnHelper<CategoryTableProps["categories"][number]>();

  const { setConfirmDialog, setIsDialogOpen, setOnConfirmDialog } = useStore();

  const handleConfirmDelete = (batchId: string) => {
    setIsDialogOpen(true);
    setConfirmDialog(confirm.delete as ConfirmDialogType);
    setOnConfirmDialog(() => onDeleteCategory(batchId));
  };

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: categories,
    columns: columns({
      columnHelper,
      onDelete: handleConfirmDelete,
      onEdit: (id: string) => router.push(`/admin/category/${id}`),
      ...rest,
    }),
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full px-4 py-2">
      <table className={styles.table}>
        <thead className={styles.header}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? cx(styles.head, "cursor-pointer select-none")
                          : styles.head
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: (
                          <ChevronDown
                            className={cx(styles.icon, "rotate-180 transform")}
                          />
                        ),
                        desc: <ChevronDown className={styles.icon} />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(({ id, getVisibleCells }) => (
            <tr key={id} className={styles.row}>
              {getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination table={table} />
      <ConfirmationDialog />
    </div>
  );
}
