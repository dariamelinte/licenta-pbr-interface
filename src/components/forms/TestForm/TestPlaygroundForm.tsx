import { Disclosure } from '@headlessui/react';
import cx from 'classnames';

import { CoordinatesButton } from '@/components/common/Buttons';
import { ChevronDown, PuzzlePiece } from '@/components/icons';

import styles from '../Form.module.css';

type TestFormProps = {};

export const TestPlaygroundForm: React.FC<TestFormProps> = () => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="card">
          <div className="flex items-center justify-between">
            <CoordinatesButton />
          </div>
          <Disclosure.Button className={styles.disclosureButton}>
            <div className="flex w-full items-center">
              <PuzzlePiece className={cx(styles.icon, 'mr-4')} />
              <p className="text-lg font-bold">Test playground</p>
            </div>
            <ChevronDown
              className={cx(styles.icon, {
                'rotate-180 transform': open,
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={styles.disclosurePannel} />
        </div>
      )}
    </Disclosure>
  );
};
