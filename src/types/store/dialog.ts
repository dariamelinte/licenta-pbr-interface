export type ConfirmDialogType = {
  title: string;
  content: string;
  action: string;
};

export type OpenType =
  | 'confirm-delete'
  | 'confirm-empty'
  | 'category'
  | 'category'
  | 'object-model'
  | 'object-model'
  | null;

export type DialogStoreType = {
  dialog: {
    open: OpenType;
    setOpen: (open: OpenType) => void;

    onConfirm: (...args: any[]) => void;
    setOnConfirm: (onConfirm: (...args: any[]) => void) => void;

    onCancel: (...args: any[]) => void;
    setOnCancel: (onCancel: (...args: any[]) => void) => void;
  };
};
