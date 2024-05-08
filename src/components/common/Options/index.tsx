import { Button } from '@/components/common/Buttons';
import { PencilSquare, Trash, ViewfinderCircle } from '@/components/icons';

import styles from './Options.module.css';

type OptionsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const Options: React.FC<OptionsProps> = ({
  onDelete,
  onEdit,
  onView,
}) => {
  console.log({ onDelete, onView, onEdit });
  return (
    <div className={styles.container}>
      {onView && (
        <Button
          className={styles.button}
          icon={<ViewfinderCircle className={styles.icon} />}
          onClick={onView}
        />
      )}
      {onEdit && (
        <Button
          theme="base"
          className={styles.button}
          icon={<PencilSquare className={styles.icon} />}
          onClick={onEdit}
        />
      )}
      {onDelete && (
        <Button
          theme="danger"
          className={styles.button}
          icon={<Trash className={styles.icon} />}
          onClick={onDelete}
        />
      )}
    </div>
  );
};
