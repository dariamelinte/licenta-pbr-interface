import type {
  ForgotPasswordFormType,
  LoginFormType,
  RegisterFormType,
} from '@/types/common/auth';
import type { UserType } from '@/types/common/user';

export type AuthStoreType = {
  auth: {
    user: UserType | null;
    token: string | null;
    loading: boolean;

    register: (
      values: Omit<RegisterFormType, 'confirm_password'>,
      onSuccess: () => void,
    ) => void;
    login: (values: LoginFormType, onSuccess: () => void) => void;
    forgotPassword: (values: ForgotPasswordFormType) => void;

    signOut: () => void;

    setLoading: (loading: boolean) => void;
  };
};
