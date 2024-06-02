import useStore from "@/stores";
import { LinkageType } from "@/types/common/linkage";
import { useEffect, useState } from "react";
import Xarrow from "react-xarrows";

type LinkageProps = {
  linkage: LinkageType;
};

export const Linkage: React.FC<LinkageProps> = ({
  linkage: { first_connection, second_connection },
}) => {
  const { focusedAxe } = useStore((state) => state.playground);

  const [isFirstConn, setIsFirstConn] = useState(false);
  const [isSecondConn, setIsSecondConn] = useState(false);

  useEffect(() => {
    if (first_connection?.uuid && second_connection?.uuid) {
      setIsFirstConn(!!document.getElementById(first_connection?.uuid));
      setIsSecondConn(!!document.getElementById(second_connection?.uuid));
    }
  }, [focusedAxe, first_connection?.uuid, second_connection?.uuid]);

  if (!first_connection?.uuid || !second_connection?.uuid) {
    return null;
  }

  return (
    <Xarrow
      start={first_connection?.uuid}
      end={second_connection?.uuid}
      showHead={false}
      showXarrow={isFirstConn && isSecondConn}
      color="#2b6cb0"
    />
  );
};
