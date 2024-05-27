import { PropsWithChildren, useRef, useState } from "react";
import Draggable from "react-draggable";

type PieceProps = {
  rotate?: number;
};

export const Piece: React.FC<PropsWithChildren<PieceProps>> = ({
  rotate = 0,
  children,
}) => {
  const [currentRotate, setCurrentRotate] = useState(rotate);

  const isDraggingRef = useRef(false);

  const onDrag = () => {
    isDraggingRef.current = true;
  };

  const onStop = () => {
    if (!isDraggingRef.current) {
      setCurrentRotate(currentRotate + 90);
    }
    isDraggingRef.current = false;
  };

  return (
    <Draggable onStop={onStop} onDrag={onDrag}>
      {children}
    </Draggable>
  );
};
