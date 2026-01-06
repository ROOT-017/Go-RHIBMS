import { ReactNode } from 'react';

export type LabeledCheckInputProps = {
  //   inputProps: InputProps;
  label: string | ReactNode;
  required?: boolean;
  error?: string;
  readOnly?: boolean;
  onChange?: (value: boolean) => void;
  onClick?: () => void;
  name?: string;
  value?: boolean;
  disabled?: boolean;
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
  classNames?: {
    label: string;
  };
};
