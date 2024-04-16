import type {
  AccessorKeyColumnDef,
  ColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import cx from "classnames";
import { useState } from "react";

import { Button, Pagination } from "@/components/common";
import { ChevronDown, Plus } from "@/components/icons";

import styles from "./Tables.module.css";

type TableProps<T> = {
  title: string;
  data: T[];
  columns: (columnHelper: ColumnHelper<T>) => AccessorKeyColumnDef<T, any>[];
  onAddData?: () => void;
};

export function Table<T>({ title, data, columns, onAddData }: TableProps<T>) {
  const columnHelper = createColumnHelper<TableProps<T>["data"][number]>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<T>({
    data,
    columns: columns(columnHelper),
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
        {onAddData ? <Button icon={<Plus />} onClick={onAddData} /> : null}
      </div>
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
    </div>
  );
}
