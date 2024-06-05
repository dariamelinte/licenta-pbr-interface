import { BoardType } from "./playground";

export type StatusResult = 'saved' | 'submitted';

export type ResultType = BoardType & {
    test: string;
    submission_time: Date;
    status: StatusResult;
}