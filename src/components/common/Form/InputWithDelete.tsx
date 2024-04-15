import { Button } from '@/components/common/Buttons';
import { Trash } from '@/components/icons';

import type { InputFieldProps } from './Input';
import { InputField } from './Input';

type InputFieldWithDeleteProps = InputFieldProps & {
  onDelete: () => void;
};

export const InputFieldWithDelete: React.FC<InputFieldWithDeleteProps> = ({
  onDelete,
  ...rest
}) => {
  return (
    <div className="flex w-full">
      <InputField {...rest} />
      <div className="mt-6 flex items-center justify-center">
        <Button onClick={onDelete} icon={<Trash />} className="ml-3" />
      </div>
    </div>
  );
};
