import { JobTypeName } from "../../constants";
import { AvailabilityScheduleProp } from "./AvailabilitySchedule.form";
import { ErrorLabel } from "../Input/ErrorLabel";
import { useState } from "react";
import { Select } from "antd";

export const ScheduleComponent = ({
    schedule,
    setSchedule,
    jobType,
    shiftsPerWeek,
    onBlur,
    errors,
    isDirty,
}: Pick<
    AvailabilityScheduleProp,
    | 'schedule' 
    | 'setSchedule' 
    | 'jobType' 
    | 'shiftsPerWeek' 
    | 'numberOfShift' 
    | 'onBlur'
    | 'errors'
    | 'isDirty'
    >) => {
    
    const [options] = useState([
        { value: 'weekdays', label: 'Weekdays'},
        { value: 'weekends', label: 'Weekends'},
        { value: 'flexible', label: 'Flexible'},
    ]);
    const handleSelectSchedule = (val: string) => {
        setSchedule?.(val ? [val] : undefined);
    }

    return (
        <div className="flex flex-col gap-2 flex-1 relative">
            <label className="require-field text-[1.6rem] text-textColor font-[600]">
                Schedule
            </label>
            <Select
                className="h-[38px]"
                value={schedule?.[0]}
                onChange={handleSelectSchedule}
                placeholder="Select Schedule"
                disabled={jobType == JobTypeName.ASSIGNMENT && !shiftsPerWeek}
                options={options}
                status={isDirty?.schedule && errors?.schedule ? 'error' : ''}
                onBlur={() => onBlur?.({
                    target: {
                        name: 'schedule',
                        value: schedule?.join(','),
                        validity: {
                        valid: schedule != null,
                        valueMissing: schedule == null
                        }
                    }
                })}
                allowClear
            />
            <ErrorLabel error={isDirty?.schedule ? errors?.schedule : undefined} className="absolute" />
        </div>       
    );
}
