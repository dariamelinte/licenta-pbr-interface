import { modelEntensions } from "./models";

export const categoryLabels = {
  name: 'Name',
};

export const objectModelLabels = {
  name: 'Name',
  description: 'Description',
  category: 'Category',
  model: `Upload model (${modelEntensions.join(", ")})`,
};

export const authLabels = {
  email: 'Email',
  password: 'Password',
  confirm_password: 'Confirm password',
};

export const profileLabels = {
  last_name: 'Last name',
  first_name: 'First name',
  phone_number: 'Phone number',
  institution: 'Institution',
  role: 'Role',
};

export const groupLabels = {
  name: 'Name',
  code: 'Code',
};
