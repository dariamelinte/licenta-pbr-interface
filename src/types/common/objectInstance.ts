import { ObjectModelApiType, OidType } from "./api";

export type ObjectInstanceApiType = OidType & {
    _id_object_model: string;
    rotation: number[];
};

export type ObjectInstanceType = {
    object_model: string;
    rotation: number[];
};

export type CompleteObjectInstanceType = {
    object_model: ObjectModelApiType;
    rotation: number[];
};