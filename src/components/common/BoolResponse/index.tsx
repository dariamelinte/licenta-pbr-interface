import { CheckCircle, XCircle } from '@/components/icons';

type BoolResponseProps = {
  response?: boolean;
};

export const BoolResponse: React.FC<BoolResponseProps> = ({ response }) => {
  if (response) {
    return <CheckCircle color="blue" />;
  }

  return <XCircle color="red" />;
};
