import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@/components/common';
import { RegisterForm } from '@/components/forms';
import { UnauthPage } from '@/layouts';
import logo from '@/public/favicon.ico';

const Index = () => {
  const router = useRouter();

  return (
    <UnauthPage className="flex flex-col items-center justify-center">
      <div className="card w-[360px]">
        <Image alt="logo" src={logo} width={200} height={200} />
        <RegisterForm />
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
    </UnauthPage>
  );
};

export default Index;
