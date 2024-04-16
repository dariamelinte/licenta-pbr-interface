import { ConfirmDialogStoreType } from "@/types/store/confirmDialog";
import { StateCreator } from "zustand";

export const confirmDialogSlice: StateCreator<
  ConfirmDialogStoreType,
  [],
  [],
  ConfirmDialogStoreType
> = (set, get) => ({
  confirmDialog: {
    isOpen: false,
    setIsOpen: (isOpen) =>
      set({
        confirmDialog: {
          ...get().confirmDialog,
          isOpen,
        },
      }),

    content: {
      title: "",
      content: "",
      action: "",
    },
    setContent: (content) =>
      set({
        confirmDialog: {
          ...get().confirmDialog,
          content,
        },
      }),

    onConfirm: () => {},
    setOnConfirm: (onConfirm) =>
      set({
        confirmDialog: {
          ...get().confirmDialog,
          onConfirm,
        },
      }),
  },
});
