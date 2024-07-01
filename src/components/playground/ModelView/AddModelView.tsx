import { Button } from "@/components/common";
import { Plus } from "@/components/icons";
import type { ObjectModelApiType } from "@/types/common/api";

import { ModelView } from "./ModelView";
import styles from "./ModelView.module.css";

type AddModelViewProps = {
  objectModel: ObjectModelApiType;
  addObjectInstance: (objectModelId: string) => void;
};

export const AddModelView: React.FC<AddModelViewProps> = ({
  objectModel,
  addObjectInstance,
}) => {
  return (
    <>
      <div>
        <div className={styles.info}>
          <p className={styles.title}>{objectModel.name}</p>
          <Button
            className={styles.button}
            icon={<Plus className={styles.icon} />}
            onClick={() => addObjectInstance(objectModel._id)}
          />
        </div>
        <div className={styles.description}>{objectModel.description}</div>
      </div>
      <div>
        <ModelView
          model={objectModel.model}
          defaultScale={[0.08, 0.08, 0.08]}
          height={240}
        />
      </div>
    </>
  );
};
