"use client";

import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { Form } from "@/components/common";
import { CoordinatesButton } from "@/components/common/Buttons";
import { ArrowPath } from "@/components/icons";
import {
  Linkage,
  ObjectModelMenu,
  PlaygroundModelView,
} from "@/components/playground";
import { objectModelSizes } from "@/constants/constants";
import useStore from "@/stores";
import { PointType } from "@/types/common/playground";

type BoardProps = {
  shouldResetBoard?: boolean;
  disabled?: boolean;
  onAddInstance: (id: string, position: PointType) => void;
};

export const Board: React.FC<BoardProps> = ({
  onAddInstance,
  shouldResetBoard,
  disabled,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { objectModels } = useStore(useCallback((state) => state.objectModel, []));
  const { instances, scale, setScale, linkages, focusedAxe, resetPlayground } =
    useStore(useCallback((state) => state.playground, []));

  const [gridSize, setGridSize] = useState(40); // Initial grid size

  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    if (shouldResetBoard) {
      resetPlayground();
    }
    () => resetPlayground();
  }, [resetPlayground, shouldResetBoard]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLinks(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateGridSize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        setGridSize(containerHeight / 10);
      }
    };

    // Update grid size on initial render and when window resizes
    updateGridSize();
    window.addEventListener("resize", updateGridSize);

    return () => {
      window.removeEventListener("resize", updateGridSize);
    };
  }, []);

  const handleChangeScale = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value) / 100);
  };

  const handleAddInstance = (id: string) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const objectModel = objectModels.find(
      (objectModel) => objectModel._id === id
    );

    if (!objectModel || !rect) return;

    const position: PointType = {
      x: Math.max(
        (rect.left + (rect.width - objectModelSizes[objectModel.size])) / 2,
        0
      ),
      y: Math.max(
        (rect.top + (rect.height - objectModelSizes[objectModel.size])) / 2,
        0
      ),
    };

    onAddInstance(id, position);
  };

  return (
    <>
      {!disabled ? (
        <div className="t-1 l-1 absolute z-50 p-3">
          <ObjectModelMenu onAddObjectModel={handleAddInstance} />
        </div>
      ) : null}
      <div
        className="relative mx-3 mt-12 h-[80vh] overflow-hidden rounded-xl border-x-2 border-y-4 border-blue-900 bg-blue-800 shadow"
        ref={containerRef}
        style={{
          backgroundSize: `${gridSize * scale}px ${gridSize * scale}px`,
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        }}
      >
        <div
          className="absolute size-2 rounded-full bg-red-500"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        {Object.entries(instances).map(([uuid, instance]) => {
          const objectModel = objectModels.find(
            (objectModel) => objectModel._id === instance.object_model
          );

          if (!objectModel) {
            toast.error("Could not find an object model");
            return null;
          }

          return (
            <PlaygroundModelView
              key={uuid}
              objectInstance={instance}
              objectModel={objectModel}
              disabled={disabled}
            />
          );
        })}
        {showLinks
          ? linkages.map((linkage, idx) => {
              const { first_connection, second_connection } = linkage;
              if (
                !first_connection?.uuid ||
                !second_connection?.uuid
              ) {
                return <div key={idx} />;
              }

              return (
                <Linkage
                  disabled={disabled}
                  linkage={linkage}
                  key={`${linkage.first_connection?.uuid}-${linkage.second_connection?.uuid}-${focusedAxe}-${idx}`}
                />
              );
            })
          : null}
        <button
          className="absolute right-0 top-0 m-3 rounded-xl bg-blue-200 px-2 py-1 text-blue-600"
          onClick={resetPlayground}
          disabled={disabled}
        >
          <ArrowPath className="size-4" />
        </button>
      </div>
      <div className="flex items-center justify-end p-3">
        <Form.Label text="Scale:" className="!m-0" />
        <div className="ml-3 mr-5">
          <Form.Range
            min={0}
            max={100}
            label="Scale"
            value={scale * 100}
            onChange={handleChangeScale}
            disabled={disabled}
          />
        </div>
        <CoordinatesButton />
      </div>
    </>
  );
};
