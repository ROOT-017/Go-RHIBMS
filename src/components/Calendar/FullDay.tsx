import dayjs, { Dayjs } from 'dayjs';
import { CalendarDay } from './CalendarDay';
import './calendar.scss';

type FullDayProps = {
  value: Dayjs;
  onChange?: (value: Dayjs) => void;
  cellRender?: (value: Dayjs) => JSX.Element;
  disabledDate?: (date: Dayjs) => boolean;
  mode?: string;
  headerRender?: (date?: Dayjs) => JSX.Element;
  className?: string;
};
export const FullDay = ({
  value: v,
  onChange: onChange,
  cellRender,
  disabledDate,
}: FullDayProps) => {
  const value = v ?? dayjs();
  return (
    <div className="w-full overflow-x-hidden sticky-at-top mb-8">
      <div className="w-full overflow-x-auto sticky-at-top med-calendar-table-wrapper">
        <table className="med-week-table overflow-auto m-auto w-full">
          <thead className="sticky-at-top w-full z-50">
            <tr className="med-week-row-header">
              <CalendarDay.Title
                value={value}
                key={value?.toString()}
                isActive
                colSpan={2}
                className="full-col"
              />
            </tr>
          </thead>
          <tbody>
            {[...Array(24)].map((_, i) => {
              const hour = (value ?? dayjs())?.startOf('day').hour(i);
              return (
                <tr className="med-week-row-body" key={i}>
                  <CalendarDay.CellCaption
                    disabledDate={disabledDate}
                    value={hour}
                  />
                  <CalendarDay.Cell
                    disabledDate={disabledDate}
                    value={hour}
                    key={hour.toString()}
                    cellRender={cellRender}
                    onClick={onChange}
                    className="full-col"
                    isActive={hour.isSame(value.hour())}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
