import { PropsWithChildren, useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

type PieceProps = {
  rotate?: number;
  initialPos: {x: number; y: number};
};

export const Piece: React.FC<PropsWithChildren<PieceProps>> = ({
  rotate = 0,
  initialPos,
  children,
}) => {
  // console.log({ initialPos })
  const [currentRotate, setCurrentRotate] = useState(rotate);
  const [position, setPosition] = useState(initialPos);

  const isDraggingRef = useRef(false);

  // useEffect(() => {
  //   console.log({ initialPos, position });
  // }, [initialPos, position]);

  const onDrag = (e: DraggableEvent, data: DraggableData) => {
    console.log({ e, data });
    isDraggingRef.current = true;
    setPosition({ x: data.x, y: data.y });
  };

  const onStop = () => {
    if (!isDraggingRef.current) {
      setCurrentRotate(currentRotate + 90);
    }
    isDraggingRef.current = false;
  };

  // console.log({ position })

  return (
    <Draggable
      position={position}
      onStop={onStop}
      onDrag={onDrag}
    >
      {children}
    </Draggable>
  );
};
