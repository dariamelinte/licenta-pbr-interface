import { Dialog, Transition } from "@headlessui/react";
import cx from "classnames";
import { Fragment } from "react";

import { Button } from "@/components/common";
import useStore from "@/stores";

import styles from "./ConfirmationDialog.module.css";

export const ConfirmationDialog = () => {
  const { isDialogOpen, confirmDialog, setIsDialogOpen, onConfirmDialog } =
    useStore();

  return (
    <Transition appear show={isDialogOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsDialogOpen(false)}
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
                  {confirmDialog.title}
                </Dialog.Title>
                <p className={styles.content}>{confirmDialog.content}</p>

                <div className={styles.row}>
                  <Button
                    className={cx(styles.button, "m-0 md:mr-4")}
                    onClick={() => setIsDialogOpen(false)}
                    theme="base"
                  >
                    Cancel
                  </Button>
                  <Button
                    className={styles.button}
                    onClick={() => {
                      onConfirmDialog();
                      setIsDialogOpen(false);
                    }}
                  >
                    {confirmDialog.action}
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
