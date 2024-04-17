import { create } from 'zustand';

import type { StoreType } from '@/types/store';

import { categorySlice } from './category';
import { dialogSlice } from './dialog';

const useStore = create<StoreType>((...a) => ({
  ...dialogSlice(...a),
  ...categorySlice(...a),
}));

export default useStore;
