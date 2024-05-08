export type UserRoleType = 'admin' | 'professor' | 'student';

export type ProfileType = {
  last_name: string;
  first_name: string;
  phone_number: string;

  institution: string;
  role: UserRoleType;
};

export type CredentialType = {
  email: string;
};
