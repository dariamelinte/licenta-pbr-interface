import type { StateCreator } from 'zustand';

import type { DialogStoreType } from '@/types/store/dialog';

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
      

    onCancel: () => {},
    setOnCancel: (onCancel) =>
      set({
        dialog: {
          ...get().dialog,
          onCancel,
        },
      }),
  },
});
