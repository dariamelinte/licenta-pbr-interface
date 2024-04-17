import type { Table } from '@tanstack/react-table';
import cx from 'classnames';

import { Button } from '@/components/common/Buttons';
import { Input, Select } from '@/components/common/Form';
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from '@/components/icons';

import styles from './Pagination.module.css';

type PaginationProps<T> = {
  table: Table<T>;
};

export const Pagination = <T,>({ table }: PaginationProps<T>) => {
  return (
    <div className={styles.pagination}>
      <Button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        icon={<ChevronDoubleLeft className={styles.icon} />}
      />
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        icon={<ChevronLeft className={styles.icon} />}
      />
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        icon={<ChevronRight className={styles.icon} />}
      />
      <Button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
        icon={<ChevronDoubleRight className={styles.icon} />}
      />
      <span className={styles.details}>
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className={styles.details}>
        | Go to page:
        <Input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="max-w-[60px]"
        />
      </span>
      <Select
        className={cx(styles.details, 'max-w-[100px]')}
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        options={[10, 20, 30, 40, 50].map((pageSize) => ({
          value: pageSize,
          name: `Show ${pageSize}`,
        }))}
      />
    </div>
  );
};
