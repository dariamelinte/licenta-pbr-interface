import { useCallback, useMemo } from "react";

import useStore from "@/stores";
import type { LinkageType } from "@/types/common/linkage";

type LinkageProps = {
  linkage: LinkageType;
  disabled?: boolean;
};

export const Linkage: React.FC<LinkageProps> = ({
  linkage: { first_connection, second_connection, _id },
  disabled,
}) => {
  const { resultId, deleteResultLinkage } = useStore(
    useCallback((state) => state.result, [])
  );
  const { token } = useStore(useCallback((state) => state.auth, []));
  const { focusedAxe, removeLinkage } = useStore(
    useCallback((state) => state.playground, [])
  );

  const first = useMemo(
    () => first_connection?.space_position[focusedAxe],
    [first_connection, focusedAxe]
  );
  const second = useMemo(
    () => second_connection?.space_position[focusedAxe],
    [second_connection, focusedAxe]
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

  if (
    !first_connection?.uuid ||
    !second_connection?.uuid ||
    !first ||
    !second
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
