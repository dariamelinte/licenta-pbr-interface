import { useRouter } from "next/router";

import { AuthPage } from "@/layouts";
import { ObjectModelMenu } from "@/components/playground";

const Index = () => {
  const router = useRouter();

  return (
    <AuthPage className="max-w-[100vw] overflow-hidden">
      <div className="p-6 absolut t-1 l-1">
        <ObjectModelMenu />
      </div>
    </AuthPage>
  );
};

export default Index;
