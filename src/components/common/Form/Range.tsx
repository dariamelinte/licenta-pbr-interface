import { Input, InputFieldProps } from "./Input";

type RangeProps = Omit<InputFieldProps, "placeholder" | "name"> & {
  min: number;
  max: number;
};

export const Range: React.FC<RangeProps> = ({ min, max, ...rest }) => {
  return (
    <Input
      className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer !p-0"
      type="range"
      min={min}
      max={max}
      {...rest}
    />
  );
};
