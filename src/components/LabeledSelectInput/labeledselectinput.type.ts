import { SelectProps } from 'antd';
import { SelectInputAtomProps } from '../SelectInput/Selectinput.atom';

export type LabeledSelectInputProps = {
  selectProps?: SelectInputAtomProps;
  label: string;
  required?: boolean;
  name: string;
  error?: string;
  ant?: boolean;
  tailwindClasses?: string;
} & SelectProps;
