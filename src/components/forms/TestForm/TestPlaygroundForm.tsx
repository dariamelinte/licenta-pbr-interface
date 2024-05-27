import cx from "classnames";
import { Disclosure } from "@headlessui/react";

import { ChevronDown, PuzzlePiece } from "@/components/icons";

import styles from "../Form.module.css";
import { CoordinatesButton } from "@/components/common/Buttons";

type TestFormProps = {};

export const TestPlaygroundForm: React.FC<TestFormProps> = () => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="card">
          <div className="flex justify-between items-center">
          <CoordinatesButton />
          </div>
          <Disclosure.Button className={styles.disclosureButton}>
            <div className="flex items-center w-full">
              <PuzzlePiece className={cx(styles.icon, "mr-4")} />
              <p className="font-bold text-lg">Test playground</p>
            </div>
            <ChevronDown
              className={cx(styles.icon, {
                "rotate-180 transform": open,
              })}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className={styles.disclosurePannel}
          ></Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
