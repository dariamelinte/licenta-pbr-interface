import cx from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';

import { XCircle } from '@/components/icons';
import {
  box_points,
  objectModelSizes,
  pointPercentages,
} from '@/constants/constants';
import { INITIAL_OBJECT_MODEL } from '@/constants/initial-objects';
import useStore from '@/stores';
import type { ObjectModelApiType } from '@/types/common/api';
import type { ConnectionPointType } from '@/types/common/connectionPoint';
import type { LinkageType } from '@/types/common/linkage';
import type { ObjectInstanceType } from '@/types/common/objectInstance';
import type {
  CoordinatesObjectType,
  PointType,
} from '@/types/common/playground';

import { Piece } from '../Piece';
import { ModelView } from './ModelView';
import styles from './ModelView.module.css';

type PlaygroundModelViewProps = {
  objectInstance: ObjectInstanceType;
  objectModel: ObjectModelApiType;
  disabled?: boolean;
};

export const PlaygroundModelView: React.FC<PlaygroundModelViewProps> = ({
  objectInstance,
  objectModel,
  disabled,
}) => {
  const {
    scale,
    changeObjectInstancePosition,
    focusedAxe,
    linkages,
    setLinkages,
    addConnectionPoint,
    removeInstance,
  } = useStore(useCallback((state) => state.playground, []));
  const { token } = useStore(useCallback((state) => state.auth, []));
  const { objectModels, getObjectModels } = useStore(
    useCallback((state) => state.objectModel, []),
  );
  const { resultId, deleteResultInstance } = useStore(
    useCallback((state) => state.result, []),
  );
  const objectSize = useMemo(
    () => objectModelSizes[objectModel.size] * scale,
    [objectModel.size, scale],
  );

  useEffect(() => {
    getObjectModels();
  }, [getObjectModels]);

  const handleConnectionPointSpacePosition = (
    percentages: CoordinatesObjectType<number>,
  ) => {
    const { size } =
      objectModels.find(
        (objectModel) => objectModel._id === objectInstance.object_model,
      ) || INITIAL_OBJECT_MODEL;

    return {
      ox: {
        x:
          objectInstance.position.ox.x +
          (objectModelSizes[size] * scale * percentages.oy) / 100,
        y:
          objectInstance.position.ox.y +
          (objectModelSizes[size] * scale * percentages.oz) / 100,
      },
      oy: {
        x:
          objectInstance.position.oy.x +
          (objectModelSizes[size] * scale * percentages.ox) / 100,
        y:
          objectInstance.position.oy.y +
          (objectModelSizes[size] * scale * percentages.oz) / 100,
      },
      oz: {
        x:
          objectInstance.position.oz.x +
          (objectModelSizes[size] * scale * (100 - percentages.ox)) / 100,
        y:
          objectInstance.position.oz.y +
          (objectModelSizes[size] * scale * (100 - percentages.oy)) / 100,
      },
    };
  };

  const handlePieceStop = (oldPoint: PointType, newPoint: PointType) => {
    if (!objectInstance?.position) return;

    const delta = {
      x: newPoint.x - oldPoint.x,
      y: newPoint.y - oldPoint.y,
    };

    switch (focusedAxe) {
      case 'ox':
        changeObjectInstancePosition(objectInstance.uuid, {
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
        changeObjectInstancePosition(objectInstance.uuid, {
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
        changeObjectInstancePosition(objectInstance.uuid, {
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
      default:
        break;
    }

    const updatedLinkages: LinkageType[] = linkages.map(
      ({ first_connection, second_connection, ...rest }) => {
        if (first_connection?.instance === objectInstance.uuid) {
          return {
            ...rest,
            second_connection,
            first_connection: {
              ...first_connection,
              space_position: handleConnectionPointSpacePosition(
                first_connection.object_position,
              ),
            },
          };
        }

        if (second_connection?.instance === objectInstance.uuid) {
          return {
            ...rest,
            first_connection,
            second_connection: {
              ...second_connection,
              space_position: handleConnectionPointSpacePosition(
                second_connection.object_position,
              ),
            },
          };
        }

        return { ...rest, first_connection, second_connection };
      },
    );
    setLinkages(updatedLinkages);
  };

  const handlePointClick = (index: number) => {
    const box_point = box_points[index]?.[focusedAxe];

    if (!box_point) return;

    const percentages: CoordinatesObjectType<number> | undefined =
      pointPercentages[box_point];

    if (!percentages) return;

    const connectionPoint: ConnectionPointType = {
      instance: objectInstance.uuid,
      uuid: `${objectInstance.uuid}-${box_point}` as string,
      box_point,
      object_position: percentages,
      space_position: handleConnectionPointSpacePosition(percentages),
    };

    addConnectionPoint(connectionPoint);
  };

  if (!objectInstance) return null;

  return (
    <Piece
      initialPos={objectInstance.position[focusedAxe]}
      onStop={handlePieceStop}
      disabled={disabled}
    >
      <div
        className="absolute border-4 border-blue-300"
        style={{
          width: objectSize,
          height: objectSize,
        }}
      >
        <ModelView
          model={objectModel.model}
          disableControls
          width={objectSize - 10}
          height={objectSize - 10}
        />
        <button
          className="relative -left-8 -top-8 text-blue-300"
          onClick={() => {
            if (resultId) {
              deleteResultInstance(
                token as string,
                resultId,
                objectInstance._id as string,
              );
            }
            removeInstance(objectInstance.uuid);
          }}
          disabled={disabled}
        >
          <XCircle />
        </button>

        <button
          className={cx(styles.linkButton, '-top-3 -left-3')}
          onClick={() => handlePointClick(0)}
          disabled={disabled}
        />
        <button
          className={cx(
            styles.linkButton,
            '-top-3 left-1/2 transform -translate-x-1/2',
          )}
          onClick={() => handlePointClick(1)}
          disabled={disabled}
        />
        <button
          className={cx(styles.linkButton, '-top-3 -right-3')}
          onClick={() => handlePointClick(2)}
          disabled={disabled}
        />
        <button
          className={cx(
            styles.linkButton,
            'top-1/2 -left-3 transform -translate-y-1/2',
          )}
          onClick={() => handlePointClick(3)}
          disabled={disabled}
        />
        <button
          className={cx(
            styles.linkButton,
            'top-1/2 -right-3 transform -translate-y-1/2',
          )}
          onClick={() => handlePointClick(4)}
          disabled={disabled}
        />
        <button
          className={cx(styles.linkButton, '-bottom-3 -left-3')}
          onClick={() => handlePointClick(5)}
          disabled={disabled}
        />
        <button
          className={cx(
            styles.linkButton,
            '-bottom-3 left-1/2 transform -translate-x-1/2',
          )}
          onClick={() => handlePointClick(6)}
          disabled={disabled}
        />
        <button
          className={cx(styles.linkButton, '-bottom-3 -right-3')}
          onClick={() => handlePointClick(7)}
          disabled={disabled}
        />
      </div>
    </Piece>
  );
};
