import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import { Button, Form as CommonForm } from '@/components/common';
import { INITIAL_LOGIN_FORM } from '@/constants/initial-objects';
import { authLabels } from '@/constants/labels';
import { loginSchema } from '@/constants/validation-schemas';
import useStore from '@/stores';
import type { LoginFormType } from '@/types/common/auth';

export const LoginForm = () => {
  const router = useRouter();
  const { login, loading } = useStore((state) => state.auth);

  return (
    <Formik<LoginFormType>
      initialValues={INITIAL_LOGIN_FORM}
      validationSchema={loginSchema}
      onSubmit={(values) => login(values, () => router.push('/app'))}
    >
      <Form className="w-full">
        <p className="title">Log in</p>
        <div className="py-6">
          <CommonForm.InputField name="email" placeholder={authLabels.email} />
          <CommonForm.InputField
            name="password"
            placeholder={authLabels.password}
            className="my-3"
            type="password"
          />
        </div>
        <Button type="submit" loading={loading} className="mb-2 w-full">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};
