import { CheckSquareFilled } from '@ant-design/icons';

type MedicalTestLabelProps = {
  label: string;
  completed?: boolean;
};

export const MedicalTestLabel = ({
  completed,
  label,
}: MedicalTestLabelProps) => (
  <span>
    {completed ? <CheckSquareFilled /> : null}
    <span className="ml-4">{label}</span>
  </span>
);
