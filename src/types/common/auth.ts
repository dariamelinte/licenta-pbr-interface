export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = LoginFormType & {
  confirm_password: string;
};

export type ForgotPasswordFormType = {
  email: string;
};
