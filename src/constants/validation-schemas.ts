import * as yup from 'yup';

export const referenceIdSchema = yup.object().shape({
  _id: yup.object().shape({
    $oid: yup.string().required(),
  })
});

export const categorySchema = yup.object().shape({
  name: yup.string().required(),
});
