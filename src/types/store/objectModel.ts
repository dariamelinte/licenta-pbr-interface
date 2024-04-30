import type { ObjectModelApiType } from "@/types/common/api";
import { ObjectModelInputType } from "@/types/common/objectModel";

export type ObjectModelStoreType = {
  objectModel: {
    objectModels: ObjectModelApiType[];
    loading: boolean;

    setLoading: (loading: boolean) => void;

    getObjectModels: () => void;
    deleteObjectModel: (id: string) => void;

    createObjectModel: (objectModel: ObjectModelInputType) => void;
    updateObjectModel: (objectModel: ObjectModelApiType) => void;
  };
};
