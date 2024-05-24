import { BookOpen, Folder, PuzzlePiece, UserGroup } from '@/components/icons';
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
      icon: <BookOpen />,
    },
    {
      text: 'Models',
      url: `/admin/object-model`,
      icon: <Folder />,
    },
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
    {
      text: 'Playground',
      url: '/app/playground',
      icon: <PuzzlePiece />,
    },
  ],
  student: [
    {
      text: 'Groups',
      url: '/app/groups',
      icon: <UserGroup />,
    },
  ],
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
    {
      text: 'Playground',
      url: '/app/playground',
      icon: <PuzzlePiece />,
    },
  ],
};
