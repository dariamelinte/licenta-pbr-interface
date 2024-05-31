import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import React from "react";

import { Board } from "@/components/playground";
import { AuthPage } from "@/layouts";
import useStore from "@/stores";

const Index = () => {
  const { loading, getObjectModels } = useStore(
    (state) => state.objectModel
  );
  const { addObjectInstance } = useStore((state) => state.playground);

  useEffect(() => {
    getObjectModels();
  }, [getObjectModels]);

  if (loading) {
    // TODO: Loading
    return <div>Loading ..</div>;
  }

  return (
    <AuthPage className="max-w-[100vw] overflow-hidden">
      <Board onAddInstance={(id) => addObjectInstance(uuidv4(), id)} />
    </AuthPage>
  );
};

export default Index;
