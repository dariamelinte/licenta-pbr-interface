import { Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button, Form as CommonForm } from '@/components/common';
import { INITIAL_FORGOT_PASSWORD_FORM } from '@/constants/initial-objects';
import { authLabels } from '@/constants/labels';
import { forgotPasswordSchema } from '@/constants/validation-schemas';
import { UnauthPage } from '@/layouts';
import logo from '@/public/favicon.ico';
import useStore from '@/stores';
import type { ForgotPasswordFormType } from '@/types/common/auth';

const Index = () => {
  const router = useRouter();
  const { forgotPassword, loading } = useStore((state) => state.auth);

  return (
    <UnauthPage className="flex flex-col items-center justify-center">
      <div className="flex w-[360px] flex-col items-center rounded-xl border-t-4 border-blue-900 bg-white px-10 py-6 shadow">
        <Image alt="logo" src={logo} width={200} height={200} />
        <Formik<ForgotPasswordFormType>
          initialValues={INITIAL_FORGOT_PASSWORD_FORM}
          validationSchema={forgotPasswordSchema}
          onSubmit={forgotPassword}
        >
          <Form className="w-full">
            <p className="text-2xl font-bold leading-none tracking-tight text-blue-900">
              Forgot password
            </p>
            <div className="py-6">
              <CommonForm.InputField
                name="email"
                placeholder={authLabels.email}
              />
            </div>
            <Button type="submit" loading={loading} className="mb-2 w-full">
              Request reset link
            </Button>
          </Form>
        </Formik>
        <Button
          underlined
          size="text"
          onClick={() => router.push('/auth/login')}
        >
          Log in
        </Button>
        <Button
          underlined
          size="text"
          onClick={() => router.push('/auth/register')}
        >
          Register
        </Button>
      </div>
    </UnauthPage>
  );
};

export default Index;
