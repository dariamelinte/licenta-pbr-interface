import type {
  ForgotPasswordFormType,
  LoginFormType,
  RegisterFormType,
} from '@/types/common/auth';
import type { ProfileType } from '@/types/common/user';

export type AuthStoreType = {
  auth: {
    user: ProfileType | null;
    token: string | null;
    loading: boolean;

    credential: string | null;
    expiration_time: number | null;
    email: string | null;
    has_profile: boolean;

    register: (
      values: Omit<RegisterFormType, 'confirm_password'>,
      onSuccess: () => void,
    ) => void;
    login: (values: LoginFormType, onSuccess: () => void) => void;
    forgotPassword: (values: ForgotPasswordFormType) => void;

    signOut: () => void;

    setLoading: (loading: boolean) => void;
    setToken: (token: string) => void;
  };
};
