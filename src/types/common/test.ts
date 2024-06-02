import { OidType } from "./api";
import { ConnectionPointType } from "./connectionPoint";
import { CompleteGroupType } from "./group";
import { LinkageType } from "./linkage";
import { CompleteObjectInstanceType, ObjectInstanceType } from "./objectInstance";

export type StatusTestType = 'wip' | 'posted';

export type TestInfoType = {
    status: StatusTestType;

    name: string;
    description?: string;

    min_score: number;
    max_score: number;

    start_date: number;
    due_date: number;
}

export type TestType = OidType & TestInfoType & {
    group: OidType & { name: string; };
};

export type TestFormType = TestInfoType & {
    group: string;
}

export type CompleteTestType = TestInfoType & {
    group: CompleteGroupType[];
}