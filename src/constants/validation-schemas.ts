import * as yup from 'yup';

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
