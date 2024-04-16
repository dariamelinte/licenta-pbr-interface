import { StateCreator } from "zustand";

import { DialogStoreType } from "@/types/store/dialog";

export const dialogSlice: StateCreator<
  DialogStoreType,
  [],
  [],
  DialogStoreType
> = (set, get) => ({
  dialog: {
    isOpen: false,
    setIsOpen: (isOpen) =>
      set({
        dialog: {
          ...get().dialog,
          isOpen,
        },
      }),

    onConfirm: () => {},
    setOnConfirm: (onConfirm) =>
      set({
        dialog: {
          ...get().dialog,
          onConfirm,
        },
      }),
  },
});
