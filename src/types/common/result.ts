import type { BoardType } from './playground';

export type StatusResult = 'saved' | 'submitted';

export type ResultType = BoardType & {
  _id?: string;
  test: string;
  submission_time: Date;
  status: StatusResult;
  score?: number;
  credential?: string;
};

export type UserResultType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  status?: StatusResult;
  score?: number;
  result?: string;
};
