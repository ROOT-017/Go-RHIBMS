import TextArea from 'antd/es/input/TextArea';
import { Dispatch, SetStateAction } from 'react';
import { JobPostDirtyState, JobPostErrors } from './postjob.hooks';
import { ErrorLabel } from '../Input/ErrorLabel';
import { OnBlurEventHandler } from '../../utils/domHelpers';

export type DetailsProp = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
  placeholder?: string;
  errors?: JobPostErrors;
  onBlur?: OnBlurEventHandler,
  isDirty?: JobPostDirtyState
};
export default function AdditionalDetailsForm({
  value,
  setValue,
  label,
  placeholder,
  errors,
  onBlur,
  isDirty
}: DetailsProp) {
  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex w-full gap-10 p-2 md:p-8 flex-col mt-[-10px] pb-10">
      <div className="flex flex-col gap-4 md:gap-12 mt-[-10px] relative">
        <h2 className="text-smallSubHeading font-[600] flex text-textColor">
          {label ?? 'Additional Details'}{' '}
          <span className="text-errorColor">*</span>
        </h2>
        <TextArea
          placeholder={placeholder ?? 'Please add any additional details here'}
          value={value}
          onChange={handleDetailsChange}
          style={{
            height: '10em',
          }}
          status={isDirty?.additionalDetails && errors?.additionalDetails ? 'error' : ''}
          name='additionalDetails'
          onBlur={onBlur}
          className='font-normal'
        />
        <ErrorLabel error={isDirty?.additionalDetails ? errors?.additionalDetails : undefined} className="absolute" />
      </div>
    </div>
  );
}
