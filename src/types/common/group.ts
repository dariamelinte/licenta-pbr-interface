import type { ProfileType } from './user';

export type GroupFormType = {
  name: string;
  code: string;
};

export type GroupType = {
  name: string;
  code: string;
  professor: string;
  students: string[];
};

export type CompleteGroupType = {
  name: string;
  code: string;
  professor: ProfileType;
  students: ProfileType[];
};
