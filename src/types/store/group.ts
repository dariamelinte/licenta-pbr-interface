import type { CompleteGroupApiType, GroupApiType } from '@/types/common/api';
import type { GroupFormType } from '@/types/common/group';

export type GroupStoreType = {
  group: {
    groups: GroupApiType[];
    loading: boolean;

    setLoading: (loading: boolean) => void;

    getGroups: (accessToken: string) => void;
    getGroupById: (
      accessToken: string,
      id: string,
    ) => Promise<CompleteGroupApiType | null>;
    deleteGroup: (accessToken: string, id: string) => void;

    createGroup: (accessToken: string, group: GroupFormType) => void;
    updateGroup: (
      accessToken: string,
      group: Partial<GroupApiType>,
      onSuccess?: () => void,
    ) => void;
  };
};
