import type {
  ForgotPasswordFormType,
  LoginFormType,
  RegisterFormType,
} from '@/types/common/auth';
import type { CategoryType } from '@/types/common/category';
import type { ObjectModelInputType } from '@/types/common/objectModel';
import type { ProfileType } from '@/types/common/user';

export const INITIAL_CATEGORY: CategoryType = {
  name: '',
};

export const INITIAL_OBJECT_MODEL: ObjectModelInputType = {
  name: '',
  category: '',
  model: null,
};

export const INITIAL_LOGIN_FORM: LoginFormType = {
  email: '',
  password: '',
};

export const INITIAL_REGISTER_FORM: RegisterFormType = {
  email: '',
  password: '',
  confirm_password: '',
};

export const INITIAL_FORGOT_PASSWORD_FORM: ForgotPasswordFormType = {
  email: '',
};

export const INITIAL_PROFILE_FORM: ProfileType = {
  last_name: '',
  first_name: '',
  phone_number: '',
  institution: '',
  role: 'student',
};
