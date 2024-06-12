import type { ConnectionPointType } from './connectionPoint';

export type LinkageType = {
  _id?: string;
  first_connection?: ConnectionPointType;
  second_connection?: ConnectionPointType;
};
