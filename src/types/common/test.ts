export type StatusTestType = 'wip' | 'posted';

export type TestType = {
  status: StatusTestType;

  name: string;
  description?: string;

  min_score: number;
  max_score: number;

  start_date: any;
  due_date: any;
  group: string;
};
