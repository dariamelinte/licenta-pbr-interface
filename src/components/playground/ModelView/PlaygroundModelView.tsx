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

  useEffect(() => {
    changeObjectInstancePosition(objectInstanceId, {
      ox: initialPos,
      oy: initialPos,
      oz: initialPos,
    });
  }, [initialPos.x, initialPos.y]);

  const handlePieceStop = (point: PointType) => {
    if (!objectInstance?.position) return;

    changeObjectInstancePosition(objectInstanceId, {
      ...objectInstance.position,
      [focusedAxe]: point,
    });
  };

  console.log({ objectInstance });

  return (
    <Piece
      pos={objectInstance?.position[focusedAxe]}
      initialPos={initialPos}
      onStop={handlePieceStop}
    >
      <div
        className="absolute border-4 border-blue-700"
        style={{
          width: objectModelSizes[objectModel.size] * scale + 15,
          height: objectModelSizes[objectModel.size] * scale + 15,
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
            width={objectModelSizes[objectModel.size] * scale}
            height={objectModelSizes[objectModel.size] * scale}
          />
        </div>
      </div>
      {/* <LinkContainer
      >
      </LinkContainer> */}
    </Piece>
  );
};
