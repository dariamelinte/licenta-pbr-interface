import * as THREE from "three";

import { CoordinatesObjectType } from "@/types/common/playground";

export const modelEntensions = [".glb", ".gltf", ".fbx", ".obj", ".stl"];

export const coordinatesAxes: CoordinatesObjectType<string> = {
  ox: "Ox",
  oy: "Oy",
  oz: "Oz",
};

export const canvasCoordinatesAxes: CoordinatesObjectType<string> = {
  ox: "side",
  oy: "top",
  oz: "front",
};

export const getCameraPerspective = (
  axe?: keyof CoordinatesObjectType<any>
) => {
  if (!axe) return undefined;

  switch (canvasCoordinatesAxes[axe]) {
    case canvasCoordinatesAxes.ox:
      return new THREE.Vector3(0, 10, 0);
    case canvasCoordinatesAxes.oy:
      return new THREE.Vector3(10, 0, 0);
    case canvasCoordinatesAxes.oz:
      return new THREE.Vector3(0, 0, 10);
  }
  return undefined;
};

export const testStatuses = {
  'wip': 'Work in progress',
  'posted': 'Posted',
}