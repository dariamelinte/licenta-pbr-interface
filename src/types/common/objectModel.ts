export type ObjectModelSizeType = 'small' | 'medium' | 'big';

export type ObjectModelInputType = {
  name: string;
  description?: string;
  category: string;
  model: File | null;
  size: ObjectModelSizeType;
};
