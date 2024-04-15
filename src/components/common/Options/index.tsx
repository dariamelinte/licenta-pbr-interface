import { Button } from '@/components/common/Buttons';
import {
  PencilSquare,
  Trash
} from '@/components/icons';

import styles from './Options.module.css';

type OptionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const Options: React.FC<OptionsProps> = ({
  onDelete,
  onEdit,
}) => {
  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        icon={<PencilSquare className={styles.icon} />}
        onClick={onEdit}
      />
      <Button
        theme="base"
        className={styles.button}
        icon={<Trash className={styles.icon} />}
        onClick={onDelete}
      />
    </div>
  );
};
