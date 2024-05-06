export type UserRoleType = 'admin' | 'professor' | 'student' | 'unknown';

export type UserType = {
  last_name: string;
  first_name: string;
  phone_number: string;
  email: string;
  institution: string;
  role: UserRoleType;

  enrolled_by?: string;
};
