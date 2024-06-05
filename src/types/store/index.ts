import type { AuthStoreType } from "./auth";
import type { CategoryStoreType } from "./category";
import type { DialogStoreType } from "./dialog";
import type { GroupStoreType } from "./group";
import type { ObjectModelStoreType } from "./objectModel";
import type { PlaygroundStoreType } from "./playground";
import type { TestStoreType } from "./test";
import type { ResultStoreType } from "./result";

export type StoreType = DialogStoreType &
  CategoryStoreType &
  ObjectModelStoreType &
  AuthStoreType &
  GroupStoreType &
  PlaygroundStoreType &
  TestStoreType &
  ResultStoreType;
