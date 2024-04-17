import type { ColumnHelper } from '@tanstack/react-table';

import { Options } from '@/components/common';
import type { CategoryApiType } from '@/types/common/api';

type CategoryColumnsProps = {
  columnHelper: ColumnHelper<CategoryApiType>;
  onDelete: (id: string) => void;
  onEdit: (id: CategoryApiType) => void;
};

export const categoryColumns = ({
  columnHelper,
  onDelete,
  onEdit,
}: CategoryColumnsProps) => [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('_id.$oid', {
    header: '',
    cell: (info) => (
      <Options
        onEdit={() => onEdit(info.row.original)}
        onDelete={() => onDelete(info.getValue())}
      />
    ),
  }),
];
