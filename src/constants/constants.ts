import * as THREE from "three";

import { CoordinatesObjectType } from "@/types/common/playground";

export const modelEntensions = [".glb", ".gltf", ".fbx", ".obj", ".stl"];

export const coordinatesAxes: CoordinatesObjectType<string> = {
  ox: "Side",
  oy: "Top",
  oz: "Front",
};

export const canvasCoordinatesAxes: CoordinatesObjectType<string> = {
  ox: "side",
  oy: "top",
  oz: "front",
};

export const getCameraPerspective = (
  axe: keyof CoordinatesObjectType<any>
) => {
  switch (canvasCoordinatesAxes[axe]) {
    case canvasCoordinatesAxes.oy:
      return [0, -10, 0];
    case canvasCoordinatesAxes.oz:
      return [0, 0, 10];
    default:
      // ox
      return [10, 0, 0];
  }
};

export const testStatuses = {
  'wip': 'Work in progress',
  'posted': 'Posted',
}