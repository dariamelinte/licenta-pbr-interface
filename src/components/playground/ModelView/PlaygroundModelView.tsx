import cx from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  boxPoints,
  objectModelSizes,
  pointPercentages,
} from "@/constants/constants";
import useStore from "@/stores";
import type { ObjectModelApiType } from "@/types/common/api";
import type { ConnectionPointType } from "@/types/common/connectionPoint";
import type {
  CoordinatesObjectType,
  PointType,
} from "@/types/common/playground";

import { Piece } from "../Piece";
import { ModelView } from "./ModelView";
import styles from "./ModelView.module.css";
import { XCircle } from "@/components/icons";
import { ObjectInstanceType } from "@/types/common/objectInstance";

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
    addConnectionPoint,
    removeInstance,
  } = useStore(useCallback((state) => state.playground, []));
  const { token } = useStore(useCallback((state) => state.auth, []));
  const { resultId, deleteResultInstance } = useStore(useCallback((state) => state.result, []));;
  const objectSize = useMemo(
    () => objectModelSizes[objectModel.size] * scale,
    [objectModel.size, scale]
  );

  const handlePieceStop = (oldPoint: PointType, newPoint: PointType) => {
    if (!objectInstance?.position) return;

    const delta = {
      x: newPoint.x - oldPoint.x,
      y: newPoint.y - oldPoint.y,
    };

    console.log({ delta });

    switch (focusedAxe) {
      case "ox":
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
      case "oy":
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
      case "oz":
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
    }
  };

  const handlePointClick = (index: number) => {
    const boxPoint = boxPoints[index]?.[focusedAxe];

    if (!boxPoint) return;

    const percentages: CoordinatesObjectType<number> | undefined =
      pointPercentages[boxPoint];

    if (!percentages) return;

    const connectionPoint: ConnectionPointType = {
      instance: objectInstance.uuid,
      uuid: `${objectInstance.uuid}-${boxPoint}` as string,
      boxPoint,
      ...percentages,
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
        className="absolute border-[4px] border-blue-300"
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
          className="relative -top-8 -left-8 text-blue-300"
          onClick={() => {
            if (resultId) {
              deleteResultInstance(
                token as string,
                resultId,
                objectInstance._id as string
              );
            }
            removeInstance(objectInstance.uuid);
          }}
          disabled={disabled}
        >
          <XCircle />
        </button>

        <button
          className={cx(styles.linkButton, "-top-3 -left-3")}
          onClick={() => handlePointClick(0)}
          disabled={disabled}
        />
        <button
          className={cx(
            styles.linkButton,
            "-top-3 left-1/2 transform -translate-x-1/2"
          )}
          onClick={() => handlePointClick(1)}
          disabled={disabled}
        />
        <button
          className={cx(styles.linkButton, "-top-3 -right-3")}
          onClick={() => handlePointClick(2)}
          disabled={disabled}
        />
        <button
          className={cx(
            styles.linkButton,
            "top-1/2 -left-3 transform -translate-y-1/2"
          )}
          onClick={() => handlePointClick(3)}
          disabled={disabled}
        />
        <button
          className={cx(
            styles.linkButton,
            "top-1/2 -right-3 transform -translate-y-1/2"
          )}
          onClick={() => handlePointClick(4)}
          disabled={disabled}
        />
        <button
          className={cx(styles.linkButton, "-bottom-3 -left-3")}
          onClick={() => handlePointClick(5)}
          disabled={disabled}
        />
        <button
          className={cx(
            styles.linkButton,
            "-bottom-3 left-1/2 transform -translate-x-1/2"
          )}
          onClick={() => handlePointClick(6)}
          disabled={disabled}
        />
        <button
          className={cx(styles.linkButton, "-bottom-3 -right-3")}
          onClick={() => handlePointClick(7)}
          disabled={disabled}
        />
      </div>
    </Piece>
  );
};
