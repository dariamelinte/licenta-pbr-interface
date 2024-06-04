import type {
  ForgotPasswordFormType,
  LoginFormType,
  RegisterFormType,
} from "@/types/common/auth";
import type { CategoryType } from "@/types/common/category";
import type { GroupFormType, JoinGroupFormType } from "@/types/common/group";
import { LinkageType } from "@/types/common/linkage";
import { ObjectInstanceType } from "@/types/common/objectInstance";
import type { ObjectModelInputType } from "@/types/common/objectModel";
import { TestFormType } from "@/types/common/test";
import type { ProfileType } from "@/types/common/user";

export const INITIAL_CATEGORY: CategoryType = {
  name: "",
};

export const INITIAL_OBJECT_MODEL: ObjectModelInputType = {
  name: "",
  category: "",
  model: null,
  size: 'big'
};

export const INITIAL_LOGIN_FORM: LoginFormType = {
  email: "",
  password: "",
};

export const INITIAL_REGISTER_FORM: RegisterFormType = {
  email: "",
  password: "",
  confirm_password: "",
};

export const INITIAL_FORGOT_PASSWORD_FORM: ForgotPasswordFormType = {
  email: "",
};

export const INITIAL_PROFILE_FORM: ProfileType = {
  last_name: "",
  first_name: "",
  phone_number: "",
  institution: "",
  role: "student",
};

export const INITIAL_GROUP = (code: string): GroupFormType => ({
  name: "",
  code,
});

export const INITIAL_JOIN_GROUP: JoinGroupFormType = {
  code: "",
};

export const INITIAL_TEST_FORM: TestFormType = {
  name: '',
  description: '',
  status: 'wip',

  min_score: 50,
  max_score: 100,

  start_date: (new Date()).getTime(),
  due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime(),

  group: '',
};
