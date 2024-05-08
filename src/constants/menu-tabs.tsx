import { BookOpen, UserGroup } from '@/components/icons';
import type { UserRoleType } from '@/types/common/user';

type MenuTab = {
  text: string;
  url: string;
  icon?: any;
};

export const tabs: { [key in UserRoleType]: MenuTab[] } = {
  admin: [
    {
      text: 'Categories',
      url: `/admin/category`,
    },
    {
      text: 'Object Models',
      url: `/admin/object-model`,
    },
  ],
  student: [],
  professor: [
    {
      text: 'Groups',
      url: '/app/groups',
      icon: <UserGroup />,
    },
    {
      text: 'Tests',
      url: '/app/tests',
      icon: <BookOpen />,
    },
  ],
};
