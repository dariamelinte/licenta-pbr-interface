import cx from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import {
  boxPoints,
  objectModelSizes,
  pointPercentages,
} from '@/constants/constants';
import useStore from '@/stores';
import type { ObjectModelApiType } from '@/types/common/api';
import type { ConnectionPointType } from '@/types/common/connectionPoint';
import type {
  CoordinatesObjectType,
  PointType,
} from '@/types/common/playground';

import { Piece } from '../Piece';
import { ModelView } from './ModelView';
import styles from './ModelView.module.css';

type PlaygroundModelViewProps = {
  objectInstanceId: string;
  initialPos: { x: number; y: number };
  objectModel: ObjectModelApiType;
  disabled?: boolean;
};

export const PlaygroundModelView: React.FC<PlaygroundModelViewProps> = ({
  objectInstanceId,
  initialPos,
  objectModel,
  disabled,
}) => {
  const {
    scale,
    changeObjectInstancePosition,
    focusedAxe,
    instances,
    addConnectionPoint,
  } = useStore((state) => state.playground);
  const [buttonIds, setButtonIds] = useState<string[]>([]);

  const objectInstance = useMemo(
    () => instances[objectInstanceId],
    [objectInstanceId, instances],
  );

  const objectSize = useMemo(
    () => objectModelSizes[objectModel.size] * scale,
    [objectModel.size, scale],
  );

  useEffect(() => {
    changeObjectInstancePosition(objectInstanceId, {
      ox: initialPos,
      oy: initialPos,
      oz: initialPos,
    });
  }, [
    initialPos.x,
    initialPos.y,
    objectInstanceId,
    changeObjectInstancePosition,
  ]);

  useEffect(() => {
    const ids = [];
    for (let i = 0; i < 8; i++) {
      ids.push(`${objectInstanceId}-${boxPoints[i]?.[focusedAxe]}`);
    }
    setButtonIds(ids);
  }, [objectInstanceId, focusedAxe]);

  const handlePieceStop = (oldPoint: PointType, newPoint: PointType) => {
    if (!objectInstance?.position) return;

    const delta = {
      x: newPoint.x - oldPoint.x,
      y: newPoint.y - oldPoint.y,
    };

    switch (focusedAxe) {
      case 'ox':
        changeObjectInstancePosition(objectInstanceId, {
          ox: newPoint,
          oy: {
            x: objectInstance.position.oy.x,
            y: objectInstance.position.oy.y - delta.y,
          },
          oz: {
            x: objectInstance.position.oz.x,
            y: objectInstance.position.oz.y - delta.x,
          },
        });
        break;
      case 'oy':
        changeObjectInstancePosition(objectInstanceId, {
          ox: {
            x: objectInstance.position.ox.x,
            y: objectInstance.position.ox.y - delta.y,
          },
          oy: newPoint,
          oz: {
            x: objectInstance.position.oz.x + delta.x,
            y: objectInstance.position.oz.y,
          },
        });
        break;
      case 'oz':
        changeObjectInstancePosition(objectInstanceId, {
          ox: {
            x: objectInstance.position.ox.x - delta.y,
            y: objectInstance.position.ox.y,
          },
          oy: {
            x: objectInstance.position.oy.x + delta.x,
            y: objectInstance.position.oy.y,
          },
          oz: newPoint,
        });
        break;
    }
  };

  const handlePointClick = (index: number) => {
    const boxPoint = boxPoints[index]?.[focusedAxe];

    if (!boxPoint) return;

    const percentages: CoordinatesObjectType<number> | undefined =
      pointPercentages[boxPoint];

    if (!percentages) return;

    const connectionPoint: ConnectionPointType = {
      instance: objectInstanceId,
      uuid: buttonIds[index] as string,
      boxPoint,
      ...percentages,
    };

    addConnectionPoint(connectionPoint);
  };

  return (
    <Piece
      pos={objectInstance?.position[focusedAxe]}
      initialPos={initialPos}
      onStop={handlePieceStop}
      disabled={disabled}
    >
      <div
        className="absolute border-4 border-blue-700"
        style={{
          width: objectSize,
          height: objectSize,
        }}
      >
        <div className="relative size-full">
          <button
            className={cx(styles.linkButton, '-top-3 -left-3')}
            id={buttonIds[0]}
            onClick={() => handlePointClick(0)}
            disabled={disabled}
          />
          <button
            className={cx(
              styles.linkButton,
              '-top-3 left-1/2 transform -translate-x-1/2',
            )}
            id={buttonIds[1]}
            onClick={() => handlePointClick(1)}
            disabled={disabled}
          />
          <button
            className={cx(styles.linkButton, '-top-3 -right-3')}
            id={buttonIds[2]}
            onClick={() => handlePointClick(2)}
            disabled={disabled}
          />
          <button
            className={cx(
              styles.linkButton,
              'top-1/2 -left-3 transform -translate-y-1/2',
            )}
            id={buttonIds[3]}
            onClick={() => handlePointClick(3)}
            disabled={disabled}
          />
          <button
            className={cx(
              styles.linkButton,
              'top-1/2 -right-3 transform -translate-y-1/2',
            )}
            id={buttonIds[4]}
            onClick={() => handlePointClick(4)}
            disabled={disabled}
          />
          <button
            className={cx(styles.linkButton, '-bottom-3 -left-3')}
            onClick={() => handlePointClick(5)}
            disabled={disabled}
            id={buttonIds[5]}
          />
          <button
            className={cx(
              styles.linkButton,
              '-bottom-3 left-1/2 transform -translate-x-1/2',
            )}
            id={buttonIds[6]}
            onClick={() => handlePointClick(6)}
            disabled={disabled}
          />
          <button
            className={cx(styles.linkButton, '-bottom-3 -right-3')}
            id={buttonIds[7]}
            onClick={() => handlePointClick(7)}
            disabled={disabled}
          />

          <ModelView
            model={objectModel.model}
            disableControls
            width={objectSize}
            height={objectSize}
          />
        </div>
      </div>
    </Piece>
  );
};
