import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { confirm } from "@/constants/confirm-dialog";
import { VerticalMenuPage } from "@/layouts";
import useStore from "@/stores";
import { TestForm } from "@/components/forms";

const Index = () => {
  const router = useRouter();

  const { open, setOpen, setOnConfirm } = useStore((state) => state.dialog);
  const { token, user } = useStore((state) => state.auth);
  const { wipTest, setWipTest } = useStore((state) => state.test);

  return (
    <VerticalMenuPage>
      <div className="w-full m-3">
        <TestForm />
      </div>
    </VerticalMenuPage>
  );
};

export default Index;
