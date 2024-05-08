import type { AuthStoreType } from './auth';
import type { CategoryStoreType } from './category';
import type { DialogStoreType } from './dialog';
import type { GroupStoreType } from './group';
import type { ObjectModelStoreType } from './objectModel';

export type StoreType = DialogStoreType &
  CategoryStoreType &
  ObjectModelStoreType &
  AuthStoreType &
  GroupStoreType;
