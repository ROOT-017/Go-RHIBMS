import { FlexContainer } from '../../../flex-container';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import LabeledDateInputMolecule from '../../../LabeledDateInput/LabeledDateInput.molecule';
import { CloudUploadFilled } from '../../../Icons/svg';
import FileInput from '../../../Icons/svg/file-input';
import { MedicalTestFormProps } from './types';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { toFullDateYearMonthDay } from '../../../../utils/date-time';
import { useEffect } from 'react';

export const FitTestForm = ({
  issueDate,
  expiryDate,
  recordDocumentKey,
  onChange,
  disabled,
  loading,
  onSubmit,
  onSignUrl,
  goToPrevious,
  handleFormIsUpdated,
  handleFormIsValid,
  originalData,
  file,
}: MedicalTestFormProps) => {
  useEffect(() => {
    if (loading) {
      handleFormIsValid?.('fit-test', false);
      return;
    }
    //Check if the form is valid
    if (!file || !issueDate || !expiryDate) {
      handleFormIsValid?.('fit-test', false);
    } else {
      handleFormIsValid?.('fit-test', true);
    }
    // check if form is updated
    if (
      originalData?.issueDate === issueDate &&
      originalData.expiryDate === expiryDate &&
      originalData?.recordDocumentKey === recordDocumentKey
    ) {
      handleFormIsUpdated?.('fit-test', false);
    } else {
      handleFormIsUpdated?.('fit-test', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueDate, recordDocumentKey, loading, originalData, expiryDate, file]);
  return (
    <>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer labelRequired={false} required label={''}>
          <LabeledDateInputMolecule
            name="issueDate"
            picker="date"
            required
            onDateChange={onChange}
            value={issueDate || ''}
            label="Issue Date"
            maxDate={toFullDateYearMonthDay(new Date())}
          />
        </FlexContainer>
        <FlexContainer labelRequired={false} required label={''}>
          <LabeledDateInputMolecule
            name="expiryDate"
            picker="date"
            required
            onDateChange={onChange}
            value={expiryDate || ''}
            minDate={issueDate}
            disabled={!issueDate}
            label="Expiration Date"
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="Upload Fit Test Result" required>
          <FileInput
            id="fitTestRecordFile"
            label=""
            onChange={(files) => {
              if (files && files?.length > 0) {
                onChange('file', files[0]);
              }
            }}
            inputText={
              recordDocumentKey || 'Select file or drag/drop to upload'
            }
            accept=".jpg,.png,.pdf"
            className="text-body text-textColor flex justify-between items-center w-full"
            showSelected
            onSignUrl={(e) => {
              onChange('file', e);
              return onSignUrl ? onSignUrl(e) : new Promise(() => {});
            }}
          >
            <CloudUploadFilled className="text-[24px]" />
          </FileInput>
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
        <Button
          bordered
          onClick={() => (goToPrevious ? goToPrevious('fit-test') : null)}
        >
          <ArrowLeftOutlined /> Previous
        </Button>
        <ButtonPrimary onClick={onSubmit} disabled={disabled} loading={loading}>
          Save <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </>
  );
};
