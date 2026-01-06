import { CSSProperties } from 'react';

export type TextAreaProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  name: string;
  styles?: CSSProperties;
};
