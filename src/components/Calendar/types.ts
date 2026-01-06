import { Dayjs } from 'dayjs';
import { ReactNode } from 'react';

export type MedCalendarProps = {
  value: Dayjs;
  onChange?: (value: Dayjs) => void;
  cellRender?: (value: Dayjs) => ReactNode;
  disabledDate?: (date: Dayjs) => boolean;
  mode?: string;
  headerRender?: (date?: Dayjs) => ReactNode;
  className?: string;
};
