import type { PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';

import type { PointType } from '@/types/common/playground';

type PieceProps = {
  initialPos: PointType;
  pos?: PointType;
  disabled?: boolean;
  onStop?: (oldPoint: PointType, newPoint: PointType) => void;
};

export const Piece: React.FC<PropsWithChildren<PieceProps>> = ({
  initialPos,
  disabled,
  onStop,
  children,
}) => {
  const [position, setPosition] = useState(initialPos);

  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (
      initialPos?.x &&
      initialPos?.y &&
      !isDraggingRef.current &&
      !(initialPos.x === position.x && initialPos.y === position.y)
    ) {
      setPosition(initialPos);
    }
  }, [initialPos, position.x, position.y, setPosition]);

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    isDraggingRef.current = true;
    onStop?.(position, { x: data.x, y: data.y });
    setPosition({ x: data.x, y: data.y });
  };

  const handleStop = (_: DraggableEvent, data: DraggableData) => {
    onStop?.(position, { x: data.x, y: data.y });
    setPosition({ x: data.x, y: data.y });

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
