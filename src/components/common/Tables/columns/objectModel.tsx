import type { ColumnHelper } from '@tanstack/react-table';

import { Options } from '@/components/common';
import type { ObjectModelApiType } from '@/types/common/api';

type ObjectModelColumnsProps = {
  columnHelper: ColumnHelper<ObjectModelApiType>;
  onDelete: (id: string) => void;
  onEdit: (idobjectModel: ObjectModelApiType) => void;
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

      return description;
    },
  }),
  columnHelper.accessor('category.name', {
    header: 'Category',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('_id', {
    header: '',
    cell: (info) => (
      <Options
        onEdit={() => onEdit(info.row.original)}
        onDelete={() => onDelete(info.getValue())}
      />
    ),
  }),
];
