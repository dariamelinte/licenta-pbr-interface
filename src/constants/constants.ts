import { CoordinatesObjectType } from "@/types/common/playground";

export const modelEntensions = [".glb", ".gltf", ".fbx", ".obj", ".stl"];

export const coordinatesAxes: CoordinatesObjectType<string> = {
  ox: "Side",
  oz: "Top",
  oy: "Front",
};

export const canvasCoordinatesAxes: CoordinatesObjectType<string> = {
  ox: "side",
  oy: "front",
  oz: "top",
};

export const getCameraPerspective = (axe: keyof CoordinatesObjectType<any>) => {
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
  wip: "Work in progress",
  posted: "Posted",
};

export const objectModelSizes = {
  small: 60,
  medium: 180,
  big: 320,
};

export const boxPoints: CoordinatesObjectType<number>[] = [
  { ox: 1, oy: 3, oz: 11 },
  { ox: 2, oy: 18, oz: 18 },
  { ox: 3, oy: 11, oz: 3 },
  { ox: 8, oy: 4, oz: 10 },
  { ox: 4, oy: 12, oz: 2 },
  { ox: 7, oy: 5, oz: 9 },
  { ox: 6, oy: 19, oz: 17 },
  { ox: 5, oy: 13, oz: 1 },
];

export const pointPercentages: {[key: number]: CoordinatesObjectType<number>} = {
  1: {ox: 0, oy: 0, oz: 0},
  2: {ox: 50, oy: 0, oz: 0},
  3: {ox: 100, oy: 0, oz: 0},
  4: {ox: 100, oy: 0, oz: 50},
  5: {ox: 100, oy: 0, oz: 100},
  6: {ox: 50, oy: 0, oz: 100},
  7: {ox: 0, oy: 0, oz: 100},
  8: {ox: 0, oy: 0, oz: 50},
  9: {ox: 0, oy: 100, oz: 0},
  10: {ox: 0, oy: 100, oz: 0},
  11: {ox: 100, oy: 100, oz: 0},
  12: {ox: 100, oy: 100, oz: 50},
  13: {ox: 100, oy: 100, oz: 100},

  17: {ox: 0, oy: 50, oz: 0},
  18: {ox: 100, oy: 50, oz: 0},
  19: {ox: 100, oy: 50, oz: 100},

}