import type { InputFieldProps } from './Input';
import { Input } from './Input';

type RangeProps = Omit<InputFieldProps, 'placeholder' | 'name'> & {
  min: number;
  max: number;
};

export const Range: React.FC<RangeProps> = ({ min, max, ...rest }) => {
  return (
    <Input
      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-blue-400 !p-0"
      type="range"
      min={min}
      max={max}
      {...rest}
    />
  );
};
