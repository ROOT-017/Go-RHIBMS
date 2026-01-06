import dayjs from 'dayjs';
import { CalendarDay } from './CalendarDay';
import './calendar.scss';
import { MedCalendarProps } from './types';

export const FullWeek = ({
  value: v,
  onChange: onChange,
  disabledDate,
  cellRender,
}: MedCalendarProps) => {
  const value = v ?? dayjs();
  const startOfWeek = value.startOf('week');
  return (
    <div className="w-full overflow-x-hidden sticky-at-top mb-8">
      <div className="w-full overflow-x-auto sticky-at-top med-calendar-table-wrapper">
        <table className="med-week-table overflow-auto m-auto">
          <thead className="sticky-at-top z-50">
            <tr className="med-week-row-header">
              <th className="med-day-cell-header sticky-by-left sticky-at-top" />
              {[...Array(7)].map((_, i) => {
                const day = startOfWeek.add(i, 'day');
                return (
                  <CalendarDay.Title
                    value={day}
                    key={day.toString()}
                    isActive={day.startOf('day').isSame(value.startOf('day'))}
                    onClick={onChange}
                  />
                );
              })}
            </tr>
          </thead>
          <tbody>
            {[...Array(24)].map((_, i) => {
              return (
                <tr className="med-week-row-body" key={i}>
                  <CalendarDay.CellCaption value={startOfWeek.hour(i)} />
                  {[...Array(7)].map((_, j) => {
                    const day = startOfWeek.add(j, 'day');
                    const hour = day.hour(i);
                    return (
                      <CalendarDay.Cell
                        disabledDate={disabledDate}
                        value={hour}
                        key={hour.toString()}
                        isActive={
                          day.startOf('day').isSame(value.startOf('day')) &&
                          hour.hour() == value.hour()
                        }
                        cellRender={cellRender}
                        onClick={onChange}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
