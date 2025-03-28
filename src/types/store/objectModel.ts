import type { ObjectModelApiType } from '@/types/common/api';
import type { ObjectModelInputType } from '@/types/common/objectModel';

export type ObjectModelStoreType = {
  objectModel: {
    objectModels: ObjectModelApiType[];
    loading: boolean;

    setLoading: (loading: boolean) => void;

    getObjectModels: (refresh?: boolean) => void;
    deleteObjectModel: (token: string, id: string) => void;

    createObjectModel: (
      token: string,
      objectModel: ObjectModelInputType,
    ) => void;
    updateObjectModel: (token: string, objectModel: ObjectModelApiType) => void;

    getObjectModelsByCategory: (
      category: string,
    ) => Promise<ObjectModelApiType[] | null>;
  };
};
