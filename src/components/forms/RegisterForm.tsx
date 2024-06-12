import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import { Button, Form as CommonForm } from '@/components/common';
import { INITIAL_REGISTER_FORM } from '@/constants/initial-objects';
import { authLabels } from '@/constants/labels';
import { registerSchema } from '@/constants/validation-schemas';
import useStore from '@/stores';
import type { RegisterFormType } from '@/types/common/auth';
import { useCallback } from 'react';

export const RegisterForm = () => {
  const router = useRouter();
  const { register, loading } = useStore(useCallback((state) => state.auth, []));

  return (
    <Formik<RegisterFormType>
      initialValues={INITIAL_REGISTER_FORM}
      validationSchema={registerSchema}
      onSubmit={({ email, password }) =>
        register({ email, password }, () => router.push('/auth/login'))
      }
    >
      <Form className="w-full">
        <p className="title">Register</p>
        <div className="py-6">
          <CommonForm.InputField name="email" placeholder={authLabels.email} />
          <CommonForm.InputField
            name="password"
            placeholder={authLabels.password}
            className="my-3"
            type="password"
          />
          <CommonForm.InputField
            name="confirm_password"
            placeholder={authLabels.confirm_password}
            type="password"
          />
        </div>
        <Button loading={loading} type="submit" className="mb-2 w-full">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};
