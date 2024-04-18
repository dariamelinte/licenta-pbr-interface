import { create } from 'zustand';

import type { StoreType } from '@/types/store';

import { categorySlice } from './category';
import { dialogSlice } from './dialog';
import { objectModelSlice } from './objectModel';

const useStore = create<StoreType>((...a) => ({
  ...dialogSlice(...a),
  ...categorySlice(...a),
  ...objectModelSlice(...a)
}));

export default useStore;
