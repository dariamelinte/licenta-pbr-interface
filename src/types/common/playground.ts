import type { LinkageType } from './linkage';
import type { ObjectInstanceType } from './objectInstance';

export type CoordinatesObjectType<T> = {
  ox: T;
  oy: T;
  oz: T;
};

export type PointType = { x: number; y: number };

export type BoardType = {
  instances: { [key: string]: ObjectInstanceType };
  scale: number;
  linkages: LinkageType[];
};
