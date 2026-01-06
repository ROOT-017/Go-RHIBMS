import { LabelHTMLAttributes } from 'react';
import { RequiredMark } from '../Input/RequiredMark';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  required?: boolean;
}

const Label = ({ label: labelText, required, ...res }: LabelProps) => {
  return (
    <label {...res}>
      {labelText} {required ? <RequiredMark /> : null}
    </label>
  );
};

export default Label;
