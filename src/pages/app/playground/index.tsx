import { v4 as uuidv4 } from "uuid";

import { AuthPage } from "@/layouts";
import { ObjectModelMenu, PlaygroundModelView } from "@/components/playground";
import useStore from "@/stores";
import { useEffect, useRef } from "react";
import { CoordinatesButton } from "@/components/common/Buttons";
import { toast } from "react-toastify";
import { objectModelSizes } from "@/constants/constants";
import { Form } from "@/components/common";

const Index = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { objectModels, loading, getObjectModels } = useStore(
    (state) => state.objectModel
  );
  const {
    objectInstances,
    addObjectInstance,
    scale,
    setScale,
  } = useStore((state) => state.playground);

  useEffect(() => {
    getObjectModels();
  }, [getObjectModels]);

  if (loading) {
    // TODO: Loading
    return <div>Loading ..</div>;
  }

  return (
    <AuthPage className="max-w-[100vw] overflow-hidden">
      <div className="p-3 absolute t-1 l-1 z-50">
        <ObjectModelMenu
          onAddObjectModel={(id) => addObjectInstance(uuidv4(), id)}
        />
      </div>
      <div
        className="relative rounded-xl border-y-4 border-x-2 border-blue-900 bg-blue-800 mt-12 mx-3 h-[80vh] shadow overflow-hidden"
        ref={containerRef}
      >
        {Object.entries(objectInstances).map(([id, instance]) => {
          const objectModel = objectModels.find(
            (objectModel) => objectModel._id === instance._id_object_model
          );
          if (!objectModel) {
            toast.error("Could not find an object model");
            return null;
          }

          const rect = containerRef.current?.getBoundingClientRect();
          const initialPos = {
            x: Math.max(
              (rect?.left || 0) +
                ((rect?.width || 0) - objectModelSizes[objectModel.size]) / 2,
              0
            ),
            y: Math.max(
              (rect?.top || 0) +
                ((rect?.height || 0) - objectModelSizes[objectModel.size]) / 2,
              0
            ),
          };

          return (
            <PlaygroundModelView
              key={id}
              objectInstanceId={id}
              initialPos={initialPos}
              objectModel={objectModel}
            />
          );
        })}
      </div>
      <div className="p-3 flex justify-end items-center">
        <Form.Label text="Scale:" className="!m-0" />
        <div className="ml-3 mr-5">
          <Form.Range
            min={0}
            max={100}
            label="Scale"
            value={scale * 100}
            onChange={(e) => setScale(Number(e.target.value) / 100)}
          />
        </div>
        <CoordinatesButton />
      </div>
    </AuthPage>
  );
};

export default Index;
