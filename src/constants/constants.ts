import type { CoordinatesObjectType } from '@/types/common/playground';

export const modelEntensions = ['.fbx'];

export const coordinatesAxes: CoordinatesObjectType<string> = {
  ox: 'Side',
  oz: 'Top',
  oy: 'Front',
};

export const canvasCoordinatesAxes: CoordinatesObjectType<string> = {
  ox: 'side',
  oy: 'front',
  oz: 'top',
};

export const getCameraPerspective = (axe: keyof CoordinatesObjectType<any>) => {
  switch (canvasCoordinatesAxes[axe]) {
    case canvasCoordinatesAxes.oy:
      return [0, 10, 0];
    case canvasCoordinatesAxes.oz:
      return [0, 0, 10];
    default:
      // ox
      return [10, 0, 0];
  }
};

export const testStatuses = {
  wip: 'Work in progress',
  posted: 'Posted',
};

export const objectModelSizes = {
  small: 200,
  medium: 280,
  big: 320,
};

export const box_points: CoordinatesObjectType<number>[] = [
  { ox: 1, oy: 3, oz: 11 },
  { ox: 2, oy: 18, oz: 18 },
  { ox: 3, oy: 11, oz: 3 },
  { ox: 8, oy: 4, oz: 10 },
  { ox: 4, oy: 12, oz: 2 },
  { ox: 7, oy: 5, oz: 9 },
  { ox: 6, oy: 19, oz: 17 },
  { ox: 5, oy: 13, oz: 1 },
];

export const pointPercentages: {
  [key: number]: CoordinatesObjectType<number>;
} = {
  1: { oy: 0, ox: 0, oz: 0 },
  2: { oy: 50, ox: 0, oz: 0 },
  3: { oy: 100, ox: 0, oz: 0 },
  4: { oy: 100, ox: 0, oz: 50 },
  5: { oy: 100, ox: 0, oz: 100 },
  6: { oy: 50, ox: 0, oz: 100 },
  7: { oy: 0, ox: 0, oz: 100 },
  8: { oy: 0, ox: 0, oz: 50 },
  9: { oy: 0, ox: 100, oz: 0 },
  10: { oy: 0, ox: 100, oz: 0 },
  11: { oy: 100, ox: 100, oz: 0 },
  12: { oy: 100, ox: 100, oz: 50 },
  13: { oy: 100, ox: 100, oz: 100 },

  17: { oy: 0, ox: 50, oz: 0 },
  18: { oy: 100, ox: 50, oz: 0 },
  19: { oy: 100, ox: 50, oz: 100 },
};

export const axesPoints: CoordinatesObjectType<number[]> = {
  ox: [1, 2, 3, 4, 5, 6, 7, 8],
  oy: [3, 4, 5, 11, 12, 13, 18, 19],
  oz: [1, 2, 3, 9, 10, 11, 17, 18],
};
