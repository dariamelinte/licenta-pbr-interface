import type { CategoryStoreType } from './category';
import type { DialogStoreType } from './dialog';
import type { ObjectModelStoreType } from './objectModel';

export type StoreType = DialogStoreType &
  CategoryStoreType &
  ObjectModelStoreType;
