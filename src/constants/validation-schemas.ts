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
