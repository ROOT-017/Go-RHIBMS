// import {}

import { TextAreaProps } from 'antd/es/input';

export type LabeledRadioModeculeProps = {
  value?: string;
  options?: {
    [key: string]: string;
  };
  name: string;
  label: string;
  required?: boolean;
  textAreaProps?: TextAreaProps;
  placeholder?: string;
  onChange: (value: string) => void;
  textAreaStyle?: React.CSSProperties | undefined;
  textAreaName: string;
  specify?: boolean;
  listNumber?: number;
  extraText?: string;
};
