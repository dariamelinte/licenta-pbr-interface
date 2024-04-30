import { Page } from "@/layouts";
import Image from "next/image";
import { useRouter } from "next/router";

import logo from "@/public/favicon.ico";
import { Button } from "@/components/common";

const Index = () => {
  const router = useRouter();

  return (
    <Page className="flex flex-col items-center justify-center">
      <div className="flex flex-col bg-white py-6 px-10 rounded-xl border-t-4 border-blue-900 shadow">
        <Image alt="logo" src={logo} width={200} height={200} />
        <Button theme="secondary" className="my-2" onClick={() => router.push("/login")}>
          Log In
        </Button>
        <Button  className="my-2" onClick={() => router.push("/register")}>
          Register
        </Button>
        <Button underlined onClick={() => router.push("/forgot-password")}>
          Forgot password
        </Button>
      </div>
    </Page>
  );
};

export default Index;
