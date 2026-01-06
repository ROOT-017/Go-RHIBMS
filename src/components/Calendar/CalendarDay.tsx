import { Dayjs } from 'dayjs';
import './calendar.scss';
import { TdHTMLAttributes } from 'react';
import { MedCalendarProps } from './types';

type CalendarDayProps = MedCalendarProps & {
  onClick?: (value: Dayjs) => void;
  isActive?: boolean;
} & Omit<TdHTMLAttributes<HTMLTableCellElement>, 'onClick' | 'className'>;
export const CalendarDay = {
  Title: ({
    value,
    isActive,
    onClick,
    className,
    ...props
  }: CalendarDayProps) => (
    <th
      {...props}
      className={`med-day-cell-header ${isActive ? 'active' : ''} ${className ?? ''}`}
      tabIndex={0}
      onClick={() => onClick?.(value)}
    >
      <div className="med-day-number">{value.date()}</div>
      <div className="med-day-name">{value.format('dddd')}</div>
    </th>
  ),
  Cell: ({
    value,
    onClick,
    cellRender,
    disabledDate,
    className,
    isActive,
    ...props
  }: CalendarDayProps) => {
    const disabled = disabledDate?.(value);
    const disabled30 = disabledDate?.(value.add(30, 'minute'));
    return (
      <td
        {...props}
        className={`med-day-cell ${isActive ? 'active' : ''} ${className ?? ''}`}
      >
        <div
          className={`${disabled ? 'med-cell-disabled' : ''} med-day-cell-content`}
          tabIndex={0}
          onClick={() => onClick && onClick(value)}
          title={value.format('dddd hh:mmA')}
        >
          {cellRender && cellRender(value)}
        </div>
        <div
          className={`${disabled30 ? 'med-cell-disabled' : ''} med-day-cell-content`}
          tabIndex={0}
          onClick={() => onClick && onClick(value.add(30, 'minute'))}
          title={value.add(30, 'minute').format('dddd hh:mmA')}
        >
          {cellRender && cellRender(value.add(30, 'minute'))}
        </div>
      </td>
    );
  },
  CellCaption: ({
    value,
    onClick,
    disabledDate,
    className,
    ...props
  }: CalendarDayProps) => {
    const disabled = disabledDate?.(value);
    return (
      <th
        {...props}
        className={`${className} med-day-cell-header sticky-by-left relative z-10`}
      >
        <div
          className={`${disabled ? 'med-caption-disabled' : ''} med-day-cell-caption`}
          tabIndex={0}
          onClick={() => onClick && onClick(value)}
          title={value.format('dddd hh:mmA')}
        >
          <div className="med-day-cell-caption-value">
            {value.format('hh:mmA')}
          </div>
          <div className="med-day-cell-caption-content" />
        </div>
      </th>
    );
  },
};
