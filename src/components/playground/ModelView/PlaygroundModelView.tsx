import cx from "classnames";

import { objectModelSizes } from "@/constants/constants";
import { ObjectModelApiType } from "@/types/common/api";

import { ModelView } from "./ModelView";
import { Piece } from "../Piece";

import styles from "./ModelView.module.css";
import useStore from "@/stores";
import { useEffect, useMemo } from "react";
import { CoordinatesObjectType, PointType } from "@/types/common/playground";

type PlaygroundModelViewProps = {
  objectInstanceId: string;
  initialPos: { x: number; y: number };
  objectModel: ObjectModelApiType;
};

export const PlaygroundModelView: React.FC<PlaygroundModelViewProps> = ({
  objectInstanceId,
  initialPos,
  objectModel,
}) => {
  const { scale, changeObjectInstancePosition, focusedAxe, objectInstances } =
    useStore((state) => state.playground);

  const objectInstance = useMemo(
    () => objectInstances[objectInstanceId],
    [objectInstanceId, objectInstances]
  );

  const objectSize = useMemo(() => objectModelSizes[objectModel.size] * scale, [objectModel.size, scale])

  useEffect(() => {
    changeObjectInstancePosition(objectInstanceId, {
      ox: initialPos,
      oy: initialPos,
      oz: initialPos,
    });
  }, [initialPos.x, initialPos.y]);

  const handlePieceStop = (oldPoint: PointType, newPoint: PointType) => {
    if (!objectInstance?.position) return;

    const delta = {
      x: newPoint.x - oldPoint.x,
      y: newPoint.y - oldPoint.y,
    };

    switch (focusedAxe) {
      case "ox":
        changeObjectInstancePosition(objectInstanceId, {
          ox: newPoint,
          oy: {
            x: objectInstance.position.oy.x,
            y: objectInstance.position.oy.x - delta.y,
          },
          oz: {
            x: objectInstance.position.oz.x,
            y: objectInstance.position.oz.y - delta.x
          },
        });
        break;
      case "oy":
        changeObjectInstancePosition(objectInstanceId, {
          ox: {
            x: objectInstance.position.ox.x,
            y: objectInstance.position.ox.y - delta.y,
          },
          oy: newPoint,
          oz: {
            x: objectInstance.position.oz.x + delta.x,
            y: objectInstance.position.oz.y
          },
        });
        break;
      case "oz":
        changeObjectInstancePosition(objectInstanceId, {
          ox: {
            x: objectInstance.position.ox.x - delta.y,
            y: objectInstance.position.ox.y
          },
          oy: {
            x: objectInstance.position.oy.x + delta.x,
            y: objectInstance.position.oy.y
          },
          oz: newPoint,
        });
        break;
    }
  };

  return (
    <Piece
      pos={objectInstance?.position[focusedAxe]}
      initialPos={initialPos}
      onStop={handlePieceStop}
    >
      <div
        className="absolute border-4 border-blue-700"
        style={{
          width: objectSize + 15,
          height: objectSize + 15,
        }}
      >
        <div className="w-full h-full relative">
          <button className={cx(styles.linkButton, "-top-3 -left-3")}></button>
          <button
            className={cx(
              styles.linkButton,
              "-top-3 left-1/2 transform -translate-x-1/2"
            )}
          ></button>
          <button className={cx(styles.linkButton, "-top-3 -right-3")}></button>
          <button
            className={cx(
              styles.linkButton,
              "top-1/2 -left-3 transform -translate-y-1/2"
            )}
          ></button>
          <button
            className={cx(
              styles.linkButton,
              "top-1/2 -right-3 transform -translate-y-1/2"
            )}
          ></button>
          <button
            className={cx(styles.linkButton, "-bottom-3 -left-3")}
          ></button>
          <button
            className={cx(
              styles.linkButton,
              "-bottom-3 left-1/2 transform -translate-x-1/2"
            )}
          ></button>
          <button
            className={cx(styles.linkButton, "-bottom-3 -right-3")}
          ></button>

          <ModelView
            model={objectModel.model}
            disableControls
            width={objectSize}
            height={objectSize}
          />
        </div>
      </div>
      {/* <LinkContainer
      >
      </LinkContainer> */}
    </Piece>
  );
};
