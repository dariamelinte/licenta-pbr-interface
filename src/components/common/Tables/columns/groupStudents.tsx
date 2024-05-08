import type { ColumnHelper } from '@tanstack/react-table';

import { Options } from '@/components/common';
import type { ProfileType } from '@/types/common/user';

type GroupColumnsProps = {
  columnHelper: ColumnHelper<ProfileType>;
  onDelete?: (id: string) => void;
};

export const groupStudentsColumns = ({
  columnHelper,
  onDelete,
}: GroupColumnsProps) => [
  columnHelper.accessor('last_name', {
    header: 'Last name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('first_name', {
    header: 'First name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('phone_number', {
    header: 'Phone number',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('institution', {
    header: 'Institution',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('credential', {
    header: '',
    cell: (info) => (
      <Options
        onDelete={
          onDelete ? () => onDelete?.(info.getValue() as string) : undefined
        }
      />
    ),
  }),
];
