import { Dialog } from "@headlessui/react";
import cx from "classnames";

import { Button } from "@/components/common";
import useStore from "@/stores";

import { CustomDialog } from "../Dialog";

import styles from "./Confirmation.module.css";

type ConfirmationProps = {
  title: string;
  content: string;
  action: string;
};

export const Confirmation: React.FC<ConfirmationProps> = ({
  title,
  content,
  action,
}) => {
  const { setIsOpen, onConfirm } = useStore((state) => state.dialog);

  return (
    <CustomDialog>
      <Dialog.Panel className={styles.panel}>
        <Dialog.Title as="h3" className={styles.title}>
          {title}
        </Dialog.Title>
        <p className={styles.content}>{content}</p>

        <div className={styles.row}>
          <Button
            className={cx(styles.button, "m-0 md:mr-4")}
            onClick={() => setIsOpen(false)}
            theme="base"
          >
            Cancel
          </Button>
          <Button
            className={styles.button}
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
          >
            {action}
          </Button>
        </div>
      </Dialog.Panel>
    </CustomDialog>
  );
};
