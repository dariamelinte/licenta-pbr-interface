import type { CategoryStoreType } from "./category";
import type { DialogStoreType } from "./dialog";
import { ObjectModelStoreType } from "./objectModel";

export type StoreType = DialogStoreType &
  CategoryStoreType &
  ObjectModelStoreType;
