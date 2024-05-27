import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import cx from 'classnames'

import { AuthPage } from "@/layouts";
import { ModelView, ObjectModelMenu, Piece } from "@/components/playground";
import useStore from "@/stores";
import { useEffect } from "react";
import { CoordinatesButton } from "@/components/common/Buttons";
import { toast } from "react-toastify";

const Index = () => {
  const router = useRouter();
  const { objectModels, loading, getObjectModels } = useStore(
    (state) => state.objectModel
  );
  const { focusedAxe, objectInstances, addObjectInstance } = useStore((state) => state.playground);

  useEffect(() => {
    getObjectModels();
  }, [getObjectModels]);

  if (loading) {
    // TODO: Loading
    return <div>Loading ..</div>;
  }

  console.log({ focusedAxe, objectInstances });

  return (
    <AuthPage className="max-w-[100vw] overflow-hidden">
      <div className="p-3 absolute t-1 l-1 z-50">
        <ObjectModelMenu onAddObjectModel={(id) => addObjectInstance(uuidv4(), id)} />
      </div>
      <div className="rounded-xl border-y-4 border-x-2 border-blue-900 bg-blue-800 mt-12 mx-3 h-[80vh] shadow overflow-hidden">
        {Object.entries(objectInstances).map(([id, instance]) => {
          const objectModel = objectModels.find(
            (objectModel) => objectModel._id === instance._id_object_model
          );
          if (!objectModel) {
            toast.error("Could not find an object model");
            return;
          }
          return (
            <Piece>
              <div key={id} className={cx("border-2 border-blue-900 rounded")}>
                <ModelView model={objectModel?.model} disableControls width={400} height={400} />
              </div>
            </Piece>
          );
        })}
      </div>
      <div className="p-3 flex justify-end items-center">
        <CoordinatesButton />
      </div>
    </AuthPage>
  );
};

export default Index;
