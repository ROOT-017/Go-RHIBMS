import { Select, SelectProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { IntRange } from '../../@types';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

export type TimeSelectProp = {
  value?: Dayjs | null;
  format?: 'hh:mm A' | 'HH:mm' | 'hh:mm a';
  onChange?: (time: Dayjs | null) => void;
  minuteStep?: IntRange<1, 59>;
  hourStep?: IntRange<1, 23>;
  maxTime?: Dayjs | null;
  minTime?: Dayjs | null;
  defaultValue?: Dayjs;
  offset?: Dayjs | null;
  size?: number;
  refTime?: Dayjs | null | undefined;
} & Omit<SelectProps, 'onChange' | 'value' | 'suffixIcon' | 'labelRender'| 'label'>;

export const TimeSelect = ({
  format,
  value,
  minuteStep = 30,
  hourStep = 1,
  maxTime,
  minTime,
  defaultValue,
  placeholder,
  offset,
  onChange,
  refTime,
  ...props
}: TimeSelectProp) => {
  const step = minuteStep || 30;
  const stepH = hourStep || 1;
  const paddition = (val: Dayjs) => Math.round(val?.minute() / step) * step;
  const today =
    offset?.startOf('hour').add(paddition(offset), 'minute') ??
    dayjs().startOf('day');
  const valueLen = (24 / stepH) * Math.round(60 / step);

  const options = useMemo(() => {
    const result = [];

    for (let i = 0; i < valueLen; i++) {
      const optionByStep = today.add(i * step, 'minute');

      // Remove options that are after the maxTime
      if (maxTime && optionByStep.isAfter(maxTime)) {
        break;
      }

      const isDisabled = () => {
        let isDisabled = false;
        if (maxTime != null) {
          isDisabled = isDisabled || optionByStep.isAfter(maxTime);
        }
        if (minTime != null) {
          isDisabled = isDisabled || optionByStep.isBefore(minTime);
        }
        return isDisabled;
      };

      const timeDifference = refTime ? optionByStep.diff(refTime, 'minute') : 0;
      const hoursDiff = Math.floor(timeDifference / 60);
      const minutesDiff = timeDifference % 60;
      const formattedDiff = `(${hoursDiff}hrs${minutesDiff > 0 ? ` ${minutesDiff}mins` : ''})`;

      result.push(
        <Select.Option
          key={optionByStep.toString()}
          value={optionByStep.toString()}
          disabled={isDisabled()}
        >
          {!refTime
            ? optionByStep.format(format ?? 'hh:mm A')
            : `${optionByStep.format(format ?? 'hh:mm A')} ${formattedDiff}`}
        </Select.Option>,
      );
    }

    return result;
  }, [format, maxTime, minTime, step, today, valueLen, refTime]);

  return (
    <Select
      defaultValue={
        defaultValue
          ? defaultValue
              ?.startOf('hour')
              .add(paddition(defaultValue), 'minute')
              ?.toString()
          : null
      }
      value={
        value
          ? value?.startOf('hour').add(paddition(value), 'minute').toString()
          : undefined
      }
      onChange={(v) => onChange?.(v ? dayjs(v) : null)}
      popupMatchSelectWidth={false}
      allowClear
      onClear={() => onChange?.(null)}
      placeholder={placeholder ?? 'Select Time'}
      suffixIcon={<ClockCircleOutlined />}
      notFoundContent=""
      labelRender={(label) => dayjs(label.value).format(format ?? 'hh:mm A')}
      {...props}
    >
      {options}
    </Select>
  );
};
