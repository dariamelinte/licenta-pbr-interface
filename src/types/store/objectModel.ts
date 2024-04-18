import type {
  ObjectModelApiType,
  ObjectModelGeometryApiType,
  ObjectModelInfoApiType,
} from '@/types/common/api';
import type {
  ObjectModelFlagType,
  ObjectModelType,
} from '@/types/common/objectModel';

export type ObjectModelStoreType = {
  objectModel: {
    objectModels: ObjectModelApiType[];
    objectModelInfos: ObjectModelInfoApiType[];
    objectModelGeometries: ObjectModelGeometryApiType[];
    loading: boolean;

    setLoading: (loading: boolean) => void;

    getObjectModels: (flag?: ObjectModelFlagType) => void;
    deleteObjectModel: (id: string) => void;

    createObjectModel: (objectModel: ObjectModelType) => void;
    updateObjectModel: (objectModel: ObjectModelApiType) => void;
  };
};
