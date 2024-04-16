export type ConfirmDialogType = {
  title: string;
  content: string;
  action: string;
};

export type ConfirmDialogStoreType = {
  confirmDialog: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  
    content: ConfirmDialogType;
    setContent: (content: ConfirmDialogType) => void;
  
    onConfirm: () => void;
    setOnConfirm: (onConfirm: () => void) => void;
  }
};
