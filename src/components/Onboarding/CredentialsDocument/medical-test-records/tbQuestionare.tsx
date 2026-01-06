import { FlexContainer } from '../../../flex-container';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import LabeledDateInputMolecule from '../../../LabeledDateInput/LabeledDateInput.molecule';
import { CloudUploadFilled } from '../../../Icons/svg';
import FileInput from '../../../Icons/svg/file-input';
import { Link } from 'react-router-dom';
import { MedicalTestFormProps } from './types';
import { pathnames } from '../../../../routes/path-name';
import { toFullDateYearMonthDay } from '../../../../utils/date-time';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

export const TBQuestionnaireForm = ({
  issueDate,
  recordDocumentKey,
  expiryDate,
  onChange,
  disabled,
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
    // if (loading) {
    //   handleFormIsValid?.('tuberculosis-questionnaire', false);
    //   return;
    // }
    // Check if the form is valid
    if (!issueDate || !expiryDate) {
      handleFormIsValid?.('tuberculosis-questionnaire', false);
    } else {
      handleFormIsValid?.('tuberculosis-questionnaire', true);
    }

    // check if form is updated
    if (
      issueDate === originalData?.issueDate &&
      expiryDate === originalData?.expiryDate &&
      file === originalData?.recordDocumentKey
    ) {
      handleFormIsUpdated?.('tuberculosis-questionnaire', false);
    } else {
      handleFormIsUpdated?.('tuberculosis-questionnaire', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueDate, expiryDate, originalData, file, loading, recordDocumentKey]);
  return (
    <>
      <p className="text-textColor font-[500] text-body">
        To complete the Tuberculosis Questionnaire, please{' '}
        <span className="text-errorColor absolute bottom-[-2px] text-ellipsis max-w-full overflow-hidden text-nowrap">
          *
        </span>{' '}
        <Link
          className="text-tealColor"
          target="_blank"
          to={`${pathnames.WORKER_TUBERCULOSIS_QUESTIONARE_FORM}`}
        >
          Click here{' '}
        </Link>
      </p>
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
        <FlexContainer label="Upload Tuberculosis Questionnaire" required>
          <FileInput
            id="tbTestRecordFile"
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
            goToPrevious ? goToPrevious('tuberculosis-test') : null
          }
        >
          <ArrowLeftOutlined />
          Previous
        </Button>
        <ButtonPrimary onClick={onSubmit} disabled={disabled} loading={loading}>
          Save <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </>
  );
};
