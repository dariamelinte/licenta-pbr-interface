import * as yup from 'yup';

import { ERROR_MESSAGE } from './messages';

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const referenceIdSchema = yup.object().shape({
  _id: yup.string().required(),
});

export const categorySchema = yup.object().shape({
  name: yup.string().required(),
});

export const objectModelApiSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  category: referenceIdSchema,
  model: yup.string().required(),
});

export const objectModelSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  category: yup.string().required(),
  model: yup.mixed().nullable(),
  size: yup.string().required(),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email(ERROR_MESSAGE.invalidEmail).required(),
  password: yup
    .string()
    .matches(passwordRules, {
      message: ERROR_MESSAGE.invalidPassword,
    })
    .required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], ERROR_MESSAGE.differentPasswords)
    .required(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email(ERROR_MESSAGE.invalidEmail).required(),
  password: yup.string().required(),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email(ERROR_MESSAGE.invalidEmail).required(),
});

export const profileSchema = yup.object().shape({
  last_name: yup.string().required(),
  first_name: yup.string().required(),
  phone_number: yup.string().required(),
  institution: yup.string().required(),
  role: yup.string().required(),
});

export const groupSchema = yup.object().shape({
  name: yup.string().required(),
  code: yup.string().required(),
});

export const joinGroupSchema = yup.object().shape({
  code: yup.string().required(),
});

export const testSchema = yup.object().shape({
  status: yup.string().required(),

  name: yup.string().required(),
  description: yup.string(),
  min_score: yup.number().required(),
  max_score: yup.number().required(),
  group: yup.string().required(),
});
