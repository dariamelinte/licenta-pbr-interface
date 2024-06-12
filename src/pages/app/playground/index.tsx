import React, { useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Loading } from "@/components/common";
import { Board } from "@/components/playground";
import { VerticalMenuPage } from "@/layouts";
import useStore from "@/stores";

const Index = () => {
  const { loading, getObjectModels } = useStore(useCallback((state) => state.objectModel, []));
  const { addObjectInstance } = useStore(useCallback((state) => state.playground, []));
  const { setResultId } = useStore(useCallback((state) => state.result, []));

  useEffect(() => {
    setResultId(undefined);
    getObjectModels();
  }, [getObjectModels]);

  if (loading) {
    return (
      <VerticalMenuPage>
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  return (
    <VerticalMenuPage className="max-h-screen max-w-[100vw] overflow-hidden">
      <div className="w-full">
        <Board
          onAddInstance={(id, position) =>
            addObjectInstance(uuidv4(), id, position)
          }
        />
      </div>
    </VerticalMenuPage>
  );
};

export default Index;
