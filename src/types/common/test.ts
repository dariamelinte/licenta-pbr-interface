export type StatusTestType = 'wip' | 'posted';

export type TestType = {
  status: StatusTestType;

  name: string;
  description?: string;

  min_score: number;
  max_score: number;

  start_date: string;
  due_date: string;
  group: string;
};

