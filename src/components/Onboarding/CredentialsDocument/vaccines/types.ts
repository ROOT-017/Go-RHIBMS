import { type ReactNode } from 'react';
import { UserVaccination } from '../../../../@types';
import { VaccineSubStep } from './vaccines.hooks';

export type VaccineCollapseProps = {
  children: ReactNode;
  completed?: boolean;
  active?: boolean;
  label: string;
  onChange: ((key: string | string[]) => void) | undefined;
};

export type VaccineFormProps = {
  onChange: (
    // eslint-disable-next-line @typescript-eslint/ban-types
    property: keyof UserVaccination | (string & {}),
    value: string | number | boolean | File | string[],
  ) => void;
  onSubmit: () => void;
  disabled: boolean;
  loading?: boolean;
  onSignUrl?: (key: string) => Promise<string>;
  handleFormIsUpdated?: (key: VaccineSubStep, value: boolean) => void;
  handleFormIsValid?: (key: VaccineSubStep, value: boolean) => void;
  goToPrevious?: (
    key: 'covid-19' | 'hepatitis' | 'influenza' | 'mmr' | 'tdap' | 'varicella',
  ) => void;
} & Partial<UserVaccination>;
