export type DialogType = {
  title: string;
  content: string;
  action: string;
};

export type DialogStoreType = {
  dialog: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  
    onConfirm: () => void;
    setOnConfirm: (onConfirm: () => void) => void;
  }
};
