'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Xwrapper } from 'react-xarrows';

import { Form } from '@/components/common';
import { CoordinatesButton } from '@/components/common/Buttons';
import {
  Linkage,
  ObjectModelMenu,
  PlaygroundModelView,
} from '@/components/playground';
import { objectModelSizes } from '@/constants/constants';
import useStore from '@/stores';

type BoardProps = {
  onAddInstance: (id: string) => void;
};

export const Board: React.FC<BoardProps> = ({ onAddInstance }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { objectModels } = useStore((state) => state.objectModel);
  const { instances, scale, setScale, linkages, focusedAxe, resetPlayground } =
    useStore((state) => state.playground);

  const [gridSize, setGridSize] = useState(40); // Initial grid size

  const [showLinks, setShowLinks] = useState(false);

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
    window.addEventListener('resize', updateGridSize);

    return () => {
      window.removeEventListener('resize', updateGridSize);
    };
  }, []);

  useEffect(() => {
    () => resetPlayground();
  }, [resetPlayground]);

  const handleChangeScale = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value) / 100);
  };

  return (
    <Xwrapper>
      <div className="t-1 l-1 absolute z-50 p-3">
        <ObjectModelMenu onAddObjectModel={onAddInstance} />
      </div>
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
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {Object.entries(instances).map(([id, instance]) => {
          const objectModel = objectModels.find(
            (objectModel) => objectModel._id === instance.object_model,
          );
          if (!objectModel) {
            toast.error('Could not find an object model');
            return null;
          }

          const rect = containerRef.current?.getBoundingClientRect();
          const initialPos = {
            x:
              instance.position[focusedAxe].x ||
              Math.max(
                ((rect?.left || 0) +
                  ((rect?.width || 0) - objectModelSizes[objectModel.size])) /
                  2,
                0,
              ),
            y:
              instance.position[focusedAxe].y ||
              Math.max(
                ((rect?.top || 0) +
                  ((rect?.height || 0) - objectModelSizes[objectModel.size])) /
                  2,
                0,
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
        {showLinks
          ? linkages.map((linkage, idx) => (
              <Linkage
                linkage={linkage}
                key={`${linkage.first_connection?.uuid}-${linkage.second_connection?.uuid}-${focusedAxe}-${idx}`}
              />
            ))
          : null}
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
          />
        </div>
        <CoordinatesButton />
      </div>
    </Xwrapper>
  );
};
