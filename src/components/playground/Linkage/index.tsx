import { axesPoints } from "@/constants/constants";
import useStore from "@/stores";
import { LinkageType } from "@/types/common/linkage";
import Xarrow from "react-xarrows";

type LinkageProps = {
  linkage: LinkageType;
};

export const Linkage: React.FC<LinkageProps> = ({
  linkage: { first_connection, second_connection },
}) => {
  const { focusedAxe } = useStore((state) => state.playground);

  const handleShowArrow = () => {
    const visiblePoints = axesPoints[focusedAxe];

    const first = visiblePoints.find(
      (point) => point === first_connection?.boxPoint
    );
    const second = visiblePoints.find(
      (point) => point === second_connection?.boxPoint
    );

    console.log({ first, second, first_connection, second_connection, focusedAxe })

    return !!first && !!second;
  };

  if (!first_connection?.uuid || !second_connection?.uuid) {
    return <span />;
  }

  return (
    <Xarrow
      start={first_connection.uuid}
      end={second_connection.uuid}
      showHead={false}
      showXarrow={handleShowArrow()}
      color="#2b6cb0"
    />
  );
};
