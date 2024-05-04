import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@/components/common';
import { Page } from '@/layouts';
import logo from '@/public/favicon.ico';

const Index = () => {
  const router = useRouter();

  return (
    <Page className="flex flex-col items-center justify-center">
      <div className="flex w-[360px] flex-col items-center rounded-xl border-t-4 border-blue-900 bg-white px-10 py-6  shadow">
        <Image alt="logo" src={logo} width={200} height={200} />
        <Button
          className="my-2 w-full"
          onClick={() => router.push('/auth/login')}
        >
          Log In
        </Button>
        <Button
          theme="secondary"
          className="my-2 w-full"
          onClick={() => router.push('/auth/register')}
        >
          Register
        </Button>
        <Button
          underlined
          size="text"
          onClick={() => router.push('/auth/forgot-password')}
        >
          Forgot password
        </Button>
      </div>
    </Page>
  );
};

export default Index;
