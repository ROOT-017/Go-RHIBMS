import { MedCalendarProps } from './types';
import { Calendars, modeData } from './CalendarWrapper';
import { calendarView as CalendarMode } from '../../constants';

export const CalendarSelector = ({
  mode,
  value,
  onChange,
  cellRender,
  className,
  disabledDate,
  headerRender,
}: MedCalendarProps) => {
  const { Component } = Calendars[mode as CalendarMode] ?? Calendars.Month;
  return (
    <Component
      value={value}
      onChange={onChange}
      cellRender={cellRender}
      className={className}
      disabledDate={disabledDate}
      mode={modeData[mode as CalendarMode] == 'year' ? 'year' : 'month'}
      headerRender={headerRender}
    />
  );
};
