import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@/components/common';
import { UnauthPage } from '@/layouts';
import logo from '@/public/favicon.ico';
import { ForgotPasswordForm } from '@/components/forms';

const Index = () => {
  const router = useRouter();

  return (
    <UnauthPage className="flex flex-col items-center justify-center">
      <div className="w-[360px] card">
        <Image alt="logo" src={logo} width={200} height={200} />
        <ForgotPasswordForm />
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
