import { LinkageType } from "./linkage";
import { ObjectInstanceType } from "./objectInstance";

export type StatusTestType = 'wip' | 'posted';

export type TestInfoType = {
    status: StatusTestType;

    name: string;
    description?: string;

    min_score: number;
    max_score: number;

    start_date: string;
    due_date: string;
    group: string;
}

export type TestBoardType = {
    instances: { [key: string]: ObjectInstanceType };
    scale: number;
    linkages: LinkageType[];
}

export type TestType = TestInfoType & TestBoardType;