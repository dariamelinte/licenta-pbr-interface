import { useEffect, useState, useCallback } from "react";

import { objectModelSizes } from "@/constants/constants";
import useStore from "@/stores";
import type { LinkageType } from "@/types/common/linkage";
import { ObjectInstanceType } from "@/types/common/objectInstance";
import { PointType } from "@/types/common/playground";
import { ConnectionPointType } from "@/types/common/connectionPoint";
import { INITIAL_OBJECT_MODEL } from "@/constants/initial-objects";

type LinkageProps = {
  linkage: LinkageType;
  firstInstance?: ObjectInstanceType;
  secondInstance?: ObjectInstanceType;
  disabled?: boolean;
};

export const Linkage: React.FC<LinkageProps> = ({
  linkage: { first_connection, second_connection, _id },
  firstInstance,
  secondInstance,
  disabled,
}) => {
  const { objectModels } = useStore(useCallback((state) => state.objectModel, []));
  const { resultId, deleteResultLinkage } = useStore(useCallback((state) => state.result, []));;
  const { token } = useStore(useCallback((state) => state.auth, []));
  const { focusedAxe, removeLinkage, scale } = useStore(useCallback((state) => state.playground, []));
  const [first, setFirst] = useState<PointType>(
    firstInstance?.position[focusedAxe] as PointType
  );
  const [second, setSecond] = useState<PointType>(
    secondInstance?.position[focusedAxe] as PointType
  );

  const handlePoint = useCallback(
    (
      setPoint: any,
      instance?: ObjectInstanceType,
      connection?: ConnectionPointType
    ) => {
      if (!connection || !instance) return;

      const { size } =
        objectModels.find(
          (objectModel) => objectModel._id === instance.object_model
        ) || INITIAL_OBJECT_MODEL;

      switch (focusedAxe) {
        case "ox":
          setPoint({
            x:
              instance.position[focusedAxe].x +
              (objectModelSizes[size] * scale * connection.oy) / 100,
            y:
              instance.position[focusedAxe].y +
              (objectModelSizes[size] * scale * connection.oz) / 100,
          });
          break;
        case "oy":
          setPoint({
            x:
              instance.position[focusedAxe].x +
              (objectModelSizes[size] * scale * connection.ox) / 100,
            y:
              instance.position[focusedAxe].y +
              (objectModelSizes[size] * scale * connection.oz) / 100,
          });
          break;
        case "oz":
          setPoint({
            x:
              instance.position[focusedAxe].x +
              (objectModelSizes[size] * scale * (100 - connection.ox)) / 100,
            y:
              instance.position[focusedAxe].y +
              (objectModelSizes[size] * scale * (100 - connection.oy)) / 100,
          });
          break;
      }
    },
    [focusedAxe, objectModels, scale]
  );

  const handleClickArrow = () => {
    if (disabled) return;

    if (resultId && _id) {
      deleteResultLinkage(token as string, resultId, _id);
    }

    removeLinkage(
      first_connection?.uuid as string,
      second_connection?.uuid as string
    );
  };

  useEffect(() => {
    handlePoint(setFirst, firstInstance, first_connection);
    handlePoint(setSecond, secondInstance, second_connection);
  }, [
    handlePoint,
    firstInstance?.position,
    secondInstance?.position,
    first_connection,
    second_connection,
  ]);

  if (
    !first_connection?.uuid ||
    !second_connection?.uuid ||
    !firstInstance ||
    !secondInstance
  ) {
    return <span />;
  }

  const lineLength = Math.sqrt(
    (second.x - first.x) ** 2 + (second.y - first.y) ** 2
  );
  const lineAngle =
    Math.atan2(second.y - first.y, second.x - first.x) * (180 / Math.PI);

  return (
    <div
      className="absolute pointer"
      style={{
        top: `${first.y}px`,
        left: `${first.x}px`,
        width: `${lineLength}px`,
        height: "20px",
        transform: `rotate(${lineAngle}deg)`,
        transformOrigin: "0 0",
        cursor: disabled ? "default" : "pointer",
      }}
      onClick={handleClickArrow}
    >
      <div
        className="bg-blue-300"
        style={{
          width: "100%",
          height: "2px",
          position: "absolute",
          top: "4px",
          left: "0",
        }}
      />
    </div>
  );
};
