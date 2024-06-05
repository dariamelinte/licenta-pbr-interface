import { Button } from '@/components/common/Buttons';
import { ChartBar, PencilSquare, Trash, ViewfinderCircle } from '@/components/icons';

import styles from './Options.module.css';

type OptionsProps = {
  disabled?: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewMultiple?: () => void;
};

export const Options: React.FC<OptionsProps> = ({
  disabled,
  onDelete,
  onEdit,
  onView,
  onViewMultiple,
}) => {
  return (
    <div className={styles.container}>
      {onView && (
        <Button
          className={styles.button}
          icon={<ViewfinderCircle className={styles.icon} />}
          onClick={onView}
          disabled={disabled}
        />
      )}
      {onViewMultiple && (
        <Button
          theme="base"
          className={styles.button}
          icon={<ChartBar className={styles.icon} />}
          onClick={onViewMultiple}
          disabled={disabled}
        />
      )}
      {onEdit && (
        <Button
          theme="base"
          className={styles.button}
          icon={<PencilSquare className={styles.icon} />}
          onClick={onEdit}
          disabled={disabled}
        />
      )}
      {onDelete && (
        <Button
          theme="danger"
          className={styles.button}
          icon={<Trash className={styles.icon} />}
          onClick={onDelete}
          disabled={disabled}
        />
      )}
    </div>
  );
};
