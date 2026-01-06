import { Dispatch, SetStateAction } from 'react';
import { NumberInput } from '../Input';
import { JobTypeName } from '../../constants';
import { JobPostDirtyState, JobPostErrors } from './postjob.hooks';
import { ErrorLabel } from '../Input/ErrorLabel';
import { OnBlurEventHandler } from '../../utils/domHelpers';
import { Checkbox } from 'antd';

export type ConfirmPositionProp = {
  hourlyRate?: number;
  setHourlyRate: Dispatch<SetStateAction<number | undefined>>;
  oneTimeBonus?: number;
  setOneTimeBonus: Dispatch<SetStateAction<number | undefined>>;
  jobType?: JobTypeName;
  errors?: JobPostErrors;
  onBlur?: OnBlurEventHandler;
  isDirty?: JobPostDirtyState;
  saveAsTemplate?: boolean;
  candSaveAsTemplate?: boolean;
  setSaveAsTemplate?: Dispatch<SetStateAction<boolean>>;
  isEditMode?: boolean;
};
export default function ConfirmPositionForm({
  hourlyRate,
  setHourlyRate,
  oneTimeBonus,
  setOneTimeBonus,
  jobType,
  errors,
  onBlur,
  isDirty,
  setSaveAsTemplate,
  saveAsTemplate,
  candSaveAsTemplate,
  isEditMode,
}: ConfirmPositionProp) {
  return (
    <div className="flex w-full gap-10 p-2 md:p-8 flex-col mt-[-10px] pb-10">
      <h2 className="text-smallSubHeading font-[600] flex text-textColor">
        {`Confirm ${jobType == JobTypeName.PER_DIEM ? 'Position' : '& Post Assignment'}`}{' '}
        <span className="text-errorColor">*</span>
      </h2>
      <div className="flex flex-col gap-4 md:gap-12 mt-[-10px]">
        <div className="flex flex-col gap-2 flex-1 relative">
          <label className=" text-[1.6rem] text-left text-textColor font-[600]">
            Hourly Bill Rate
          </label>
          <NumberInput
            currency="$"
            className="h-[38px] med-input w-full flex items-center"
            name="hourlyRate"
            value={hourlyRate}
            onChange={(e) => {
              if (e !== null) {
                setHourlyRate(e);
              }
            }}
            placeholder="$5.00"
            dp={2}
            status={isDirty?.hourlyRate && errors?.hourlyRate ? 'error' : ''}
            onBlur={onBlur}
          />
          <ErrorLabel
            error={isDirty?.hourlyRate ? errors?.hourlyRate : undefined}
            className="absolute"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label className="text-left text-[1.6rem] text-textColor font-[600]">
            One time bonus
          </label>
          <NumberInput
            currency="$"
            className="h-[38px] med-input w-full flex items-center"
            name="oneTimeBonus"
            value={oneTimeBonus}
            onChange={(e) => {
              if (e !== null) {
                setOneTimeBonus(e);
              }
            }}
            placeholder="$5.00"
            dp={2}
          />
        </div>
        {setSaveAsTemplate != null && !isEditMode ? (
          <div className="flex flex-col gap-2 flex-1">
            <Checkbox
              className="text-blueColor text-smallBody"
              checked={saveAsTemplate}
              disabled={!candSaveAsTemplate}
              onChange={(e) => setSaveAsTemplate?.(e.target.checked)}
            >
              Post this more often ? Save as template.
            </Checkbox>
          </div>
        ) : null}
        <p className="text-blueColor text-smallBody">
          No charges applied if Healthcare professional does not complete their
          shift
        </p>
      </div>
    </div>
  );
}
