import { create } from 'zustand';

import { StoreType } from '@/types/store';

import { dialogSlice } from './dialog';
import { categorySlice } from './category';


const useStore = create<StoreType>((...a) => ({
  ...dialogSlice(...a),
  ...categorySlice(...a)
}))

export default useStore;
