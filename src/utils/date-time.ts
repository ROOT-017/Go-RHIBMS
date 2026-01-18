import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// import { CalendarRange, TemporalUnit } from '../@types';

dayjs.extend(utc);
dayjs.extend(timezone);

export const ZoneId = {
  systemDefault: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export const DateTimeFormat = {
  YearMonDay: 'YYYY-MM-DD',
  YearMon: 'YYYY-MM',
  MonDay: 'MM-DD',
  MonDayYear: 'MM-DD-YYYY',
  YearMonDayTime: 'YYYY-MM-DD HH:mm:ss',
};

export const padZero = (n: number, order = 2) => {
  return n.toString().padStart(order, '0');
};
export function isValidDate(d: unknown) {
  return d instanceof Date && !isNaN(d.getTime());
}
const months = {
  short: {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  },
  long: {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  },
};
export const guessDateFromString = (str: string | Date): Date => {
  const date = new Date(str);
  let year = 0;
  let month = 0;
  if (!isValidDate(date)) {
    const arr = String(str).split(' ');
    if (arr.length == 2) {
      // number strings of lenght 4 e.g. 2024
      let yearArr = arr.filter((a) => a.length == 4 && !isNaN(Number(a)));
      if (yearArr.length > 0) {
        // convert to int
        year = parseInt(yearArr[0]) || 0;
      } else {
        // number strings of lenght 2 (e.g. '19' or '20')
        yearArr = arr.filter((a) => a.length == 2 && !isNaN(Number(a)));
        if (yearArr.length > 0) {
          // add the first two digit of the current year
          year = parseInt(
            ('' + new Date().getFullYear()).substring(0, 2) + yearArr[0],
          );
        }
      }
      // strings of length 3 or less lookup short
      let monthArr = arr.filter((a) => a.length <= 3 && isNaN(Number(a)));
      if (monthArr.length > 0) {
        month =
          Number(
            months.short[
              monthArr[0].toLowerCase?.() as keyof typeof months.short
            ],
          ) || 0;
      } else {
        // strings of length 3 or more lookup long
        monthArr = arr.filter((a) => a.length >= 3 && isNaN(Number(a)));
        month =
          Number(
            months.long[
              monthArr[0].toLowerCase?.() as keyof typeof months.long
            ],
          ) || 0;
      }
    }
    const it = new Date(year, month, 1);
    if (isValidDate(it)) {
      return it;
    } else {
      return new Date(year);
    }
  } else {
    return date;
  }
};
export const toJavaLocalDateString = (
  str: string | Date,
  pickMonth = true,
  format?: string,
) => {
  if (str == null || str == '') return '';
  if (format) {
    return dayjs(str).format(format);
  }
  const date = guessDateFromString(str);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}${!pickMonth ? '-' + String(date.getDate()).padStart(2, '0') : ''}`;
};
export const toMonthYearFormat = (str: string | Date) => {
  if (str == null || str == '') return '';
  const date = guessDateFromString(str);
  return `${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
};

export const toDuration = (date: Date, from: Date = new Date()) => {
  const diff = from.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
export const toDurationFormat = (date: Date, from: Date = new Date()) => {
  const { days, hours, minutes } = toDuration(date, from);
  if (days == 0 && hours == 0 && minutes == 0) {
    return 'now';
  } else if (days == 0 && hours == 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (days == 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (days == 1) {
    return `yesterday`;
  } else if (days < 7) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (days < 30) {
    return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
  } else if (days < 365) {
    return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`;
  } else {
    return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''} ago`;
  }
};

export const calcOffset = (
  date: Dayjs,
  today: Dayjs | null = dayjs().startOf('day'),
): { hours: number; minutes: number; seconds: number } => {
  today = today || dayjs().startOf('day');
  const d = date || today;
  return {
    hours: Math.abs(today.hour() - d.hour()),
    minutes: Math.abs(today.minute() - d.minute()),
    seconds: Math.abs(today.second() - d.second()),
  };
};

export const toFullDateYearMonthDay = (
  val: Date | string,
  zoneId: string = ZoneId.systemDefault,
) => {
  return dayjs
    .tz(val || undefined, zoneId)
    .tz(ZoneId.systemDefault)
    .format('YYYY-MM-DD');
};
// export const dateInRange = (
//   date: Dayjs,
//   range: CalendarRange,
//   unit: OpUnitType,
// ) => {
//   const start = dayjs(`${range.start_date} ${range.start_time ?? ''}`);
//   const end = dayjs(`${range.end_date} ${range.end_time ?? ''}`);
//   return date.isBetween(start, end, unit, '[]');
// };

// export const fullDay30MinSlots = (value: Dayjs) =>
//   [...Array(48)].map((_, i) => {
//     return (value ?? dayjs())
//       ?.startOf('day')
//       .hour(Math.floor(i / 2))
//       .minute((i % 2) * 30);
//   });
// export const isPastSlot = (
//   date: Dayjs,
//   unit?: OpUnitType,
//   endTime?: string,
// ) => {
//   const currentDateTime = dayjs();
//   const slotEndTime = endTime
//     ? dayjs(`${date.format('YYYY-MM-DD')} ${endTime}`)
//     : date;
//   // If the date is today, disable only past time slots
//   if (date.isSame(currentDateTime, unit)) {
//     return dayjs().isBetween(date.subtract(30, 'minutes'), slotEndTime, unit); // Disable if the slot's end time is in the past
//   }
//   // Disable if the date is in the past
//   return date.isBefore(currentDateTime, unit);
// };

export const preferredDateDisplay = (
  val?: string | Date | Dayjs | number,
  zoneId: string = ZoneId.systemDefault,
) => {
  return val
    ? dayjs
        .tz(val || undefined, zoneId)
        .tz(ZoneId.systemDefault)
        .format('MM/DD/YYYY')
    : '';
};

export const printDateDisplay = (
  val?: string | Date | Dayjs | number,
  zoneId: string = ZoneId.systemDefault,
) => {
  return val
    ? dayjs
        .tz(val || undefined, zoneId)
        .tz(ZoneId.systemDefault)
        .format('MMM YYYY')
    : '';
};

export const shortDateDisplay = (
  val?: string | Date | Dayjs | number,
  zoneId: string = ZoneId.systemDefault,
) => {
  return dayjs
    .tz(val || undefined, zoneId)
    .tz(ZoneId.systemDefault)
    .format('DD MMM YYYY');
};

export const isPastDate = (
  val?: string | Date | Dayjs | number,
  zoneId: string = ZoneId.systemDefault,
) => {
  return val
    ? dayjs
        .tz(val || undefined, zoneId)
        .tz(ZoneId.systemDefault)
        .isBefore(dayjs())
    : false;
};
export const preferredDateTimeDisplay = (
  val?: string | Date | Dayjs | number,
  zoneId: string = ZoneId.systemDefault,
) => {
  return val
    ? dayjs
        .tz(val || undefined, zoneId)
        .tz(ZoneId.systemDefault)
        .format('MM/DD/YYYY hh:mm A')
    : '';
};

export const shiftDateDisplay = (
  val?: string | Date | Dayjs | number,
  zoneId: string = ZoneId.systemDefault,
) => {
  return val
    ? dayjs
        .tz(val || undefined, zoneId)
        .tz(ZoneId.systemDefault)
        .format('ddd D MMMM, YYYY')
    : '';
};

export const shiftTimeDisplay = (
  val?: string | Date | Dayjs | number,
  formatter: string = 'hh:mm',
  format: string = 'hh:mm a',
  zoneId: string = ZoneId.systemDefault,
) => {
  return val
    ? dayjs
        .tz(val || undefined, formatter, zoneId)
        .tz(ZoneId.systemDefault)
        .format(format)
    : '';
};

// export function humanDuration(
//   value: number,
//   unit: TemporalUnit = 'hour',
// ): string {
//   const unitsInMs: Record<TemporalUnit, number> = {
//     day: 86400000,
//     hour: 3600000,
//     minute: 60000,
//     second: 1000,
//     millisecond: 1,
//   };

//   let durationMs = value * unitsInMs[unit];

//   const breakdown: Record<TemporalUnit, number> = {
//     day: Math.floor(durationMs / unitsInMs.day),
//     hour: 0,
//     minute: 0,
//     second: 0,
//     millisecond: 0,
//   };
//   durationMs %= unitsInMs.day;

//   breakdown.hour = Math.floor(durationMs / unitsInMs.hour);
//   durationMs %= unitsInMs.hour;

//   breakdown.minute = Math.floor(durationMs / unitsInMs.minute);
//   durationMs %= unitsInMs.minute;

//   breakdown.second = Math.floor(durationMs / unitsInMs.second);
//   durationMs %= unitsInMs.second;

//   breakdown.millisecond = durationMs;

//   return (Object.entries(breakdown) as [TemporalUnit, number][])
//     .filter(([_, val]) => val > 0)
//     .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
//     .join(', ');
// }
