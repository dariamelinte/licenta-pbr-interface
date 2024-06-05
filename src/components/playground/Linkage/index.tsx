import Xarrow from 'react-xarrows';

import { axesPoints } from '@/constants/constants';
import useStore from '@/stores';
import type { LinkageType } from '@/types/common/linkage';

type LinkageProps = {
  linkage: LinkageType;
  disabled?: boolean;
};

export const Linkage: React.FC<LinkageProps> = ({
  linkage: { first_connection, second_connection },
  disabled
}) => {
  const { focusedAxe, removeLinkage } = useStore((state) => state.playground);

  const handleShowArrow = () => {
    const visiblePoints = axesPoints[focusedAxe];

    const first = visiblePoints.find(
      (point) => point === first_connection?.boxPoint,
    );
    const second = visiblePoints.find(
      (point) => point === second_connection?.boxPoint,
    );

    return !!first && !!second;
  };

  const handleClickArrow = () => {
    if (disabled) return;

    removeLinkage(
      first_connection?.instance as string,
      second_connection?.instance as string,
    );
  };

  if (!first_connection?.uuid || !second_connection?.uuid) {
    return <span />;
  }

  return (
    <Xarrow
      start={`${first_connection.instance}-${first_connection.boxPoint}`}
      end={`${second_connection.instance}-${second_connection.boxPoint}`}
      showHead={false}
      showXarrow={handleShowArrow()}
      color="#2b6cb0"
      passProps={{
        cursor: 'pointer',
        onClick: handleClickArrow,
      }}
    />
  );
};
