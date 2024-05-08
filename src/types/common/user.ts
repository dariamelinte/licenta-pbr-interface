export type UserRoleType = 'admin' | 'professor' | 'student';

export type ProfileType = {
  _id?: string;
  credential?: string;

  last_name: string;
  first_name: string;
  phone_number: string;

  institution: string;
  role: UserRoleType;
};

export type CredentialType = {
  email: string;
};
