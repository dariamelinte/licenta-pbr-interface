import { PointType } from "@/types/common/playground";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

type PieceProps = {
  initialPos: PointType;
  pos?: PointType;
  onStop?: (oldPoint: PointType, newPoint: PointType) => void;
};

export const Piece: React.FC<PropsWithChildren<PieceProps>> = ({
  initialPos,
  pos,
  onStop,
  children,
}) => {
  const [position, setPosition] = useState(initialPos);

  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (
      pos?.x &&
      pos?.y &&
      !isDraggingRef.current &&
      !(pos.x === position.x && pos.y === position.y)
    ) {
      setPosition(pos);
    }
  }, [pos?.x, pos?.y]);

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    isDraggingRef.current = true;
    setPosition({ x: data.x, y: data.y });
    if (pos) {
      onStop?.(pos, position);
    }
  };

  const handleStop = () => {
    if (pos) {
      onStop?.(pos, position);
    }
    
    isDraggingRef.current = false;
  };

  return (
    <Draggable position={position} onStop={handleStop} onDrag={handleDrag}>
      {children}
    </Draggable>
  );
};
