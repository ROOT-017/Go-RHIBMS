import { type ReactNode } from 'react';
import { MedicalTestRecord, User } from '../../../../@types';
import { MedicalTestSubStep } from './testrecords.hooks';

export type MedicalTestCollapseProps = {
  children: ReactNode;
  completed?: boolean;
  active?: boolean;
  label: string;
  onChange: ((key: string | string[]) => void) | undefined;
};

export type MedicalTestFormProps = {
  onChange: (
    // eslint-disable-next-line @typescript-eslint/ban-types
    property: keyof MedicalTestRecord | (string & {}),
    value: string | number | boolean | File | string[],
  ) => void;
  onSubmit: () => void;
  disabled: boolean;
  loading?: boolean;
  handleFormIsUpdated: (key: MedicalTestSubStep, value: boolean) => void;
  handleFormIsValid: (key: MedicalTestSubStep, value: boolean) => void;
  originalData: Partial<MedicalTestRecord>;
  onSignUrl?: (key: string) => Promise<string>;
  user?: User;
  goToPrevious?: (key: MedicalTestSubStep) => void;
} & Partial<MedicalTestRecord>;
