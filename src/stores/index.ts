import { create } from 'zustand';

import { StoreType } from '@/types/store';

import { confirmDialogSlice } from './confirmDialog';
import { categorySlice } from './category';


const useStore = create<StoreType>((...a) => ({
  ...confirmDialogSlice(...a),
  ...categorySlice(...a)
}))

export default useStore;
