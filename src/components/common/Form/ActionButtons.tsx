import { useFormikContext } from "formik";
import { useState } from "react";
import cx from 'classnames';

import { Button } from "@/components/common/Buttons";
import { extractStringValues } from "@/utils/extractStringValues";

import styles from "./Form.module.css";

type ActionButtonsProps = {
  onCancel: () => void;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onCancel }) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const { handleSubmit, errors } = useFormikContext();

  return (
    <>
      <div className={styles.row}>
        <Button className={cx(styles.button, "mr-2")} theme="base" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className={styles.button}
          onClick={async () => {
            setPressed(true);
            await handleSubmit();
          }}
        >
          Save
        </Button>
      </div>
      {pressed
        ? extractStringValues(errors).map((error) => (
            <div className={styles.error} key={error}>
              * ERR: {error}
            </div>
          ))
        : null}
    </>
  );
};
