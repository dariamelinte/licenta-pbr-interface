import type { ObjectModelApiType } from './api';
import type { CoordinatesObjectType, PointType } from './playground';

export type ObjectInstanceType = {
  uuid: string;
  object_model: string;
  position: CoordinatesObjectType<PointType>;
};

export type CompleteObjectInstanceType = {
  object_model: ObjectModelApiType;
};
