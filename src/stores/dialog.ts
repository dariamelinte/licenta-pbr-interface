import { StateCreator } from "zustand";

import { DialogStoreType } from "@/types/store/dialog";

export const dialogSlice: StateCreator<
  DialogStoreType,
  [],
  [],
  DialogStoreType
> = (set, get) => ({
  dialog: {
    open: null,
    setOpen: (open) =>
      set({
        dialog: {
          ...get().dialog,
          open,
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
