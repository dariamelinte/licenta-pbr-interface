import type { BoardType } from './playground';

export type StatusResult = 'saved' | 'submitted';

export type ResultType = BoardType & {
  test: string;
  submission_time: Date;
  status: StatusResult;
  score?: number;
};

export type UserResultType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  score?: number;
  result?: string;
};
