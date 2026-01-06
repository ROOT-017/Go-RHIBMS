import { Calendar, DatePickerProps } from 'antd';
import { calendarView as CalendarMode } from '../../constants';
import { FullDay } from './FullDay';
import { FullWeek } from './FullWeek';
import { ReactNode } from 'react';

export const modeData: Record<CalendarMode, DatePickerProps['picker']> = {
  [CalendarMode.Day]: 'date',
  [CalendarMode.Month]: 'month',
  [CalendarMode.Week]: 'week',
};

export const pickerData: Record<CalendarMode, DatePickerProps['picker']> = {
  [CalendarMode.Day]: 'date',
  [CalendarMode.Month]: 'month',
  [CalendarMode.Week]: 'week',
};

export const formatData: Partial<Record<CalendarMode, string>> = {
  [CalendarMode.Month]: 'YYYY-MMM',
  [CalendarMode.Day]: 'YYYY-MM-DD',
};

export const Calendars: Record<
  CalendarMode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { Component: (props?: any) => ReactNode }
> = {
  [CalendarMode.Day]: {
    Component: FullDay,
  },
  [CalendarMode.Month]: {
    Component: Calendar,
  },
  [CalendarMode.Week]: {
    Component: FullWeek,
  },
};
