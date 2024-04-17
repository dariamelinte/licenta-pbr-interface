type MenuTab = {
  text: string;
  url: string;
};

export type ModuleType = 'admin';

export const tabs: { [key in ModuleType]: MenuTab[] } = {
  admin: [
    {
      text: 'Categories',
      url: `/admin/category`,
    },
    {
      text: 'Object Models',
      url: `/admin/object-model`,
    },
    {
      text: 'Users',
      url: `/admin/user`,
    },
    {
      text: 'Tests',
      url: `/admin/tests`,
    },
    {
      text: 'Results',
      url: `/admin/result`,
    },
    {
      text: 'Groups',
      url: `/admin/group`,
    },
  ],
};
