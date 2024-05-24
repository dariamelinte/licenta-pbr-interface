import { v4 as uuidv4 } from "uuid";

import { ObjectModelApiType } from "@/types/common/api";
import { Button } from "@/components/common";
import { Plus } from "@/components/icons";
import useStore from "@/stores";

import { ModelView } from "./ModelView";
import styles from "./ModelView.module.css";

type AddModelViewProps = {
  objectModel: ObjectModelApiType;
};

export const AddModelView: React.FC<AddModelViewProps> = ({ objectModel }) => {
  const { addObjectInstance } = useStore((state) => state.playground);

  return (
    <>
      <div className={styles.info}>
        <p className={styles.title}>{objectModel.name}</p>
        <Button
          className={styles.button}
          icon={<Plus className={styles.icon} />}
          onClick={() => addObjectInstance(uuidv4(), objectModel._id)}
        />
      </div>
      <div className="h-[120px]">
        <ModelView model={objectModel.model} orbitControl />
      </div>
    </>
  );
};
