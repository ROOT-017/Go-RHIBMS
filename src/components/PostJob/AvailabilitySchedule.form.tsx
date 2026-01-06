import { Radio, CheckboxProps, Input, RadioChangeEvent } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { TimeSelect } from '../Time/TimeSelect';
import { toJavaLocalDateString } from '../../utils/date-time';
import LabeledDateInputMolecule from '../LabeledDateInput/LabeledDateInput.molecule';
import { JobTypeName } from '../../constants';
import { JobPostDirtyState, JobPostErrors } from './postjob.hooks';
import { ErrorLabel } from '../Input/ErrorLabel';
import { OnBlurEventHandler } from '../../utils/domHelpers';
import { ScheduleComponent } from './Schedule';

const format = 'hh:mm A';
export type AvailabilityScheduleProp = {
  startTime?: Dayjs | null;
  setStartTime: Dispatch<SetStateAction<Dayjs | null>>;
  endTime?: Dayjs | null;
  setEndTime: Dispatch<SetStateAction<Dayjs | null>>;
  startDate: string | null;
  endDate: string | null;
  maxEndDate?: string | null;
  setmaxEndDate?: Dispatch<SetStateAction<string>>;
  minEndTime: Dayjs | null;
  setMinEndTime: Dispatch<SetStateAction<Dayjs | null>>;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  numberOfShift?: number;
  shiftsPerWeek?: number;
  schedule?: string[];
  daysBetween?: number;
  setNumberOfShift: Dispatch<SetStateAction<number | undefined>>;
  setShiftsPerWeek?: Dispatch<SetStateAction<number | undefined>>;
  setSchedule?: Dispatch<SetStateAction<string[] | undefined>>;
  setDaysBetween?: Dispatch<SetStateAction<number | undefined>>;
  repeatShift: boolean;
  setRepeatShift: Dispatch<SetStateAction<boolean>>;
  minWorkDurationHours?: number;
  minDiffDays?: number;
  jobType?: JobTypeName;
  errors?: JobPostErrors;
  onBlur?: OnBlurEventHandler;
  isDirty?: JobPostDirtyState;
};
export default function AvailabilityScheduleForm({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  startDate,
  setStartDate,
  setEndDate,
  numberOfShift,
  setNumberOfShift,
  repeatShift,
  endDate,
  daysBetween,
  maxEndDate,
  minEndTime,
  setMinEndTime,
  setDaysBetween,
  setmaxEndDate,
  setRepeatShift,
  minWorkDurationHours = 4,
  minDiffDays = 14,
  jobType,
  shiftsPerWeek,
  schedule,
  setShiftsPerWeek,
  setSchedule,
  errors,
  onBlur,
  isDirty,
}: AvailabilityScheduleProp) {
  const [timeSummary, setTimeSummary] = useState<string>('');

  useEffect(() => {
    if (endTime && startTime) {
      const durationHours = endTime?.diff(startTime, 'hour') ?? 0;
      const durationMinutes = (endTime?.diff(startTime, 'minute') ?? 0) % 60;
      setTimeSummary(
        `${durationHours}hrs ${durationMinutes > 0 ? `${durationMinutes}mins` : ''}`,
      );
      if (endTime.isSame(startTime)) {
        setMinEndTime(() => startTime.add(minWorkDurationHours, 'hour'));
      }
    } else {
      setTimeSummary('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, minWorkDurationHours]);

  const daysDiff = (date: string | null, other: string | null) =>
    date && other ? dayjs(date).diff(dayjs(other), 'day') : 0;

  useEffect(() => {
    setDaysBetween?.(daysDiff(endDate, startDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, daysBetween]);

  // setting minimum valaue of end time
  useEffect(() => {
    if (
      maxEndDate != null &&
      startDate != null &&
      minDiffDays != null &&
      setmaxEndDate
    ) {
      const maximumDate = dayjs(dayjs(startDate).add(minDiffDays, 'day'))
        .toDate()
        .toDateString();
      setmaxEndDate(maximumDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, maxEndDate, minDiffDays]);

  // setting minimum valaue of end time
  useEffect(() => {
    if (startTime && minWorkDurationHours != null) {
      const minimumEndTime = dayjs(startTime).add(minWorkDurationHours, 'hour');
      setMinEndTime(minimumEndTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, minWorkDurationHours]);

  const onRepeatCheckboxChange: CheckboxProps['onChange'] = (
    e: RadioChangeEvent,
  ) => {
    setRepeatShift(e.target.value === 'Yes');
  };

  const handleStartDateChange = (_arg0: string, v: string): void => {
    const newDate = v;
    console.log('startDate', { newDate});
    if (daysDiff(endDate, newDate) < 0) {
      if (jobType == JobTypeName.ASSIGNMENT) {
        setEndDate(dayjs(newDate).add(14, 'day').toDate().toDateString());
      } else {
        setEndDate(newDate);
      }
    } else if (
      daysDiff(endDate, newDate) > 14 ||
      daysDiff(endDate, newDate) == 14
    ) {
      setEndDate(dayjs(newDate).add(14, 'day').toDate().toDateString());
    } else if (jobType == JobTypeName.ASSIGNMENT) {
      setEndDate(
        dayjs(newDate || undefined)
          .add(14, 'day')
          .toDate()
          .toDateString(),
      );
    }
    setStartDate(newDate);
  };

  const handleEndDateChange = (_arg0: string, v: string): void => {
    const newDate = v;
    setEndDate(newDate);
  };

  const handleStartTimeChange = (time: Dayjs | null): void => {
    setStartTime(time);
    if (time) {
      setEndTime(dayjs(time).add(minWorkDurationHours, 'hour'));
    }
  };

  const handleEndTimeChange = (time: Dayjs | null): void => {
    setEndTime(time);
  };

  useEffect(() => {
    console.log();
  });

  return (
    <div className="flex w-full gap-10 p-2 md:p-8 flex-col mt-[-10px] pb-10">
      <h2 className="text-smallSubHeading font-[600] flex text-textColor">
        Availability Schedule <span className="text-errorColor"> *</span>
      </h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-[-10px]">
        <div className="flex flex-col gap-2 flex-1 relative">
          <label className="require-field text-[1.6rem] text-textColor font-[600]">
            Start Time
          </label>
          <TimeSelect
            className="h-[40px]"
            value={startTime}
            format={format}
            minuteStep={30}
            onChange={handleStartTimeChange}
            status={
              isDirty?.startTime && errors?.startTime != null ? 'error' : ''
            }
            onBlur={() =>
              onBlur?.({
                target: {
                  name: 'startTime',
                  value: startTime?.toString(),
                  validity: {
                    valid: startTime != null,
                    valueMissing: startTime == null,
                  },
                },
              })
            }
          />
          <ErrorLabel
            error={isDirty?.startTime ? errors?.startTime : undefined}
            className="absolute"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 relative">
          <label className="require-field text-[1.6rem] text-textColor font-[600]">
            End Time
          </label>
          <TimeSelect
            // offset={jobType == JobTypeName.PER_DIEM ? minEndTime : undefined}
            offset={minEndTime} //Since both perdiem and assignment need a minimum value of 4 hours gap
            className="h-[40px]"
            value={endTime}
            format={format}
            minuteStep={30}
            maxTime={startTime?.add(24, 'hour')}
            onChange={handleEndTimeChange}
            // refTime={jobType == JobTypeName.PER_DIEM ? startTime : undefined}
            refTime={startTime} // since both perdiem and assignment needd to show the time difference in hrs and mins for each start and end time interval
            status={isDirty?.endTime && errors?.endTime ? 'error' : ''}
            onBlur={() =>
              onBlur?.({
                target: {
                  name: 'endTime',
                  value: endTime?.toString(),
                  validity: {
                    valid: endTime != null,
                    valueMissing: endTime == null,
                  },
                },
              })
            }
          />
          <ErrorLabel
            error={isDirty?.endTime ? errors?.endTime : undefined}
            className="absolute"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-[-10px]">
        <div className="flex flex-col gap-2 flex-1">
          <LabeledDateInputMolecule
            label="Start Date"
            value={startDate?.toString() ?? ''}
            onDateChange={(_, e) => handleStartDateChange('startDate', e)}
            name="startDate"
            picker="date"
            minDate={toJavaLocalDateString(new Date(), false)}
            error={isDirty?.startDate ? errors?.startDate : undefined}
            onBlur={(e) => {
              if ((e?.target as HTMLInputElement).name === 'startDate') {
                const value = (e?.target as HTMLInputElement).value;
                onBlur?.({
                  target: {
                    name: 'startDate',
                    value: value?.toString(),
                    validity: {
                      valid: value != null,
                      valueMissing: value == null,
                    },
                  },
                });
              }
            }}
          />
        </div>
        {repeatShift || jobType == JobTypeName.ASSIGNMENT ? (
          <div className="flex flex-col gap-2 flex-1">
            <LabeledDateInputMolecule
              label="Select End Date"
              value={endDate?.toString() ?? ''}
              onDateChange={(_, e) => handleEndDateChange('endDate', e)}
              name="endDate"
              picker="date"
              disabled={!startDate}
              minDate={
                jobType == JobTypeName.PER_DIEM
                  ? startDate?.toString() || undefined
                  : dayjs(maxEndDate).format('YYYY-MM-DD')
              }
              maxDate={
                jobType == JobTypeName.PER_DIEM
                  ? dayjs(maxEndDate).format('YYYY-MM-DD')
                  : undefined
              }
              error={isDirty?.endDate ? errors?.endDate : undefined}
              onBlur={(e) => {
                if ((e?.target as HTMLInputElement).name === 'endDate') {
                  const value = (e?.target as HTMLInputElement).value;
                  onBlur?.({
                    target: {
                      name: 'endDate',
                      value: value?.toString(),
                      validity: {
                        valid: value != null,
                        valueMissing: value == null,
                      },
                    },
                  });
                }
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 flex-1 relative">
            <label className="require-field text-[1.6rem] text-textColor font-[600]">
              Number of Shifts
            </label>
            <Input
              className="h-[40px]"
              name="numberOfShift"
              value={numberOfShift}
              type="number"
              min={1}
              max={10}
              onChange={(e) => setNumberOfShift(parseInt(e.target.value))}
              placeholder="1"
              status={
                isDirty?.numberOfShift && errors?.numberOfShift ? 'error' : ''
              }
              onBlur={onBlur}
            />
            <ErrorLabel
              error={isDirty?.numberOfShift ? errors?.numberOfShift : undefined}
              className="absolute"
            />
          </div>
        )}
      </div>
      {jobType == JobTypeName.PER_DIEM ? (
        <>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-[-10px]">
            <div className="flex flex-col gap-2 flex-1 mt-12px text-left">
              <h2 className="font-[600]">Time summary: {timeSummary}</h2>
            </div>
            <div className="flex gap-4 flex-1">
              <p>Repeat this shift?</p>
              <Radio.Group
                onChange={onRepeatCheckboxChange}
                value={repeatShift ? 'Yes' : 'No'}
              >
                <Radio value={'Yes'}>Yes</Radio>
                <Radio value={'No'}>No</Radio>
              </Radio.Group>
            </div>
          </div>
          {repeatShift ? (
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-[-10px]">
              <ScheduleComponent
                schedule={schedule}
                setSchedule={setSchedule}
                jobType={jobType}
                shiftsPerWeek={shiftsPerWeek}
                numberOfShift={numberOfShift}
                onBlur={onBlur}
                errors={errors}
                isDirty={isDirty}
              />
            </div>
          ) : null}
        </>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-[-10px]">
            <div className="flex flex-col gap-2 flex-1 relative">
              <label className="require-field text-[1.6rem] text-textColor font-[600]">
                Shifts Per Week
              </label>
              <Input
                className="h-[38px]"
                name="shiftsPerWeek"
                value={shiftsPerWeek}
                type="number"
                min={1}
                max={jobType == JobTypeName.ASSIGNMENT ? 7 : undefined}
                onChange={(e) => {
                  setShiftsPerWeek?.(parseInt(e.target.value));
                }}
                placeholder="1"
                status={
                  isDirty?.shiftsPerWeek && errors?.shiftsPerWeek ? 'error' : ''
                }
                onBlur={onBlur}
              />
              <ErrorLabel
                error={
                  isDirty?.shiftsPerWeek ? errors?.shiftsPerWeek : undefined
                }
                className="absolute"
              />
            </div>
            <ScheduleComponent
              schedule={schedule}
              setSchedule={setSchedule}
              jobType={jobType}
              shiftsPerWeek={shiftsPerWeek}
              numberOfShift={numberOfShift}
              onBlur={onBlur}
              errors={errors}
              isDirty={isDirty}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 mt-12px text-left mt-8">
            <h2 className="font-[600]">
              Time summary: {timeSummary} per shift
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
