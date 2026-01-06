import { Select } from 'antd';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { JobPosition, JobSpecialty } from '../../@types';
import { MultiSelect } from '../Input/MultiSelect';
import { JobPostDirtyState, JobPostErrors } from './postjob.hooks';
import { ErrorLabel } from '../Input/ErrorLabel';
import { OnBlurEventHandler } from '../../utils/domHelpers';
// const MAX_COUNT = 3;
export type PositionTitleProp = {
  medicalPosition?: JobPosition;
  setMedicalPosition: Dispatch<SetStateAction<JobPosition | undefined>>;
  specialistsPositions: string[];
  setSpecialistPositions: Dispatch<SetStateAction<string[]>>;
  positionSuggestions?: JobPosition[];
  specialtySuggestions?: JobSpecialty[];
  onSearch?: (search: string) => void;
  errors?: JobPostErrors;
  onBlur?: OnBlurEventHandler;
  isDirty?: JobPostDirtyState;
};
export default function PositionTitleForm({
  medicalPosition,
  setMedicalPosition,
  specialistsPositions,
  setSpecialistPositions,
  positionSuggestions,
  onSearch,
  errors,
  onBlur,
  isDirty,
}: PositionTitleProp) {
  const selectedPosition = useMemo(() => {
    return positionSuggestions?.find(
      (p) =>
        String(p.title).toLowerCase() ===
        String(medicalPosition?.title).toLowerCase(),
    );
  }, [medicalPosition, positionSuggestions]);

  const positionOptions = useMemo(() => {
    return positionSuggestions?.map((p) => ({
      value: p.id,
      label: p.title,
      ...p,
    })) ?? []
  }, [positionSuggestions]);

  useEffect(() => {
    if (selectedPosition && specialistsPositions?.length > 0) {
      setSpecialistPositions((prev) => {
        return prev?.filter(
          (pr) =>
            selectedPosition?.specialties?.findIndex(
              (s) => String(s.name).toLowerCase() === String(pr).toLowerCase(),
            ) > -1,
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPosition]);
  return (
    <div className="flex w-full gap-10 p-2 md:p-8 flex-col mt-[-10px] pb-10">
      <h2 className="text-smallSubHeading font-[600] flex text-textColor">
        Position Title <span className="text-errorColor">*</span>
      </h2>
      <div className="flex flex-col gap-4 md:gap-8 mt-[-10px]">
        <div className="flex flex-col gap-2 flex-1 relative">
          <Select
            className="h-[38px] text-left"
            value={medicalPosition?.id || undefined}
            style={{ width: '100%' }}
            onChange={(_, position) =>
              setMedicalPosition(position as JobPosition)
            }
            placeholder="Please Select Position"
            options={positionOptions}
            showSearch
            onSearch={onSearch}
            allowClear
            status={isDirty?.position && errors?.position ? 'error' : ''}
            onBlur={() => onBlur?.({
              target: {
                name: 'position',
                value: medicalPosition?.title,
                validity: {
                  valid: medicalPosition?.title != null,
                  valueMissing: medicalPosition?.title == null
                }
              }
            })}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toString()
                .toLowerCase()
                .localeCompare(
                  (optionB?.label ?? '').toString().toLowerCase(),
                )
            }
            filterOption={(input, option) => (String(option?.label ?? '').toLowerCase()).includes(input?.toLowerCase?.())}
          />
          <ErrorLabel error={isDirty?.position ? errors?.position : undefined} className="absolute" />
        </div>
        <div
          className="flex flex-col gap-2 flex-1 relative"
          style={{
            display: !medicalPosition?.specialties.length ? 'none' : 'unset',
          }}
        >
          <label className="require-field text-[1.6rem] text-textColor font-[600]">
            Specialties
          </label>
          <MultiSelect
            className="min-h-[38px] text-left"
            value={specialistsPositions}
            style={{
              width: '100%',
            }}
            onChange={setSpecialistPositions}
            placeholder="Please add any additional details here"
            options={selectedPosition?.specialties?.map((s) => ({
              label: s.name,
              value: s.name,
            }))}
            status={isDirty?.specialties && errors?.specialties ? 'error' : ''}
            onBlur={() => onBlur?.({
              target: {
                name: 'specialties',
                value: specialistsPositions?.join(','),
                validity: {
                  valid: specialistsPositions != null,
                  valueMissing: specialistsPositions == null
                }
              }
            })}
          />
          <ErrorLabel error={isDirty?.specialties ? errors?.specialties : undefined} className="absolute" />
        </div>
      </div>
    </div>
  );
}
