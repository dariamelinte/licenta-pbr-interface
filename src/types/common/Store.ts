import type { ConfirmDialogType } from './ConfirmDialog';

export type StoreType = {
  level: string;
  isDialogOpen: boolean;
  confirmDialog: ConfirmDialogType;
  onConfirmDialog: () => void;

  setLevel: (level: string) => void;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  setConfirmDialog: (confirmDialog: ConfirmDialogType) => void;
  setOnConfirmDialog: (onConfirmDialog: () => void) => void;
};
