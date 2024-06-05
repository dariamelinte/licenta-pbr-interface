import type { PropsWithChildren } from "react";
import { useEffect, useRef, useState } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";

import type { PointType } from "@/types/common/playground";

type PieceProps = {
  initialPos: PointType;
  pos?: PointType;
  disabled?: boolean;
  onStop?: (oldPoint: PointType, newPoint: PointType) => void;
};

export const Piece: React.FC<PropsWithChildren<PieceProps>> = ({
  initialPos,
  pos,
  disabled,
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
  }, [pos?.x, pos?.y, position.x, position.y]);

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
    <Draggable
      disabled={disabled}
      position={position}
      onStop={handleStop}
      onDrag={handleDrag}
    >
      {children}
    </Draggable>
  );
};
