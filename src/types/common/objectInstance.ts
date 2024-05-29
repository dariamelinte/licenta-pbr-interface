import { ObjectModelApiType, OidType } from "./api";
import { CoordinatesObjectType, PointType } from "./playground";

export type ObjectInstanceApiType = OidType & {
  _id_object_model: string;
  rotation: number[];
  position: CoordinatesObjectType<PointType>;
};

export type ObjectInstanceType = {
  object_model: string;
  rotation: number[];
};

export type CompleteObjectInstanceType = {
  object_model: ObjectModelApiType;
  rotation: number[];
};
