import type { BoardType } from './playground';

export type ResultType = BoardType & {
  _id?: string;
  test: string;
  submission_time: Date;
  score?: number;
  credential?: string;
};

export type UserResultType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  score?: number;
  result?: string;
  status?: string;
};
