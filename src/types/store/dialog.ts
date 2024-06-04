export type ConfirmDialogType = {
  title: string;
  content: string;
  action: string;
};

export type OpenType =
  | 'confirm-delete'
  | 'confirm-empty'
  | 'confirm-leave'
  | 'category'
  | 'object-model'
  | 'add-group'
  | 'join-group'
  | 'test-information'
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
