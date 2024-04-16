import { Dialog, Transition } from "@headlessui/react";
import cx from "classnames";
import { Fragment } from "react";

import { Button } from "@/components/common";
import useStore from "@/stores";

import styles from "./ConfirmationDialog.module.css";

export const ConfirmationDialog = () => {
  const { isOpen, content, setIsOpen, onConfirm } = useStore(
    (state) => state.confirmDialog
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className={styles.container}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={styles.panel}>
                <Dialog.Title as="h3" className={styles.title}>
                  {content.title}
                </Dialog.Title>
                <p className={styles.content}>{content.content}</p>

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
                    {content.action}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
