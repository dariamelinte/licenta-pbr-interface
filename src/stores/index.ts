import { create } from 'zustand';

import type { StoreType } from '@/types/common/Store';

const useStore = create<StoreType>((set) => ({
  level: '',
  isDialogOpen: false,
  confirmDialog: {
    title: '',
    content: '',
    action: '',
  },
  onConfirmDialog: () => {},

  setLevel: (level) => set({ level }),
  setIsDialogOpen: (isDialogOpen) => set({ isDialogOpen }),
  setConfirmDialog: (confirmDialog) => set({ confirmDialog }),
  setOnConfirmDialog: (onConfirmDialog) => set({ onConfirmDialog }),
}));

export default useStore;
