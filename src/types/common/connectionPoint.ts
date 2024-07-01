import type { CoordinatesObjectType, PointType } from './playground';

export type ConnectionPointType = {
  uuid: string;
  instance: string;
  object_position: CoordinatesObjectType<number>;
  space_position: CoordinatesObjectType<PointType>;
  box_point: number;
};
