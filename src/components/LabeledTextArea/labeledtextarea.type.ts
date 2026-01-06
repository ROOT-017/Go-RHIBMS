import { TextAreaProps } from '../textarea/textarea.type';

export type LabeledTextAreaProps = {
  textAreaProps: TextAreaProps;
  label: string;
  required?: boolean;
};
