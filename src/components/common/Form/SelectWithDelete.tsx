import { Button } from '@/components/common/Buttons';
import { Trash } from '@/components/icons';

import type { SelectFieldProps } from './Select';
import { SelectField } from './Select';

type SelectFieldWithDeleteProps = SelectFieldProps & {
  onDelete: () => void;
};

export const SelectFieldWithDelete: React.FC<SelectFieldWithDeleteProps> = ({
  onDelete,
  ...rest
}) => {
  return (
    <div className="flex w-full">
      <SelectField {...rest} />
      <div className="mt-6 flex items-center justify-center">
        <Button onClick={onDelete} icon={<Trash />} className="ml-3" />
      </div>
    </div>
  );
};
