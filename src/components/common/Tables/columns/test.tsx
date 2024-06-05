import type { ColumnHelper } from '@tanstack/react-table';
import cx from 'classnames';

import { Options } from '@/components/common';
import { testStatuses } from '@/constants/constants';
import type { TestApiType } from '@/types/common/api';

type TestColumnsProps = {
  columnHelper: ColumnHelper<TestApiType>;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onViewMultiple?: (id: string) => void;
};

export const testColumns = ({
  columnHelper,
  onDelete,
  onViewMultiple,
  onView,
}: TestColumnsProps) => {
  return [
    columnHelper.accessor('due_date', {
      header: 'Due date',
      cell: (info) => {
        const date = new Date(Number(info.getValue()));

        const isDue = date < new Date();
        return (
          <p
            className={cx(
              'font-semibold',
              isDue ? 'text-red-700' : 'text-blue-700',
            )}
          >
            {date.toUTCString()}
          </p>
        );
      },
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('min_score', {
      header: 'Min. score',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('max_score', {
      header: 'Max. score',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => testStatuses[info.getValue()],
    }),
    columnHelper.accessor('_id', {
      header: '',
      cell: (info) => (
        <Options
          onViewMultiple={
            onViewMultiple ? () => onViewMultiple(info.getValue()) : undefined
          }
          onDelete={onDelete ? () => onDelete?.(info.getValue()) : undefined}
          onView={onView ? () => onView(info.getValue()) : undefined}
        />
      ),
    }),
  ];
};
