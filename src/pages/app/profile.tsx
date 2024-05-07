import { VerticalMenuPage } from "@/layouts";
import { ProfileForm } from "@/components/forms";
import { Button } from "@/components/common";
import useStore from "@/stores";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { signOut } = useStore((state) => state.auth);

  return (
    <VerticalMenuPage>
      <div className="w-full p-16">
        <div className="card">
          <ProfileForm />
          <div className="flex w-full mt-3">
            <Button
              theme="base"
              className="mr-5 w-full"
              onClick={async () => {
                await signOut();
                router.push("/");
              }}
            >
              Log out
            </Button>
            <Button theme="secondary" className="w-full">
              Change password
            </Button>
          </div>
        </div>
      </div>
    </VerticalMenuPage>
  );
};

export default Index;
