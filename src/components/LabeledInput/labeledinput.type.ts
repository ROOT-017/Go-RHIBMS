import { InputProps } from '../Input/input.type';

export type LabeledInputProps = {
  inputProps: InputProps;
  label: string;
  required?: boolean;
  error?: string;
  readOnly?: boolean;
  min?: number;
  version?: 'default' | 'custom';
};
