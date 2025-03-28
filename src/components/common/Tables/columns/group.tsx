import type { ColumnHelper } from '@tanstack/react-table';

import { Options } from '@/components/common';
import type { GroupApiType } from '@/types/common/api';

type GroupColumnsProps = {
  columnHelper: ColumnHelper<GroupApiType>;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onEdit?: (group: GroupApiType) => void;
};

export const groupColumns = ({
  columnHelper,
  onDelete,
  onEdit,
  onView,
}: GroupColumnsProps) => [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('code', {
    header: 'Code',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('students', {
    header: 'No. Studs.',
    cell: (info) => info.getValue().length,
  }),
  columnHelper.accessor('_id', {
    header: '',
    cell: (info) => (
      <Options
        onEdit={onEdit ? () => onEdit(info.row.original) : undefined}
        onDelete={onDelete ? () => onDelete?.(info.getValue()) : undefined}
        onView={onView ? () => onView(info.getValue()) : undefined}
      />
    ),
  }),
];
