import { create } from 'zustand';

import type { StoreType } from '@/types/store';

import { authSlice } from './auth';
import { categorySlice } from './category';
import { dialogSlice } from './dialog';
import { groupSlice } from './group';
import { objectModelSlice } from './objectModel';
import { playgroundSlice } from './playground';
import { testSlice } from './test';

const useStore = create<StoreType>((...a) => ({
  ...dialogSlice(...a),
  ...categorySlice(...a),
  ...objectModelSlice(...a),
  ...authSlice(...a),
  ...groupSlice(...a),
  ...playgroundSlice(...a),
  ...testSlice(...a),
}));

export default useStore;
