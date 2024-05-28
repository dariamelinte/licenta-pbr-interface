import { CSSProperties, PropsWithChildren } from "react";

type LinkContainerProps = {
  style?: CSSProperties;
};

export const LinkContainer: React.FC<PropsWithChildren<LinkContainerProps>> = ({
  children,
  style,
}) => {
  return (
    <div
      className="relative border-4 border-blue-500 rounded-xl"
      style={style}
    >
      <button className="absolute w-5 h-5 bg-blue-500 rounded-full top-0 left-0"></button>
      <button className="absolute w-5 h-5 bg-blue-500 rounded-full top-0 left-1/2 transform -translate-x-1/2"></button>
      <button className="absolute w-5 h-5 bg-blue-500 rounded-full top-0 right-0"></button>
      <button className="absolute w-5 h-5 bg-blue-500 rounded-full top-1/2 left-0 transform -translate-y-1/2"></button>
      <button className="absolute w-5 h-5 bg-blue-500 rounded-full top-1/2 right-0 transform -translate-y-1/2"></button>
      <button className="absolute w-5 h-5 bg-blue-500 rounded-full bottom-0 left-0"></button>
      <button className="absolute w-5 h-5 bg-blue-500 rounded-full bottom-0 left-1/2 transform -translate-x-1/2"></button>
      <button className="absolute w-5 h-5 bg-blue-500 rounded-full bottom-0 right-0"></button>
      {children}
    </div>
  );
};
