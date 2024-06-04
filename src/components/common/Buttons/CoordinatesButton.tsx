import cx from 'classnames';

import { coordinatesAxes } from '@/constants/constants';
import useStore from '@/stores';

export const CoordinatesButton: React.FC = () => {
  const { focusedAxe, setFocusedAxe } = useStore((state) => state.playground);

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-100 shadow">
      {Object.keys(coordinatesAxes).map((axe) => {
        return (
          <button
            className={cx(
              'text-base font-medium text-blue-800 hover:bg-opacity-75 focus:outline-none px-3 py-1',
              {
                'border-x-2 border-blue-200': axe === 'oz',
                'bg-blue-200': focusedAxe === axe,
                'rounded-l-xl': axe === 'ox',
                'rounded-r-xl': axe === 'oy',
              },
            )}
            onClick={() => {
              setFocusedAxe(axe as keyof typeof coordinatesAxes);
            }}
          >
            {coordinatesAxes[axe as keyof typeof coordinatesAxes]}
          </button>
        );
      })}
    </div>
  );
};
