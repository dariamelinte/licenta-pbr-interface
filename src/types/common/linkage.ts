import { ConnectionPointType } from "./connectionPoint";

export type LinkageType = {
    first_connection?: ConnectionPointType;
    second_connection?: ConnectionPointType;

    distance: number[];
    angle: number[];
};