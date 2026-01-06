import { DatePickerProps } from 'antd';
import { FocusEvent } from 'react';

export type LabeledInputProps = {
  onDateChange: (property: string, date: string) => void;
  name: string;
  label: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  error?: string;
  readOnly?: boolean;
  picker?: DatePickerProps['picker'];
  maxDate?: string;
  minDate?: string;
  format?: string;
  onBlur?: (e?: FocusEvent<HTMLElement>) => void;
};
