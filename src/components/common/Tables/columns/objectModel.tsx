import type { ColumnHelper } from '@tanstack/react-table';

import { Options } from '@/components/common';
import type { ObjectModelInfoApiType } from '@/types/common/api';

type ObjectModelColumnsProps = {
  columnHelper: ColumnHelper<ObjectModelInfoApiType>;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export const objectModelColumns = ({
  columnHelper,
  onDelete,
  onEdit,
}: ObjectModelColumnsProps) => [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => <p className="w-[120px]">{info.getValue()}</p>,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => {
      const description = info.getValue();

      if (!description?.length) {
        return '-';
      }

      return description?.length > 50
        ? `${description.substring(0, 50)}...`
        : description;
    },
  }),
  columnHelper.accessor('category.name', {
    header: 'Category',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('_id.$oid', {
    header: '',
    cell: (info) => (
      <Options
        onEdit={() => onEdit(info.getValue())}
        onDelete={() => onDelete(info.getValue())}
      />
    ),
  }),
];
