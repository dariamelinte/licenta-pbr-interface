import { useRouter } from "next/router";

import { AuthPage } from "@/layouts";
import { ObjectModelMenu } from "@/components/playground";

const Index = () => {
  const router = useRouter();

  return (
    <AuthPage>
      <div>hello world, playground</div>
      <div className="p-6">
        <ObjectModelMenu />
      </div>
    </AuthPage>
  );
};

export default Index;
