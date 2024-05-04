import { Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button, Form as CommonForm } from '@/components/common';
import { INITIAL_REGISTER_FORM } from '@/constants/initial-objects';
import { authLabels } from '@/constants/labels';
import { registerSchema } from '@/constants/validation-schemas';
import { Page } from '@/layouts';
import logo from '@/public/favicon.ico';
import type { RegisterFormType } from '@/types/common/auth';

const Index = () => {
  const router = useRouter();

  return (
    <Page className="flex flex-col items-center justify-center">
      <div className="flex w-[360px] flex-col items-center rounded-xl border-t-4 border-blue-900 bg-white px-10 py-6 shadow">
        <Image alt="logo" src={logo} width={200} height={200} />
        <Formik<RegisterFormType>
          initialValues={INITIAL_REGISTER_FORM}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            console.log({ values });
          }}
        >
          <Form className="w-full">
            <p className="text-2xl font-bold leading-none tracking-tight text-blue-900">
              Register
            </p>
            <div className="py-6">
              <CommonForm.InputField
                name="email"
                placeholder={authLabels.email}
              />
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
            <Button type="submit" className="mb-2 w-full">
              Submit
            </Button>
          </Form>
        </Formik>
        <Button
          underlined
          size="text"
          onClick={() => router.push('/auth/forgot-password')}
        >
          Forgot password
        </Button>
        <Button
          underlined
          size="text"
          onClick={() => router.push('/auth/login')}
        >
          Log In
        </Button>
      </div>
    </Page>
  );
};

export default Index;
