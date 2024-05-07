import { Form, Formik } from 'formik';

import { Button, Form as CommonForm } from '@/components/common';
import { INITIAL_FORGOT_PASSWORD_FORM } from '@/constants/initial-objects';
import { authLabels } from '@/constants/labels';
import { forgotPasswordSchema } from '@/constants/validation-schemas';
import useStore from '@/stores';
import type { ForgotPasswordFormType } from '@/types/common/auth';

export const ForgotPasswordForm = () => {
  const { forgotPassword, loading } = useStore((state) => state.auth);

  return (
    <Formik<ForgotPasswordFormType>
      initialValues={INITIAL_FORGOT_PASSWORD_FORM}
      validationSchema={forgotPasswordSchema}
      onSubmit={forgotPassword}
    >
      <Form className="w-full">
        <p className="title">Forgot password</p>
        <div className="py-6">
          <CommonForm.InputField name="email" placeholder={authLabels.email} />
        </div>
        <Button type="submit" loading={loading} className="mb-2 w-full">
          Request reset link
        </Button>
      </Form>
    </Formik>
  );
};
