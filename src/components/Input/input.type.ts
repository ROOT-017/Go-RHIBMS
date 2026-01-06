import { InputHTMLAttributes, ReactNode } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  rightAddOn?: ReactNode;
};
