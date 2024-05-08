import { create } from 'zustand';

import type { StoreType } from '@/types/store';

import { authSlice } from './auth';
import { categorySlice } from './category';
import { dialogSlice } from './dialog';
import { objectModelSlice } from './objectModel';
import { groupSlice } from './group';

const useStore = create<StoreType>((...a) => ({
  ...dialogSlice(...a),
  ...categorySlice(...a),
  ...objectModelSlice(...a),
  ...authSlice(...a),
  ...groupSlice(...a),
}));

export default useStore;
