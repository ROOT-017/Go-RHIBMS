import { FlexContainer } from '../../../flex-container';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import LabeledDateInputMolecule from '../../../LabeledDateInput/LabeledDateInput.molecule';
import { CloudUploadFilled } from '../../../Icons/svg';
import FileInput from '../../../Icons/svg/file-input';
import { MedicalTestFormProps } from './types';
import { toFullDateYearMonthDay } from '../../../../utils/date-time';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

export const CovidForm = ({
  issueDate,
  onChange,
  disabled,
  recordDocumentKey,
  onSubmit,
  loading,
  onSignUrl,
  goToPrevious,
  handleFormIsUpdated,
  handleFormIsValid,
  originalData,
  file,
}: MedicalTestFormProps) => {
  useEffect(() => {
    if (loading) {
      handleFormIsValid?.('covid-19', false);
      return;
    }
    //Check if the form is valid
    if (!file || !issueDate) {
      handleFormIsValid?.('covid-19', false);
    } else {
      handleFormIsValid?.('covid-19', true);
    }
    // check if form is updated
    if (
      originalData?.issueDate === issueDate &&
      originalData?.recordDocumentKey === recordDocumentKey
    ) {
      handleFormIsUpdated?.('covid-19', false);
    } else {
      handleFormIsUpdated?.('covid-19', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueDate, recordDocumentKey, loading, originalData, file]);
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
        <FlexContainer label="Upload Covid19 Test" required>
          <FileInput
            id="covidTestRecordFile"
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
          onClick={() =>
            goToPrevious ? goToPrevious('tuberculosis-questionnaire') : null
          }
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
