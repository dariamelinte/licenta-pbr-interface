import { v4 as uuidv4 } from "uuid";
import { AuthPage } from "@/layouts";
import { ObjectModelMenu, PlaygroundModelView } from "@/components/playground";
import useStore from "@/stores";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CoordinatesButton } from "@/components/common/Buttons";
import { toast } from "react-toastify";
import { objectModelSizes } from "@/constants/constants";
import { Form } from "@/components/common";
import React from "react";

const Index = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridSize, setGridSize] = useState(40); // Initial grid size
  const { objectModels, loading, getObjectModels } = useStore(
    (state) => state.objectModel
  );
  const {
    objectInstances,
    addObjectInstance,
    scale,
    setScale,
    changeObjectInstancePosition,
  } = useStore((state) => state.playground);

  useEffect(() => {
    getObjectModels();
  }, [getObjectModels]);

  useEffect(() => {
    const updateGridSize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        setGridSize(containerHeight / 10);
      }
    };

    // Update grid size on initial render and when window resizes
    updateGridSize();
    window.addEventListener('resize', updateGridSize);

    return () => {
      window.removeEventListener('resize', updateGridSize);
    };
  }, []);

  const handleChangeScale = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value) / 100);
  };

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
        style={{
          backgroundSize: `${gridSize * scale}px ${gridSize * scale}px`,
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        }}
      >
        <div
          className="absolute w-2 h-2 bg-red-500 rounded-full"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
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
              ((rect?.left || 0) +
                ((rect?.width || 0) - objectModelSizes[objectModel.size])) /
                2,
              0
            ),
            y: Math.max(
              ((rect?.top || 0) +
                ((rect?.height || 0) - objectModelSizes[objectModel.size])) /
                2,
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
            onChange={handleChangeScale}
          />
        </div>
        <CoordinatesButton />
      </div>
    </AuthPage>
  );
};

export default Index;
