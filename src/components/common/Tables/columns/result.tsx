import type { ColumnHelper } from '@tanstack/react-table';

import { Options } from '@/components/common';
import type { UserResultType } from '@/types/common/result';

type ResultColumnsProps = {
  columnHelper: ColumnHelper<UserResultType>;
  onView?: (id?: string) => void;
};

export const resultColumns = ({ columnHelper, onView }: ResultColumnsProps) => {
  return [
    columnHelper.accessor('last_name', {
      header: 'Last name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('first_name', {
      header: 'First name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('score', {
      header: 'Score',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('phone_number', {
      header: 'Phone number',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('result', {
      header: '',
      cell: (info) => (
        <Options
          disabled={!info.getValue()}
          onView={onView ? () => onView(info.getValue()) : undefined}
        />
      ),
    }),
  ];
};
