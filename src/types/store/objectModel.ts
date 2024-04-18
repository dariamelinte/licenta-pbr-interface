import type {
  ObjectModelApiType,
  ObjectModelIndecisiveApiType,
} from "@/types/common/api";
import type {
  ObjectModelFlagType,
  ObjectModelType,
} from "@/types/common/objectModel";

export type ObjectModelStoreType = {
  objectModel: {
    objectModels: ObjectModelIndecisiveApiType[];
    loading: boolean;

    getObjectModels: (flag?: ObjectModelFlagType) => void;
    deleteObjectModel: (id: string) => void;

    createObjectModel: (objectModel: ObjectModelType) => void;
    updateObjectModel: (objectModel: ObjectModelApiType) => void;
  };
};
