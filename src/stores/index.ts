import { create } from 'zustand';

import { StoreType } from '@/types/store';

import { confirmDialogSlice } from './confirmDialog';


const useStore = create<StoreType>((...a) => ({
  ...confirmDialogSlice(...a),
}))

export default useStore;
